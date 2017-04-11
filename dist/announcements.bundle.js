define("8f7f94e6-353c-4940-b742-743385655a15_0.0.1", ["@microsoft/sp-core-library","@microsoft/sp-webpart-base","@microsoft/sp-lodash-subset","announcementsStrings","@microsoft/sp-http"], function(__WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_11__) { return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	var __extends = (this && this.__extends) || function (d, b) {
	    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
	    function __() { this.constructor = d; }
	    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	};
	var sp_core_library_1 = __webpack_require__(1);
	var sp_webpart_base_1 = __webpack_require__(2);
	/* Hemendra Patel - Import SP Environment Interactions */
	var sp_lodash_subset_1 = __webpack_require__(3);
	/* Hemendra Patel - Update/Import Style for calendarDate */
	var Announcements_module_scss_1 = __webpack_require__(4);
	var strings = __webpack_require__(9);
	/* Hemendra Patel - ADD Code for Sample Data If rendered on local workbench */
	var MockHttpClient_1 = __webpack_require__(10);
	var sp_core_library_2 = __webpack_require__(1);
	var sp_http_1 = __webpack_require__(11);
	var AnnouncementsWebPart = (function (_super) {
	    __extends(AnnouncementsWebPart, _super);
	    function AnnouncementsWebPart() {
	        return _super !== null && _super.apply(this, arguments) || this;
	    }
	    /* My Code start here */
	    /*
	    private _getListData(): Promise<ISPLists> {
	      return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + `/_api/web/lists?$filter=Hidden eq false`, SPHttpClient.configurations.v1)
	        .then((response: SPHttpClientResponse) => {
	          return response.json();
	        });
	    }
	    */
	    /* Hemendra Patel - Get All SP Announcements from SP List */
	    AnnouncementsWebPart.prototype._getListData = function () {
	        return this.context.spHttpClient.get(this.context.pageContext.web.absoluteUrl + "/_api/web/lists/GetByTitle('Announcements')/Items", sp_http_1.SPHttpClient.configurations.v1)
	            .then(function (response) {
	            return response.json();
	        });
	    };
	    /* Hemendra Patel - Get All Sample Announcements from Mock List */
	    AnnouncementsWebPart.prototype._getMockListData = function () {
	        return MockHttpClient_1.default.get()
	            .then(function (data) {
	            var listData = { value: data };
	            return listData;
	        });
	    };
	    /* Hemendra Patel - Format Date into Month Year */
	    AnnouncementsWebPart.prototype._getMonthYear = function (datestr) {
	        var months;
	        months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
	        var mth = parseInt(datestr.substring(5, 7)) - 1;
	        return (months[mth] + " " + datestr.substring(0, 4));
	    };
	    /* Hemendra Patel - Format Date into Day */
	    AnnouncementsWebPart.prototype._getDay = function (datestr) {
	        return (datestr.substring(8, 10));
	    };
	    /* Hemendra Patel - Check Environment and Render Results */
	    AnnouncementsWebPart.prototype._renderListAsync = function () {
	        var _this = this;
	        // Local environment
	        if (sp_core_library_2.Environment.type === sp_core_library_2.EnvironmentType.Local) {
	            this._getMockListData().then(function (response) {
	                _this._renderList(response.value);
	            });
	        }
	        else if (sp_core_library_2.Environment.type == sp_core_library_2.EnvironmentType.SharePoint ||
	            sp_core_library_2.Environment.type == sp_core_library_2.EnvironmentType.ClassicSharePoint) {
	            this._getListData()
	                .then(function (response) {
	                _this._renderList(response.value);
	            });
	        }
	    };
	    AnnouncementsWebPart.prototype._renderList = function (items) {
	        /*  let html: string = '';
	          items.forEach((item: ISPList) => {
	            html += `
	              <ul class="${styles.list}">
	                  <li class="${styles.listItem}">
	                      <span class="ms-font-l">${item.Title}</span>
	                  </li>
	              </ul>`;
	          });
	        
	          const listContainer: Element = this.domElement.querySelector('#spListContainer');
	          listContainer.innerHTML = html;
	        */
	        var _this = this;
	        var html = '<table width=100% border-collapse: collapse; >';
	        items.forEach(function (item) {
	            html = html + ("\n        <tr>\n        <td width=10%>\n        <div class=\"" + Announcements_module_scss_1.default.calendarDate + "\">\n            <strong>" + _this._getMonthYear(item.Expires) + "</strong>\n            <span>" + _this._getDay(item.Expires) + "</span>\n        </div>\n        <td>\n        <p class=\"ms-font-l ms-fontColor-black\">" + item.Title + "</p>\n        </td>\n    </tr>\n    ");
	        });
	        html += "</table>";
	        var listContainer = this.domElement.querySelector('#spListContainer');
	        listContainer.innerHTML = html;
	    };
	    /* My Code end here */
	    AnnouncementsWebPart.prototype.render = function () {
	        this.domElement.innerHTML = "\n    <div class=\"" + Announcements_module_scss_1.default.helloWorld + "\">\n      <p class=\"ms-font-l ms-fontColor-black\">Loading from " + sp_lodash_subset_1.escape(this.context.pageContext.web.title) + "</p>\n      <div id=\"spListContainer\" />\n    </div>";
	        this._renderListAsync();
	    };
	    Object.defineProperty(AnnouncementsWebPart.prototype, "dataVersion", {
	        get: function () {
	            return sp_core_library_1.Version.parse('1.0');
	        },
	        enumerable: true,
	        configurable: true
	    });
	    AnnouncementsWebPart.prototype.getPropertyPaneConfiguration = function () {
	        return {
	            pages: [
	                {
	                    header: {
	                        description: strings.PropertyPaneDescription
	                    },
	                    groups: [
	                        {
	                            groupName: strings.BasicGroupName,
	                            groupFields: [
	                                sp_webpart_base_1.PropertyPaneTextField('description', {
	                                    label: strings.DescriptionFieldLabel
	                                })
	                            ]
	                        }
	                    ]
	                }
	            ]
	        };
	    };
	    return AnnouncementsWebPart;
	}(sp_webpart_base_1.BaseClientSideWebPart));
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = AnnouncementsWebPart;



/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },
/* 3 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	/* tslint:disable */
	__webpack_require__(5);
	var styles = {
	    helloWorld: 'helloWorld_cb4fdf7a',
	    container: 'container_cb4fdf7a',
	    row: 'row_cb4fdf7a',
	    calendarDate: 'calendarDate_cb4fdf7a',
	    tr: 'tr_cb4fdf7a',
	    th: 'th_cb4fdf7a',
	    listItem: 'listItem_cb4fdf7a',
	    list: 'list_cb4fdf7a',
	    button: 'button_cb4fdf7a',
	    label: 'label_cb4fdf7a',
	};
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = styles;
	/* tslint:enable */ 
	


/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	var content = __webpack_require__(6);
	var loader = __webpack_require__(8);
	
	if(typeof content === "string") content = [[module.id, content]];
	
	// add the styles to the DOM
	for (var i = 0; i < content.length; i++) loader.loadStyles(content[i][1]);
	
	if(content.locals) module.exports = content.locals;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(7)();
	// imports
	
	
	// module
	exports.push([module.id, ".helloWorld_cb4fdf7a .container_cb4fdf7a{max-width:700px;margin:0 auto;box-shadow:0 2px 4px 0 rgba(0,0,0,.2),0 25px 50px 0 rgba(0,0,0,.1)}.helloWorld_cb4fdf7a .row_cb4fdf7a{padding:20px}.helloWorld_cb4fdf7a div.calendarDate_cb4fdf7a{font-size:1em;display:block;position:relative;width:4em;height:4em;background-color:#fff;border-radius:.7em;-moz-border-radius:.7em;box-shadow:0 1px 0 #bdbdbd,0 2px 0 #fff,0 3px 0 #bdbdbd,0 4px 0 #fff,0 5px 0 #bdbdbd,0 0 0 1px #bdbdbd;overflow:hidden}.helloWorld_cb4fdf7a div.calendarDate_cb4fdf7a *{display:block;width:100%;font-size:.8em;font-weight:700;font-style:normal;text-align:center}.helloWorld_cb4fdf7a div.calendarDate_cb4fdf7a strong{position:absolute;top:0;padding:.4em 0;color:#fff;background-color:#4CAF50;border-bottom:1px;box-shadow:0 2px 0 #0078d7}.helloWorld_cb4fdf7a div.calendarDate_cb4fdf7a span{font-size:2em;letter-spacing:-.05em;padding-top:.7em;color:#ADBFB3}.helloWorld_cb4fdf7a .tr_cb4fdf7a:nth-child(even){background-color:#ADBFB3;padding-top:5px;padding-bottom:5px}.helloWorld_cb4fdf7a .th_cb4fdf7a{background-color:#4CAF50;color:#3A403C}.helloWorld_cb4fdf7a .listItem_cb4fdf7a{max-width:715px;margin:5px auto 5px auto;box-shadow:0 0 4px 0 rgba(0,0,0,.2),0 25px 50px 0 rgba(0,0,0,.1)}.helloWorld_cb4fdf7a .list_cb4fdf7a{color:#333;font-family:'Segoe UI Regular WestEuropean','Segoe UI',Tahoma,Arial,sans-serif;font-size:14px;font-weight:400;box-sizing:border-box;margin:10;padding:10;line-height:50px;list-style-type:none;box-shadow:0 4px 4px 0 rgba(0,0,0,.2),0 25px 50px 0 rgba(0,0,0,.1)}.helloWorld_cb4fdf7a .listItem_cb4fdf7a{color:#333;vertical-align:center;font-family:'Segoe UI Regular WestEuropean','Segoe UI',Tahoma,Arial,sans-serif;font-size:14px;font-weight:400;box-sizing:border-box;margin:0;padding:0;box-shadow:none;padding:9px 28px 3px;position:relative}.helloWorld_cb4fdf7a .button_cb4fdf7a{text-decoration:none;height:32px;min-width:80px;background-color:#0078d7;border-color:#0078d7;color:#fff;outline:transparent;position:relative;font-family:\"Segoe UI WestEuropean\",\"Segoe UI\",-apple-system,BlinkMacSystemFont,Roboto,\"Helvetica Neue\",sans-serif;-webkit-font-smoothing:antialiased;font-size:14px;font-weight:400;border-width:0;text-align:center;cursor:pointer;display:inline-block;padding:0 16px}.helloWorld_cb4fdf7a .button_cb4fdf7a .label_cb4fdf7a{font-weight:600;font-size:14px;height:32px;line-height:32px;margin:0 4px;vertical-align:top;display:inline-block}", ""]);
	
	// exports


/***/ },
/* 7 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];
	
		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};
	
		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ },
/* 8 */
/***/ function(module, exports) {

	/* WEBPACK VAR INJECTION */(function(global) {/**
	 * An IThemingInstruction can specify a rawString to be preserved or a theme slot and a default value
	 * to use if that slot is not specified by the theme.
	 */
	"use strict";
	// IE needs to inject styles using cssText. However, we need to evaluate this lazily, so this
	// value will initialize as undefined, and later will be set once on first loadStyles injection.
	var _injectStylesWithCssText;
	// Store the theming state in __themeState__ global scope for reuse in the case of duplicate
	// load-themed-styles hosted on the page.
	var _root = (typeof window === 'undefined') ? global : window; // tslint:disable-line:no-any
	var _themeState = _root.__themeState__ = _root.__themeState__ || {
	    theme: undefined,
	    lastStyleElement: undefined,
	    registeredStyles: []
	};
	/**
	 * Matches theming tokens. For example, "[theme: themeSlotName, default: #FFF]" (including the quotes).
	 */
	/* tslint:disable: max-line-length */
	var _themeTokenRegex = /[\'\"]\[theme:\s*(\w+)\s*(?:\,\s*default:\s*([\\"\']?[\.\,\(\)\#\-\s\w]*[\.\,\(\)\#\-\w][\"\']?))?\s*\][\'\"]/g;
	/* tslint:enable: max-line-length */
	/** Maximum style text length, for supporting IE style restrictions. */
	var MAX_STYLE_CONTENT_SIZE = 10000;
	/**
	 * Loads a set of style text. If it is registered too early, we will register it when the window.load
	 * event is fired.
	 * @param {string | ThemableArray} styles Themable style text to register.
	 */
	function loadStyles(styles) {
	    var styleParts = Array.isArray(styles) ? styles : splitStyles(styles);
	    if (_injectStylesWithCssText === undefined) {
	        _injectStylesWithCssText = shouldUseCssText();
	    }
	    applyThemableStyles(styleParts);
	}
	exports.loadStyles = loadStyles;
	/**
	 * Allows for customizable loadStyles logic. e.g. for server side rendering application
	 * @param {(styles: string) => void} a loadStyles callback that gets called when styles are loaded or reloaded
	 */
	function configureLoadStyles(callback) {
	    _themeState.loadStyles = callback;
	}
	exports.configureLoadStyles = configureLoadStyles;
	/**
	 * Loads a set of style text. If it is registered too early, we will register it when the window.load event
	 * is fired.
	 * @param {string} styleText Style to register.
	 * @param {IStyleRecord} styleRecord Existing style record to re-apply.
	 */
	function applyThemableStyles(stylesArray, styleRecord) {
	    if (_themeState.loadStyles) {
	        var styles = resolveThemableArray(stylesArray);
	        _themeState.loadStyles(styles);
	    }
	    else {
	        _injectStylesWithCssText ?
	            registerStylesIE(stylesArray, styleRecord) :
	            registerStyles(stylesArray, styleRecord);
	    }
	}
	/**
	 * Registers a set theme tokens to find and replace. If styles were already registered, they will be
	 * replaced.
	 * @param {theme} theme JSON object of theme tokens to values.
	 */
	function loadTheme(theme) {
	    _themeState.theme = theme;
	    // reload styles.
	    reloadStyles();
	}
	exports.loadTheme = loadTheme;
	/**
	 * Reloads styles.
	 */
	function reloadStyles() {
	    if (_themeState.theme) {
	        for (var _i = 0, _a = _themeState.registeredStyles; _i < _a.length; _i++) {
	            var styleRecord = _a[_i];
	            applyThemableStyles(styleRecord.themableStyle, styleRecord);
	        }
	    }
	}
	/**
	 * Find theme tokens and replaces them with provided theme values.
	 * @param {string} styles Tokenized styles to fix.
	 */
	function detokenize(styles) {
	    if (styles) {
	        styles = resolveThemableArray(splitStyles(styles));
	    }
	    return styles;
	}
	exports.detokenize = detokenize;
	/**
	 * Resolves ThemingInstruction objects in an array and joins the result into a string.
	 * @param {ThemableArray} splitStyleArray ThemableArray to resolve and join.
	 */
	function resolveThemableArray(splitStyleArray) {
	    var theme = _themeState.theme;
	    var resolvedCss;
	    if (splitStyleArray) {
	        // Resolve the array of theming instructions to an array of strings.
	        // Then join the array to produce the final CSS string.
	        var resolvedArray = splitStyleArray.map(function (currentValue) {
	            var themeSlot = currentValue.theme;
	            if (themeSlot) {
	                // A theming annotation. Resolve it.
	                var themedValue = theme ? theme[themeSlot] : undefined;
	                var defaultValue = currentValue.defaultValue;
	                // Warn to console if we hit an unthemed value even when themes are provided.
	                // Allow the themedValue to be undefined to explicitly request the default value.
	                if (theme && !themedValue && console && !(themeSlot in theme)) {
	                    /* tslint:disable: max-line-length */
	                    console.warn("Theming value not provided for \"" + themeSlot + "\". Falling back to \"" + (defaultValue || 'inherit') + "\".");
	                }
	                return themedValue || defaultValue || 'inherit';
	            }
	            else {
	                // A non-themable string. Preserve it.
	                return currentValue.rawString;
	            }
	        });
	        resolvedCss = resolvedArray.join('');
	    }
	    return resolvedCss;
	}
	/**
	 * Split tokenized CSS into an array of strings and theme specification objects
	 * @param {string} styles Tokenized styles to split.
	 */
	function splitStyles(styles) {
	    var result = [];
	    if (styles) {
	        var pos = 0; // Current position in styles.
	        var tokenMatch = void 0;
	        while (tokenMatch = _themeTokenRegex.exec(styles)) {
	            var matchIndex = tokenMatch.index;
	            if (matchIndex > pos) {
	                result.push({
	                    rawString: styles.substring(pos, matchIndex)
	                });
	            }
	            result.push({
	                theme: tokenMatch[1],
	                defaultValue: tokenMatch[2] // May be undefined
	            });
	            // index of the first character after the current match
	            pos = _themeTokenRegex.lastIndex;
	        }
	        // Push the rest of the string after the last match.
	        result.push({
	            rawString: styles.substring(pos)
	        });
	    }
	    return result;
	}
	exports.splitStyles = splitStyles;
	/**
	 * Registers a set of style text. If it is registered too early, we will register it when the
	 * window.load event is fired.
	 * @param {ThemableArray} styleArray Array of IThemingInstruction objects to register.
	 * @param {IStyleRecord} styleRecord May specify a style Element to update.
	 */
	function registerStyles(styleArray, styleRecord) {
	    var head = document.getElementsByTagName('head')[0];
	    var styleElement = document.createElement('style');
	    styleElement.type = 'text/css';
	    styleElement.appendChild(document.createTextNode(resolveThemableArray(styleArray)));
	    if (styleRecord) {
	        head.replaceChild(styleElement, styleRecord.styleElement);
	        styleRecord.styleElement = styleElement;
	    }
	    else {
	        head.appendChild(styleElement);
	    }
	    if (!styleRecord) {
	        _themeState.registeredStyles.push({
	            styleElement: styleElement,
	            themableStyle: styleArray
	        });
	    }
	}
	/**
	 * Registers a set of style text, for IE 9 and below, which has a ~30 style element limit so we need
	 * to register slightly differently.
	 * @param {ThemableArray} styleArray Array of IThemingInstruction objects to register.
	 * @param {IStyleRecord} styleRecord May specify a style Element to update.
	 */
	function registerStylesIE(styleArray, styleRecord) {
	    var head = document.getElementsByTagName('head')[0];
	    var lastStyleElement = _themeState.lastStyleElement, registeredStyles = _themeState.registeredStyles;
	    var stylesheet = lastStyleElement ? lastStyleElement.styleSheet : undefined;
	    var lastStyleContent = stylesheet ? stylesheet.cssText : '';
	    var lastRegisteredStyle = registeredStyles[registeredStyles.length - 1];
	    var resolvedStyleText = resolveThemableArray(styleArray);
	    if (!lastStyleElement || (lastStyleContent.length + resolvedStyleText.length) > MAX_STYLE_CONTENT_SIZE) {
	        lastStyleElement = document.createElement('style');
	        lastStyleElement.type = 'text/css';
	        if (styleRecord) {
	            head.replaceChild(lastStyleElement, styleRecord.styleElement);
	            styleRecord.styleElement = lastStyleElement;
	        }
	        else {
	            head.appendChild(lastStyleElement);
	        }
	        if (!styleRecord) {
	            lastRegisteredStyle = {
	                styleElement: lastStyleElement,
	                themableStyle: styleArray
	            };
	            registeredStyles.push(lastRegisteredStyle);
	        }
	    }
	    lastStyleElement.styleSheet.cssText += detokenize(resolvedStyleText);
	    Array.prototype.push.apply(lastRegisteredStyle.themableStyle, styleArray); // concat in-place
	    // Preserve the theme state.
	    _themeState.lastStyleElement = lastStyleElement;
	}
	/**
	 * Checks to see if styleSheet exists as a property off of a style element.
	 * This will determine if style registration should be done via cssText (<= IE9) or not
	 */
	function shouldUseCssText() {
	    var useCSSText = false;
	    if (typeof document !== 'undefined') {
	        var emptyStyle = document.createElement('style');
	        emptyStyle.type = 'text/css';
	        useCSSText = !!emptyStyle.styleSheet;
	    }
	    return useCSSText;
	}
	
	
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 9 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ },
/* 10 */
/***/ function(module, exports) {

	"use strict";
	var MockHttpClient = (function () {
	    function MockHttpClient() {
	    }
	    MockHttpClient.get = function () {
	        return new Promise(function (resolve) {
	            resolve(MockHttpClient._items);
	        });
	    };
	    return MockHttpClient;
	}());
	MockHttpClient._items = [{ Title: 'Test Announcement 1', Id: '1', Expires: '2017-04-22T04:00:00Z' },
	    { Title: 'Test Announcement 2', Id: '2', Expires: '2017-03-24T04:00:00Z' },
	    { Title: 'Test Announcement 3', Id: '3', Expires: '2017-01-12T04:00:00Z' }];
	Object.defineProperty(exports, "__esModule", { value: true });
	exports.default = MockHttpClient;



/***/ },
/* 11 */
/***/ function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ }
/******/ ])});;
//# sourceMappingURL=announcements.bundle.js.map