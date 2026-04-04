/**
 * Modules grid — renders loading, empty, or the module card list.
 *
 * @package Jetix_Store_Toolkit
 */

import { Spinner } from '@wordpress/components';
import ModuleCard from './ModuleCard';

const TIER_ORDER = [ 'core', 'growth', 'power' ];

export default function ModulesGrid( { modules, loading, toggling, onToggle, onConfigure } ) {
	if ( loading ) {
		return (
			<div className="jstk-loading">
				<Spinner />
				<span>Loading modules&hellip;</span>
			</div>
		);
	}

	const enabledModules = modules.filter( ( m ) => m.enabled );

	if ( enabledModules.length === 0 ) {
		return (
			<div className="jstk-empty">
				<div className="jstk-empty__icon" aria-hidden="true">📦</div>
				<h3 className="jstk-empty__title">No modules available</h3>
				<p className="jstk-empty__desc">
					There are no modules available at this time.
				</p>
			</div>
		);
	}

	// Group by tier.
	const grouped = {};
	enabledModules.forEach( ( mod ) => {
		const tier = mod.tier || 'core';
		if ( ! grouped[ tier ] ) {
			grouped[ tier ] = [];
		}
		grouped[ tier ].push( mod );
	} );

	const activeTiers = TIER_ORDER.filter( ( t ) => grouped[ t ]?.length > 0 );

	return (
		<div className="jstk-modules-tiers">
			{ activeTiers.map( ( tier ) => (
				<div key={ tier } className="jstk-modules-tier">
					<div className="jstk-modules-tier__header">
						<span className={ `jstk-tier-badge jstk-tier-badge--${ tier }` }>
							{ tier.charAt( 0 ).toUpperCase() + tier.slice( 1 ) }
						</span>
					</div>
					<ul className="jstk-modules-grid" role="list">
						{ grouped[ tier ].map( ( mod ) => (
							<li key={ mod.slug }>
								<ModuleCard
									module={ mod }
									toggling={ toggling[ mod.slug ] || false }
									onToggle={ ( active ) => onToggle( mod.slug, active ) }
									onConfigure={ () => onConfigure( mod.slug ) }
								/>
							</li>
						) ) }
					</ul>
				</div>
			) ) }
		</div>
	);
}
