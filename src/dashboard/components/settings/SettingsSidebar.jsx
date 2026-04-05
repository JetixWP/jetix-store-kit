/**
 * SettingsSidebar — persistent sidebar shown alongside the settings tab panel.
 *
 * @package Jetix_Store_Toolkit
 */

const LINKS = [
	{ label: 'Website', href: 'https://jetixwp.com' },
	{ label: 'Feature Request', href: 'https://jetixwp.com/contact' },
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

			<div className="jstk-settings-sidebar__widget jstk-settings-sidebar__widget--feedback">
				<h3 className="jstk-settings-sidebar__widget-title">
					{ '👋' } Thank you for using our plugin!
				</h3>
				<p className="jstk-settings-sidebar__widget-text">
					We are currently looking for user feedback to improve it further for most use cases. If you have something to suggest, please feel free to drop your request at{ ' ' }
					<a href="mailto:hello@jetixwp.com">hello@jetixwp.com</a>.
				</p>
				<p className="jstk-settings-sidebar__widget-text">
					If you like this plugin, you will absolutely love our other plugins. Check them out here:
				</p>
				<a
					href="https://jetixwp.com/plugins"
					className="jstk-settings-sidebar__plugin-btn"
					target="_blank"
					rel="noreferrer"
				>
					View All Plugins
				</a>
				<p className="jstk-settings-sidebar__widget-note">
					<em>Thank you for using our Free Shipping addon for WooCommerce again, you are not just any supporter but truly the founders of our small but mighty product agency.</em>
					<br /><br />
					<strong>Krishna Kant Chourasiya</strong><br /><em>Founder and Lead Developer at JetixWP</em>
				</p>
			</div>
		</aside>
	);
}
