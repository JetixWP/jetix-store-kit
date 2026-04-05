[![License](https://img.shields.io/badge/license-GPL--2.0%2B-red.svg)](https://github.com/jetixWP/jetix-store-toolkit/blob/main/license.txt)

# Jetix Store Toolkit for WooCommerce

Modular all-in-one WooCommerce toolkit — enable only the features your store needs. No bloat, no conflicts.

## 📋 Table of Contents

1. [Overview](#overview)
2. [Modules](#modules)
3. [Installation](#installation)

---

## Overview

**Jetix Store Toolkit for WooCommerce** is a lightweight, modular plugin that bundles the most essential WooCommerce enhancements into a single install. Activate only what your store needs — inactive modules add zero overhead.

- ✅ **Product Quick View** — Product lightbox modal on shop/category pages
- ✅ **Custom Order Statuses** — Unlimited colour-coded custom statuses with HPOS support
- ✅ **Stock Manager** — Inline stock editing for all products from one screen
- ✅ **Product Tab Manager** — Control WooCommerce product tabs without code
- ✅ **Modular** — Each feature is independently toggleable
- ✅ **Lightweight** — Inactive modules load zero frontend assets
- ✅ **HPOS Compatible** — Full High-Performance Order Storage support
- ✅ **Modern Dashboard** — React-powered admin UI with per-module settings

### System Requirements

- WordPress 6.0 or higher
- PHP 7.4 or higher
- WooCommerce 10.0 or higher

---

## Modules

### Product Quick View *(Core)*

Let customers preview full product details — gallery, price, rating, description, and Add to Cart — in a smooth lightbox modal directly from the shop or category page.

**Features:**
- Configurable button label, position, alignment, and size
- Filled or outline button style with custom background and text colour
- Toggle individual modal sections (gallery, price, rating, excerpt, add to cart, meta)
- Theme compatibility engine with auto-detection and manual override

---

### Custom Order Statuses *(Core)*

Create unlimited custom WooCommerce order statuses with labels and colours. Custom statuses appear everywhere built-in statuses do: the orders list, bulk action dropdowns, and order emails.

**Features:**
- Add, edit, and delete custom statuses
- Assign a hex colour — displayed as a colour-coded badge in the orders table
- Rename built-in WooCommerce statuses (Processing, Completed, etc.) without code
- Fully compatible with HPOS (High-Performance Order Storage)

---

### Stock Manager *(Core)*

Manage stock for every product from a single filterable admin table — no need to open each product individually.

**Features:**
- Inline edit stock quantity, stock status, manage stock toggle, and backorders
- Filter by stock status (In Stock, Out of Stock, On Backorder, Low Stock)
- Live search by product name or SKU
- Configurable per-page results, column visibility, and low-stock threshold

---

### Product Tab Manager *(Core)*

Take full control of WooCommerce product page tabs without writing code.

**Features:**
- Disable the default Description, Additional Information, or Reviews tabs
- Rename any default tab title globally
- Add unlimited custom tabs with static content (rich text editor) or dynamic per-product content
- Dynamic tabs render a full WordPress editor on the product edit screen, including media uploads
- Control tab order via priority

---

## Installation

### Method 1: Via WordPress Plugin Directory

1. Log in to your WordPress dashboard
2. Navigate to **Plugins > Add New**
3. Search for "Jetix Store Toolkit"
4. Click **Install Now**, then **Activate**
5. A new **Store Toolkit** menu item will appear in the sidebar

### Method 2: Manual Installation

1. Download the plugin zip from [WordPress.org](https://wordpress.org/plugins/jetix-store-toolkit)
2. Go to **Plugins > Add New > Upload Plugin** in your WordPress admin
3. Upload the zip and click **Install Now**
4. Click **Activate Plugin**

### Method 3: Composer

```bash
composer require jetixwp/jetix-store-toolkit
```

### Verification

After activation:
- A **Store Toolkit** menu item appears in the WordPress sidebar
- Navigating to **Store Toolkit → Modules** shows all available modules
- Each module has an on/off toggle and a **Configure** button

---

### Debug Mode

Add the following to `wp-config.php` to enable debug mode:

```php
define( 'JWP_STK_DEBUG', true );
```

In debug mode, assets are versioned by file modification time instead of the plugin version constant, bypassing browser and server caches during development.

---

## Support

- **Documentation:** See this file and the in-plugin settings pages
- **Issues:** [GitHub Issues](https://github.com/jetixWP/jetix-store-toolkit/issues)
- **Support Forum:** [WordPress.org](https://wordpress.org/support/plugin/jetix-store-toolkit/)
- **Contact:** [jetixwp.com/contact](https://jetixwp.com/contact)
