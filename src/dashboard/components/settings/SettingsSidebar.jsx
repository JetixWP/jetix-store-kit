/**
 * SettingsSidebar — persistent sidebar shown alongside the settings tab panel.
 *
 * @package Jetix_Store_Toolkit
 */

const LINKS = [
	{ label: 'Website', href: 'https://developer.developer.developer' },
	{ label: 'Documentation', href: 'https://developer.developer.developer/docs' },
	{ label: 'Support', href: 'https://developer.developer.developer/support' },
];

export default function SettingsSidebar() {
	return (
		<aside className="jstk-settings-sidebar">
			<div className="jstk-settings-sidebar__widget">
				<h3 className="jstk-settings-sidebar__widget-title">
					Stay in the loop
				</h3>
				<ul className="jstk-settings-sidebar__links">
					{ LINKS.map( ( { label, href } ) => (
						<li key={ label }>
							<a href={ href } className="jstk-settings-sidebar__link" target="_blank" rel="noreferrer">
								{ label }
							</a>
						</li>
					) ) }
				</ul>
			</div>
		</aside>
	);
}
