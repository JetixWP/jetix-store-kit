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
							'Welcome to Store Kit for WooCommerce',
							'store-kit'
						) }
					</h2>
					<p>
						{ __(
							'Your modular WooCommerce toolkit. Enable only the features your store needs — from Quick View and Cart Notices to Wishlists and Variation Swatches.',
							'store-kit'
						) }
					</p>
					{ ! loading && stats && (
						<div className="jwp-stk-welcome-stats">
							<div className="jwp-stk-stat">
								<span className="jwp-stk-stat__number">
									{ stats.active }
								</span>
								<span className="jwp-stk-stat__label">
									{ __( 'Active Modules', 'store-kit' ) }
								</span>
							</div>
							<div className="jwp-stk-stat">
								<span className="jwp-stk-stat__number">
									{ stats.total }
								</span>
								<span className="jwp-stk-stat__label">
									{ __( 'Available Modules', 'store-kit' ) }
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
							{ __( 'Manage Modules', 'store-kit' ) }
						</a>
						<a
							href={ `${ adminUrl }admin.php?page=jwp-stk-settings` }
							className="components-button is-secondary"
						>
							{ __( 'Global Settings', 'store-kit' ) }
						</a>
					</div>
				</div>
			</div>
		</div>
	);
};

export default DashboardPanel;
