import { useState, useEffect, useCallback } from '@wordpress/element';
import {
	TextControl,
	Button,
	Spinner,
	Notice,
} from '@wordpress/components';
import { Toggle } from '../../ui';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

const ProductTabManagerDefaultTabs = () => {
	const [ settings, setSettings ] = useState( null );
	const [ loading, setLoading ] = useState( true );
	const [ saving, setSaving ] = useState( false );
	const [ notice, setNotice ] = useState( null );

	const fetchSettings = useCallback( async () => {
		try {
			const data = await apiFetch( {
				path: '/jwp-stk/v1/modules/product-tab-manager/settings',
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
				path: '/jwp-stk/v1/modules/product-tab-manager/settings',
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
					'Toggle default WooCommerce product tabs on or off, and optionally rename them.',
					'jetix-store-toolkit'
				) }
			</p>

			<div className="jstk-ptm-default-tabs">
				<div className="jstk-ptm-tab-row">
					<Toggle
						label={ __( 'Description Tab', 'jetix-store-toolkit' ) }
						checked={ ! settings.disable_description }
						onChange={ ( val ) =>
							updateSetting( 'disable_description', ! val )
						}
					/>
					{ ! settings.disable_description && (
						<TextControl
							label={ __( 'Custom Title', 'jetix-store-toolkit' ) }
							placeholder={ __( 'Description', 'jetix-store-toolkit' ) }
							value={ settings.description_title || '' }
							onChange={ ( val ) =>
								updateSetting( 'description_title', val )
							}
							__nextHasNoMarginBottom
						/>
					) }
				</div>

				<div className="jstk-ptm-tab-row">
					<Toggle
						label={ __( 'Additional Information Tab', 'jetix-store-toolkit' ) }
						checked={ ! settings.disable_additional_info }
						onChange={ ( val ) =>
							updateSetting( 'disable_additional_info', ! val )
						}
					/>
					{ ! settings.disable_additional_info && (
						<TextControl
							label={ __( 'Custom Title', 'jetix-store-toolkit' ) }
							placeholder={ __(
								'Additional information',
								'jetix-store-toolkit'
							) }
							value={ settings.additional_information_title || '' }
							onChange={ ( val ) =>
								updateSetting( 'additional_information_title', val )
							}
							__nextHasNoMarginBottom
						/>
					) }
				</div>

				<div className="jstk-ptm-tab-row">
					<Toggle
						label={ __( 'Reviews Tab', 'jetix-store-toolkit' ) }
						checked={ ! settings.disable_reviews }
						onChange={ ( val ) =>
							updateSetting( 'disable_reviews', ! val )
						}
					/>
					{ ! settings.disable_reviews && (
						<TextControl
							label={ __( 'Custom Title', 'jetix-store-toolkit' ) }
							placeholder={ __( 'Reviews', 'jetix-store-toolkit' ) }
							value={ settings.reviews_title || '' }
							onChange={ ( val ) =>
								updateSetting( 'reviews_title', val )
							}
							__nextHasNoMarginBottom
						/>
					) }
				</div>
			</div>

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

export default ProductTabManagerDefaultTabs;
