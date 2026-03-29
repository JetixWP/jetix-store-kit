<?php
/**
 * Admin registration handler.
 *
 * @package JWP_STK
 */

namespace JWP_STK\Admin;

defined( 'ABSPATH' ) || exit;

/**
 * Register admin menus and assets.
 */
class Register {

	/**
	 * Class instance.
	 *
	 * @var Register
	 */
	protected static $instance;

	/**
	 * REST API instance.
	 *
	 * @var REST_API
	 */
	public $rest_api;

	/**
	 * Get an instance of class.
	 *
	 * @return Register
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
		add_action( 'admin_menu', array( $this, 'register_menu' ) );

		$this->rest_api = REST_API::get_instance();
	}

	/**
	 * Register plugin menu.
	 *
	 * @return void
	 */
	public function register_menu() {
		add_menu_page(
			__( 'Store Toolkit', 'jetix-store-toolkit' ),
			__( 'Store Toolkit', 'jetix-store-toolkit' ),
			'manage_options',
			'jetix-store-toolkit',
			array( $this, 'render_dashboard' ),
			'dashicons-store',
			58
		);

		// Dashboard — first submenu replaces parent link.
		add_submenu_page(
			'jetix-store-toolkit',
			__( 'Dashboard — Store Toolkit', 'jetix-store-toolkit' ),
			__( 'Dashboard', 'jetix-store-toolkit' ),
			'manage_options',
			'jetix-store-toolkit',
			array( $this, 'render_dashboard' )
		);

		add_submenu_page(
			'jetix-store-toolkit',
			__( 'Modules — Store Toolkit', 'jetix-store-toolkit' ),
			__( 'Modules', 'jetix-store-toolkit' ),
			'manage_options',
			'jwp-stk-modules',
			array( $this, 'render_dashboard' )
		);

		add_submenu_page(
			'jetix-store-toolkit',
			__( 'Global Settings — Store Toolkit', 'jetix-store-toolkit' ),
			__( 'Global Settings', 'jetix-store-toolkit' ),
			'manage_options',
			'jwp-stk-settings',
			array( $this, 'render_dashboard' )
		);
	}

	/**
	 * Render the dashboard page (React app mount point).
	 *
	 * @return void
	 */
	public function render_dashboard() {
		Admin_Dashboard::output();
	}
}
