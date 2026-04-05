/**
 * Button — custom UI component.
 *
 * Variants: primary, secondary, tertiary, destructive
 *
 * @package Jetix_Store_Toolkit
 */

export default function Button( {
	variant = 'primary',
	type = 'button',
	disabled = false,
	isBusy = false,
	onClick,
	className = '',
	icon,
	children,
	...rest
} ) {
	const classes = [
		'jstk-btn',
		`jstk-btn--${ variant }`,
		isBusy ? 'jstk-btn--busy' : '',
		className,
	]
		.filter( Boolean )
		.join( ' ' );

	return (
		<button
			type={ type }
			className={ classes }
			disabled={ disabled || isBusy }
			onClick={ onClick }
			aria-busy={ isBusy || undefined }
			{ ...rest }
		>
			{ isBusy && (
				<span className="jstk-btn__spinner" aria-hidden="true" />
			) }
			{ icon && (
				<span className="jstk-btn__icon" aria-hidden="true">{ icon }</span>
			) }
			<span className="jstk-btn__label">{ children }</span>
		</button>
	);
}
