import { useState, useEffect, useCallback } from '@wordpress/element';
import {
	TextControl,
	SelectControl,
	Button,
	Spinner,
	Notice,
} from '@wordpress/components';
import { ColorPicker } from '../../ui';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

const QuickViewButtonSettings = () => {
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
				path: '/jwp-stk/v1/modules/quick-view/settings',
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
					'Customise the Quick View trigger button appearance and placement.',
					'jetix-store-toolkit'
				) }
			</p>

			<TextControl
				label={ __( 'Button Label', 'jetix-store-toolkit' ) }
				value={ settings.button_label || '' }
				onChange={ ( val ) => updateSetting( 'button_label', val ) }
				__nextHasNoMarginBottom
			/>

			<SelectControl
				label={ __( 'Button Position', 'jetix-store-toolkit' ) }
				value={ settings.button_position || 'after_add_to_cart' }
				options={ [
					{
						value: 'before_add_to_cart',
						label: __( 'Before Add to Cart', 'jetix-store-toolkit' ),
					},
					{
						value: 'after_add_to_cart',
						label: __( 'After Add to Cart', 'jetix-store-toolkit' ),
					},
				] }
				onChange={ ( val ) => updateSetting( 'button_position', val ) }
				help={ __(
					'Controls where the button appears relative to the Add to Cart button on product cards.',
					'jetix-store-toolkit'
				) }
				__nextHasNoMarginBottom
			/>

			<SelectControl
				label={ __( 'Button Alignment', 'jetix-store-toolkit' ) }
				value={ settings.button_align || 'left' }
				options={ [
					{
						value: 'left',
						label: __( 'Left', 'jetix-store-toolkit' ),
					},
					{
						value: 'center',
						label: __( 'Center', 'jetix-store-toolkit' ),
					},
					{
						value: 'right',
						label: __( 'Right', 'jetix-store-toolkit' ),
					},
					{
						value: 'full',
						label: __( 'Full Width', 'jetix-store-toolkit' ),
					},
				] }
				onChange={ ( val ) => updateSetting( 'button_align', val ) }
				help={ __(
					'The button is wrapped in a full-width block element so it respects this alignment within the product card.',
					'jetix-store-toolkit'
				) }
				__nextHasNoMarginBottom
			/>

			<SelectControl
				label={ __( 'Button Style', 'jetix-store-toolkit' ) }
				value={ settings.button_style || 'filled' }
				options={ [
					{
						value: 'filled',
						label: __( 'Filled', 'jetix-store-toolkit' ),
					},
					{
						value: 'outline',
						label: __( 'Outline', 'jetix-store-toolkit' ),
					},
				] }
				onChange={ ( val ) => updateSetting( 'button_style', val ) }
				__nextHasNoMarginBottom
			/>

			<SelectControl
				label={ __( 'Button Size', 'jetix-store-toolkit' ) }
				value={ settings.button_size || 'normal' }
				options={ [
					{
						value: 'small',
						label: __( 'Small', 'jetix-store-toolkit' ),
					},
					{
						value: 'normal',
						label: __( 'Normal', 'jetix-store-toolkit' ),
					},
					{
						value: 'large',
						label: __( 'Large', 'jetix-store-toolkit' ),
					},
				] }
				onChange={ ( val ) => updateSetting( 'button_size', val ) }
				__nextHasNoMarginBottom
			/>

			<div className="jstk-qv-color-row">
				<div className="jstk-qv-color-field">
					<ColorPicker
						id="qv-btn-bg-color"
						label={ __( 'Background Color', 'jetix-store-toolkit' ) }
						value={ settings.button_bg_color || '#333333' }
						onChange={ ( val ) =>
							updateSetting( 'button_bg_color', val )
						}
					/>
					<Button
						variant="tertiary"
						isSmall
						disabled={ ! settings.button_bg_color }
						onClick={ () => updateSetting( 'button_bg_color', '' ) }
					>
						{ __( 'Restore default', 'jetix-store-toolkit' ) }
					</Button>
				</div>
				<div className="jstk-qv-color-field">
					<ColorPicker
						id="qv-btn-text-color"
						label={ __( 'Text Color', 'jetix-store-toolkit' ) }
						value={ settings.button_text_color || '#ffffff' }
						onChange={ ( val ) =>
							updateSetting( 'button_text_color', val )
						}
					/>
					<Button
						variant="tertiary"
						isSmall
						disabled={ ! settings.button_text_color }
						onClick={ () => updateSetting( 'button_text_color', '' ) }
					>
						{ __( 'Restore default', 'jetix-store-toolkit' ) }
					</Button>
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

export default QuickViewButtonSettings;
