import { useState, useEffect, useCallback } from '@wordpress/element';
import {
	Button,
	Spinner,
	Notice,
} from '@wordpress/components';
import { Toggle } from '../../ui';
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

			<div className="jstk-module-settings-extras">
				<h3>{ __( 'Modal Content', 'jetix-store-toolkit' ) }</h3>
				<Toggle
					label={ __( 'Show Gallery', 'jetix-store-toolkit' ) }
					checked={ !! settings.show_gallery }
					onChange={ ( val ) => updateSetting( 'show_gallery', val ) }
				/>
				<Toggle
					label={ __( 'Show Price', 'jetix-store-toolkit' ) }
					checked={ !! settings.show_price }
					onChange={ ( val ) => updateSetting( 'show_price', val ) }
				/>

				<Toggle
					label={ __( 'Show Rating', 'jetix-store-toolkit' ) }
					checked={ !! settings.show_rating }
					onChange={ ( val ) => updateSetting( 'show_rating', val ) }
				/>

				<Toggle
					label={ __( 'Show Short Description', 'jetix-store-toolkit' ) }
					checked={ !! settings.show_excerpt }
					onChange={ ( val ) => updateSetting( 'show_excerpt', val ) }
				/>

				<Toggle
					label={ __( 'Show Add to Cart', 'jetix-store-toolkit' ) }
					checked={ !! settings.show_add_to_cart }
					onChange={ ( val ) =>
						updateSetting( 'show_add_to_cart', val )
					}
				/>

				<Toggle
					label={ __( 'Show Product Meta', 'jetix-store-toolkit' ) }
					checked={ !! settings.show_meta }
					onChange={ ( val ) => updateSetting( 'show_meta', val ) }
					/>
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

export default QuickViewSettings;
