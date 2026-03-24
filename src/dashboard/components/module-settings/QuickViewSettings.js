import { useState, useEffect, useCallback } from '@wordpress/element';
import {
	TextControl,
	SelectControl,
	ToggleControl,
	Button,
	Spinner,
	Notice,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

const QuickViewSettings = () => {
	const [ settings, setSettings ] = useState( null );
	const [ loading, setLoading ] = useState( true );
	const [ saving, setSaving ] = useState( false );
	const [ notice, setNotice ] = useState( null );

	const fetchSettings = useCallback( async () => {
		try {
			const data = await apiFetch( {
				path: '/jwp-stk/v1/modules/quick-view/settings',
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
				path: '/jwp-stk/v1/modules/quick-view/settings',
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

			<TextControl
				label={ __( 'Button Label', 'store-kit' ) }
				value={ settings.button_label || '' }
				onChange={ ( val ) => updateSetting( 'button_label', val ) }
				__nextHasNoMarginBottom
			/>

			<SelectControl
				label={ __( 'Button Position', 'store-kit' ) }
				value={ settings.button_position || 'after_add_to_cart' }
				options={ [
					{
						value: 'before_add_to_cart',
						label: __( 'Before Add to Cart', 'store-kit' ),
					},
					{
						value: 'after_add_to_cart',
						label: __( 'After Add to Cart', 'store-kit' ),
					},
				] }
				onChange={ ( val ) =>
					updateSetting( 'button_position', val )
				}
				__nextHasNoMarginBottom
			/>

			<h3>{ __( 'Modal Content', 'store-kit' ) }</h3>

			<ToggleControl
				label={ __( 'Show Gallery', 'store-kit' ) }
				checked={ !! settings.show_gallery }
				onChange={ ( val ) => updateSetting( 'show_gallery', val ) }
				__nextHasNoMarginBottom
			/>

			<ToggleControl
				label={ __( 'Show Price', 'store-kit' ) }
				checked={ !! settings.show_price }
				onChange={ ( val ) => updateSetting( 'show_price', val ) }
				__nextHasNoMarginBottom
			/>

			<ToggleControl
				label={ __( 'Show Rating', 'store-kit' ) }
				checked={ !! settings.show_rating }
				onChange={ ( val ) => updateSetting( 'show_rating', val ) }
				__nextHasNoMarginBottom
			/>

			<ToggleControl
				label={ __( 'Show Short Description', 'store-kit' ) }
				checked={ !! settings.show_excerpt }
				onChange={ ( val ) => updateSetting( 'show_excerpt', val ) }
				__nextHasNoMarginBottom
			/>

			<ToggleControl
				label={ __( 'Show Add to Cart', 'store-kit' ) }
				checked={ !! settings.show_add_to_cart }
				onChange={ ( val ) =>
					updateSetting( 'show_add_to_cart', val )
				}
				__nextHasNoMarginBottom
			/>

			<ToggleControl
				label={ __( 'Show Product Meta', 'store-kit' ) }
				checked={ !! settings.show_meta }
				onChange={ ( val ) => updateSetting( 'show_meta', val ) }
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

export default QuickViewSettings;
