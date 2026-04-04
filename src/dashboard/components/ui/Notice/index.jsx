/**
 * Notice — inline status message component.
 *
 * Variants: success | warning | danger
 * 'error' is accepted as a legacy alias for 'danger'.
 *
 * @package Jetix_Store_Toolkit
 */

function CloseIcon() {
	return (
		<svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
			<path d="M1 1L11 11M11 1L1 11" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
		</svg>
	);
}

export default function Notice( { type = 'success', isDismissible = false, onDismiss, children } ) {
	const variant = type === 'error' ? 'danger' : ( type || 'success' );

	return (
		<div className={ `jstk-notice jstk-notice--${ variant }` } role="alert">
			<div className="jstk-notice__content">{ children }</div>
			{ isDismissible && onDismiss && (
				<button
					type="button"
					className="jstk-notice__dismiss"
					onClick={ onDismiss }
					aria-label="Dismiss notice"
				>
					<CloseIcon />
				</button>
			) }
		</div>
	);
}
