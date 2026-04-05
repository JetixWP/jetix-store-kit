/**
 * Settings page with tabbed panel + sidebar.
 *
 * @package Jetix_Store_Toolkit
 */

import { useState, useEffect, useRef } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { TabPanel, Spinner } from '@wordpress/components';
import { Notice } from '../components/ui';
import { SettingsSidebar } from '../components/settings';
import { GeneralTab } from '../components/settings/tabs';

const DEFAULT_SETTINGS = {
	theme_compatibility_engine: 'auto',
};

const TABS = [
	{
		name: 'general',
		title: 'Compatibility',
		className: 'jstk-settings-tab',
	},
];

export default function Settings( { onFooterState } ) {
	const [ settings, setSettings ] = useState( DEFAULT_SETTINGS );
	const [ loading, setLoading ] = useState( true );
	const [ saving, setSaving ] = useState( false );
	const [ notice, setNotice ] = useState( null );
	const [ dirty, setDirty ] = useState( false );
	const [ saved, setSaved ] = useState( DEFAULT_SETTINGS );
	const savedSettings = useRef( DEFAULT_SETTINGS );

	useEffect( () => {
		async function fetchSettings() {
			try {
				const data = await apiFetch( { path: '/jwp-stk/v1/settings' } );
				const merged = { ...DEFAULT_SETTINGS, ...data };
				setSettings( merged );
				setSaved( merged );
				savedSettings.current = merged;
			} catch {
				setNotice( {
					type: 'error',
					message: 'Failed to load settings.',
				} );
			} finally {
				setLoading( false );
			}
		}

		fetchSettings();
	}, [] );

	function updateSetting( key, value ) {
		setSettings( ( prev ) => ( { ...prev, [ key ]: value } ) );
		setDirty( true );
	}

	async function handleSave() {
		setSaving( true );
		setNotice( null );

		try {
			await apiFetch( {
				path: '/jwp-stk/v1/settings',
				method: 'POST',
				data: {
					settings: {
						'theme-compatibility-engine': settings.theme_compatibility_engine,
					},
				},
			} );
			setNotice( {
				type: 'success',
				message: 'Settings saved successfully.',
			} );
			setSaved( settings );
			savedSettings.current = settings;
			setDirty( false );
		} catch ( err ) {
			setNotice( {
				type: 'error',
				message: err?.message || 'Failed to save settings.',
			} );
		} finally {
			setSaving( false );
		}
	}

	function handleDiscard() {
		setSettings( savedSettings.current );
		setDirty( false );
		setNotice( null );
	}

	useEffect( () => {
		if ( onFooterState ) {
			onFooterState( { dirty, saving, handleSave, handleDiscard } );
		}
	}, [ dirty, saving ] ); // eslint-disable-line react-hooks/exhaustive-deps

	return (
		<div className="jstk-page">
			<div className="jstk-page__header">
				<div className="jstk-page__header-text">
					<h1 className="jstk-page__title">Global Plugin Settings</h1>
					<p className="jstk-page__desc">
						Configure plugin settings for this website.
					</p>
				</div>
			</div>

			{ notice && (
				<Notice
					type={ notice.type }
					isDismissible
					onDismiss={ () => setNotice( null ) }
				>
					{ notice.message }
				</Notice>
			) }

			<div className="jstk-settings-layout">
				<div className="jstk-settings-main">
					{ loading && (
						<div className="jstk-settings-loading">
							<Spinner />
						</div>
					) }
					<TabPanel
						className="jstk-settings-tabs"
						tabs={ TABS }
					>
						{ ( tab ) => (
							<div className="jstk-settings-tab-content">
								{ tab.name === 'general' && (
									<GeneralTab
										settings={ settings }
										savedSettings={ saved }
										updateSetting={ updateSetting }
									/>
								) }
							</div>
						) }
					</TabPanel>
				</div>

				<SettingsSidebar />
			</div>
		</div>
	);
}
