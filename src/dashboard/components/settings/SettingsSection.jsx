/**
 * SettingsSection — a labelled group of settings controls.
 *
 * @package Jetix_Store_Toolkit
 */

export default function SettingsSection( { title, description, headerExtra, children } ) {
	return (
		<div className="jstk-settings-section">
			{ ( title || description ) && (
				<div className="jstk-settings-section__header">
					{ title && (
						<div className="jstk-settings-section__title-row">
							<h3 className="jstk-settings-section__title">{ title }</h3>
							{ headerExtra }
						</div>
					) }
					{ description && (
						<>
							{ ( Array.isArray( description ) ? description : [ description ] ).map(
								( line, i ) => (
									<p key={ i } className="jstk-settings-section__description">{ line }</p>
								)
							) }
						</>
					) }
				</div>
			) }
			{ children && (
				<div className="jstk-settings-section__body">
					{ children }
				</div>
			) }
		</div>
	);
}
