import { useState, useEffect, useCallback } from '@wordpress/element';
import { TextControl, Button, Spinner, Notice } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

const CustomOrderStatusesDefaultStatuses = () => {
	const [ builtinStatuses, setBuiltinStatuses ] = useState( {} );
	const [ customLabels, setCustomLabels ] = useState( {} );
	const [ loading, setLoading ] = useState( true );
	const [ saving, setSaving ] = useState( false );
	const [ notice, setNotice ] = useState( null );

	const fetchSettings = useCallback( async () => {
		try {
			const data = await apiFetch( {
				path: '/jwp-stk/v1/modules/custom-order-statuses/settings',
			} );

			// Build a set of keys belonging to custom statuses so we can exclude them.
			const customKeys = new Set(
				( data.settings.statuses || [] )
					.filter( ( s ) => s.slug )
					.map( ( s ) => 'wc-' + s.slug )
			);

			const filtered = Object.fromEntries(
				Object.entries( data.builtin_statuses || {} ).filter(
					( [ key ] ) => ! customKeys.has( key )
				)
			);

			setBuiltinStatuses( filtered );
			setCustomLabels( data.settings.builtin_labels || {} );
		} catch {
			setNotice( {
				status: 'error',
				message: __( 'Failed to load settings.', 'jetix-store-toolkit' ),
			} );
		} finally {
			setLoading( false );
		}
	}, [] );

	useEffect( () => {
		fetchSettings();
	}, [ fetchSettings ] );

	const handleLabelChange = ( key, value ) => {
		setCustomLabels( ( prev ) => ( { ...prev, [ key ]: value } ) );
	};

	const handleSave = useCallback( async () => {
		setSaving( true );
		setNotice( null );
		try {
			await apiFetch( {
				path: '/jwp-stk/v1/modules/custom-order-statuses/settings',
				method: 'POST',
				data: { settings: { builtin_labels: customLabels } },
			} );
			setNotice( {
				status: 'success',
				message: __( 'Default status labels saved.', 'jetix-store-toolkit' ),
			} );
		} catch {
			setNotice( {
				status: 'error',
				message: __( 'Failed to save settings.', 'jetix-store-toolkit' ),
			} );
		} finally {
			setSaving( false );
		}
	}, [ customLabels ] );

	if ( loading ) {
		return (
			<div className="jstk-loading">
				<Spinner />
			</div>
		);
	}

	return (
		<div className="jstk-module-settings-form">
			{ notice && (
				<Notice
					status={ notice.status }
					isDismissible
					onDismiss={ () => setNotice( null ) }
				>
					{ notice.message }
				</Notice>
			) }

			<p className="jstk-settings-description">
				{ __(
					'Customise the display labels for the default WooCommerce order statuses. Leave a field blank to use the original label.',
					'jetix-store-toolkit'
				) }
			</p>

			<div className="jstk-cos-default-statuses">
				{ Object.entries( builtinStatuses ).map(
					( [ key, originalLabel ] ) => (
						<div key={ key } className="jstk-cos-default-row">
							<code className="jstk-cos-default-row__key">
								{ key }
							</code>
							<TextControl
								label={ originalLabel }
								placeholder={ originalLabel }
								value={ customLabels[ key ] || '' }
								onChange={ ( val ) =>
									handleLabelChange( key, val )
								}
								__nextHasNoMarginBottom
							/>
						</div>
					)
				) }
			</div>

			<div className="jstk-settings-actions">
				<Button
					variant="primary"
					onClick={ handleSave }
					isBusy={ saving }
					disabled={ saving }
				>
					{ __( 'Save Labels', 'jetix-store-toolkit' ) }
				</Button>
			</div>
		</div>
	);
};

export default CustomOrderStatusesDefaultStatuses;
