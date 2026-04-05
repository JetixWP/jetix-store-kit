/**
 * Notice — inline status message component.
 *
 * Variants: success | warning | danger
 * 'error' is accepted as a legacy alias for 'danger'.
 *
 * @package Jetix_Store_Toolkit
 */

import { CloseIcon } from '../../icons';

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
