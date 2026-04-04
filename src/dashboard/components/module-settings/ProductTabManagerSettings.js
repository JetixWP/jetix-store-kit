import { useState, useEffect, useCallback } from '@wordpress/element';
import {
	TextControl,
	TextareaControl,
	ToggleControl,
	Button,
	Spinner,
	Notice,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

const ProductTabManagerSettings = () => {
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

	const addCustomTab = () => {
		setSettings( ( prev ) => {
			const tabs = [ ...( prev.custom_tabs || [] ) ];
			tabs.push( { title: '', content: '', priority: 50 + tabs.length } );
			return { ...prev, custom_tabs: tabs };
		} );
	};

	const updateTab = ( index, key, value ) => {
		setSettings( ( prev ) => {
			const tabs = [ ...( prev.custom_tabs || [] ) ];
			tabs[ index ] = { ...tabs[ index ], [ key ]: value };
			return { ...prev, custom_tabs: tabs };
		} );
	};

	const removeTab = ( index ) => {
		setSettings( ( prev ) => {
			const tabs = [ ...( prev.custom_tabs || [] ) ];
			tabs.splice( index, 1 );
			return { ...prev, custom_tabs: tabs };
		} );
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

			<h3>{ __( 'Default Tabs', 'jetix-store-toolkit' ) }</h3>
			<p className="jstk-settings-description">
				{ __(
					'Toggle default WooCommerce product tabs on or off, and optionally rename them.',
					'jetix-store-toolkit'
				) }
			</p>

			<div className="jstk-ptm-default-tabs">
				<div className="jstk-ptm-tab-row">
					<ToggleControl
						label={ __( 'Description Tab', 'jetix-store-toolkit' ) }
						checked={ ! settings.disable_description }
						onChange={ ( val ) =>
							updateSetting(
								'disable_description',
								! val
							)
						}
						__nextHasNoMarginBottom
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
					<ToggleControl
						label={ __( 'Additional Information Tab', 'jetix-store-toolkit' ) }
						checked={ ! settings.disable_additional_info }
						onChange={ ( val ) =>
							updateSetting(
								'disable_additional_info',
								! val
							)
						}
						__nextHasNoMarginBottom
					/>
					{ ! settings.disable_additional_info && (
						<TextControl
							label={ __( 'Custom Title', 'jetix-store-toolkit' ) }
							placeholder={ __(
								'Additional information',
								'jetix-store-toolkit'
							) }
							value={
								settings.additional_information_title || ''
							}
							onChange={ ( val ) =>
								updateSetting(
									'additional_information_title',
									val
								)
							}
							__nextHasNoMarginBottom
						/>
					) }
				</div>

				<div className="jstk-ptm-tab-row">
					<ToggleControl
						label={ __( 'Reviews Tab', 'jetix-store-toolkit' ) }
						checked={ ! settings.disable_reviews }
						onChange={ ( val ) =>
							updateSetting( 'disable_reviews', ! val )
						}
						__nextHasNoMarginBottom
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

			<h3>{ __( 'Custom Tabs', 'jetix-store-toolkit' ) }</h3>

			{ ( settings.custom_tabs || [] ).length === 0 && (
				<p className="jstk-settings-description">
					{ __(
						'No custom tabs yet. Add one below.',
						'jetix-store-toolkit'
					) }
				</p>
			) }

			{ ( settings.custom_tabs || [] ).map( ( tab, index ) => (
				<div key={ index } className="jstk-ptm-custom-tab">
					<div className="jstk-ptm-custom-tab__header">
						<strong>
							{ tab.title ||
								__( 'Untitled Tab', 'jetix-store-toolkit' ) }
						</strong>
						<Button
							isDestructive
							variant="tertiary"
							size="small"
							onClick={ () => removeTab( index ) }
						>
							{ __( 'Remove', 'jetix-store-toolkit' ) }
						</Button>
					</div>
					<TextControl
						label={ __( 'Tab Title', 'jetix-store-toolkit' ) }
						value={ tab.title || '' }
						onChange={ ( val ) =>
							updateTab( index, 'title', val )
						}
						__nextHasNoMarginBottom
					/>
					<TextareaControl
						label={ __( 'Tab Content', 'jetix-store-toolkit' ) }
						value={ tab.content || '' }
						onChange={ ( val ) =>
							updateTab( index, 'content', val )
						}
						rows={ 4 }
						help={ __(
							'HTML is allowed. Content will be auto-wrapped in paragraphs.',
							'jetix-store-toolkit'
						) }
						__nextHasNoMarginBottom
					/>
					<TextControl
						label={ __( 'Priority', 'jetix-store-toolkit' ) }
						type="number"
						value={ tab.priority || 50 }
						onChange={ ( val ) =>
							updateTab(
								index,
								'priority',
								parseInt( val, 10 ) || 50
							)
						}
						help={ __(
							'Lower number = appears first. Default WC tabs: Description 10, Additional Info 20, Reviews 30.',
							'jetix-store-toolkit'
						) }
						__nextHasNoMarginBottom
					/>
				</div>
			) ) }

			<Button
				variant="secondary"
				onClick={ addCustomTab }
				className="jstk-ptm-add-tab"
			>
				{ __( '+ Add Custom Tab', 'jetix-store-toolkit' ) }
			</Button>

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

export default ProductTabManagerSettings;
