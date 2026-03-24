<?php
/**
 * Theme compatibility provider.
 *
 * @package JWP_STK
 */

namespace JWP_STK\Compatibility;

use JWP_STK\Options;
use JWP_STK\Compatibility\Themes\Base_Compatibility;

defined( 'ABSPATH' ) || exit;

/**
 * Theme_Provider class.
 *
 * Manages theme compatibility engine loading.
 */
class Theme_Provider {

	/**
	 * Class instance.
	 *
	 * @var Theme_Provider
	 */
	protected static $instance;

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_action( 'after_setup_theme', array( $this, 'load_theme_compat' ) );
	}

	/**
	 * Get a class instance.
	 *
	 * @return Theme_Provider
	 */
	public static function get_instance() {
		if ( is_null( self::$instance ) ) {
			self::$instance = new self();
		}
		return self::$instance;
	}

	/**
	 * Get available theme engines.
	 *
	 * @return array
	 */
	public function get_theme_engines() {
		/**
		 * Filter available theme compatibility engines.
		 *
		 * @param array $engines Theme engines.
		 */
		return apply_filters(
			'jwp_stk_theme_compatibility_engines',
			array(
				'default'    => array(
					'title'       => __( 'Default', 'store-kit' ),
					'file_source' => JWP_STK_PLUGIN_DIR . 'includes/Compatibility/Themes/Fallback/class-compatibility.php',
					'class'       => 'JWP_STK\Compatibility\Themes\Fallback\Compatibility',
				),
				'storefront' => array(
					'title'       => __( 'Storefront', 'store-kit' ),
					'file_source' => JWP_STK_PLUGIN_DIR . 'includes/Compatibility/Themes/Core/Storefront/class-compatibility.php',
					'class'       => 'JWP_STK\Compatibility\Themes\Core\Storefront\Compatibility',
				),
			)
		);
	}

	/**
	 * Load the appropriate theme compatibility engine.
	 *
	 * @return void
	 */
	public function load_theme_compat() {
		$theme      = wp_get_theme();
		$theme_slug = strtolower( $theme->get_stylesheet() );
		$options    = Options::get_instance();

		$compatibility_engine = $options->get( 'theme-compatibility-engine' );

		// Disabled engine.
		if ( 'disabled' === $compatibility_engine ) {
			$options->set( 'active-theme-engine', $compatibility_engine );
			$options->delete( 'automatic-theme-engine' );
			return;
		}

		// Manually selected engine.
		if ( $compatibility_engine && 'auto' !== $compatibility_engine ) {
			$theme_slug = $compatibility_engine;
		}

		$theme_engines = $this->get_theme_engines();

		// Strip -child suffix for child themes.
		if ( str_contains( $theme_slug, '-child' ) ) {
			$theme_slug = str_replace( '-child', '', $theme_slug );
		}

		// Fall back to default if theme engine not registered.
		if ( ! in_array( $theme_slug, array_keys( $theme_engines ), true ) ) {
			$theme_slug = 'default';
		}

		require_once $theme_engines[ $theme_slug ]['file_source'];
		$theme_compat = $theme_engines[ $theme_slug ]['class']::get_instance();

		if ( ! $theme_compat instanceof Base_Compatibility ) {
			$options->set( 'theme-engine-error', __( 'Failed at registration', 'store-kit' ) );
			$options->set( 'active-theme-engine', __( 'Unregistered', 'store-kit' ) );
			return;
		}

		// Auto mode — record which engine was detected.
		if ( ! $compatibility_engine || 'auto' === $compatibility_engine ) {
			$options->set( 'automatic-theme-engine', $theme_compat->get_id() );
		}

		// Store active engine.
		$options->set( 'active-theme-engine', $theme_compat->get_id() );
	}

	/**
	 * Get registered engine ids and titles.
	 *
	 * @return array
	 */
	public function get_available_engines() {
		$registered = array();

		foreach ( $this->get_theme_engines() as $id => $data ) {
			$registered[ $id ] = $data['title'];
		}

		return $registered;
	}

	/**
	 * Get selectable engines for the settings UI.
	 *
	 * @return array
	 */
	public function get_selectable_engine_options() {
		$selectable = array(
			'disabled' => __( 'Disabled', 'store-kit' ),
			'auto'     => __( 'Auto (Recommended)', 'store-kit' ),
		);

		foreach ( $this->get_theme_engines() as $id => $data ) {
			$selectable[ $id ] = $data['title'];
		}

		return $selectable;
	}
}
