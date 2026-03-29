import { useState, useEffect, useCallback } from '@wordpress/element';
import { ToggleControl, Spinner, Notice } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

const TIER_LABELS = {
	core: __( 'Core', 'jetix-store-toolkit' ),
	growth: __( 'Growth', 'jetix-store-toolkit' ),
	power: __( 'Power', 'jetix-store-toolkit' ),
};

const TIER_DESCRIPTIONS = {
	core: __( 'Essential features every WooCommerce store needs.', 'jetix-store-toolkit' ),
	growth: __( 'Conversion and engagement features to grow your store.', 'jetix-store-toolkit' ),
	power: __( 'Advanced features for mature stores.', 'jetix-store-toolkit' ),
};

const ModulesPanel = ( { onOpenModuleSettings } ) => {
	const [ modules, setModules ] = useState( [] );
	const [ loading, setLoading ] = useState( true );
	const [ toggling, setToggling ] = useState( {} );
	const [ notice, setNotice ] = useState( null );

	const fetchModules = useCallback( async () => {
		try {
			const data = await apiFetch( { path: '/jwp-stk/v1/modules' } );
			setModules( data );
		} catch ( err ) {
			setNotice( {
				status: 'error',
				message: __( 'Failed to load modules.', 'jetix-store-toolkit' ),
			} );
		} finally {
			setLoading( false );
		}
	}, [] );

	useEffect( () => {
		fetchModules();
	}, [ fetchModules ] );

	const handleToggle = useCallback(
		async ( slug, active ) => {
			setToggling( ( prev ) => ( { ...prev, [ slug ]: true } ) );
			setNotice( null );

			try {
				await apiFetch( {
					path: '/jwp-stk/v1/modules/toggle',
					method: 'POST',
					data: { module: slug, active },
				} );

				setModules( ( prev ) =>
					prev.map( ( m ) =>
						m.slug === slug ? { ...m, active } : m
					)
				);
			} catch ( err ) {
				setNotice( {
					status: 'error',
					message: __( 'Failed to update module.', 'jetix-store-toolkit' ),
				} );
			} finally {
				setToggling( ( prev ) => ( { ...prev, [ slug ]: false } ) );
			}
		},
		[]
	);

	if ( loading ) {
		return (
			<div className="jwp-stk-modules-loading">
				<Spinner />
			</div>
		);
	}

	// Only show enabled modules, grouped by tier.
	const enabledModules = modules.filter( ( m ) => m.enabled );
	const grouped = { core: [], growth: [], power: [] };
	enabledModules.forEach( ( mod ) => {
		if ( grouped[ mod.tier ] ) {
			grouped[ mod.tier ].push( mod );
		}
	} );

	// Only render tiers that have modules.
	const activeTiers = Object.keys( grouped ).filter(
		( tier ) => grouped[ tier ].length > 0
	);

	return (
		<div className="jwp-stk-modules-panel">
			{ notice && (
				<Notice
					status={ notice.status }
					isDismissible
					onDismiss={ () => setNotice( null ) }
				>
					{ notice.message }
				</Notice>
			) }

			{ activeTiers.map( ( tier ) => (
				<div
					key={ tier }
					className={ `jwp-stk-module-tier jwp-stk-tier-${ tier }` }
				>
					<div className="jwp-stk-tier-header">
						<h2>
							<span
								className={ `jwp-stk-tier-badge jwp-stk-badge-${ tier }` }
							>
								{ TIER_LABELS[ tier ] }
							</span>
						</h2>
						<p className="jwp-stk-tier-description">
							{ TIER_DESCRIPTIONS[ tier ] }
						</p>
					</div>
					<div className="jwp-stk-module-grid">
						{ grouped[ tier ].map( ( mod ) => (
							<div
								key={ mod.slug }
								className={ `jwp-stk-module-card ${
									mod.active ? 'is-active' : ''
								}` }
							>
								<div className="jwp-stk-module-card__body">
									<div className="jwp-stk-module-card__title-row">
										<h3 className="jwp-stk-module-card__title">
											{ mod.title }
										</h3>
										{ mod.active && (
											<button
												type="button"
												className="jwp-stk-module-card__settings-link"
												onClick={ () =>
													onOpenModuleSettings(
														mod.slug
													)
												}
											>
												{ __( 'Configure', 'jetix-store-toolkit' ) }
											</button>
										) }
									</div>
									<p className="jwp-stk-module-card__description">
										{ mod.description }
									</p>
								</div>
								<div className="jwp-stk-module-card__footer">
									<ToggleControl
										checked={ mod.active }
										onChange={ ( val ) =>
											handleToggle( mod.slug, val )
										}
										disabled={
											toggling[ mod.slug ] || false
										}
										__nextHasNoMarginBottom
									/>
								</div>
							</div>
						) ) }
					</div>
				</div>
			) ) }
		</div>
	);
};

export default ModulesPanel;
