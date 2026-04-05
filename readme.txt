=== Jetix Store Toolkit for WooCommerce - Superpowers for your WooCommerce Store ===
Contributors: jetixwp, lushkant
Tags: woocommerce, quick view, stock manager, order status, product tabs
Requires at least: 6.0
Tested up to: 6.7
Requires PHP: 7.4
Stable tag: 0.5.0
License: GPL-2.0-or-later
License URI: https://www.gnu.org/licenses/gpl-2.0.html

Jetix Store Toolkit for WooCommerce is a Modular all-in-one WooCommerce plugin — enable only the features your store needs. No bloat, no conflicts.

== Description ==

Jetix Store Toolkit for WooCommerce is a lightweight, modular toolkit that bundles the most essential WooCommerce enhancements into a single plugin. Activate only the modules you need — everything else adds zero overhead to your store.

The plugin ships with a modern admin dashboard that makes toggling and configuring WooCommerce modules quick and straightforward.

= Active Modules =

**Quick View** *(Core)*
Let customers preview full product details — gallery, price, rating, description, and Add to Cart — in a smooth lightbox modal directly from the shop or category page.

* Configurable button label, position, alignment, and size
* Filled or outline button style with custom background and text colour
* Toggle individual modal sections (gallery, price, rating, excerpt, add to cart, meta)
* Theme compatibility engine ensures correct styling across supported themes

**Custom Order Statuses** *(Core)*
Create unlimited custom WooCommerce order statuses with labels and colours. Custom statuses appear everywhere built-in statuses do: the orders list, bulk action dropdowns, and order emails.

* Add, edit, and delete custom statuses
* Assign a hex colour — displayed as a colour-coded badge in the orders table
* Rename built-in WooCommerce statuses (Processing, Completed, etc.) without code
* Fully compatible with HPOS (High-Performance Order Storage)

**Stock Manager** *(Core)*
Manage stock for every product from a single filterable admin table — no need to open each product individually.

* Inline edit stock quantity, stock status, manage stock toggle, and backorders
* Filter by stock status (In Stock, Out of Stock, On Backorder, Low Stock)
* Live search by product name or SKU
* Configurable per-page results, column visibility, and low-stock threshold

**Product Tab Manager** *(Core)*
Take full control of WooCommerce product page tabs without writing code.

* Disable the default Description, Additional Information, or Reviews tabs
* Rename any default tab title globally
* Add unlimited custom tabs with static content (rich text editor) or dynamic per-product content
* Dynamic tabs render a full WordPress editor on the product edit screen, including media uploads
* Control tab order via priority

= Why Jetix Store Toolkit? =

* **Modular** — each feature is a self-contained module; enable only what you need.
* **Lightweight** — inactive modules load no frontend code whatsoever.
* **Modern dashboard** — React-powered admin UI with per-module settings pages.
* **HPOS Compatible** — fully compatible with WooCommerce High-Performance Order Storage.
* **Theme aware** — a built-in compatibility engine handles styling differences across popular themes, with auto-detection.
* **Secure** — all data is sanitized, validated, and escaped following WordPress coding standards.
* **Developer friendly** — clean architecture, REST API, and action/filter hooks throughout.


= Roadmap =

The following modules are in active development (Upcoming) or planned for future releases (Planned).

= Upcoming Modules =

* **Checkout Field Editor** *(Core)* — Add, remove, reorder, or customise every WooCommerce checkout field without code.
* **Wishlist** *(Growth)* — Let customers save products for later and share their wishlist.
* **Product Bundles** *(Growth)* — Bundle products together at a fixed or discounted price.
* **Points & Rewards** *(Power)* — Award points for purchases, reviews, and referrals. Let customers redeem points as cart discounts.

= Planned Modules =

* **Cart Notices** *(Core)* — Show targeted messages in the cart: upsell thresholds, free shipping progress bars, and limited-time alerts.
* **Instant Product Search** *(Growth)* — Live search with product thumbnails, prices, and direct links as the user types.
* **Orders & Customers Export** *(Power)* — Export orders and customers to CSV with custom column selection and date range filters.
* **Gift Vouchers** *(Power)* — Create and sell digital gift vouchers redeemable at checkout.

Feature requests and votes are welcome via the plugin support forum or via our site - https://jetixwp.com/contact

== Installation ==

1. Upload the `jetix-store-toolkit` folder to `/wp-content/plugins/`, or install directly from the WordPress plugin directory.
2. Activate the plugin through the **Plugins** screen in WordPress.
3. Go to **Store Toolkit → Modules** and toggle on the modules you need.
4. Click **Configure** on any active module to adjust its settings.

== Frequently Asked Questions ==

= Does this plugin require WooCommerce? =

Yes. WooCommerce must be installed and active. The plugin will display an admin notice and deactivate itself if WooCommerce is not present.

= Will enabling all modules slow down my site? =

No. Only active modules register their frontend hooks and load their assets. Deactivated modules have absolutely zero runtime impact.

= Is the plugin compatible with HPOS? =

Yes. Jetix Store Toolkit declares full compatibility with WooCommerce High-Performance Order Storage (HPOS / custom order tables).

= Can I use my own theme with the Quick View module? =

Yes. If your theme is not in the supported list, set the compatibility engine to **Fallback** in Global Settings. You can submit a theme support request via the support forum.

= Where is plugin data stored? =

All settings are stored in a single WordPress option (`jwp_stk_options`). Dynamic product tab content is stored as post meta on individual products. No data is sent to external services.

== Screenshots ==

1. Modules dashboard — toggle and configure modules.
2. Product Quick View — customize button and settings.
3. Custom Order Statuses — colour-coded status list.
4. Stock Manager - admin table with inline editing.
5. Product Tab Manager — custom tabs with static and dynamic content.
6. Global Settings — theme compatibility engine selector.

== Changelog ==

= 0.5.0 =
* Added New and improved admin UI
* Added Roadmap for upcoming and planned modules
* Security fixes and enhancements
* Prepare for first public release

= 0.4.0 =
* Changes as per wp.org

= 0.3.0 =
* Changes as per wp.org

= 0.2.0 =
* Added Quick View module with lightbox modal and configurable display options.
* Added Checkout Field Editor module for billing, shipping and order fields.
* Added Custom Order Statuses module with colour-coded statuses.
* Added Stock Manager module with inline editing admin screen.
* Module autoloader and Base_Module architecture.
* REST API endpoints for per-module settings.

= 0.1.0 =
* Initial release with module manager and admin dashboard.
