import { useState, useEffect, useCallback } from '@wordpress/element';
import {
	TextControl,
	Button,
	Spinner,
	Notice,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import { ColorPicker } from '../../ui';

const EMPTY_STATUS = { label: '', slug: '', color: '#787c82' };

function slugify( str ) {
	return str
		.toLowerCase()
		.replace( /[^a-z0-9]+/g, '-' )
		.replace( /^-|-$/g, '' )
		.substring( 0, 17 );
}

const CustomOrderStatusesSettings = () => {
	const [ statuses, setStatuses ] = useState( [] );
	const [ loading, setLoading ] = useState( true );
	const [ saving, setSaving ] = useState( false );
	const [ notice, setNotice ] = useState( null );
	const [ showAddForm, setShowAddForm ] = useState( false );
	const [ newStatus, setNewStatus ] = useState( EMPTY_STATUS );
	const [ newSlugEdited, setNewSlugEdited ] = useState( false );
	const [ expandedIndex, setExpandedIndex ] = useState( null );
	const [ dirty, setDirty ] = useState( false );

	const fetchSettings = useCallback( async () => {
		try {
			const data = await apiFetch( {
				path: '/jwp-stk/v1/modules/custom-order-statuses/settings',
			} );
			setStatuses( data.settings.statuses || [] );
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
			setDirty( false );
			setNotice( {
				status: 'success',
				message: __( 'Settings saved. Reload the page to see new statuses.', 'jetix-store-toolkit' ),
			} );
		} catch {
			setNotice( {
				status: 'error',
				message: __( 'Failed to save settings.', 'jetix-store-toolkit' ),
			} );
		} finally {
			setSaving( false );
		}
	}, [ statuses ] );

	const handleNewStatusChange = ( key, value ) => {
		setNewStatus( ( prev ) => {
			const updated = { ...prev, [ key ]: value };
			if ( key === 'label' && ! newSlugEdited ) {
				updated.slug = slugify( value );
			}
			return updated;
		} );
		if ( key === 'slug' ) {
			setNewSlugEdited( true );
		}
	};

	const handleAddStatus = () => {
		if ( ! newStatus.label || ! newStatus.slug ) {
			return;
		}
		setStatuses( ( prev ) => [ ...prev, { ...newStatus } ] );
		setDirty( true );
		setNewStatus( EMPTY_STATUS );
		setNewSlugEdited( false );
		setShowAddForm( false );
	};

	const handleCancelAdd = () => {
		setNewStatus( EMPTY_STATUS );
		setNewSlugEdited( false );
		setShowAddForm( false );
	};

	const updateStatus = ( index, key, value ) => {
		setDirty( true );
		setStatuses( ( prev ) => {
			const updated = [ ...prev ];
			updated[ index ] = { ...updated[ index ], [ key ]: value };
			if ( key === 'label' && ! updated[ index ]._slugEdited ) {
				updated[ index ].slug = slugify( value );
			}
			return updated;
		} );
	};

	const removeStatus = ( index ) => {
		setDirty( true );
		setStatuses( ( prev ) => prev.filter( ( _, i ) => i !== index ) );
		setExpandedIndex( ( prev ) => {
			if ( prev === index ) return null;
			if ( prev > index ) return prev - 1;
			return prev;
		} );
	};

	const toggleAccordion = ( index ) => {
		setExpandedIndex( ( prev ) => ( prev === index ? null : index ) );
	};

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

			{ ! showAddForm && (
				<div className="jstk-cos-top-actions">
					<Button
						variant="primary"
						onClick={ () => setShowAddForm( true ) }
					>
						{ __( '+ Add New Status', 'jetix-store-toolkit' ) }
					</Button>
				</div>
			) }

			{ showAddForm && (
				<div className="jstk-cos-add-form">
					<h4 className="jstk-cos-add-form__title">
						{ __( 'New Custom Status', 'jetix-store-toolkit' ) }
					</h4>
					<div className="jstk-cos-fields">
						<div className="jstk-cos-text-fields">
							<TextControl
							label={ __( 'Label', 'jetix-store-toolkit' ) }
							value={ newStatus.label }
							onChange={ ( val ) =>
								handleNewStatusChange( 'label', val )
							}
							__nextHasNoMarginBottom
						/>
						<TextControl
							label={ __( 'Slug', 'jetix-store-toolkit' ) }
							value={ newStatus.slug }
							onChange={ ( val ) =>
								handleNewStatusChange( 'slug', val )
							}
							help={ __(
								'Max 17 characters, lowercase letters, numbers, hyphens.',
								'jetix-store-toolkit'
							) }
							__nextHasNoMarginBottom
						/>
						</div>
						<ColorPicker
							id="jstk-cos-new-color"
							label={ __( 'Color', 'jetix-store-toolkit' ) }
							value={ newStatus.color }
							onChange={ ( val ) =>
								handleNewStatusChange( 'color', val )
							}
						/>
					</div>
					<div className="jstk-cos-add-form__actions">
						<Button
							variant="primary"
							onClick={ handleAddStatus }
							disabled={
								! newStatus.label || ! newStatus.slug
							}
						>
							{ __( 'Add Status', 'jetix-store-toolkit' ) }
						</Button>
						<Button
							variant="tertiary"
							onClick={ handleCancelAdd }
						>
							{ __( 'Cancel', 'jetix-store-toolkit' ) }
						</Button>
					</div>
				</div>
			) }

			{ statuses.length === 0 && ! showAddForm && (
				<p className="jstk-settings-description jstk-cos-empty-msg">
					{ __(
						'No custom statuses yet. Click the button above to add one.',
						'jetix-store-toolkit'
					) }
				</p>
			) }

			{ statuses.length > 0 && (
				<div className="jstk-cos-status-list">
					{ statuses.map( ( status, index ) => (
						<div
							key={ index }
							className={ `jstk-cos-accordion${ expandedIndex === index ? ' is-open' : '' }` }
						>
							<button
								type="button"
								className="jstk-cos-accordion__header"
								onClick={ () => toggleAccordion( index ) }
								aria-expanded={ expandedIndex === index }
							>
								<div className="jstk-cos-accordion__header-left">
									<span
										className="jstk-cos-accordion__color-dot"
										style={ { background: status.color || '#787c82' } }
										aria-hidden="true"
									/>
									<span className="jstk-cos-accordion__label">
										{ status.label ||
											__(
												'(unnamed)',
												'jetix-store-toolkit'
											) }
									</span>
									<code className="jstk-cos-accordion__slug">
										wc-{ status.slug }
									</code>
								</div>
								<div className="jstk-cos-accordion__header-right">
									<Button
										isDestructive
										variant="tertiary"
										onClick={ ( e ) => {
											e.stopPropagation();
											removeStatus( index );
										} }
									>
										{ __(
											'Remove',
											'jetix-store-toolkit'
										) }
									</Button>
									<span
										className="jstk-cos-accordion__chevron"
										aria-hidden="true"
									>
										{ expandedIndex === index
											? '▲'
											: '▼' }
									</span>
								</div>
							</button>

							{ expandedIndex === index && (
								<div className="jstk-cos-accordion__body">
									<div className="jstk-cos-fields">
										<div className="jstk-cos-text-fields">
											<TextControl
												label={ __(
													'Label',
													'jetix-store-toolkit'
												) }
												value={ status.label }
												onChange={ ( val ) =>
													updateStatus(
														index,
														'label',
														val
													)
												}
												__nextHasNoMarginBottom
											/>
											<TextControl
												label={ __(
													'Slug',
													'jetix-store-toolkit'
												) }
												value={ status.slug }
												onChange={ ( val ) => {
													updateStatus(
														index,
														'slug',
														val
													);
													updateStatus(
														index,
														'_slugEdited',
														true
													);
												} }
												help={ __(
													'Max 17 characters, lowercase letters, numbers, hyphens.',
													'jetix-store-toolkit'
												) }
												__nextHasNoMarginBottom
											/>
										</div>
										<ColorPicker
											id={ `jstk-cos-color-${ index }` }
											label={ __(
												'Color',
												'jetix-store-toolkit'
											) }
											value={ status.color || '#787c82' }
											onChange={ ( val ) =>
												updateStatus( index, 'color', val )
											}
										/>
									</div>
								</div>
							) }
						</div>
					) ) }
				</div>
			) }

			{ ( statuses.length > 0 || dirty ) && (
				<div className="jstk-settings-actions">
					<Button
						variant="primary"
						onClick={ handleSave }
						isBusy={ saving }
						disabled={ saving }
					>
						{ __( 'Save Settings', 'jetix-store-toolkit' ) }
					</Button>
				</div>
			) }
		</div>
	);
};

export default CustomOrderStatusesSettings;

