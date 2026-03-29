<?php
/**
 * Base Module.
 *
 * Abstract base class for all Store Toolkit for WooCommerce modules.
 *
 * @package JWP_STK
 */

namespace JWP_STK\Modules;

use JWP_STK\Options;

defined( 'ABSPATH' ) || exit;

/**
 * Base_Module class.
 */
abstract class Base_Module {

	/**
	 * Get the module slug.
	 *
	 * @return string
	 */
	abstract public function get_slug();

	/**
	 * Get default settings for this module.
	 *
	 * @return array
	 */
	abstract public function get_defaults();

	/**
	 * Initialize the module.
	 *
	 * @return void
	 */
	abstract public function init();

	/**
	 * Get the options key for this module's settings.
	 *
	 * @return string
	 */
	public function get_option_key() {
		return 'module_' . str_replace( '-', '_', $this->get_slug() );
	}

	/**
	 * Get all settings for this module.
	 *
	 * @return array
	 */
	public function get_settings() {
		$defaults = $this->get_defaults();
		$saved    = Options::get_instance()->get( $this->get_option_key(), array() );

		if ( ! is_array( $saved ) ) {
			$saved = array();
		}

		return wp_parse_args( $saved, $defaults );
	}

	/**
	 * Get a single setting value.
	 *
	 * @param string $key     Setting key.
	 * @param mixed  $default Default value.
	 * @return mixed
	 */
	public function get_setting( $key, $default = null ) {
		$settings = $this->get_settings();

		if ( is_null( $default ) ) {
			$defaults = $this->get_defaults();
			$default  = isset( $defaults[ $key ] ) ? $defaults[ $key ] : false;
		}

		return isset( $settings[ $key ] ) ? $settings[ $key ] : $default;
	}

	/**
	 * Save settings for this module.
	 *
	 * Only saves keys defined in defaults.
	 *
	 * @param array $settings Settings to save.
	 * @return array Saved settings.
	 */
	public function save_settings( $settings ) {
		$defaults     = $this->get_defaults();
		$allowed_keys = array_keys( $defaults );
		$current      = $this->get_settings();
		$sanitized    = array();

		foreach ( $settings as $key => $value ) {
			if ( ! in_array( $key, $allowed_keys, true ) ) {
				continue;
			}

			$sanitized[ $key ] = $this->sanitize_setting( $key, $value );
		}

		$merged = wp_parse_args( $sanitized, $current );
		Options::get_instance()->set( $this->get_option_key(), $merged );

		return $merged;
	}

	/**
	 * Sanitize a setting value.
	 *
	 * Override in subclasses for custom sanitization.
	 *
	 * @param string $key   Setting key.
	 * @param mixed  $value Setting value.
	 * @return mixed
	 */
	public function sanitize_setting( $key, $value ) {
		$defaults = $this->get_defaults();

		if ( ! isset( $defaults[ $key ] ) ) {
			return sanitize_text_field( $value );
		}

		$default_value = $defaults[ $key ];

		if ( is_bool( $default_value ) ) {
			return (bool) $value;
		}

		if ( is_int( $default_value ) ) {
			return (int) $value;
		}

		if ( is_array( $default_value ) ) {
			return is_array( $value ) ? $value : $default_value;
		}

		return sanitize_text_field( $value );
	}

	/**
	 * Get the settings schema for REST API response.
	 *
	 * Modules can override this to provide additional metadata.
	 *
	 * @return array
	 */
	public function get_settings_schema() {
		return array(
			'settings' => $this->get_settings(),
			'defaults' => $this->get_defaults(),
		);
	}
}
