<?php
/**
 * Product Tab Manager Module.
 *
 * Manage WooCommerce product page tabs — add custom tabs, disable
 * or reorder default tabs.
 *
 * @package JWP_STK
 */

namespace JWP_STK\Modules\ProductTabManager;

use JWP_STK\Modules\Base_Module;

defined( 'ABSPATH' ) || exit;

/**
 * Module class.
 */
class Module extends Base_Module {

	/**
	 * Get the module slug.
	 *
	 * @return string
	 */
	public function get_slug() {
		return 'product-tab-manager';
	}

	/**
	 * Get default settings.
	 *
	 * @return array
	 */
	public function get_defaults() {
		return array(
			'disable_description'          => false,
			'disable_additional_info'      => false,
			'disable_reviews'              => false,
			'description_title'            => '',
			'additional_information_title' => '',
			'reviews_title'                => '',
			'custom_tabs'                  => array(),
		);
	}

	/**
	 * Initialise the module.
	 *
	 * @return void
	 */
	public function init() {
		add_filter( 'woocommerce_product_tabs', array( $this, 'modify_product_tabs' ), 98 );
	}

	/**
	 * Modify WooCommerce product tabs.
	 *
	 * @param array $tabs Product tabs.
	 * @return array
	 */
	public function modify_product_tabs( $tabs ) {
		$settings = $this->get_settings();

		// Disable default tabs if configured.
		if ( ! empty( $settings['disable_description'] ) ) {
			unset( $tabs['description'] );
		} elseif ( ! empty( $settings['description_title'] ) && isset( $tabs['description'] ) ) {
			$tabs['description']['title'] = sanitize_text_field( $settings['description_title'] );
		}

		if ( ! empty( $settings['disable_additional_info'] ) ) {
			unset( $tabs['additional_information'] );
		} elseif ( ! empty( $settings['additional_information_title'] ) && isset( $tabs['additional_information'] ) ) {
			$tabs['additional_information']['title'] = sanitize_text_field( $settings['additional_information_title'] );
		}

		if ( ! empty( $settings['disable_reviews'] ) ) {
			unset( $tabs['reviews'] );
		} elseif ( ! empty( $settings['reviews_title'] ) && isset( $tabs['reviews'] ) ) {
			$tabs['reviews']['title'] = sanitize_text_field( $settings['reviews_title'] );
		}

		// Add custom tabs.
		if ( ! empty( $settings['custom_tabs'] ) && is_array( $settings['custom_tabs'] ) ) {
			foreach ( $settings['custom_tabs'] as $index => $tab ) {
				if ( empty( $tab['title'] ) ) {
					continue;
				}

				$tab_key          = 'jwp_stk_custom_tab_' . $index;
				$tabs[ $tab_key ] = array(
					'title'    => sanitize_text_field( $tab['title'] ),
					'priority' => isset( $tab['priority'] ) ? (int) $tab['priority'] : ( 50 + $index ),
					'callback' => array( $this, 'render_custom_tab' ),
					'content'  => isset( $tab['content'] ) ? $tab['content'] : '',
				);
			}
		}

		return $tabs;
	}

	/**
	 * Render a custom tab's content.
	 *
	 * @param string $key Tab key.
	 * @param array  $tab Tab data.
	 * @return void
	 */
	public function render_custom_tab( $key, $tab ) {
		if ( ! empty( $tab['content'] ) ) {
			echo '<div class="jwp-stk-custom-tab-content">';
			echo wp_kses_post( wpautop( $tab['content'] ) );
			echo '</div>';
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
		if ( 'custom_tabs' === $key && is_array( $value ) ) {
			return $this->sanitize_custom_tabs( $value );
		}

		return parent::sanitize_setting( $key, $value );
	}

	/**
	 * Sanitize custom tabs array.
	 *
	 * @param array $tabs Custom tabs data.
	 * @return array
	 */
	private function sanitize_custom_tabs( $tabs ) {
		$clean = array();

		foreach ( $tabs as $tab ) {
			if ( empty( $tab['title'] ) ) {
				continue;
			}

			$clean[] = array(
				'title'    => sanitize_text_field( $tab['title'] ),
				'content'  => isset( $tab['content'] ) ? wp_kses_post( $tab['content'] ) : '',
				'priority' => isset( $tab['priority'] ) ? (int) $tab['priority'] : 50,
			);
		}

		return $clean;
	}
}
