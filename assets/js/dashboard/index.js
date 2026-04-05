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
/* harmony import */ var _components_header__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./components/header */ "./src/dashboard/components/header/index.jsx");
/* harmony import */ var _pages_Dashboard__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./pages/Dashboard */ "./src/dashboard/pages/Dashboard.jsx");
/* harmony import */ var _pages_Modules__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./pages/Modules */ "./src/dashboard/pages/Modules.jsx");
/* harmony import */ var _components_modules_ModuleSettingsPage__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./components/modules/ModuleSettingsPage */ "./src/dashboard/components/modules/ModuleSettingsPage.js");
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
    children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_header__WEBPACK_IMPORTED_MODULE_2__["default"], {
      currentPage: currentPage,
      navigate: navigate
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsxs)("main", {
      className: "jstk-content",
      children: [currentPage === 'dashboard' && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_pages_Dashboard__WEBPACK_IMPORTED_MODULE_3__["default"], {
        navigate: navigate
      }), currentPage === 'modules' && !activeModule && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_pages_Modules__WEBPACK_IMPORTED_MODULE_4__["default"], {
        onOpenModuleSettings: setActiveModule
      }), currentPage === 'modules' && activeModule && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_7__.jsx)(_components_modules_ModuleSettingsPage__WEBPACK_IMPORTED_MODULE_5__["default"], {
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

/***/ "./src/dashboard/components/header/index.jsx"
/*!***************************************************!*\
  !*** ./src/dashboard/components/header/index.jsx ***!
  \***************************************************/
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
          height: "60",
          viewBox: "0 0 114 131",
          fill: "none",
          xmlns: "http://www.w3.org/2000/svg",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            d: "M7.504 86.5297C7.49686 86.5708 7.49506 86.6104 7.49666 86.652C7.49647 86.694 7.49581 86.7343 7.50566 86.7746C7.51289 86.8194 7.53035 86.8596 7.54827 86.9016C7.55899 86.9274 7.55921 86.9531 7.57349 86.9779L19.7899 108.145L19.7926 108.149C19.7979 108.158 19.8087 108.162 19.814 108.171C19.8669 108.255 19.9353 108.332 20.0279 108.385C20.1205 108.439 20.2197 108.46 20.32 108.464C20.3316 108.464 20.3411 108.471 20.3516 108.471L20.3545 108.471L44.7865 108.463L69.2228 108.47C69.252 108.469 69.2744 108.456 69.3014 108.454C69.3467 108.448 69.3909 108.442 69.4327 108.427C69.4721 108.414 69.5078 108.394 69.5434 108.374C69.5802 108.354 69.6143 108.332 69.6463 108.305C69.6796 108.276 69.7067 108.242 69.7358 108.205C69.7518 108.182 69.7748 108.169 69.7892 108.144L82.0074 86.9811L94.2224 65.8241L106.441 44.6604C106.448 44.648 106.448 44.6339 106.454 44.6226C106.466 44.5976 106.477 44.5726 106.485 44.5456C106.494 44.5163 106.503 44.4882 106.509 44.457C106.514 44.427 106.518 44.3992 106.52 44.3701C106.521 44.3573 106.528 44.346 106.528 44.3337C106.527 44.3214 106.52 44.3099 106.52 44.2976C106.517 44.2677 106.515 44.2407 106.508 44.211C106.502 44.1803 106.495 44.1524 106.485 44.1238C106.474 44.0951 106.466 44.0706 106.452 44.0447C106.446 44.032 106.446 44.0186 106.44 44.0078L94.2163 22.8479C94.202 22.8231 94.1801 22.8089 94.1627 22.7868C94.1357 22.7502 94.1096 22.717 94.0735 22.6857C94.0413 22.658 94.007 22.6367 93.969 22.6163C93.934 22.5961 93.9002 22.5765 93.8612 22.5631C93.8171 22.5482 93.7737 22.5426 93.7261 22.5363C93.6995 22.5329 93.6762 22.521 93.6494 22.5206L69.2226 22.5202C69.2074 22.5204 69.1941 22.5278 69.1801 22.5287C69.1548 22.5307 69.1318 22.534 69.1046 22.5394C69.0728 22.5451 69.0431 22.5521 69.0127 22.5631C68.9835 22.5718 68.9589 22.5832 68.9318 22.5962C68.921 22.602 68.9075 22.6018 68.8967 22.6075C68.8852 22.6144 68.8786 22.6257 68.8689 22.6322C68.8434 22.6476 68.8214 22.6649 68.7991 22.6852C68.7757 22.7048 68.7557 22.7264 68.7351 22.7491C68.7151 22.7707 68.6987 22.7914 68.6832 22.8155C68.6767 22.8268 68.664 22.8331 68.6569 22.8455L56.438 44.0093L44.4108 64.841L20.353 64.8353C20.3378 64.8356 20.3256 64.8436 20.3133 64.844C20.2852 64.8459 20.261 64.8485 20.2321 64.8544C20.2002 64.86 20.1735 64.8672 20.143 64.8782C20.1132 64.8881 20.0892 64.8984 20.0621 64.9113C20.0513 64.9171 20.0379 64.9169 20.027 64.9227C20.0161 64.9285 20.009 64.9409 19.9992 64.9473C19.9738 64.9627 19.9517 64.9801 19.9294 65.0004C19.9061 65.02 19.8861 65.0416 19.8654 65.0643C19.8461 65.0847 19.8295 65.1083 19.8135 65.1307C19.807 65.142 19.7944 65.1482 19.7879 65.1595L7.56896 86.3233C7.55527 86.347 7.55353 86.3761 7.54274 86.4C7.53009 86.4454 7.51422 86.4859 7.504 86.5297ZM93.2755 23.8255L104.746 43.6817L81.8096 43.6849L70.3542 23.8255L93.2755 23.8255ZM32.9495 87.311L55.876 87.302L44.4108 107.16L21.4849 107.168L32.9495 87.311ZM81.0659 86.0039L58.1345 85.998L69.5977 66.1431L92.5292 66.149L81.0659 86.0039ZM93.2816 64.8458L70.3501 64.8399L81.8107 44.9895L104.747 44.9863L93.2816 64.8458ZM57.381 87.3006L80.3117 87.3076L68.8465 107.166L45.9151 107.16L57.381 87.3006ZM44.4146 66.1487L55.8766 85.9969L32.9501 86.0059L21.4868 66.1419L44.4146 66.1487Z",
            fill: "#008710"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            d: "M94.0737 22.6852C94.1098 22.7166 94.1364 22.7503 94.1634 22.787C94.1807 22.8089 94.202 22.8237 94.2162 22.8484L106.44 44.0088C106.446 44.0195 106.446 44.0325 106.452 44.0448C106.466 44.0707 106.474 44.0952 106.484 44.1238C106.495 44.1523 106.501 44.1802 106.508 44.2108C106.515 44.2401 106.517 44.2674 106.52 44.2971C106.52 44.3094 106.527 44.3218 106.528 44.3341C106.528 44.3463 106.521 44.3579 106.52 44.3707C106.518 44.3996 106.515 44.4274 106.509 44.4573C106.503 44.4885 106.494 44.5168 106.485 44.546C106.477 44.5727 106.465 44.5975 106.454 44.6223C106.447 44.6336 106.449 44.6485 106.442 44.6609L69.7898 108.144L69.7353 108.205C69.7064 108.243 69.6797 108.277 69.6466 108.306C69.6146 108.332 69.5805 108.355 69.5438 108.374C69.5081 108.394 69.4715 108.414 69.4322 108.427C69.3905 108.442 69.3467 108.449 69.3016 108.455C69.2746 108.457 69.2522 108.47 69.223 108.471L20.3551 108.472L20.3523 108.471C20.3419 108.471 20.3318 108.464 20.3203 108.463C20.2202 108.46 20.1207 108.439 20.0283 108.386C19.9357 108.332 19.8669 108.254 19.8141 108.171C19.8087 108.162 19.7984 108.157 19.7932 108.149L19.7905 108.146L7.57359 86.9777C7.55945 86.953 7.55918 86.9271 7.5485 86.9015C7.53063 86.8596 7.51256 86.8197 7.50531 86.7751C7.49548 86.7348 7.49651 86.6944 7.4967 86.6525L7.50403 86.5302C7.51425 86.4864 7.53002 86.445 7.54268 86.3996L7.56892 86.3236L19.788 65.1596C19.7945 65.1484 19.8072 65.1416 19.8137 65.1303C19.8295 65.1081 19.8458 65.0847 19.865 65.0644C19.8856 65.0417 19.9065 65.02 19.9299 65.0004C19.9519 64.9803 19.9735 64.9628 19.9987 64.9475C20.0084 64.9411 20.0167 64.9287 20.0275 64.923C20.0382 64.9174 20.0512 64.9174 20.0618 64.9119C20.0889 64.8989 20.1134 64.8879 20.1432 64.878C20.1735 64.867 20.2002 64.8599 20.2319 64.8542C20.2608 64.8484 20.2849 64.8455 20.313 64.8437L20.3528 64.8358L44.4116 64.8411L68.6574 22.8461C68.6645 22.8337 68.6772 22.827 68.6837 22.8157C68.6991 22.7917 68.7152 22.7712 68.735 22.7498C68.7557 22.7271 68.7755 22.7047 68.7988 22.6851C68.821 22.665 68.8434 22.6482 68.8687 22.6328C68.8784 22.6264 68.885 22.6146 68.8965 22.6077C68.9073 22.6019 68.9217 22.6019 68.9325 22.5962C68.9593 22.5833 68.9843 22.5721 69.0132 22.5634C69.0435 22.5524 69.073 22.5454 69.1048 22.5398C69.1319 22.5344 69.155 22.5309 69.1802 22.5289L69.2228 22.5212L93.6494 22.5211C93.6761 22.5216 93.6995 22.5326 93.726 22.536C93.7736 22.5423 93.8178 22.5481 93.8619 22.563C93.9006 22.5764 93.9345 22.5961 93.9694 22.6162C94.0072 22.6365 94.0416 22.6577 94.0737 22.6852ZM8.88794 86.647L20.3555 106.518L31.8213 86.6583L20.3573 66.7941L20.3537 66.7876L8.88794 86.647ZM32.9499 87.3114L21.4854 107.169L44.4108 107.161L55.876 87.3022L32.9499 87.3114ZM57.3811 87.3007L45.9153 107.16L68.8472 107.166L80.3124 87.3079L57.3811 87.3007ZM21.4867 66.1419L32.9507 86.0061L55.8767 85.997L44.4152 66.1489L21.4867 66.1419ZM69.598 66.1429L58.1347 85.9978L81.0667 86.0039L92.53 66.1489L69.598 66.1429ZM81.8107 44.9899L70.35 64.8405L93.2819 64.8465L104.748 44.9871L81.8107 44.9899ZM70.3546 23.826L81.8097 43.6851L104.747 43.6823L93.2755 23.8257L70.3546 23.826ZM45.5421 65.4908L45.5446 65.4967L57.0061 85.3448L80.6814 44.3379L69.2241 24.4775L69.2232 24.4741L45.5421 65.4908Z",
            fill: "#252422"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            d: "M106.442 44.6605L106.454 44.6225C106.465 44.5977 106.477 44.5728 106.485 44.5461C106.494 44.517 106.504 44.4888 106.51 44.4578C106.515 44.4279 106.518 44.3994 106.52 44.3704C106.522 44.3578 106.528 44.3461 106.528 44.334L106.52 44.2976C106.518 44.268 106.515 44.2397 106.508 44.2104L106.485 44.1242C106.474 44.0957 106.466 44.0706 106.452 44.0448C106.446 44.0325 106.446 44.0196 106.44 44.0089L94.2167 22.8488C94.2025 22.8241 94.1809 22.8092 94.1635 22.7873C94.1365 22.7506 94.1101 22.7166 94.0741 22.6852C94.042 22.6578 94.0076 22.637 93.9699 22.6167L93.8627 22.5632C93.8186 22.5483 93.7739 22.5422 93.7263 22.5358C93.6998 22.5324 93.6764 22.5219 93.6497 22.5214L69.2231 22.5215L69.1807 22.5288C69.1555 22.5308 69.1322 22.5348 69.1051 22.5402L69.0142 22.5633C68.9853 22.572 68.9594 22.5836 68.9326 22.5964L68.8971 22.6077L68.8695 22.6329C68.8442 22.6482 68.8212 22.6653 68.799 22.6855L68.7358 22.7498L68.6843 22.8162C68.6778 22.8272 68.6651 22.8336 68.6579 22.8458L44.4118 64.8413L20.3536 64.8356L20.3132 64.844C20.2854 64.8459 20.2613 64.8486 20.2326 64.8544L20.1435 64.8777C20.1137 64.8876 20.0892 64.8989 20.0622 64.9119L20.0278 64.9229C20.0171 64.9286 20.0092 64.9412 19.9995 64.9476C19.9745 64.9628 19.9527 64.9804 19.9308 65.0003C19.9075 65.0199 19.8864 65.0419 19.8658 65.0645C19.8466 65.0848 19.8295 65.1083 19.8137 65.1306C19.8071 65.1416 19.7948 65.1487 19.7884 65.1598L7.56933 86.3238L7.54342 86.3994C7.5308 86.4447 7.51467 86.4863 7.50444 86.53L7.49708 86.6526C7.49689 86.6946 7.49584 86.735 7.50566 86.7752C7.51291 86.8199 7.53124 86.8602 7.54911 86.902C7.5596 86.9275 7.56018 86.9535 7.57423 86.9781L19.791 108.145L19.7937 108.149C19.7989 108.158 19.8091 108.162 19.8144 108.171L19.8575 108.232C19.888 108.272 19.9231 108.309 19.9635 108.341L20.0282 108.386C20.1206 108.439 20.2205 108.46 20.3205 108.463C20.332 108.464 20.3425 108.472 20.353 108.472L20.3559 108.472L69.2231 108.471L69.3023 108.455C69.3472 108.45 69.3907 108.442 69.4322 108.428C69.4715 108.414 69.5087 108.394 69.5444 108.374C69.5627 108.364 69.5806 108.354 69.5977 108.343L69.6474 108.305C69.6803 108.277 69.7071 108.242 69.7359 108.205L69.7899 108.144L106.442 44.6605ZM19.2533 108.778C19.2564 108.781 19.2595 108.783 19.2609 108.784C19.2599 108.783 19.2548 108.779 19.2485 108.773C19.2503 108.775 19.2519 108.776 19.2533 108.778ZM19.2224 108.749C19.2259 108.752 19.2296 108.755 19.2327 108.758C19.2288 108.755 19.225 108.75 19.2204 108.746C19.2212 108.746 19.2217 108.748 19.2224 108.749ZM20.2422 109.286C20.2494 109.287 20.2568 109.289 20.2644 109.29L20.2645 109.288C20.2571 109.287 20.2497 109.287 20.2422 109.286ZM20.3577 66.7943L31.8216 86.658L20.3559 106.517L8.88839 86.6467L20.3541 66.7875L20.3577 66.7943ZM44.411 107.16L21.4861 107.169L32.9506 87.3117L55.8763 87.3019L44.411 107.16ZM9.84405 86.6469L20.356 104.862L30.8659 86.6579L20.3539 68.4432L9.84405 86.6469ZM33.4289 88.1386L22.9206 106.339L43.9335 106.332L54.4421 88.1306L33.4289 88.1386ZM68.8481 107.166L45.9157 107.16L57.3814 87.301L80.3134 87.3079L68.8481 107.166ZM57.8593 88.1285L47.3494 106.332L68.3705 106.338L78.8804 88.1344L57.8593 88.1285ZM55.8775 85.9968L32.9511 86.0062L21.4876 66.1418L44.4155 66.1491L55.8775 85.9968ZM22.9205 66.9691L33.4285 85.1777L54.4439 85.1691L43.9371 66.9762L22.9205 66.9691ZM19.5294 64.2683C19.5345 64.2648 19.5395 64.2611 19.5448 64.2576L19.5434 64.2568C19.5384 64.2602 19.5341 64.265 19.5294 64.2683ZM19.7826 64.1336C19.7661 64.1393 19.7473 64.1476 19.7262 64.157C19.7422 64.1495 19.7614 64.1425 19.7826 64.1336ZM81.067 86.0041L58.1353 85.9984L69.5986 66.1434L92.5303 66.1491L81.067 86.0041ZM69.2249 24.4779L80.6817 44.3376L57.0063 85.3447L45.5455 65.4967L45.5422 65.4911L69.2233 24.4742L69.2249 24.4779ZM70.0765 66.9709L59.5691 85.1704L80.5894 85.1759L91.0969 66.9764L70.0765 66.9709ZM46.4982 65.4905L57.0065 83.689L79.7261 44.3374L69.2227 26.1305L46.4982 65.4905ZM93.2824 64.8464L70.3507 64.8407L81.8116 44.9899L104.748 44.9872L93.2824 64.8464ZM82.2895 45.8174L71.7845 64.0127L92.8048 64.0182L103.314 45.8152L82.2895 45.8174ZM104.747 43.6821L81.8098 43.685L70.3555 23.8258L93.2755 23.8258L104.747 43.6821ZM71.7877 24.6527L82.2884 42.8562L103.314 42.8544L92.7975 24.6521L71.7877 24.6527ZM107.342 44.4567C107.341 44.4652 107.34 44.4735 107.339 44.4819C107.34 44.4741 107.343 44.4659 107.343 44.4575L107.342 44.4567ZM107.193 43.6793C107.201 43.6948 107.207 43.7107 107.214 43.7255C107.208 43.7113 107.203 43.6953 107.195 43.6795L107.193 43.6793ZM70.4647 108.631L70.4084 108.694L70.3544 108.756C70.3189 108.8 70.2621 108.867 70.1904 108.93L70.1842 108.936L70.1774 108.941C70.1039 109.002 70.027 109.052 69.9494 109.095L69.9497 109.096C69.914 109.116 69.8237 109.166 69.711 109.206L69.7113 109.207C69.7094 109.207 69.7071 109.207 69.7051 109.208C69.7031 109.208 69.7015 109.21 69.6995 109.211L69.6992 109.21C69.6047 109.243 69.5177 109.258 69.4549 109.268C69.4433 109.271 69.4297 109.275 69.4151 109.278C69.3746 109.287 69.3211 109.296 69.2578 109.299L69.2408 109.299L69.2231 109.299L20.3558 109.299L20.3308 109.299L20.3063 109.298L20.3034 109.298L20.3032 109.295C20.2603 109.293 20.2226 109.288 20.1906 109.282C20.0177 109.265 19.8159 109.219 19.6151 109.103C19.4127 108.986 19.2705 108.833 19.1713 108.695L19.1161 108.632L6.85706 87.391L6.85576 87.3884C6.80718 87.3034 6.78115 87.2239 6.76777 87.1771C6.749 87.1309 6.72308 87.0564 6.70372 86.9711L6.70152 86.9717C6.69809 86.9577 6.69705 86.9432 6.69429 86.9293C6.69294 86.922 6.69026 86.915 6.68907 86.9076L6.69017 86.9073C6.66634 86.7731 6.66937 86.6571 6.66947 86.649L6.66977 86.6258L6.67078 86.603L6.67814 86.4804L6.68266 86.4111L6.6984 86.3418C6.71121 86.287 6.7262 86.2399 6.73386 86.2157C6.73906 86.1993 6.74024 86.1961 6.74321 86.1866C6.74421 86.1834 6.74499 86.181 6.74545 86.1795C6.74587 86.1781 6.74596 86.177 6.74596 86.177L6.75249 86.1528L6.76111 86.1297L6.78742 86.0534L6.81291 85.9786L19.0736 64.7425L19.1348 64.6509C19.1463 64.636 19.1584 64.6238 19.1683 64.6124C19.1887 64.5849 19.2187 64.5465 19.2535 64.5085C19.2552 64.5065 19.257 64.5043 19.2589 64.5023C19.2606 64.5005 19.2616 64.4981 19.2633 64.4964C19.2891 64.4683 19.3272 64.43 19.374 64.3886C19.3816 64.3817 19.3892 64.374 19.3982 64.3661C19.4206 64.3466 19.4486 64.3254 19.4799 64.3022C19.4823 64.3001 19.4842 64.2972 19.4868 64.2951C19.5175 64.2693 19.5694 64.2293 19.6397 64.192L19.6479 64.1874C19.7101 64.1553 19.7646 64.1371 19.7986 64.1269L19.8008 64.1263C19.8201 64.1185 19.8404 64.1087 19.8632 64.1007L19.8622 64.0992C19.9307 64.0744 19.9977 64.0569 20.069 64.0432C20.1134 64.0343 20.1541 64.0285 20.1929 64.0242L20.2721 64.0083L20.3532 64.0085L43.9343 64.013L67.9411 22.4319C67.9757 22.3721 68.0122 22.3263 68.0403 22.2941C68.0686 22.2562 68.0973 22.2208 68.1278 22.1878C68.1429 22.1709 68.1871 22.1229 68.2422 22.0737C68.2787 22.0404 68.316 22.0096 68.3553 21.9813C68.3841 21.9569 68.4219 21.9283 68.4685 21.9001L68.4877 21.8878L68.5083 21.8764C68.5428 21.8581 68.5747 21.8447 68.6017 21.8342C68.6139 21.8295 68.6255 21.825 68.6361 21.8214C68.6631 21.8098 68.6963 21.7986 68.7331 21.786L68.7329 21.7849C68.8203 21.7533 68.898 21.7356 68.9599 21.7246L68.9602 21.7257C68.983 21.7214 69.0075 21.7186 69.0336 21.7149L69.0765 21.707L69.1493 21.694L69.2232 21.6937L93.6498 21.6936L93.6563 21.6936L93.6635 21.6941C93.7513 21.6955 93.825 21.7108 93.8658 21.7203C93.9185 21.7275 94.021 21.743 94.1277 21.7791L94.1341 21.781C94.2355 21.8162 94.3203 21.8643 94.3616 21.8881C94.3656 21.8902 94.3694 21.8927 94.3735 21.8949C94.3775 21.8972 94.3813 21.8985 94.3838 21.8999C94.411 21.915 94.442 21.9329 94.4753 21.9546L94.6126 22.0563L94.6174 22.0609C94.6973 22.1304 94.7555 22.2011 94.7953 22.2523C94.824 22.2825 94.8826 22.3454 94.9343 22.4352L94.9332 22.4355L107.157 43.595L107.17 43.6153L107.18 43.6373C107.21 43.6969 107.228 43.7488 107.237 43.7812C107.25 43.8139 107.261 43.8357 107.261 43.8381C107.294 43.926 107.311 44.0032 107.319 44.0439L107.317 44.0438C107.327 44.0902 107.335 44.132 107.339 44.1664C107.341 44.1776 107.344 44.19 107.346 44.2031C107.35 44.2315 107.354 44.2658 107.355 44.3047L107.355 44.3076C107.358 44.3925 107.347 44.4628 107.338 44.5093C107.337 44.5146 107.335 44.5197 107.334 44.5246L107.325 44.6016L107.323 44.6127L107.278 44.7835C107.276 44.7882 107.275 44.7934 107.274 44.7981C107.259 44.8455 107.241 44.8883 107.228 44.9192C107.213 44.9625 107.192 45.0165 107.159 45.0744L70.4647 108.631Z",
            fill: "#252422"
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("path", {
            d: "M47.0679 106.413L57.4141 88.0385H79.7619L69.0018 106.413H47.0679Z",
            fill: "#008710"
          })]
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "jstk-header__title",
        children: "Store Toolkit for WooCommerce"
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
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_1__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_0__.Button, {
        variant: "secondary",
        onClick: onConfigure,
        style: {
          visibility: module.active ? 'visible' : 'hidden'
        },
        tabIndex: module.active ? undefined : -1,
        children: "Open"
      })]
    })]
  });
}

/***/ },

/***/ "./src/dashboard/components/modules/ModuleSettingsPage.js"
/*!****************************************************************!*\
  !*** ./src/dashboard/components/modules/ModuleSettingsPage.js ***!
  \****************************************************************/
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
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../ui */ "./src/dashboard/components/ui/index.js");
/* harmony import */ var _module_views_StockManagerTable__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./module-views/StockManagerTable */ "./src/dashboard/components/modules/module-views/StockManagerTable.jsx");
/* harmony import */ var _changelogs_stock_manager_json__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../changelogs/stock-manager.json */ "./src/dashboard/changelogs/stock-manager.json");
/* harmony import */ var _changelogs_custom_order_statuses_json__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../changelogs/custom-order-statuses.json */ "./src/dashboard/changelogs/custom-order-statuses.json");
/* harmony import */ var _changelogs_quick_view_json__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../changelogs/quick-view.json */ "./src/dashboard/changelogs/quick-view.json");
/* harmony import */ var _changelogs_product_tab_manager_json__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../changelogs/product-tab-manager.json */ "./src/dashboard/changelogs/product-tab-manager.json");
/* harmony import */ var _module_tabs_QuickViewSettings__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./module-tabs/QuickViewSettings */ "./src/dashboard/components/modules/module-tabs/QuickViewSettings.js");
/* harmony import */ var _module_tabs_CustomOrderStatusesSettings__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./module-tabs/CustomOrderStatusesSettings */ "./src/dashboard/components/modules/module-tabs/CustomOrderStatusesSettings.js");
/* harmony import */ var _module_tabs_CustomOrderStatusesDefaultStatuses__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./module-tabs/CustomOrderStatusesDefaultStatuses */ "./src/dashboard/components/modules/module-tabs/CustomOrderStatusesDefaultStatuses.js");
/* harmony import */ var _module_tabs_StockManagerSettings__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./module-tabs/StockManagerSettings */ "./src/dashboard/components/modules/module-tabs/StockManagerSettings.js");
/* harmony import */ var _module_tabs_ProductTabManagerSettings__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./module-tabs/ProductTabManagerSettings */ "./src/dashboard/components/modules/module-tabs/ProductTabManagerSettings.js");
/* harmony import */ var _module_tabs_ProductTabManagerDefaultTabs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./module-tabs/ProductTabManagerDefaultTabs */ "./src/dashboard/components/modules/module-tabs/ProductTabManagerDefaultTabs.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__);






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
    SettingsComponent: _module_tabs_StockManagerSettings__WEBPACK_IMPORTED_MODULE_13__["default"]
  },
  'custom-order-statuses': {
    changelog: _changelogs_custom_order_statuses_json__WEBPACK_IMPORTED_MODULE_7__,
    operationalTabs: [{
      name: 'custom-statuses',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Custom Statuses', 'jetix-store-toolkit'),
      Component: _module_tabs_CustomOrderStatusesSettings__WEBPACK_IMPORTED_MODULE_11__["default"]
    }, {
      name: 'default-statuses',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default Statuses', 'jetix-store-toolkit'),
      Component: _module_tabs_CustomOrderStatusesDefaultStatuses__WEBPACK_IMPORTED_MODULE_12__["default"]
    }],
    SettingsComponent: null
  },
  'quick-view': {
    changelog: _changelogs_quick_view_json__WEBPACK_IMPORTED_MODULE_8__,
    operationalTabs: [],
    SettingsComponent: _module_tabs_QuickViewSettings__WEBPACK_IMPORTED_MODULE_10__["default"]
  },
  'product-tab-manager': {
    changelog: _changelogs_product_tab_manager_json__WEBPACK_IMPORTED_MODULE_9__,
    operationalTabs: [{
      name: 'custom-tabs',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Custom Tabs', 'jetix-store-toolkit'),
      Component: _module_tabs_ProductTabManagerSettings__WEBPACK_IMPORTED_MODULE_14__["default"]
    }, {
      name: 'default-tabs',
      title: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default Tabs', 'jetix-store-toolkit'),
      Component: _module_tabs_ProductTabManagerDefaultTabs__WEBPACK_IMPORTED_MODULE_15__["default"]
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
      className: "jstk-loading",
      style: {
        justifyContent: 'center',
        minHeight: '200px'
      },
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {})
    });
  }
  if (!module) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
      style: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '200px',
        gap: '16px'
      },
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("p", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Module not found.', 'jetix-store-toolkit')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__.Button, {
        variant: "secondary",
        onClick: onBack,
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('← Back to Modules', 'jetix-store-toolkit')
      })]
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
    className: "jstk-page jstk-module-page",
    children: [notice && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
      status: notice.status,
      isDismissible: true,
      onDismiss: () => setNotice(null),
      children: notice.message
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("aside", {
      className: "jstk-module-page__sidebar",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
        className: "jstk-module-page__back",
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__.Button, {
          variant: "tertiary",
          onClick: onBack,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('← Back to Modules', 'jetix-store-toolkit')
        })
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
        className: "jstk-module-settings-header",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
          className: "jstk-module-settings-header__info",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
            className: "jstk-module-settings-header__title-row",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span", {
                className: `jstk-tier-badge jstk-tier-badge--${module.tier}`,
                children: module.tier
              })
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("h2", {
              className: "jstk-page__title",
              style: {
                marginBottom: 0
              },
              children: module.title
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("p", {
            className: "jstk-page__desc",
            children: module.description
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
          className: "jstk-module-settings-header__toggle",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__.Toggle, {
            id: `module-detail-toggle-${module.slug}`,
            label: module.active ? 'Active' : 'Inactive',
            checked: module.active,
            onChange: handleToggle,
            disabled: toggling
          })
        })]
      }), latestChangelog && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
        className: "jstk-module-page__changelog",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("h4", {
          className: "jstk-module-page__changelog-title",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Latest Module Changes', 'jetix-store-toolkit')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("div", {
          className: "jstk-module-page__changelog-meta",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsxs)("span", {
            className: "jstk-version-tag",
            children: ["v", latestChangelog.version]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("span", {
            className: "jstk-module-page__changelog-date",
            children: latestChangelog.date
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("ul", {
          className: "jstk-module-page__changelog-notes",
          children: latestChangelog.notes.map((note, i) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("li", {
            children: note
          }, i))
        })]
      })]
    }), tabs.length > 0 ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
      className: "jstk-module-page__content",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TabPanel, {
        className: "jstk-settings-tabs",
        tabs: tabs,
        children: tab => {
          const Component = tabMap[tab.name];
          return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
            className: "jstk-settings-tab-content",
            children: Component ? /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)(Component, {}) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
              className: "jstk-empty",
              children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("p", {
                className: "jstk-empty__desc",
                children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No content available.', 'jetix-store-toolkit')
              })
            })
          });
        }
      })
    }) : /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
      className: "jstk-module-page__content",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("div", {
        className: "jstk-empty",
        style: {
          padding: '48px 24px'
        },
        children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_16__.jsx)("p", {
          className: "jstk-empty__desc",
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No configuration available for this module.', 'jetix-store-toolkit')
        })
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ModuleSettingsPage);

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

/***/ "./src/dashboard/components/modules/module-tabs/CustomOrderStatusesDefaultStatuses.js"
/*!********************************************************************************************!*\
  !*** ./src/dashboard/components/modules/module-tabs/CustomOrderStatusesDefaultStatuses.js ***!
  \********************************************************************************************/
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





const CustomOrderStatusesDefaultStatuses = () => {
  const [builtinStatuses, setBuiltinStatuses] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [customLabels, setCustomLabels] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)({});
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const fetchSettings = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    try {
      const data = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/jwp-stk/v1/modules/custom-order-statuses/settings'
      });

      // Build a set of keys belonging to custom statuses so we can exclude them.
      const customKeys = new Set((data.settings.statuses || []).filter(s => s.slug).map(s => 'wc-' + s.slug));
      const filtered = Object.fromEntries(Object.entries(data.builtin_statuses || {}).filter(([key]) => !customKeys.has(key)));
      setBuiltinStatuses(filtered);
      setCustomLabels(data.settings.builtin_labels || {});
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
  const handleLabelChange = (key, value) => {
    setCustomLabels(prev => ({
      ...prev,
      [key]: value
    }));
  };
  const handleSave = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    setSaving(true);
    setNotice(null);
    try {
      await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/jwp-stk/v1/modules/custom-order-statuses/settings',
        method: 'POST',
        data: {
          settings: {
            builtin_labels: customLabels
          }
        }
      });
      setNotice({
        status: 'success',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Default status labels saved.', 'jetix-store-toolkit')
      });
    } catch {
      setNotice({
        status: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Failed to save settings.', 'jetix-store-toolkit')
      });
    } finally {
      setSaving(false);
    }
  }, [customLabels]);
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
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
      className: "jstk-settings-description",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Customise the display labels for the default WooCommerce order statuses. Leave a field blank to use the original label.', 'jetix-store-toolkit')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "jstk-cos-default-statuses",
      children: Object.entries(builtinStatuses).map(([key, originalLabel]) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "jstk-cos-default-row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("code", {
          className: "jstk-cos-default-row__key",
          children: key
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          label: originalLabel,
          placeholder: originalLabel,
          value: customLabels[key] || '',
          onChange: val => handleLabelChange(key, val),
          __nextHasNoMarginBottom: true
        })]
      }, key))
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "jstk-settings-actions",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        variant: "primary",
        onClick: handleSave,
        isBusy: saving,
        disabled: saving,
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Save Labels', 'jetix-store-toolkit')
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (CustomOrderStatusesDefaultStatuses);

/***/ },

/***/ "./src/dashboard/components/modules/module-tabs/CustomOrderStatusesSettings.js"
/*!*************************************************************************************!*\
  !*** ./src/dashboard/components/modules/module-tabs/CustomOrderStatusesSettings.js ***!
  \*************************************************************************************/
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
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ui */ "./src/dashboard/components/ui/index.js");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






const EMPTY_STATUS = {
  label: '',
  slug: '',
  color: '#787c82'
};
function slugify(str) {
  return str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').substring(0, 17);
}
const CustomOrderStatusesSettings = () => {
  const [statuses, setStatuses] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [showAddForm, setShowAddForm] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [newStatus, setNewStatus] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(EMPTY_STATUS);
  const [newSlugEdited, setNewSlugEdited] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [expandedIndex, setExpandedIndex] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [dirty, setDirty] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const fetchSettings = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    try {
      const data = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/jwp-stk/v1/modules/custom-order-statuses/settings'
      });
      setStatuses(data.settings.statuses || []);
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
      setDirty(false);
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
  const handleNewStatusChange = (key, value) => {
    setNewStatus(prev => {
      const updated = {
        ...prev,
        [key]: value
      };
      if (key === 'label' && !newSlugEdited) {
        updated.slug = slugify(value);
      }
      return updated;
    });
    if (key === 'slug') {
      setNewSlugEdited(true);
    }
  };
  const handleAddStatus = () => {
    if (!newStatus.label || !newStatus.slug) {
      return;
    }
    setStatuses(prev => [...prev, {
      ...newStatus
    }]);
    setDirty(true);
    setNewStatus(EMPTY_STATUS);
    setNewSlugEdited(false);
    setShowAddForm(false);
  };
  const handleCancelAdd = () => {
    setNewStatus(EMPTY_STATUS);
    setNewSlugEdited(false);
    setShowAddForm(false);
  };
  const updateStatus = (index, key, value) => {
    setDirty(true);
    setStatuses(prev => {
      const updated = [...prev];
      updated[index] = {
        ...updated[index],
        [key]: value
      };
      if (key === 'label' && !updated[index]._slugEdited) {
        updated[index].slug = slugify(value);
      }
      return updated;
    });
  };
  const removeStatus = index => {
    setDirty(true);
    setStatuses(prev => prev.filter((_, i) => i !== index));
    setExpandedIndex(prev => {
      if (prev === index) return null;
      if (prev > index) return prev - 1;
      return prev;
    });
  };
  const toggleAccordion = index => {
    setExpandedIndex(prev => prev === index ? null : index);
  };
  if (loading) {
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "jstk-loading",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {})
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "jstk-module-settings-form",
    children: [notice && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
      status: notice.status,
      isDismissible: true,
      onDismiss: () => setNotice(null),
      children: notice.message
    }), !showAddForm && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "jstk-cos-top-actions",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        variant: "primary",
        onClick: () => setShowAddForm(true),
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('+ Add New Status', 'jetix-store-toolkit')
      })
    }), showAddForm && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "jstk-cos-add-form",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h4", {
        className: "jstk-cos-add-form__title",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('New Custom Status', 'jetix-store-toolkit')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "jstk-cos-fields",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
          className: "jstk-cos-text-fields",
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Label', 'jetix-store-toolkit'),
            value: newStatus.label,
            onChange: val => handleNewStatusChange('label', val),
            __nextHasNoMarginBottom: true
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
            label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Slug', 'jetix-store-toolkit'),
            value: newStatus.slug,
            onChange: val => handleNewStatusChange('slug', val),
            help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Max 17 characters, lowercase letters, numbers, hyphens.', 'jetix-store-toolkit'),
            __nextHasNoMarginBottom: true
          })]
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__.ColorPicker, {
          id: "jstk-cos-new-color",
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Color', 'jetix-store-toolkit'),
          value: newStatus.color,
          onChange: val => handleNewStatusChange('color', val)
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "jstk-cos-add-form__actions",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          variant: "primary",
          onClick: handleAddStatus,
          disabled: !newStatus.label || !newStatus.slug,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add Status', 'jetix-store-toolkit')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          variant: "tertiary",
          onClick: handleCancelAdd,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Cancel', 'jetix-store-toolkit')
        })]
      })]
    }), statuses.length === 0 && !showAddForm && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
      className: "jstk-settings-description jstk-cos-empty-msg",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No custom statuses yet. Click the button above to add one.', 'jetix-store-toolkit')
    }), statuses.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "jstk-cos-status-list",
      children: statuses.map((status, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: `jstk-cos-accordion${expandedIndex === index ? ' is-open' : ''}`,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("button", {
          type: "button",
          className: "jstk-cos-accordion__header",
          onClick: () => toggleAccordion(index),
          "aria-expanded": expandedIndex === index,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "jstk-cos-accordion__header-left",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "jstk-cos-accordion__color-dot",
              style: {
                background: status.color || '#787c82'
              },
              "aria-hidden": "true"
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "jstk-cos-accordion__label",
              children: status.label || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('(unnamed)', 'jetix-store-toolkit')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("code", {
              className: "jstk-cos-accordion__slug",
              children: ["wc-", status.slug]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "jstk-cos-accordion__header-right",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
              isDestructive: true,
              variant: "tertiary",
              onClick: e => {
                e.stopPropagation();
                removeStatus(index);
              },
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Remove', 'jetix-store-toolkit')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("span", {
              className: "jstk-cos-accordion__chevron",
              "aria-hidden": "true",
              children: expandedIndex === index ? '▲' : '▼'
            })]
          })]
        }), expandedIndex === index && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
          className: "jstk-cos-accordion__body",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
            className: "jstk-cos-fields",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
              className: "jstk-cos-text-fields",
              children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Label', 'jetix-store-toolkit'),
                value: status.label,
                onChange: val => updateStatus(index, 'label', val),
                __nextHasNoMarginBottom: true
              }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
                label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Slug', 'jetix-store-toolkit'),
                value: status.slug,
                onChange: val => {
                  updateStatus(index, 'slug', val);
                  updateStatus(index, '_slugEdited', true);
                },
                help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Max 17 characters, lowercase letters, numbers, hyphens.', 'jetix-store-toolkit'),
                __nextHasNoMarginBottom: true
              })]
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__.ColorPicker, {
              id: `jstk-cos-color-${index}`,
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Color', 'jetix-store-toolkit'),
              value: status.color || '#787c82',
              onChange: val => updateStatus(index, 'color', val)
            })]
          })
        })]
      }, index))
    }), (statuses.length > 0 || dirty) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "jstk-settings-actions",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
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

/***/ "./src/dashboard/components/modules/module-tabs/ProductTabManagerDefaultTabs.js"
/*!**************************************************************************************!*\
  !*** ./src/dashboard/components/modules/module-tabs/ProductTabManagerDefaultTabs.js ***!
  \**************************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ui */ "./src/dashboard/components/ui/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






const ProductTabManagerDefaultTabs = () => {
  const [settings, setSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const fetchSettings = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    try {
      const data = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
        path: '/jwp-stk/v1/modules/product-tab-manager/settings'
      });
      setSettings(data.settings);
    } catch {
      setNotice({
        status: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Failed to load settings.', 'jetix-store-toolkit')
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
      const res = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
        path: '/jwp-stk/v1/modules/product-tab-manager/settings',
        method: 'POST',
        data: {
          settings
        }
      });
      setSettings(res.settings);
      setNotice({
        status: 'success',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Settings saved.', 'jetix-store-toolkit')
      });
    } catch {
      setNotice({
        status: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Failed to save settings.', 'jetix-store-toolkit')
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "jstk-loading",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {})
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "jstk-module-settings-form",
    children: [notice && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
      status: notice.status,
      isDismissible: true,
      onDismiss: () => setNotice(null),
      children: notice.message
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
      className: "jstk-settings-description",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Toggle default WooCommerce product tabs on or off, and optionally rename them.', 'jetix-store-toolkit')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "jstk-ptm-default-tabs",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "jstk-ptm-tab-row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_2__.Toggle, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Description Tab', 'jetix-store-toolkit'),
          checked: !settings.disable_description,
          onChange: val => updateSetting('disable_description', !val)
        }), !settings.disable_description && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom Title', 'jetix-store-toolkit'),
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Description', 'jetix-store-toolkit'),
          value: settings.description_title || '',
          onChange: val => updateSetting('description_title', val),
          __nextHasNoMarginBottom: true
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "jstk-ptm-tab-row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_2__.Toggle, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Additional Information Tab', 'jetix-store-toolkit'),
          checked: !settings.disable_additional_info,
          onChange: val => updateSetting('disable_additional_info', !val)
        }), !settings.disable_additional_info && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom Title', 'jetix-store-toolkit'),
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Additional information', 'jetix-store-toolkit'),
          value: settings.additional_information_title || '',
          onChange: val => updateSetting('additional_information_title', val),
          __nextHasNoMarginBottom: true
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
        className: "jstk-ptm-tab-row",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_2__.Toggle, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Reviews Tab', 'jetix-store-toolkit'),
          checked: !settings.disable_reviews,
          onChange: val => updateSetting('disable_reviews', !val)
        }), !settings.disable_reviews && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Custom Title', 'jetix-store-toolkit'),
          placeholder: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Reviews', 'jetix-store-toolkit'),
          value: settings.reviews_title || '',
          onChange: val => updateSetting('reviews_title', val),
          __nextHasNoMarginBottom: true
        })]
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "jstk-settings-actions",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        variant: "primary",
        onClick: handleSave,
        isBusy: saving,
        disabled: saving,
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save Settings', 'jetix-store-toolkit')
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ProductTabManagerDefaultTabs);

/***/ },

/***/ "./src/dashboard/components/modules/module-tabs/ProductTabManagerSettings.js"
/*!***********************************************************************************!*\
  !*** ./src/dashboard/components/modules/module-tabs/ProductTabManagerSettings.js ***!
  \***********************************************************************************/
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





const EMPTY_TAB = {
  title: '',
  content: '',
  priority: 50
};
const ProductTabManagerSettings = () => {
  const [tabs, setTabs] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)([]);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [showAddForm, setShowAddForm] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [newTab, setNewTab] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(EMPTY_TAB);
  const [expandedIndex, setExpandedIndex] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [dirty, setDirty] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const fetchSettings = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    try {
      const data = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_3___default()({
        path: '/jwp-stk/v1/modules/product-tab-manager/settings'
      });
      setTabs(data.settings.custom_tabs || []);
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
          settings: {
            custom_tabs: tabs
          }
        }
      });
      setTabs(res.settings.custom_tabs || []);
      setDirty(false);
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
  }, [tabs]);
  const handleNewTabChange = (key, value) => {
    setNewTab(prev => ({
      ...prev,
      [key]: value
    }));
  };
  const handleAddTab = () => {
    if (!newTab.title) return;
    setTabs(prev => [...prev, {
      ...newTab
    }]);
    setNewTab(EMPTY_TAB);
    setShowAddForm(false);
    setDirty(true);
  };
  const handleCancelAdd = () => {
    setNewTab(EMPTY_TAB);
    setShowAddForm(false);
  };
  const updateTab = (index, key, value) => {
    setTabs(prev => {
      const next = [...prev];
      next[index] = {
        ...next[index],
        [key]: value
      };
      return next;
    });
    setDirty(true);
  };
  const removeTab = index => {
    setTabs(prev => prev.filter((_, i) => i !== index));
    if (expandedIndex === index) setExpandedIndex(null);
    setDirty(true);
  };
  const toggleAccordion = index => {
    setExpandedIndex(prev => prev === index ? null : index);
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
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "jstk-cos-top-actions",
      children: !showAddForm && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        variant: "primary",
        onClick: () => setShowAddForm(true),
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('+ Add New Tab', 'jetix-store-toolkit')
      })
    }), showAddForm && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
      className: "jstk-cos-add-form",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
        className: "jstk-cos-add-form__title",
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('New Custom Tab', 'jetix-store-toolkit')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "jstk-cos-fields",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tab Title', 'jetix-store-toolkit'),
          value: newTab.title,
          onChange: val => handleNewTabChange('title', val),
          __nextHasNoMarginBottom: true
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tab Content', 'jetix-store-toolkit'),
          value: newTab.content,
          onChange: val => handleNewTabChange('content', val),
          rows: 4,
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('HTML is allowed.', 'jetix-store-toolkit'),
          __nextHasNoMarginBottom: true
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
          label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Priority', 'jetix-store-toolkit'),
          type: "number",
          value: newTab.priority,
          onChange: val => handleNewTabChange('priority', parseInt(val, 10) || 50),
          help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Lower number = appears first. Default WC tabs: Description 10, Additional Info 20, Reviews 30.', 'jetix-store-toolkit'),
          __nextHasNoMarginBottom: true
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: "jstk-cos-add-form__actions",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          variant: "primary",
          onClick: handleAddTab,
          disabled: !newTab.title,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Add Tab', 'jetix-store-toolkit')
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
          variant: "tertiary",
          onClick: handleCancelAdd,
          children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Cancel', 'jetix-store-toolkit')
        })]
      })]
    }), tabs.length === 0 && !showAddForm && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("p", {
      className: "jstk-settings-description jstk-cos-empty-msg",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('No custom tabs yet. Click the button above to add one.', 'jetix-store-toolkit')
    }), tabs.length > 0 && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
      className: "jstk-cos-status-list",
      children: tabs.map((tab, index) => /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
        className: `jstk-cos-accordion${expandedIndex === index ? ' is-open' : ''}`,
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("button", {
          type: "button",
          className: "jstk-cos-accordion__header",
          onClick: () => toggleAccordion(index),
          "aria-expanded": expandedIndex === index,
          children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "jstk-cos-accordion__header-left",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
              className: "jstk-cos-accordion__label",
              children: tab.title || (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('(untitled)', 'jetix-store-toolkit')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("span", {
              className: "jstk-ptm-accordion__priority",
              children: [(0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Priority', 'jetix-store-toolkit'), ": ", tab.priority]
            })]
          }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "jstk-cos-accordion__header-right",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
              isDestructive: true,
              variant: "tertiary",
              onClick: e => {
                e.stopPropagation();
                removeTab(index);
              },
              children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Remove', 'jetix-store-toolkit')
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("span", {
              className: "jstk-cos-accordion__chevron",
              "aria-hidden": "true",
              children: expandedIndex === index ? '▲' : '▼'
            })]
          })]
        }), expandedIndex === index && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
          className: "jstk-cos-accordion__body",
          children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsxs)("div", {
            className: "jstk-cos-fields",
            children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tab Title', 'jetix-store-toolkit'),
              value: tab.title,
              onChange: val => updateTab(index, 'title', val),
              __nextHasNoMarginBottom: true
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextareaControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Tab Content', 'jetix-store-toolkit'),
              value: tab.content,
              onChange: val => updateTab(index, 'content', val),
              rows: 4,
              help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('HTML is allowed.', 'jetix-store-toolkit'),
              __nextHasNoMarginBottom: true
            }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
              label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Priority', 'jetix-store-toolkit'),
              type: "number",
              value: tab.priority,
              onChange: val => updateTab(index, 'priority', parseInt(val, 10) || 50),
              help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_2__.__)('Lower number = appears first. Default WC tabs: Description 10, Additional Info 20, Reviews 30.', 'jetix-store-toolkit'),
              __nextHasNoMarginBottom: true
            })]
          })
        })]
      }, index))
    }), (tabs.length > 0 || dirty) && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_4__.jsx)("div", {
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

/***/ "./src/dashboard/components/modules/module-tabs/QuickViewSettings.js"
/*!***************************************************************************!*\
  !*** ./src/dashboard/components/modules/module-tabs/QuickViewSettings.js ***!
  \***************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ui */ "./src/dashboard/components/ui/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






const QuickViewSettings = () => {
  const [settings, setSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const fetchSettings = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    try {
      const data = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
        path: '/jwp-stk/v1/modules/quick-view/settings'
      });
      setSettings(data.settings);
    } catch {
      setNotice({
        status: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Failed to load settings.', 'jetix-store-toolkit')
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
      const res = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
        path: '/jwp-stk/v1/modules/quick-view/settings',
        method: 'POST',
        data: {
          settings
        }
      });
      setSettings(res.settings);
      setNotice({
        status: 'success',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Settings saved.', 'jetix-store-toolkit')
      });
    } catch {
      setNotice({
        status: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Failed to save settings.', 'jetix-store-toolkit')
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "jstk-loading",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {})
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "jstk-module-settings-form",
    children: [notice && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
      status: notice.status,
      isDismissible: true,
      onDismiss: () => setNotice(null),
      children: notice.message
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Button Label', 'jetix-store-toolkit'),
      value: settings.button_label || '',
      onChange: val => updateSetting('button_label', val),
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.SelectControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Button Position', 'jetix-store-toolkit'),
      value: settings.button_position || 'after_add_to_cart',
      options: [{
        value: 'before_add_to_cart',
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Before Add to Cart', 'jetix-store-toolkit')
      }, {
        value: 'after_add_to_cart',
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('After Add to Cart', 'jetix-store-toolkit')
      }],
      onChange: val => updateSetting('button_position', val),
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "jstk-module-settings-extras",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h3", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Modal Content', 'jetix-store-toolkit')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_2__.Toggle, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show Gallery', 'jetix-store-toolkit'),
        checked: !!settings.show_gallery,
        onChange: val => updateSetting('show_gallery', val)
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_2__.Toggle, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show Price', 'jetix-store-toolkit'),
        checked: !!settings.show_price,
        onChange: val => updateSetting('show_price', val)
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_2__.Toggle, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show Rating', 'jetix-store-toolkit'),
        checked: !!settings.show_rating,
        onChange: val => updateSetting('show_rating', val)
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_2__.Toggle, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show Short Description', 'jetix-store-toolkit'),
        checked: !!settings.show_excerpt,
        onChange: val => updateSetting('show_excerpt', val)
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_2__.Toggle, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show Add to Cart', 'jetix-store-toolkit'),
        checked: !!settings.show_add_to_cart,
        onChange: val => updateSetting('show_add_to_cart', val)
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_2__.Toggle, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show Product Meta', 'jetix-store-toolkit'),
        checked: !!settings.show_meta,
        onChange: val => updateSetting('show_meta', val)
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "jstk-settings-actions",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        variant: "primary",
        onClick: handleSave,
        isBusy: saving,
        disabled: saving,
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save Settings', 'jetix-store-toolkit')
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (QuickViewSettings);

/***/ },

/***/ "./src/dashboard/components/modules/module-tabs/StockManagerSettings.js"
/*!******************************************************************************!*\
  !*** ./src/dashboard/components/modules/module-tabs/StockManagerSettings.js ***!
  \******************************************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @wordpress/element */ "@wordpress/element");
/* harmony import */ var _wordpress_element__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_wordpress_element__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @wordpress/components */ "@wordpress/components");
/* harmony import */ var _wordpress_components__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../ui */ "./src/dashboard/components/ui/index.js");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @wordpress/i18n */ "@wordpress/i18n");
/* harmony import */ var _wordpress_i18n__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @wordpress/api-fetch */ "@wordpress/api-fetch");
/* harmony import */ var _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default = /*#__PURE__*/__webpack_require__.n(_wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4__);
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__);






const StockManagerSettings = () => {
  const [settings, setSettings] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const [loading, setLoading] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(true);
  const [saving, setSaving] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(false);
  const [notice, setNotice] = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useState)(null);
  const fetchSettings = (0,_wordpress_element__WEBPACK_IMPORTED_MODULE_0__.useCallback)(async () => {
    try {
      const data = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
        path: '/jwp-stk/v1/modules/stock-manager/settings'
      });
      setSettings(data.settings);
    } catch {
      setNotice({
        status: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Failed to load settings.', 'jetix-store-toolkit')
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
      const res = await _wordpress_api_fetch__WEBPACK_IMPORTED_MODULE_4___default()({
        path: '/jwp-stk/v1/modules/stock-manager/settings',
        method: 'POST',
        data: {
          settings
        }
      });
      setSettings(res.settings);
      setNotice({
        status: 'success',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Settings saved.', 'jetix-store-toolkit')
      });
    } catch {
      setNotice({
        status: 'error',
        message: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Failed to save settings.', 'jetix-store-toolkit')
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
    return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "jstk-loading",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Spinner, {})
    });
  }
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
    className: "jstk-module-settings-form",
    children: [notice && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Notice, {
      status: notice.status,
      isDismissible: true,
      onDismiss: () => setNotice(null),
      children: notice.message
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("p", {
      className: "jstk-settings-description",
      children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Configure the Stock Manager table below. Changes apply immediately to the Stock Manager operations view.', 'jetix-store-toolkit')
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Products Per Page', 'jetix-store-toolkit'),
      type: "number",
      min: 5,
      max: 100,
      value: settings.per_page || 20,
      onChange: val => updateSetting('per_page', parseInt(val, 10) || 20),
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.TextControl, {
      label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Low Stock Threshold', 'jetix-store-toolkit'),
      type: "number",
      min: 0,
      value: settings.low_stock_threshold || 5,
      onChange: val => updateSetting('low_stock_threshold', parseInt(val, 10) || 5),
      help: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Products with stock at or below this number are flagged as low stock.', 'jetix-store-toolkit'),
      __nextHasNoMarginBottom: true
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsxs)("div", {
      className: "jstk-module-settings-extras",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("h3", {
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Display Columns', 'jetix-store-toolkit')
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_2__.Toggle, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show SKU', 'jetix-store-toolkit'),
        checked: !!settings.show_sku,
        onChange: val => updateSetting('show_sku', val)
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_2__.Toggle, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show Stock Status', 'jetix-store-toolkit'),
        checked: !!settings.show_stock_status,
        onChange: val => updateSetting('show_stock_status', val)
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_2__.Toggle, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show Manage Stock', 'jetix-store-toolkit'),
        checked: !!settings.show_manage_stock,
        onChange: val => updateSetting('show_manage_stock', val)
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_2__.Toggle, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show Stock Quantity', 'jetix-store-toolkit'),
        checked: !!settings.show_stock_quantity,
        onChange: val => updateSetting('show_stock_quantity', val)
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_2__.Toggle, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show Backorders', 'jetix-store-toolkit'),
        checked: !!settings.show_backorders,
        onChange: val => updateSetting('show_backorders', val)
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_2__.Toggle, {
        label: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Show Low Stock Filter', 'jetix-store-toolkit'),
        checked: !!settings.show_low_stock,
        onChange: val => updateSetting('show_low_stock', val)
      })]
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)("div", {
      className: "jstk-settings-actions",
      children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_wordpress_components__WEBPACK_IMPORTED_MODULE_1__.Button, {
        variant: "primary",
        onClick: handleSave,
        isBusy: saving,
        disabled: saving,
        children: (0,_wordpress_i18n__WEBPACK_IMPORTED_MODULE_3__.__)('Save Settings', 'jetix-store-toolkit')
      })
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (StockManagerSettings);

/***/ },

/***/ "./src/dashboard/components/modules/module-views/StockManagerTable.jsx"
/*!*****************************************************************************!*\
  !*** ./src/dashboard/components/modules/module-views/StockManagerTable.jsx ***!
  \*****************************************************************************/
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
/* harmony import */ var _ui__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../ui */ "./src/dashboard/components/ui/index.js");
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
                children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_5__.jsx)(_ui__WEBPACK_IMPORTED_MODULE_4__.Toggle, {
                  id: `manage-stock-${product.id}`,
                  checked: !!currentManageStock,
                  onChange: val => handleFieldChange(product.id, 'manage_stock', val)
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

function SettingsSidebar() {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("aside", {
    className: "jstk-settings-sidebar",
    children: /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "jstk-settings-sidebar__widget jstk-settings-sidebar__widget--feedback",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("h3", {
        className: "jstk-settings-sidebar__widget-title",
        children: ['👋', " Thank you for using our plugin!"]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "jstk-settings-sidebar__widget-text",
        children: "We are currently looking for your feedback to improve it further for most use cases. If you have something to suggest, please feel free to drop your request by clicking the below button."
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("p", {
        className: "jstk-settings-sidebar__widget-text",
        children: "If you like this plugin, you will absolutely love our other plugins. Check them out here:"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
        className: "jstk-settings-sidebar__widget-actions",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
          href: "https://jetixwp.com/plugins",
          className: "jstk-settings-sidebar__plugin-btn",
          target: "_blank",
          rel: "noreferrer",
          children: "View All Plugins"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("a", {
          href: "https://jetixwp.com/contact",
          className: "jstk-settings-sidebar__plugin-btn secondary",
          target: "_blank",
          rel: "noreferrer",
          children: "Submit a Request"
        })]
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("p", {
        className: "jstk-settings-sidebar__widget-note",
        children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("em", {
          children: "Thank you for using our Store Toolkit for WooCommerce again, you are not just any supporter but truly the builders of our small but mighty product agency."
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("strong", {
          children: "Krishna Kant Chourasiya"
        }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("br", {}), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("em", {
          children: "Founder and Lead Developer at JetixWP"
        })]
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
      fill: "#008710"
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

/***/ "./src/dashboard/components/ui/ColorPicker/index.jsx"
/*!***********************************************************!*\
  !*** ./src/dashboard/components/ui/ColorPicker/index.jsx ***!
  \***********************************************************/
(__unused_webpack_module, __webpack_exports__, __webpack_require__) {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-runtime */ "react/jsx-runtime");
/* harmony import */ var react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__);

const ColorPicker = ({
  id,
  label,
  value,
  onChange
}) => {
  return /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
    className: "jstk-color-picker",
    children: [label && /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("label", {
      className: "jstk-color-picker__label",
      htmlFor: id,
      children: label
    }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxs)("div", {
      className: "jstk-color-picker__swatch",
      children: [/*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("span", {
        className: "jstk-color-picker__preview",
        style: {
          background: value
        },
        "aria-hidden": "true"
      }), /*#__PURE__*/(0,react_jsx_runtime__WEBPACK_IMPORTED_MODULE_0__.jsx)("input", {
        type: "color",
        id: id,
        className: "jstk-color-picker__input",
        value: value,
        onChange: e => onChange && onChange(e.target.value)
      })]
    })]
  });
};
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (ColorPicker);

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
/* harmony export */   ColorPicker: () => (/* reexport safe */ _ColorPicker_index__WEBPACK_IMPORTED_MODULE_2__["default"]),
/* harmony export */   Notice: () => (/* reexport safe */ _Notice_index__WEBPACK_IMPORTED_MODULE_3__["default"]),
/* harmony export */   Toggle: () => (/* reexport safe */ _Toggle_index__WEBPACK_IMPORTED_MODULE_4__["default"])
/* harmony export */ });
/* harmony import */ var _Button_index__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./Button/index */ "./src/dashboard/components/ui/Button/index.jsx");
/* harmony import */ var _Checkbox_index__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./Checkbox/index */ "./src/dashboard/components/ui/Checkbox/index.jsx");
/* harmony import */ var _ColorPicker_index__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./ColorPicker/index */ "./src/dashboard/components/ui/ColorPicker/index.jsx");
/* harmony import */ var _Notice_index__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./Notice/index */ "./src/dashboard/components/ui/Notice/index.jsx");
/* harmony import */ var _Toggle_index__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./Toggle/index */ "./src/dashboard/components/ui/Toggle/index.jsx");






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
        children: "Global Settings"
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
  title: 'Compatibility',
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