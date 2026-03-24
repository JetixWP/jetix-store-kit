<?php
/**
 * Quick View Module.
 *
 * Adds a quick-view modal to product archives so shoppers can
 * preview product details without leaving the page.
 *
 * @package JWP_STK
 */

namespace JWP_STK\Modules\QuickView;

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
		return 'quick-view';
	}

	/**
	 * Get default settings.
	 *
	 * @return array
	 */
	public function get_defaults() {
		return array(
			'button_label'     => __( 'Quick View', 'store-kit' ),
			'button_position'  => 'after_add_to_cart',
			'show_gallery'     => true,
			'show_price'       => true,
			'show_rating'      => true,
			'show_excerpt'     => true,
			'show_add_to_cart' => true,
			'show_meta'        => true,
		);
	}

	/**
	 * Initialise the module.
	 *
	 * @return void
	 */
	public function init() {
		// Frontend hooks.
		if ( ! is_admin() ) {
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_assets' ) );
			$this->register_button_hook();
		}

		// AJAX handlers.
		add_action( 'wp_ajax_jwp_stk_quick_view', array( $this, 'ajax_quick_view' ) );
		add_action( 'wp_ajax_nopriv_jwp_stk_quick_view', array( $this, 'ajax_quick_view' ) );
	}

	/**
	 * Register the button position hook.
	 *
	 * @return void
	 */
	private function register_button_hook() {
		$position = $this->get_setting( 'button_position' );

		switch ( $position ) {
			case 'before_add_to_cart':
				add_action( 'woocommerce_after_shop_loop_item', array( $this, 'render_button' ), 9 );
				break;

			case 'after_add_to_cart':
			default:
				add_action( 'woocommerce_after_shop_loop_item', array( $this, 'render_button' ), 11 );
				break;
		}
	}

	/**
	 * Enqueue frontend assets.
	 *
	 * @return void
	 */
	public function enqueue_assets() {
		if ( ! is_shop() && ! is_product_taxonomy() && ! is_product_category() && ! is_product_tag() ) {
			return;
		}

		wp_enqueue_style(
			'jwp-stk-quick-view',
			JWP_STK_PLUGIN_URL . 'assets/css/quick-view.css',
			array(),
			JWP_STK_VERSION
		);

		wp_enqueue_script(
			'jwp-stk-quick-view',
			JWP_STK_PLUGIN_URL . 'assets/js/quick-view.js',
			array( 'jquery' ),
			JWP_STK_VERSION,
			true
		);

		wp_localize_script(
			'jwp-stk-quick-view',
			'jwpStkQuickView',
			array(
				'ajaxUrl' => admin_url( 'admin-ajax.php' ),
				'nonce'   => wp_create_nonce( 'jwp_stk_quick_view' ),
			)
		);
	}

	/**
	 * Render the Quick View button.
	 *
	 * @return void
	 */
	public function render_button() {
		global $product;

		if ( ! $product instanceof \WC_Product ) {
			return;
		}

		$label = $this->get_setting( 'button_label' );

		printf(
			'<button type="button" class="jwp-stk-quick-view-btn button" data-product-id="%d">%s</button>',
			esc_attr( $product->get_id() ),
			esc_html( $label )
		);
	}

	/**
	 * AJAX handler for loading quick view content.
	 *
	 * @return void
	 */
	public function ajax_quick_view() {
		check_ajax_referer( 'jwp_stk_quick_view', 'nonce' );

		$product_id = isset( $_POST['product_id'] ) ? absint( $_POST['product_id'] ) : 0;
		$product    = wc_get_product( $product_id );

		if ( ! $product ) {
			wp_send_json_error( array( 'message' => __( 'Product not found.', 'store-kit' ) ) );
		}

		$settings = $this->get_settings();

		ob_start();
		$this->render_modal_content( $product, $settings );
		$html = ob_get_clean();

		wp_send_json_success( array( 'html' => $html ) );
	}

	/**
	 * Render the modal content for a product.
	 *
	 * @param \WC_Product $product  Product object.
	 * @param array       $settings Module settings.
	 * @return void
	 */
	private function render_modal_content( $product, $settings ) {
		?>
		<div class="jwp-stk-qv-product">
			<?php if ( ! empty( $settings['show_gallery'] ) ) : ?>
				<div class="jwp-stk-qv-gallery">
					<?php
					$image_id  = $product->get_image_id();
					$image_url = $image_id ? wp_get_attachment_image_url( $image_id, 'woocommerce_single' ) : wc_placeholder_img_src( 'woocommerce_single' );
					$gallery   = $product->get_gallery_image_ids();
					?>
					<div class="jwp-stk-qv-main-image">
						<img src="<?php echo esc_url( $image_url ); ?>" alt="<?php echo esc_attr( $product->get_name() ); ?>" />
					</div>
					<?php if ( ! empty( $gallery ) ) : ?>
						<div class="jwp-stk-qv-thumbnails">
							<button type="button" class="jwp-stk-qv-thumb is-active" data-img="<?php echo esc_url( $image_url ); ?>">
								<?php echo wp_get_attachment_image( $image_id, 'thumbnail' ); ?>
							</button>
							<?php foreach ( array_slice( $gallery, 0, 4 ) as $gal_id ) : ?>
								<button type="button" class="jwp-stk-qv-thumb" data-img="<?php echo esc_url( wp_get_attachment_image_url( $gal_id, 'woocommerce_single' ) ); ?>">
									<?php echo wp_get_attachment_image( $gal_id, 'thumbnail' ); ?>
								</button>
							<?php endforeach; ?>
						</div>
					<?php endif; ?>
				</div>
			<?php endif; ?>

			<div class="jwp-stk-qv-summary">
				<h2 class="jwp-stk-qv-title"><?php echo esc_html( $product->get_name() ); ?></h2>

				<?php if ( ! empty( $settings['show_rating'] ) && 'yes' === get_option( 'woocommerce_enable_reviews' ) ) : ?>
					<div class="jwp-stk-qv-rating">
						<?php
						$rating = $product->get_average_rating();
						if ( $rating > 0 ) {
							echo wp_kses_post( wc_get_rating_html( $rating, $product->get_rating_count() ) );
						}
						?>
					</div>
				<?php endif; ?>

				<?php if ( ! empty( $settings['show_price'] ) ) : ?>
					<div class="jwp-stk-qv-price"><?php echo wp_kses_post( $product->get_price_html() ); ?></div>
				<?php endif; ?>

				<?php if ( ! empty( $settings['show_excerpt'] ) ) : ?>
					<div class="jwp-stk-qv-excerpt"><?php echo wp_kses_post( wpautop( $product->get_short_description() ) ); ?></div>
				<?php endif; ?>

				<?php if ( ! empty( $settings['show_add_to_cart'] ) && $product->is_purchasable() && $product->is_in_stock() ) : ?>
					<div class="jwp-stk-qv-add-to-cart">
						<?php if ( $product->is_type( 'simple' ) ) : ?>
							<a href="<?php echo esc_url( $product->add_to_cart_url() ); ?>" class="button alt add_to_cart_button ajax_add_to_cart" data-product_id="<?php echo esc_attr( $product->get_id() ); ?>">
								<?php echo esc_html( $product->add_to_cart_text() ); ?>
							</a>
						<?php else : ?>
							<a href="<?php echo esc_url( $product->get_permalink() ); ?>" class="button alt">
								<?php echo esc_html( $product->add_to_cart_text() ); ?>
							</a>
						<?php endif; ?>
					</div>
				<?php endif; ?>

				<?php if ( ! empty( $settings['show_meta'] ) ) : ?>
					<div class="jwp-stk-qv-meta">
						<?php if ( $product->get_sku() ) : ?>
							<span class="jwp-stk-qv-sku">
								<?php esc_html_e( 'SKU:', 'store-kit' ); ?> <?php echo esc_html( $product->get_sku() ); ?>
							</span>
						<?php endif; ?>
						<?php
						$categories = wc_get_product_category_list( $product->get_id(), ', ' );
						if ( $categories ) :
							?>
							<span class="jwp-stk-qv-categories">
								<?php echo wp_kses_post( $categories ); ?>
							</span>
						<?php endif; ?>
					</div>
				<?php endif; ?>

				<a href="<?php echo esc_url( $product->get_permalink() ); ?>" class="jwp-stk-qv-view-full">
					<?php esc_html_e( 'View full details', 'store-kit' ); ?> &rarr;
				</a>
			</div>
		</div>
		<?php
	}
}
