import { useState, useEffect, useCallback } from '@wordpress/element';
import {
	SelectControl,
	Button,
	Spinner,
	Notice,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

const SettingsPanel = () => {
	const [ settings, setSettings ] = useState( null );
	const [ loading, setLoading ] = useState( true );
	const [ saving, setSaving ] = useState( false );
	const [ notice, setNotice ] = useState( null );
	const [ themeEngine, setThemeEngine ] = useState( 'auto' );

	const fetchSettings = useCallback( async () => {
		try {
			const data = await apiFetch( { path: '/jwp-stk/v1/settings' } );
			setSettings( data );
			setThemeEngine( data.theme_compatibility_engine || 'auto' );
		} catch ( err ) {
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
			await apiFetch( {
				path: '/jwp-stk/v1/settings',
				method: 'POST',
				data: {
					settings: {
						'theme-compatibility-engine': themeEngine,
					},
				},
			} );
			setNotice( {
				status: 'success',
				message: __( 'Settings saved.', 'store-kit' ),
			} );
		} catch ( err ) {
			setNotice( {
				status: 'error',
				message: __( 'Failed to save settings.', 'store-kit' ),
			} );
		} finally {
			setSaving( false );
		}
	}, [ themeEngine ] );

	if ( loading ) {
		return (
			<div className="jwp-stk-settings-loading">
				<Spinner />
			</div>
		);
	}

	// Build options for SelectControl.
	const engineOptions = settings?.available_theme_engines
		? Object.entries( settings.available_theme_engines ).map(
				( [ value, label ] ) => ( { value, label } )
		  )
		: [];

	return (
		<div className="jwp-stk-settings-panel">
			{ notice && (
				<Notice
					status={ notice.status }
					isDismissible
					onDismiss={ () => setNotice( null ) }
				>
					{ notice.message }
				</Notice>
			) }

			<div className="jwp-stk-settings-section">
				<h2>{ __( 'Theme Compatibility', 'store-kit' ) }</h2>
				<p className="jwp-stk-settings-description">
					{ __(
						'The theme compatibility engine loads additional styles and scripts to ensure Store Kit features display correctly with your theme. "Auto" will detect your theme automatically.',
						'store-kit'
					) }
				</p>

				<SelectControl
					label={ __( 'Theme Compatibility Engine', 'store-kit' ) }
					value={ themeEngine }
					options={ engineOptions }
					onChange={ setThemeEngine }
					__nextHasNoMarginBottom
				/>

				{ settings?.active_theme_engine && (
					<p className="jwp-stk-active-engine-info">
						{ __( 'Active engine:', 'store-kit' ) }{ ' ' }
						<strong>{ settings.active_theme_engine }</strong>
						{ settings?.automatic_theme_engine && (
							<>
								{ ' — ' }
								{ __( 'Auto-detected:', 'store-kit' ) }{ ' ' }
								<strong>
									{ settings.automatic_theme_engine }
								</strong>
							</>
						) }
					</p>
				) }
			</div>

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

export default SettingsPanel;
