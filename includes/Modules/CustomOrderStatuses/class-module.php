<?php
/**
 * Custom Order Statuses Module.
 *
 * Allows creating custom WooCommerce order statuses beyond the
 * built-in defaults, with colours and optional email triggers.
 *
 * @package JWP_STK
 */

namespace JWP_STK\Modules\CustomOrderStatuses;

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
		return 'custom-order-statuses';
	}

	/**
	 * Get default settings.
	 *
	 * @return array
	 */
	public function get_defaults() {
		return array(
			'statuses' => array(),
		);
	}

	/**
	 * Initialise the module.
	 *
	 * @return void
	 */
	public function init() {
		add_action( 'init', array( $this, 'register_custom_statuses' ) );
		add_filter( 'wc_order_statuses', array( $this, 'add_to_wc_statuses' ) );
		add_filter( 'bulk_actions-edit-shop_order', array( $this, 'add_bulk_actions' ) );
		add_filter( 'bulk_actions-woocommerce_page_wc-orders', array( $this, 'add_bulk_actions' ) );
		add_action( 'admin_head', array( $this, 'output_status_colors_css' ) );
	}

	/**
	 * Get all custom statuses from settings.
	 *
	 * @return array
	 */
	public function get_custom_statuses() {
		$settings = $this->get_settings();

		return isset( $settings['statuses'] ) && is_array( $settings['statuses'] ) ? $settings['statuses'] : array();
	}

	/**
	 * Register custom post statuses.
	 *
	 * @return void
	 */
	public function register_custom_statuses() {
		$statuses = $this->get_custom_statuses();

		foreach ( $statuses as $status ) {
			if ( empty( $status['slug'] ) || empty( $status['label'] ) ) {
				continue;
			}

			$slug = $this->sanitize_status_slug( $status['slug'] );

			$label       = sanitize_text_field( $status['label'] );
			$label_count = array(
				0          => $label . ' <span class="count">(%s)</span>',
				1          => $label . ' <span class="count">(%s)</span>',
				'singular' => $label . ' <span class="count">(%s)</span>',
				'plural'   => $label . ' <span class="count">(%s)</span>',
				'domain'   => 'store-kit',
			);

			register_post_status(
				'wc-' . $slug,
				array(
					'label'                     => $label,
					'public'                    => true,
					'exclude_from_search'       => false,
					'show_in_admin_all_list'    => true,
					'show_in_admin_status_list' => true,
					'label_count'               => $label_count,
				)
			);
		}
	}

	/**
	 * Add custom statuses to the WooCommerce order status list.
	 *
	 * @param array $statuses Order statuses.
	 * @return array
	 */
	public function add_to_wc_statuses( $statuses ) {
		$custom = $this->get_custom_statuses();

		foreach ( $custom as $status ) {
			if ( empty( $status['slug'] ) || empty( $status['label'] ) ) {
				continue;
			}

			$slug                      = $this->sanitize_status_slug( $status['slug'] );
			$statuses[ 'wc-' . $slug ] = sanitize_text_field( $status['label'] );
		}

		return $statuses;
	}

	/**
	 * Add custom statuses to bulk actions dropdown.
	 *
	 * @param array $actions Bulk actions.
	 * @return array
	 */
	public function add_bulk_actions( $actions ) {
		$custom = $this->get_custom_statuses();

		foreach ( $custom as $status ) {
			if ( empty( $status['slug'] ) || empty( $status['label'] ) ) {
				continue;
			}

			$slug = $this->sanitize_status_slug( $status['slug'] );

			/* translators: %s: status label */
			$actions[ 'mark_' . $slug ] = sprintf( __( 'Change status to %s', 'store-kit' ), sanitize_text_field( $status['label'] ) );
		}

		return $actions;
	}

	/**
	 * Output inline CSS for status colours in admin.
	 *
	 * @return void
	 */
	public function output_status_colors_css() {
		$screen = get_current_screen();

		if ( ! $screen || ! in_array( $screen->id, array( 'edit-shop_order', 'woocommerce_page_wc-orders' ), true ) ) {
			return;
		}

		$custom = $this->get_custom_statuses();
		$css    = '';

		foreach ( $custom as $status ) {
			if ( empty( $status['slug'] ) || empty( $status['color'] ) ) {
				continue;
			}

			$slug  = $this->sanitize_status_slug( $status['slug'] );
			$color = sanitize_hex_color( $status['color'] );

			if ( ! $color ) {
				continue;
			}

			$css .= sprintf(
				'.order-status.status-%1$s { background: %2$s; color: #fff; }' . "\n",
				esc_attr( $slug ),
				esc_attr( $color )
			);
		}

		if ( $css ) {
			// phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped -- CSS is built from sanitize_hex_color + esc_attr, safe for style block.
			echo '<style id="jwp-stk-custom-order-status-colors">' . wp_strip_all_tags( $css ) . '</style>' . "\n";
		}
	}

	/**
	 * Sanitize a status slug.
	 *
	 * @param string $slug Raw slug.
	 * @return string
	 */
	private function sanitize_status_slug( $slug ) {
		$slug = sanitize_key( $slug );

		// Enforce max length. WC status slugs are wc-{slug}, post_status is max 20 chars.
		return substr( $slug, 0, 17 );
	}

	/**
	 * Sanitize a setting value.
	 *
	 * @param string $key   Setting key.
	 * @param mixed  $value Setting value.
	 * @return mixed
	 */
	public function sanitize_setting( $key, $value ) {
		if ( 'statuses' === $key && is_array( $value ) ) {
			return $this->sanitize_statuses( $value );
		}

		return parent::sanitize_setting( $key, $value );
	}

	/**
	 * Sanitize the statuses array.
	 *
	 * @param array $statuses Statuses data.
	 * @return array
	 */
	private function sanitize_statuses( $statuses ) {
		$clean = array();

		foreach ( $statuses as $status ) {
			if ( empty( $status['slug'] ) || empty( $status['label'] ) ) {
				continue;
			}

			$item = array(
				'slug'  => $this->sanitize_status_slug( $status['slug'] ),
				'label' => sanitize_text_field( $status['label'] ),
				'color' => isset( $status['color'] ) ? sanitize_hex_color( $status['color'] ) : '#787c82',
			);

			if ( ! $item['color'] ) {
				$item['color'] = '#787c82';
			}

			$clean[] = $item;
		}

		return $clean;
	}

	/**
	 * Get the settings schema.
	 *
	 * @return array
	 */
	public function get_settings_schema() {
		return array(
			'settings'         => $this->get_settings(),
			'defaults'         => $this->get_defaults(),
			'builtin_statuses' => wc_get_order_statuses(),
		);
	}
}
