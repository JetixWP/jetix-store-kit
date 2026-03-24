<?php
/**
 * Storefront theme compatibility handler.
 *
 * @package JWP_STK
 */

namespace JWP_STK\Compatibility\Themes\Core\Storefront;

use JWP_STK\Compatibility\Themes\Base_Compatibility;

defined( 'ABSPATH' ) || exit;

/**
 * Storefront Compatibility class.
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

		$this->id    = 'storefront';
		$this->title = __( 'Storefront', 'store-kit' );

		add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
	}

	/**
	 * Enqueue scripts and styles.
	 *
	 * @return void
	 */
	public function enqueue_scripts() {
		$css_file = $this->get_current_dir() . 'Core/Storefront/styles.css';

		if ( file_exists( $css_file ) ) {
			wp_register_style(
				'jwp-stk-storefront',
				$this->get_current_dir_url() . 'Core/Storefront/styles.css',
				array(),
				filemtime( $css_file )
			);
			wp_enqueue_style( 'jwp-stk-storefront' );
		}
	}
}
