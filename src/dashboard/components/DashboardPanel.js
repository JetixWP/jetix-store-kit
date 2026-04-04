import { useState, useEffect, useCallback } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

const DashboardPanel = () => {
	const { adminUrl } = window.jwpStkDashboard || {};
	const [ stats, setStats ] = useState( null );
	const [ loading, setLoading ] = useState( true );

	const fetchStats = useCallback( async () => {
		try {
			const modules = await apiFetch( {
				path: '/jwp-stk/v1/modules',
			} );
			const enabled = modules.filter( ( m ) => m.enabled );
			const active = modules.filter( ( m ) => m.enabled && m.active );
			setStats( { total: enabled.length, active: active.length } );
		} catch {
			setStats( { total: 0, active: 0 } );
		} finally {
			setLoading( false );
		}
	}, [] );

	useEffect( () => {
		fetchStats();
	}, [ fetchStats ] );

	return (
		<div className="jwp-stk-dashboard-panel">
			<div className="jwp-stk-welcome-banner">
				<div className="jwp-stk-welcome-banner__content">
					<h2>
						{ __(
							'Welcome to Jetix Store Toolkit for WooCommerce',
							'jetix-store-toolkit'
						) }
					</h2>
					<p>
						{ __(
							'Your modular WooCommerce toolkit. Enable only the features your store needs — from Quick View and Store Manager to Wishlist',
							'jetix-store-toolkit'
						) }
					</p>
					{ ! loading && stats && (
						<div className="jwp-stk-welcome-stats">
							<div className="jwp-stk-stat">
								<span className="jwp-stk-stat__number">
									{ stats.active }
								</span>
								<span className="jwp-stk-stat__label">
									{ __( 'Active Modules', 'jetix-store-toolkit' ) }
								</span>
							</div>
							<div className="jwp-stk-stat">
								<span className="jwp-stk-stat__number">
									{ stats.total }
								</span>
								<span className="jwp-stk-stat__label">
									{ __( 'Available Modules', 'jetix-store-toolkit' ) }
								</span>
							</div>
						</div>
					) }
					{ loading && <Spinner /> }
					<div className="jwp-stk-welcome-actions">
						<a
							href={ `${ adminUrl }admin.php?page=jwp-stk-modules` }
							className="components-button is-primary"
						>
							{ __( 'Manage Modules', 'jetix-store-toolkit' ) }
						</a>
						<a
							href={ `${ adminUrl }admin.php?page=jwp-stk-settings` }
							className="components-button is-secondary"
						>
							{ __( 'Global Settings', 'jetix-store-toolkit' ) }
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardPanel;
