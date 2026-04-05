/**
 * Modules grid — renders loading, empty, or the module card list.
 *
 * @package Jetix_Store_Toolkit
 */

import { Spinner } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import ModuleCard from './ModuleCard';

const TIER_ORDER = [ 'core', 'growth', 'power' ];

const UPCOMING_MODULES = [
	{
		title: __( 'Checkout Field Editor', 'jetix-store-toolkit' ),
		description: __(
			'Add, remove, reorder, or customise every WooCommerce checkout field without code.',
			'jetix-store-toolkit'
		),
		tier: 'core',
	},
	{
		title: __( 'Wishlist', 'jetix-store-toolkit' ),
		description: __(
			'Let customers save products for later and share their wishlist.',
			'jetix-store-toolkit'
		),
		tier: 'growth',
	},
	{
		title: __( 'Product Bundles', 'jetix-store-toolkit' ),
		description: __(
			'Bundle products together at a fixed or discounted price.',
			'jetix-store-toolkit'
		),
		tier: 'growth',
	},
	{
		title: __( 'Points & Rewards', 'jetix-store-toolkit' ),
		description: __(
			'Award points for purchases, reviews, and referrals. Let customers redeem points as cart discounts.',
			'jetix-store-toolkit'
		),
		tier: 'power',
	},
];

const PLANNED_MODULES = [
	{
		title: __( 'Cart Notices', 'jetix-store-toolkit' ),
		description: __(
			'Show targeted messages in the cart — upsell thresholds, free shipping bars, limited-time alerts.',
			'jetix-store-toolkit'
		),
		tier: 'core',
	},
	{
		title: __( 'Instant Product Search', 'jetix-store-toolkit' ),
		description: __(
			'Live search with product thumbnails, prices, and direct links as the user types.',
			'jetix-store-toolkit'
		),
		tier: 'growth',
	},
	{
		title: __( 'Orders & Customers Export', 'jetix-store-toolkit' ),
		description: __(
			'Export orders and customers to CSV with custom column selection and date filters.',
			'jetix-store-toolkit'
		),
		tier: 'power',
	},
];

function RoadmapCard( { module } ) {
	return (
		<article className="jstk-module-card jstk-roadmap-card">
			<div className="jstk-module-card__body">
				<div className="jstk-roadmap-card__tier-row">
					<span
						className={ `jstk-tier-badge jstk-tier-badge--${ module.tier }` }
					>
						{ module.tier.charAt( 0 ).toUpperCase() +
							module.tier.slice( 1 ) }
					</span>
				</div>
				<h3 className="jstk-module-card__name" title={ module.title }>
					{ module.title }
				</h3>
				<p className="jstk-module-card__meta">{ module.description }</p>
			</div>
			<footer className="jstk-module-card__footer jstk-roadmap-card__footer">
				<span className="jstk-roadmap-card__status-label">
					{ __( 'Coming Soon', 'jetix-store-toolkit' ) }
				</span>
			</footer>
		</article>
	);
}

function RoadmapSection( { title, description, modules } ) {
	return (
		<div className="jstk-roadmap-section">
			<div className="jstk-roadmap-section__header">
				<h2 className="jstk-roadmap-section__title">{ title }</h2>
				{ description && (
					<p className="jstk-roadmap-section__desc">{ description }</p>
				) }
			</div>
			<ul className="jstk-modules-grid" role="list">
				{ modules.map( ( mod ) => (
					<li key={ mod.title }>
						<RoadmapCard module={ mod } />
					</li>
				) ) }
			</ul>
		</div>
	);
}

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

			<div className="jstk-roadmap">
				<RoadmapSection
					title={ __( 'Upcoming Modules', 'jetix-store-toolkit' ) }
					description={ __(
						'These modules are actively being built and will become available in upcoming releases.',
						'jetix-store-toolkit'
					) }
					modules={ UPCOMING_MODULES }
				/>
				<RoadmapSection
					title={ __( 'Planned', 'jetix-store-toolkit' ) }
					description={ __(
						'On our roadmap — coming further down the line.',
						'jetix-store-toolkit'
					) }
					modules={ PLANNED_MODULES }
				/>
			</div>
		</div>
	);
}
