/**
 * Dashboard page.
 *
 * @package Jetix_Store_Toolkit
 */

import { useState, useEffect, useCallback } from '@wordpress/element';
import { Spinner } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { Button } from '../components/ui';

export default function Dashboard( { navigate } ) {
	const { adminUrl } = window.jwpStkDashboard || {};
	const [ stats, setStats ] = useState( null );
	const [ loading, setLoading ] = useState( true );

	const fetchStats = useCallback( async () => {
		try {
			const modules = await apiFetch( { path: '/jwp-stk/v1/modules' } );
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
		<div className="jstk-page">
			<div className="jstk-page__header">
				<div className="jstk-page__header-text">
					<h1 className="jstk-page__title">Dashboard</h1>
					<p className="jstk-page__desc">
						Welcome to Jetix Store Toolkit for WooCommerce. Your modular WooCommerce toolkit — enable only the features your store needs.
					</p>
				</div>
			</div>

			<div className="jstk-dashboard-stats">
				{ loading ? (
					<div className="jstk-loading">
						<Spinner />
						<span>Loading&hellip;</span>
					</div>
				) : (
					stats && (
						<div className="jstk-stats-grid">
							<div className="jstk-stat-card">
								<span className="jstk-stat-card__number">{ stats.active }</span>
								<span className="jstk-stat-card__label">Active Modules</span>
							</div>
							<div className="jstk-stat-card">
								<span className="jstk-stat-card__number">{ stats.total }</span>
								<span className="jstk-stat-card__label">Available Modules</span>
							</div>
						</div>
					)
				) }
			</div>

			<div className="jstk-dashboard-actions">
				<Button
					variant="primary"
					onClick={ () => navigate( 'modules' ) }
				>
					Manage Modules
				</Button>
				<Button
					variant="tertiary"
					onClick={ () => navigate( 'settings' ) }
				>
					Global Settings
				</Button>
			</div>
		</div>
	);
}
