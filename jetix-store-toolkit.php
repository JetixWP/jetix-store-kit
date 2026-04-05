<?php
/**
 * Plugin Name: Store Toolkit for WooCommerce
 * Plugin URI:  https://github.com/jetixWP/jetix-store-toolkit
 * Description: Modular all-in-one WooCommerce plugin — enable only the features your store needs. No bloat, no conflicts.
 * Version:     0.5.0
 * Author:      JetixWP
 * Author URI:  https://jetixwp.com
 * License:     GPL-2.0-or-later
 * License URI: https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain: jetix-store-toolkit
 * Domain Path: /languages
 * Requires at least: 6.0
 * Requires PHP: 7.4
 * WC requires at least: 10.0
 * WC tested up to: 10.6.1
 *
 * @package JWP_STK
 */

defined( 'ABSPATH' ) || exit;

define( 'JWP_STK_VERSION', '0.5.0' );
define( 'JWP_STK_PLUGIN_FILE', __FILE__ );
define( 'JWP_STK_PLUGIN_URL', plugin_dir_url( JWP_STK_PLUGIN_FILE ) );
define( 'JWP_STK_PLUGIN_DIR', plugin_dir_path( JWP_STK_PLUGIN_FILE ) );
define( 'JWP_STK_PLUGIN_BASE', plugin_basename( JWP_STK_PLUGIN_FILE ) );

// Third-party dependencies.
$jwp_stk_vendor = __DIR__ . '/vendor/autoload.php';

if ( is_readable( $jwp_stk_vendor ) ) {
	require_once $jwp_stk_vendor;
}

/**
 * Initialize Freemius SDK.
 */
if ( ! function_exists( 'jwp_stk_fs' ) ) {
	/**
	 * Create a helper function for easy SDK access.
	 *
	 * @return \Freemius
	 */
	function jwp_stk_fs() {
		global $jwp_stk_fs;

		if ( ! function_exists( 'fs_dynamic_init' ) && file_exists( __DIR__ . '/vendor/freemius/wordpress-sdk/start.php' ) ) {
			require_once __DIR__ . '/vendor/freemius/wordpress-sdk/start.php';
		}

		if ( ! isset( $jwp_stk_fs ) && function_exists( 'fs_dynamic_init' ) ) {
			$jwp_stk_fs = fs_dynamic_init(
				array(
					'id'               => '27203',
					'slug'             => 'jetix-store-toolkit',
					'type'             => 'plugin',
					'public_key'       => 'pk_d5e1668fd4eab76a94543928527fd',
					'is_premium'       => false,
					'has_addons'       => false,
					'has_paid_plans'   => false,
					'is_org_compliant' => true,
					'menu'             => array(
						'slug'       => 'jetix-store-toolkit',
						'first-path' => 'admin.php?page=jetix-store-toolkit',
						'support'    => false,
						'account'    => false,
						'contact'    => false,
					),
				)
			);
		}

		return $jwp_stk_fs;
	}

	// Init Freemius.
	jwp_stk_fs();
	// Signal that SDK was initiated.
	do_action( 'jwp_stk_fs_loaded' );
}

/**
 * Check if WooCommerce is active before bootstrapping.
 */
function jwp_stk_check_woocommerce() {
	if ( ! class_exists( 'WooCommerce' ) ) {
		add_action( 'admin_notices', 'jwp_stk_woocommerce_missing_notice' );
		return;
	}

	require_once JWP_STK_PLUGIN_DIR . 'includes/class-plugin.php';
	\JWP_STK\Plugin::get_instance();
}
add_action( 'plugins_loaded', 'jwp_stk_check_woocommerce' );

/**
 * Admin notice when WooCommerce is not active.
 */
function jwp_stk_woocommerce_missing_notice() {
	?>
	<div class="notice notice-error">
		<p>
			<?php
			printf(
				/* translators: %s: WooCommerce plugin name */
				esc_html__( '%1$s requires %2$s to be installed and active.', 'jetix-store-toolkit' ),
				'<strong>Jetix Store Toolkit for WooCommerce</strong>',
				'<strong>WooCommerce</strong>'
			);
			?>
		</p>
	</div>
	<?php
}

/**
 * Plugin activation callback.
 *
 * Sets a transient so the plugin can redirect to the dashboard on first activation.
 */
function jwp_stk_activate() {
	set_transient( 'jwp_stk_activated', true, 30 );
}
register_activation_hook( __FILE__, 'jwp_stk_activate' );

/**
 * Plugin deactivation callback.
 */
function jwp_stk_deactivate() {
	delete_transient( 'jwp_stk_activated' );
}
register_deactivation_hook( __FILE__, 'jwp_stk_deactivate' );
