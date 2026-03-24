import { useState } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import DashboardPanel from './components/DashboardPanel';
import ModulesPanel from './components/ModulesPanel';
import ModuleSettingsPage from './components/ModuleSettingsPage';
import SettingsPanel from './components/SettingsPanel';

const NAV_ITEMS = [
	{ key: 'dashboard', label: __( 'Dashboard', 'store-kit' ), page: 'store-kit' },
	{ key: 'modules', label: __( 'Modules', 'store-kit' ), page: 'jwp-stk-modules' },
	{ key: 'settings', label: __( 'Global Settings', 'store-kit' ), page: 'jwp-stk-settings' },
];

const App = () => {
	const { currentPage, adminUrl, version } = window.jwpStkDashboard || {};
	const [ activeModule, setActiveModule ] = useState( null );

	return (
		<div className="jwp-stk-dashboard">
			<div className="jwp-stk-dashboard__header">
				<div className="jwp-stk-dashboard__header-left">
					<h1>{ __( 'Store Kit', 'store-kit' ) }</h1>
					<span className="jwp-stk-version">
						v{ version || '0.1.0' }
					</span>
				</div>
				<nav className="jwp-stk-dashboard__header-nav">
					{ NAV_ITEMS.map( ( item ) => (
						<a
							key={ item.key }
							href={ `${ adminUrl }admin.php?page=${ item.page }` }
							className={ `jwp-stk-nav-tab ${
								currentPage === item.key ? 'is-active' : ''
							}` }
						>
							{ item.label }
						</a>
					) ) }
				</nav>
			</div>

			<div className="jwp-stk-dashboard__body">
				{ currentPage === 'dashboard' && <DashboardPanel /> }
				{ currentPage === 'modules' && ! activeModule && (
					<ModulesPanel
						onOpenModuleSettings={ setActiveModule }
					/>
				) }
				{ currentPage === 'modules' && activeModule && (
					<ModuleSettingsPage
						moduleSlug={ activeModule }
						onBack={ () => setActiveModule( null ) }
					/>
				) }
				{ currentPage === 'settings' && <SettingsPanel /> }
			</div>
		</div>
	);
};

export default App;
