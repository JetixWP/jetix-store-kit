/**
 * Quick View Module — Frontend Script.
 *
 * @package JWP_STK
 */
( function( $ ) {
	'use strict';

	if ( typeof jwpStkQuickView === 'undefined' ) {
		return;
	}

	var overlay = null;
	var modal   = null;

	/**
	 * Create the modal DOM structure once.
	 */
	function ensureModal() {
		if ( overlay ) {
			return;
		}

		overlay = $( '<div class="jwp-stk-qv-overlay" role="dialog" aria-modal="true">' +
			'<div class="jwp-stk-qv-modal">' +
				'<button type="button" class="jwp-stk-qv-close" aria-label="Close">&times;</button>' +
				'<div class="jwp-stk-qv-body"></div>' +
			'</div>' +
		'</div>' );

		modal = overlay.find( '.jwp-stk-qv-body' );
		$( 'body' ).append( overlay );

		// Close on overlay click.
		overlay.on( 'click', function( e ) {
			if ( $( e.target ).hasClass( 'jwp-stk-qv-overlay' ) ) {
				closeModal();
			}
		} );

		// Close button.
		overlay.find( '.jwp-stk-qv-close' ).on( 'click', closeModal );

		// ESC key.
		$( document ).on( 'keydown.jwpStkQv', function( e ) {
			if ( e.key === 'Escape' && overlay.hasClass( 'is-visible' ) ) {
				closeModal();
			}
		} );
	}

	/**
	 * Open the modal.
	 */
	function openModal() {
		ensureModal();
		overlay.addClass( 'is-visible' );
		$( 'body' ).css( 'overflow', 'hidden' );
	}

	/**
	 * Close the modal.
	 */
	function closeModal() {
		if ( ! overlay ) {
			return;
		}
		overlay.removeClass( 'is-visible' );
		$( 'body' ).css( 'overflow', '' );

		// Clear content after animation.
		setTimeout( function() {
			modal.empty();
		}, 300 );
	}

	/**
	 * Handle Quick View button click.
	 */
	$( document ).on( 'click', '.jwp-stk-quick-view-btn', function( e ) {
		e.preventDefault();

		var productId = $( this ).data( 'product-id' );
		if ( ! productId ) {
			return;
		}

		ensureModal();
		modal.html( '<div class="jwp-stk-qv-loading"><div class="jwp-stk-qv-spinner"></div></div>' );
		openModal();

		$.ajax( {
			url: jwpStkQuickView.ajaxUrl,
			type: 'POST',
			data: {
				action: 'jwp_stk_quick_view',
				nonce: jwpStkQuickView.nonce,
				product_id: productId,
			},
			success: function( response ) {
				if ( response.success && response.data.html ) {
					modal.html( response.data.html );
					initThumbnails();
				} else {
					closeModal();
				}
			},
			error: function() {
				closeModal();
			},
		} );
	} );

	/**
	 * Initialize thumbnail image switching.
	 */
	function initThumbnails() {
		modal.find( '.jwp-stk-qv-thumb' ).on( 'click', function() {
			var $thumb = $( this );
			var imgUrl = $thumb.data( 'img' );

			if ( imgUrl ) {
				modal.find( '.jwp-stk-qv-main-image img' ).attr( 'src', imgUrl );
				modal.find( '.jwp-stk-qv-thumb' ).removeClass( 'is-active' );
				$thumb.addClass( 'is-active' );
			}
		} );
	}

}( jQuery ) );
