/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/dashboard/App.js"
/*!******************************!*\
  !*** ./src/dashboard/App.js ***!
  \******************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ App)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _components_ui__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./components/ui */ "./src/dashboard/components/ui/index.js");
/* harmony import */ var _components_Header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/Header */ "./src/dashboard/components/Header.jsx");
/* harmony import */ var _pages_Dashboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/Dashboard */ "./src/dashboard/pages/Dashboard.jsx");
/* harmony import */ var _pages_Modules__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/Modules */ "./src/dashboard/pages/Modules.jsx");
/* harmony import */ var _components_ModuleSettingsPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/ModuleSettingsPage */ "./src/dashboard/components/ModuleSettingsPage.js");
/* harmony import */ var _pages_Settings__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./pages/Settings */ "./src/dashboard/pages/Settings.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__);








const {
  currentPage: initialPage
} = window.jwpStkDashboard || {};
function App() {
  const [currentPage, setCurrentPage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(initialPage || 'dashboard');
  const [footerState, setFooterState] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [activeModule, setActiveModule] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  function navigate(page) {
    setCurrentPage(page);
    setActiveModule(null);
    const slugMap = {
      dashboard: 'jetix-store-toolkit',
      modules: 'jwp-stk-modules',
      settings: 'jwp-stk-settings'
    };
    const targetSlug = slugMap[page] || 'jetix-store-toolkit';
    const url = new URL(window.location.href);
    url.searchParams.set('page', targetSlug);
    window.history.pushState({}, '', url.toString());
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
    className: "jstk-app",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_Header__WEBPACK_IMPORTED_MODULE_2__["default"], {
      currentPage: currentPage,
      navigate: navigate
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("main", {
      className: "jstk-content",
      children: [currentPage === 'dashboard' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_pages_Dashboard__WEBPACK_IMPORTED_MODULE_3__["default"], {
        navigate: navigate
      }), currentPage === 'modules' && !activeModule && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_pages_Modules__WEBPACK_IMPORTED_MODULE_4__["default"], {
        onOpenModuleSettings: setActiveModule
      }), currentPage === 'modules' && activeModule && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_ModuleSettingsPage__WEBPACK_IMPORTED_MODULE_5__["default"], {
        moduleSlug: activeModule,
        onBack: () => setActiveModule(null)
      }), currentPage === 'settings' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_pages_Settings__WEBPACK_IMPORTED_MODULE_6__["default"], {
        onFooterState: setFooterState
      })]
    }), currentPage === 'settings' && footerState && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("div", {
      className: "jstk-settings-footer",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
        variant: "primary",
        onClick: footerState?.handleSave,
        isBusy: footerState?.saving,
        disabled: !footerState?.dirty || footerState?.saving,
        children: footerState?.saving ? 'Saving…' : 'Save Changes'
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_ui__WEBPACK_IMPORTED_MODULE_1__.Button, {
        variant: "tertiary",
        onClick: footerState?.handleDiscard,
        disabled: !footerState?.dirty || footerState?.saving,
        children: "Discard"
      })]
    })]
  });
}

/***/ },

/***/ "./src/dashboard/components/Header.jsx"
/*!*********************************************!*\
  !*** ./src/dashboard/components/Header.jsx ***!
  \*********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Header)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Header — sticky top bar with brand and primary navigation.
 *
 * @package Jetix_Store_Toolkit
 */

const {
  adminUrl
} = window.jwpStkDashboard || {};
const NAV_ITEMS = [{
  page: 'dashboard',
  label: 'Dashboard',
  slug: 'jetix-store-toolkit'
}, {
  page: 'modules',
  label: 'Modules',
  slug: 'jwp-stk-modules'
}, {
  page: 'settings',
  label: 'Global Settings',
  slug: 'jwp-stk-settings'
}];
function Header({
  currentPage,
  navigate
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("header", {
    className: "jstk-header",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("a", {
      className: "jstk-header__brand",
      href: `${adminUrl}admin.php?page=jetix-store-toolkit`,
      onClick: e => {
        e.preventDefault();
        navigate('dashboard');
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "jstk-header__icon",
        "aria-hidden": "true",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("svg", {
          width: "32",
          height: "33",
          viewBox: "0 0 58 59",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            d: "M3.72103 35.1998H12.5893L10.5162 33.064C10.291 32.833 10.2254 32.4908 10.348 32.1914L16.0454 18.2764H5.74875L0 32.3173L2.12442 34.5073C2.54645 34.9407 3.11394 35.1888 3.7213 35.2003L3.72103 35.1998Z",
            fill: "#252422"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            d: "M51.6753 18.2753H17.7991L12.0503 32.3163L14.1747 34.5063C15.0473 35.4045 16.5986 35.4045 17.4683 34.5063L17.7364 34.2297C18.4806 33.4626 19.4787 33.0406 20.5452 33.0406C21.6116 33.0406 22.6097 33.4626 23.3568 34.2297L23.6249 34.5063C24.4975 35.4045 26.0458 35.4045 26.9184 34.5063L27.1893 34.2297C27.9336 33.4626 28.9317 33.0406 30.001 33.0406C31.0675 33.0406 32.0656 33.4626 32.8127 34.2297L33.0835 34.5091C33.9561 35.4074 35.5045 35.4074 36.3743 34.5091L36.648 34.2297C37.3923 33.4655 38.3903 33.0434 39.4568 33.0434C39.8104 33.0434 40.1498 33.1061 40.4805 33.1946C40.5147 33.206 40.549 33.2117 40.5803 33.2259C41.2134 33.4141 41.7951 33.7449 42.2684 34.2325L42.5393 34.512C42.9756 34.9597 43.5602 35.2078 44.1847 35.2078C44.8092 35.2078 45.3938 34.9597 45.8301 34.512L46.1038 34.2297C46.848 33.4655 47.8461 33.0434 48.9126 33.0406C49.9791 33.0406 50.9772 33.4626 51.7214 34.2268L52.0009 34.512C52.8735 35.4102 54.419 35.4102 55.2916 34.512L57.4274 32.3163L51.6753 18.2753Z",
            fill: "#252422"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            d: "M27.7824 42.6677C27.7824 43.027 27.2406 43.027 27.2406 42.6677C27.2406 42.3055 27.7824 42.3055 27.7824 42.6677Z",
            fill: "#252422"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            d: "M28.145 44.4415C27.9454 44.5128 27.7344 44.5584 27.512 44.5584C27.2896 44.5584 27.0785 44.5128 26.8789 44.4415L25.5786 46.0726H29.4453L28.145 44.4415Z",
            fill: "#252422"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            d: "M23.0831 47.6949H31.9374V50.3982H23.0831V47.6949Z",
            fill: "#008710"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            d: "M52.9395 36.7559C52.1439 36.6133 51.411 36.234 50.835 35.6381L50.5555 35.3529C50.1192 34.9052 49.5347 34.6571 48.9102 34.6571C48.2857 34.6571 47.7011 34.9052 47.2648 35.3529L46.9911 35.6352C46.2468 36.4023 45.2487 36.8243 44.1794 36.8243C43.1129 36.8243 42.1148 36.4023 41.3706 35.6352L41.0997 35.3558C41.0826 35.3387 41.0655 35.3272 41.0484 35.313V56.9989H39.4258V34.6651C38.8099 34.6737 38.2367 34.9161 37.8061 35.3581L37.5324 35.6375C36.7882 36.4017 35.7901 36.8238 34.7236 36.8238C33.6571 36.8238 32.659 36.4017 31.9119 35.6347L31.641 35.3552C30.7685 34.4569 29.2201 34.4569 28.3475 35.3552L28.0766 35.6318C27.3323 36.3989 26.3342 36.8209 25.2649 36.8209C24.1984 36.8209 23.2004 36.3989 22.4533 35.6318L22.1852 35.3552C21.3126 34.4569 19.7642 34.4569 18.8916 35.3552L18.6236 35.6318C18.0761 36.1964 17.3889 36.57 16.6389 36.7297V56.9987H15.0164L15.0278 36.8209H4.51455V57.0018H1.38924V58.63H54.7851V57.0018H52.943L52.9395 36.7559ZM33.5628 51.2075C33.5628 51.6551 33.2007 52.0173 32.753 52.0173H22.2739C21.8262 52.0173 21.464 51.6551 21.464 51.2075V46.8817C21.464 46.434 21.8262 46.0718 22.2739 46.0718H23.5057L25.7328 43.2801C25.6643 43.0862 25.6216 42.8809 25.6216 42.6671C25.6216 41.6234 26.4714 40.7736 27.515 40.7736C28.5587 40.7736 29.4084 41.6234 29.4084 42.6671C29.4084 42.8838 29.3657 43.0862 29.2972 43.2801L31.5214 46.0718H32.7533C33.201 46.0718 33.5631 46.434 33.5631 46.8817L33.5628 51.2075ZM45.2544 47.1639C45.2544 47.6116 44.8922 47.9737 44.4446 47.9737C43.9969 47.9737 43.6348 47.6116 43.6348 47.1639V45.125H43.3268C42.8791 45.125 42.517 44.7629 42.517 44.3152C42.517 43.8676 42.8791 43.5054 43.3268 43.5054H44.4446C44.8923 43.5054 45.2544 43.8676 45.2544 44.3152L45.2544 47.1639Z",
            fill: "#252422"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            d: "M8.92532 9.29568C8.65728 9.29568 8.40919 9.42684 8.25804 9.64642C8.10689 9.86599 8.07269 10.1454 8.16679 10.3964C9.29318 13.3478 12.1704 15.3324 15.3214 15.3324C18.3041 15.3324 21.0274 13.5645 22.2704 10.8811V17.7736H23.8929V10.8702H35.9008V17.7736H37.5234V10.8702H38.3076C39.548 13.5592 42.2741 15.33 45.2627 15.33C48.4165 15.33 51.2909 13.3453 52.4173 10.3939C52.5114 10.1459 52.4772 9.86354 52.326 9.64398C52.1749 9.42442 51.9239 9.29324 51.6587 9.29324H46.4404V6.03677H51.6587C51.9268 6.03677 52.1749 5.9056 52.326 5.68603C52.4772 5.46646 52.5114 5.18701 52.4173 4.93608C51.2909 1.98469 48.4137 0 45.2627 0C42.2742 0 39.5481 1.7708 38.3076 4.45981L22.2792 4.46552C21.0388 1.7765 18.3127 0.00570313 15.3241 0.00570313C12.1703 0.00570313 9.29592 1.99039 8.16953 4.94178C8.07542 5.18987 8.10964 5.47218 8.26078 5.69173C8.41191 5.91129 8.66285 6.04248 8.92806 6.04248H14.1464V9.29894L8.92532 9.29568Z",
            fill: "#008710"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
            x: "1.21197",
            y: "56.8165",
            width: "54",
            height: "2",
            fill: "#008710"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
            x: "35.912",
            y: "10.8165",
            width: "1.6",
            height: "7",
            fill: "#252422"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("rect", {
            x: "22.2674",
            y: "10.8566",
            width: "1.7",
            height: "7",
            fill: "#252422"
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "jstk-header__title",
        children: "Store Toolkit for Woo"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("nav", {
      className: "jstk-nav",
      "aria-label": "Jetix Store Toolkit navigation",
      children: NAV_ITEMS.map(({
        page,
        label,
        slug
      }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
        href: `${adminUrl}admin.php?page=${slug}`,
        className: 'jstk-nav__item' + (currentPage === page ? ' jstk-nav__item--active' : ''),
        onClick: e => {
          e.preventDefault();
          navigate(page);
        },
        "aria-current": currentPage === page ? 'page' : undefined,
        children: label
      }, page))
    })]
  });
}

/***/ },

/***/ "./src/dashboard/components/ModuleSettingsPage.js"
/*!********************************************************!*\
  !*** ./src/dashboard/components/ModuleSettingsPage.js ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./ui */ "./src/dashboard/components/ui/index.js");
/* harmony import */ var _module_views_StockManagerTable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./module-views/StockManagerTable */ "./src/dashboard/components/module-views/StockManagerTable.jsx");
/* harmony import */ var _changelogs_stock_manager_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../changelogs/stock-manager.json */ "./src/dashboard/changelogs/stock-manager.json");
/* harmony import */ var _changelogs_custom_order_statuses_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../changelogs/custom-order-statuses.json */ "./src/dashboard/changelogs/custom-order-statuses.json");
/* harmony import */ var _changelogs_quick_view_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../changelogs/quick-view.json */ "./src/dashboard/changelogs/quick-view.json");
/* harmony import */ var _changelogs_product_tab_manager_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../changelogs/product-tab-manager.json */ "./src/dashboard/changelogs/product-tab-manager.json");
/* harmony import */ var _module_settings_QuickViewSettings__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./module-settings/QuickViewSettings */ "./src/dashboard/components/module-settings/QuickViewSettings.js");
/* harmony import */ var _module_settings_CustomOrderStatusesSettings__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./module-settings/CustomOrderStatusesSettings */ "./src/dashboard/components/module-settings/CustomOrderStatusesSettings.js");
/* harmony import */ var _module_settings_StockManagerSettings__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./module-settings/StockManagerSettings */ "./src/dashboard/components/module-settings/StockManagerSettings.js");
/* harmony import */ var _module_settings_ProductTabManagerSettings__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./module-settings/ProductTabManagerSettings */ "./src/dashboard/components/module-settings/ProductTabManagerSettings.js");
/* harmony import */ var _module_settings_ProductTabManagerDefaultTabs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./module-settings/ProductTabManagerDefaultTabs */ "./src/dashboard/components/module-settings/ProductTabManagerDefaultTabs.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__);






// Operational views.


// Module changelogs.





// Settings components.






/**
 * Per-module tab definition.
 *
 * Each entry produces one or more TabPanel tabs.
 * operationalTabs appear first (left); if SettingsComponent is set, a
 * "Settings" tab is appended. All tabs are left-aligned inside the card.
 */

const MODULE_VIEWS = {
  'stock-manager': {
    changelog: _changelogs_stock_manager_json__WEBPACK_IMPORTED_MODULE_6__,
    operationalTabs: [{
      name: 'stock',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Stock Manager', 'jetix-store-toolkit'),
      Component: _module_views_StockManagerTable__WEBPACK_IMPORTED_MODULE_5__["default"]
    }],
    SettingsComponent: _module_settings_StockManagerSettings__WEBPACK_IMPORTED_MODULE_12__["default"]
  },
  'custom-order-statuses': {
    changelog: _changelogs_custom_order_statuses_json__WEBPACK_IMPORTED_MODULE_7__,
    operationalTabs: [{
      name: 'statuses',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Order Statuses', 'jetix-store-toolkit'),
      Component: _module_settings_CustomOrderStatusesSettings__WEBPACK_IMPORTED_MODULE_11__["default"]
    }],
    SettingsComponent: null
  },
  'quick-view': {
    changelog: _changelogs_quick_view_json__WEBPACK_IMPORTED_MODULE_8__,
    operationalTabs: [],
    SettingsComponent: _module_settings_QuickViewSettings__WEBPACK_IMPORTED_MODULE_10__["default"]
  },
  'product-tab-manager': {
    changelog: _changelogs_product_tab_manager_json__WEBPACK_IMPORTED_MODULE_9__,
    operationalTabs: [{
      name: 'custom-tabs',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Custom Tabs', 'jetix-store-toolkit'),
      Component: _module_settings_ProductTabManagerSettings__WEBPACK_IMPORTED_MODULE_13__["default"]
    }, {
      name: 'default-tabs',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default Tabs', 'jetix-store-toolkit'),
      Component: _module_settings_ProductTabManagerDefaultTabs__WEBPACK_IMPORTED_MODULE_14__["default"]
    }],
    SettingsComponent: null
  }
};

/** Map of tab name → Component for quick lookup inside TabPanel callback. */
function buildTabMap(operationalTabs, SettingsComponent) {
  const map = {};
  operationalTabs.forEach(t => {
    map[t.name] = t.Component;
  });
  if (SettingsComponent) {
    map.settings = SettingsComponent;
  }
  return map;
}

/** Build the `tabs` array expected by WP TabPanel. */
function buildTabs(operationalTabs, SettingsComponent) {
  const tabs = operationalTabs.map(t => ({
    name: t.name,
    title: t.title,
    className: 'jstk-settings-tab'
  }));
  if (SettingsComponent) {
    tabs.push({
      name: 'settings',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Settings', 'jetix-store-toolkit'),
      className: 'jstk-settings-tab'
    });
  }
  return tabs;
}
const ModuleSettingsPage = ({
  moduleSlug,
  onBack
}) => {
  const [module, setModule] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [toggling, setToggling] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const {
    operationalTabs = [],
    SettingsComponent = null,
    changelog = []
  } = MODULE_VIEWS[moduleSlug] || {};
  const tabs = buildTabs(operationalTabs, SettingsComponent);
  const tabMap = buildTabMap(operationalTabs, SettingsComponent);
  const latestChangelog = changelog[0] || null;
  const fetchModule = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    try {
      const modules = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/jwp-stk/v1/modules'
      });
      const found = modules.find(m => m.slug === moduleSlug);
      setModule(found || null);
    } catch {
      setNotice({
        status: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to load module.', 'jetix-store-toolkit')
      });
    } finally {
      setLoading(false);
    }
  }, [moduleSlug]);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    fetchModule();
  }, [fetchModule]);
  const handleToggle = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async active => {
    setToggling(true);
    setNotice(null);
    try {
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/jwp-stk/v1/modules/toggle',
        method: 'POST',
        data: {
          module: moduleSlug,
          active
        }
      });
      setModule(prev => ({
        ...prev,
        active
      }));
    } catch {
      setNotice({
        status: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to update module.', 'jetix-store-toolkit')
      });
    } finally {
      setToggling(false);
    }
  }, [moduleSlug]);
  if (loading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
      className: "jstk-loading",
      style: {
        justifyContent: 'center',
        minHeight: '200px'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {})
    });
  }
  if (!module) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        gap: '16px'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("p", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Module not found.', 'jetix-store-toolkit')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__.Button, {
        variant: "secondary",
        onClick: onBack,
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('← Back to Modules', 'jetix-store-toolkit')
      })]
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
    className: "jstk-page jstk-module-page",
    children: [notice && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
      status: notice.status,
      isDismissible: true,
      onDismiss: () => setNotice(null),
      children: notice.message
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("aside", {
      className: "jstk-module-page__sidebar",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
        className: "jstk-module-page__back",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__.Button, {
          variant: "tertiary",
          onClick: onBack,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('← Back to Modules', 'jetix-store-toolkit')
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
        className: "jstk-module-settings-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
          className: "jstk-module-settings-header__info",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
            className: "jstk-module-settings-header__title-row",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
                className: `jstk-tier-badge jstk-tier-badge--${module.tier}`,
                children: module.tier
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("h2", {
              className: "jstk-page__title",
              style: {
                marginBottom: 0
              },
              children: module.title
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("p", {
            className: "jstk-page__desc",
            children: module.description
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
          className: "jstk-module-settings-header__toggle",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__.Toggle, {
            id: `module-detail-toggle-${module.slug}`,
            label: module.active ? 'Active' : 'Inactive',
            checked: module.active,
            onChange: handleToggle,
            disabled: toggling
          })
        })]
      }), latestChangelog && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
        className: "jstk-module-page__changelog",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("h4", {
          className: "jstk-module-page__changelog-title",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Latest Module Changes', 'jetix-store-toolkit')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("div", {
          className: "jstk-module-page__changelog-meta",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsxs)("span", {
            className: "jstk-version-tag",
            children: ["v", latestChangelog.version]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("span", {
            className: "jstk-module-page__changelog-date",
            children: latestChangelog.date
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("ul", {
          className: "jstk-module-page__changelog-notes",
          children: latestChangelog.notes.map((note, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("li", {
            children: note
          }, i))
        })]
      })]
    }), tabs.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
      className: "jstk-module-page__content",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TabPanel, {
        className: "jstk-settings-tabs",
        tabs: tabs,
        children: tab => {
          const Component = tabMap[tab.name];
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
            className: "jstk-settings-tab-content",
            children: Component ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)(Component, {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
              className: "jstk-empty",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("p", {
                className: "jstk-empty__desc",
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No content available.', 'jetix-store-toolkit')
              })
            })
          });
        }
      })
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
      className: "jstk-module-page__content",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("div", {
        className: "jstk-empty",
        style: {
          padding: '48px 24px'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_15__.jsx)("p", {
          className: "jstk-empty__desc",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No configuration available for this module.', 'jetix-store-toolkit')
        })
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModuleSettingsPage);

/***/ },

/***/ "./src/dashboard/components/module-settings/CustomOrderStatusesSettings.js"
/*!*********************************************************************************!*\
  !*** ./src/dashboard/components/module-settings/CustomOrderStatusesSettings.js ***!
  \*********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const CustomOrderStatusesSettings = () => {
  const [statuses, setStatuses] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [builtinStatuses, setBuiltinStatuses] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const fetchSettings = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    try {
      const data = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/jwp-stk/v1/modules/custom-order-statuses/settings'
      });
      setStatuses(data.settings.statuses || []);
      setBuiltinStatuses(data.builtin_statuses || {});
    } catch {
      setNotice({
        status: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to load settings.', 'jetix-store-toolkit')
      });
    } finally {
      setLoading(false);
    }
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    fetchSettings();
  }, [fetchSettings]);
  const handleSave = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    setSaving(true);
    setNotice(null);
    try {
      const res = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/jwp-stk/v1/modules/custom-order-statuses/settings',
        method: 'POST',
        data: {
          settings: {
            statuses
          }
        }
      });
      setStatuses(res.settings.statuses || []);
      setNotice({
        status: 'success',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Settings saved. Reload the page to see new statuses.', 'jetix-store-toolkit')
      });
    } catch {
      setNotice({
        status: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to save settings.', 'jetix-store-toolkit')
      });
    } finally {
      setSaving(false);
    }
  }, [statuses]);
  const addStatus = () => {
    setStatuses(prev => [...prev, {
      slug: '',
      label: '',
      color: '#787c82'
    }]);
  };
  const updateStatus = (index, key, value) => {
    setStatuses(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [key]: value
      };

      // Auto-generate slug from label.
      if (key === 'label' && !updated[index]._slugEdited) {
        updated[index].slug = value.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').substring(0, 17);
      }
      return updated;
    });
  };
  const removeStatus = index => {
    setStatuses(prev => prev.filter((_, i) => i !== index));
  };
  if (loading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "jstk-loading",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {})
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "jstk-module-settings-form",
    children: [notice && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
      status: notice.status,
      isDismissible: true,
      onDismiss: () => setNotice(null),
      children: notice.message
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "jstk-cos-builtin",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h3", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Built-in Statuses', 'jetix-store-toolkit')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
        className: "jwp-stk-settings-description",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('These are the default WooCommerce order statuses. They cannot be removed.', 'jetix-store-toolkit')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("ul", {
        className: "jstk-cos-builtin-list",
        children: Object.entries(builtinStatuses).map(([key, label]) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("li", {
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("code", {
            children: key
          }), " \u2014 ", label]
        }, key))
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h3", {
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Custom Statuses', 'jetix-store-toolkit')
    }), statuses.length === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
      className: "jstk-settings-description",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No custom statuses yet. Click the button below to add one.', 'jetix-store-toolkit')
    }), statuses.map((status, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "jstk-cos-status-row",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "jstk-cos-status-row__fields",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Label', 'jetix-store-toolkit'),
          value: status.label,
          onChange: val => updateStatus(index, 'label', val),
          __nextHasNoMarginBottom: true
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Slug', 'jetix-store-toolkit'),
          value: status.slug,
          onChange: val => {
            updateStatus(index, 'slug', val);
            updateStatus(index, '_slugEdited', true);
          },
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Max 17 characters, lowercase letters, numbers, hyphens.', 'jetix-store-toolkit'),
          __nextHasNoMarginBottom: true
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "jstk-cos-color-field",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("label", {
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Color', 'jetix-store-toolkit')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "jstk-cos-color-input",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ColorIndicator, {
              colorValue: status.color || '#787c82'
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("input", {
              type: "color",
              value: status.color || '#787c82',
              onChange: e => updateStatus(index, 'color', e.target.value)
            })]
          })]
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        isDestructive: true,
        variant: "tertiary",
        onClick: () => removeStatus(index),
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Remove', 'jetix-store-toolkit')
      })]
    }, index)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      variant: "secondary",
      onClick: addStatus,
      className: "jstk-cos-add-status",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('+ Add Custom Status', 'jetix-store-toolkit')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "jstk-settings-actions",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        variant: "primary",
        onClick: handleSave,
        isBusy: saving,
        disabled: saving,
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save Settings', 'jetix-store-toolkit')
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomOrderStatusesSettings);

/***/ },

/***/ "./src/dashboard/components/module-settings/ProductTabManagerDefaultTabs.js"
/*!**********************************************************************************!*\
  !*** ./src/dashboard/components/module-settings/ProductTabManagerDefaultTabs.js ***!
  \**********************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const ProductTabManagerDefaultTabs = () => {
  const [settings, setSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const fetchSettings = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    try {
      const data = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/jwp-stk/v1/modules/product-tab-manager/settings'
      });
      setSettings(data.settings);
    } catch {
      setNotice({
        status: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to load settings.', 'jetix-store-toolkit')
      });
    } finally {
      setLoading(false);
    }
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    fetchSettings();
  }, [fetchSettings]);
  const handleSave = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    setSaving(true);
    setNotice(null);
    try {
      const res = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/jwp-stk/v1/modules/product-tab-manager/settings',
        method: 'POST',
        data: {
          settings
        }
      });
      setSettings(res.settings);
      setNotice({
        status: 'success',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Settings saved.', 'jetix-store-toolkit')
      });
    } catch {
      setNotice({
        status: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to save settings.', 'jetix-store-toolkit')
      });
    } finally {
      setSaving(false);
    }
  }, [settings]);
  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  if (loading || !settings) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "jstk-loading",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {})
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "jstk-module-settings-form",
    children: [notice && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
      status: notice.status,
      isDismissible: true,
      onDismiss: () => setNotice(null),
      children: notice.message
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
      className: "jstk-settings-description",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Toggle default WooCommerce product tabs on or off, and optionally rename them.', 'jetix-store-toolkit')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "jstk-ptm-default-tabs",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "jstk-ptm-tab-row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Description Tab', 'jetix-store-toolkit'),
          checked: !settings.disable_description,
          onChange: val => updateSetting('disable_description', !val),
          __nextHasNoMarginBottom: true
        }), !settings.disable_description && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Custom Title', 'jetix-store-toolkit'),
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Description', 'jetix-store-toolkit'),
          value: settings.description_title || '',
          onChange: val => updateSetting('description_title', val),
          __nextHasNoMarginBottom: true
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "jstk-ptm-tab-row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Additional Information Tab', 'jetix-store-toolkit'),
          checked: !settings.disable_additional_info,
          onChange: val => updateSetting('disable_additional_info', !val),
          __nextHasNoMarginBottom: true
        }), !settings.disable_additional_info && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Custom Title', 'jetix-store-toolkit'),
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Additional information', 'jetix-store-toolkit'),
          value: settings.additional_information_title || '',
          onChange: val => updateSetting('additional_information_title', val),
          __nextHasNoMarginBottom: true
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "jstk-ptm-tab-row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reviews Tab', 'jetix-store-toolkit'),
          checked: !settings.disable_reviews,
          onChange: val => updateSetting('disable_reviews', !val),
          __nextHasNoMarginBottom: true
        }), !settings.disable_reviews && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Custom Title', 'jetix-store-toolkit'),
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Reviews', 'jetix-store-toolkit'),
          value: settings.reviews_title || '',
          onChange: val => updateSetting('reviews_title', val),
          __nextHasNoMarginBottom: true
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "jstk-settings-actions",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        variant: "primary",
        onClick: handleSave,
        isBusy: saving,
        disabled: saving,
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save Settings', 'jetix-store-toolkit')
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductTabManagerDefaultTabs);

/***/ },

/***/ "./src/dashboard/components/module-settings/ProductTabManagerSettings.js"
/*!*******************************************************************************!*\
  !*** ./src/dashboard/components/module-settings/ProductTabManagerSettings.js ***!
  \*******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const ProductTabManagerSettings = () => {
  const [settings, setSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const fetchSettings = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    try {
      const data = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/jwp-stk/v1/modules/product-tab-manager/settings'
      });
      setSettings(data.settings);
    } catch {
      setNotice({
        status: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to load settings.', 'jetix-store-toolkit')
      });
    } finally {
      setLoading(false);
    }
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    fetchSettings();
  }, [fetchSettings]);
  const handleSave = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    setSaving(true);
    setNotice(null);
    try {
      const res = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/jwp-stk/v1/modules/product-tab-manager/settings',
        method: 'POST',
        data: {
          settings
        }
      });
      setSettings(res.settings);
      setNotice({
        status: 'success',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Settings saved.', 'jetix-store-toolkit')
      });
    } catch {
      setNotice({
        status: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to save settings.', 'jetix-store-toolkit')
      });
    } finally {
      setSaving(false);
    }
  }, [settings]);
  const addCustomTab = () => {
    setSettings(prev => {
      const tabs = [...(prev.custom_tabs || [])];
      tabs.push({
        title: '',
        content: '',
        priority: 50 + tabs.length
      });
      return {
        ...prev,
        custom_tabs: tabs
      };
    });
  };
  const updateTab = (index, key, value) => {
    setSettings(prev => {
      const tabs = [...(prev.custom_tabs || [])];
      tabs[index] = {
        ...tabs[index],
        [key]: value
      };
      return {
        ...prev,
        custom_tabs: tabs
      };
    });
  };
  const removeTab = index => {
    setSettings(prev => {
      const tabs = [...(prev.custom_tabs || [])];
      tabs.splice(index, 1);
      return {
        ...prev,
        custom_tabs: tabs
      };
    });
  };
  if (loading || !settings) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "jstk-loading",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {})
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "jstk-module-settings-form",
    children: [notice && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
      status: notice.status,
      isDismissible: true,
      onDismiss: () => setNotice(null),
      children: notice.message
    }), (settings.custom_tabs || []).length === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
      className: "jstk-settings-description",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No custom tabs yet. Add one below.', 'jetix-store-toolkit')
    }), (settings.custom_tabs || []).map((tab, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "jstk-ptm-custom-tab",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "jstk-ptm-custom-tab__header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
          children: tab.title || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Untitled Tab', 'jetix-store-toolkit')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          isDestructive: true,
          variant: "tertiary",
          size: "small",
          onClick: () => removeTab(index),
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Remove', 'jetix-store-toolkit')
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tab Title', 'jetix-store-toolkit'),
        value: tab.title || '',
        onChange: val => updateTab(index, 'title', val),
        __nextHasNoMarginBottom: true
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tab Content', 'jetix-store-toolkit'),
        value: tab.content || '',
        onChange: val => updateTab(index, 'content', val),
        rows: 4,
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('HTML is allowed. Content will be auto-wrapped in paragraphs.', 'jetix-store-toolkit'),
        __nextHasNoMarginBottom: true
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Priority', 'jetix-store-toolkit'),
        type: "number",
        value: tab.priority || 50,
        onChange: val => updateTab(index, 'priority', parseInt(val, 10) || 50),
        help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Lower number = appears first. Default WC tabs: Description 10, Additional Info 20, Reviews 30.', 'jetix-store-toolkit'),
        __nextHasNoMarginBottom: true
      })]
    }, index)), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
      variant: "secondary",
      onClick: addCustomTab,
      className: "jstk-ptm-add-tab",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('+ Add Custom Tab', 'jetix-store-toolkit')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "jstk-settings-actions",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        variant: "primary",
        onClick: handleSave,
        isBusy: saving,
        disabled: saving,
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save Settings', 'jetix-store-toolkit')
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductTabManagerSettings);

/***/ },

/***/ "./src/dashboard/components/module-settings/QuickViewSettings.js"
/*!***********************************************************************!*\
  !*** ./src/dashboard/components/module-settings/QuickViewSettings.js ***!
  \***********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const QuickViewSettings = () => {
  const [settings, setSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const fetchSettings = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    try {
      const data = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/jwp-stk/v1/modules/quick-view/settings'
      });
      setSettings(data.settings);
    } catch {
      setNotice({
        status: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to load settings.', 'jetix-store-toolkit')
      });
    } finally {
      setLoading(false);
    }
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    fetchSettings();
  }, [fetchSettings]);
  const handleSave = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    setSaving(true);
    setNotice(null);
    try {
      const res = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/jwp-stk/v1/modules/quick-view/settings',
        method: 'POST',
        data: {
          settings
        }
      });
      setSettings(res.settings);
      setNotice({
        status: 'success',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Settings saved.', 'jetix-store-toolkit')
      });
    } catch {
      setNotice({
        status: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to save settings.', 'jetix-store-toolkit')
      });
    } finally {
      setSaving(false);
    }
  }, [settings]);
  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  if (loading || !settings) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "jstk-loading",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {})
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "jstk-module-settings-form",
    children: [notice && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
      status: notice.status,
      isDismissible: true,
      onDismiss: () => setNotice(null),
      children: notice.message
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Button Label', 'jetix-store-toolkit'),
      value: settings.button_label || '',
      onChange: val => updateSetting('button_label', val),
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Button Position', 'jetix-store-toolkit'),
      value: settings.button_position || 'after_add_to_cart',
      options: [{
        value: 'before_add_to_cart',
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Before Add to Cart', 'jetix-store-toolkit')
      }, {
        value: 'after_add_to_cart',
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('After Add to Cart', 'jetix-store-toolkit')
      }],
      onChange: val => updateSetting('button_position', val),
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h3", {
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Modal Content', 'jetix-store-toolkit')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Show Gallery', 'jetix-store-toolkit'),
      checked: !!settings.show_gallery,
      onChange: val => updateSetting('show_gallery', val),
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Show Price', 'jetix-store-toolkit'),
      checked: !!settings.show_price,
      onChange: val => updateSetting('show_price', val),
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Show Rating', 'jetix-store-toolkit'),
      checked: !!settings.show_rating,
      onChange: val => updateSetting('show_rating', val),
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Show Short Description', 'jetix-store-toolkit'),
      checked: !!settings.show_excerpt,
      onChange: val => updateSetting('show_excerpt', val),
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Show Add to Cart', 'jetix-store-toolkit'),
      checked: !!settings.show_add_to_cart,
      onChange: val => updateSetting('show_add_to_cart', val),
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Show Product Meta', 'jetix-store-toolkit'),
      checked: !!settings.show_meta,
      onChange: val => updateSetting('show_meta', val),
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "jstk-settings-actions",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        variant: "primary",
        onClick: handleSave,
        isBusy: saving,
        disabled: saving,
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save Settings', 'jetix-store-toolkit')
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (QuickViewSettings);

/***/ },

/***/ "./src/dashboard/components/module-settings/StockManagerSettings.js"
/*!**************************************************************************!*\
  !*** ./src/dashboard/components/module-settings/StockManagerSettings.js ***!
  \**************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const StockManagerSettings = () => {
  const [settings, setSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const fetchSettings = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    try {
      const data = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/jwp-stk/v1/modules/stock-manager/settings'
      });
      setSettings(data.settings);
    } catch {
      setNotice({
        status: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to load settings.', 'jetix-store-toolkit')
      });
    } finally {
      setLoading(false);
    }
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    fetchSettings();
  }, [fetchSettings]);
  const handleSave = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    setSaving(true);
    setNotice(null);
    try {
      const res = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/jwp-stk/v1/modules/stock-manager/settings',
        method: 'POST',
        data: {
          settings
        }
      });
      setSettings(res.settings);
      setNotice({
        status: 'success',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Settings saved.', 'jetix-store-toolkit')
      });
    } catch {
      setNotice({
        status: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to save settings.', 'jetix-store-toolkit')
      });
    } finally {
      setSaving(false);
    }
  }, [settings]);
  const updateSetting = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };
  if (loading || !settings) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "jstk-loading",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {})
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "jstk-module-settings-form",
    children: [notice && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
      status: notice.status,
      isDismissible: true,
      onDismiss: () => setNotice(null),
      children: notice.message
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
      className: "jstk-settings-description",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Configure the Stock Manager table below. Changes apply immediately to the Stock Manager operations view.', 'jetix-store-toolkit')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Products Per Page', 'jetix-store-toolkit'),
      type: "number",
      min: 5,
      max: 100,
      value: settings.per_page || 20,
      onChange: val => updateSetting('per_page', parseInt(val, 10) || 20),
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Low Stock Threshold', 'jetix-store-toolkit'),
      type: "number",
      min: 0,
      value: settings.low_stock_threshold || 5,
      onChange: val => updateSetting('low_stock_threshold', parseInt(val, 10) || 5),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Products with stock at or below this number are flagged as low stock.', 'jetix-store-toolkit'),
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h3", {
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Display Columns', 'jetix-store-toolkit')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Show SKU', 'jetix-store-toolkit'),
      checked: !!settings.show_sku,
      onChange: val => updateSetting('show_sku', val),
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Show Stock Status', 'jetix-store-toolkit'),
      checked: !!settings.show_stock_status,
      onChange: val => updateSetting('show_stock_status', val),
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Show Manage Stock', 'jetix-store-toolkit'),
      checked: !!settings.show_manage_stock,
      onChange: val => updateSetting('show_manage_stock', val),
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Show Stock Quantity', 'jetix-store-toolkit'),
      checked: !!settings.show_stock_quantity,
      onChange: val => updateSetting('show_stock_quantity', val),
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Show Backorders', 'jetix-store-toolkit'),
      checked: !!settings.show_backorders,
      onChange: val => updateSetting('show_backorders', val),
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.ToggleControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Show Low Stock Filter', 'jetix-store-toolkit'),
      checked: !!settings.show_low_stock,
      onChange: val => updateSetting('show_low_stock', val),
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "jstk-settings-actions",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        variant: "primary",
        onClick: handleSave,
        isBusy: saving,
        disabled: saving,
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save Settings', 'jetix-store-toolkit')
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StockManagerSettings);

/***/ },

/***/ "./src/dashboard/components/module-views/StockManagerTable.jsx"
/*!*********************************************************************!*\
  !*** ./src/dashboard/components/module-views/StockManagerTable.jsx ***!
  \*********************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ StockManagerTable)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ui */ "./src/dashboard/components/ui/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);
/**
 * Stock Manager — operational table view.
 *
 * Fetches products from the custom REST endpoint and lets users edit
 * stock fields inline (qty, status, manage stock, backorders), applying
 * all settings-tab controls (per page, column visibility, low stock filter).
 *
 * @package Jetix_Store_Toolkit
 */







const STOCK_STATUS_OPTIONS = [{
  value: 'instock',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('In Stock', 'jetix-store-toolkit')
}, {
  value: 'outofstock',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Out of Stock', 'jetix-store-toolkit')
}, {
  value: 'onbackorder',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('On Backorder', 'jetix-store-toolkit')
}];
const STOCK_STATUS_COLORS = {
  instock: '#66A378',
  outofstock: '#DB5E50',
  onbackorder: '#EAB42E'
};
const BACKORDERS_OPTIONS = [{
  value: 'no',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Do not allow', 'jetix-store-toolkit')
}, {
  value: 'notify',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Allow, notify customer', 'jetix-store-toolkit')
}, {
  value: 'yes',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Allow', 'jetix-store-toolkit')
}];
const BASE_FILTERS = [{
  value: '',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('All', 'jetix-store-toolkit')
}, {
  value: 'instock',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('In Stock', 'jetix-store-toolkit')
}, {
  value: 'outofstock',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Out of Stock', 'jetix-store-toolkit')
}, {
  value: 'onbackorder',
  label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('On Backorder', 'jetix-store-toolkit')
}];
function StockManagerTable() {
  const [products, setProducts] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [settings, setSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [edited, setEdited] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [page, setPage] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const [totalPages, setTotalPages] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(1);
  const [totalItems, setTotalItems] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(0);
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [stockFilter, setStockFilter] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [searchInput, setSearchInput] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');
  const [search, setSearch] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)('');

  // Debounce search input.
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    const timer = setTimeout(() => {
      setSearch(searchInput);
      setPage(1);
    }, 400);
    return () => clearTimeout(timer);
  }, [searchInput]);
  const fetchProducts = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async (pg, filter, searchTerm) => {
    setLoading(true);
    try {
      let path = `/jwp-stk/v1/stock-manager/products?page=${pg}`;
      if (filter) {
        path += `&stock_status=${encodeURIComponent(filter)}`;
      }
      if (searchTerm) {
        path += `&search=${encodeURIComponent(searchTerm)}`;
      }
      const data = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path
      });
      setProducts(data.items);
      setTotalPages(data.pages);
      setTotalItems(data.total);
      setSettings(data.settings);
      setEdited({});
    } catch {
      setNotice({
        status: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to load products.', 'jetix-store-toolkit')
      });
    } finally {
      setLoading(false);
    }
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    fetchProducts(page, stockFilter, search);
  }, [page, stockFilter, search, fetchProducts]);
  const handleFilterChange = filter => {
    setPage(1);
    setStockFilter(filter);
  };
  const handleFieldChange = (id, field, value) => {
    setEdited(prev => ({
      ...prev,
      [id]: {
        ...prev[id],
        [field]: value
      }
    }));
  };
  const handleSave = async () => {
    if (Object.keys(edited).length === 0) return;
    setSaving(true);
    setNotice(null);
    try {
      const updates = Object.entries(edited).map(([id, fields]) => {
        const update = {
          id: parseInt(id, 10)
        };
        if ('stock_status' in fields) {
          update.stock_status = fields.stock_status;
        }
        if ('manage_stock' in fields) {
          update.manage_stock = fields.manage_stock;
        }
        if ('stock_quantity' in fields) {
          update.stock_quantity = parseInt(fields.stock_quantity, 10);
          // Quantity change implies managed stock unless the user explicitly toggled it off.
          if (!('manage_stock' in fields)) {
            update.manage_stock = true;
          }
        }
        if ('backorders' in fields) {
          update.backorders = fields.backorders;
        }
        return update;
      });
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/wc/v3/products/batch',
        method: 'POST',
        data: {
          update: updates
        }
      });
      setNotice({
        status: 'success',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Stock updated successfully.', 'jetix-store-toolkit')
      });
      fetchProducts(page, stockFilter, search);
    } catch {
      setNotice({
        status: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to save stock changes.', 'jetix-store-toolkit')
      });
    } finally {
      setSaving(false);
    }
  };
  const hasEdits = Object.keys(edited).length > 0;
  const perPage = settings?.per_page || 20;
  const startItem = (page - 1) * perPage + 1;
  const endItem = Math.min(page * perPage, totalItems);
  const filters = settings?.show_low_stock ? [...BASE_FILTERS, {
    value: 'lowstock',
    label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Low Stock', 'jetix-store-toolkit')
  }] : BASE_FILTERS;
  const colCount = 1 + (settings?.show_sku ? 1 : 0) + (settings?.show_stock_status ? 1 : 0) + (settings?.show_manage_stock ? 1 : 0) + (settings?.show_stock_quantity ? 1 : 0) + (settings?.show_backorders ? 1 : 0);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "jstk-stock-wrap",
    children: [notice && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "jstk-stock-notice",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: `jstk-notice jstk-notice--${notice.status}`,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
          children: notice.message
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
          className: "jstk-notice__dismiss",
          onClick: () => setNotice(null),
          children: "\xD7"
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "jstk-stock-toolbar",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
        className: "jstk-stock-filters",
        children: filters.map(f => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("button", {
          className: `jstk-stock-filter-btn${stockFilter === f.value ? ' is-active' : ''}`,
          onClick: () => handleFilterChange(f.value),
          children: f.label
        }, f.value))
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("input", {
        type: "search",
        className: "jstk-stock-search-input",
        placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Search products\u2026', 'jetix-store-toolkit'),
        value: searchInput,
        onChange: e => setSearchInput(e.target.value)
      }), hasEdits && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__.Button, {
        variant: "primary",
        onClick: handleSave,
        isBusy: saving,
        disabled: saving,
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save Changes', 'jetix-store-toolkit')
      })]
    }), loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "jstk-loading",
      style: {
        minHeight: '220px'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {})
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.Fragment, {
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("table", {
        className: "jstk-stock-table",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("thead", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("th", {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Product', 'jetix-store-toolkit')
            }), settings?.show_sku && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("th", {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('SKU', 'jetix-store-toolkit')
            }), settings?.show_stock_status && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("th", {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Stock Status', 'jetix-store-toolkit')
            }), settings?.show_manage_stock && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("th", {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Manage Stock', 'jetix-store-toolkit')
            }), settings?.show_stock_quantity && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("th", {
              className: "jstk-stock-table__col-qty",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Stock Qty', 'jetix-store-toolkit')
            }), settings?.show_backorders && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("th", {
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Backorders', 'jetix-store-toolkit')
            })]
          })
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tbody", {
          children: [products.map(product => {
            const editedFields = edited[product.id] || {};
            const currentQty = 'stock_quantity' in editedFields ? editedFields.stock_quantity : product.stock_qty ?? 0;
            const currentStatus = editedFields.stock_status ?? product.stock_status;
            const currentManageStock = 'manage_stock' in editedFields ? editedFields.manage_stock : product.manage_stock;
            const currentBackorders = editedFields.backorders ?? product.backorders;
            const isDirty = Object.keys(editedFields).length > 0;
            return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("tr", {
              className: isDirty ? 'is-edited' : '',
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                className: "jstk-stock-table__name",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
                  className: "jstk-stock-table__name-inner",
                  children: [product.name, product.type === 'variable' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                    className: "jstk-stock-table__type-badge",
                    children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Variable', 'jetix-store-toolkit')
                  })]
                })
              }), settings?.show_sku && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                className: "jstk-stock-table__sku",
                children: product.sku || '\u2014'
              }), settings?.show_stock_status && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("select", {
                  className: "jstk-stock-select",
                  value: currentStatus,
                  onChange: e => handleFieldChange(product.id, 'stock_status', e.target.value),
                  children: STOCK_STATUS_OPTIONS.map(opt => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("option", {
                    value: opt.value,
                    children: opt.label
                  }, opt.value))
                })
              }), settings?.show_manage_stock && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                className: "jstk-stock-table__manage",
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("input", {
                  type: "checkbox",
                  className: "jstk-stock-checkbox",
                  checked: !!currentManageStock,
                  onChange: e => handleFieldChange(product.id, 'manage_stock', e.target.checked)
                })
              }), settings?.show_stock_quantity && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                className: "jstk-stock-table__qty",
                children: currentManageStock ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("input", {
                  type: "number",
                  className: "jstk-stock-qty-input",
                  value: currentQty,
                  onChange: e => handleFieldChange(product.id, 'stock_quantity', e.target.value),
                  min: "0"
                }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
                  className: "jstk-stock-table__unmanaged",
                  children: '\u2014'
                })
              }), settings?.show_backorders && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("select", {
                  className: "jstk-stock-select",
                  value: currentBackorders,
                  onChange: e => handleFieldChange(product.id, 'backorders', e.target.value),
                  children: BACKORDERS_OPTIONS.map(opt => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("option", {
                    value: opt.value,
                    children: opt.label
                  }, opt.value))
                })
              })]
            }, product.id);
          }), products.length === 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("tr", {
            children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("td", {
              colSpan: colCount,
              className: "jstk-stock-table__empty",
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No products found.', 'jetix-store-toolkit')
            })
          })]
        })]
      }), totalItems > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "jstk-stock-footer",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
          className: "jstk-stock-count",
          children: `${startItem}\u2013${endItem} ${(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('of', 'jetix-store-toolkit')} ${totalItems}`
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "jstk-stock-pagination",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__.Button, {
            variant: "tertiary",
            disabled: page <= 1,
            onClick: () => setPage(p => p - 1),
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('\u2039 Previous', 'jetix-store-toolkit')
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("span", {
            className: "jstk-stock-page-indicator",
            children: [page, " / ", totalPages]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__.Button, {
            variant: "tertiary",
            disabled: page >= totalPages,
            onClick: () => setPage(p => p + 1),
            children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Next \u203a', 'jetix-store-toolkit')
          })]
        })]
      })]
    })]
  });
}

/***/ },

/***/ "./src/dashboard/components/modules/ModuleCard.jsx"
/*!*********************************************************!*\
  !*** ./src/dashboard/components/modules/ModuleCard.jsx ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ModuleCard)
/* harmony export */ });
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../ui */ "./src/dashboard/components/ui/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__);
/**
 * Individual module card with toggle + configure button.
 *
 * @package Jetix_Store_Toolkit
 */



function ModuleCard({
  module,
  toggling,
  onToggle,
  onConfigure
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("article", {
    className: `jstk-module-card${module.active ? ' is-active' : ''}`,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("div", {
      className: "jstk-module-card__body",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("h3", {
        className: "jstk-module-card__name",
        title: module.title,
        children: module.title
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)("p", {
        className: "jstk-module-card__meta",
        children: module.description
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsxs)("footer", {
      className: "jstk-module-card__footer",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_0__.Toggle, {
        id: `module-toggle-${module.slug}`,
        checked: module.active,
        onChange: onToggle,
        disabled: toggling
      }), module.active && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_0__.Button, {
        variant: "secondary",
        onClick: onConfigure,
        children: "Open"
      })]
    })]
  });
}

/***/ },

/***/ "./src/dashboard/components/modules/ModulesGrid.jsx"
/*!**********************************************************!*\
  !*** ./src/dashboard/components/modules/ModulesGrid.jsx ***!
  \**********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ ModulesGrid)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _ModuleCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModuleCard */ "./src/dashboard/components/modules/ModuleCard.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__);
/**
 * Modules grid — renders loading, empty, or the module card list.
 *
 * @package Jetix_Store_Toolkit
 */




const TIER_ORDER = ['core', 'growth', 'power'];
function ModulesGrid({
  modules,
  loading,
  toggling,
  onToggle,
  onConfigure
}) {
  if (loading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "jstk-loading",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.Spinner, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
        children: "Loading modules\u2026"
      })]
    });
  }
  const enabledModules = modules.filter(m => m.enabled);
  if (enabledModules.length === 0) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "jstk-empty",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "jstk-empty__icon",
        "aria-hidden": "true",
        children: "\uD83D\uDCE6"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("h3", {
        className: "jstk-empty__title",
        children: "No modules available"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("p", {
        className: "jstk-empty__desc",
        children: "There are no modules available at this time."
      })]
    });
  }

  // Group by tier.
  const grouped = {};
  enabledModules.forEach(mod => {
    const tier = mod.tier || 'core';
    if (!grouped[tier]) {
      grouped[tier] = [];
    }
    grouped[tier].push(mod);
  });
  const activeTiers = TIER_ORDER.filter(t => grouped[t]?.length > 0);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
    className: "jstk-modules-tiers",
    children: activeTiers.map(tier => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsxs)("div", {
      className: "jstk-modules-tier",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("div", {
        className: "jstk-modules-tier__header",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("span", {
          className: `jstk-tier-badge jstk-tier-badge--${tier}`,
          children: tier.charAt(0).toUpperCase() + tier.slice(1)
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("ul", {
        className: "jstk-modules-grid",
        role: "list",
        children: grouped[tier].map(mod => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)("li", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_2__.jsx)(_ModuleCard__WEBPACK_IMPORTED_MODULE_1__["default"], {
            module: mod,
            toggling: toggling[mod.slug] || false,
            onToggle: active => onToggle(mod.slug, active),
            onConfigure: () => onConfigure(mod.slug)
          })
        }, mod.slug))
      })]
    }, tier))
  });
}

/***/ },

/***/ "./src/dashboard/components/modules/index.js"
/*!***************************************************!*\
  !*** ./src/dashboard/components/modules/index.js ***!
  \***************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   ModuleCard: () => (/* reexport safe */ _ModuleCard__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   ModulesGrid: () => (/* reexport safe */ _ModulesGrid__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _ModulesGrid__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./ModulesGrid */ "./src/dashboard/components/modules/ModulesGrid.jsx");
/* harmony import */ var _ModuleCard__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./ModuleCard */ "./src/dashboard/components/modules/ModuleCard.jsx");



/***/ },

/***/ "./src/dashboard/components/settings/SettingsSection.jsx"
/*!***************************************************************!*\
  !*** ./src/dashboard/components/settings/SettingsSection.jsx ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SettingsSection)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

/**
 * SettingsSection — a labelled group of settings controls.
 *
 * @package Jetix_Store_Toolkit
 */

function SettingsSection({
  title,
  description,
  headerExtra,
  children
}) {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "jstk-settings-section",
    children: [(title || description) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "jstk-settings-section__header",
      children: [title && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "jstk-settings-section__title-row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
          className: "jstk-settings-section__title",
          children: title
        }), headerExtra]
      }), description && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "jstk-settings-section__description",
        children: description
      })]
    }), children && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "jstk-settings-section__body",
      children: children
    })]
  });
}

/***/ },

/***/ "./src/dashboard/components/settings/SettingsSidebar.jsx"
/*!***************************************************************!*\
  !*** ./src/dashboard/components/settings/SettingsSidebar.jsx ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ SettingsSidebar)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

/**
 * SettingsSidebar — persistent sidebar shown alongside the settings tab panel.
 *
 * @package Jetix_Store_Toolkit
 */

const LINKS = [{
  label: 'Website',
  href: 'https://jetixwp.com'
}, {
  label: 'Feature Request',
  href: 'https://jetixwp.com/contact'
}];
function SettingsSidebar() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("aside", {
    className: "jstk-settings-sidebar",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "jstk-settings-sidebar__widget",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("h3", {
        className: "jstk-settings-sidebar__widget-title",
        children: "Stay in the loop"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("ul", {
        className: "jstk-settings-sidebar__links",
        children: LINKS.map(({
          label,
          href
        }) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("li", {
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
            href: href,
            className: "jstk-settings-sidebar__link",
            target: "_blank",
            rel: "noreferrer",
            children: label
          })
        }, label))
      })]
    })
  });
}

/***/ },

/***/ "./src/dashboard/components/settings/index.js"
/*!****************************************************!*\
  !*** ./src/dashboard/components/settings/index.js ***!
  \****************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   SettingsSection: () => (/* reexport safe */ _SettingsSection__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   SettingsSidebar: () => (/* reexport safe */ _SettingsSidebar__WEBPACK_IMPORTED_MODULE_1__["default"])
/* harmony export */ });
/* harmony import */ var _SettingsSection__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./SettingsSection */ "./src/dashboard/components/settings/SettingsSection.jsx");
/* harmony import */ var _SettingsSidebar__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./SettingsSidebar */ "./src/dashboard/components/settings/SettingsSidebar.jsx");



/***/ },

/***/ "./src/dashboard/components/settings/tabs/GeneralTab.jsx"
/*!***************************************************************!*\
  !*** ./src/dashboard/components/settings/tabs/GeneralTab.jsx ***!
  \***************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ GeneralTab)
/* harmony export */ });
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _SettingsSection__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../SettingsSection */ "./src/dashboard/components/settings/SettingsSection.jsx");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * General settings tab.
 *
 * @package Jetix_Store_Toolkit
 */






function GeneralTab({
  settings,
  updateSetting
}) {
  const [themeEngines, setThemeEngines] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)([]);
  const [activeEngine, setActiveEngine] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  const [autoEngine, setAutoEngine] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useState)('');
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_1__.useEffect)(() => {
    _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
      path: '/jwp-stk/v1/settings'
    }).then(data => {
      if (data?.available_theme_engines) {
        setThemeEngines(Object.entries(data.available_theme_engines).map(([value, label]) => ({
          value,
          label
        })));
      }
      if (data?.active_theme_engine) {
        setActiveEngine(data.active_theme_engine);
      }
      if (data?.automatic_theme_engine) {
        setAutoEngine(data.automatic_theme_engine);
      }
    }).catch(() => {});
  }, []);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(_SettingsSection__WEBPACK_IMPORTED_MODULE_3__["default"], {
    title: "Theme Compatibility",
    description: "The theme compatibility engine loads additional styles and scripts to ensure Store Toolkit features display correctly with your theme. \u201CAuto\u201D will detect your theme automatically.",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_0__.SelectControl, {
      label: "Theme Compatibility Engine",
      value: settings.theme_compatibility_engine || 'auto',
      options: themeEngines,
      onChange: val => updateSetting('theme_compatibility_engine', val),
      __nextHasNoMarginBottom: true
    }), activeEngine && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("p", {
      style: {
        fontSize: '13px',
        color: '#50575e',
        margin: '0'
      },
      children: ["Active engine: ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
        children: activeEngine
      }), autoEngine && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.Fragment, {
        children: [' — ', "Auto-detected: ", /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("strong", {
          children: autoEngine
        })]
      })]
    })]
  });
}

/***/ },

/***/ "./src/dashboard/components/settings/tabs/index.js"
/*!*********************************************************!*\
  !*** ./src/dashboard/components/settings/tabs/index.js ***!
  \*********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   GeneralTab: () => (/* reexport safe */ _GeneralTab__WEBPACK_IMPORTED_MODULE_0__["default"])
/* harmony export */ });
/* harmony import */ var _GeneralTab__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./GeneralTab */ "./src/dashboard/components/settings/tabs/GeneralTab.jsx");


/***/ },

/***/ "./src/dashboard/components/ui/Button/index.jsx"
/*!******************************************************!*\
  !*** ./src/dashboard/components/ui/Button/index.jsx ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Button)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Button — custom UI component.
 *
 * Variants: primary, secondary, tertiary, destructive
 *
 * @package Jetix_Store_Toolkit
 */

function Button({
  variant = 'primary',
  type = 'button',
  disabled = false,
  isBusy = false,
  onClick,
  className = '',
  icon,
  children,
  ...rest
}) {
  const classes = ['jstk-btn', `jstk-btn--${variant}`, isBusy ? 'jstk-btn--busy' : '', className].filter(Boolean).join(' ');
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("button", {
    type: type,
    className: classes,
    disabled: disabled || isBusy,
    onClick: onClick,
    "aria-busy": isBusy || undefined,
    ...rest,
    children: [isBusy && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      className: "jstk-btn__spinner",
      "aria-hidden": "true"
    }), icon && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      className: "jstk-btn__icon",
      "aria-hidden": "true",
      children: icon
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
      className: "jstk-btn__label",
      children: children
    })]
  });
}

/***/ },

/***/ "./src/dashboard/components/ui/Checkbox/index.jsx"
/*!********************************************************!*\
  !*** ./src/dashboard/components/ui/Checkbox/index.jsx ***!
  \********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Checkbox)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Checkbox — custom accessible checkbox with label and optional help text.
 *
 * @package Jetix_Store_Toolkit
 */

function CheckIcon() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
    width: "12",
    height: "9",
    viewBox: "0 0 12 9",
    fill: "none",
    "aria-hidden": "true",
    xmlns: "http://www.w3.org/2000/svg",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M9.9 0L3.78 6.12L1.26 3.6L0 4.86L3.78 8.64L11.16 1.26",
      fill: "#2271B1"
    })
  });
}
function Checkbox({
  id,
  label,
  help,
  checked,
  onChange,
  disabled = false
}) {
  const inputId = id || `jstk-cb-${String(label).replace(/\s+/g, '-').toLowerCase()}`;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
    className: `jstk-checkbox${disabled ? ' jstk-checkbox--disabled' : ''}`,
    htmlFor: inputId,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
      className: "jstk-checkbox__control",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
        type: "checkbox",
        id: inputId,
        className: "jstk-checkbox__input",
        checked: !!checked,
        onChange: e => onChange && onChange(e.target.checked),
        disabled: disabled
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "jstk-checkbox__indicator",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CheckIcon, {})
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
      className: "jstk-checkbox__text",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "jstk-checkbox__label",
        children: label
      }), help && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "jstk-checkbox__help",
        children: help
      })]
    })]
  });
}

/***/ },

/***/ "./src/dashboard/components/ui/Notice/index.jsx"
/*!******************************************************!*\
  !*** ./src/dashboard/components/ui/Notice/index.jsx ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Notice)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Notice — inline status message component.
 *
 * Variants: success | warning | danger
 * 'error' is accepted as a legacy alias for 'danger'.
 *
 * @package Jetix_Store_Toolkit
 */

function CloseIcon() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("svg", {
    width: "12",
    height: "12",
    viewBox: "0 0 12 12",
    fill: "none",
    "aria-hidden": "true",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
      d: "M1 1L11 11M11 1L1 11",
      stroke: "currentColor",
      strokeWidth: "1.5",
      strokeLinecap: "round"
    })
  });
}
function Notice({
  type = 'success',
  isDismissible = false,
  onDismiss,
  children
}) {
  const variant = type === 'error' ? 'danger' : type || 'success';
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: `jstk-notice jstk-notice--${variant}`,
    role: "alert",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("div", {
      className: "jstk-notice__content",
      children: children
    }), isDismissible && onDismiss && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("button", {
      type: "button",
      className: "jstk-notice__dismiss",
      onClick: onDismiss,
      "aria-label": "Dismiss notice",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)(CloseIcon, {})
    })]
  });
}

/***/ },

/***/ "./src/dashboard/components/ui/Toggle/index.jsx"
/*!******************************************************!*\
  !*** ./src/dashboard/components/ui/Toggle/index.jsx ***!
  \******************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Toggle)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

/**
 * Toggle — iOS-style switch with label and optional help text.
 *
 * @package Jetix_Store_Toolkit
 */

function Toggle({
  id,
  label,
  help,
  checked,
  onChange,
  disabled = false
}) {
  const inputId = id || `jstk-toggle-${String(label).replace(/\s+/g, '-').toLowerCase()}`;
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("label", {
    className: `jstk-toggle${disabled ? ' jstk-toggle--disabled' : ''}`,
    htmlFor: inputId,
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
      className: "jstk-toggle__track",
      "aria-hidden": "true",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
        type: "checkbox",
        id: inputId,
        className: "jstk-toggle__input",
        checked: !!checked,
        onChange: e => onChange && onChange(e.target.checked),
        disabled: disabled
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "jstk-toggle__thumb"
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("span", {
      className: "jstk-toggle__text",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "jstk-toggle__label",
        children: label
      }), help && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "jstk-toggle__help",
        children: help
      })]
    })]
  });
}

/***/ },

/***/ "./src/dashboard/components/ui/index.js"
/*!**********************************************!*\
  !*** ./src/dashboard/components/ui/index.js ***!
  \**********************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   Button: () => (/* reexport safe */ _Button_index__WEBPACK_IMPORTED_MODULE_0__["default"]),
/* harmony export */   Checkbox: () => (/* reexport safe */ _Checkbox_index__WEBPACK_IMPORTED_MODULE_1__["default"]),
/* harmony export */   Notice: () => (/* reexport safe */ _Notice_index__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   Toggle: () => (/* reexport safe */ _Toggle_index__WEBPACK_IMPORTED_MODULE_3__["default"])
/* harmony export */ });
/* harmony import */ var _Button_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Button/index */ "./src/dashboard/components/ui/Button/index.jsx");
/* harmony import */ var _Checkbox_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Checkbox/index */ "./src/dashboard/components/ui/Checkbox/index.jsx");
/* harmony import */ var _Notice_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./Notice/index */ "./src/dashboard/components/ui/Notice/index.jsx");
/* harmony import */ var _Toggle_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Toggle/index */ "./src/dashboard/components/ui/Toggle/index.jsx");





/***/ },

/***/ "./src/dashboard/pages/Dashboard.jsx"
/*!*******************************************!*\
  !*** ./src/dashboard/pages/Dashboard.jsx ***!
  \*******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Dashboard)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/ui */ "./src/dashboard/components/ui/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * Dashboard page.
 *
 * @package Jetix_Store_Toolkit
 */






function Dashboard({
  navigate
}) {
  const {
    adminUrl
  } = window.jwpStkDashboard || {};
  const [stats, setStats] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const fetchStats = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    try {
      const modules = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_2___default()({
        path: '/jwp-stk/v1/modules'
      });
      const enabled = modules.filter(m => m.enabled);
      const active = modules.filter(m => m.enabled && m.active);
      setStats({
        total: enabled.length,
        active: active.length
      });
    } catch {
      setStats({
        total: 0,
        active: 0
      });
    } finally {
      setLoading(false);
    }
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    fetchStats();
  }, [fetchStats]);
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "jstk-page",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "jstk-page__header",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "jstk-page__header-text",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h1", {
          className: "jstk-page__title",
          children: "Dashboard"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
          className: "jstk-page__desc",
          children: "Welcome to Jetix Store Toolkit for WooCommerce. Your modular WooCommerce toolkit \u2014 enable only the features your store needs."
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "jstk-dashboard-stats",
      children: loading ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "jstk-loading",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
          children: "Loading\u2026"
        })]
      }) : stats && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "jstk-stats-grid",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "jstk-stat-card",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
            className: "jstk-stat-card__number",
            children: stats.active
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
            className: "jstk-stat-card__label",
            children: "Active Modules"
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
          className: "jstk-stat-card",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
            className: "jstk-stat-card__number",
            children: stats.total
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
            className: "jstk-stat-card__label",
            children: "Available Modules"
          })]
        })]
      })
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "jstk-dashboard-actions",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_ui__WEBPACK_IMPORTED_MODULE_3__.Button, {
        variant: "primary",
        onClick: () => navigate('modules'),
        children: "Manage Modules"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_ui__WEBPACK_IMPORTED_MODULE_3__.Button, {
        variant: "tertiary",
        onClick: () => navigate('settings'),
        children: "Settings"
      })]
    })]
  });
}

/***/ },

/***/ "./src/dashboard/pages/Modules.jsx"
/*!*****************************************!*\
  !*** ./src/dashboard/pages/Modules.jsx ***!
  \*****************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Modules)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _components_ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../components/ui */ "./src/dashboard/components/ui/index.js");
/* harmony import */ var _components_modules__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/modules */ "./src/dashboard/components/modules/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);
/**
 * Modules page — lists all available modules in a grid with
 * toggle and configure actions.
 *
 * @package Jetix_Store_Toolkit
 */






function Modules({
  onOpenModuleSettings
}) {
  const [modules, setModules] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [toggling, setToggling] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const fetchModules = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    setLoading(true);
    try {
      const data = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
        path: '/jwp-stk/v1/modules'
      });
      setModules(data);
    } catch (err) {
      setNotice({
        type: 'error',
        message: err?.message || 'Failed to load modules.'
      });
    } finally {
      setLoading(false);
    }
  }, []);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    fetchModules();
  }, [fetchModules]);
  async function handleToggle(slug, active) {
    setToggling(prev => ({
      ...prev,
      [slug]: true
    }));
    setNotice(null);
    try {
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
        path: '/jwp-stk/v1/modules/toggle',
        method: 'POST',
        data: {
          module: slug,
          active
        }
      });
      setModules(prev => prev.map(m => m.slug === slug ? {
        ...m,
        active
      } : m));
    } catch (err) {
      setNotice({
        type: 'error',
        message: err?.message || 'Failed to update module.'
      });
    } finally {
      setToggling(prev => ({
        ...prev,
        [slug]: false
      }));
    }
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
    className: "jstk-page",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "jstk-page__header",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "jstk-page__header-text",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("h1", {
          className: "jstk-page__title",
          children: "Modules"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
          className: "jstk-page__desc",
          children: "Enable or disable individual WooCommerce features. Each module is independent \u2014 activate only what your store needs."
        })]
      })
    }), notice && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_ui__WEBPACK_IMPORTED_MODULE_2__.Notice, {
      type: notice.type,
      isDismissible: true,
      onDismiss: () => setNotice(null),
      children: notice.message
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_components_modules__WEBPACK_IMPORTED_MODULE_3__.ModulesGrid, {
      modules: modules,
      loading: loading,
      toggling: toggling,
      onToggle: handleToggle,
      onConfigure: onOpenModuleSettings
    })]
  });
}

/***/ },

/***/ "./src/dashboard/pages/Settings.jsx"
/*!******************************************!*\
  !*** ./src/dashboard/pages/Settings.jsx ***!
  \******************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (/* binding */ Settings)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _components_ui__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../components/ui */ "./src/dashboard/components/ui/index.js");
/* harmony import */ var _components_settings__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../components/settings */ "./src/dashboard/components/settings/index.js");
/* harmony import */ var _components_settings_tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../components/settings/tabs */ "./src/dashboard/components/settings/tabs/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__);
/**
 * Settings page with tabbed panel + sidebar.
 *
 * @package Jetix_Store_Toolkit
 */








const DEFAULT_SETTINGS = {
  theme_compatibility_engine: 'auto'
};
const TABS = [{
  name: 'general',
  title: 'General',
  className: 'jstk-settings-tab'
}];
function Settings({
  onFooterState
}) {
  const [settings, setSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(DEFAULT_SETTINGS);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [dirty, setDirty] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [saved, setSaved] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(DEFAULT_SETTINGS);
  const savedSettings = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useRef)(DEFAULT_SETTINGS);
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    async function fetchSettings() {
      try {
        const data = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
          path: '/jwp-stk/v1/settings'
        });
        const merged = {
          ...DEFAULT_SETTINGS,
          ...data
        };
        setSettings(merged);
        setSaved(merged);
        savedSettings.current = merged;
      } catch {
        setNotice({
          type: 'error',
          message: 'Failed to load settings.'
        });
      } finally {
        setLoading(false);
      }
    }
    fetchSettings();
  }, []);
  function updateSetting(key, value) {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setDirty(true);
  }
  async function handleSave() {
    setSaving(true);
    setNotice(null);
    try {
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default()({
        path: '/jwp-stk/v1/settings',
        method: 'POST',
        data: {
          settings: {
            'theme-compatibility-engine': settings.theme_compatibility_engine
          }
        }
      });
      setNotice({
        type: 'success',
        message: 'Settings saved successfully.'
      });
      setSaved(settings);
      savedSettings.current = settings;
      setDirty(false);
    } catch (err) {
      setNotice({
        type: 'error',
        message: err?.message || 'Failed to save settings.'
      });
    } finally {
      setSaving(false);
    }
  }
  function handleDiscard() {
    setSettings(savedSettings.current);
    setDirty(false);
    setNotice(null);
  }
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useEffect)(() => {
    if (onFooterState) {
      onFooterState({
        dirty,
        saving,
        handleSave,
        handleDiscard
      });
    }
  }, [dirty, saving]); // eslint-disable-line react-hooks/exhaustive-deps

  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
    className: "jstk-page",
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
      className: "jstk-page__header",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "jstk-page__header-text",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("h1", {
          className: "jstk-page__title",
          children: "Global Plugin Settings"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("p", {
          className: "jstk-page__desc",
          children: "Configure plugin settings for this website."
        })]
      })
    }), notice && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_ui__WEBPACK_IMPORTED_MODULE_3__.Notice, {
      type: notice.type,
      isDismissible: true,
      onDismiss: () => setNotice(null),
      children: notice.message
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
      className: "jstk-settings-layout",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsxs)("div", {
        className: "jstk-settings-main",
        children: [loading && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
          className: "jstk-settings-loading",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.Spinner, {})
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_2__.TabPanel, {
          className: "jstk-settings-tabs",
          tabs: TABS,
          children: tab => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)("div", {
            className: "jstk-settings-tab-content",
            children: tab.name === 'general' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_settings_tabs__WEBPACK_IMPORTED_MODULE_5__.GeneralTab, {
              settings: settings,
              updateSetting: updateSetting
            })
          })
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_6__.jsx)(_components_settings__WEBPACK_IMPORTED_MODULE_4__.SettingsSidebar, {})]
    })]
  });
}

/***/ },

/***/ "./src/dashboard/styles/app.scss"
/*!***************************************!*\
  !*** ./src/dashboard/styles/app.scss ***!
  \***************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


/***/ },

/***/ "react/jsx-runtime"
/*!**********************************!*\
  !*** external "ReactJSXRuntime" ***!
  \**********************************/
(module) {

module.exports = window["ReactJSXRuntime"];

/***/ },

/***/ "@wordpress/api-fetch"
/*!**********************************!*\
  !*** external ["wp","apiFetch"] ***!
  \**********************************/
(module) {

module.exports = window["wp"]["apiFetch"];

/***/ },

/***/ "@wordpress/components"
/*!************************************!*\
  !*** external ["wp","components"] ***!
  \************************************/
(module) {

module.exports = window["wp"]["components"];

/***/ },

/***/ "@wordpress/element"
/*!*********************************!*\
  !*** external ["wp","element"] ***!
  \*********************************/
(module) {

module.exports = window["wp"]["element"];

/***/ },

/***/ "@wordpress/i18n"
/*!******************************!*\
  !*** external ["wp","i18n"] ***!
  \******************************/
(module) {

module.exports = window["wp"]["i18n"];

/***/ },

/***/ "./src/dashboard/changelogs/custom-order-statuses.json"
/*!*************************************************************!*\
  !*** ./src/dashboard/changelogs/custom-order-statuses.json ***!
  \*************************************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('[{"version":"0.1.0","date":"April 2026","notes":["Initial release"]}]');

/***/ },

/***/ "./src/dashboard/changelogs/product-tab-manager.json"
/*!***********************************************************!*\
  !*** ./src/dashboard/changelogs/product-tab-manager.json ***!
  \***********************************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('[{"version":"0.1.0","date":"April 2026","notes":["Initial release"]}]');

/***/ },

/***/ "./src/dashboard/changelogs/quick-view.json"
/*!**************************************************!*\
  !*** ./src/dashboard/changelogs/quick-view.json ***!
  \**************************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('[{"version":"0.1.0","date":"April 2026","notes":["Initial release"]}]');

/***/ },

/***/ "./src/dashboard/changelogs/stock-manager.json"
/*!*****************************************************!*\
  !*** ./src/dashboard/changelogs/stock-manager.json ***!
  \*****************************************************/
(module) {

module.exports = /*#__PURE__*/JSON.parse('[{"version":"0.1.0","date":"April 2026","notes":["Initial release"]}]');

/***/ }

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		if (!(moduleId in __webpack_modules__)) {
/******/ 			delete __webpack_module_cache__[moduleId];
/******/ 			var e = new Error("Cannot find module '" + moduleId + "'");
/******/ 			e.code = 'MODULE_NOT_FOUND';
/******/ 			throw e;
/******/ 		}
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry needs to be wrapped in an IIFE because it needs to be isolated against other modules in the chunk.
(() => {
/*!********************************!*\
  !*** ./src/dashboard/index.js ***!
  \********************************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _App__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./App */ "./src/dashboard/App.js");
/* harmony import */ var _styles_app_scss__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./styles/app.scss */ "./src/dashboard/styles/app.scss");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__);





const {
  nonce
} = window.jwpStkDashboard || {};
if (nonce) {
  _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default().use(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_1___default().createNonceMiddleware(nonce));
}
const container = document.getElementById('jwp-stk-dashboard-app');
if (container) {
  (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.createRoot)(container).render(/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_App__WEBPACK_IMPORTED_MODULE_2__["default"], {}));
}
})();

/******/ })()
;
//# sourceMappingURL=index.js.map