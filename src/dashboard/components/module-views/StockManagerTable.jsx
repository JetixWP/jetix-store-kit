/**
 * Stock Manager — operational table view.
 *
 * Fetches products from the custom REST endpoint and lets users edit
 * stock fields inline (qty, status, manage stock, backorders), applying
 * all settings-tab controls (per page, column visibility, low stock filter).
 *
 * @package Jetix_Store_Toolkit
 */

import { useState, useEffect, useCallback } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { Button } from '../ui';

const STOCK_STATUS_OPTIONS = [
	{ value: 'instock', label: __( 'In Stock', 'jetix-store-toolkit' ) },
	{ value: 'outofstock', label: __( 'Out of Stock', 'jetix-store-toolkit' ) },
	{ value: 'onbackorder', label: __( 'On Backorder', 'jetix-store-toolkit' ) },
];

const STOCK_STATUS_COLORS = {
	instock: '#66A378',
	outofstock: '#DB5E50',
	onbackorder: '#EAB42E',
};

const BACKORDERS_OPTIONS = [
	{ value: 'no', label: __( 'Do not allow', 'jetix-store-toolkit' ) },
	{ value: 'notify', label: __( 'Allow, notify customer', 'jetix-store-toolkit' ) },
	{ value: 'yes', label: __( 'Allow', 'jetix-store-toolkit' ) },
];

const BASE_FILTERS = [
	{ value: '', label: __( 'All', 'jetix-store-toolkit' ) },
	{ value: 'instock', label: __( 'In Stock', 'jetix-store-toolkit' ) },
	{ value: 'outofstock', label: __( 'Out of Stock', 'jetix-store-toolkit' ) },
	{ value: 'onbackorder', label: __( 'On Backorder', 'jetix-store-toolkit' ) },
];

export default function StockManagerTable() {
	const [ products, setProducts ] = useState( [] );
	const [ settings, setSettings ] = useState( null );
	const [ edited, setEdited ] = useState( {} );
	const [ loading, setLoading ] = useState( true );
	const [ saving, setSaving ] = useState( false );
	const [ page, setPage ] = useState( 1 );
	const [ totalPages, setTotalPages ] = useState( 1 );
	const [ totalItems, setTotalItems ] = useState( 0 );
	const [ notice, setNotice ] = useState( null );
	const [ stockFilter, setStockFilter ] = useState( '' );
	const [ searchInput, setSearchInput ] = useState( '' );
	const [ search, setSearch ] = useState( '' );

	// Debounce search input.
	useEffect( () => {
		const timer = setTimeout( () => {
			setSearch( searchInput );
			setPage( 1 );
		}, 400 );
		return () => clearTimeout( timer );
	}, [ searchInput ] );

	const fetchProducts = useCallback(
		async ( pg, filter, searchTerm ) => {
			setLoading( true );
			try {
				let path = `/jwp-stk/v1/stock-manager/products?page=${ pg }`;
				if ( filter ) {
					path += `&stock_status=${ encodeURIComponent( filter ) }`;
				}
				if ( searchTerm ) {
					path += `&search=${ encodeURIComponent( searchTerm ) }`;
				}

				const data = await apiFetch( { path } );

				setProducts( data.items );
				setTotalPages( data.pages );
				setTotalItems( data.total );
				setSettings( data.settings );
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
		fetchProducts( page, stockFilter, search );
	}, [ page, stockFilter, search, fetchProducts ] );

	const handleFilterChange = ( filter ) => {
		setPage( 1 );
		setStockFilter( filter );
	};

	const handleFieldChange = ( id, field, value ) => {
		setEdited( ( prev ) => ( {
			...prev,
			[ id ]: { ...prev[ id ], [ field ]: value },
		} ) );
	};

	const handleSave = async () => {
		if ( Object.keys( edited ).length === 0 ) return;
		setSaving( true );
		setNotice( null );

		try {
			const updates = Object.entries( edited ).map( ( [ id, fields ] ) => {
				const update = { id: parseInt( id, 10 ) };

				if ( 'stock_status' in fields ) {
					update.stock_status = fields.stock_status;
				}
				if ( 'manage_stock' in fields ) {
					update.manage_stock = fields.manage_stock;
				}
				if ( 'stock_quantity' in fields ) {
					update.stock_quantity = parseInt( fields.stock_quantity, 10 );
					// Quantity change implies managed stock unless the user explicitly toggled it off.
					if ( ! ( 'manage_stock' in fields ) ) {
						update.manage_stock = true;
					}
				}
				if ( 'backorders' in fields ) {
					update.backorders = fields.backorders;
				}

				return update;
			} );

			await apiFetch( {
				path: '/wc/v3/products/batch',
				method: 'POST',
				data: { update: updates },
			} );

			setNotice( {
				status: 'success',
				message: __( 'Stock updated successfully.', 'jetix-store-toolkit' ),
			} );
			fetchProducts( page, stockFilter, search );
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
	const perPage = settings?.per_page || 20;
	const startItem = ( page - 1 ) * perPage + 1;
	const endItem = Math.min( page * perPage, totalItems );

	const filters = settings?.show_low_stock
		? [ ...BASE_FILTERS, { value: 'lowstock', label: __( 'Low Stock', 'jetix-store-toolkit' ) } ]
		: BASE_FILTERS;

	const colCount =
		1 +
		( settings?.show_sku ? 1 : 0 ) +
		( settings?.show_stock_status ? 1 : 0 ) +
		( settings?.show_manage_stock ? 1 : 0 ) +
		( settings?.show_stock_quantity ? 1 : 0 ) +
		( settings?.show_backorders ? 1 : 0 );

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
					{ filters.map( ( f ) => (
						<button
							key={ f.value }
							className={ `jstk-stock-filter-btn${ stockFilter === f.value ? ' is-active' : '' }` }
							onClick={ () => handleFilterChange( f.value ) }
						>
							{ f.label }
						</button>
					) ) }
				</div>
				<input
					type="search"
					className="jstk-stock-search-input"
					placeholder={ __( 'Search products\u2026', 'jetix-store-toolkit' ) }
					value={ searchInput }
					onChange={ ( e ) => setSearchInput( e.target.value ) }
				/>
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
								{ settings?.show_sku && (
									<th>{ __( 'SKU', 'jetix-store-toolkit' ) }</th>
								) }
								{ settings?.show_stock_status && (
									<th>{ __( 'Stock Status', 'jetix-store-toolkit' ) }</th>
								) }
								{ settings?.show_manage_stock && (
									<th>{ __( 'Manage Stock', 'jetix-store-toolkit' ) }</th>
								) }
								{ settings?.show_stock_quantity && (
									<th className="jstk-stock-table__col-qty">
										{ __( 'Stock Qty', 'jetix-store-toolkit' ) }
									</th>
								) }
								{ settings?.show_backorders && (
									<th>{ __( 'Backorders', 'jetix-store-toolkit' ) }</th>
								) }
							</tr>
						</thead>
						<tbody>
							{ products.map( ( product ) => {
								const editedFields = edited[ product.id ] || {};
								const currentQty =
									'stock_quantity' in editedFields
										? editedFields.stock_quantity
										: product.stock_qty ?? 0;
								const currentStatus =
									editedFields.stock_status ?? product.stock_status;
								const currentManageStock =
									'manage_stock' in editedFields
										? editedFields.manage_stock
										: product.manage_stock;
								const currentBackorders =
									editedFields.backorders ?? product.backorders;
								const isDirty = Object.keys( editedFields ).length > 0;

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
										{ settings?.show_sku && (
											<td className="jstk-stock-table__sku">
												{ product.sku || '\u2014' }
											</td>
										) }
										{ settings?.show_stock_status && (
											<td>
												<select
													className="jstk-stock-select"
													value={ currentStatus }
													onChange={ ( e ) =>
														handleFieldChange(
															product.id,
															'stock_status',
															e.target.value
														)
													}
												>
													{ STOCK_STATUS_OPTIONS.map( ( opt ) => (
														<option key={ opt.value } value={ opt.value }>
															{ opt.label }
														</option>
													) ) }
												</select>
											</td>
										) }
										{ settings?.show_manage_stock && (
											<td className="jstk-stock-table__manage">
												<input
													type="checkbox"
													className="jstk-stock-checkbox"
													checked={ !! currentManageStock }
													onChange={ ( e ) =>
														handleFieldChange(
															product.id,
															'manage_stock',
															e.target.checked
														)
													}
												/>
											</td>
										) }
										{ settings?.show_stock_quantity && (
											<td className="jstk-stock-table__qty">
												{ currentManageStock ? (
													<input
														type="number"
														className="jstk-stock-qty-input"
														value={ currentQty }
														onChange={ ( e ) =>
															handleFieldChange(
																product.id,
																'stock_quantity',
																e.target.value
															)
														}
														min="0"
													/>
												) : (
													<span className="jstk-stock-table__unmanaged">{ '\u2014' }</span>
												) }
											</td>
										) }
										{ settings?.show_backorders && (
											<td>
												<select
													className="jstk-stock-select"
													value={ currentBackorders }
													onChange={ ( e ) =>
														handleFieldChange(
															product.id,
															'backorders',
															e.target.value
														)
													}
												>
													{ BACKORDERS_OPTIONS.map( ( opt ) => (
														<option key={ opt.value } value={ opt.value }>
															{ opt.label }
														</option>
													) ) }
												</select>
											</td>
										) }
									</tr>
								);
							} ) }
							{ products.length === 0 && (
								<tr>
									<td colSpan={ colCount } className="jstk-stock-table__empty">
										{ __( 'No products found.', 'jetix-store-toolkit' ) }
									</td>
								</tr>
							) }
						</tbody>
					</table>

					{ totalItems > 0 && (
						<div className="jstk-stock-footer">
							<span className="jstk-stock-count">
								{ `${ startItem }\u2013${ endItem } ${ __( 'of', 'jetix-store-toolkit' ) } ${ totalItems }` }
							</span>
							<div className="jstk-stock-pagination">
								<Button
									variant="tertiary"
									disabled={ page <= 1 }
									onClick={ () => setPage( ( p ) => p - 1 ) }
								>
									{ __( '\u2039 Previous', 'jetix-store-toolkit' ) }
								</Button>
								<span className="jstk-stock-page-indicator">
									{ page } / { totalPages }
								</span>
								<Button
									variant="tertiary"
									disabled={ page >= totalPages }
									onClick={ () => setPage( ( p ) => p + 1 ) }
								>
									{ __( 'Next \u203a', 'jetix-store-toolkit' ) }
								</Button>
							</div>
						</div>
					) }
				</>
			) }
		</div>
	);
}
