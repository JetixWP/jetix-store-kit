import { useState, useEffect, useCallback } from '@wordpress/element';
import {
	TextControl,
	TextareaControl,
	Button,
	Spinner,
	Notice,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';

const EMPTY_TAB = { title: '', content: '', priority: 50 };

const ProductTabManagerSettings = () => {
	const [ tabs, setTabs ] = useState( [] );
	const [ loading, setLoading ] = useState( true );
	const [ saving, setSaving ] = useState( false );
	const [ notice, setNotice ] = useState( null );
	const [ showAddForm, setShowAddForm ] = useState( false );
	const [ newTab, setNewTab ] = useState( EMPTY_TAB );
	const [ expandedIndex, setExpandedIndex ] = useState( null );
	const [ dirty, setDirty ] = useState( false );

	const fetchSettings = useCallback( async () => {
		try {
			const data = await apiFetch( {
				path: '/jwp-stk/v1/modules/product-tab-manager/settings',
			} );
			setTabs( data.settings.custom_tabs || [] );
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
				path: '/jwp-stk/v1/modules/product-tab-manager/settings',
				method: 'POST',
				data: { settings: { custom_tabs: tabs } },
			} );
			setTabs( res.settings.custom_tabs || [] );
			setDirty( false );
			setNotice( {
				status: 'success',
				message: __( 'Settings saved.', 'jetix-store-toolkit' ),
			} );
		} catch {
			setNotice( {
				status: 'error',
				message: __( 'Failed to save settings.', 'jetix-store-toolkit' ),
			} );
		} finally {
			setSaving( false );
		}
	}, [ tabs ] );

	const handleNewTabChange = ( key, value ) => {
		setNewTab( ( prev ) => ( { ...prev, [ key ]: value } ) );
	};

	const handleAddTab = () => {
		if ( ! newTab.title ) return;
		setTabs( ( prev ) => [ ...prev, { ...newTab } ] );
		setNewTab( EMPTY_TAB );
		setShowAddForm( false );
		setDirty( true );
	};

	const handleCancelAdd = () => {
		setNewTab( EMPTY_TAB );
		setShowAddForm( false );
	};

	const updateTab = ( index, key, value ) => {
		setTabs( ( prev ) => {
			const next = [ ...prev ];
			next[ index ] = { ...next[ index ], [ key ]: value };
			return next;
		} );
		setDirty( true );
	};

	const removeTab = ( index ) => {
		setTabs( ( prev ) => prev.filter( ( _, i ) => i !== index ) );
		if ( expandedIndex === index ) setExpandedIndex( null );
		setDirty( true );
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

			<div className="jstk-cos-top-actions">
				{ ! showAddForm && (
					<Button
						variant="primary"
						onClick={ () => setShowAddForm( true ) }
					>
						{ __( '+ Add New Tab', 'jetix-store-toolkit' ) }
					</Button>
				) }
			</div>

			{ showAddForm && (
				<div className="jstk-cos-add-form">
					<p className="jstk-cos-add-form__title">
						{ __( 'New Custom Tab', 'jetix-store-toolkit' ) }
					</p>
					<div className="jstk-cos-fields">
						<TextControl
							label={ __( 'Tab Title', 'jetix-store-toolkit' ) }
							value={ newTab.title }
							onChange={ ( val ) =>
								handleNewTabChange( 'title', val )
							}
							__nextHasNoMarginBottom
						/>
						<TextareaControl
							label={ __( 'Tab Content', 'jetix-store-toolkit' ) }
							value={ newTab.content }
							onChange={ ( val ) =>
								handleNewTabChange( 'content', val )
							}
							rows={ 4 }
							help={ __(
								'HTML is allowed.',
								'jetix-store-toolkit'
							) }
							__nextHasNoMarginBottom
						/>
						<TextControl
							label={ __( 'Priority', 'jetix-store-toolkit' ) }
							type="number"
							value={ newTab.priority }
							onChange={ ( val ) =>
								handleNewTabChange(
									'priority',
									parseInt( val, 10 ) || 50
								)
							}
							help={ __(
								'Lower number = appears first. Default WC tabs: Description 10, Additional Info 20, Reviews 30.',
								'jetix-store-toolkit'
							) }
							__nextHasNoMarginBottom
						/>
					</div>
					<div className="jstk-cos-add-form__actions">
						<Button
							variant="primary"
							onClick={ handleAddTab }
							disabled={ ! newTab.title }
						>
							{ __( 'Add Tab', 'jetix-store-toolkit' ) }
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

			{ tabs.length === 0 && ! showAddForm && (
				<p className="jstk-settings-description jstk-cos-empty-msg">
					{ __(
						'No custom tabs yet. Click the button above to add one.',
						'jetix-store-toolkit'
					) }
				</p>
			) }

			{ tabs.length > 0 && (
				<div className="jstk-cos-status-list">
					{ tabs.map( ( tab, index ) => (
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
									<span className="jstk-cos-accordion__label">
										{ tab.title ||
											__(
												'(untitled)',
												'jetix-store-toolkit'
											) }
									</span>
									<span className="jstk-ptm-accordion__priority">
										{ __(
											'Priority',
											'jetix-store-toolkit'
										) }
										: { tab.priority }
									</span>
								</div>
								<div className="jstk-cos-accordion__header-right">
									<Button
										isDestructive
										variant="tertiary"
										onClick={ ( e ) => {
											e.stopPropagation();
											removeTab( index );
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
										<TextControl
											label={ __(
												'Tab Title',
												'jetix-store-toolkit'
											) }
											value={ tab.title }
											onChange={ ( val ) =>
												updateTab(
													index,
													'title',
													val
												)
											}
											__nextHasNoMarginBottom
										/>
										<TextareaControl
											label={ __(
												'Tab Content',
												'jetix-store-toolkit'
											) }
											value={ tab.content }
											onChange={ ( val ) =>
												updateTab(
													index,
													'content',
													val
												)
											}
											rows={ 4 }
											help={ __(
												'HTML is allowed.',
												'jetix-store-toolkit'
											) }
											__nextHasNoMarginBottom
										/>
										<TextControl
											label={ __(
												'Priority',
												'jetix-store-toolkit'
											) }
											type="number"
											value={ tab.priority }
											onChange={ ( val ) =>
												updateTab(
													index,
													'priority',
													parseInt( val, 10 ) || 50
												)
											}
											help={ __(
												'Lower number = appears first. Default WC tabs: Description 10, Additional Info 20, Reviews 30.',
												'jetix-store-toolkit'
											) }
											__nextHasNoMarginBottom
										/>
									</div>
								</div>
							) }
						</div>
					) ) }
				</div>
			) }

			{ ( tabs.length > 0 || dirty ) && (
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

export default ProductTabManagerSettings;
