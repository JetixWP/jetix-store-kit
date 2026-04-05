<?php
/**
 * Product Tab Manager Module.
 *
 * Manage WooCommerce product page tabs — add custom tabs, disable
 * or reorder default tabs.
 *
 * @package JWP_STK
 */

namespace JWP_STK\Modules\ProductTabManager;

use JWP_STK\Modules\Base_Module;

defined( 'ABSPATH' ) || exit;

/**
 * Module class.
 */
class Module extends Base_Module {

	/**
	 * Get the module slug.
	 *
	 * @return string
	 */
	public function get_slug() {
		return 'product-tab-manager';
	}

	/**
	 * Get default settings.
	 *
	 * @return array
	 */
	public function get_defaults() {
		return array(
			'disable_description'          => false,
			'disable_additional_info'      => false,
			'disable_reviews'              => false,
			'description_title'            => '',
			'additional_information_title' => '',
			'reviews_title'                => '',
			'custom_tabs'                  => array(),
		);
	}

	/**
	 * Initialise the module.
	 *
	 * @return void
	 */
	public function init() {
		add_filter( 'woocommerce_product_tabs', array( $this, 'modify_product_tabs' ), 98 );
		add_action( 'edit_form_after_editor', array( $this, 'render_product_dynamic_tab_editors' ) );
		add_action( 'woocommerce_process_product_meta', array( $this, 'save_product_dynamic_tab_meta' ) );
		add_action( 'admin_enqueue_scripts', array( $this, 'enqueue_product_edit_styles' ) );
	}

	/**
	 * Enqueue admin styles for the product edit screen.
	 *
	 * @return void
	 */
	public function enqueue_product_edit_styles() {
		$screen = get_current_screen();

		if ( ! $screen || 'product' !== $screen->id ) {
			return;
		}

		wp_enqueue_style(
			'jwp-stk-product-tab-manager',
			JWP_STK_PLUGIN_URL . 'assets/css/product-tab-manager.css',
			array(),
			JWP_STK_VERSION
		);
	}

	/**
	 * Modify WooCommerce product tabs.
	 *
	 * @param array $tabs Product tabs.
	 * @return array
	 */
	public function modify_product_tabs( $tabs ) {
		$settings = $this->get_settings();

		// Disable default tabs if configured.
		if ( ! empty( $settings['disable_description'] ) ) {
			unset( $tabs['description'] );
		} elseif ( ! empty( $settings['description_title'] ) && isset( $tabs['description'] ) ) {
			$tabs['description']['title'] = sanitize_text_field( $settings['description_title'] );
		}

		if ( ! empty( $settings['disable_additional_info'] ) ) {
			unset( $tabs['additional_information'] );
		} elseif ( ! empty( $settings['additional_information_title'] ) && isset( $tabs['additional_information'] ) ) {
			$tabs['additional_information']['title'] = sanitize_text_field( $settings['additional_information_title'] );
		}

		if ( ! empty( $settings['disable_reviews'] ) ) {
			unset( $tabs['reviews'] );
		} elseif ( ! empty( $settings['reviews_title'] ) && isset( $tabs['reviews'] ) ) {
			$tabs['reviews']['title'] = sanitize_text_field( $settings['reviews_title'] );
		}

		// Add custom tabs.
		if ( ! empty( $settings['custom_tabs'] ) && is_array( $settings['custom_tabs'] ) ) {
			foreach ( $settings['custom_tabs'] as $index => $tab ) {
				if ( empty( $tab['title'] ) ) {
					continue;
				}

				$tab_key          = 'jwp_stk_custom_tab_' . $index;
				$tabs[ $tab_key ] = array(
					'title'        => sanitize_text_field( $tab['title'] ),
					'priority'     => isset( $tab['priority'] ) ? (int) $tab['priority'] : ( 50 + $index ),
					'callback'     => array( $this, 'render_custom_tab' ),
					'content'      => isset( $tab['content'] ) ? $tab['content'] : '',
					'content_type' => isset( $tab['content_type'] ) ? $tab['content_type'] : 'static',
					'id'           => isset( $tab['id'] ) ? sanitize_key( $tab['id'] ) : '',
				);
			}
		}

		return $tabs;
	}

	/**
	 * Render a custom tab's content.
	 *
	 * @param string $key Tab key.
	 * @param array  $tab Tab data.
	 * @return void
	 */
	public function render_custom_tab( $key, $tab ) {
		if ( isset( $tab['content_type'] ) && 'dynamic' === $tab['content_type'] && ! empty( $tab['id'] ) ) {
			$meta_key = '_jwp_stk_ptm_tab_' . sanitize_key( $tab['id'] );
			$content  = get_post_meta( get_the_ID(), $meta_key, true );
			if ( ! empty( $content ) ) {
				echo '<div class="jwp-stk-custom-tab-content">';
				echo wp_kses_post( wpautop( $content ) );
				echo '</div>';
			}
		} elseif ( ! empty( $tab['content'] ) ) {
			echo '<div class="jwp-stk-custom-tab-content">';
			echo wp_kses_post( wpautop( $tab['content'] ) );
			echo '</div>';
		}
	}

	/**
	 * Sanitize a setting value.
	 *
	 * @param string $key   Setting key.
	 * @param mixed  $value Setting value.
	 * @return mixed
	 */
	public function sanitize_setting( $key, $value ) {
		if ( 'custom_tabs' === $key && is_array( $value ) ) {
			return $this->sanitize_custom_tabs( $value );
		}

		return parent::sanitize_setting( $key, $value );
	}

	/**
	 * Sanitize custom tabs array.
	 *
	 * @param array $tabs Custom tabs data.
	 * @return array
	 */
	private function sanitize_custom_tabs( $tabs ) {
		$clean = array();

		foreach ( $tabs as $tab ) {
			if ( empty( $tab['title'] ) ) {
				continue;
			}

			$clean[] = array(
				'title'        => sanitize_text_field( $tab['title'] ),
				'content'      => isset( $tab['content'] ) ? wp_kses_post( $tab['content'] ) : '',
				'content_type' => isset( $tab['content_type'] ) && 'dynamic' === $tab['content_type'] ? 'dynamic' : 'static',
				'id'           => isset( $tab['id'] ) ? sanitize_key( $tab['id'] ) : '',
				'priority'     => isset( $tab['priority'] ) ? (int) $tab['priority'] : 50,
			);
		}

		return $clean;
	}

	/**
	 * Render dynamic tab editor fields below the product description on the product edit screen.
	 *
	 * Fires on `edit_form_after_editor`. Only outputs content when editing a product
	 * that has at least one custom tab configured with Dynamic Content.
	 *
	 * @param WP_Post $post The current post object.
	 * @return void
	 */
	public function render_product_dynamic_tab_editors( $post ) {
		if ( ! $post || 'product' !== get_post_type( $post ) ) {
			return;
		}

		$settings     = $this->get_settings();
		$dynamic_tabs = array_filter(
			$settings['custom_tabs'],
			function ( $tab ) {
				return isset( $tab['content_type'] )
					&& 'dynamic' === $tab['content_type']
					&& ! empty( $tab['id'] );
			}
		);

		if ( empty( $dynamic_tabs ) ) {
			return;
		}

		wp_nonce_field( 'jwp_stk_ptm_dynamic_tabs', 'jwp_stk_ptm_dynamic_tabs_nonce' );

		foreach ( $dynamic_tabs as $tab ) {
			$meta_key = '_jwp_stk_ptm_tab_' . sanitize_key( $tab['id'] );
			$value    = get_post_meta( $post->ID, $meta_key, true );
			?>
			<div class="postbox jwp-stk-ptm-dynamic-field">
				<h2 class="postbox-header"><label><?php echo esc_html( $tab['title'] ); ?></label></h2>
				<?php
				wp_editor(
					$value,
					'jwp_stk_ptm_tab_' . sanitize_key( $tab['id'] ),
					array(
						'textarea_name' => $meta_key,
						'media_buttons' => true,
						'teeny'         => false,
						'textarea_rows' => 10,
					)
				);
				?>
			</div>
			<?php
		}
	}

	/**
	 * Save dynamic tab content meta for a product.
	 *
	 * Fires on `woocommerce_process_product_meta`.
	 *
	 * @param int $product_id Product post ID.
	 * @return void
	 */
	public function save_product_dynamic_tab_meta( $product_id ) {
		if ( wp_is_post_autosave( $product_id ) || wp_is_post_revision( $product_id ) ) {
			return;
		}

		if ( ! current_user_can( 'edit_post', $product_id ) ) {
			return;
		}

		if ( ! isset( $_POST['jwp_stk_ptm_dynamic_tabs_nonce'] ) ) {
			return;
		}

		if ( ! wp_verify_nonce(
			sanitize_text_field( wp_unslash( $_POST['jwp_stk_ptm_dynamic_tabs_nonce'] ) ),
			'jwp_stk_ptm_dynamic_tabs'
		) ) {
			return;
		}

		$settings = $this->get_settings();

		foreach ( $settings['custom_tabs'] as $tab ) {
			if ( empty( $tab['content_type'] )
				|| 'dynamic' !== $tab['content_type']
				|| empty( $tab['id'] )
			) {
				continue;
			}

			$meta_key = '_jwp_stk_ptm_tab_' . sanitize_key( $tab['id'] );

			if ( isset( $_POST[ $meta_key ] ) ) {
				update_post_meta(
					$product_id,
					$meta_key,
					wp_kses_post( wp_unslash( $_POST[ $meta_key ] ) )
				);
			}
		}
	}
}
