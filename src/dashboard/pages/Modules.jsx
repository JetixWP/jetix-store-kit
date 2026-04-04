/**
 * Modules page — lists all available modules in a grid with
 * toggle and configure actions.
 *
 * @package Jetix_Store_Toolkit
 */

import { useState, useEffect, useCallback } from '@wordpress/element';
import apiFetch from '@wordpress/api-fetch';
import { Notice } from '../components/ui';
import { ModulesGrid } from '../components/modules';

export default function Modules( { onOpenModuleSettings } ) {
	const [ modules, setModules ] = useState( [] );
	const [ loading, setLoading ] = useState( true );
	const [ notice, setNotice ] = useState( null );
	const [ toggling, setToggling ] = useState( {} );

	const fetchModules = useCallback( async () => {
		setLoading( true );
		try {
			const data = await apiFetch( { path: '/jwp-stk/v1/modules' } );
			setModules( data );
		} catch ( err ) {
			setNotice( {
				type: 'error',
				message: err?.message || 'Failed to load modules.',
			} );
		} finally {
			setLoading( false );
		}
	}, [] );

	useEffect( () => {
		fetchModules();
	}, [ fetchModules ] );

	async function handleToggle( slug, active ) {
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
				type: 'error',
				message: err?.message || 'Failed to update module.',
			} );
		} finally {
			setToggling( ( prev ) => ( { ...prev, [ slug ]: false } ) );
		}
	}

	return (
		<div className="jstk-page">
			<div className="jstk-page__header">
				<div className="jstk-page__header-text">
					<h1 className="jstk-page__title">Modules</h1>
					<p className="jstk-page__desc">
						Enable or disable individual WooCommerce features. Each module is independent — activate only what your store needs.
					</p>
				</div>
			</div>

			{ notice && (
				<Notice
					type={ notice.type }
					isDismissible
					onDismiss={ () => setNotice( null ) }
				>
					{ notice.message }
				</Notice>
			) }

			<ModulesGrid
				modules={ modules }
				loading={ loading }
				toggling={ toggling }
				onToggle={ handleToggle }
				onConfigure={ onOpenModuleSettings }
			/>
		</div>
	);
}
