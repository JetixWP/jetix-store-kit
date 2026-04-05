/**
 * Checkbox — custom accessible checkbox with label and optional help text.
 *
 * @package Jetix_Store_Toolkit
 */

function CheckIcon() {
	return (
		<svg width="12" height="9" viewBox="0 0 12 9" fill="none" aria-hidden="true" xmlns="http://www.w3.org/2000/svg">
			<path d="M9.9 0L3.78 6.12L1.26 3.6L0 4.86L3.78 8.64L11.16 1.26" fill="#008710" />
		</svg>
	);
}

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
