/**
 * General settings tab.
 *
 * @package Jetix_Store_Toolkit
 */

import { SelectControl } from '@wordpress/components';
import { useState, useEffect } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import SettingsSection from '../SettingsSection';

export default function GeneralTab( { settings, savedSettings, updateSetting } ) {
	const [ themeEngines, setThemeEngines ] = useState( [] );
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
				if ( data?.automatic_theme_engine ) {
					setAutoEngine( data.automatic_theme_engine );
				}
			} )
			.catch( () => {} );
	}, [] );

	const savedEngine = ( savedSettings ?? settings ).theme_compatibility_engine || 'auto';
	const isAuto = savedEngine === 'auto';
	const activeEngine = isAuto
		? autoEngine
		: ( themeEngines.find( ( e ) => e.value === savedEngine )?.label ?? savedEngine );

	return (
		<SettingsSection
			title="Theme Compatibility"
			 description={ [
					'The theme compatibility engine loads additional styles and scripts to ensure Store Toolkit features display correctly with your theme. \u201cAuto\u201d will detect your theme automatically from our list of supported themes.',
					'If you experience display issues with any module, submit a support request and we can investigate adding compatibility for your theme.',
				] }
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
					{ isAuto && autoEngine && (
						<>{ ' — ' }Auto-detected: <strong>{ autoEngine }</strong></>
					) }
				</p>
			) }
		</SettingsSection>
	);
}
