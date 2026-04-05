const ColorPicker = ( { id, label, value, onChange } ) => {
	return (
		<div className="jstk-color-picker">
			{ label && (
				<label className="jstk-color-picker__label" htmlFor={ id }>
					{ label }
				</label>
			) }
			<div className="jstk-color-picker__swatch">
				<span
					className="jstk-color-picker__preview"
					style={ { background: value } }
					aria-hidden="true"
				/>
				<input
					type="color"
					id={ id }
					className="jstk-color-picker__input"
					value={ value }
					onChange={ ( e ) => onChange && onChange( e.target.value ) }
				/>
			</div>
		</div>
	);
};

export default ColorPicker;
