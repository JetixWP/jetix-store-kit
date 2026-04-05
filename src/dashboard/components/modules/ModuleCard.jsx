/**
 * Individual module card with toggle + configure button.
 *
 * @package Jetix_Store_Toolkit
 */

import { Button, Toggle } from '../ui';

export default function ModuleCard( { module, toggling, onToggle, onConfigure } ) {
	return (
		<article className={ `jstk-module-card${ module.active ? ' is-active' : '' }` }>
			<div className="jstk-module-card__body">
				<h3 className="jstk-module-card__name" title={ module.title }>
					{ module.title }
				</h3>
				<p className="jstk-module-card__meta">
					{ module.description }
				</p>
			</div>

			<footer className="jstk-module-card__footer">
				<Toggle
					id={ `module-toggle-${ module.slug }` }
					checked={ module.active }
					onChange={ onToggle }
					disabled={ toggling }
				/>
				<Button
					variant="secondary"
					onClick={ onConfigure }
					style={ { visibility: module.active ? 'visible' : 'hidden' } }
					tabIndex={ module.active ? undefined : -1 }
				>
					Open
				</Button>
			</footer>
		</article>
	);
}
