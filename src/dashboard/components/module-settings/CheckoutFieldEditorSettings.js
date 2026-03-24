import { useState, useEffect, useCallback } from '@wordpress/element';
import {
	TextControl,
	SelectControl,
	ToggleControl,
	Button,
	Spinner,
	Notice,
	TabPanel,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

const SECTIONS = [
	{ name: 'billing', title: __( 'Billing', 'store-kit' ) },
	{ name: 'shipping', title: __( 'Shipping', 'store-kit' ) },
	{ name: 'order', title: __( 'Additional', 'store-kit' ) },
];

const FIELD_TYPES = [
	{ value: 'text', label: 'Text' },
	{ value: 'textarea', label: 'Textarea' },
	{ value: 'email', label: 'Email' },
	{ value: 'tel', label: 'Phone' },
	{ value: 'number', label: 'Number' },
	{ value: 'select', label: 'Select' },
	{ value: 'date', label: 'Date' },
];

const CheckoutFieldEditorSettings = () => {
	const [ settings, setSettings ] = useState( null );
	const [ defaultFields, setDefaultFields ] = useState( null );
	const [ loading, setLoading ] = useState( true );
	const [ saving, setSaving ] = useState( false );
	const [ notice, setNotice ] = useState( null );

	const fetchSettings = useCallback( async () => {
		try {
			const data = await apiFetch( {
				path: '/jwp-stk/v1/modules/checkout-field-editor/settings',
			} );
			setSettings( data.settings );
			setDefaultFields( data.default_fields || {} );
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
				path: '/jwp-stk/v1/modules/checkout-field-editor/settings',
				method: 'POST',
				data: { settings },
			} );
			setSettings( res.settings );
			setNotice( {
				status: 'success',
				message: __( 'Settings saved.', 'store-kit' ),
			} );
		} catch {
			setNotice( {
				status: 'error',
				message: __( 'Failed to save settings.', 'store-kit' ),
			} );
		} finally {
			setSaving( false );
		}
	}, [ settings ] );

	const updateField = ( section, index, key, value ) => {
		setSettings( ( prev ) => {
			const updated = { ...prev };
			const fields = [ ...( updated[ section ] || [] ) ];
			fields[ index ] = { ...fields[ index ], [ key ]: value };
			updated[ section ] = fields;
			return updated;
		} );
	};

	const removeField = ( section, index ) => {
		setSettings( ( prev ) => {
			const updated = { ...prev };
			const fields = [ ...( updated[ section ] || [] ) ];
			fields.splice( index, 1 );
			updated[ section ] = fields;
			return updated;
		} );
	};

	const addCustomField = ( section ) => {
		setSettings( ( prev ) => {
			const updated = { ...prev };
			const fields = [ ...( updated[ section ] || [] ) ];
			fields.push( {
				name: section + '_custom_' + Date.now(),
				label: '',
				type: 'text',
				required: false,
				disabled: false,
				custom: true,
				placeholder: '',
				priority: 100 + fields.length,
			} );
			updated[ section ] = fields;
			return updated;
		} );
	};

	/**
	 * Build the field list for a section, merging WC defaults with saved overrides.
	 */
	const getFieldsForSection = ( section ) => {
		const saved = settings[ section ] || [];
		const defaults = defaultFields[ section ] || {};
		const savedNames = saved.map( ( f ) => f.name );

		// Start with saved fields.
		const merged = [ ...saved ];

		// Add any WC default fields that aren't in saved list.
		Object.keys( defaults ).forEach( ( name ) => {
			if ( ! savedNames.includes( name ) ) {
				merged.push( {
					name,
					label: defaults[ name ].label || name,
					required: defaults[ name ].required || false,
					disabled: false,
					custom: false,
					placeholder: '',
				} );
			}
		} );

		return merged;
	};

	if ( loading || ! settings ) {
		return (
			<div className="jwp-stk-modules-loading">
				<Spinner />
			</div>
		);
	}

	const renderSection = ( section ) => {
		const fields = getFieldsForSection( section );

		return (
			<div className="jwp-stk-cfe-section">
				{ fields.length === 0 && (
					<p className="jwp-stk-cfe-empty">
						{ __( 'No fields configured.', 'store-kit' ) }
					</p>
				) }

				{ fields.map( ( field, index ) => (
					<div
						key={ field.name }
						className="jwp-stk-cfe-field-row"
					>
						<div className="jwp-stk-cfe-field-row__header">
							<strong>{ field.name }</strong>
							{ field.custom && (
								<Button
									isDestructive
									variant="tertiary"
									size="small"
									onClick={ () =>
										removeField( section, index )
									}
								>
									{ __( 'Remove', 'store-kit' ) }
								</Button>
							) }
						</div>

						<div className="jwp-stk-cfe-field-row__controls">
							<TextControl
								label={ __( 'Label', 'store-kit' ) }
								value={ field.label || '' }
								onChange={ ( val ) =>
									updateField(
										section,
										index,
										'label',
										val
									)
								}
								__nextHasNoMarginBottom
							/>

							<TextControl
								label={ __( 'Placeholder', 'store-kit' ) }
								value={ field.placeholder || '' }
								onChange={ ( val ) =>
									updateField(
										section,
										index,
										'placeholder',
										val
									)
								}
								__nextHasNoMarginBottom
							/>

							{ field.custom && (
								<SelectControl
									label={ __( 'Type', 'store-kit' ) }
									value={ field.type || 'text' }
									options={ FIELD_TYPES }
									onChange={ ( val ) =>
										updateField(
											section,
											index,
											'type',
											val
										)
									}
									__nextHasNoMarginBottom
								/>
							) }

							<ToggleControl
								label={ __( 'Required', 'store-kit' ) }
								checked={ !! field.required }
								onChange={ ( val ) =>
									updateField(
										section,
										index,
										'required',
										val
									)
								}
								__nextHasNoMarginBottom
							/>

							<ToggleControl
								label={ __( 'Disabled', 'store-kit' ) }
								checked={ !! field.disabled }
								onChange={ ( val ) =>
									updateField(
										section,
										index,
										'disabled',
										val
									)
								}
								__nextHasNoMarginBottom
							/>
						</div>
					</div>
				) ) }

				<Button
					variant="secondary"
					onClick={ () => addCustomField( section ) }
					className="jwp-stk-cfe-add-field"
				>
					{ __( '+ Add Custom Field', 'store-kit' ) }
				</Button>
			</div>
		);
	};

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

			<TabPanel
				className="jwp-stk-cfe-tabs"
				activeClass="is-active"
				tabs={ SECTIONS }
			>
				{ ( tab ) => renderSection( tab.name ) }
			</TabPanel>

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

export default CheckoutFieldEditorSettings;
