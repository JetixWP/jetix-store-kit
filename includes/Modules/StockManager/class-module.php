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
		add_action( 'rest_api_init', array( $this, 'register_rest_routes' ) );
	}

	/**
	 * Register REST API routes for the React Stock Manager.
	 *
	 * @return void
	 */
	public function register_rest_routes() {
		register_rest_route(
			'jwp-stk/v1',
			'/stock-manager/products',
			array(
				'methods'             => \WP_REST_Server::READABLE,
				'callback'            => array( $this, 'rest_get_products' ),
				'permission_callback' => function () {
					return current_user_can( 'manage_woocommerce' );
				},
				'args'                => array(
					'page'         => array(
						'type'    => 'integer',
						'default' => 1,
						'minimum' => 1,
					),
					'search'       => array(
						'type'              => 'string',
						'default'           => '',
						'sanitize_callback' => 'sanitize_text_field',
					),
					'stock_status' => array(
						'type'              => 'string',
						'default'           => '',
						'sanitize_callback' => 'sanitize_text_field',
					),
				),
			)
		);

		register_rest_route(
			'jwp-stk/v1',
			'/stock-manager/products/(?P<id>\d+)',
			array(
				'methods'             => \WP_REST_Server::EDITABLE,
				'callback'            => array( $this, 'rest_update_product' ),
				'permission_callback' => function () {
					return current_user_can( 'manage_woocommerce' );
				},
				'args'                => array(
					'id'             => array(
						'required' => true,
						'type'     => 'integer',
						'minimum'  => 1,
					),
					'stock_status'   => array(
						'type' => 'string',
						'enum' => array( 'instock', 'outofstock', 'onbackorder' ),
					),
					'manage_stock'   => array(
						'type' => 'boolean',
					),
					'stock_quantity' => array(
						'type' => 'integer',
					),
					'backorders'     => array(
						'type' => 'string',
						'enum' => array( 'no', 'notify', 'yes' ),
					),
				),
			)
		);
	}

	/**
	 * REST handler: get products for the React Stock Manager table.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response
	 */
	public function rest_get_products( \WP_REST_Request $request ) {
		$page     = (int) $request->get_param( 'page' );
		$search   = sanitize_text_field( $request->get_param( 'search' ) );
		$status   = sanitize_text_field( $request->get_param( 'stock_status' ) );
		$settings = $this->get_settings();
		$per_page = ! empty( $settings['per_page'] ) ? (int) $settings['per_page'] : 20;

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

		// Count total for non-lowstock requests.
		$count_args           = $args;
		$count_args['limit']  = -1;
		$count_args['return'] = 'ids';
		$total                = count( wc_get_products( $count_args ) );

		$items = array();

		foreach ( $products as $product ) {
			$qty = $product->get_stock_quantity();

			// Low stock filter: apply threshold client requested.
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
				'manage_stock' => (bool) $product->get_manage_stock(),
				'stock_qty'    => $qty,
				'backorders'   => $product->get_backorders(),
				'type'         => $product->get_type(),
			);
		}

		return new \WP_REST_Response(
			array(
				'items'    => $items,
				'total'    => $total,
				'pages'    => (int) ceil( $total / $per_page ),
				'page'     => $page,
				'settings' => $settings,
			),
			200
		);
	}

	/**
	 * REST handler: update a single product's stock fields.
	 *
	 * @param \WP_REST_Request $request Request object.
	 * @return \WP_REST_Response|\WP_Error
	 */
	public function rest_update_product( \WP_REST_Request $request ) {
		$product_id = (int) $request->get_param( 'id' );
		$product    = wc_get_product( $product_id );

		if ( ! $product ) {
			return new \WP_Error(
				'jwp_stk_product_not_found',
				__( 'Product not found.', 'jetix-store-toolkit' ),
				array( 'status' => 404 )
			);
		}

		if ( $request->has_param( 'stock_status' ) ) {
			$allowed = array( 'instock', 'outofstock', 'onbackorder' );
			$val     = sanitize_text_field( $request->get_param( 'stock_status' ) );
			if ( in_array( $val, $allowed, true ) ) {
				$product->set_stock_status( $val );
			}
		}

		if ( $request->has_param( 'manage_stock' ) ) {
			$product->set_manage_stock( (bool) $request->get_param( 'manage_stock' ) );
		}

		if ( $request->has_param( 'stock_quantity' ) ) {
			$qty = $request->get_param( 'stock_quantity' );
			$product->set_stock_quantity( null === $qty ? null : (int) $qty );
		}

		if ( $request->has_param( 'backorders' ) ) {
			$allowed = array( 'no', 'notify', 'yes' );
			$val     = sanitize_text_field( $request->get_param( 'backorders' ) );
			if ( in_array( $val, $allowed, true ) ) {
				$product->set_backorders( $val );
			}
		}

		$product->save();

		return new \WP_REST_Response(
			array(
				'id'             => $product->get_id(),
				'stock_status'   => $product->get_stock_status(),
				'manage_stock'   => (bool) $product->get_manage_stock(),
				'stock_quantity' => $product->get_stock_quantity(),
				'backorders'     => $product->get_backorders(),
			),
			200
		);
	}
}
