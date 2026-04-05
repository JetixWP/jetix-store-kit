<?php
/**
 * Module Manager.
 *
 * Handles registration, activation, and deactivation of modules.
 *
 * @package JWP_STK
 */

namespace JWP_STK;

defined( 'ABSPATH' ) || exit;

/**
 * Module_Manager class.
 */
class Module_Manager {

	/**
	 * Class instance.
	 *
	 * @var Module_Manager
	 */
	protected static $instance;

	/**
	 * Registered modules.
	 *
	 * @var array
	 */
	private $modules = array();

	/**
	 * Get an instance of class.
	 *
	 * @return Module_Manager
	 */
	public static function get_instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Constructor.
	 */
	public function __construct() {
		$this->register_modules();
	}

	/**
	 * Register all available modules.
	 *
	 * @return void
	 */
	private function register_modules() {
		$this->modules = array(
			// Core modules — enabled by default.
			'quick-view'            => array(
				'title'       => __( 'Product Quick View', 'jetix-store-toolkit' ),
				'description' => __( 'Let shoppers preview product details in a modal without leaving the shop page.', 'jetix-store-toolkit' ),
				'tier'        => 'core',
				'enabled'     => true,
				'default'     => false,
			),
			'cart-notices'          => array(
				'title'       => __( 'Cart Notices', 'jetix-store-toolkit' ),
				'description' => __( 'Show targeted messages in the cart — upsell thresholds, free shipping progress bars, limited-time alerts.', 'jetix-store-toolkit' ),
				'tier'        => 'core',
				'enabled'     => false,
				'default'     => false,
			),
			'custom-order-statuses' => array(
				'title'       => __( 'Custom Order Statuses', 'jetix-store-toolkit' ),
				'description' => __( 'Create custom order statuses beyond WooCommerce defaults.', 'jetix-store-toolkit' ),
				'tier'        => 'core',
				'enabled'     => true,
				'default'     => false,
			),
			'stock-manager'         => array(
				'title'       => __( 'Stock Manager', 'jetix-store-toolkit' ),
				'description' => __( 'Inline bulk stock editing from a single screen.', 'jetix-store-toolkit' ),
				'tier'        => 'core',
				'enabled'     => true,
				'default'     => false,
			),
			'product-tab-manager'   => array(
				'title'       => __( 'Product Tab Manager', 'jetix-store-toolkit' ),
				'description' => __( 'Add, remove, and reorder product page tabs with custom content.', 'jetix-store-toolkit' ),
				'tier'        => 'core',
				'enabled'     => true,
				'default'     => false,
			),
		);

		/**
		 * Filter registered modules.
		 *
		 * @param array $modules Registered modules.
		 */
		$this->modules = apply_filters( 'jwp_stk_registered_modules', $this->modules );
	}

	/**
	 * Get all registered modules.
	 *
	 * @return array
	 */
	public function get_modules() {
		return $this->modules;
	}

	/**
	 * Get modules available for activation.
	 *
	 * Only modules with 'enabled' set to true appear in the admin
	 * Modules UI. This is the single control point for module visibility.
	 *
	 * @return array
	 */
	public function get_available_modules() {
		$available = array_filter(
			$this->modules,
			function ( $module ) {
				return ! empty( $module['enabled'] );
			}
		);

		/**
		 * Filter available modules.
		 *
		 * @param array $available Available modules.
		 * @param array $all       All registered modules.
		 */
		return apply_filters( 'jwp_stk_available_modules', $available, $this->modules );
	}

	/**
	 * Get modules grouped by tier.
	 *
	 * @return array
	 */
	public function get_modules_by_tier() {
		$grouped = array(
			'core'   => array(),
			'growth' => array(),
			'power'  => array(),
		);

		foreach ( $this->modules as $slug => $module ) {
			$tier                      = isset( $module['tier'] ) ? $module['tier'] : 'core';
			$grouped[ $tier ][ $slug ] = $module;
		}

		return $grouped;
	}

	/**
	 * Check if a module is active.
	 *
	 * @param string $module_slug Module slug.
	 * @return bool
	 */
	public function is_module_active( $module_slug ) {
		$active_modules = Options::get_instance()->get( 'active_modules', array() );

		return in_array( $module_slug, $active_modules, true );
	}

	/**
	 * Get all active module slugs.
	 *
	 * @return array
	 */
	public function get_active_modules() {
		return Options::get_instance()->get( 'active_modules', array() );
	}

	/**
	 * Activate a module.
	 *
	 * @param string $module_slug Module slug.
	 * @return bool
	 */
	public function activate_module( $module_slug ) {
		if ( ! isset( $this->modules[ $module_slug ] ) ) {
			return false;
		}

		$active_modules = $this->get_active_modules();
		if ( ! in_array( $module_slug, $active_modules, true ) ) {
			$active_modules[] = $module_slug;
			Options::get_instance()->set( 'active_modules', $active_modules );
		}

		return true;
	}

	/**
	 * Deactivate a module.
	 *
	 * @param string $module_slug Module slug.
	 * @return bool
	 */
	public function deactivate_module( $module_slug ) {
		$active_modules = $this->get_active_modules();
		$key            = array_search( $module_slug, $active_modules, true );

		if ( false !== $key ) {
			unset( $active_modules[ $key ] );
			Options::get_instance()->set( 'active_modules', array_values( $active_modules ) );
		}

		return true;
	}
}
