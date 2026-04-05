/**
 * Header — sticky top bar with brand and primary navigation.
 *
 * @package Jetix_Store_Toolkit
 */

import { JetixLogo } from '../icons';

const { adminUrl } = window.jwpStkDashboard || {};

const NAV_ITEMS = [
	{ page: 'dashboard', label: 'Dashboard', slug: 'jetix-store-toolkit' },
	{ page: 'modules', label: 'Modules', slug: 'jwp-stk-modules' },
	{ page: 'settings', label: 'Global Settings', slug: 'jwp-stk-settings' },
];

export default function Header( { currentPage, navigate } ) {
	return (
		<header className="jstk-header">
			<a
				className="jstk-header__brand"
				href={ `${ adminUrl }admin.php?page=jetix-store-toolkit` }
				onClick={ ( e ) => {
					e.preventDefault();
					navigate( 'dashboard' );
				} }
			>
				<span className="jstk-header__icon" aria-hidden="true">
					<JetixLogo />
				</span>
				<span className="jstk-header__title">Store Toolkit for WooCommerce</span>
			</a>

			<nav className="jstk-nav" aria-label="Jetix Store Toolkit navigation">
				{ NAV_ITEMS.map( ( { page, label, slug } ) => (
					<a
						key={ page }
						href={ `${ adminUrl }admin.php?page=${ slug }` }
						className={
							'jstk-nav__item' +
							( currentPage === page ? ' jstk-nav__item--active' : '' )
						}
						onClick={ ( e ) => {
							e.preventDefault();
							navigate( page );
						} }
						aria-current={ currentPage === page ? 'page' : undefined }
					>
						{ label }
					</a>
				) ) }
			</nav>
		</header>
	);
}
