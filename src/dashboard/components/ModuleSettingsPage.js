import { useState, useEffect, useCallback } from '@wordpress/element';
import { Spinner, Notice, TabPanel } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { Button, Toggle } from './ui';

// Operational views.
import StockManagerTable from './module-views/StockManagerTable';

// Module changelogs.
import stockManagerChangelog from '../changelogs/stock-manager.json';
import customOrderStatusesChangelog from '../changelogs/custom-order-statuses.json';
import quickViewChangelog from '../changelogs/quick-view.json';
import productTabManagerChangelog from '../changelogs/product-tab-manager.json';

// Settings components.
import QuickViewSettings from './module-settings/QuickViewSettings';
import CustomOrderStatusesSettings from './module-settings/CustomOrderStatusesSettings';
import StockManagerSettings from './module-settings/StockManagerSettings';
import ProductTabManagerSettings from './module-settings/ProductTabManagerSettings';
import ProductTabManagerDefaultTabs from './module-settings/ProductTabManagerDefaultTabs';

/**
 * Per-module tab definition.
 *
 * Each entry produces one or more TabPanel tabs.
 * operationalTabs appear first (left); if SettingsComponent is set, a
 * "Settings" tab is appended. All tabs are left-aligned inside the card.
 */
const MODULE_VIEWS = {
	'stock-manager': {
		changelog: stockManagerChangelog,
		operationalTabs: [
			{
				name: 'stock',
				title: __( 'Stock Manager', 'jetix-store-toolkit' ),
				Component: StockManagerTable,
			},
		],
		SettingsComponent: StockManagerSettings,
	},
	'custom-order-statuses': {
		changelog: customOrderStatusesChangelog,
		operationalTabs: [
			{
				name: 'statuses',
				title: __( 'Order Statuses', 'jetix-store-toolkit' ),
				Component: CustomOrderStatusesSettings,
			},
		],
		SettingsComponent: null,
	},
	'quick-view': {
		changelog: quickViewChangelog,
		operationalTabs: [],
		SettingsComponent: QuickViewSettings,
	},
	'product-tab-manager': {
		changelog: productTabManagerChangelog,
		operationalTabs: [
			{
				name: 'custom-tabs',
				title: __( 'Custom Tabs', 'jetix-store-toolkit' ),
				Component: ProductTabManagerSettings,
			},
			{
				name: 'default-tabs',
				title: __( 'Default Tabs', 'jetix-store-toolkit' ),
				Component: ProductTabManagerDefaultTabs,
			},
		],
		SettingsComponent: null,
	},
};

/** Map of tab name → Component for quick lookup inside TabPanel callback. */
function buildTabMap( operationalTabs, SettingsComponent ) {
	const map = {};
	operationalTabs.forEach( ( t ) => {
		map[ t.name ] = t.Component;
	} );
	if ( SettingsComponent ) {
		map.settings = SettingsComponent;
	}
	return map;
}

/** Build the `tabs` array expected by WP TabPanel. */
function buildTabs( operationalTabs, SettingsComponent ) {
	const tabs = operationalTabs.map( ( t ) => ( {
		name: t.name,
		title: t.title,
		className: 'jstk-settings-tab',
	} ) );
	if ( SettingsComponent ) {
		tabs.push( {
			name: 'settings',
			title: __( 'Settings', 'jetix-store-toolkit' ),
			className: 'jstk-settings-tab',
		} );
	}
	return tabs;
}

const ModuleSettingsPage = ( { moduleSlug, onBack } ) => {
	const [ module, setModule ] = useState( null );
	const [ loading, setLoading ] = useState( true );
	const [ toggling, setToggling ] = useState( false );
	const [ notice, setNotice ] = useState( null );

	const { operationalTabs = [], SettingsComponent = null, changelog = [] } =
		MODULE_VIEWS[ moduleSlug ] || {};

	const tabs = buildTabs( operationalTabs, SettingsComponent );
	const tabMap = buildTabMap( operationalTabs, SettingsComponent );
	const latestChangelog = changelog[ 0 ] || null;

	const fetchModule = useCallback( async () => {
		try {
			const modules = await apiFetch( { path: '/jwp-stk/v1/modules' } );
			const found = modules.find( ( m ) => m.slug === moduleSlug );
			setModule( found || null );
		} catch {
			setNotice( {
				status: 'error',
				message: __( 'Failed to load module.', 'jetix-store-toolkit' ),
			} );
		} finally {
			setLoading( false );
		}
	}, [ moduleSlug ] );

	useEffect( () => {
		fetchModule();
	}, [ fetchModule ] );

	const handleToggle = useCallback(
		async ( active ) => {
			setToggling( true );
			setNotice( null );
			try {
				await apiFetch( {
					path: '/jwp-stk/v1/modules/toggle',
					method: 'POST',
					data: { module: moduleSlug, active },
				} );
				setModule( ( prev ) => ( { ...prev, active } ) );
			} catch {
				setNotice( {
					status: 'error',
					message: __( 'Failed to update module.', 'jetix-store-toolkit' ),
				} );
			} finally {
				setToggling( false );
			}
		},
		[ moduleSlug ]
	);

	if ( loading ) {
		return (
			<div
				className="jstk-loading"
				style={ { justifyContent: 'center', minHeight: '200px' } }
			>
				<Spinner />
			</div>
		);
	}

	if ( ! module ) {
		return (
			<div
				style={ {
					display: 'flex',
					flexDirection: 'column',
					alignItems: 'center',
					justifyContent: 'center',
					minHeight: '200px',
					gap: '16px',
				} }
			>
				<p>{ __( 'Module not found.', 'jetix-store-toolkit' ) }</p>
				<Button variant="secondary" onClick={ onBack }>
					{ __( '← Back to Modules', 'jetix-store-toolkit' ) }
				</Button>
			</div>
		);
	}

	return (
		<div className="jstk-page jstk-module-page">
			{ notice && (
				<Notice
					status={ notice.status }
					isDismissible
					onDismiss={ () => setNotice( null ) }
				>
					{ notice.message }
				</Notice>
			) }

			<aside className="jstk-module-page__sidebar">
				<div className="jstk-module-page__back">
					<Button variant="tertiary" onClick={ onBack }>
						{ __( '← Back to Modules', 'jetix-store-toolkit' ) }
					</Button>
				</div>

				<div className="jstk-module-settings-header">
					<div className="jstk-module-settings-header__info">
						<div className="jstk-module-settings-header__title-row">
							<div>
								<span
								className={ `jstk-tier-badge jstk-tier-badge--${ module.tier }` }
							>
								{ module.tier }
							</span>
							</div>
							<h2
								className="jstk-page__title"
								style={ { marginBottom: 0 } }
							>
								{ module.title }
							</h2>
						</div>
						<p className="jstk-page__desc">{ module.description }</p>
					</div>
					<div className="jstk-module-settings-header__toggle">
						<Toggle
							id={ `module-detail-toggle-${ module.slug }` }
							label={ module.active ? 'Active' : 'Inactive' }
							checked={ module.active }
							onChange={ handleToggle }
							disabled={ toggling }
						/>
					</div>
				</div>

				{ latestChangelog && (
					<div className="jstk-module-page__changelog">
						<h4 className="jstk-module-page__changelog-title">
							{ __( 'Latest Module Changes', 'jetix-store-toolkit' ) }
						</h4>
						<div className="jstk-module-page__changelog-meta">
							<span className="jstk-version-tag">v{ latestChangelog.version }</span>
							<span className="jstk-module-page__changelog-date">{ latestChangelog.date }</span>
						</div>
						<ul className="jstk-module-page__changelog-notes">
							{ latestChangelog.notes.map( ( note, i ) => (
								<li key={ i }>{ note }</li>
							) ) }
						</ul>
					</div>
				) }
			</aside>

			{ tabs.length > 0 ? (
				<div className="jstk-module-page__content">
					<TabPanel
						className="jstk-settings-tabs"
						tabs={ tabs }
					>
						{ ( tab ) => {
							const Component = tabMap[ tab.name ];
							return (
								<div className="jstk-settings-tab-content">
									{ Component ? (
										<Component />
									) : (
										<div className="jstk-empty">
											<p className="jstk-empty__desc">
												{ __( 'No content available.', 'jetix-store-toolkit' ) }
											</p>
										</div>
									) }
								</div>
							);
						} }
					</TabPanel>
				</div>
			) : (
				<div className="jstk-module-page__content">
					<div className="jstk-empty" style={ { padding: '48px 24px' } }>
						<p className="jstk-empty__desc">
							{ __( 'No configuration available for this module.', 'jetix-store-toolkit' ) }
						</p>
					</div>
				</div>
			) }
		</div>
	);
};

export default ModuleSettingsPage;
