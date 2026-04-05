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
				message: __( 'Failed to load settings.', 'jetix-store-toolkit' ),
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
				message: __( 'Settings saved.', 'jetix-store-toolkit' ),
			} );
		} catch {
			setNotice( {
				status: 'error',
				message: __( 'Failed to save settings.', 'jetix-store-toolkit' ),
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
			<div className="jstk-loading">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="jstk-module-settings-form">
			{ notice && (
				<Notice
					status={ notice.status }
					isDismissible
					onDismiss={ () => setNotice( null ) }
				>
					{ notice.message }
				</Notice>
			) }

			<p className="jstk-settings-description">
				{ __(
					'Configure the Stock Manager table below. Changes apply immediately to the Stock Manager operations view.',
					'jetix-store-toolkit'
				) }
			</p>

			<TextControl
				label={ __( 'Products Per Page', 'jetix-store-toolkit' ) }
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
				label={ __( 'Low Stock Threshold', 'jetix-store-toolkit' ) }
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
					'jetix-store-toolkit'
				) }
				__nextHasNoMarginBottom
			/>

			<h3>{ __( 'Display Columns', 'jetix-store-toolkit' ) }</h3>

			<ToggleControl
				label={ __( 'Show SKU', 'jetix-store-toolkit' ) }
				checked={ !! settings.show_sku }
				onChange={ ( val ) => updateSetting( 'show_sku', val ) }
				__nextHasNoMarginBottom
			/>
			<ToggleControl
				label={ __( 'Show Stock Status', 'jetix-store-toolkit' ) }
				checked={ !! settings.show_stock_status }
				onChange={ ( val ) =>
					updateSetting( 'show_stock_status', val )
				}
				__nextHasNoMarginBottom
			/>
			<ToggleControl
				label={ __( 'Show Manage Stock', 'jetix-store-toolkit' ) }
				checked={ !! settings.show_manage_stock }
				onChange={ ( val ) =>
					updateSetting( 'show_manage_stock', val )
				}
				__nextHasNoMarginBottom
			/>
			<ToggleControl
				label={ __( 'Show Stock Quantity', 'jetix-store-toolkit' ) }
				checked={ !! settings.show_stock_quantity }
				onChange={ ( val ) =>
					updateSetting( 'show_stock_quantity', val )
				}
				__nextHasNoMarginBottom
			/>
			<ToggleControl
				label={ __( 'Show Backorders', 'jetix-store-toolkit' ) }
				checked={ !! settings.show_backorders }
				onChange={ ( val ) =>
					updateSetting( 'show_backorders', val )
				}
				__nextHasNoMarginBottom
			/>
			<ToggleControl
				label={ __( 'Show Low Stock Filter', 'jetix-store-toolkit' ) }
				checked={ !! settings.show_low_stock }
				onChange={ ( val ) =>
					updateSetting( 'show_low_stock', val )
				}
				__nextHasNoMarginBottom
			/>

			<div className="jstk-settings-actions">
				<Button
					variant="primary"
					onClick={ handleSave }
					isBusy={ saving }
					disabled={ saving }
				>
					{ __( 'Save Settings', 'jetix-store-toolkit' ) }
				</Button>
			</div>
		</div>
	);
};

export default StockManagerSettings;
