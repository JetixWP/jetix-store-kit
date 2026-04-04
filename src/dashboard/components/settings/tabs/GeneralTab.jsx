/**
 * General settings tab.
 *
 * @package Jetix_Store_Toolkit
 */

import { SelectControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import SettingsSection from '../SettingsSection';

export default function GeneralTab( { settings, updateSetting } ) {
	const [ themeEngines, setThemeEngines ] = useState( [] );
	const [ activeEngine, setActiveEngine ] = useState( '' );
	const [ autoEngine, setAutoEngine ] = useState( '' );

	useEffect( () => {
		apiFetch( { path: '/jwp-stk/v1/settings' } )
			.then( ( data ) => {
				if ( data?.available_theme_engines ) {
					setThemeEngines(
						Object.entries( data.available_theme_engines ).map(
							( [ value, label ] ) => ( { value, label } )
						)
					);
				}
				if ( data?.active_theme_engine ) {
					setActiveEngine( data.active_theme_engine );
				}
				if ( data?.automatic_theme_engine ) {
					setAutoEngine( data.automatic_theme_engine );
				}
			} )
			.catch( () => {} );
	}, [] );

	return (
		<SettingsSection
			title="Theme Compatibility"
			description="The theme compatibility engine loads additional styles and scripts to ensure Store Toolkit features display correctly with your theme. &ldquo;Auto&rdquo; will detect your theme automatically."
		>
			<SelectControl
				label="Theme Compatibility Engine"
				value={ settings.theme_compatibility_engine || 'auto' }
				options={ themeEngines }
				onChange={ ( val ) => updateSetting( 'theme_compatibility_engine', val ) }
				__nextHasNoMarginBottom
			/>
			{ activeEngine && (
				<p style={ { fontSize: '13px', color: '#50575e', margin: '0' } }>
					Active engine: <strong>{ activeEngine }</strong>
					{ autoEngine && (
						<>{ ' — ' }Auto-detected: <strong>{ autoEngine }</strong></>
					) }
				</p>
			) }
		</SettingsSection>
	);
}
