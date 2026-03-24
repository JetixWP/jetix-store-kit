import { useState, useEffect, useCallback } from '@wordpress/element';
import {
	TextControl,
	Button,
	Spinner,
	Notice,
	ColorIndicator,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

const CustomOrderStatusesSettings = () => {
	const [ statuses, setStatuses ] = useState( [] );
	const [ builtinStatuses, setBuiltinStatuses ] = useState( {} );
	const [ loading, setLoading ] = useState( true );
	const [ saving, setSaving ] = useState( false );
	const [ notice, setNotice ] = useState( null );

	const fetchSettings = useCallback( async () => {
		try {
			const data = await apiFetch( {
				path: '/jwp-stk/v1/modules/custom-order-statuses/settings',
			} );
			setStatuses( data.settings.statuses || [] );
			setBuiltinStatuses( data.builtin_statuses || {} );
		} catch {
			setNotice( {
				status: 'error',
				message: __( 'Failed to load settings.', 'store-kit' ),
			} );
		} finally {
			setLoading( false );
		}
	}, [] );

	useEffect( () => {
		fetchSettings();
	}, [ fetchSettings ] );

	const handleSave = useCallback( async () => {
		setSaving( true );
		setNotice( null );
		try {
			const res = await apiFetch( {
				path: '/jwp-stk/v1/modules/custom-order-statuses/settings',
				method: 'POST',
				data: { settings: { statuses } },
			} );
			setStatuses( res.settings.statuses || [] );
			setNotice( {
				status: 'success',
				message: __( 'Settings saved. Reload the page to see new statuses.', 'store-kit' ),
			} );
		} catch {
			setNotice( {
				status: 'error',
				message: __( 'Failed to save settings.', 'store-kit' ),
			} );
		} finally {
			setSaving( false );
		}
	}, [ statuses ] );

	const addStatus = () => {
		setStatuses( ( prev ) => [
			...prev,
			{ slug: '', label: '', color: '#787c82' },
		] );
	};

	const updateStatus = ( index, key, value ) => {
		setStatuses( ( prev ) => {
			const updated = [ ...prev ];
			updated[ index ] = { ...updated[ index ], [ key ]: value };

			// Auto-generate slug from label.
			if ( key === 'label' && ! updated[ index ]._slugEdited ) {
				updated[ index ].slug = value
					.toLowerCase()
					.replace( /[^a-z0-9]+/g, '-' )
					.replace( /^-|-$/g, '' )
					.substring( 0, 17 );
			}
			return updated;
		} );
	};

	const removeStatus = ( index ) => {
		setStatuses( ( prev ) => prev.filter( ( _, i ) => i !== index ) );
	};

	if ( loading ) {
		return (
			<div className="jwp-stk-modules-loading">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="jwp-stk-module-settings-form">
			{ notice && (
				<Notice
					status={ notice.status }
					isDismissible
					onDismiss={ () => setNotice( null ) }
				>
					{ notice.message }
				</Notice>
			) }

			<div className="jwp-stk-cos-builtin">
				<h3>{ __( 'Built-in Statuses', 'store-kit' ) }</h3>
				<p className="jwp-stk-settings-description">
					{ __(
						'These are the default WooCommerce order statuses. They cannot be removed.',
						'store-kit'
					) }
				</p>
				<ul className="jwp-stk-cos-builtin-list">
					{ Object.entries( builtinStatuses ).map(
						( [ key, label ] ) => (
							<li key={ key }>
								<code>{ key }</code> — { label }
							</li>
						)
					) }
				</ul>
			</div>

			<h3>{ __( 'Custom Statuses', 'store-kit' ) }</h3>

			{ statuses.length === 0 && (
				<p className="jwp-stk-settings-description">
					{ __(
						'No custom statuses yet. Click the button below to add one.',
						'store-kit'
					) }
				</p>
			) }

			{ statuses.map( ( status, index ) => (
				<div key={ index } className="jwp-stk-cos-status-row">
					<div className="jwp-stk-cos-status-row__fields">
						<TextControl
							label={ __( 'Label', 'store-kit' ) }
							value={ status.label }
							onChange={ ( val ) =>
								updateStatus( index, 'label', val )
							}
							__nextHasNoMarginBottom
						/>
						<TextControl
							label={ __( 'Slug', 'store-kit' ) }
							value={ status.slug }
							onChange={ ( val ) => {
								updateStatus( index, 'slug', val );
								updateStatus( index, '_slugEdited', true );
							} }
							help={ __(
								'Max 17 characters, lowercase letters, numbers, hyphens.',
								'store-kit'
							) }
							__nextHasNoMarginBottom
						/>
						<div className="jwp-stk-cos-color-field">
							<label>{ __( 'Color', 'store-kit' ) }</label>
							<div className="jwp-stk-cos-color-input">
								<ColorIndicator
									colorValue={ status.color || '#787c82' }
								/>
								<input
									type="color"
									value={ status.color || '#787c82' }
									onChange={ ( e ) =>
										updateStatus(
											index,
											'color',
											e.target.value
										)
									}
								/>
							</div>
						</div>
					</div>
					<Button
						isDestructive
						variant="tertiary"
						onClick={ () => removeStatus( index ) }
					>
						{ __( 'Remove', 'store-kit' ) }
					</Button>
				</div>
			) ) }

			<Button
				variant="secondary"
				onClick={ addStatus }
				className="jwp-stk-cos-add-status"
			>
				{ __( '+ Add Custom Status', 'store-kit' ) }
			</Button>

			<div className="jwp-stk-settings-actions">
				<Button
					variant="primary"
					onClick={ handleSave }
					isBusy={ saving }
					disabled={ saving }
				>
					{ __( 'Save Settings', 'store-kit' ) }
				</Button>
			</div>
		</div>
	);
};

export default CustomOrderStatusesSettings;
