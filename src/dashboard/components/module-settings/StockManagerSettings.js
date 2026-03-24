import { useState, useEffect, useCallback } from '@wordpress/element';
import {
	TextControl,
	ToggleControl,
	Button,
	Spinner,
	Notice,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

const StockManagerSettings = () => {
	const [ settings, setSettings ] = useState( null );
	const [ loading, setLoading ] = useState( true );
	const [ saving, setSaving ] = useState( false );
	const [ notice, setNotice ] = useState( null );

	const fetchSettings = useCallback( async () => {
		try {
			const data = await apiFetch( {
				path: '/jwp-stk/v1/modules/stock-manager/settings',
			} );
			setSettings( data.settings );
		} catch {
			setNotice( {
				status: 'error',
				message: __( 'Failed to load settings.', 'store-kit' ),
			} );
		} finally {
			setLoading( false );
		}
	}, [] );

	useEffect( () => {
		fetchSettings();
	}, [ fetchSettings ] );

	const handleSave = useCallback( async () => {
		setSaving( true );
		setNotice( null );
		try {
			const res = await apiFetch( {
				path: '/jwp-stk/v1/modules/stock-manager/settings',
				method: 'POST',
				data: { settings },
			} );
			setSettings( res.settings );
			setNotice( {
				status: 'success',
				message: __( 'Settings saved.', 'store-kit' ),
			} );
		} catch {
			setNotice( {
				status: 'error',
				message: __( 'Failed to save settings.', 'store-kit' ),
			} );
		} finally {
			setSaving( false );
		}
	}, [ settings ] );

	const updateSetting = ( key, value ) => {
		setSettings( ( prev ) => ( { ...prev, [ key ]: value } ) );
	};

	if ( loading || ! settings ) {
		return (
			<div className="jwp-stk-modules-loading">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="jwp-stk-module-settings-form">
			{ notice && (
				<Notice
					status={ notice.status }
					isDismissible
					onDismiss={ () => setNotice( null ) }
				>
					{ notice.message }
				</Notice>
			) }

			<p className="jwp-stk-settings-description">
				{ __(
					'The Stock Manager page is available under WooCommerce → Stock Manager when this module is active.',
					'store-kit'
				) }
			</p>

			<TextControl
				label={ __( 'Products Per Page', 'store-kit' ) }
				type="number"
				min={ 5 }
				max={ 100 }
				value={ settings.per_page || 20 }
				onChange={ ( val ) =>
					updateSetting( 'per_page', parseInt( val, 10 ) || 20 )
				}
				__nextHasNoMarginBottom
			/>

			<TextControl
				label={ __( 'Low Stock Threshold', 'store-kit' ) }
				type="number"
				min={ 0 }
				value={ settings.low_stock_threshold || 5 }
				onChange={ ( val ) =>
					updateSetting(
						'low_stock_threshold',
						parseInt( val, 10 ) || 5
					)
				}
				help={ __(
					'Products with stock at or below this number are flagged as low stock.',
					'store-kit'
				) }
				__nextHasNoMarginBottom
			/>

			<h3>{ __( 'Display Columns', 'store-kit' ) }</h3>

			<ToggleControl
				label={ __( 'Show SKU', 'store-kit' ) }
				checked={ !! settings.show_sku }
				onChange={ ( val ) => updateSetting( 'show_sku', val ) }
				__nextHasNoMarginBottom
			/>
			<ToggleControl
				label={ __( 'Show Stock Status', 'store-kit' ) }
				checked={ !! settings.show_stock_status }
				onChange={ ( val ) =>
					updateSetting( 'show_stock_status', val )
				}
				__nextHasNoMarginBottom
			/>
			<ToggleControl
				label={ __( 'Show Manage Stock', 'store-kit' ) }
				checked={ !! settings.show_manage_stock }
				onChange={ ( val ) =>
					updateSetting( 'show_manage_stock', val )
				}
				__nextHasNoMarginBottom
			/>
			<ToggleControl
				label={ __( 'Show Stock Quantity', 'store-kit' ) }
				checked={ !! settings.show_stock_quantity }
				onChange={ ( val ) =>
					updateSetting( 'show_stock_quantity', val )
				}
				__nextHasNoMarginBottom
			/>
			<ToggleControl
				label={ __( 'Show Backorders', 'store-kit' ) }
				checked={ !! settings.show_backorders }
				onChange={ ( val ) =>
					updateSetting( 'show_backorders', val )
				}
				__nextHasNoMarginBottom
			/>
			<ToggleControl
				label={ __( 'Show Low Stock Filter', 'store-kit' ) }
				checked={ !! settings.show_low_stock }
				onChange={ ( val ) =>
					updateSetting( 'show_low_stock', val )
				}
				__nextHasNoMarginBottom
			/>

			<div className="jwp-stk-settings-actions">
				<Button
					variant="primary"
					onClick={ handleSave }
					isBusy={ saving }
					disabled={ saving }
				>
					{ __( 'Save Settings', 'store-kit' ) }
				</Button>
			</div>
		</div>
	);
};

export default StockManagerSettings;
