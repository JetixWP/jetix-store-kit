/**
 * Stock Manager Module — Admin Script.
 *
 * @package JWP_STK
 */
( function( $ ) {
	'use strict';

	if ( typeof jwpStkStockManager === 'undefined' ) {
		return;
	}

	var currentPage = 1;
	var currentSearch = '';
	var currentStatus = '';

	/**
	 * Load products via AJAX.
	 */
	function loadProducts( page ) {
		page = page || 1;
		currentPage = page;

		var $tbody = $( '#jwp-stk-stock-body' );
		$tbody.html( '<tr><td colspan="7">' + jwpStkStockManager.i18n.saving.replace( '…', '…' ) + '</td></tr>' );

		$.ajax( {
			url: jwpStkStockManager.ajaxUrl,
			type: 'POST',
			data: {
				action: 'jwp_stk_stock_list',
				nonce: jwpStkStockManager.nonce,
				page: page,
				search: currentSearch,
				stock_status: currentStatus,
			},
			success: function( response ) {
				if ( response.success ) {
					renderProducts( response.data.items, response.data.settings );
					renderPagination( response.data.pages, response.data.page );
				}
			},
		} );
	}

	/**
	 * Render product rows.
	 */
	function renderProducts( items, settings ) {
		var $tbody = $( '#jwp-stk-stock-body' );
		$tbody.empty();

		if ( ! items.length ) {
			$tbody.html( '<tr><td colspan="7">' + jwpStkStockManager.i18n.noItems + '</td></tr>' );
			return;
		}

		$.each( items, function( i, item ) {
			var row = '<tr data-product-id="' + item.id + '">';

			// Product name.
			row += '<td class="column-product"><a href="' + item.edit_url + '" target="_blank">' + escHtml( item.name ) + '</a></td>';

			// SKU.
			if ( settings.show_sku ) {
				row += '<td class="column-sku">' + escHtml( item.sku || '—' ) + '</td>';
			}

			// Stock status.
			if ( settings.show_stock_status ) {
				row += '<td class="column-stock-status">' +
					'<select class="jwp-stk-field" data-field="stock_status">' +
						'<option value="instock"' + ( item.stock_status === 'instock' ? ' selected' : '' ) + '>In stock</option>' +
						'<option value="outofstock"' + ( item.stock_status === 'outofstock' ? ' selected' : '' ) + '>Out of stock</option>' +
						'<option value="onbackorder"' + ( item.stock_status === 'onbackorder' ? ' selected' : '' ) + '>On backorder</option>' +
					'</select></td>';
			}

			// Manage stock.
			if ( settings.show_manage_stock ) {
				row += '<td class="column-manage-stock">' +
					'<input type="checkbox" class="jwp-stk-field" data-field="manage_stock"' + ( item.manage_stock ? ' checked' : '' ) + ' />' +
					'</td>';
			}

			// Stock qty.
			if ( settings.show_stock_quantity ) {
				var qtyVal = item.stock_qty !== null ? item.stock_qty : '';
				row += '<td class="column-stock-qty">' +
					'<input type="number" class="jwp-stk-field" data-field="stock_qty" value="' + qtyVal + '" min="0" step="1" />' +
					'</td>';
			}

			// Backorders.
			if ( settings.show_backorders ) {
				row += '<td class="column-backorders">' +
					'<select class="jwp-stk-field" data-field="backorders">' +
						'<option value="no"' + ( item.backorders === 'no' ? ' selected' : '' ) + '>Do not allow</option>' +
						'<option value="notify"' + ( item.backorders === 'notify' ? ' selected' : '' ) + '>Allow, notify</option>' +
						'<option value="yes"' + ( item.backorders === 'yes' ? ' selected' : '' ) + '>Allow</option>' +
					'</select></td>';
			}

			// Actions.
			row += '<td class="column-actions"><button type="button" class="button jwp-stk-stock-save-btn">Save</button></td>';

			row += '</tr>';
			$tbody.append( row );
		} );
	}

	/**
	 * Render pagination.
	 */
	function renderPagination( totalPages, page ) {
		var $container = $( '#jwp-stk-stock-pagination' );
		$container.empty();

		if ( totalPages <= 1 ) {
			return;
		}

		for ( var i = 1; i <= totalPages; i++ ) {
			var cls = i === page ? 'page-numbers current' : 'page-numbers';
			$container.append( '<a class="' + cls + '" data-page="' + i + '">' + i + '</a>' );
		}
	}

	/**
	 * Save a single row.
	 */
	function saveRow( $row ) {
		var productId = $row.data( 'product-id' );
		var data = {
			action: 'jwp_stk_stock_update',
			nonce: jwpStkStockManager.nonce,
			product_id: productId,
		};

		$row.find( '.jwp-stk-field' ).each( function() {
			var $f = $( this );
			var field = $f.data( 'field' );

			if ( $f.is( ':checkbox' ) ) {
				data[ field ] = $f.is( ':checked' ) ? 1 : 0;
			} else {
				data[ field ] = $f.val();
			}
		} );

		$row.addClass( 'jwp-stk-row-saving' );
		$row.find( '.jwp-stk-stock-save-btn' ).text( jwpStkStockManager.i18n.saving ).prop( 'disabled', true );

		$.ajax( {
			url: jwpStkStockManager.ajaxUrl,
			type: 'POST',
			data: data,
			success: function( response ) {
				$row.removeClass( 'jwp-stk-row-saving' );

				if ( response.success ) {
					$row.addClass( 'jwp-stk-row-saved' );
					$row.find( '.jwp-stk-stock-save-btn' ).text( jwpStkStockManager.i18n.saved );

					setTimeout( function() {
						$row.removeClass( 'jwp-stk-row-saved' );
						$row.find( '.jwp-stk-stock-save-btn' ).text( 'Save' ).prop( 'disabled', false );
					}, 1500 );
				} else {
					$row.addClass( 'jwp-stk-row-error' );
					$row.find( '.jwp-stk-stock-save-btn' ).text( jwpStkStockManager.i18n.error ).prop( 'disabled', false );

					setTimeout( function() {
						$row.removeClass( 'jwp-stk-row-error' );
						$row.find( '.jwp-stk-stock-save-btn' ).text( 'Save' );
					}, 2000 );
				}
			},
			error: function() {
				$row.removeClass( 'jwp-stk-row-saving' ).addClass( 'jwp-stk-row-error' );
				$row.find( '.jwp-stk-stock-save-btn' ).text( jwpStkStockManager.i18n.error ).prop( 'disabled', false );
			},
		} );
	}

	/**
	 * Escape HTML.
	 */
	function escHtml( str ) {
		if ( ! str ) {
			return '';
		}

		var div = document.createElement( 'div' );
		div.appendChild( document.createTextNode( str ) );
		return div.innerHTML;
	}

	// --- Event handlers ---

	// Save row.
	$( document ).on( 'click', '.jwp-stk-stock-save-btn', function() {
		saveRow( $( this ).closest( 'tr' ) );
	} );

	// Pagination.
	$( document ).on( 'click', '#jwp-stk-stock-pagination .page-numbers', function( e ) {
		e.preventDefault();
		var page = $( this ).data( 'page' );
		if ( page ) {
			loadProducts( page );
		}
	} );

	// Filter by status.
	$( '#jwp-stk-stock-status-filter' ).on( 'change', function() {
		currentStatus = $( this ).val();
		loadProducts( 1 );
	} );

	// Search.
	var searchTimer;
	$( '#jwp-stk-stock-search' ).on( 'input', function() {
		var val = $( this ).val();
		clearTimeout( searchTimer );
		searchTimer = setTimeout( function() {
			currentSearch = val;
			loadProducts( 1 );
		}, 400 );
	} );

	// Initial load.
	$( document ).ready( function() {
		loadProducts( 1 );
	} );

}( jQuery ) );
