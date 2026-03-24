import { useState, useEffect, useCallback } from '@wordpress/element';
import {
	Button,
	Spinner,
	ToggleControl,
	Notice,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import QuickViewSettings from './module-settings/QuickViewSettings';
import CheckoutFieldEditorSettings from './module-settings/CheckoutFieldEditorSettings';
import CustomOrderStatusesSettings from './module-settings/CustomOrderStatusesSettings';
import StockManagerSettings from './module-settings/StockManagerSettings';
import ProductTabManagerSettings from './module-settings/ProductTabManagerSettings';

const MODULE_SETTINGS_MAP = {
	'quick-view': QuickViewSettings,
	'checkout-field-editor': CheckoutFieldEditorSettings,
	'custom-order-statuses': CustomOrderStatusesSettings,
	'stock-manager': StockManagerSettings,
	'product-tab-manager': ProductTabManagerSettings,
};

const ModuleSettingsPage = ( { moduleSlug, onBack } ) => {
	const [ module, setModule ] = useState( null );
	const [ loading, setLoading ] = useState( true );
	const [ toggling, setToggling ] = useState( false );
	const [ notice, setNotice ] = useState( null );

	const fetchModule = useCallback( async () => {
		try {
			const modules = await apiFetch( {
				path: '/jwp-stk/v1/modules',
			} );
			const found = modules.find( ( m ) => m.slug === moduleSlug );
			setModule( found || null );
		} catch {
			setNotice( {
				status: 'error',
				message: __( 'Failed to load module.', 'store-kit' ),
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
					message: __( 'Failed to update module.', 'store-kit' ),
				} );
			} finally {
				setToggling( false );
			}
		},
		[ moduleSlug ]
	);

	if ( loading ) {
		return (
			<div className="jwp-stk-module-settings-loading">
				<Spinner />
			</div>
		);
	}

	if ( ! module ) {
		return (
			<div className="jwp-stk-module-settings-not-found">
				<p>{ __( 'Module not found.', 'store-kit' ) }</p>
				<Button variant="secondary" onClick={ onBack }>
					{ __( '\u2190 Back to Modules', 'store-kit' ) }
				</Button>
			</div>
		);
	}

	const SettingsComponent = MODULE_SETTINGS_MAP[ moduleSlug ] || null;

	return (
		<div className="jwp-stk-module-settings-page">
			{ notice && (
				<Notice
					status={ notice.status }
					isDismissible
					onDismiss={ () => setNotice( null ) }
				>
					{ notice.message }
				</Notice>
			) }

			<div className="jwp-stk-module-settings__header">
				<Button
					variant="tertiary"
					onClick={ onBack }
					className="jwp-stk-back-button"
				>
					{ __( '\u2190 Back to Modules', 'store-kit' ) }
				</Button>
				<div className="jwp-stk-module-settings__title-row">
					<h2>{ module.title }</h2>
					<span
						className={ `jwp-stk-tier-badge jwp-stk-badge-${ module.tier }` }
					>
						{ module.tier }
					</span>
					<div className="jwp-stk-module-settings__toggle">
						<ToggleControl
							label={
								module.active
									? __( 'Active', 'store-kit' )
									: __( 'Inactive', 'store-kit' )
							}
							checked={ module.active }
							onChange={ handleToggle }
							disabled={ toggling }
							__nextHasNoMarginBottom
						/>
					</div>
				</div>
				<p className="jwp-stk-module-settings__description">
					{ module.description }
				</p>
			</div>

			<div className="jwp-stk-module-settings__body">
				{ SettingsComponent ? (
					<SettingsComponent />
				) : (
					<div className="jwp-stk-module-settings-placeholder">
						<p>
							{ __(
								'No configuration available for this module.',
								'store-kit'
							) }
						</p>
					</div>
				) }
			</div>
		</div>
	);
};

export default ModuleSettingsPage;
