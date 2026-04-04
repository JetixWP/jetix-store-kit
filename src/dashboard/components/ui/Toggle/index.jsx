/**
 * Toggle — iOS-style switch with label and optional help text.
 *
 * @package Jetix_Store_Toolkit
 */

export default function Toggle( {
	id,
	label,
	help,
	checked,
	onChange,
	disabled = false,
} ) {
	const inputId = id || `jstk-toggle-${ String( label ).replace( /\s+/g, '-' ).toLowerCase() }`;

	return (
		<label
			className={ `jstk-toggle${ disabled ? ' jstk-toggle--disabled' : '' }` }
			htmlFor={ inputId }
		>
			<span className="jstk-toggle__track" aria-hidden="true">
				<input
					type="checkbox"
					id={ inputId }
					className="jstk-toggle__input"
					checked={ !! checked }
					onChange={ ( e ) => onChange && onChange( e.target.checked ) }
					disabled={ disabled }
				/>
				<span className="jstk-toggle__thumb" />
			</span>
			<span className="jstk-toggle__text">
				<span className="jstk-toggle__label">{ label }</span>
				{ help && (
					<span className="jstk-toggle__help">{ help }</span>
				) }
			</span>
		</label>
	);
}
