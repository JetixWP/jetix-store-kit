<?php
/**
 * Stock Manager Module.
 *
 * Adds an admin screen for inline bulk stock editing
 * from a single, filterable table view.
 *
 * @package JWP_STK
 */

namespace JWP_STK\Modules\StockManager;

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
		return 'stock-manager';
	}

	/**
	 * Get default settings.
	 *
	 * @return array
	 */
	public function get_defaults() {
		return array(
			'per_page'             => 20,
			'default_stock_status' => 'instock',
			'show_sku'             => true,
			'show_stock_status'    => true,
			'show_stock_quantity'  => true,
			'show_manage_stock'    => true,
			'show_backorders'      => true,
			'show_low_stock'       => true,
			'low_stock_threshold'  => 5,
		);
	}

	/**
	 * Initialise the module.
	 *
	 * @return void
	 */
	public function init() {
		add_action( 'admin_menu', array( $this, 'add_stock_page' ), 99 );
		add_action( 'wp_ajax_jwp_stk_stock_list', array( $this, 'ajax_get_products' ) );
		add_action( 'wp_ajax_jwp_stk_stock_update', array( $this, 'ajax_update_stock' ) );
	}

	/**
	 * Add Stock Manager submenu under WooCommerce.
	 *
	 * @return void
	 */
	public function add_stock_page() {
		$hook = add_submenu_page(
			'woocommerce',
			__( 'Stock Manager', 'jetix-store-toolkit' ),
			__( 'Stock Manager', 'jetix-store-toolkit' ),
			'manage_woocommerce',
			'jwp-stk-stock-manager',
			array( $this, 'render_page' )
		);

		add_action( 'admin_print_scripts-' . $hook, array( $this, 'enqueue_admin_assets' ) );
	}

	/**
	 * Enqueue admin assets for the stock manager page.
	 *
	 * @return void
	 */
	public function enqueue_admin_assets() {
		wp_enqueue_style(
			'jwp-stk-stock-manager',
			JWP_STK_PLUGIN_URL . 'assets/css/stock-manager.css',
			array(),
			JWP_STK_VERSION
		);

		wp_enqueue_script(
			'jwp-stk-stock-manager',
			JWP_STK_PLUGIN_URL . 'assets/js/stock-manager.js',
			array( 'jquery' ),
			JWP_STK_VERSION,
			true
		);

		wp_localize_script(
			'jwp-stk-stock-manager',
			'jwpStkStockManager',
			array(
				'ajaxUrl' => admin_url( 'admin-ajax.php' ),
				'nonce'   => wp_create_nonce( 'jwp_stk_stock_manager' ),
				'perPage' => $this->get_setting( 'per_page' ),
				'i18n'    => array(
					'saving'  => __( 'Saving…', 'jetix-store-toolkit' ),
					'saved'   => __( 'Saved', 'jetix-store-toolkit' ),
					'error'   => __( 'Error', 'jetix-store-toolkit' ),
					'noItems' => __( 'No products found.', 'jetix-store-toolkit' ),
				),
			)
		);
	}

	/**
	 * Render the Stock Manager admin page.
	 *
	 * @return void
	 */
	public function render_page() {
		$settings = $this->get_settings();
		?>
		<div class="wrap jwp-stk-stock-manager-wrap">
			<h1><?php esc_html_e( 'Stock Manager', 'jetix-store-toolkit' ); ?></h1>

			<div class="jwp-stk-stock-toolbar">
				<div class="jwp-stk-stock-filters">
					<select id="jwp-stk-stock-status-filter">
						<option value=""><?php esc_html_e( 'All stock statuses', 'jetix-store-toolkit' ); ?></option>
						<option value="instock"><?php esc_html_e( 'In stock', 'jetix-store-toolkit' ); ?></option>
						<option value="outofstock"><?php esc_html_e( 'Out of stock', 'jetix-store-toolkit' ); ?></option>
						<option value="onbackorder"><?php esc_html_e( 'On backorder', 'jetix-store-toolkit' ); ?></option>
						<?php if ( ! empty( $settings['show_low_stock'] ) ) : ?>
							<option value="lowstock"><?php esc_html_e( 'Low stock', 'jetix-store-toolkit' ); ?></option>
						<?php endif; ?>
					</select>

					<input type="search" id="jwp-stk-stock-search" placeholder="<?php esc_attr_e( 'Search products…', 'jetix-store-toolkit' ); ?>" />
				</div>
			</div>

			<table class="wp-list-table widefat fixed striped jwp-stk-stock-table">
				<thead>
					<tr>
						<th class="column-product"><?php esc_html_e( 'Product', 'jetix-store-toolkit' ); ?></th>
						<?php if ( ! empty( $settings['show_sku'] ) ) : ?>
							<th class="column-sku"><?php esc_html_e( 'SKU', 'jetix-store-toolkit' ); ?></th>
						<?php endif; ?>
						<?php if ( ! empty( $settings['show_stock_status'] ) ) : ?>
							<th class="column-stock-status"><?php esc_html_e( 'Stock Status', 'jetix-store-toolkit' ); ?></th>
						<?php endif; ?>
						<?php if ( ! empty( $settings['show_manage_stock'] ) ) : ?>
							<th class="column-manage-stock"><?php esc_html_e( 'Manage Stock', 'jetix-store-toolkit' ); ?></th>
						<?php endif; ?>
						<?php if ( ! empty( $settings['show_stock_quantity'] ) ) : ?>
							<th class="column-stock-qty"><?php esc_html_e( 'Quantity', 'jetix-store-toolkit' ); ?></th>
						<?php endif; ?>
						<?php if ( ! empty( $settings['show_backorders'] ) ) : ?>
							<th class="column-backorders"><?php esc_html_e( 'Backorders', 'jetix-store-toolkit' ); ?></th>
						<?php endif; ?>
						<th class="column-actions"><?php esc_html_e( 'Actions', 'jetix-store-toolkit' ); ?></th>
					</tr>
				</thead>
				<tbody id="jwp-stk-stock-body">
					<tr><td colspan="7"><?php esc_html_e( 'Loading…', 'jetix-store-toolkit' ); ?></td></tr>
				</tbody>
			</table>

			<div class="jwp-stk-stock-pagination" id="jwp-stk-stock-pagination"></div>
		</div>
		<?php
	}

	/**
	 * AJAX handler to get products for stock table.
	 *
	 * @return void
	 */
	public function ajax_get_products() {
		check_ajax_referer( 'jwp_stk_stock_manager', 'nonce' );

		if ( ! current_user_can( 'manage_woocommerce' ) ) {
			wp_send_json_error( array( 'message' => __( 'Permission denied.', 'jetix-store-toolkit' ) ) );
		}

		$page     = isset( $_POST['page'] ) ? absint( $_POST['page'] ) : 1;
		$search   = isset( $_POST['search'] ) ? sanitize_text_field( wp_unslash( $_POST['search'] ) ) : '';
		$status   = isset( $_POST['stock_status'] ) ? sanitize_text_field( wp_unslash( $_POST['stock_status'] ) ) : '';
		$per_page = $this->get_setting( 'per_page' );
		$settings = $this->get_settings();

		$args = array(
			'status'  => 'publish',
			'limit'   => $per_page,
			'page'    => $page,
			'orderby' => 'title',
			'order'   => 'ASC',
			'return'  => 'objects',
		);

		if ( $search ) {
			$args['s'] = $search;
		}

		if ( $status && 'lowstock' !== $status ) {
			$args['stock_status'] = $status;
		}

		$products = wc_get_products( $args );

		// Count total.
		$count_args           = $args;
		$count_args['limit']  = -1;
		$count_args['return'] = 'ids';
		$total                = count( wc_get_products( $count_args ) );

		$items = array();

		foreach ( $products as $product ) {
			$qty = $product->get_stock_quantity();

			// Low stock filter.
			if ( 'lowstock' === $status ) {
				$threshold = ! empty( $settings['low_stock_threshold'] ) ? (int) $settings['low_stock_threshold'] : 5;
				if ( null === $qty || $qty > $threshold ) {
					continue;
				}
			}

			$items[] = array(
				'id'           => $product->get_id(),
				'name'         => $product->get_name(),
				'sku'          => $product->get_sku(),
				'stock_status' => $product->get_stock_status(),
				'manage_stock' => $product->get_manage_stock(),
				'stock_qty'    => $qty,
				'backorders'   => $product->get_backorders(),
				'edit_url'     => get_edit_post_link( $product->get_id(), 'raw' ),
			);
		}

		wp_send_json_success(
			array(
				'items'    => $items,
				'total'    => $total,
				'pages'    => ceil( $total / $per_page ),
				'page'     => $page,
				'settings' => $settings,
			)
		);
	}

	/**
	 * AJAX handler to update a product's stock.
	 *
	 * @return void
	 */
	public function ajax_update_stock() {
		check_ajax_referer( 'jwp_stk_stock_manager', 'nonce' );

		if ( ! current_user_can( 'manage_woocommerce' ) ) {
			wp_send_json_error( array( 'message' => __( 'Permission denied.', 'jetix-store-toolkit' ) ) );
		}

		$product_id = isset( $_POST['product_id'] ) ? absint( $_POST['product_id'] ) : 0;
		$product    = wc_get_product( $product_id );

		if ( ! $product ) {
			wp_send_json_error( array( 'message' => __( 'Product not found.', 'jetix-store-toolkit' ) ) );
		}

		// Update stock status.
		if ( isset( $_POST['stock_status'] ) ) {
			$allowed_statuses = array( 'instock', 'outofstock', 'onbackorder' );
			$new_status       = sanitize_text_field( wp_unslash( $_POST['stock_status'] ) );

			if ( in_array( $new_status, $allowed_statuses, true ) ) {
				$product->set_stock_status( $new_status );
			}
		}

		// Update manage stock.
		if ( isset( $_POST['manage_stock'] ) ) {
			$product->set_manage_stock( (bool) $_POST['manage_stock'] );
		}

		// Update stock quantity.
		if ( isset( $_POST['stock_qty'] ) ) {
			$qty = '' === $_POST['stock_qty'] ? null : (int) $_POST['stock_qty'];
			$product->set_stock_quantity( $qty );
		}

		// Update backorders.
		if ( isset( $_POST['backorders'] ) ) {
			$allowed_backorders = array( 'no', 'notify', 'yes' );
			$backorders         = sanitize_text_field( wp_unslash( $_POST['backorders'] ) );

			if ( in_array( $backorders, $allowed_backorders, true ) ) {
				$product->set_backorders( $backorders );
			}
		}

		$product->save();

		wp_send_json_success(
			array(
				'id'           => $product->get_id(),
				'stock_status' => $product->get_stock_status(),
				'manage_stock' => $product->get_manage_stock(),
				'stock_qty'    => $product->get_stock_quantity(),
				'backorders'   => $product->get_backorders(),
			)
		);
	}
}
