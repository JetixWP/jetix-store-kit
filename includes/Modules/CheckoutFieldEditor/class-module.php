<?php
/**
 * Checkout Field Editor Module.
 *
 * Allows customisation of WooCommerce checkout fields — add, remove,
 * reorder, change labels, placeholders, and required status.
 *
 * @package JWP_STK
 */

namespace JWP_STK\Modules\CheckoutFieldEditor;

use JWP_STK\Modules\Base_Module;

defined( 'ABSPATH' ) || exit;

/**
 * Module class.
 */
class Module extends Base_Module {

	/**
	 * WooCommerce checkout field sections.
	 *
	 * @var array
	 */
	const SECTIONS = array( 'billing', 'shipping', 'order' );

	/**
	 * Get the module slug.
	 *
	 * @return string
	 */
	public function get_slug() {
		return 'checkout-field-editor';
	}

	/**
	 * Get default settings.
	 *
	 * @return array
	 */
	public function get_defaults() {
		return array(
			'billing'  => array(),
			'shipping' => array(),
			'order'    => array(),
		);
	}

	/**
	 * Initialise module.
	 *
	 * @return void
	 */
	public function init() {
		add_filter( 'woocommerce_checkout_fields', array( $this, 'modify_checkout_fields' ), 99 );
		add_action( 'woocommerce_checkout_update_order_meta', array( $this, 'save_custom_fields' ) );
		add_action( 'woocommerce_admin_order_data_after_billing_address', array( $this, 'display_custom_fields_in_admin' ) );
	}

	/**
	 * Modify WooCommerce checkout fields based on saved settings.
	 *
	 * @param array $fields Checkout fields.
	 * @return array
	 */
	public function modify_checkout_fields( $fields ) {
		$settings = $this->get_settings();

		foreach ( self::SECTIONS as $section ) {
			if ( empty( $settings[ $section ] ) || ! is_array( $settings[ $section ] ) ) {
				continue;
			}

			$section_fields = $settings[ $section ];
			$wc_key         = 'order' === $section ? 'order' : $section;

			if ( ! isset( $fields[ $wc_key ] ) ) {
				$fields[ $wc_key ] = array();
			}

			foreach ( $section_fields as $field ) {
				if ( empty( $field['name'] ) ) {
					continue;
				}

				$field_key = $field['name'];

				// Disabled field — remove it.
				if ( ! empty( $field['disabled'] ) ) {
					unset( $fields[ $wc_key ][ $field_key ] );
					continue;
				}

				// Ensure field exists in field set.
				if ( ! isset( $fields[ $wc_key ][ $field_key ] ) ) {
					// Custom field: add it.
					if ( ! empty( $field['custom'] ) ) {
						$fields[ $wc_key ][ $field_key ] = array(
							'type' => isset( $field['type'] ) ? sanitize_text_field( $field['type'] ) : 'text',
						);
					} else {
						continue;
					}
				}

				// Override properties.
				if ( isset( $field['label'] ) && '' !== $field['label'] ) {
					$fields[ $wc_key ][ $field_key ]['label'] = sanitize_text_field( $field['label'] );
				}

				if ( isset( $field['placeholder'] ) ) {
					$fields[ $wc_key ][ $field_key ]['placeholder'] = sanitize_text_field( $field['placeholder'] );
				}

				if ( isset( $field['required'] ) ) {
					$fields[ $wc_key ][ $field_key ]['required'] = (bool) $field['required'];
				}

				if ( isset( $field['priority'] ) ) {
					$fields[ $wc_key ][ $field_key ]['priority'] = (int) $field['priority'];
				}

				if ( isset( $field['class'] ) && is_array( $field['class'] ) ) {
					$fields[ $wc_key ][ $field_key ]['class'] = array_map( 'sanitize_html_class', $field['class'] );
				}
			}
		}

		return $fields;
	}

	/**
	 * Save custom field values to order meta.
	 *
	 * @param int $order_id Order ID.
	 * @return void
	 */
	public function save_custom_fields( $order_id ) {
		$settings = $this->get_settings();
		$order    = wc_get_order( $order_id );

		if ( ! $order ) {
			return;
		}

		foreach ( self::SECTIONS as $section ) {
			if ( empty( $settings[ $section ] ) || ! is_array( $settings[ $section ] ) ) {
				continue;
			}

			foreach ( $settings[ $section ] as $field ) {
				if ( empty( $field['custom'] ) || empty( $field['name'] ) ) {
					continue;
				}

				$field_key = $field['name'];

				// phpcs:disable WordPress.Security.NonceVerification.Missing -- WC validates the checkout nonce before this hook fires.
				if ( isset( $_POST[ $field_key ] ) ) {
					$order->update_meta_data( '_' . $field_key, sanitize_text_field( wp_unslash( $_POST[ $field_key ] ) ) );
				}
				// phpcs:enable WordPress.Security.NonceVerification.Missing
			}
		}

		$order->save();
	}

	/**
	 * Display custom field values in admin order page.
	 *
	 * @param \WC_Order $order Order object.
	 * @return void
	 */
	public function display_custom_fields_in_admin( $order ) {
		$settings = $this->get_settings();

		foreach ( self::SECTIONS as $section ) {
			if ( empty( $settings[ $section ] ) || ! is_array( $settings[ $section ] ) ) {
				continue;
			}

			foreach ( $settings[ $section ] as $field ) {
				if ( empty( $field['custom'] ) || empty( $field['name'] ) ) {
					continue;
				}

				$value = $order->get_meta( '_' . $field['name'] );
				if ( '' === $value ) {
					continue;
				}

				$label = ! empty( $field['label'] ) ? $field['label'] : $field['name'];

				printf(
					'<p><strong>%s:</strong> %s</p>',
					esc_html( $label ),
					esc_html( $value )
				);
			}
		}
	}

	/**
	 * Sanitize a setting value.
	 *
	 * @param string $key   Setting key.
	 * @param mixed  $value Setting value.
	 * @return mixed
	 */
	public function sanitize_setting( $key, $value ) {
		if ( in_array( $key, self::SECTIONS, true ) && is_array( $value ) ) {
			return $this->sanitize_field_list( $value );
		}

		return parent::sanitize_setting( $key, $value );
	}

	/**
	 * Sanitize a field list.
	 *
	 * @param array $fields Field configurations.
	 * @return array
	 */
	private function sanitize_field_list( $fields ) {
		$sanitized = array();

		foreach ( $fields as $field ) {
			if ( empty( $field['name'] ) ) {
				continue;
			}

			$clean = array(
				'name' => sanitize_text_field( $field['name'] ),
			);

			if ( isset( $field['label'] ) ) {
				$clean['label'] = sanitize_text_field( $field['label'] );
			}
			if ( isset( $field['placeholder'] ) ) {
				$clean['placeholder'] = sanitize_text_field( $field['placeholder'] );
			}
			if ( isset( $field['type'] ) ) {
				$allowed_types = array( 'text', 'textarea', 'select', 'email', 'tel', 'number', 'password', 'date' );
				$clean['type'] = in_array( $field['type'], $allowed_types, true ) ? $field['type'] : 'text';
			}
			if ( isset( $field['required'] ) ) {
				$clean['required'] = (bool) $field['required'];
			}
			if ( isset( $field['disabled'] ) ) {
				$clean['disabled'] = (bool) $field['disabled'];
			}
			if ( isset( $field['custom'] ) ) {
				$clean['custom'] = (bool) $field['custom'];
			}
			if ( isset( $field['priority'] ) ) {
				$clean['priority'] = (int) $field['priority'];
			}
			if ( isset( $field['class'] ) && is_array( $field['class'] ) ) {
				$clean['class'] = array_map( 'sanitize_html_class', $field['class'] );
			}

			$sanitized[] = $clean;
		}

		return $sanitized;
	}

	/**
	 * Get the settings schema for REST API response.
	 *
	 * Includes default WooCommerce fields for the editor UI.
	 *
	 * @return array
	 */
	public function get_settings_schema() {
		return array(
			'settings'       => $this->get_settings(),
			'defaults'       => $this->get_defaults(),
			'default_fields' => $this->get_default_wc_fields(),
		);
	}

	/**
	 * Get WooCommerce default checkout fields.
	 *
	 * @return array
	 */
	private function get_default_wc_fields() {
		$defaults = array(
			'billing'  => array(
				'billing_first_name' => array(
					'label'    => __( 'First name', 'jetix-store-toolkit' ),
					'required' => true,
				),
				'billing_last_name'  => array(
					'label'    => __( 'Last name', 'jetix-store-toolkit' ),
					'required' => true,
				),
				'billing_company'    => array(
					'label'    => __( 'Company name', 'jetix-store-toolkit' ),
					'required' => false,
				),
				'billing_country'    => array(
					'label'    => __( 'Country / Region', 'jetix-store-toolkit' ),
					'required' => true,
				),
				'billing_address_1'  => array(
					'label'    => __( 'Street address', 'jetix-store-toolkit' ),
					'required' => true,
				),
				'billing_address_2'  => array(
					'label'    => __( 'Apartment, suite, unit, etc.', 'jetix-store-toolkit' ),
					'required' => false,
				),
				'billing_city'       => array(
					'label'    => __( 'Town / City', 'jetix-store-toolkit' ),
					'required' => true,
				),
				'billing_state'      => array(
					'label'    => __( 'State / County', 'jetix-store-toolkit' ),
					'required' => true,
				),
				'billing_postcode'   => array(
					'label'    => __( 'Postcode / ZIP', 'jetix-store-toolkit' ),
					'required' => true,
				),
				'billing_phone'      => array(
					'label'    => __( 'Phone', 'jetix-store-toolkit' ),
					'required' => true,
				),
				'billing_email'      => array(
					'label'    => __( 'Email address', 'jetix-store-toolkit' ),
					'required' => true,
				),
			),
			'shipping' => array(
				'shipping_first_name' => array(
					'label'    => __( 'First name', 'jetix-store-toolkit' ),
					'required' => true,
				),
				'shipping_last_name'  => array(
					'label'    => __( 'Last name', 'jetix-store-toolkit' ),
					'required' => true,
				),
				'shipping_company'    => array(
					'label'    => __( 'Company name', 'jetix-store-toolkit' ),
					'required' => false,
				),
				'shipping_country'    => array(
					'label'    => __( 'Country / Region', 'jetix-store-toolkit' ),
					'required' => true,
				),
				'shipping_address_1'  => array(
					'label'    => __( 'Street address', 'jetix-store-toolkit' ),
					'required' => true,
				),
				'shipping_address_2'  => array(
					'label'    => __( 'Apartment, suite, unit, etc.', 'jetix-store-toolkit' ),
					'required' => false,
				),
				'shipping_city'       => array(
					'label'    => __( 'Town / City', 'jetix-store-toolkit' ),
					'required' => true,
				),
				'shipping_state'      => array(
					'label'    => __( 'State / County', 'jetix-store-toolkit' ),
					'required' => true,
				),
				'shipping_postcode'   => array(
					'label'    => __( 'Postcode / ZIP', 'jetix-store-toolkit' ),
					'required' => true,
				),
			),
			'order'    => array(
				'order_comments' => array(
					'label'    => __( 'Order notes', 'jetix-store-toolkit' ),
					'required' => false,
				),
			),
		);

		return $defaults;
	}
}
