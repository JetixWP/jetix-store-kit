import { useState } from '@wordpress/element';
import { Button } from './components/ui';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import Modules from './pages/Modules';
import ModuleSettingsPage from './components/ModuleSettingsPage';
import Settings from './pages/Settings';

const { currentPage: initialPage } = window.jwpStkDashboard || {};

export default function App() {
	const [ currentPage, setCurrentPage ] = useState( initialPage || 'dashboard' );
	const [ footerState, setFooterState ] = useState( null );
	const [ activeModule, setActiveModule ] = useState( null );

	function navigate( page ) {
		setCurrentPage( page );
		setActiveModule( null );

		const slugMap = {
			dashboard: 'jetix-store-toolkit',
			modules: 'jwp-stk-modules',
			settings: 'jwp-stk-settings',
		};
		const targetSlug = slugMap[ page ] || 'jetix-store-toolkit';
		const url = new URL( window.location.href );
		url.searchParams.set( 'page', targetSlug );
		window.history.pushState( {}, '', url.toString() );
	}

	return (
		<div className="jstk-app">
			<Header currentPage={ currentPage } navigate={ navigate } />

			<main className="jstk-content">
				{ currentPage === 'dashboard' && <Dashboard navigate={ navigate } /> }
				{ currentPage === 'modules' && ! activeModule && (
					<Modules onOpenModuleSettings={ setActiveModule } />
				) }
				{ currentPage === 'modules' && activeModule && (
					<ModuleSettingsPage
						moduleSlug={ activeModule }
						onBack={ () => setActiveModule( null ) }
					/>
				) }
				{ currentPage === 'settings' && <Settings onFooterState={ setFooterState } /> }
			</main>

			{ currentPage === 'settings' && footerState && (
				<div className="jstk-settings-footer">
					<Button
						variant="primary"
						onClick={ footerState?.handleSave }
						isBusy={ footerState?.saving }
						disabled={ ! footerState?.dirty || footerState?.saving }
					>
						{ footerState?.saving ? 'Saving…' : 'Save Changes' }
					</Button>
					<Button
						variant="tertiary"
						onClick={ footerState?.handleDiscard }
						disabled={ ! footerState?.dirty || footerState?.saving }
					>
						Discard
					</Button>
				</div>
			) }
		</div>
	);
}
