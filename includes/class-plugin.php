<?php
/**
 * Main plugin class.
 *
 * @package JWP_STK
 */

namespace JWP_STK;

use JWP_STK\Admin\Register;
use JWP_STK\Compatibility\Theme_Provider;

defined( 'ABSPATH' ) || exit;

/**
 * Plugin bootstrap class.
 */
final class Plugin {

	/**
	 * Class instance.
	 *
	 * @var Plugin
	 */
	protected static $instance;

	/**
	 * Admin register provider.
	 *
	 * @var Register
	 */
	public $admin_provider;

	/**
	 * Module Manager instance.
	 *
	 * @var Module_Manager
	 */
	public $module_manager;

	/**
	 * Theme compatibility provider.
	 *
	 * @var Theme_Provider
	 */
	public $theme_provider;

	/**
	 * Loaded module instances.
	 *
	 * @var array<string, \JWP_STK\Modules\Base_Module>
	 */
	public $modules = array();

	/**
	 * Module slug to class file map.
	 *
	 * @var array
	 */
	private static $module_map = array(
		'quick-view'            => 'QuickView',
		'checkout-field-editor' => 'CheckoutFieldEditor',
		'custom-order-statuses' => 'CustomOrderStatuses',
		'stock-manager'         => 'StockManager',
		'product-tab-manager'   => 'ProductTabManager',
	);

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->includes();
		$this->register();
	}

	/**
	 * Get a class instance.
	 *
	 * @return Plugin
	 */
	public static function get_instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();

			/**
			 * Store Kit loaded.
			 *
			 * Fires when Store Kit is fully loaded and instantiated.
			 *
			 * @since 0.1.0
			 */
			do_action( 'jwp_stk_loaded' );
		}

		return self::$instance;
	}

	/**
	 * Include plugin files.
	 *
	 * @return void
	 */
	public function includes() {
		// Core.
		require_once JWP_STK_PLUGIN_DIR . 'includes/class-options.php';
		require_once JWP_STK_PLUGIN_DIR . 'includes/class-module-manager.php';

		// Module base.
		require_once JWP_STK_PLUGIN_DIR . 'includes/Modules/class-base-module.php';

		// Admin.
		require_once JWP_STK_PLUGIN_DIR . 'includes/Admin/class-register.php';
		require_once JWP_STK_PLUGIN_DIR . 'includes/Admin/class-admin-dashboard.php';
		require_once JWP_STK_PLUGIN_DIR . 'includes/Admin/class-rest-api.php';

		// Theme compatibility.
		require_once JWP_STK_PLUGIN_DIR . 'includes/Compatibility/Themes/class-base-compatibility.php';
		require_once JWP_STK_PLUGIN_DIR . 'includes/Compatibility/class-theme-provider.php';
	}

	/**
	 * Register plugin classes and hooks.
	 *
	 * @return void
	 */
	public function register() {
		// Core providers.
		$this->module_manager = Module_Manager::get_instance();
		$this->admin_provider = Register::get_instance();

		// Theme compatibility.
		$this->theme_provider = Theme_Provider::get_instance();

		// Boot active modules.
		$this->boot_modules();

		// Plugin action links.
		add_filter( 'plugin_action_links_' . JWP_STK_PLUGIN_BASE, array( $this, 'filter_plugin_action_links' ) );
		add_filter( 'network_admin_plugin_action_links_' . JWP_STK_PLUGIN_BASE, array( $this, 'filter_plugin_action_links' ) );

		// Declare WooCommerce HPOS compatibility.
		add_action( 'before_woocommerce_init', array( $this, 'declare_hpos_compatibility' ) );
	}

	/**
	 * Add settings link at plugins page action links.
	 *
	 * @param array $actions Action links.
	 * @return array
	 */
	public function filter_plugin_action_links( array $actions ) {
		$settings_url = admin_url( 'admin.php?page=jwp-stk' );

		return array_merge(
			array(
				'settings' => '<a href="' . esc_url( $settings_url ) . '">' . esc_html__( 'Settings', 'store-kit' ) . '</a>',
			),
			$actions
		);
	}

	/**
	 * Declare HPOS compatibility.
	 *
	 * @return void
	 */
	public function declare_hpos_compatibility() {
		if ( class_exists( \Automattic\WooCommerce\Utilities\FeaturesUtil::class ) ) {
			\Automattic\WooCommerce\Utilities\FeaturesUtil::declare_compatibility( 'custom_order_tables', JWP_STK_PLUGIN_FILE, true );
		}
	}

	/**
	 * Load and initialise active modules.
	 *
	 * @return void
	 */
	private function boot_modules() {
		$active_slugs = $this->module_manager->get_active_modules();

		foreach ( $active_slugs as $slug ) {
			if ( ! isset( self::$module_map[ $slug ] ) ) {
				continue;
			}

			$dir_name   = self::$module_map[ $slug ];
			$class_file = JWP_STK_PLUGIN_DIR . 'includes/Modules/' . $dir_name . '/class-module.php';

			if ( ! file_exists( $class_file ) ) {
				continue;
			}

			require_once $class_file;

			$class_name = '\\JWP_STK\\Modules\\' . $dir_name . '\\Module';

			if ( class_exists( $class_name ) ) {
				$instance = new $class_name();
				$instance->init();
				$this->modules[ $slug ] = $instance;
			}
		}
	}

	/**
	 * Get a loaded module instance.
	 *
	 * @param string $slug Module slug.
	 * @return \JWP_STK\Modules\Base_Module|null
	 */
	public function get_module( $slug ) {
		return isset( $this->modules[ $slug ] ) ? $this->modules[ $slug ] : null;
	}
}
