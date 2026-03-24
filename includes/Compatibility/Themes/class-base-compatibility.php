<?php
/**
 * Base theme compatibility class.
 *
 * @package JWP_STK
 */

namespace JWP_STK\Compatibility\Themes;

defined( 'ABSPATH' ) || exit;

/**
 * Abstract class for theme compatibility engines.
 *
 * @since 0.1.0
 */
abstract class Base_Compatibility {

	/**
	 * Compatibility id.
	 *
	 * @var string
	 */
	public $id = '';

	/**
	 * Compatibility title.
	 *
	 * @var string
	 */
	public $title = '';

	/**
	 * Class instance.
	 *
	 * @var static
	 */
	protected static $instance;

	/**
	 * Get instance (late static binding).
	 *
	 * @return static
	 */
	final public static function get_instance() {
		if ( null === static::$instance ) {
			static::$instance = new static();
		}
		return static::$instance;
	}

	/**
	 * Cloning not allowed.
	 *
	 * @return void
	 */
	private function __clone() {}

	/**
	 * Constructor.
	 */
	public function __construct() {
		add_filter( 'body_class', array( $this, 'set_body_classes' ) );
	}

	/**
	 * Get compatibility id.
	 *
	 * @return string
	 */
	public function get_id() {
		return $this->id;
	}

	/**
	 * Get compatibility title.
	 *
	 * @return string
	 */
	public function get_title() {
		return $this->title;
	}

	/**
	 * Get the Themes directory URL.
	 *
	 * @return string
	 */
	public function get_current_dir_url() {
		return JWP_STK_PLUGIN_URL . 'includes/Compatibility/Themes/';
	}

	/**
	 * Get the Themes directory path.
	 *
	 * @return string
	 */
	public function get_current_dir() {
		return JWP_STK_PLUGIN_DIR . 'includes/Compatibility/Themes/';
	}

	/**
	 * Set body classes.
	 *
	 * @param array $classes Body classes.
	 * @return array
	 */
	public function set_body_classes( $classes ) {
		$classes[] = 'jwp-stk-active';
		$classes[] = 'jwp-stk-theme-' . $this->id;

		return apply_filters( 'jwp_stk_body_classes', $classes );
	}
}
