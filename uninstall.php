<?php
/**
 * Store Kit for WooCommerce Uninstaller.
 *
 * Fired when the plugin is deleted via the WordPress admin.
 *
 * @package JWP_STK
 */

defined( 'WP_UNINSTALL_PLUGIN' ) || exit;

// Remove main options.
delete_option( 'jwp_stk_options' );

// Remove active modules list.
delete_option( 'jwp_stk_active_modules' );
