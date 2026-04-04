=== Store Toolkit for WooCommerce by Jetix - All in one WooCommerce Plugin ===
Contributors: jetixwp, lushkant
Tags: woocommerce, quick view, checkout fields, order status, stock manager
Requires at least: 6.0
Tested up to: 7.0
Requires PHP: 7.4
Stable tag: 0.5.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Modular all-in-one WooCommerce toolkit — enable only the features your store needs. No bloat, no conflicts.

== Description ==

Jetix Store Toolkit for WooCommerce is a lightweight, modular toolkit that bundles the most essential WooCommerce enhancements into a single plugin. Activate only the modules you need — no bloat, no conflicts.

= Core Modules =

* **Quick View** — Let customers preview products in a lightbox modal directly from the shop page without leaving the archive.
* **Custom Order Statuses** — Create custom order statuses with labels and colours that appear in admin and order emails.
* **Stock Manager** — Manage stock quantities, statuses and backorder settings for all products from a single admin screen.
* **Product Tab Manager** — Disable, rename or reorder default WooCommerce product tabs, and add unlimited custom tabs with your own content.

= Why Jetix Store Toolkit for WooCommerce? =

* **Modular** — Each feature is a self-contained module you can toggle on or off.
* **Lightweight** — Only active modules load on the front end, keeping your store fast.
* **HPOS Compatible** — Fully compatible with WooCommerce High-Performance Order Storage.
* **Developer Friendly** — Clean code, hooks, and extensible architecture.

= Source Code =

The full source code, including build tools, is publicly available on GitHub: https://github.com/jetixWP/jetix-store-toolkit

== Installation ==

1. Upload the `jetix-store-toolkit` folder to the `/wp-content/plugins/` directory, or install directly from the WordPress plugin screen.
2. Activate the plugin through the **Plugins** menu in WordPress.
3. Navigate to **Jetix Store Toolkit for WooCommerce → Modules** and enable the modules you need.
4. Click **Configure** on any active module to adjust its settings.

== Frequently Asked Questions ==

= Does this plugin require WooCommerce? =

Yes. WooCommerce 7.0 or later must be installed and active.

= Will enabling all modules slow down my site? =

No. Only active modules load their assets. Inactive modules add zero overhead.

= Is the plugin compatible with HPOS? =

Yes. Jetix Store Toolkit for WooCommerce declares full compatibility with WooCommerce High-Performance Order Storage.

== Screenshots ==

1. Modules dashboard — toggle modules on and off.
2. Quick View lightbox on the shop page.
3. Stock Manager admin screen.

== Changelog ==

= 0.4.0 =
* Changes as per wp.org

= 0.3.0 =
* Changes as per wp.org

= 0.2.0 =
* Added Quick View module with lightbox modal and configurable display options.
* Added Checkout Field Editor module for billing, shipping and order fields.
* Added Custom Order Statuses module with colour-coded statuses.
* Added Stock Manager module with inline editing admin screen.
* Added Product Tab Manager module for default and custom product tabs.
* Per-module settings pages in the React dashboard.
* Module autoloader and Base_Module architecture.
* REST API endpoints for per-module settings.

= 0.1.0 =
* Initial release with module manager and admin dashboard.