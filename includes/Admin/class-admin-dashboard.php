<?php
/**
 * Admin Dashboard handler.
 *
 * Enqueues the React app and renders the mount point.
 *
 * @package JWP_STK
 */

namespace JWP_STK\Admin;

defined( 'ABSPATH' ) || exit;

/**
 * Admin_Dashboard class.
 */
class Admin_Dashboard {

	/**
	 * Render the dashboard page.
	 *
	 * @return void
	 */
	public static function output() {
		self::hide_admin_notices();
		self::enqueue_assets();

		include JWP_STK_PLUGIN_DIR . 'includes/Admin/Views/html-admin-dashboard.php';
	}

	/**
	 * Hide admin notices on our dashboard page.
	 *
	 * @return void
	 */
	public static function hide_admin_notices() {
		remove_all_actions( 'admin_notices' );
		remove_all_actions( 'all_admin_notices' );
		remove_all_actions( 'user_admin_notices' );
		remove_all_actions( 'network_admin_notices' );
	}

	/**
	 * Enqueue React app assets.
	 *
	 * @return void
	 */
	public static function enqueue_assets() {
		$asset_file = JWP_STK_PLUGIN_DIR . 'assets/js/dashboard/index.asset.php';

		if ( ! file_exists( $asset_file ) ) {
			return;
		}

		$asset = require $asset_file;

		wp_enqueue_script(
			'jwp-stk-dashboard',
			JWP_STK_PLUGIN_URL . 'assets/js/dashboard/index.js',
			$asset['dependencies'],
			$asset['version'],
			true
		);

		wp_enqueue_style(
			'jwp-stk-dashboard',
			JWP_STK_PLUGIN_URL . 'assets/js/dashboard/style-index.css',
			array( 'wp-components' ),
			$asset['version']
		);

		wp_add_inline_style( 'jwp-stk-dashboard', self::get_hide_notices_css() );

		wp_localize_script(
			'jwp-stk-dashboard',
			'jwpStkDashboard',
			self::get_localized_data()
		);
	}

	/**
	 * Get inline CSS to hide any notices that still appear.
	 *
	 * @return string
	 */
	public static function get_hide_notices_css() {
		return '
			.jwp-stk-dashboard-page .notice,
			.jwp-stk-dashboard-page .updated,
			.jwp-stk-dashboard-page .update-nag,
			.jwp-stk-dashboard-page .error {
				display: none !important;
			}
		';
	}

	/**
	 * Get localized data for the React dashboard app.
	 *
	 * @return array
	 */
	public static function get_localized_data() {
		// phpcs:ignore WordPress.Security.NonceVerification.Recommended -- Reading page slug for menu routing only.
		$page     = isset( $_GET['page'] ) ? sanitize_text_field( wp_unslash( $_GET['page'] ) ) : '';
		$page_map = array(
			'jetix-store-toolkit'        => 'dashboard',
			'jwp-stk-modules'  => 'modules',
			'jwp-stk-settings' => 'settings',
		);

		$data = array(
			'nonce'       => wp_create_nonce( 'wp_rest' ),
			'apiBase'     => esc_url_raw( rest_url( 'jwp-stk/v1' ) ),
			'pluginUrl'   => JWP_STK_PLUGIN_URL,
			'adminUrl'    => admin_url(),
			'version'     => JWP_STK_VERSION,
			'currentPage' => isset( $page_map[ $page ] ) ? $page_map[ $page ] : 'dashboard',
		);

		/**
		 * Filter the localized data for the dashboard app.
		 *
		 * @param array $data Localized data.
		 */
		return apply_filters( 'jwp_stk_dashboard_localized_data', $data );
	}
}
