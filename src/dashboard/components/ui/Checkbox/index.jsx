/**
 * Checkbox — custom accessible checkbox with label and optional help text.
 *
 * @package Jetix_Store_Toolkit
 */

import { CheckIcon } from '../../icons';

export default function Checkbox( {
	id,
	label,
	help,
	checked,
	onChange,
	disabled = false,
} ) {
	const inputId = id || `jstk-cb-${ String( label ).replace( /\s+/g, '-' ).toLowerCase() }`;

	return (
		<label
			className={ `jstk-checkbox${ disabled ? ' jstk-checkbox--disabled' : '' }` }
			htmlFor={ inputId }
		>
			<span className="jstk-checkbox__control">
				<input
					type="checkbox"
					id={ inputId }
					className="jstk-checkbox__input"
					checked={ !! checked }
					onChange={ ( e ) => onChange && onChange( e.target.checked ) }
					disabled={ disabled }
				/>
				<span className="jstk-checkbox__indicator">
					<CheckIcon />
				</span>
			</span>
			<span className="jstk-checkbox__text">
				<span className="jstk-checkbox__label">{ label }</span>
				{ help && (
					<span className="jstk-checkbox__help">{ help }</span>
				) }
			</span>
		</label>
	);
}
