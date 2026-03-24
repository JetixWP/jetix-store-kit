<?php
/**
 * REST API handler for Store Kit dashboard.
 *
 * @package JWP_STK
 */

namespace JWP_STK\Admin;

use WP_REST_Server;
use WP_REST_Request;
use WP_REST_Response;
use WP_Error;
use JWP_STK\Options;
use JWP_STK\Module_Manager;
use JWP_STK\Compatibility\Theme_Provider;

defined( 'ABSPATH' ) || exit;

/**
 * REST_API class.
 */
class REST_API {

	/**
	 * API Namespace.
	 *
	 * @var string
	 */
	const API_NAMESPACE = 'jwp-stk/v1';

	/**
	 * Class instance.
	 *
	 * @var REST_API
	 */
	protected static $instance;

	/**
	 * Get class instance.
	 *
	 * @return REST_API
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
		add_action( 'rest_api_init', array( $this, 'register_routes' ) );
	}

	/**
	 * Register REST API routes.
	 *
	 * @return void
	 */
	public function register_routes() {
		// Get all modules with their active state.
		register_rest_route(
			self::API_NAMESPACE,
			'/modules',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_modules' ),
				'permission_callback' => array( $this, 'check_permission' ),
			)
		);

		// Toggle module activation.
		register_rest_route(
			self::API_NAMESPACE,
			'/modules/toggle',
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'toggle_module' ),
				'permission_callback' => array( $this, 'check_permission' ),
				'args'                => array(
					'module' => array(
						'required'          => true,
						'type'              => 'string',
						'sanitize_callback' => 'sanitize_text_field',
					),
					'active' => array(
						'required' => true,
						'type'     => 'boolean',
					),
				),
			)
		);

		// Get settings.
		register_rest_route(
			self::API_NAMESPACE,
			'/settings',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_settings' ),
				'permission_callback' => array( $this, 'check_permission' ),
			)
		);

		// Save settings.
		register_rest_route(
			self::API_NAMESPACE,
			'/settings',
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'save_settings' ),
				'permission_callback' => array( $this, 'check_permission' ),
				'args'                => array(
					'settings' => array(
						'required' => true,
						'type'     => 'object',
					),
				),
			)
		);

		// Get module-specific settings.
		register_rest_route(
			self::API_NAMESPACE,
			'/modules/(?P<slug>[a-z0-9-]+)/settings',
			array(
				'methods'             => WP_REST_Server::READABLE,
				'callback'            => array( $this, 'get_module_settings' ),
				'permission_callback' => array( $this, 'check_permission' ),
				'args'                => array(
					'slug' => array(
						'required'          => true,
						'type'              => 'string',
						'sanitize_callback' => 'sanitize_text_field',
					),
				),
			)
		);

		// Save module-specific settings.
		register_rest_route(
			self::API_NAMESPACE,
			'/modules/(?P<slug>[a-z0-9-]+)/settings',
			array(
				'methods'             => WP_REST_Server::CREATABLE,
				'callback'            => array( $this, 'save_module_settings' ),
				'permission_callback' => array( $this, 'check_permission' ),
				'args'                => array(
					'slug'     => array(
						'required'          => true,
						'type'              => 'string',
						'sanitize_callback' => 'sanitize_text_field',
					),
					'settings' => array(
						'required' => true,
						'type'     => 'object',
					),
				),
			)
		);

		/**
		 * Fires after Store Kit REST routes are registered.
		 *
		 * @param string $namespace API namespace.
		 */
		do_action( 'jwp_stk_register_rest_routes', self::API_NAMESPACE );
	}

	/**
	 * Permission check for REST requests.
	 *
	 * @return bool|WP_Error
	 */
	public function check_permission() {
		if ( ! current_user_can( 'manage_options' ) ) {
			return new WP_Error(
				'jwp_stk_rest_forbidden',
				__( 'You do not have permission to access this resource.', 'store-kit' ),
				array( 'status' => 403 )
			);
		}
		return true;
	}

	/**
	 * Get all modules.
	 *
	 * @return WP_REST_Response
	 */
	public function get_modules() {
		$module_manager = Module_Manager::get_instance();
		$modules        = $module_manager->get_modules();
		$active_modules = $module_manager->get_active_modules();

		$response = array();

		foreach ( $modules as $slug => $module ) {
			$response[] = array(
				'slug'        => $slug,
				'title'       => $module['title'],
				'description' => $module['description'],
				'tier'        => $module['tier'],
				'enabled'     => ! empty( $module['enabled'] ),
				'active'      => in_array( $slug, $active_modules, true ),
			);
		}

		return new WP_REST_Response( $response, 200 );
	}

	/**
	 * Toggle module activation.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error
	 */
	public function toggle_module( WP_REST_Request $request ) {
		$module_slug = $request->get_param( 'module' );
		$active      = $request->get_param( 'active' );

		$module_manager = Module_Manager::get_instance();
		$modules        = $module_manager->get_modules();

		if ( ! isset( $modules[ $module_slug ] ) ) {
			return new WP_Error(
				'jwp_stk_invalid_module',
				__( 'Invalid module.', 'store-kit' ),
				array( 'status' => 400 )
			);
		}

		if ( empty( $modules[ $module_slug ]['enabled'] ) ) {
			return new WP_Error(
				'jwp_stk_module_not_available',
				__( 'This module is not available for activation.', 'store-kit' ),
				array( 'status' => 400 )
			);
		}

		if ( $active ) {
			$module_manager->activate_module( $module_slug );
		} else {
			$module_manager->deactivate_module( $module_slug );
		}

		return new WP_REST_Response(
			array(
				'success' => true,
				'module'  => $module_slug,
				'active'  => $active,
			),
			200
		);
	}

	/**
	 * Get settings.
	 *
	 * @return WP_REST_Response
	 */
	public function get_settings() {
		$options        = Options::get_instance();
		$theme_provider = Theme_Provider::get_instance();

		$settings = array(
			'theme_compatibility_engine' => $options->get( 'theme-compatibility-engine', 'auto' ),
			'available_theme_engines'    => $theme_provider->get_selectable_engine_options(),
			'active_theme_engine'        => $options->get( 'active-theme-engine', '' ),
			'automatic_theme_engine'     => $options->get( 'automatic-theme-engine', '' ),
		);

		/**
		 * Filter settings returned via REST API.
		 *
		 * @param array $settings Settings data.
		 */
		$settings = apply_filters( 'jwp_stk_rest_settings', $settings );

		return new WP_REST_Response( $settings, 200 );
	}

	/**
	 * Save settings.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response
	 */
	public function save_settings( WP_REST_Request $request ) {
		$settings = $request->get_param( 'settings' );
		$options  = Options::get_instance();

		// Allowlist of saveable settings.
		$allowed_keys = array(
			'theme-compatibility-engine',
		);

		/**
		 * Filter allowed setting keys.
		 *
		 * @param array $allowed_keys Allowed setting keys.
		 */
		$allowed_keys = apply_filters( 'jwp_stk_allowed_settings_keys', $allowed_keys );

		foreach ( $settings as $key => $value ) {
			if ( in_array( $key, $allowed_keys, true ) ) {
				$options->set( sanitize_text_field( $key ), sanitize_text_field( $value ) );
			}
		}

		return new WP_REST_Response(
			array(
				'success' => true,
			),
			200
		);
	}

	/**
	 * Get module-specific settings.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error
	 */
	public function get_module_settings( WP_REST_Request $request ) {
		$slug   = $request->get_param( 'slug' );
		$plugin = \JWP_STK\Plugin::get_instance();
		$module = $plugin->get_module( $slug );

		if ( ! $module ) {
			// Module not active, return defaults from class file if available.
			$module = $this->load_module_class( $slug );

			if ( ! $module ) {
				return new WP_Error(
					'jwp_stk_module_not_found',
					__( 'Module not found.', 'store-kit' ),
					array( 'status' => 404 )
				);
			}
		}

		return new WP_REST_Response( $module->get_settings_schema(), 200 );
	}

	/**
	 * Save module-specific settings.
	 *
	 * @param WP_REST_Request $request Request object.
	 * @return WP_REST_Response|WP_Error
	 */
	public function save_module_settings( WP_REST_Request $request ) {
		$slug     = $request->get_param( 'slug' );
		$settings = $request->get_param( 'settings' );
		$plugin   = \JWP_STK\Plugin::get_instance();
		$module   = $plugin->get_module( $slug );

		if ( ! $module ) {
			$module = $this->load_module_class( $slug );

			if ( ! $module ) {
				return new WP_Error(
					'jwp_stk_module_not_found',
					__( 'Module not found.', 'store-kit' ),
					array( 'status' => 404 )
				);
			}
		}

		$saved = $module->save_settings( $settings );

		return new WP_REST_Response(
			array(
				'success'  => true,
				'settings' => $saved,
			),
			200
		);
	}

	/**
	 * Attempt to load a module class for settings access.
	 *
	 * @param string $slug Module slug.
	 * @return \JWP_STK\Modules\Base_Module|null
	 */
	private function load_module_class( $slug ) {
		$map = array(
			'quick-view'            => 'QuickView',
			'checkout-field-editor' => 'CheckoutFieldEditor',
			'custom-order-statuses' => 'CustomOrderStatuses',
			'stock-manager'         => 'StockManager',
			'product-tab-manager'   => 'ProductTabManager',
		);

		if ( ! isset( $map[ $slug ] ) ) {
			return null;
		}

		$dir_name   = $map[ $slug ];
		$class_file = JWP_STK_PLUGIN_DIR . 'includes/Modules/' . $dir_name . '/class-module.php';

		if ( ! file_exists( $class_file ) ) {
			return null;
		}

		require_once $class_file;

		$class_name = '\\JWP_STK\\Modules\\' . $dir_name . '\\Module';

		if ( ! class_exists( $class_name ) ) {
			return null;
		}

		return new $class_name();
	}
}
