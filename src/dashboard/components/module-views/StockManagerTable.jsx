/**
 * Stock Manager — operational table view.
 *
 * Fetches products from the WooCommerce REST API and lets users
 * edit stock quantities inline, then batch-save the changes.
 *
 * @package Jetix_Store_Toolkit
 */

import { useState, useEffect, useCallback } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { Button } from '../ui';

const STOCK_STATUS_LABELS = {
	instock: __( 'In Stock', 'jetix-store-toolkit' ),
	outofstock: __( 'Out of Stock', 'jetix-store-toolkit' ),
	onbackorder: __( 'On Backorder', 'jetix-store-toolkit' ),
};

const STOCK_STATUS_COLORS = {
	instock: '#66A378',
	outofstock: '#DB5E50',
	onbackorder: '#EAB42E',
};

const FILTERS = [
	{ value: '', label: __( 'All', 'jetix-store-toolkit' ) },
	{ value: 'instock', label: __( 'In Stock', 'jetix-store-toolkit' ) },
	{ value: 'outofstock', label: __( 'Out of Stock', 'jetix-store-toolkit' ) },
	{ value: 'onbackorder', label: __( 'On Backorder', 'jetix-store-toolkit' ) },
];

const PER_PAGE = 20;

export default function StockManagerTable() {
	const [ products, setProducts ] = useState( [] );
	const [ edited, setEdited ] = useState( {} );
	const [ loading, setLoading ] = useState( true );
	const [ saving, setSaving ] = useState( false );
	const [ page, setPage ] = useState( 1 );
	const [ totalPages, setTotalPages ] = useState( 1 );
	const [ totalItems, setTotalItems ] = useState( 0 );
	const [ notice, setNotice ] = useState( null );
	const [ stockFilter, setStockFilter ] = useState( '' );

	const fetchProducts = useCallback(
		async ( pg, filter ) => {
			setLoading( true );
			try {
				let path = `/wc/v3/products?per_page=${ PER_PAGE }&page=${ pg }&status=publish&_fields=id,name,sku,stock_quantity,stock_status,manage_stock,type`;
				if ( filter ) {
					path += `&stock_status=${ filter }`;
				}

				const response = await apiFetch( { path, parse: false } );
				const data = await response.json();
				const tp = parseInt( response.headers.get( 'X-WP-TotalPages' ) || '1', 10 );
				const ti = parseInt( response.headers.get( 'X-WP-Total' ) || '0', 10 );

				setProducts( data );
				setTotalPages( tp );
				setTotalItems( ti );
				setEdited( {} );
			} catch {
				setNotice( {
					status: 'error',
					message: __( 'Failed to load products.', 'jetix-store-toolkit' ),
				} );
			} finally {
				setLoading( false );
			}
		},
		[]
	);

	useEffect( () => {
		fetchProducts( page, stockFilter );
	}, [ page, stockFilter, fetchProducts ] );

	const handleFilterChange = ( filter ) => {
		setPage( 1 );
		setStockFilter( filter );
	};

	const handleQtyChange = ( id, value ) => {
		setEdited( ( prev ) => ( { ...prev, [ id ]: value } ) );
	};

	const handleSave = async () => {
		if ( Object.keys( edited ).length === 0 ) return;
		setSaving( true );
		setNotice( null );

		try {
			const updates = Object.entries( edited ).map( ( [ id, qty ] ) => ( {
				id: parseInt( id, 10 ),
				stock_quantity: parseInt( qty, 10 ),
				manage_stock: true,
			} ) );

			await apiFetch( {
				path: '/wc/v3/products/batch',
				method: 'POST',
				data: { update: updates },
			} );

			setNotice( {
				status: 'success',
				message: __( 'Stock updated successfully.', 'jetix-store-toolkit' ),
			} );
			fetchProducts( page, stockFilter );
		} catch {
			setNotice( {
				status: 'error',
				message: __( 'Failed to save stock changes.', 'jetix-store-toolkit' ),
			} );
		} finally {
			setSaving( false );
		}
	};

	const hasEdits = Object.keys( edited ).length > 0;
	const startItem = ( page - 1 ) * PER_PAGE + 1;
	const endItem = Math.min( page * PER_PAGE, totalItems );

	return (
		<div className="jstk-stock-wrap">
			{ notice && (
				<div className="jstk-stock-notice">
					<div className={ `jstk-notice jstk-notice--${ notice.status }` }>
						<span>{ notice.message }</span>
						<button className="jstk-notice__dismiss" onClick={ () => setNotice( null ) }>
							&times;
						</button>
					</div>
				</div>
			) }

			<div className="jstk-stock-toolbar">
				<div className="jstk-stock-filters">
					{ FILTERS.map( ( f ) => (
						<button
							key={ f.value }
							className={ `jstk-stock-filter-btn${ stockFilter === f.value ? ' is-active' : '' }` }
							onClick={ () => handleFilterChange( f.value ) }
						>
							{ f.label }
						</button>
					) ) }
				</div>
				{ hasEdits && (
					<Button
						variant="primary"
						onClick={ handleSave }
						isBusy={ saving }
						disabled={ saving }
					>
						{ __( 'Save Changes', 'jetix-store-toolkit' ) }
					</Button>
				) }
			</div>

			{ loading ? (
				<div className="jstk-loading" style={ { minHeight: '220px' } }>
					<Spinner />
				</div>
			) : (
				<>
					<table className="jstk-stock-table">
						<thead>
							<tr>
								<th>{ __( 'Product', 'jetix-store-toolkit' ) }</th>
								<th>{ __( 'SKU', 'jetix-store-toolkit' ) }</th>
								<th className="jstk-stock-table__col-qty">
									{ __( 'Stock Qty', 'jetix-store-toolkit' ) }
								</th>
								<th>{ __( 'Status', 'jetix-store-toolkit' ) }</th>
							</tr>
						</thead>
						<tbody>
							{ products.map( ( product ) => {
								const currentQty =
									edited[ product.id ] !== undefined
										? edited[ product.id ]
										: product.stock_quantity ?? 0;
								const isDirty = edited[ product.id ] !== undefined;

								return (
									<tr
										key={ product.id }
										className={ isDirty ? 'is-edited' : '' }
									>
										<td className="jstk-stock-table__name">
										<div className="jstk-stock-table__name-inner">
											{ product.name }
											{ product.type === 'variable' && (
												<span className="jstk-stock-table__type-badge">
													{ __( 'Variable', 'jetix-store-toolkit' ) }
												</span>
											) }
										</div>
										</td>
										<td className="jstk-stock-table__sku">
											{ product.sku || '—' }
										</td>
										<td className="jstk-stock-table__qty">
											{ product.manage_stock ? (
												<input
													type="number"
													className="jstk-stock-qty-input"
													value={ currentQty }
													onChange={ ( e ) =>
														handleQtyChange( product.id, e.target.value )
													}
													min="0"
												/>
											) : (
												<span className="jstk-stock-table__unmanaged">—</span>
											) }
										</td>
										<td>
											<span
												className="jstk-stock-status-badge"
												style={ {
													'--badge-color':
														STOCK_STATUS_COLORS[ product.stock_status ] ||
														'#858586',
												} }
											>
												{ STOCK_STATUS_LABELS[ product.stock_status ] ||
													product.stock_status }
											</span>
										</td>
									</tr>
								);
							} ) }
							{ products.length === 0 && (
								<tr>
									<td colSpan="4" className="jstk-stock-table__empty">
										{ __( 'No products found.', 'jetix-store-toolkit' ) }
									</td>
								</tr>
							) }
						</tbody>
					</table>

					{ totalItems > 0 && (
						<div className="jstk-stock-footer">
							<span className="jstk-stock-count">
								{ `${ startItem }–${ endItem } ${ __( 'of', 'jetix-store-toolkit' ) } ${ totalItems }` }
							</span>
							<div className="jstk-stock-pagination">
								<Button
									variant="tertiary"
									disabled={ page <= 1 }
									onClick={ () => setPage( ( p ) => p - 1 ) }
								>
									{ __( '‹ Previous', 'jetix-store-toolkit' ) }
								</Button>
								<span className="jstk-stock-page-indicator">
									{ page } / { totalPages }
								</span>
								<Button
									variant="tertiary"
									disabled={ page >= totalPages }
									onClick={ () => setPage( ( p ) => p + 1 ) }
								>
									{ __( 'Next ›', 'jetix-store-toolkit' ) }
								</Button>
							</div>
						</div>
					) }
				</>
			) }
		</div>
	);
}
