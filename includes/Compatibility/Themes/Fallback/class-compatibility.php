<?php
/**
 * Default/Fallback theme compatibility handler.
 *
 * @package JWP_STK
 */

namespace JWP_STK\Compatibility\Themes\Fallback;

use JWP_STK\Compatibility\Themes\Base_Compatibility;

defined( 'ABSPATH' ) || exit;

/**
 * Fallback Compatibility class.
 */
class Compatibility extends Base_Compatibility {

	/**
	 * Class instance.
	 *
	 * @var static
	 */
	protected static $instance;

	/**
	 * Constructor.
	 */
	public function __construct() {
		parent::__construct();

		$this->id    = 'default';
		$this->title = __( 'Default', 'jetix-store-toolkit' );

		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Enqueue scripts and styles.
	 *
	 * @return void
	 */
	public function enqueue_scripts() {
		$css_file = $this->get_current_dir() . 'Fallback/styles.css';

		if ( file_exists( $css_file ) ) {
			wp_register_style(
				'jwp-stk-fallback',
				$this->get_current_dir_url() . 'Fallback/styles.css',
				array(),
				filemtime( $css_file )
			);
			wp_enqueue_style( 'jwp-stk-fallback' );
		}
	}
}
