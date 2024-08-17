(function () {
	'use strict';

	var commonjsGlobal = typeof globalThis !== 'undefined' ? globalThis : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

	var lib = {};

	var browserPolyfill = {exports: {}};

	(function (module, exports) {
		(function (global, factory) {
		  {
		    factory(module);
		  }
		})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : commonjsGlobal, function (module) {

		  if (typeof browser === "undefined" || Object.getPrototypeOf(browser) !== Object.prototype) {
		    const CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE = "The message port closed before a response was received.";
		    const SEND_RESPONSE_DEPRECATION_WARNING = "Returning a Promise is the preferred way to send a reply from an onMessage/onMessageExternal listener, as the sendResponse will be removed from the specs (See https://developer.mozilla.org/docs/Mozilla/Add-ons/WebExtensions/API/runtime/onMessage)"; // Wrapping the bulk of this polyfill in a one-time-use function is a minor
		    // optimization for Firefox. Since Spidermonkey does not fully parse the
		    // contents of a function until the first time it's called, and since it will
		    // never actually need to be called, this allows the polyfill to be included
		    // in Firefox nearly for free.

		    const wrapAPIs = extensionAPIs => {
		      // NOTE: apiMetadata is associated to the content of the api-metadata.json file
		      // at build time by replacing the following "include" with the content of the
		      // JSON file.
		      const apiMetadata = {
		        "alarms": {
		          "clear": {
		            "minArgs": 0,
		            "maxArgs": 1
		          },
		          "clearAll": {
		            "minArgs": 0,
		            "maxArgs": 0
		          },
		          "get": {
		            "minArgs": 0,
		            "maxArgs": 1
		          },
		          "getAll": {
		            "minArgs": 0,
		            "maxArgs": 0
		          }
		        },
		        "bookmarks": {
		          "create": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "get": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "getChildren": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "getRecent": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "getSubTree": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "getTree": {
		            "minArgs": 0,
		            "maxArgs": 0
		          },
		          "move": {
		            "minArgs": 2,
		            "maxArgs": 2
		          },
		          "remove": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "removeTree": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "search": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "update": {
		            "minArgs": 2,
		            "maxArgs": 2
		          }
		        },
		        "browserAction": {
		          "disable": {
		            "minArgs": 0,
		            "maxArgs": 1,
		            "fallbackToNoCallback": true
		          },
		          "enable": {
		            "minArgs": 0,
		            "maxArgs": 1,
		            "fallbackToNoCallback": true
		          },
		          "getBadgeBackgroundColor": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "getBadgeText": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "getPopup": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "getTitle": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "openPopup": {
		            "minArgs": 0,
		            "maxArgs": 0
		          },
		          "setBadgeBackgroundColor": {
		            "minArgs": 1,
		            "maxArgs": 1,
		            "fallbackToNoCallback": true
		          },
		          "setBadgeText": {
		            "minArgs": 1,
		            "maxArgs": 1,
		            "fallbackToNoCallback": true
		          },
		          "setIcon": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "setPopup": {
		            "minArgs": 1,
		            "maxArgs": 1,
		            "fallbackToNoCallback": true
		          },
		          "setTitle": {
		            "minArgs": 1,
		            "maxArgs": 1,
		            "fallbackToNoCallback": true
		          }
		        },
		        "browsingData": {
		          "remove": {
		            "minArgs": 2,
		            "maxArgs": 2
		          },
		          "removeCache": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "removeCookies": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "removeDownloads": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "removeFormData": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "removeHistory": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "removeLocalStorage": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "removePasswords": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "removePluginData": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "settings": {
		            "minArgs": 0,
		            "maxArgs": 0
		          }
		        },
		        "commands": {
		          "getAll": {
		            "minArgs": 0,
		            "maxArgs": 0
		          }
		        },
		        "contextMenus": {
		          "remove": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "removeAll": {
		            "minArgs": 0,
		            "maxArgs": 0
		          },
		          "update": {
		            "minArgs": 2,
		            "maxArgs": 2
		          }
		        },
		        "cookies": {
		          "get": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "getAll": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "getAllCookieStores": {
		            "minArgs": 0,
		            "maxArgs": 0
		          },
		          "remove": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "set": {
		            "minArgs": 1,
		            "maxArgs": 1
		          }
		        },
		        "devtools": {
		          "inspectedWindow": {
		            "eval": {
		              "minArgs": 1,
		              "maxArgs": 2,
		              "singleCallbackArg": false
		            }
		          },
		          "panels": {
		            "create": {
		              "minArgs": 3,
		              "maxArgs": 3,
		              "singleCallbackArg": true
		            },
		            "elements": {
		              "createSidebarPane": {
		                "minArgs": 1,
		                "maxArgs": 1
		              }
		            }
		          }
		        },
		        "downloads": {
		          "cancel": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "download": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "erase": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "getFileIcon": {
		            "minArgs": 1,
		            "maxArgs": 2
		          },
		          "open": {
		            "minArgs": 1,
		            "maxArgs": 1,
		            "fallbackToNoCallback": true
		          },
		          "pause": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "removeFile": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "resume": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "search": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "show": {
		            "minArgs": 1,
		            "maxArgs": 1,
		            "fallbackToNoCallback": true
		          }
		        },
		        "extension": {
		          "isAllowedFileSchemeAccess": {
		            "minArgs": 0,
		            "maxArgs": 0
		          },
		          "isAllowedIncognitoAccess": {
		            "minArgs": 0,
		            "maxArgs": 0
		          }
		        },
		        "history": {
		          "addUrl": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "deleteAll": {
		            "minArgs": 0,
		            "maxArgs": 0
		          },
		          "deleteRange": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "deleteUrl": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "getVisits": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "search": {
		            "minArgs": 1,
		            "maxArgs": 1
		          }
		        },
		        "i18n": {
		          "detectLanguage": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "getAcceptLanguages": {
		            "minArgs": 0,
		            "maxArgs": 0
		          }
		        },
		        "identity": {
		          "launchWebAuthFlow": {
		            "minArgs": 1,
		            "maxArgs": 1
		          }
		        },
		        "idle": {
		          "queryState": {
		            "minArgs": 1,
		            "maxArgs": 1
		          }
		        },
		        "management": {
		          "get": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "getAll": {
		            "minArgs": 0,
		            "maxArgs": 0
		          },
		          "getSelf": {
		            "minArgs": 0,
		            "maxArgs": 0
		          },
		          "setEnabled": {
		            "minArgs": 2,
		            "maxArgs": 2
		          },
		          "uninstallSelf": {
		            "minArgs": 0,
		            "maxArgs": 1
		          }
		        },
		        "notifications": {
		          "clear": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "create": {
		            "minArgs": 1,
		            "maxArgs": 2
		          },
		          "getAll": {
		            "minArgs": 0,
		            "maxArgs": 0
		          },
		          "getPermissionLevel": {
		            "minArgs": 0,
		            "maxArgs": 0
		          },
		          "update": {
		            "minArgs": 2,
		            "maxArgs": 2
		          }
		        },
		        "pageAction": {
		          "getPopup": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "getTitle": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "hide": {
		            "minArgs": 1,
		            "maxArgs": 1,
		            "fallbackToNoCallback": true
		          },
		          "setIcon": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "setPopup": {
		            "minArgs": 1,
		            "maxArgs": 1,
		            "fallbackToNoCallback": true
		          },
		          "setTitle": {
		            "minArgs": 1,
		            "maxArgs": 1,
		            "fallbackToNoCallback": true
		          },
		          "show": {
		            "minArgs": 1,
		            "maxArgs": 1,
		            "fallbackToNoCallback": true
		          }
		        },
		        "permissions": {
		          "contains": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "getAll": {
		            "minArgs": 0,
		            "maxArgs": 0
		          },
		          "remove": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "request": {
		            "minArgs": 1,
		            "maxArgs": 1
		          }
		        },
		        "runtime": {
		          "getBackgroundPage": {
		            "minArgs": 0,
		            "maxArgs": 0
		          },
		          "getPlatformInfo": {
		            "minArgs": 0,
		            "maxArgs": 0
		          },
		          "openOptionsPage": {
		            "minArgs": 0,
		            "maxArgs": 0
		          },
		          "requestUpdateCheck": {
		            "minArgs": 0,
		            "maxArgs": 0
		          },
		          "sendMessage": {
		            "minArgs": 1,
		            "maxArgs": 3
		          },
		          "sendNativeMessage": {
		            "minArgs": 2,
		            "maxArgs": 2
		          },
		          "setUninstallURL": {
		            "minArgs": 1,
		            "maxArgs": 1
		          }
		        },
		        "sessions": {
		          "getDevices": {
		            "minArgs": 0,
		            "maxArgs": 1
		          },
		          "getRecentlyClosed": {
		            "minArgs": 0,
		            "maxArgs": 1
		          },
		          "restore": {
		            "minArgs": 0,
		            "maxArgs": 1
		          }
		        },
		        "storage": {
		          "local": {
		            "clear": {
		              "minArgs": 0,
		              "maxArgs": 0
		            },
		            "get": {
		              "minArgs": 0,
		              "maxArgs": 1
		            },
		            "getBytesInUse": {
		              "minArgs": 0,
		              "maxArgs": 1
		            },
		            "remove": {
		              "minArgs": 1,
		              "maxArgs": 1
		            },
		            "set": {
		              "minArgs": 1,
		              "maxArgs": 1
		            }
		          },
		          "managed": {
		            "get": {
		              "minArgs": 0,
		              "maxArgs": 1
		            },
		            "getBytesInUse": {
		              "minArgs": 0,
		              "maxArgs": 1
		            }
		          },
		          "sync": {
		            "clear": {
		              "minArgs": 0,
		              "maxArgs": 0
		            },
		            "get": {
		              "minArgs": 0,
		              "maxArgs": 1
		            },
		            "getBytesInUse": {
		              "minArgs": 0,
		              "maxArgs": 1
		            },
		            "remove": {
		              "minArgs": 1,
		              "maxArgs": 1
		            },
		            "set": {
		              "minArgs": 1,
		              "maxArgs": 1
		            }
		          }
		        },
		        "tabs": {
		          "captureVisibleTab": {
		            "minArgs": 0,
		            "maxArgs": 2
		          },
		          "create": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "detectLanguage": {
		            "minArgs": 0,
		            "maxArgs": 1
		          },
		          "discard": {
		            "minArgs": 0,
		            "maxArgs": 1
		          },
		          "duplicate": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "executeScript": {
		            "minArgs": 1,
		            "maxArgs": 2
		          },
		          "get": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "getCurrent": {
		            "minArgs": 0,
		            "maxArgs": 0
		          },
		          "getZoom": {
		            "minArgs": 0,
		            "maxArgs": 1
		          },
		          "getZoomSettings": {
		            "minArgs": 0,
		            "maxArgs": 1
		          },
		          "goBack": {
		            "minArgs": 0,
		            "maxArgs": 1
		          },
		          "goForward": {
		            "minArgs": 0,
		            "maxArgs": 1
		          },
		          "highlight": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "insertCSS": {
		            "minArgs": 1,
		            "maxArgs": 2
		          },
		          "move": {
		            "minArgs": 2,
		            "maxArgs": 2
		          },
		          "query": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "reload": {
		            "minArgs": 0,
		            "maxArgs": 2
		          },
		          "remove": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "removeCSS": {
		            "minArgs": 1,
		            "maxArgs": 2
		          },
		          "sendMessage": {
		            "minArgs": 2,
		            "maxArgs": 3
		          },
		          "setZoom": {
		            "minArgs": 1,
		            "maxArgs": 2
		          },
		          "setZoomSettings": {
		            "minArgs": 1,
		            "maxArgs": 2
		          },
		          "update": {
		            "minArgs": 1,
		            "maxArgs": 2
		          }
		        },
		        "topSites": {
		          "get": {
		            "minArgs": 0,
		            "maxArgs": 0
		          }
		        },
		        "webNavigation": {
		          "getAllFrames": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "getFrame": {
		            "minArgs": 1,
		            "maxArgs": 1
		          }
		        },
		        "webRequest": {
		          "handlerBehaviorChanged": {
		            "minArgs": 0,
		            "maxArgs": 0
		          }
		        },
		        "windows": {
		          "create": {
		            "minArgs": 0,
		            "maxArgs": 1
		          },
		          "get": {
		            "minArgs": 1,
		            "maxArgs": 2
		          },
		          "getAll": {
		            "minArgs": 0,
		            "maxArgs": 1
		          },
		          "getCurrent": {
		            "minArgs": 0,
		            "maxArgs": 1
		          },
		          "getLastFocused": {
		            "minArgs": 0,
		            "maxArgs": 1
		          },
		          "remove": {
		            "minArgs": 1,
		            "maxArgs": 1
		          },
		          "update": {
		            "minArgs": 2,
		            "maxArgs": 2
		          }
		        }
		      };

		      if (Object.keys(apiMetadata).length === 0) {
		        throw new Error("api-metadata.json has not been included in browser-polyfill");
		      }
		      /**
		       * A WeakMap subclass which creates and stores a value for any key which does
		       * not exist when accessed, but behaves exactly as an ordinary WeakMap
		       * otherwise.
		       *
		       * @param {function} createItem
		       *        A function which will be called in order to create the value for any
		       *        key which does not exist, the first time it is accessed. The
		       *        function receives, as its only argument, the key being created.
		       */


		      class DefaultWeakMap extends WeakMap {
		        constructor(createItem, items = undefined) {
		          super(items);
		          this.createItem = createItem;
		        }

		        get(key) {
		          if (!this.has(key)) {
		            this.set(key, this.createItem(key));
		          }

		          return super.get(key);
		        }

		      }
		      /**
		       * Returns true if the given object is an object with a `then` method, and can
		       * therefore be assumed to behave as a Promise.
		       *
		       * @param {*} value The value to test.
		       * @returns {boolean} True if the value is thenable.
		       */


		      const isThenable = value => {
		        return value && typeof value === "object" && typeof value.then === "function";
		      };
		      /**
		       * Creates and returns a function which, when called, will resolve or reject
		       * the given promise based on how it is called:
		       *
		       * - If, when called, `chrome.runtime.lastError` contains a non-null object,
		       *   the promise is rejected with that value.
		       * - If the function is called with exactly one argument, the promise is
		       *   resolved to that value.
		       * - Otherwise, the promise is resolved to an array containing all of the
		       *   function's arguments.
		       *
		       * @param {object} promise
		       *        An object containing the resolution and rejection functions of a
		       *        promise.
		       * @param {function} promise.resolve
		       *        The promise's resolution function.
		       * @param {function} promise.reject
		       *        The promise's rejection function.
		       * @param {object} metadata
		       *        Metadata about the wrapped method which has created the callback.
		       * @param {boolean} metadata.singleCallbackArg
		       *        Whether or not the promise is resolved with only the first
		       *        argument of the callback, alternatively an array of all the
		       *        callback arguments is resolved. By default, if the callback
		       *        function is invoked with only a single argument, that will be
		       *        resolved to the promise, while all arguments will be resolved as
		       *        an array if multiple are given.
		       *
		       * @returns {function}
		       *        The generated callback function.
		       */


		      const makeCallback = (promise, metadata) => {
		        return (...callbackArgs) => {
		          if (extensionAPIs.runtime.lastError) {
		            promise.reject(new Error(extensionAPIs.runtime.lastError.message));
		          } else if (metadata.singleCallbackArg || callbackArgs.length <= 1 && metadata.singleCallbackArg !== false) {
		            promise.resolve(callbackArgs[0]);
		          } else {
		            promise.resolve(callbackArgs);
		          }
		        };
		      };

		      const pluralizeArguments = numArgs => numArgs == 1 ? "argument" : "arguments";
		      /**
		       * Creates a wrapper function for a method with the given name and metadata.
		       *
		       * @param {string} name
		       *        The name of the method which is being wrapped.
		       * @param {object} metadata
		       *        Metadata about the method being wrapped.
		       * @param {integer} metadata.minArgs
		       *        The minimum number of arguments which must be passed to the
		       *        function. If called with fewer than this number of arguments, the
		       *        wrapper will raise an exception.
		       * @param {integer} metadata.maxArgs
		       *        The maximum number of arguments which may be passed to the
		       *        function. If called with more than this number of arguments, the
		       *        wrapper will raise an exception.
		       * @param {boolean} metadata.singleCallbackArg
		       *        Whether or not the promise is resolved with only the first
		       *        argument of the callback, alternatively an array of all the
		       *        callback arguments is resolved. By default, if the callback
		       *        function is invoked with only a single argument, that will be
		       *        resolved to the promise, while all arguments will be resolved as
		       *        an array if multiple are given.
		       *
		       * @returns {function(object, ...*)}
		       *       The generated wrapper function.
		       */


		      const wrapAsyncFunction = (name, metadata) => {
		        return function asyncFunctionWrapper(target, ...args) {
		          if (args.length < metadata.minArgs) {
		            throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
		          }

		          if (args.length > metadata.maxArgs) {
		            throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
		          }

		          return new Promise((resolve, reject) => {
		            if (metadata.fallbackToNoCallback) {
		              // This API method has currently no callback on Chrome, but it return a promise on Firefox,
		              // and so the polyfill will try to call it with a callback first, and it will fallback
		              // to not passing the callback if the first call fails.
		              try {
		                target[name](...args, makeCallback({
		                  resolve,
		                  reject
		                }, metadata));
		              } catch (cbError) {
		                console.warn(`${name} API method doesn't seem to support the callback parameter, ` + "falling back to call it without a callback: ", cbError);
		                target[name](...args); // Update the API method metadata, so that the next API calls will not try to
		                // use the unsupported callback anymore.

		                metadata.fallbackToNoCallback = false;
		                metadata.noCallback = true;
		                resolve();
		              }
		            } else if (metadata.noCallback) {
		              target[name](...args);
		              resolve();
		            } else {
		              target[name](...args, makeCallback({
		                resolve,
		                reject
		              }, metadata));
		            }
		          });
		        };
		      };
		      /**
		       * Wraps an existing method of the target object, so that calls to it are
		       * intercepted by the given wrapper function. The wrapper function receives,
		       * as its first argument, the original `target` object, followed by each of
		       * the arguments passed to the original method.
		       *
		       * @param {object} target
		       *        The original target object that the wrapped method belongs to.
		       * @param {function} method
		       *        The method being wrapped. This is used as the target of the Proxy
		       *        object which is created to wrap the method.
		       * @param {function} wrapper
		       *        The wrapper function which is called in place of a direct invocation
		       *        of the wrapped method.
		       *
		       * @returns {Proxy<function>}
		       *        A Proxy object for the given method, which invokes the given wrapper
		       *        method in its place.
		       */


		      const wrapMethod = (target, method, wrapper) => {
		        return new Proxy(method, {
		          apply(targetMethod, thisObj, args) {
		            return wrapper.call(thisObj, target, ...args);
		          }

		        });
		      };

		      let hasOwnProperty = Function.call.bind(Object.prototype.hasOwnProperty);
		      /**
		       * Wraps an object in a Proxy which intercepts and wraps certain methods
		       * based on the given `wrappers` and `metadata` objects.
		       *
		       * @param {object} target
		       *        The target object to wrap.
		       *
		       * @param {object} [wrappers = {}]
		       *        An object tree containing wrapper functions for special cases. Any
		       *        function present in this object tree is called in place of the
		       *        method in the same location in the `target` object tree. These
		       *        wrapper methods are invoked as described in {@see wrapMethod}.
		       *
		       * @param {object} [metadata = {}]
		       *        An object tree containing metadata used to automatically generate
		       *        Promise-based wrapper functions for asynchronous. Any function in
		       *        the `target` object tree which has a corresponding metadata object
		       *        in the same location in the `metadata` tree is replaced with an
		       *        automatically-generated wrapper function, as described in
		       *        {@see wrapAsyncFunction}
		       *
		       * @returns {Proxy<object>}
		       */

		      const wrapObject = (target, wrappers = {}, metadata = {}) => {
		        let cache = Object.create(null);
		        let handlers = {
		          has(proxyTarget, prop) {
		            return prop in target || prop in cache;
		          },

		          get(proxyTarget, prop, receiver) {
		            if (prop in cache) {
		              return cache[prop];
		            }

		            if (!(prop in target)) {
		              return undefined;
		            }

		            let value = target[prop];

		            if (typeof value === "function") {
		              // This is a method on the underlying object. Check if we need to do
		              // any wrapping.
		              if (typeof wrappers[prop] === "function") {
		                // We have a special-case wrapper for this method.
		                value = wrapMethod(target, target[prop], wrappers[prop]);
		              } else if (hasOwnProperty(metadata, prop)) {
		                // This is an async method that we have metadata for. Create a
		                // Promise wrapper for it.
		                let wrapper = wrapAsyncFunction(prop, metadata[prop]);
		                value = wrapMethod(target, target[prop], wrapper);
		              } else {
		                // This is a method that we don't know or care about. Return the
		                // original method, bound to the underlying object.
		                value = value.bind(target);
		              }
		            } else if (typeof value === "object" && value !== null && (hasOwnProperty(wrappers, prop) || hasOwnProperty(metadata, prop))) {
		              // This is an object that we need to do some wrapping for the children
		              // of. Create a sub-object wrapper for it with the appropriate child
		              // metadata.
		              value = wrapObject(value, wrappers[prop], metadata[prop]);
		            } else if (hasOwnProperty(metadata, "*")) {
		              // Wrap all properties in * namespace.
		              value = wrapObject(value, wrappers[prop], metadata["*"]);
		            } else {
		              // We don't need to do any wrapping for this property,
		              // so just forward all access to the underlying object.
		              Object.defineProperty(cache, prop, {
		                configurable: true,
		                enumerable: true,

		                get() {
		                  return target[prop];
		                },

		                set(value) {
		                  target[prop] = value;
		                }

		              });
		              return value;
		            }

		            cache[prop] = value;
		            return value;
		          },

		          set(proxyTarget, prop, value, receiver) {
		            if (prop in cache) {
		              cache[prop] = value;
		            } else {
		              target[prop] = value;
		            }

		            return true;
		          },

		          defineProperty(proxyTarget, prop, desc) {
		            return Reflect.defineProperty(cache, prop, desc);
		          },

		          deleteProperty(proxyTarget, prop) {
		            return Reflect.deleteProperty(cache, prop);
		          }

		        }; // Per contract of the Proxy API, the "get" proxy handler must return the
		        // original value of the target if that value is declared read-only and
		        // non-configurable. For this reason, we create an object with the
		        // prototype set to `target` instead of using `target` directly.
		        // Otherwise we cannot return a custom object for APIs that
		        // are declared read-only and non-configurable, such as `chrome.devtools`.
		        //
		        // The proxy handlers themselves will still use the original `target`
		        // instead of the `proxyTarget`, so that the methods and properties are
		        // dereferenced via the original targets.

		        let proxyTarget = Object.create(target);
		        return new Proxy(proxyTarget, handlers);
		      };
		      /**
		       * Creates a set of wrapper functions for an event object, which handles
		       * wrapping of listener functions that those messages are passed.
		       *
		       * A single wrapper is created for each listener function, and stored in a
		       * map. Subsequent calls to `addListener`, `hasListener`, or `removeListener`
		       * retrieve the original wrapper, so that  attempts to remove a
		       * previously-added listener work as expected.
		       *
		       * @param {DefaultWeakMap<function, function>} wrapperMap
		       *        A DefaultWeakMap object which will create the appropriate wrapper
		       *        for a given listener function when one does not exist, and retrieve
		       *        an existing one when it does.
		       *
		       * @returns {object}
		       */


		      const wrapEvent = wrapperMap => ({
		        addListener(target, listener, ...args) {
		          target.addListener(wrapperMap.get(listener), ...args);
		        },

		        hasListener(target, listener) {
		          return target.hasListener(wrapperMap.get(listener));
		        },

		        removeListener(target, listener) {
		          target.removeListener(wrapperMap.get(listener));
		        }

		      });

		      const onRequestFinishedWrappers = new DefaultWeakMap(listener => {
		        if (typeof listener !== "function") {
		          return listener;
		        }
		        /**
		         * Wraps an onRequestFinished listener function so that it will return a
		         * `getContent()` property which returns a `Promise` rather than using a
		         * callback API.
		         *
		         * @param {object} req
		         *        The HAR entry object representing the network request.
		         */


		        return function onRequestFinished(req) {
		          const wrappedReq = wrapObject(req, {}
		          /* wrappers */
		          , {
		            getContent: {
		              minArgs: 0,
		              maxArgs: 0
		            }
		          });
		          listener(wrappedReq);
		        };
		      }); // Keep track if the deprecation warning has been logged at least once.

		      let loggedSendResponseDeprecationWarning = false;
		      const onMessageWrappers = new DefaultWeakMap(listener => {
		        if (typeof listener !== "function") {
		          return listener;
		        }
		        /**
		         * Wraps a message listener function so that it may send responses based on
		         * its return value, rather than by returning a sentinel value and calling a
		         * callback. If the listener function returns a Promise, the response is
		         * sent when the promise either resolves or rejects.
		         *
		         * @param {*} message
		         *        The message sent by the other end of the channel.
		         * @param {object} sender
		         *        Details about the sender of the message.
		         * @param {function(*)} sendResponse
		         *        A callback which, when called with an arbitrary argument, sends
		         *        that value as a response.
		         * @returns {boolean}
		         *        True if the wrapped listener returned a Promise, which will later
		         *        yield a response. False otherwise.
		         */


		        return function onMessage(message, sender, sendResponse) {
		          let didCallSendResponse = false;
		          let wrappedSendResponse;
		          let sendResponsePromise = new Promise(resolve => {
		            wrappedSendResponse = function (response) {
		              if (!loggedSendResponseDeprecationWarning) {
		                console.warn(SEND_RESPONSE_DEPRECATION_WARNING, new Error().stack);
		                loggedSendResponseDeprecationWarning = true;
		              }

		              didCallSendResponse = true;
		              resolve(response);
		            };
		          });
		          let result;

		          try {
		            result = listener(message, sender, wrappedSendResponse);
		          } catch (err) {
		            result = Promise.reject(err);
		          }

		          const isResultThenable = result !== true && isThenable(result); // If the listener didn't returned true or a Promise, or called
		          // wrappedSendResponse synchronously, we can exit earlier
		          // because there will be no response sent from this listener.

		          if (result !== true && !isResultThenable && !didCallSendResponse) {
		            return false;
		          } // A small helper to send the message if the promise resolves
		          // and an error if the promise rejects (a wrapped sendMessage has
		          // to translate the message into a resolved promise or a rejected
		          // promise).


		          const sendPromisedResult = promise => {
		            promise.then(msg => {
		              // send the message value.
		              sendResponse(msg);
		            }, error => {
		              // Send a JSON representation of the error if the rejected value
		              // is an instance of error, or the object itself otherwise.
		              let message;

		              if (error && (error instanceof Error || typeof error.message === "string")) {
		                message = error.message;
		              } else {
		                message = "An unexpected error occurred";
		              }

		              sendResponse({
		                __mozWebExtensionPolyfillReject__: true,
		                message
		              });
		            }).catch(err => {
		              // Print an error on the console if unable to send the response.
		              console.error("Failed to send onMessage rejected reply", err);
		            });
		          }; // If the listener returned a Promise, send the resolved value as a
		          // result, otherwise wait the promise related to the wrappedSendResponse
		          // callback to resolve and send it as a response.


		          if (isResultThenable) {
		            sendPromisedResult(result);
		          } else {
		            sendPromisedResult(sendResponsePromise);
		          } // Let Chrome know that the listener is replying.


		          return true;
		        };
		      });

		      const wrappedSendMessageCallback = ({
		        reject,
		        resolve
		      }, reply) => {
		        if (extensionAPIs.runtime.lastError) {
		          // Detect when none of the listeners replied to the sendMessage call and resolve
		          // the promise to undefined as in Firefox.
		          // See https://github.com/mozilla/webextension-polyfill/issues/130
		          if (extensionAPIs.runtime.lastError.message === CHROME_SEND_MESSAGE_CALLBACK_NO_RESPONSE_MESSAGE) {
		            resolve();
		          } else {
		            reject(new Error(extensionAPIs.runtime.lastError.message));
		          }
		        } else if (reply && reply.__mozWebExtensionPolyfillReject__) {
		          // Convert back the JSON representation of the error into
		          // an Error instance.
		          reject(new Error(reply.message));
		        } else {
		          resolve(reply);
		        }
		      };

		      const wrappedSendMessage = (name, metadata, apiNamespaceObj, ...args) => {
		        if (args.length < metadata.minArgs) {
		          throw new Error(`Expected at least ${metadata.minArgs} ${pluralizeArguments(metadata.minArgs)} for ${name}(), got ${args.length}`);
		        }

		        if (args.length > metadata.maxArgs) {
		          throw new Error(`Expected at most ${metadata.maxArgs} ${pluralizeArguments(metadata.maxArgs)} for ${name}(), got ${args.length}`);
		        }

		        return new Promise((resolve, reject) => {
		          const wrappedCb = wrappedSendMessageCallback.bind(null, {
		            resolve,
		            reject
		          });
		          args.push(wrappedCb);
		          apiNamespaceObj.sendMessage(...args);
		        });
		      };

		      const staticWrappers = {
		        devtools: {
		          network: {
		            onRequestFinished: wrapEvent(onRequestFinishedWrappers)
		          }
		        },
		        runtime: {
		          onMessage: wrapEvent(onMessageWrappers),
		          onMessageExternal: wrapEvent(onMessageWrappers),
		          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
		            minArgs: 1,
		            maxArgs: 3
		          })
		        },
		        tabs: {
		          sendMessage: wrappedSendMessage.bind(null, "sendMessage", {
		            minArgs: 2,
		            maxArgs: 3
		          })
		        }
		      };
		      const settingMetadata = {
		        clear: {
		          minArgs: 1,
		          maxArgs: 1
		        },
		        get: {
		          minArgs: 1,
		          maxArgs: 1
		        },
		        set: {
		          minArgs: 1,
		          maxArgs: 1
		        }
		      };
		      apiMetadata.privacy = {
		        network: {
		          "*": settingMetadata
		        },
		        services: {
		          "*": settingMetadata
		        },
		        websites: {
		          "*": settingMetadata
		        }
		      };
		      return wrapObject(extensionAPIs, staticWrappers, apiMetadata);
		    };

		    if (typeof chrome != "object" || !chrome || !chrome.runtime || !chrome.runtime.id) {
		      throw new Error("This script should only be loaded in a browser extension.");
		    } // The build process adds a UMD wrapper around this file, which makes the
		    // `module` variable available.


		    module.exports = wrapAPIs(chrome);
		  } else {
		    module.exports = browser;
		  }
		});
		
	} (browserPolyfill));

	var browserPolyfillExports = browserPolyfill.exports;

	Object.defineProperty(lib, "__esModule", { value: true });

	var browser$1 = lib.browser = browserPolyfillExports;

	/**
	 * Check if `vhost` is a valid suffix of `hostname` (top-domain)
	 *
	 * It means that `vhost` needs to be a suffix of `hostname` and we then need to
	 * make sure that: either they are equal, or the character preceding `vhost` in
	 * `hostname` is a '.' (it should not be a partial label).
	 *
	 * * hostname = 'not.evil.com' and vhost = 'vil.com'      => not ok
	 * * hostname = 'not.evil.com' and vhost = 'evil.com'     => ok
	 * * hostname = 'not.evil.com' and vhost = 'not.evil.com' => ok
	 */
	function shareSameDomainSuffix(hostname, vhost) {
	    if (hostname.endsWith(vhost)) {
	        return (hostname.length === vhost.length ||
	            hostname[hostname.length - vhost.length - 1] === '.');
	    }
	    return false;
	}
	/**
	 * Given a hostname and its public suffix, extract the general domain.
	 */
	function extractDomainWithSuffix(hostname, publicSuffix) {
	    // Locate the index of the last '.' in the part of the `hostname` preceding
	    // the public suffix.
	    //
	    // examples:
	    //   1. not.evil.co.uk  => evil.co.uk
	    //         ^    ^
	    //         |    | start of public suffix
	    //         | index of the last dot
	    //
	    //   2. example.co.uk   => example.co.uk
	    //     ^       ^
	    //     |       | start of public suffix
	    //     |
	    //     | (-1) no dot found before the public suffix
	    const publicSuffixIndex = hostname.length - publicSuffix.length - 2;
	    const lastDotBeforeSuffixIndex = hostname.lastIndexOf('.', publicSuffixIndex);
	    // No '.' found, then `hostname` is the general domain (no sub-domain)
	    if (lastDotBeforeSuffixIndex === -1) {
	        return hostname;
	    }
	    // Extract the part between the last '.'
	    return hostname.slice(lastDotBeforeSuffixIndex + 1);
	}
	/**
	 * Detects the domain based on rules and upon and a host string
	 */
	function getDomain(suffix, hostname, options) {
	    // Check if `hostname` ends with a member of `validHosts`.
	    if (options.validHosts !== null) {
	        const validHosts = options.validHosts;
	        for (const vhost of validHosts) {
	            if ( /*@__INLINE__*/shareSameDomainSuffix(hostname, vhost)) {
	                return vhost;
	            }
	        }
	    }
	    let numberOfLeadingDots = 0;
	    if (hostname.startsWith('.')) {
	        while (numberOfLeadingDots < hostname.length &&
	            hostname[numberOfLeadingDots] === '.') {
	            numberOfLeadingDots += 1;
	        }
	    }
	    // If `hostname` is a valid public suffix, then there is no domain to return.
	    // Since we already know that `getPublicSuffix` returns a suffix of `hostname`
	    // there is no need to perform a string comparison and we only compare the
	    // size.
	    if (suffix.length === hostname.length - numberOfLeadingDots) {
	        return null;
	    }
	    // To extract the general domain, we start by identifying the public suffix
	    // (if any), then consider the domain to be the public suffix with one added
	    // level of depth. (e.g.: if hostname is `not.evil.co.uk` and public suffix:
	    // `co.uk`, then we take one more level: `evil`, giving the final result:
	    // `evil.co.uk`).
	    return /*@__INLINE__*/ extractDomainWithSuffix(hostname, suffix);
	}

	/**
	 * Return the part of domain without suffix.
	 *
	 * Example: for domain 'foo.com', the result would be 'foo'.
	 */
	function getDomainWithoutSuffix(domain, suffix) {
	    // Note: here `domain` and `suffix` cannot have the same length because in
	    // this case we set `domain` to `null` instead. It is thus safe to assume
	    // that `suffix` is shorter than `domain`.
	    return domain.slice(0, -suffix.length - 1);
	}

	/**
	 * @param url - URL we want to extract a hostname from.
	 * @param urlIsValidHostname - hint from caller; true if `url` is already a valid hostname.
	 */
	function extractHostname(url, urlIsValidHostname) {
	    let start = 0;
	    let end = url.length;
	    let hasUpper = false;
	    // If url is not already a valid hostname, then try to extract hostname.
	    if (!urlIsValidHostname) {
	        // Special handling of data URLs
	        if (url.startsWith('data:')) {
	            return null;
	        }
	        // Trim leading spaces
	        while (start < url.length && url.charCodeAt(start) <= 32) {
	            start += 1;
	        }
	        // Trim trailing spaces
	        while (end > start + 1 && url.charCodeAt(end - 1) <= 32) {
	            end -= 1;
	        }
	        // Skip scheme.
	        if (url.charCodeAt(start) === 47 /* '/' */ &&
	            url.charCodeAt(start + 1) === 47 /* '/' */) {
	            start += 2;
	        }
	        else {
	            const indexOfProtocol = url.indexOf(':/', start);
	            if (indexOfProtocol !== -1) {
	                // Implement fast-path for common protocols. We expect most protocols
	                // should be one of these 4 and thus we will not need to perform the
	                // more expansive validity check most of the time.
	                const protocolSize = indexOfProtocol - start;
	                const c0 = url.charCodeAt(start);
	                const c1 = url.charCodeAt(start + 1);
	                const c2 = url.charCodeAt(start + 2);
	                const c3 = url.charCodeAt(start + 3);
	                const c4 = url.charCodeAt(start + 4);
	                if (protocolSize === 5 &&
	                    c0 === 104 /* 'h' */ &&
	                    c1 === 116 /* 't' */ &&
	                    c2 === 116 /* 't' */ &&
	                    c3 === 112 /* 'p' */ &&
	                    c4 === 115 /* 's' */) ;
	                else if (protocolSize === 4 &&
	                    c0 === 104 /* 'h' */ &&
	                    c1 === 116 /* 't' */ &&
	                    c2 === 116 /* 't' */ &&
	                    c3 === 112 /* 'p' */) ;
	                else if (protocolSize === 3 &&
	                    c0 === 119 /* 'w' */ &&
	                    c1 === 115 /* 's' */ &&
	                    c2 === 115 /* 's' */) ;
	                else if (protocolSize === 2 &&
	                    c0 === 119 /* 'w' */ &&
	                    c1 === 115 /* 's' */) ;
	                else {
	                    // Check that scheme is valid
	                    for (let i = start; i < indexOfProtocol; i += 1) {
	                        const lowerCaseCode = url.charCodeAt(i) | 32;
	                        if (!(((lowerCaseCode >= 97 && lowerCaseCode <= 122) || // [a, z]
	                            (lowerCaseCode >= 48 && lowerCaseCode <= 57) || // [0, 9]
	                            lowerCaseCode === 46 || // '.'
	                            lowerCaseCode === 45 || // '-'
	                            lowerCaseCode === 43) // '+'
	                        )) {
	                            return null;
	                        }
	                    }
	                }
	                // Skip 0, 1 or more '/' after ':/'
	                start = indexOfProtocol + 2;
	                while (url.charCodeAt(start) === 47 /* '/' */) {
	                    start += 1;
	                }
	            }
	        }
	        // Detect first occurrence of '/', '?' or '#'. We also keep track of the
	        // last occurrence of '@', ']' or ':' to speed-up subsequent parsing of
	        // (respectively), identifier, ipv6 or port.
	        let indexOfIdentifier = -1;
	        let indexOfClosingBracket = -1;
	        let indexOfPort = -1;
	        for (let i = start; i < end; i += 1) {
	            const code = url.charCodeAt(i);
	            if (code === 35 || // '#'
	                code === 47 || // '/'
	                code === 63 // '?'
	            ) {
	                end = i;
	                break;
	            }
	            else if (code === 64) {
	                // '@'
	                indexOfIdentifier = i;
	            }
	            else if (code === 93) {
	                // ']'
	                indexOfClosingBracket = i;
	            }
	            else if (code === 58) {
	                // ':'
	                indexOfPort = i;
	            }
	            else if (code >= 65 && code <= 90) {
	                hasUpper = true;
	            }
	        }
	        // Detect identifier: '@'
	        if (indexOfIdentifier !== -1 &&
	            indexOfIdentifier > start &&
	            indexOfIdentifier < end) {
	            start = indexOfIdentifier + 1;
	        }
	        // Handle ipv6 addresses
	        if (url.charCodeAt(start) === 91 /* '[' */) {
	            if (indexOfClosingBracket !== -1) {
	                return url.slice(start + 1, indexOfClosingBracket).toLowerCase();
	            }
	            return null;
	        }
	        else if (indexOfPort !== -1 && indexOfPort > start && indexOfPort < end) {
	            // Detect port: ':'
	            end = indexOfPort;
	        }
	    }
	    // Trim trailing dots
	    while (end > start + 1 && url.charCodeAt(end - 1) === 46 /* '.' */) {
	        end -= 1;
	    }
	    const hostname = start !== 0 || end !== url.length ? url.slice(start, end) : url;
	    if (hasUpper) {
	        return hostname.toLowerCase();
	    }
	    return hostname;
	}

	/**
	 * Check if a hostname is an IP. You should be aware that this only works
	 * because `hostname` is already garanteed to be a valid hostname!
	 */
	function isProbablyIpv4(hostname) {
	    // Cannot be shorted than 1.1.1.1
	    if (hostname.length < 7) {
	        return false;
	    }
	    // Cannot be longer than: 255.255.255.255
	    if (hostname.length > 15) {
	        return false;
	    }
	    let numberOfDots = 0;
	    for (let i = 0; i < hostname.length; i += 1) {
	        const code = hostname.charCodeAt(i);
	        if (code === 46 /* '.' */) {
	            numberOfDots += 1;
	        }
	        else if (code < 48 /* '0' */ || code > 57 /* '9' */) {
	            return false;
	        }
	    }
	    return (numberOfDots === 3 &&
	        hostname.charCodeAt(0) !== 46 /* '.' */ &&
	        hostname.charCodeAt(hostname.length - 1) !== 46 /* '.' */);
	}
	/**
	 * Similar to isProbablyIpv4.
	 */
	function isProbablyIpv6(hostname) {
	    if (hostname.length < 3) {
	        return false;
	    }
	    let start = hostname.startsWith('[') ? 1 : 0;
	    let end = hostname.length;
	    if (hostname[end - 1] === ']') {
	        end -= 1;
	    }
	    // We only consider the maximum size of a normal IPV6. Note that this will
	    // fail on so-called "IPv4 mapped IPv6 addresses" but this is a corner-case
	    // and a proper validation library should be used for these.
	    if (end - start > 39) {
	        return false;
	    }
	    let hasColon = false;
	    for (; start < end; start += 1) {
	        const code = hostname.charCodeAt(start);
	        if (code === 58 /* ':' */) {
	            hasColon = true;
	        }
	        else if (!(((code >= 48 && code <= 57) || // 0-9
	            (code >= 97 && code <= 102) || // a-f
	            (code >= 65 && code <= 90)) // A-F
	        )) {
	            return false;
	        }
	    }
	    return hasColon;
	}
	/**
	 * Check if `hostname` is *probably* a valid ip addr (either ipv6 or ipv4).
	 * This *will not* work on any string. We need `hostname` to be a valid
	 * hostname.
	 */
	function isIp(hostname) {
	    return isProbablyIpv6(hostname) || isProbablyIpv4(hostname);
	}

	/**
	 * Implements fast shallow verification of hostnames. This does not perform a
	 * struct check on the content of labels (classes of Unicode characters, etc.)
	 * but instead check that the structure is valid (number of labels, length of
	 * labels, etc.).
	 *
	 * If you need stricter validation, consider using an external library.
	 */
	function isValidAscii(code) {
	    return ((code >= 97 && code <= 122) || (code >= 48 && code <= 57) || code > 127);
	}
	/**
	 * Check if a hostname string is valid. It's usually a preliminary check before
	 * trying to use getDomain or anything else.
	 *
	 * Beware: it does not check if the TLD exists.
	 */
	function isValidHostname (hostname) {
	    if (hostname.length > 255) {
	        return false;
	    }
	    if (hostname.length === 0) {
	        return false;
	    }
	    if (
	    /*@__INLINE__*/ !isValidAscii(hostname.charCodeAt(0)) &&
	        hostname.charCodeAt(0) !== 46 && // '.' (dot)
	        hostname.charCodeAt(0) !== 95 // '_' (underscore)
	    ) {
	        return false;
	    }
	    // Validate hostname according to RFC
	    let lastDotIndex = -1;
	    let lastCharCode = -1;
	    const len = hostname.length;
	    for (let i = 0; i < len; i += 1) {
	        const code = hostname.charCodeAt(i);
	        if (code === 46 /* '.' */) {
	            if (
	            // Check that previous label is < 63 bytes long (64 = 63 + '.')
	            i - lastDotIndex > 64 ||
	                // Check that previous character was not already a '.'
	                lastCharCode === 46 ||
	                // Check that the previous label does not end with a '-' (dash)
	                lastCharCode === 45 ||
	                // Check that the previous label does not end with a '_' (underscore)
	                lastCharCode === 95) {
	                return false;
	            }
	            lastDotIndex = i;
	        }
	        else if (!( /*@__INLINE__*/(isValidAscii(code) || code === 45 || code === 95))) {
	            // Check if there is a forbidden character in the label
	            return false;
	        }
	        lastCharCode = code;
	    }
	    return (
	    // Check that last label is shorter than 63 chars
	    len - lastDotIndex - 1 <= 63 &&
	        // Check that the last character is an allowed trailing label character.
	        // Since we already checked that the char is a valid hostname character,
	        // we only need to check that it's different from '-'.
	        lastCharCode !== 45);
	}

	function setDefaultsImpl({ allowIcannDomains = true, allowPrivateDomains = false, detectIp = true, extractHostname = true, mixedInputs = true, validHosts = null, validateHostname = true, }) {
	    return {
	        allowIcannDomains,
	        allowPrivateDomains,
	        detectIp,
	        extractHostname,
	        mixedInputs,
	        validHosts,
	        validateHostname,
	    };
	}
	const DEFAULT_OPTIONS = /*@__INLINE__*/ setDefaultsImpl({});
	function setDefaults(options) {
	    if (options === undefined) {
	        return DEFAULT_OPTIONS;
	    }
	    return /*@__INLINE__*/ setDefaultsImpl(options);
	}

	/**
	 * Returns the subdomain of a hostname string
	 */
	function getSubdomain(hostname, domain) {
	    // If `hostname` and `domain` are the same, then there is no sub-domain
	    if (domain.length === hostname.length) {
	        return '';
	    }
	    return hostname.slice(0, -domain.length - 1);
	}

	/**
	 * Implement a factory allowing to plug different implementations of suffix
	 * lookup (e.g.: using a trie or the packed hashes datastructures). This is used
	 * and exposed in `tldts.ts` and `tldts-experimental.ts` bundle entrypoints.
	 */
	function getEmptyResult() {
	    return {
	        domain: null,
	        domainWithoutSuffix: null,
	        hostname: null,
	        isIcann: null,
	        isIp: null,
	        isPrivate: null,
	        publicSuffix: null,
	        subdomain: null,
	    };
	}
	function parseImpl(url, step, suffixLookup, partialOptions, result) {
	    const options = /*@__INLINE__*/ setDefaults(partialOptions);
	    // Very fast approximate check to make sure `url` is a string. This is needed
	    // because the library will not necessarily be used in a typed setup and
	    // values of arbitrary types might be given as argument.
	    if (typeof url !== 'string') {
	        return result;
	    }
	    // Extract hostname from `url` only if needed. This can be made optional
	    // using `options.extractHostname`. This option will typically be used
	    // whenever we are sure the inputs to `parse` are already hostnames and not
	    // arbitrary URLs.
	    //
	    // `mixedInput` allows to specify if we expect a mix of URLs and hostnames
	    // as input. If only hostnames are expected then `extractHostname` can be
	    // set to `false` to speed-up parsing. If only URLs are expected then
	    // `mixedInputs` can be set to `false`. The `mixedInputs` is only a hint
	    // and will not change the behavior of the library.
	    if (!options.extractHostname) {
	        result.hostname = url;
	    }
	    else if (options.mixedInputs) {
	        result.hostname = extractHostname(url, isValidHostname(url));
	    }
	    else {
	        result.hostname = extractHostname(url, false);
	    }
	    if (result.hostname === null) {
	        return result;
	    }
	    // Check if `hostname` is a valid ip address
	    if (options.detectIp) {
	        result.isIp = isIp(result.hostname);
	        if (result.isIp) {
	            return result;
	        }
	    }
	    // Perform optional hostname validation. If hostname is not valid, no need to
	    // go further as there will be no valid domain or sub-domain.
	    if (options.validateHostname &&
	        options.extractHostname &&
	        !isValidHostname(result.hostname)) {
	        result.hostname = null;
	        return result;
	    }
	    // Extract public suffix
	    suffixLookup(result.hostname, options, result);
	    if (result.publicSuffix === null) {
	        return result;
	    }
	    // Extract domain
	    result.domain = getDomain(result.publicSuffix, result.hostname, options);
	    if (result.domain === null) {
	        return result;
	    }
	    // Extract subdomain
	    result.subdomain = getSubdomain(result.hostname, result.domain);
	    // Extract domain without suffix
	    result.domainWithoutSuffix = getDomainWithoutSuffix(result.domain, result.publicSuffix);
	    return result;
	}

	function fastPathLookup (hostname, options, out) {
	    // Fast path for very popular suffixes; this allows to by-pass lookup
	    // completely as well as any extra allocation or string manipulation.
	    if (!options.allowPrivateDomains && hostname.length > 3) {
	        const last = hostname.length - 1;
	        const c3 = hostname.charCodeAt(last);
	        const c2 = hostname.charCodeAt(last - 1);
	        const c1 = hostname.charCodeAt(last - 2);
	        const c0 = hostname.charCodeAt(last - 3);
	        if (c3 === 109 /* 'm' */ &&
	            c2 === 111 /* 'o' */ &&
	            c1 === 99 /* 'c' */ &&
	            c0 === 46 /* '.' */) {
	            out.isIcann = true;
	            out.isPrivate = false;
	            out.publicSuffix = 'com';
	            return true;
	        }
	        else if (c3 === 103 /* 'g' */ &&
	            c2 === 114 /* 'r' */ &&
	            c1 === 111 /* 'o' */ &&
	            c0 === 46 /* '.' */) {
	            out.isIcann = true;
	            out.isPrivate = false;
	            out.publicSuffix = 'org';
	            return true;
	        }
	        else if (c3 === 117 /* 'u' */ &&
	            c2 === 100 /* 'd' */ &&
	            c1 === 101 /* 'e' */ &&
	            c0 === 46 /* '.' */) {
	            out.isIcann = true;
	            out.isPrivate = false;
	            out.publicSuffix = 'edu';
	            return true;
	        }
	        else if (c3 === 118 /* 'v' */ &&
	            c2 === 111 /* 'o' */ &&
	            c1 === 103 /* 'g' */ &&
	            c0 === 46 /* '.' */) {
	            out.isIcann = true;
	            out.isPrivate = false;
	            out.publicSuffix = 'gov';
	            return true;
	        }
	        else if (c3 === 116 /* 't' */ &&
	            c2 === 101 /* 'e' */ &&
	            c1 === 110 /* 'n' */ &&
	            c0 === 46 /* '.' */) {
	            out.isIcann = true;
	            out.isPrivate = false;
	            out.publicSuffix = 'net';
	            return true;
	        }
	        else if (c3 === 101 /* 'e' */ &&
	            c2 === 100 /* 'd' */ &&
	            c1 === 46 /* '.' */) {
	            out.isIcann = true;
	            out.isPrivate = false;
	            out.publicSuffix = 'de';
	            return true;
	        }
	    }
	    return false;
	}

	// Code automatically generated using ./bin/builders/hashes.ts
	var packed = new Uint32Array([6, 0, 0, 9, 5860739, 5860978, 5861026, 5861029, 5861126, 5861352, 5861357, 5861403, 5861586, 0, 0, 0, 1, 1850179732, 0, 9, 328184559, 1866923597, 2123501943, 2282562397, 2795346450, 3130446446, 3136607046, 3453334789, 4194175729, 67, 3156266, 19510334, 20989895, 64887183, 65021741, 101876503, 179500755, 311298055, 425802535, 460682395, 582839475, 819014943, 819028732, 1075688039, 1139486022, 1179004234, 1241916785, 1335010188, 1370787547, 1370800824, 1431231509, 1498275876, 1516508161, 1522025464, 1544104458, 1554653742, 1570707647, 1626814538, 1675555530, 1679919230, 1687232530, 1692185483, 1730108052, 1789539963, 1873769763, 1893848785, 2001752368, 2023201532, 2182413090, 2391299855, 2419619562, 2445171142, 2453492351, 2496327381, 2525245455, 2573179642, 2703420555, 2709520566, 2762771525, 2800127296, 2921343336, 2989808530, 3000405309, 3015527775, 3047607849, 3382460164, 3420815319, 3461355676, 3498015045, 3738715095, 3810061811, 3843717774, 3934774481, 4033285539, 4085096371, 4146774829, 4208486561, 3696, 100835, 372942, 373596, 399643, 403867, 589540, 737224, 1210028, 1861414, 2424682, 2658901, 2946999, 3329363, 3333156, 6942202, 9086062, 9095117, 9267209, 9340158, 9485932, 11010102, 11406846, 16314893, 17546564, 18146303, 18331450, 19211200, 20314441, 20797457, 25057869, 26663359, 28320278, 30499151, 30585840, 36605120, 36775470, 36775473, 36990037, 39275208, 41892561, 42049478, 42538024, 45214788, 47656662, 50173535, 53599326, 53858455, 54537430, 63815836, 64422985, 64643127, 64831187, 69971116, 73517283, 73904368, 75706244, 78793775, 78794171, 79558910, 80324123, 84993902, 87977581, 87978853, 87978860, 93811268, 95641381, 95641777, 96671837, 100511481, 100947456, 108215410, 108929491, 110526112, 110662188, 112311307, 114507832, 116811054, 120488259, 122521550, 133427701, 134012911, 141513861, 141517490, 144349377, 144362028, 144550088, 144770230, 147205859, 147810002, 147989623, 149598895, 150736276, 150856054, 152379730, 156555774, 164189124, 164189258, 164189262, 164189691, 164189842, 164560958, 165069166, 165106627, 165107021, 165339368, 165444557, 165444558, 165444615, 165444629, 165444745, 165444749, 165445368, 165512129, 165512527, 165749053, 165749188, 165749299, 165749435, 165749535, 165779060, 167155067, 169909265, 169909275, 169909419, 169909512, 169909517, 169909531, 169909608, 169909724, 169909733, 169909734, 169909738, 169909857, 169910036, 169910195, 169910226, 169938982, 169939075, 169939172, 169939304, 169939334, 169939474, 169939481, 169939680, 169939682, 169939793, 169977029, 169977163, 170281136, 170281250, 170281253, 170281258, 170281275, 170281382, 170281390, 170281415, 170281447, 170281457, 170281473, 170281497, 170281511, 170281522, 170281525, 170281528, 170281579, 170281589, 170281687, 170281689, 170281699, 170281742, 170281776, 170281812, 170281852, 170281902, 170281972, 170311352, 170649202, 170649385, 170649596, 171188220, 172078401, 172145927, 172484120, 172484301, 172788260, 172788689, 172788693, 172788754, 172788809, 172788827, 173118530, 173118924, 173456648, 173591948, 173930212, 173930286, 174129293, 174306499, 174306893, 174307245, 174307439, 174358551, 174374100, 174407806, 174410098, 174488250, 174509317, 174577099, 174644617, 174843632, 174844030, 174847160, 175181758, 175524135, 175524873, 176843304, 176948764, 178529610, 178530165, 178530256, 178530299, 178530303, 178530355, 178868363, 178868576, 178868974, 179274397, 179274476, 179379459, 179379616, 179379624, 179379849, 179379853, 179380220, 179657877, 179692651, 179714168, 179913714, 180090112, 180090244, 180090304, 180090314, 180090337, 180090372, 180090450, 180090510, 180090525, 180090526, 180090587, 180090702, 180091049, 180091118, 180091210, 180091228, 180091258, 180091259, 180283722, 180292996, 180293014, 180293036, 180293067, 180293093, 180293105, 180293124, 180293152, 180293156, 180293169, 180293179, 180293199, 180293253, 180293290, 180293294, 180293300, 180293302, 180293304, 180293317, 180293344, 180293346, 180293381, 180293447, 180293487, 180293501, 180293503, 180293522, 180293535, 180293716, 180293796, 180293819, 180293997, 180294000, 180294004, 180294009, 180428032, 180902137, 180969265, 180969566, 180969653, 180969723, 181240259, 181240353, 181240367, 181240371, 181240391, 181240392, 181240393, 181240398, 181240404, 181240451, 181240474, 181240479, 181240483, 181240490, 181240509, 181240515, 181240844, 181240853, 181240956, 181241149, 181241165, 181241168, 181244839, 181375748, 181548621, 181548644, 181548727, 181548873, 181549108, 181549176, 181949900, 181950639, 182056031, 182385920, 182419943, 182893167, 182893283, 182893394, 182893788, 183163149, 183163151, 183163155, 183163168, 183163169, 183163171, 183163181, 183163182, 183163183, 183163186, 183163188, 183163233, 183163248, 183163251, 183163252, 183163254, 183163270, 183163303, 183163314, 183163317, 183163334, 183163335, 183163336, 183163340, 183163345, 183163347, 183163350, 183163362, 183163363, 183163365, 183163366, 183163367, 183163371, 183163375, 183163376, 183163378, 183163380, 183163383, 183163630, 183163631, 183163644, 183163649, 183163651, 183163653, 183163655, 183163664, 183163668, 183163669, 183163678, 183163679, 183163682, 183163687, 183163713, 183163715, 183163728, 183163731, 183163735, 183163742, 183163777, 183163779, 183163780, 183163781, 183163783, 183163796, 183163797, 183163801, 183163843, 183163845, 183163847, 183163859, 183163864, 183163865, 183163874, 183163895, 183163897, 183163913, 183163922, 183163933, 183163960, 183163961, 183163963, 183163977, 183163978, 183163979, 183163981, 183163988, 183163989, 183163991, 183163992, 183163994, 183163995, 183163998, 183164008, 183164010, 183164012, 183164021, 183164025, 183164026, 183164027, 183164029, 183164041, 183164044, 183164045, 183164047, 183164050, 183164051, 183164057, 183164060, 183164061, 183164093, 184080938, 184081253, 184081673, 184081677, 184081778, 184246330, 184246511, 184486318, 184486865, 184487263, 184828195, 184828212, 184844696, 184844824, 184848486, 184848491, 184849029, 184849387, 184859173, 184869208, 184869819, 184994607, 185163947, 185216284, 185289081, 185292632, 185295605, 185501943, 185502073, 185502077, 185772974, 186723357, 186723671, 186723801, 186753074, 186763265, 186771866, 186840059, 186858006, 186875993, 186950941, 186953244, 186994101, 186994720, 187011432, 187022814, 187064894, 187067400, 187076090, 187078647, 187088813, 187161171, 187188812, 187203075, 187219343, 187222314, 187251332, 187328908, 187332203, 187378741, 187385256, 187386889, 187403121, 187403860, 187404132, 187409119, 187410536, 187415116, 187415841, 187417183, 187453423, 187455618, 187483569, 187506658, 187521457, 187531575, 187554851, 187557872, 187932036, 187932044, 187932595, 187932730, 187932752, 187932756, 187932794, 187932985, 187932989, 189851312, 190236828, 190304994, 190305388, 190372512, 190372516, 190372621, 190372839, 190373457, 190575460, 190575594, 190879986, 191043224, 191246659, 191458643, 191459037, 191524213, 193856736, 193857103, 193857114, 193857243, 193991787, 194363750, 194498585, 194498630, 194498988, 194499056, 194499063, 194532263, 194532626, 194532630, 194532693, 194532760, 194532936, 194533115, 194802308, 194802313, 194802316, 194802351, 194802818, 194802832, 194802974, 194803141, 194803143, 194803161, 194803226, 194803230, 194836546, 194870589, 194870610, 194871004, 195040013, 195040230, 195040360, 195077902, 195078025, 195078028, 195078034, 195078035, 195078038, 195078058, 195078062, 195078071, 195078081, 195078095, 195078112, 195078119, 195078120, 195078149, 195078150, 195078156, 195078185, 195078215, 195078217, 195078250, 195078251, 195078272, 195078273, 195078277, 195078283, 195078287, 195078298, 195078299, 195078300, 195078368, 195078372, 195078375, 195078394, 195078464, 195078474, 195078493, 195078531, 195078554, 195078559, 195078687, 195078710, 195078753, 195078828, 195078837, 195078892, 195078895, 195078900, 195078906, 195078959, 195078960, 195078974, 195078995, 195078997, 195079007, 195146051, 195817892, 195817910, 195818040, 196653590, 197775763, 198219289, 198248729, 198354195, 198354632, 202063369, 203326381, 203326382, 203326695, 203326709, 203326825, 203326829, 203327047, 203327192, 203360584, 203427712, 203428110, 203563443, 203563837, 203664976, 203665374, 203762913, 203901612, 204069808, 206121592, 207568995, 208227118, 218659706, 219797064, 231775478, 232791016, 232866163, 232870916, 237059472, 238230825, 238671321, 241611072, 245880244, 249954601, 256262487, 257210252, 257542887, 259829097, 260353797, 260353928, 260353938, 260354380, 260381156, 260390354, 271387034, 274691435, 279382168, 280527902, 280532777, 280535076, 280542659, 281931451, 292827804, 295209043, 296292341, 297619746, 305011770, 306510696, 313583000, 314643431, 320313766, 320318114, 321023689, 321141002, 321447655, 325454853, 326762411, 337081594, 338040061, 339830659, 340010259, 341833935, 342149828, 342665371, 356194258, 359223603, 359276554, 360327984, 368215882, 370146306, 370150662, 373255328, 373394720, 374785091, 376173808, 377307531, 377336144, 377652210, 379825795, 380248845, 380316586, 381874529, 381884647, 382049883, 382486912, 382598847, 389069795, 389909922, 392084057, 393290800, 395076177, 395140257, 402724451, 403769719, 404122044, 410188633, 413977571, 418962805, 419080649, 423458772, 430711818, 430784915, 431116435, 431157415, 431370962, 431390595, 431489022, 431585240, 431586828, 431608121, 433686700, 442888655, 442922019, 445176561, 449218512, 449424719, 451217894, 451870618, 459172225, 459395692, 464626711, 464765206, 464834904, 469098393, 471052880, 478642118, 480635114, 480636362, 480638119, 480638181, 480638612, 480653244, 480658155, 480658807, 484603510, 484645735, 486805732, 490264076, 490274093, 493445761, 511578298, 513731936, 514111995, 514955151, 515474792, 515491843, 515593995, 518161197, 520595267, 522631343, 523234636, 525872321, 527144416, 531427447, 533682535, 533847771, 534396735, 545433338, 547443445, 550462929, 551440509, 557981738, 559064708, 560636591, 572640614, 572652435, 572800203, 572833146, 572867160, 575127842, 575742406, 575835832, 576106402, 576590271, 577168455, 582462766, 583917065, 583936789, 584490345, 587768078, 588145733, 596395114, 596517435, 602054693, 609523853, 627471386, 630686153, 632559259, 635121653, 635859009, 637007260, 643488605, 643663853, 648304671, 650538190, 656171171, 656243914, 656640963, 665693626, 667797222, 678076451, 684522993, 684536293, 689172736, 689202009, 693611235, 694324728, 695649196, 703142796, 706540885, 707132367, 715533184, 722903474, 725879070, 728415570, 731964179, 733989474, 744440632, 745674128, 752520493, 752687122, 752687226, 752699150, 752938578, 753314817, 762792020, 766278458, 771168358, 772916985, 785945688, 787032422, 793080342, 794341423, 794638681, 799598398, 803443550, 803504423, 803576910, 803750530, 804899040, 810638083, 813049915, 813882670, 813882809, 821390609, 822184173, 824372117, 826639012, 826993974, 827624512, 831815016, 834750300, 834856638, 834963202, 835666250, 838463501, 843454848, 845393562, 845537310, 846032279, 853098265, 855980394, 858467853, 869651422, 878524814, 881613818, 885943745, 896206971, 896253025, 900375831, 900562876, 904696072, 907903147, 911040096, 912288153, 912452591, 913046780, 914761571, 915088911, 915769822, 915838470, 919008564, 919376364, 928343570, 933141848, 935240483, 936096500, 939243980, 939281294, 939375524, 939697158, 939922440, 940027871, 942743627, 943328481, 943363810, 947022624, 950098348, 954017396, 958817278, 959069811, 961909457, 961915153, 962363178, 962549619, 962816118, 963013768, 968961134, 973306633, 973587946, 973591516, 973595243, 973613934, 973618563, 976871270, 977251657, 983929219, 983931665, 983936021, 984542401, 985854160, 994961720, 1002154839, 1005485664, 1005660307, 1005931709, 1008280710, 1009678005, 1015938248, 1018008327, 1024510565, 1027688850, 1033879086, 1034357170, 1038843968, 1039500800, 1043537387, 1043742405, 1044060157, 1045601283, 1046273911, 1046743273, 1046756254, 1048099261, 1052311686, 1052441930, 1052883806, 1055187548, 1056740120, 1058016469, 1059921109, 1068743400, 1072264613, 1080832696, 1083646554, 1084662717, 1086607170, 1086818213, 1086839634, 1087030220, 1087432248, 1087540767, 1088313455, 1101657937, 1101658065, 1102136407, 1102691201, 1104888372, 1107574816, 1107604513, 1107608406, 1114346722, 1115517588, 1116603570, 1116886791, 1121068214, 1121069468, 1123274870, 1123277038, 1123281470, 1123286137, 1123300855, 1135543458, 1135544712, 1135545955, 1135553917, 1135559494, 1135563376, 1141006631, 1141018311, 1142918810, 1143019669, 1145288372, 1146787097, 1149112251, 1151589762, 1152383075, 1153556935, 1153560693, 1153560855, 1153576209, 1153582928, 1155609853, 1158010336, 1158014282, 1158019276, 1158022529, 1158025585, 1158030151, 1158040127, 1158040853, 1158043091, 1160141196, 1160245697, 1160246728, 1160253683, 1160271099, 1160271446, 1160272445, 1160277399, 1161223806, 1161235355, 1162489113, 1166908086, 1166937977, 1166949933, 1166952503, 1166953757, 1166959964, 1169030529, 1169037994, 1169039382, 1169046802, 1169046815, 1169048548, 1169054036, 1169994302, 1171270800, 1171270813, 1172775704, 1174042111, 1174752677, 1174762471, 1175721241, 1175725254, 1175726508, 1175727467, 1175727495, 1175735444, 1175735449, 1175736592, 1175738385, 1175738578, 1175738760, 1175746250, 1175746252, 1175749986, 1175793566, 1181427747, 1181429001, 1181435208, 1181446765, 1181453654, 1181460959, 1185692184, 1189090107, 1193567716, 1194400508, 1204258276, 1204470469, 1207765705, 1207825797, 1208230324, 1208517393, 1208911775, 1211364607, 1212671635, 1214258492, 1217924538, 1220965831, 1229000062, 1229783327, 1232816452, 1237771172, 1237773393, 1237773841, 1245899123, 1247245722, 1257366451, 1260762188, 1261854970, 1265324777, 1265669119, 1273073240, 1280280379, 1280768035, 1291368159, 1295085673, 1296518360, 1297048848, 1300364681, 1303650868, 1304687455, 1304781392, 1304918086, 1305056028, 1306968125, 1306972554, 1306973586, 1307665177, 1308558601, 1308559744, 1308574194, 1308583254, 1308584508, 1308585495, 1310785148, 1310799239, 1310800921, 1310801269, 1310803416, 1310807041, 1310808370, 1311349087, 1313021694, 1313023237, 1313030377, 1314270973, 1314287001, 1314293208, 1321085506, 1324313259, 1324313985, 1324320704, 1324322270, 1324332261, 1324636022, 1325293061, 1325300526, 1325303158, 1325308368, 1325309334, 1325309339, 1325310241, 1325310486, 1325311328, 1325311482, 1326707500, 1328209699, 1328777903, 1328778629, 1328785348, 1328786906, 1328789635, 1328794451, 1328797153, 1329963165, 1329987910, 1330666198, 1330807345, 1330903052, 1331009222, 1331010221, 1331013633, 1331015175, 1331019352, 1331025251, 1331026645, 1331028446, 1331143849, 1335892543, 1336436046, 1336436772, 1336437775, 1336438057, 1336439236, 1336443338, 1336449024, 1336456660, 1336460266, 1336462620, 1336463768, 1336469142, 1341018428, 1341081128, 1341091249, 1341179896, 1342001696, 1344411053, 1344426134, 1344436952, 1344437939, 1344444146, 1346529166, 1349466130, 1350170659, 1350170661, 1350356518, 1350356534, 1350620578, 1351056251, 1351154191, 1351382419, 1351445663, 1354447091, 1354448055, 1354464484, 1354467042, 1354475004, 1354584300, 1355466970, 1355483586, 1355607656, 1355929695, 1355947655, 1356150953, 1356150969, 1356150973, 1356457867, 1356471002, 1356757572, 1357692080, 1357876668, 1357880232, 1360043731, 1360220638, 1362168625, 1362262729, 1362271868, 1362285703, 1362326863, 1362506071, 1362656266, 1365811994, 1367692098, 1367811071, 1368820926, 1369663049, 1377739598, 1378565283, 1379014609, 1383613953, 1383613964, 1383629111, 1383647122, 1385857457, 1385879444, 1388074128, 1388078600, 1388084119, 1388086017, 1388094003, 1388104573, 1388109527, 1388111766, 1390304957, 1390318095, 1390319238, 1390327192, 1390328435, 1390329689, 1391292472, 1391295130, 1391298115, 1391299402, 1391302044, 1391307254, 1391308253, 1392560940, 1396553940, 1397006395, 1397007527, 1397007872, 1397007885, 1397015305, 1397016949, 1397022431, 1400354688, 1400355947, 1400356673, 1400360856, 1400364702, 1400366245, 1401741660, 1407053336, 1407067683, 1409840426, 1410939834, 1414623055, 1417953492, 1417953925, 1417969521, 1417971248, 1418042854, 1418666866, 1422407147, 1422418384, 1422432926, 1422434165, 1422435892, 1423090882, 1425971467, 1426162994, 1426865884, 1426871783, 1426872814, 1426880658, 1426881913, 1426884152, 1428612014, 1429098926, 1429105132, 1429112250, 1430623854, 1433558874, 1433568865, 1433577620, 1433578879, 1435862377, 1444705448, 1444706435, 1444707945, 1444708598, 1444713016, 1444718265, 1444720166, 1444723003, 1444725453, 1444731199, 1444731564, 1444731950, 1444732047, 1444732342, 1444732347, 1444738453, 1448052138, 1448052864, 1448054123, 1448067662, 1448078965, 1449172589, 1452091461, 1453961462, 1457037634, 1457145422, 1457156469, 1457178704, 1459376581, 1459377857, 1459377868, 1459384567, 1459385707, 1459403577, 1459405260, 1459408531, 1463053013, 1463840740, 1463842504, 1463849459, 1463849797, 1463867222, 1463868221, 1463873175, 1464819582, 1464821125, 1464829402, 1464830128, 1464831131, 1465838987, 1466068861, 1466074694, 1466091096, 1466403701, 1467047928, 1467061763, 1467063453, 1467065948, 1467070902, 1468307140, 1468314970, 1468321435, 1469284474, 1469285761, 1469294772, 1469295775, 1471526086, 1474720970, 1474751199, 1474796155, 1474852365, 1474856386, 1474857640, 1474858627, 1474866589, 1474867476, 1474871748, 1474880870, 1482183211, 1482187228, 1482389973, 1486003341, 1486005836, 1486010790, 1486021608, 1486029338, 1486036499, 1486036510, 1491300687, 1492905126, 1495099017, 1496999162, 1497335658, 1497338257, 1497341434, 1497353781, 1497360500, 1497361503, 1503214457, 1504022303, 1504024292, 1504032122, 1504033105, 1504038587, 1509379857, 1510741574, 1514359714, 1514604870, 1517410020, 1517415502, 1517416485, 1517424315, 1517426048, 1519466742, 1519486936, 1521633706, 1524564715, 1526518672, 1534242148, 1535379077, 1535411852, 1535416972, 1535418272, 1535419013, 1535426999, 1535427585, 1535429447, 1535437817, 1535442771, 1535445010, 1538631370, 1539876488, 1539883905, 1539891891, 1539902461, 1539907415, 1539909654, 1540853566, 1540863813, 1540865371, 1540871834, 1540872816, 1540972285, 1544565822, 1547523228, 1548000883, 1548203684, 1548662272, 1548668010, 1548668993, 1548676831, 1548677846, 1548686756, 1550655859, 1551291701, 1552780862, 1554083280, 1554160502, 1556617220, 1556618479, 1556619205, 1556627226, 1556629025, 1571587981, 1572843623, 1577978899, 1578737375, 1579027766, 1580891870, 1580902117, 1580903020, 1580910138, 1580910864, 1581061599, 1584242651, 1584252576, 1584258687, 1584260414, 1584261397, 1594150134, 1594318433, 1594644051, 1595762332, 1596345927, 1596503336, 1599871881, 1600554193, 1600562964, 1600967980, 1600968967, 1600970477, 1600988233, 1600993979, 1600994866, 1600997301, 1601541268, 1602995891, 1603061457, 1604314670, 1604316655, 1604330442, 1604341489, 1604342648, 1605183784, 1605406132, 1605908391, 1607689728, 1607689741, 1607690628, 1607701062, 1607701276, 1607705078, 1607710365, 1607715640, 1607716607, 1607716627, 1608344260, 1610313759, 1610666926, 1611239998, 1611396088, 1614382839, 1614530679, 1615167003, 1615172374, 1615640392, 1615647347, 1615658840, 1615665110, 1615666109, 1615671063, 1620094847, 1620095619, 1620095929, 1620105028, 1620113841, 1620119323, 1620795340, 1621082362, 1621083649, 1621092660, 1622329964, 1622331641, 1622337218, 1622353628, 1623408910, 1624559739, 1624569664, 1624577502, 1624577906, 1624578485, 1626556599, 1628470609, 1630022199, 1632310642, 1633163415, 1635568907, 1635591150, 1635593749, 1635643420, 1635994183, 1635994320, 1641006393, 1645672758, 1645785364, 1645803376, 1645808858, 1645809841, 1646891621, 1646892908, 1646907799, 1646910247, 1646917618, 1646918617, 1648006829, 1648007716, 1648013185, 1648013984, 1648016015, 1648021910, 1648025704, 1648032728, 1648033439, 1648033715, 1648035901, 1648039922, 1648043240, 1649119056, 1649454738, 1649581121, 1652486802, 1652497372, 1652504566, 1652932064, 1652936599, 1653583645, 1653598182, 1653599929, 1653606136, 1653607123, 1654697756, 1654712103, 1654713134, 1654716280, 1654721234, 1654722233, 1656168200, 1659162648, 1659176739, 1659180924, 1659185878, 1659186877, 1659695250, 1660874915, 1664393911, 1666510724, 1668155429, 1669474757, 1673661122, 1673662353, 1673671436, 1673686839, 1673856704, 1674136053, 1674769898, 1674770881, 1674776363, 1674793871, 1675780006, 1676641114, 1677004461, 1677008482, 1677010668, 1677010688, 1677011655, 1677022217, 1677030942, 1677037554, 1679194024, 1679234542, 1679234666, 1679237897, 1679241007, 1679252114, 1679258763, 1679261552, 1679266928, 1681499983, 1681500998, 1681504918, 1681510964, 1681520272, 1681526010, 1681526993, 1682221833, 1682359277, 1685960411, 1685962398, 1685964612, 1685965520, 1685965569, 1685965582, 1685965890, 1685967499, 1685968865, 1685974082, 1685987547, 1685988215, 1685988552, 1685991645, 1686112357, 1686592668, 1686670946, 1687209740, 1690419670, 1690419852, 1690423356, 1690429255, 1690430286, 1690438386, 1690439385, 1690439477, 1691674376, 1691689779, 1691700349, 1691705303, 1691707542, 1691739899, 1692242488, 1693900733, 1693904467, 1693911703, 1693913871, 1693915014, 1693915019, 1693922968, 1693923252, 1693924211, 1693925465, 1696514991, 1697110779, 1697112784, 1697112842, 1697116346, 1697119048, 1697126337, 1697127463, 1697127903, 1697134366, 1697135348, 1699859798, 1705948764, 1706596362, 1707661217, 1709380801, 1709397036, 1709401602, 1709403991, 1709403994, 1709715630, 1709719753, 1710553669, 1710842194, 1711349139, 1711911296, 1712862856, 1712864099, 1712865353, 1712874413, 1712889750, 1715042583, 1716067791, 1716074254, 1716075236, 1716090026, 1716093784, 1716101073, 1716987897, 1717046504, 1717344945, 1717458342, 1717567159, 1717665490, 1720424110, 1720435157, 1720448732, 1720448944, 1720449947, 1720450929, 1722611952, 1723770733, 1723771620, 1723777366, 1723796376, 1723797619, 1723869014, 1724144999, 1724360630, 1724888746, 1724891334, 1724900049, 1724902970, 1724913368, 1724913588, 1724914591, 1724915573, 1727744610, 1733044570, 1737465416, 1740104597, 1740108386, 1741479646, 1741618915, 1741621154, 1741622153, 1741631292, 1741636935, 1741709977, 1742216984, 1743089654, 1744959211, 1744968590, 1744969829, 1744971556, 1744977659, 1744987840, 1745343269, 1745488513, 1746392299, 1747200908, 1747202151, 1747210105, 1747211248, 1747212978, 1747215938, 1747219291, 1747533677, 1747671543, 1747762259, 1748301224, 1748301648, 1748302211, 1748318651, 1748321229, 1748327140, 1748327340, 1748328118, 1748329946, 1749416322, 1749419816, 1749422630, 1749422974, 1749423815, 1749423848, 1749423862, 1749423980, 1749432545, 1749435316, 1749435457, 1749435956, 1749437829, 1749437986, 1749440303, 1749441388, 1749442296, 1749442361, 1749443256, 1749443576, 1749444398, 1749445477, 1749445739, 1749750164, 1749955965, 1752768365, 1753028168, 1753430927, 1753880966, 1753882221, 1753900232, 1753906931, 1756680747, 1759105063, 1762715404, 1763952265, 1763967858, 1763978172, 1763979159, 1765274516, 1768132013, 1774870841, 1775278057, 1776446407, 1778765218, 1779479261, 1779706923, 1779707649, 1779709525, 1779713177, 1779714057, 1779714368, 1779715934, 1779715971, 1779725925, 1779730307, 1779731494, 1780768183, 1781938242, 1781939241, 1781944195, 1781948380, 1781954023, 1781961852, 1783657515, 1785147288, 1785152492, 1785564290, 1786402886, 1786403885, 1786408839, 1786413016, 1786418915, 1786422601, 1793085197, 1793091404, 1793103209, 1793109842, 1794311882, 1796513490, 1798682988, 1799934413, 1800873944, 1804734874, 1804986274, 1805201900, 1805201909, 1805381533, 1805390218, 1805394927, 1805396070, 1805397817, 1805404024, 1805410294, 1808346875, 1809278593, 1809846425, 1809852765, 1809854826, 1809860706, 1809868668, 1809869655, 1809909084, 1810126394, 1810162729, 1811189710, 1812804641, 1813167465, 1818860644, 1819164253, 1824377544, 1826567786, 1826567942, 1826568769, 1826574251, 1826586852, 1826591759, 1826593533, 1826594804, 1826595685, 1826597041, 1826838298, 1830073720, 1832102940, 1835526804, 1835527882, 1835530317, 1835531888, 1835536950, 1835540435, 1835541852, 1835548479, 1835548755, 1835552425, 1835554706, 1835556216, 1836706536, 1838062951, 1839007628, 1839021100, 1839022775, 1839033593, 1839038547, 1839040786, 1839994953, 1840001842, 1840013399, 1840019350, 1840019827, 1840020860, 1843076481, 1845608978, 1846070315, 1848013570, 1854921046, 1859450748, 1859510931, 1859511204, 1860240647, 1860312281, 1860334137, 1861101595, 1863024310, 1866891339, 1866893066, 1866896736, 1866908847, 1866910185, 1866914026, 1867191437, 1867861644, 1867861768, 1867865679, 1867867083, 1867872142, 1867873124, 1867876289, 1867885376, 1867885466, 1867887914, 1867888607, 1867892691, 1867897750, 1867898961, 1867899162, 1873521117, 1875950626, 1878219696, 1883713830, 1883718737, 1883722494, 1883726489, 1883992567, 1884025074, 1889208808, 1889317056, 1890185274, 1890552293, 1891315242, 1893129355, 1894534152, 1894535395, 1894543357, 1894548934, 1895822736, 1896748195, 1896864381, 1896883495, 1896884690, 1896893413, 1897086584, 1897144569, 1897150382, 1897161336, 1898308423, 1899713189, 1903920486, 1903920882, 1906518923, 1906815088, 1907758428, 1907908343, 1907910446, 1907911172, 1907924055, 1907926218, 1907937265, 1910568778, 1912588116, 1912664290, 1912773142, 1919704439, 1919708663, 1925589573, 1928014104, 1931786446, 1933270769, 1933847987, 1934282690, 1935832225, 1937137824, 1940180687, 1941545223, 1944881831, 1944883085, 1944889292, 1944901097, 1944907730, 1944915291, 1947690884, 1949378607, 1949381140, 1949385828, 1949388221, 1949404634, 1953208595, 1957126749, 1965980590, 1966393263, 1967560433, 1968030901, 1968344522, 1968345101, 1968353343, 1968354820, 1969952988, 1969953274, 1970271924, 1982830318, 1982831301, 1982836783, 1982854539, 1982856313, 1982857328, 1982862253, 1982863214, 1983945412, 1983946415, 1983946627, 1983953134, 1983957025, 1983968650, 1983971249, 1983972408, 1983977373, 1985096774, 1985106740, 1985116048, 1985122769, 1987638584, 1989155232, 1991785536, 1991792841, 1991799730, 1991811287, 1991817238, 1991817715, 1991818748, 1994019132, 1994026062, 1994028952, 1994613365, 2000627256, 2002587178, 2002703477, 2004080420, 2007546240, 2007547499, 2007556254, 2007557797, 2009780252, 2013938002, 2016158046, 2016458632, 2016459875, 2016461129, 2016470189, 2016476340, 2016482461, 2016485526, 2019785049, 2023148389, 2023153871, 2023155598, 2023156002, 2023157760, 2023171627, 2023174160, 2023812622, 2029256230, 2029286951, 2029296544, 2037064184, 2042215210, 2042272668, 2042423451, 2043073993, 2044012869, 2046744295, 2047386704, 2047490213, 2047625030, 2047828609, 2051192703, 2052284669, 2056364987, 2056365175, 2056459861, 2057257910, 2058376024, 2058382302, 2058436464, 2058440319, 2058445367, 2058448694, 2058452545, 2058552215, 2058569521, 2058573621, 2058924197, 2058929805, 2058958371, 2058984507, 2058988863, 2059003240, 2059051015, 2059075746, 2059422408, 2059824807, 2061714098, 2062014471, 2063260135, 2063415690, 2063627333, 2063814283, 2064238717, 2064313581, 2064484772, 2064499575, 2064635107, 2064635452, 2064635773, 2064639428, 2064639883, 2064648773, 2064654772, 2064655646, 2065476844, 2065542420, 2065542544, 2065543022, 2065727011, 2066567940, 2066734284, 2066828553, 2066833534, 2067202738, 2067233317, 2068031208, 2068725531, 2068831008, 2068854498, 2068854512, 2068858196, 2068859575, 2068860177, 2068862627, 2068863232, 2068869021, 2068950273, 2068994789, 2068994807, 2069062998, 2069102686, 2069161595, 2069263945, 2069338842, 2069365704, 2069468800, 2069558220, 2069561350, 2069566268, 2069591394, 2069593072, 2069595618, 2069600040, 2069600946, 2069600957, 2069604100, 2069765192, 2069904166, 2069904305, 2071035931, 2071149679, 2071643658, 2073289171, 2073308845, 2073310709, 2073312474, 2073322881, 2073335784, 2073440452, 2073448514, 2073457247, 2073500084, 2073509625, 2073523923, 2073533208, 2073640292, 2073794194, 2073803151, 2073803461, 2073808229, 2073811616, 2073811996, 2073815760, 2073826308, 2073826688, 2073827152, 2073830759, 2073831593, 2073831601, 2074299520, 2075044848, 2075423284, 2075693433, 2078935992, 2078936931, 2078937889, 2078937913, 2078938163, 2078938295, 2078944407, 2078944555, 2078944613, 2078944933, 2081181239, 2082063743, 2082285629, 2082430948, 2084946688, 2086083080, 2087431076, 2087431077, 2087431079, 2087431080, 2087431081, 2087431082, 2087431085, 2087431086, 2087431087, 2087431088, 2087431089, 2087431090, 2087431091, 2087431092, 2087431093, 2087431094, 2087431096, 2087431097, 2087431098, 2087431099, 2087431100, 2087431102, 2087431103, 2087617590, 2087617591, 2087617592, 2087617593, 2087617594, 2087617595, 2087617596, 2087617597, 2087617598, 2087617599, 2087617632, 2087617633, 2087617634, 2087617635, 2087617636, 2087617637, 2087617638, 2087617639, 2087617640, 2087617641, 2087617642, 2087617643, 2087617644, 2087617645, 2087617647, 2087617652, 2087617654, 2087617655, 2087617656, 2087617657, 2087617658, 2087617659, 2087617660, 2087617661, 2087617662, 2087617663, 2087629931, 2087822490, 2088302297, 2088726760, 2088953542, 2090213881, 2090218574, 2090297888, 2090298020, 2090439875, 2090439900, 2091225604, 2092577468, 2092702023, 2092715579, 2092766986, 2092957042, 2093991393, 2093995617, 2093995632, 2097113374, 2098599777, 2098599792, 2099138174, 2102249573, 2102285158, 2102285168, 2102285285, 2102285374, 2102286572, 2102291553, 2102297313, 2102301463, 2102304381, 2102311282, 2102312281, 2102313468, 2102315379, 2102317235, 2102322718, 2103529616, 2105684477, 2105873178, 2106751208, 2106757636, 2106766355, 2106769656, 2106775467, 2106775926, 2106776925, 2106781879, 2118750891, 2119037299, 2119037310, 2119041270, 2119043865, 2119381911, 2119891962, 2120136928, 2120142410, 2120143393, 2120151231, 2120152708, 2121629990, 2122433548, 2123414271, 2123472843, 2123472936, 2123472941, 2123472990, 2123479292, 2123481132, 2123481326, 2123481391, 2123481939, 2123481960, 2123482409, 2123482928, 2123482935, 2123485221, 2123485512, 2123485548, 2123486092, 2123487587, 2123487602, 2123487868, 2123488061, 2123488218, 2123489049, 2123491458, 2123491494, 2123491502, 2123491940, 2123491950, 2123491964, 2123492067, 2123492380, 2123492410, 2123492613, 2123492943, 2123493403, 2123494323, 2123494721, 2123494806, 2123495205, 2123495222, 2123495263, 2123495538, 2123495599, 2123495615, 2123495829, 2123496707, 2123496945, 2123497027, 2123497539, 2123498152, 2123498482, 2123498621, 2123498738, 2123499337, 2123499387, 2123499393, 2123499675, 2123499817, 2123499823, 2123500085, 2123500670, 2123501043, 2123501651, 2123501946, 2123502012, 2123502614, 2123502618, 2123502909, 2123502931, 2123502972, 2123503489, 2123503580, 2123503633, 2123503639, 2123503645, 2123503683, 2123503690, 2123503871, 2123503914, 2123503925, 2123506021, 2123508761, 2123508887, 2123508888, 2123509104, 2123509367, 2123510210, 2126830924, 2126831627, 2126831911, 2126831915, 2126834731, 2126838118, 2126839865, 2126841008, 2126851442, 2126854146, 2127933481, 2127939688, 2127940675, 2127945958, 2127950989, 2127966582, 2130163562, 2130164545, 2130170027, 2130187535, 2130190580, 2131286378, 2132327224, 2132331087, 2132359596, 2133546426, 2134655216, 2135730753, 2135744303, 2135751022, 2135766376, 2135766538, 2136033383, 2136198665, 2140379406, 2140382005, 2140404240, 2140405499, 2140406225, 2141369520, 2141378580, 2141384318, 2142607534, 2142608862, 2142616598, 2142619146, 2143588731, 2143590729, 2143592861, 2143597618, 2143609175, 2143615126, 2143616636, 2144000095, 2144838611, 2144844042, 2144846897, 2144858266, 2144868884, 2144870143, 2144870869, 2157945278, 2158338411, 2160318468, 2160324206, 2160325189, 2160333019, 2160343200, 2161569257, 2161578129, 2161578140, 2161592231, 2161595735, 2165898261, 2166038855, 2166996811, 2167003274, 2167004256, 2167015877, 2167018798, 2167213797, 2167993101, 2169327252, 2170481633, 2170487115, 2170488842, 2170504623, 2170507412, 2174946277, 2174951759, 2174953486, 2174953890, 2174969515, 2174972048, 2176528068, 2179101309, 2180545870, 2191744103, 2191744212, 2191821366, 2191883015, 2192566334, 2193960351, 2195897610, 2195898849, 2195906687, 2195916612, 2195922100, 2196631346, 2205406696, 2211506222, 2216825796, 2219145843, 2221394610, 2225058301, 2225061335, 2225064134, 2225071439, 2225073075, 2225080536, 2226037368, 2226044042, 2226051203, 2226052893, 2226055388, 2226060342, 2226419862, 2229788675, 2230793522, 2230840997, 2231615745, 2231617728, 2231623210, 2231628742, 2231632031, 2231633170, 2231633764, 2231638049, 2231729235, 2231751291, 2231760201, 2231761216, 2231769054, 2231770037, 2231775519, 2233884981, 2235097422, 2235100587, 2235101313, 2235108032, 2235109598, 2235116887, 2235119589, 2236869449, 2241796550, 2241797549, 2241806680, 2241812579, 2242828527, 2246244298, 2246245281, 2246250763, 2246260079, 2246271316, 2247223374, 2247249937, 2247251096, 2248592412, 2250708942, 2250715407, 2250719552, 2250724971, 2250725805, 2250733692, 2250734937, 2250735952, 2258665553, 2258878642, 2264886749, 2266447633, 2267607000, 2274782645, 2282544968, 2285662351, 2290599544, 2292158595, 2293175691, 2293351636, 2296071446, 2299255515, 2301040846, 2306079466, 2307580553, 2313241363, 2313504811, 2318220358, 2320224028, 2325476095, 2337176745, 2339504386, 2344847762, 2345345412, 2345556981, 2346482211, 2346482871, 2351498341, 2352240646, 2352738840, 2358991500, 2361087993, 2364634824, 2371011349, 2373457221, 2375393789, 2376425283, 2379512524, 2379580075, 2390286898, 2390518325, 2390736011, 2392516839, 2392521063, 2400874900, 2400879124, 2402335630, 2404974948, 2405102721, 2405117283, 2405120727, 2414810349, 2415093005, 2415923742, 2415925541, 2415935547, 2415976346, 2418152088, 2422623072, 2422625395, 2422631927, 2422634373, 2422636295, 2422636392, 2425962056, 2425963043, 2425969250, 2425969487, 2425971892, 2425985030, 2428197348, 2428202830, 2428203813, 2428211643, 2428212914, 2428213376, 2428240545, 2430223084, 2433759338, 2433759634, 2433760321, 2433765803, 2433783311, 2433785126, 2433786356, 2433788522, 2435993901, 2436000108, 2436001095, 2436011657, 2436026994, 2439339076, 2439340079, 2439340291, 2439346798, 2439350689, 2439362314, 2439364913, 2439366072, 2439371037, 2439876345, 2440431898, 2440444045, 2440449369, 2444112661, 2447928023, 2452264162, 2454797153, 2458316286, 2459819944, 2462285242, 2462802458, 2463186757, 2466741694, 2466758807, 2467213089, 2467545358, 2467601561, 2467655846, 2467686484, 2467740953, 2473985870, 2474042431, 2474150919, 2474285829, 2474577412, 2474661520, 2475343068, 2475470210, 2475772433, 2475877012, 2475877016, 2475892298, 2476213365, 2476552306, 2479517659, 2489453909, 2489531547, 2498555779, 2501597440, 2507278661, 2510852110, 2511694664, 2512156190, 2540805343, 2543008264, 2547140668, 2553182506, 2558063998, 2558416820, 2560726248, 2564751176, 2566787042, 2569608194, 2572602371, 2577853220, 2579803386, 2583084289, 2586020617, 2600402029, 2604613571, 2614694552, 2616608417, 2623678483, 2624091113, 2626979216, 2627765050, 2629831661, 2630340943, 2630577386, 2637047575, 2637160117, 2637393619, 2637589507, 2639283063, 2642320383, 2657728452, 2661288721, 2663538084, 2673250796, 2673678071, 2673953045, 2683622002, 2686768508, 2689921282, 2691751732, 2691869931, 2692015714, 2693065457, 2693628719, 2694158948, 2699054734, 2699567323, 2701589506, 2708247797, 2710218932, 2712973569, 2713114330, 2714570818, 2714658156, 2715859111, 2716538256, 2717691085, 2718235570, 2719851426, 2722275573, 2728431851, 2731033959, 2733567145, 2745064373, 2747735009, 2748168364, 2748310006, 2753354596, 2761147374, 2762813598, 2767767034, 2769808878, 2775691349, 2789347571, 2792452218, 2793624174, 2794767436, 2795183554, 2795185357, 2795205893, 2798224110, 2803597621, 2804113804, 2807804736, 2809486328, 2812191981, 2813025413, 2815428841, 2815585428, 2816618421, 2819662823, 2822221150, 2824682484, 2828575765, 2828866516, 2829935276, 2834927579, 2836892761, 2839658405, 2844621372, 2844815106, 2845489684, 2845638303, 2857193006, 2859698097, 2860702321, 2870435535, 2874906565, 2880233005, 2885526550, 2889073982, 2893961579, 2896115089, 2896360091, 2896815948, 2898520762, 2898642745, 2908250170, 2908376536, 2911135641, 2915014315, 2918403731, 2918486269, 2919235927, 2920587887, 2922468503, 2922493886, 2923084706, 2929584080, 2931398379, 2931402541, 2934893225, 2937779198, 2941551192, 2942859576, 2948690168, 2948867989, 2949433359, 2951266128, 2954570766, 2956489777, 2960184498, 2960188722, 2960612931, 2962892549, 2963032843, 2966548328, 2976545290, 2976620947, 2978924197, 2982913903, 2986096991, 2987284613, 2988637881, 2993692642, 2996709992, 2999106536, 3000568496, 3005531064, 3005732955, 3007175865, 3007286028, 3008753857, 3010444860, 3010880247, 3017258218, 3019938621, 3020499579, 3022866914, 3023311759, 3024482653, 3024795687, 3024807531, 3027071777, 3029820267, 3032088673, 3032839979, 3033043261, 3033965900, 3036878933, 3037343835, 3038234864, 3051293097, 3052701732, 3055037923, 3056484673, 3060407188, 3061523114, 3071254387, 3071254500, 3071254881, 3073058130, 3074871971, 3074935051, 3075008146, 3075048985, 3075285442, 3075422693, 3075548305, 3075766008, 3075860343, 3075962648, 3076097045, 3077391764, 3079190285, 3085252246, 3091553195, 3103424085, 3107541791, 3107727924, 3107749241, 3107778469, 3107783354, 3107787446, 3107790299, 3107948057, 3107956419, 3107974264, 3107984588, 3107991466, 3108296169, 3111583245, 3113459538, 3116256345, 3116975703, 3117043431, 3121647752, 3123411243, 3123445549, 3123737595, 3127243644, 3131616468, 3134139083, 3134716611, 3141709512, 3148676509, 3154082174, 3155375542, 3160028447, 3163162577, 3163167462, 3163515572, 3163650864, 3172095015, 3178395499, 3179705353, 3183658699, 3187099641, 3187299343, 3189362935, 3189614929, 3189845278, 3191231848, 3191324353, 3196795314, 3196799538, 3197664642, 3200115829, 3202732235, 3206363778, 3207294280, 3218691622, 3224832477, 3226582088, 3231960701, 3231960825, 3238444781, 3240506687, 3241127686, 3245505639, 3246685420, 3255250502, 3255475289, 3255493270, 3258010725, 3259268259, 3259708744, 3272088211, 3277477189, 3287497511, 3289363789, 3294281816, 3300709686, 3302430666, 3307080284, 3310372188, 3310580422, 3313110325, 3317570505, 3321771963, 3323504524, 3331794938, 3332552236, 3344936763, 3351242611, 3354164541, 3356161036, 3357443896, 3358280978, 3360549707, 3361435146, 3362509089, 3362630778, 3366341181, 3366920760, 3372160500, 3373297021, 3374596217, 3375285141, 3377755895, 3379029866, 3380241983, 3380595728, 3381834713, 3385946526, 3386125251, 3388057612, 3393544563, 3404840083, 3405857857, 3407191084, 3408814815, 3408819560, 3409018494, 3409457570, 3410577155, 3411051814, 3411102162, 3413983999, 3416635233, 3418887913, 3424150275, 3426036948, 3426656604, 3429124000, 3430316367, 3430320824, 3430870942, 3431771155, 3432731814, 3434192147, 3440930072, 3441289467, 3448289841, 3448536520, 3452859864, 3455445539, 3455973701, 3456106851, 3456282588, 3457601666, 3463597433, 3467469261, 3473077716, 3481649290, 3487446962, 3488816292, 3495434909, 3503723552, 3503962589, 3503975251, 3504086267, 3504111353, 3504116046, 3504274912, 3506277065, 3508805241, 3509081590, 3511319965, 3513566261, 3515728076, 3515960057, 3516630755, 3523519258, 3526432473, 3530287752, 3530798581, 3531066474, 3531601080, 3532265658, 3532567787, 3533680386, 3538145547, 3540002868, 3540019679, 3541120058, 3551826674, 3554146688, 3557238629, 3557288966, 3560409651, 3560721423, 3560755308, 3560772904, 3560776799, 3560843986, 3563273081, 3564677062, 3564681286, 3567399383, 3582031081, 3584271853, 3584286131, 3585048866, 3585049834, 3585528102, 3593775985, 3599378282, 3602300234, 3607509617, 3611661676, 3611790203, 3621964687, 3621965124, 3621966081, 3621966083, 3621968414, 3621969916, 3621970585, 3621975893, 3622095083, 3622538650, 3627671724, 3631197772, 3636965307, 3639447013, 3650032210, 3667545339, 3668394990, 3668555001, 3668632957, 3671699945, 3674122558, 3682693088, 3690182854, 3691035506, 3691048605, 3691317036, 3693068020, 3697923226, 3699114476, 3702342894, 3706900355, 3708334595, 3709045244, 3712703179, 3712728440, 3712733478, 3718845099, 3718930524, 3720827503, 3728968422, 3729352785, 3730027878, 3734185373, 3735541918, 3737224996, 3738382782, 3738387349, 3738389800, 3738389990, 3738390006, 3738390241, 3738390427, 3738394220, 3738394620, 3738394722, 3738394744, 3738394859, 3738396519, 3738397033, 3738399064, 3738400460, 3738887202, 3738887334, 3739466542, 3743223168, 3743289449, 3744330913, 3745299015, 3748385635, 3749221030, 3756564018, 3766265917, 3766587032, 3767014136, 3767872686, 3768672199, 3771941409, 3772113601, 3772128853, 3772772804, 3776028623, 3776032376, 3777321837, 3777702607, 3777706691, 3777840696, 3778052019, 3778877784, 3788596678, 3788641118, 3789096147, 3790949066, 3792555306, 3792675197, 3794434962, 3795445637, 3799396589, 3802359444, 3802425981, 3802900168, 3803509878, 3803533553, 3803824710, 3817195077, 3825134626, 3831783888, 3836226283, 3837130236, 3839963077, 3842564401, 3842605521, 3845461162, 3845489549, 3848928610, 3854658802, 3856336918, 3857323999, 3858008723, 3859684851, 3862352064, 3867966833, 3870049918, 3871085378, 3871829833, 3872291932, 3872427595, 3873740388, 3875975886, 3876231871, 3878080222, 3881750832, 3882302039, 3886373040, 3890622701, 3890644440, 3890892359, 3896043913, 3896689307, 3899279503, 3900747045, 3906847659, 3911916015, 3927826024, 3935292304, 3943337509, 3944324480, 3944448839, 3945529821, 3947301018, 3949488650, 3950159753, 3952494101, 3960241116, 3960376152, 3961917741, 3963099658, 3963421060, 3963723254, 3967007952, 3967259205, 3969124422, 3970612783, 3970678261, 3973713485, 3975040093, 3975243357, 3975693785, 3987058095, 3990704705, 3992681822, 3994071046, 3995478227, 3998971354, 3999298006, 4000670401, 4000993351, 4001099777, 4001277861, 4001735503, 4002465742, 4003357293, 4005356768, 4007925342, 4011050686, 4011066530, 4011075332, 4011273939, 4011552428, 4011788459, 4012217148, 4012217259, 4024186918, 4027830515, 4028975169, 4029110469, 4029583348, 4030423947, 4031498693, 4031499367, 4031499504, 4031509172, 4031928713, 4032208645, 4032479130, 4033316487, 4036743247, 4038287798, 4038545865, 4040900190, 4042024153, 4059950647, 4061045790, 4064482362, 4064482494, 4064686007, 4068398139, 4074270800, 4074270919, 4074308286, 4075674315, 4075712516, 4075885548, 4078878227, 4080178633, 4081049105, 4089654486, 4090206590, 4090679933, 4091412422, 4095259202, 4095274203, 4097043581, 4097047544, 4097047888, 4097050487, 4097053538, 4097079538, 4097094723, 4097094855, 4097218811, 4097289420, 4097298261, 4097355529, 4097358800, 4097358806, 4097359478, 4097365147, 4097365569, 4097368351, 4097368475, 4097373732, 4097381131, 4097390898, 4097493023, 4097494448, 4097500420, 4097504860, 4097508952, 4097518447, 4097523657, 4097528230, 4097528249, 4097565588, 4097595928, 4097769515, 4097769660, 4097770040, 4097900631, 4097993352, 4097993363, 4098078311, 4098093255, 4098096816, 4098101881, 4098102013, 4098120408, 4099257624, 4099391059, 4100119818, 4101141701, 4101990706, 4102099355, 4102141580, 4102295291, 4103385373, 4104416776, 4108421678, 4108481771, 4113654278, 4120143040, 4120573143, 4120685305, 4120832270, 4121323786, 4122797449, 4123137490, 4123141719, 4123166778, 4123237466, 4124517918, 4124852870, 4126190390, 4126265264, 4126330058, 4126584791, 4128561486, 4130538182, 4130665595, 4135804702, 4138805004, 4138959002, 4142649353, 4143010615, 4143011353, 4149276818, 4149741566, 4155964946, 4160851306, 4165043845, 4165602674, 4166101816, 4168666626, 4168671212, 4169534192, 4169538416, 4175499442, 4178182706, 4179726175, 4180321577, 4180398911, 4180437564, 4180584501, 4180592595, 4180655876, 4182610142, 4190427894, 4190436241, 4190438903, 4190464587, 4190536489, 4191350062, 4197904504, 4208748285, 4213114634, 4213114766, 4213115878, 4213133169, 4213139443, 4216213600, 4229539334, 4230260404, 4236039784, 4239211903, 4244301284, 4244359264, 4244636840, 4244650461, 4244697370, 4246504751, 4248927363, 4249781266, 4250093591, 4255547342, 4269915810, 4271230391, 4273205904, 4280822506, 4281987205, 4281991429, 4288642117, 4290818353, 4290862694, 4290938088, 4291163255, 4291519114, 4292375442, 1719, 113029, 2431109, 6154799, 9085905, 10454523, 11833936, 15005411, 29039073, 29369909, 32348563, 32392946, 34831997, 35241656, 35407085, 38660731, 41719852, 42040525, 44148994, 49751269, 54657448, 54829135, 56701348, 61297674, 64616140, 64789207, 64792746, 65243007, 69912355, 73497087, 75564691, 84754216, 85474843, 88950783, 95227810, 97671606, 97869711, 98556036, 99860970, 111529024, 112714201, 113832573, 118457586, 119013459, 124940101, 129204800, 129504899, 132934253, 133576354, 140643360, 141325108, 142928709, 144351849, 147399388, 148485881, 153516070, 159755595, 162751717, 164324729, 165338893, 166383271, 169804649, 169909381, 170281316, 170281555, 170281599, 170281747, 170281951, 172221532, 172281601, 173287589, 173930363, 176844018, 177079695, 177080427, 177546706, 179139641, 179569944, 179956098, 180259371, 181198501, 181205574, 181240422, 181950714, 182150488, 183129361, 183468910, 183469260, 186043176, 187501046, 187763081, 189174183, 190912115, 193357074, 193420201, 193885172, 194024818, 195040318, 195040605, 195184107, 195615400, 195788148, 196491587, 201802654, 202716248, 203969128, 204000291, 204003102, 205844479, 207663471, 208540214, 211702237, 213315812, 216404638, 221220686, 223633303, 225036633, 231228447, 233832515, 235585683, 236122625, 238349947, 244953360, 253603556, 270508724, 279497384, 282260013, 282734069, 286117940, 288337735, 294222691, 294944592, 297796540, 299806932, 301175958, 305396028, 309814229, 316711416, 319659866, 321667918, 322393118, 323472705, 329290740, 336073493, 344556873, 345150446, 346582968, 348240977, 349085323, 352942917, 361618841, 362641227, 363650316, 368392429, 371447569, 379018060, 379803748, 381683792, 382346929, 384388494, 390037588, 392534911, 393050977, 393824765, 398079720, 401473592, 404580880, 408076405, 409551689, 412923104, 413523569, 413989960, 417762611, 418389794, 418643706, 419980117, 420076057, 430774757, 431420666, 431463230, 433024678, 433047970, 433601547, 433960232, 434424313, 439016491, 440846816, 445424682, 446595824, 448347366, 453082265, 459993498, 467355959, 468677861, 470584767, 478194174, 481007914, 483933287, 492579864, 492820046, 493239087, 495294245, 500922416, 501132892, 502571724, 503870109, 505520155, 505540840, 505547348, 507674743, 507704542, 508155006, 508732896, 524499536, 527090713, 528698966, 532828844, 533082472, 536472645, 536606854, 536706420, 543383677, 544035780, 545100578, 547829195, 548068662, 550157112, 554422931, 557980541, 558904957, 559619560, 566123574, 569085212, 574052622, 575078226, 579214441, 582810837, 583362052, 583453417, 594063106, 598128236, 601157755, 601161740, 601948346, 602413319, 603986209, 605582466, 609198625, 610045978, 617827459, 620396524, 626039263, 626988485, 629099694, 630452394, 635400744, 640415961, 643558590, 645257576, 652659119, 656273907, 665354414, 666296511, 667333922, 668403785, 669730879, 669929645, 674175725, 680972003, 682364285, 684524418, 689215333, 699075989, 704136516, 706383966, 708808466, 710978465, 712995495, 713788357, 717519098, 722655660, 722956329, 725449644, 727209749, 729977159, 734622016, 735035205, 737142807, 737152212, 737166334, 737644692, 737837074, 739516787, 739566545, 739985822, 741816033, 742252614, 742260586, 745092996, 747930588, 750219296, 750508933, 752522257, 753857751, 754000708, 757807602, 758478444, 761228031, 762067870, 762641736, 764248075, 764320946, 764825188, 766296725, 766355544, 766643209, 766774330, 767540529, 772363084, 774299734, 777688891, 787564577, 789530990, 792068311, 792844833, 796533587, 800010738, 800087019, 809563086, 810061706, 810813298, 811092091, 817847511, 819009519, 826260124, 833658992, 834470340, 839856739, 842147301, 847675799, 861294299, 862950715, 867021650, 867036335, 867732810, 869064225, 870151875, 874296659, 875096251, 875944810, 876149555, 879009267, 884498580, 887482102, 893652881, 894264732, 896104248, 896979123, 897240751, 902139830, 911653942, 912249299, 919599881, 927052135, 933697266, 939098524, 939114841, 948752149, 955130439, 955354780, 955942299, 956480228, 958121442, 961145400, 966830075, 968732370, 970076747, 972273212, 976368569, 976381303, 978919739, 981829565, 984418838, 997412732, 1001458257, 1001637783, 1001651627, 1005191377, 1008948875, 1010556097, 1016009727, 1016348317, 1023879932, 1024317101, 1027786481, 1027856392, 1032266307, 1033049924, 1035709107, 1038486906, 1041294385, 1043437244, 1049779946, 1051535617, 1053737172, 1054370922, 1056150770, 1056645919, 1056720884, 1063952736, 1064188994, 1064732809, 1064857294, 1065290596, 1065972699, 1079732589, 1080478458, 1081536009, 1086069586, 1088535269, 1090938281, 1094421058, 1095718313, 1096687866, 1100372480, 1101019943, 1101043104, 1102004406, 1104733017, 1110237878, 1112959177, 1113096701, 1114972095, 1118952562, 1125668821, 1130216203, 1132104794, 1132534664, 1132579070, 1132598106, 1136018325, 1137104375, 1139265319, 1145147923, 1145899518, 1146014840, 1146523166, 1149204820, 1151262913, 1152056864, 1154446700, 1154536715, 1154542665, 1155367440, 1155994599, 1161218045, 1164964007, 1166033123, 1167024992, 1167025137, 1171269392, 1174582808, 1174756828, 1181469438, 1183829925, 1186977866, 1187653498, 1188208310, 1189560180, 1191923730, 1192723278, 1195304992, 1199133859, 1199554249, 1199600208, 1202045876, 1204911535, 1208429990, 1210779948, 1210807525, 1221782335, 1221920801, 1236932222, 1238449939, 1246474378, 1257256866, 1257395124, 1257626414, 1257876060, 1258281930, 1258346504, 1259689738, 1260820433, 1260836076, 1261324364, 1268763191, 1269301612, 1271531819, 1273274467, 1276658942, 1282928227, 1283757717, 1290537388, 1296032318, 1296235125, 1301946320, 1305140481, 1308857550, 1310807544, 1310899277, 1312056732, 1312163653, 1316036626, 1316125796, 1324285266, 1324310094, 1324331646, 1324337571, 1324579984, 1325750278, 1326569216, 1333842476, 1349684561, 1351415139, 1351558342, 1351862653, 1351880550, 1354386923, 1356250756, 1356331589, 1357629674, 1363404812, 1364008114, 1364487272, 1365133140, 1365599531, 1365623138, 1366730785, 1366987615, 1372241226, 1372705460, 1372794328, 1373871548, 1375834117, 1377641421, 1378253217, 1391291390, 1391293134, 1391299074, 1391300548, 1393577155, 1394469288, 1394469303, 1394469473, 1394469866, 1394470005, 1394470066, 1396870772, 1399867662, 1410090536, 1413067533, 1423547895, 1430902259, 1431096661, 1433581041, 1435770227, 1436788950, 1441443055, 1441473969, 1443172426, 1444705872, 1444722875, 1444727957, 1445594238, 1447082963, 1448082324, 1455246557, 1457519039, 1458493639, 1459794391, 1460930084, 1465058743, 1465974914, 1465976327, 1465976425, 1465976436, 1465976550, 1465976555, 1465976625, 1465976632, 1465976696, 1465976747, 1465976870, 1465976979, 1465976985, 1465976986, 1465976991, 1465977196, 1465977261, 1465977271, 1465977274, 1465977303, 1465977323, 1474444421, 1478092049, 1478716185, 1481566528, 1482522967, 1489772937, 1492902674, 1494181387, 1504535254, 1509029106, 1510450262, 1511907991, 1515598870, 1519441587, 1522685369, 1525831150, 1526085253, 1527459723, 1529619411, 1532042759, 1533712942, 1537663939, 1539902893, 1541073018, 1541496652, 1542773859, 1549199388, 1549209224, 1549210203, 1552284203, 1553692884, 1555806428, 1561102750, 1568416773, 1570440897, 1570561776, 1573188605, 1576134740, 1582406800, 1582529544, 1585380899, 1587251606, 1592687509, 1594093747, 1601662530, 1602151715, 1602222565, 1602416912, 1604312683, 1604313702, 1605478605, 1610069144, 1610724928, 1613430619, 1616149762, 1616623247, 1616826805, 1622345684, 1624120544, 1624575040, 1630208269, 1631446240, 1634840328, 1635306209, 1637735434, 1639041637, 1640826914, 1643893360, 1645239134, 1645714411, 1646967505, 1647763648, 1648026812, 1648459154, 1652482428, 1654623339, 1659538076, 1660752253, 1661285202, 1662950537, 1675032552, 1676328914, 1681382184, 1682444281, 1683407715, 1684605451, 1684964181, 1686375531, 1686572406, 1686834359, 1687228988, 1687238599, 1687241697, 1693905970, 1693924649, 1694678234, 1696017211, 1697022103, 1698247372, 1700196518, 1700874190, 1702743585, 1704831752, 1705191422, 1705572464, 1705775316, 1708553688, 1709604401, 1711224201, 1712893263, 1713051167, 1713095897, 1715999558, 1716087943, 1716947524, 1721557559, 1722492001, 1723859941, 1728197301, 1730461660, 1732377833, 1740500925, 1740503023, 1747349646, 1747349737, 1747349747, 1747349811, 1747350242, 1747350353, 1747350383, 1747350483, 1747350570, 1754249179, 1757625214, 1758838683, 1759487629, 1759488516, 1759498393, 1759499821, 1759502442, 1759502966, 1759512274, 1759512283, 1759513528, 1759514495, 1759514515, 1759516437, 1759524172, 1759589336, 1760335250, 1762975960, 1762992044, 1763004314, 1771261987, 1772061961, 1772164204, 1775305704, 1778177081, 1782043531, 1789421301, 1792792037, 1793905730, 1800839994, 1801140929, 1801396125, 1804673412, 1806579373, 1813955111, 1814430790, 1816595094, 1817436421, 1822787251, 1828043124, 1839996532, 1839996844, 1841030555, 1842560365, 1844006530, 1844448916, 1844480213, 1846724376, 1860761623, 1861064328, 1863000850, 1867708596, 1873771601, 1873773882, 1873774456, 1874142716, 1875798230, 1880233189, 1882601503, 1885862630, 1890372289, 1890379225, 1891031342, 1891205640, 1891938925, 1896919160, 1896919227, 1896919294, 1897898461, 1899147627, 1900573373, 1901379444, 1902628941, 1905060165, 1906789934, 1906790006, 1906790139, 1906795057, 1906796594, 1906797455, 1906801573, 1906801694, 1906806837, 1906810233, 1906810485, 1906811690, 1906812875, 1906817274, 1906818921, 1906820915, 1906820924, 1906823423, 1906823469, 1906857590, 1906857691, 1906857989, 1918700844, 1921631441, 1925206882, 1927020241, 1928994000, 1935386784, 1936188797, 1939298330, 1939994885, 1941474619, 1944071536, 1945201987, 1946130305, 1946324244, 1947055740, 1949193282, 1951127334, 1956200886, 1960661844, 1964294607, 1971670426, 1973838680, 1975660003, 1977074332, 1979063800, 1986972074, 1987660949, 1991785763, 1992080509, 1995174355, 1995890751, 2001507875, 2004488903, 2015900220, 2018783243, 2021213332, 2023260368, 2025018361, 2025037989, 2025039155, 2026455612, 2026543248, 2027114414, 2027551630, 2034028822, 2034497157, 2034927376, 2035815698, 2037403782, 2037552632, 2038238057, 2038463378, 2038609522, 2040354520, 2040943501, 2041028464, 2044842550, 2047340057, 2047377876, 2047791608, 2047824538, 2050823774, 2050838609, 2051525062, 2051827668, 2052255777, 2052901511, 2053206810, 2053240934, 2053337172, 2053478875, 2053493456, 2053853373, 2054449324, 2055229681, 2055578022, 2056180496, 2057710300, 2058751811, 2059048621, 2061275137, 2064241908, 2066721635, 2067699997, 2071301924, 2075934693, 2077460241, 2077463931, 2082273412, 2082279457, 2082340026, 2082350395, 2082490504, 2083899515, 2084905908, 2087506861, 2087568425, 2087595516, 2092046651, 2092301721, 2092419132, 2097381010, 2097529923, 2100199727, 2103470828, 2105481502, 2107063121, 2107436658, 2111314048, 2113664954, 2116750738, 2117068897, 2119040128, 2122563214, 2122618177, 2124668692, 2132271390, 2134191641, 2134715695, 2138049165, 2138494997, 2142609419, 2142633914, 2144770101, 2146688546, 2151094932, 2151644274, 2153187194, 2163712208, 2163898589, 2168105062, 2170508442, 2176727539, 2177318798, 2178944930, 2179027416, 2184528600, 2186571792, 2187374596, 2190645414, 2190660247, 2190897184, 2194211966, 2195314033, 2195413098, 2195424198, 2198290764, 2203121973, 2208876632, 2211529485, 2216861598, 2219976143, 2224936471, 2229389306, 2229428098, 2233205867, 2235535537, 2238302643, 2239584661, 2241998064, 2243922068, 2245744882, 2246095470, 2249578444, 2251500542, 2256423319, 2257131811, 2258848076, 2259012151, 2259407586, 2265403416, 2277922362, 2278366865, 2281444864, 2283990470, 2284221844, 2290521795, 2298483014, 2298859942, 2303709693, 2305684069, 2306183534, 2310688315, 2313038876, 2315634657, 2319104481, 2323978889, 2326416557, 2327685947, 2330979339, 2331542577, 2334488740, 2335980755, 2339348712, 2343955873, 2343987387, 2344051572, 2344081298, 2353017729, 2354634240, 2357782940, 2360233424, 2365749167, 2372460029, 2372478071, 2380959235, 2384339112, 2385564998, 2391410598, 2392072803, 2393811335, 2399346319, 2399822664, 2401643245, 2401782259, 2403261116, 2407789481, 2409182571, 2417084170, 2417165267, 2417652035, 2419411749, 2419417423, 2422324904, 2423117096, 2424431334, 2424771770, 2432634086, 2433143557, 2435584133, 2436015021, 2441679501, 2441854846, 2444838503, 2451024601, 2451094457, 2453483137, 2453497460, 2454448917, 2456215407, 2459247176, 2463271525, 2463506842, 2467234433, 2469945372, 2473920266, 2485004952, 2486666796, 2489018185, 2489169796, 2490847830, 2492077342, 2492970238, 2497220049, 2503042985, 2512844015, 2518379243, 2518777282, 2525588137, 2525608018, 2528358668, 2528706848, 2531896313, 2539686262, 2551310943, 2554772601, 2556085817, 2558131228, 2564231467, 2565836498, 2568929373, 2569358076, 2571159128, 2572746788, 2575905107, 2579846032, 2582295686, 2585286228, 2585297154, 2587884409, 2590263013, 2592032772, 2597156358, 2600208325, 2600311538, 2602467246, 2609976564, 2614031703, 2619619987, 2622453927, 2622601193, 2622997773, 2635726130, 2636739119, 2637611531, 2637745410, 2637827916, 2639832942, 2644708943, 2646831691, 2652889161, 2656916375, 2658971428, 2660417858, 2667387895, 2669967601, 2671812960, 2675377616, 2677517890, 2677527742, 2680331975, 2682569422, 2692646873, 2694622232, 2697812844, 2707358863, 2708256980, 2708843581, 2721005193, 2723132333, 2723449219, 2727613517, 2729386864, 2732129495, 2738025026, 2739504392, 2742067873, 2743561936, 2745053658, 2748129339, 2755346949, 2756835810, 2762308724, 2762732310, 2772048233, 2773342582, 2773916239, 2774237802, 2777215669, 2780442125, 2780969136, 2784038323, 2786612080, 2787145966, 2787151566, 2791623281, 2792656912, 2793820597, 2793843165, 2794535853, 2794558276, 2794571602, 2794589073, 2794607684, 2794781905, 2794812897, 2794904579, 2795201682, 2795215251, 2795316793, 2795413889, 2795489178, 2795518714, 2795546979, 2795547152, 2795551511, 2795554576, 2795555553, 2795567189, 2795581043, 2795588603, 2796767057, 2797512177, 2798111293, 2798512509, 2799152382, 2799526810, 2799947922, 2802973072, 2804403738, 2804874542, 2805637755, 2805753744, 2809447657, 2812187177, 2812916202, 2815541885, 2820491263, 2822394574, 2829422945, 2831048350, 2832237259, 2834623189, 2837348717, 2840525902, 2841159353, 2842490055, 2843506215, 2844781614, 2846385194, 2846982791, 2849248490, 2849860412, 2850213786, 2852028874, 2852573181, 2854701866, 2854943229, 2855519660, 2857974075, 2859686627, 2864766480, 2865932173, 2873369054, 2873382924, 2877054650, 2878248977, 2878625875, 2880150758, 2882016813, 2883677644, 2894321712, 2896549226, 2900972274, 2905747927, 2907164383, 2909422460, 2910191497, 2912050734, 2914081458, 2914744694, 2914938714, 2915009556, 2917041430, 2918571873, 2931708704, 2932643151, 2933052029, 2935350303, 2939956665, 2941858877, 2943539162, 2944562948, 2945364171, 2947166646, 2950332665, 2953041500, 2958695479, 2959025464, 2963193938, 2963907974, 2964323647, 2969439522, 2972958854, 2976622717, 2976917923, 2978201778, 2982085395, 2985605450, 2996423818, 2999691650, 3008190733, 3008855969, 3016122305, 3017646001, 3023766416, 3029366772, 3031325313, 3032047068, 3036119914, 3036992672, 3039024727, 3042813479, 3043904968, 3050467218, 3051886594, 3053067553, 3053287882, 3057812794, 3065938060, 3066185554, 3067331584, 3067801157, 3067842181, 3068762275, 3077857486, 3080857101, 3087114209, 3087935921, 3088190003, 3089015336, 3091255985, 3095401268, 3096813247, 3098725318, 3105671535, 3115079967, 3117883740, 3118052513, 3118932015, 3119183299, 3121944857, 3124496054, 3126706525, 3129135980, 3130262956, 3130292716, 3136193853, 3143250549, 3145203874, 3146277579, 3150523560, 3154412692, 3156177950, 3159557566, 3164499075, 3164706839, 3168577861, 3171832589, 3173559921, 3174529089, 3176196996, 3176871024, 3180039849, 3180784320, 3181226348, 3184223807, 3185392090, 3186278865, 3187205025, 3189849017, 3192015124, 3206103617, 3212240200, 3229338204, 3231038915, 3232995840, 3236363663, 3236684869, 3240062262, 3241501460, 3243217472, 3244361100, 3245554401, 3249410406, 3254464708, 3257959952, 3274402918, 3276160836, 3276181105, 3276196901, 3278107133, 3290502878, 3291450742, 3293286977, 3293297241, 3296419295, 3299472058, 3299767442, 3301223392, 3301309499, 3301391192, 3304599725, 3306064327, 3313552392, 3321637504, 3331885553, 3332277580, 3333914252, 3337182013, 3337858974, 3341471161, 3342158460, 3346063476, 3347209717, 3350345047, 3350816321, 3351869587, 3352060268, 3355691995, 3356175586, 3356927752, 3362723114, 3366755503, 3367073048, 3367944003, 3372319994, 3375346812, 3376868662, 3381262072, 3382258705, 3385088233, 3389287501, 3391503522, 3392485763, 3403435361, 3403782237, 3406109171, 3406111906, 3407122639, 3411575670, 3423045385, 3424242744, 3426100153, 3426523263, 3431675506, 3431798787, 3431896672, 3432167999, 3432725491, 3433958809, 3443103158, 3445734210, 3450482982, 3453219838, 3455171543, 3458629656, 3459326184, 3460835389, 3468111852, 3471910127, 3474158466, 3478804050, 3479897537, 3480605972, 3480868929, 3481097537, 3485240025, 3491815953, 3492209950, 3494777461, 3500328283, 3503665706, 3503925212, 3506796962, 3514565086, 3514565812, 3519718992, 3519725933, 3524188747, 3529349528, 3542452078, 3546487756, 3550700124, 3550989552, 3551573749, 3553442167, 3554781799, 3556847596, 3557221487, 3557691349, 3558264087, 3560824248, 3563344816, 3565186253, 3565418379, 3566074326, 3568626956, 3569886279, 3570187564, 3574536814, 3576593305, 3584104748, 3586564634, 3588013803, 3590119076, 3591676857, 3594126223, 3605649145, 3607964178, 3610130320, 3611466472, 3618863110, 3629119210, 3629792790, 3635135986, 3635459541, 3636074310, 3638424639, 3640911628, 3642130958, 3642225062, 3647798063, 3656108419, 3657615451, 3659534155, 3659611370, 3659667263, 3660545348, 3660867367, 3662104715, 3671487562, 3678946749, 3680027665, 3684023399, 3686510836, 3686613485, 3686646984, 3691543485, 3691543777, 3694814128, 3695175653, 3698130051, 3700803863, 3704722354, 3717443225, 3718851041, 3722297297, 3724304421, 3727475379, 3727535579, 3735375385, 3735382080, 3740438523, 3740440657, 3745910284, 3748112414, 3748157778, 3751765724, 3751843037, 3759175702, 3760229117, 3767579376, 3767636566, 3774416951, 3774620406, 3775107448, 3777554302, 3784459817, 3789001045, 3789217359, 3790213466, 3791430232, 3792756850, 3797275201, 3797334865, 3797547975, 3797752814, 3798120765, 3799727891, 3800284920, 3803890887, 3804066593, 3807736858, 3811590943, 3812650457, 3813081457, 3814583456, 3816238011, 3818244185, 3820433217, 3821631768, 3824973847, 3830752599, 3831121452, 3831131041, 3837373870, 3839962587, 3842157165, 3849728326, 3849729892, 3849734551, 3849787726, 3849792721, 3849819373, 3853184002, 3854490492, 3856121458, 3857014848, 3860607422, 3861431943, 3861926244, 3867504094, 3869648625, 3871255217, 3879613384, 3888702999, 3893630517, 3897018811, 3898712433, 3902486573, 3904611129, 3909678524, 3911290870, 3914258422, 3919568627, 3924938673, 3928836058, 3929271846, 3932881151, 3932899585, 3934007962, 3950379841, 3960912026, 3973890763, 3976040035, 3977971580, 3981060932, 3981985710, 3988202550, 3991078309, 3992022849, 3992259208, 4010941807, 4012569891, 4013412307, 4021161495, 4025854722, 4027536004, 4030686503, 4033312623, 4036094574, 4037300319, 4043405137, 4048222256, 4048420974, 4048962899, 4049948378, 4051811237, 4052267313, 4054558966, 4064836207, 4066383490, 4070580503, 4073707968, 4080427569, 4104807039, 4115427659, 4116271014, 4117626035, 4127381498, 4128299636, 4132054341, 4132795027, 4133480683, 4136878052, 4138452493, 4138537192, 4138587115, 4138850346, 4138930624, 4148483014, 4149140792, 4149626272, 4149641566, 4149809179, 4152090640, 4152153727, 4156628388, 4159166567, 4161006924, 4161031359, 4166727800, 4167095051, 4168702437, 4168921085, 4175490343, 4178043127, 4179607399, 4182917435, 4196816243, 4201195770, 4201710836, 4204344500, 4216249688, 4218603456, 4220181346, 4230252988, 4230808631, 4235216564, 4236867197, 4243509465, 4245730359, 4250048329, 4251017064, 4254397175, 4261049438, 4262745981, 4265986719, 4266150865, 4270257086, 4272517612, 4285995571, 4287463560, 4287809158, 4287924367, 4293141634, 4293320049, 7, 171252454, 314658260, 1911007288, 2310391087, 2705648135, 3085052283, 4199583372, 0, 0, 46, 66987915, 193433406, 366428436, 366991379, 487687151, 631419393, 649399193, 716916462, 900018457, 911616432, 914855142, 981141093, 981156754, 1068454171, 1135523977, 1213136917, 1357549542, 1437166305, 1491010671, 1491010869, 1881252413, 2035443912, 2098925819, 2412701058, 2447973967, 2572472237, 2572499572, 2572504631, 2734871983, 2856570282, 2856570297, 2873757688, 2905936018, 3109459404, 3147193074, 3229893628, 3613204738, 3628727675, 3840638318, 4020469118, 4072506013, 4072506079, 4072506170, 4072506203, 4072506236, 4072506360, 1985, 3609572, 4707302, 4731941, 7066741, 12732264, 12733869, 12874473, 12898727, 15239865, 15443925, 15464989, 17770158, 18806137, 22641470, 34805542, 37254453, 38352510, 47103897, 47124528, 47160482, 47264668, 47270558, 47521880, 47670735, 47682584, 48206184, 54052064, 55399270, 55790429, 57861540, 64629239, 65951659, 73540622, 74816563, 79005572, 79010572, 79432449, 79977826, 80960607, 90941114, 91781471, 93732497, 101061895, 101792620, 105281118, 114635485, 121111459, 126395821, 127613999, 134819976, 135124399, 135156325, 135512978, 139443164, 140195744, 146403274, 147165318, 147311351, 147680945, 154712981, 156193153, 157683252, 162021680, 165184869, 165682351, 167795310, 169177047, 169285407, 170248114, 175536255, 176298648, 181584625, 186190871, 188366635, 190461039, 190805290, 190817793, 191644192, 193330267, 200367649, 204872798, 208246903, 213994908, 222038678, 222914983, 226753977, 227658815, 230657663, 231976681, 232418677, 234224516, 235125560, 235385397, 235630461, 235880887, 236100347, 237106084, 237695302, 243768879, 244905302, 245221564, 245221621, 245248688, 246957980, 247379872, 247404538, 247547714, 249186148, 249832804, 250298968, 252007821, 252166643, 254498243, 256250975, 256734086, 257675257, 258276240, 260078806, 269653037, 270614174, 270803459, 279865482, 290747254, 296104342, 296106331, 296214241, 297365588, 297388265, 297388314, 297395043, 297872731, 297875338, 305678573, 310113063, 317059542, 318726251, 320983337, 321380700, 329390871, 340233049, 343985311, 368331859, 368339983, 374202536, 374729119, 377042975, 377218502, 377330983, 379160277, 387137528, 390536878, 397426025, 410462833, 410898354, 411028646, 415359567, 418289923, 418809394, 420699727, 422768411, 423087664, 434374676, 434499530, 439966930, 443910462, 444881445, 446735168, 470802373, 473022090, 475752042, 480190019, 481797890, 482141996, 493334140, 493996949, 494002753, 494111972, 496668263, 497004637, 505642028, 513006918, 520166698, 522732652, 524323805, 524791178, 525296785, 532366388, 537994409, 538156652, 539123093, 539125333, 540384923, 545724556, 546598380, 552815312, 564847266, 572585472, 572589595, 572660745, 572917514, 572938118, 581295982, 583116728, 584477771, 585356786, 585510953, 586974440, 588341431, 590260151, 593171510, 600861600, 602587622, 608185550, 608501000, 611172806, 617227910, 620862123, 625412750, 626878575, 627192073, 628675473, 636454657, 644892435, 645708934, 646772532, 650376939, 653264074, 653865504, 654835286, 655274400, 657684596, 657843927, 665654464, 665772443, 667917050, 667982163, 668803663, 678409190, 685972429, 687873546, 699223116, 722349553, 723381066, 723506578, 725289629, 728910939, 728916446, 729301272, 730375222, 731520837, 731524865, 731524893, 733458327, 734942836, 742063133, 744425628, 745118723, 750501894, 753379261, 753585532, 755936840, 755999442, 757164322, 757742871, 758908039, 758927262, 766978617, 767310694, 767319597, 768502512, 775086059, 775783015, 776818569, 777129529, 782249017, 782470551, 782586541, 783225086, 783819749, 787058931, 793173186, 793643539, 793791572, 794069868, 797737785, 801549019, 805476735, 809560577, 810471911, 810660018, 813069363, 813965189, 814609400, 819689086, 822265343, 827811881, 828807618, 840895172, 842670706, 845178939, 849626506, 857304293, 867054787, 875581912, 878480613, 878489001, 888652626, 892902192, 904040802, 904780949, 904781069, 904781208, 904781211, 904781269, 904781270, 904781407, 904781445, 904781469, 904781569, 904781597, 904781741, 904781750, 904781797, 904781798, 907680375, 909542970, 913350787, 915552624, 943105427, 944616168, 945567936, 946059164, 946112067, 950116031, 950459761, 950797941, 950991772, 952407653, 954708706, 954904735, 956279390, 959296218, 959317553, 960000436, 960088334, 964474682, 965248297, 965252181, 968600148, 969495568, 969714387, 969714391, 969714751, 975014436, 976847064, 977515724, 978655375, 985441466, 985451059, 988676432, 989199112, 995754553, 995754557, 998100773, 998582596, 1001682227, 1002897238, 1005026102, 1007267340, 1018029509, 1019292109, 1021170671, 1021615491, 1027478448, 1027904949, 1028176876, 1028524011, 1033544761, 1037073656, 1039464298, 1041396131, 1043364491, 1051084878, 1053049944, 1055328538, 1055480209, 1058862972, 1066609925, 1068948457, 1071874351, 1072134738, 1082834847, 1084511341, 1087693738, 1089012798, 1089634494, 1093384439, 1093825560, 1094815391, 1098082937, 1102471353, 1113642022, 1113846049, 1121249692, 1127953536, 1132317159, 1132485954, 1132585385, 1132689597, 1132723356, 1132858392, 1133501028, 1133636064, 1134046361, 1134351151, 1134824033, 1135467502, 1135737574, 1135775689, 1136782059, 1136883336, 1137085890, 1137173922, 1138138823, 1138714596, 1139072942, 1139153897, 1139221159, 1139981182, 1140405028, 1140510661, 1141246959, 1141280718, 1141381995, 1141584549, 1141719585, 1141874653, 1142159541, 1142193300, 1142260818, 1142366610, 1144440814, 1144457023, 1144667374, 1144802410, 1144975561, 1145579956, 1145625081, 1147135141, 1147314976, 1148184718, 1148522564, 1149131059, 1150514349, 1150729533, 1151393172, 1151494449, 1153073825, 1154465661, 1155177503, 1156094385, 1156940664, 1158572559, 1160038984, 1160487168, 1161167906, 1161578459, 1161965872, 1162013821, 1163255421, 1163472226, 1163645377, 1163777146, 1163979700, 1164916562, 1165010690, 1165068597, 1165937726, 1165940993, 1166410608, 1167096330, 1167193469, 1167260731, 1167598577, 1169823858, 1170720439, 1171147706, 1171150005, 1180230175, 1180849387, 1188216287, 1188228500, 1188701654, 1190334387, 1190352716, 1190641324, 1202600586, 1206718941, 1209302133, 1214814043, 1216095517, 1220486075, 1223892937, 1224444732, 1225577971, 1229986049, 1243738793, 1247471306, 1252266596, 1252792940, 1253960230, 1254127330, 1255848785, 1255859538, 1257563663, 1257583343, 1258195056, 1258213434, 1262993336, 1263908042, 1265512654, 1267283463, 1278475387, 1281229947, 1281889125, 1284797630, 1288585218, 1290240457, 1290513099, 1293031053, 1295516865, 1297095740, 1297597617, 1298827289, 1298832842, 1299380998, 1300818337, 1304310342, 1304455504, 1310534169, 1316956180, 1336232039, 1337809090, 1340075459, 1343684265, 1347737800, 1348149256, 1354685816, 1355025196, 1357282216, 1357301365, 1363667295, 1364395531, 1364732891, 1373278040, 1373514813, 1373685873, 1375205051, 1375419602, 1376146087, 1380234474, 1380513046, 1381723825, 1382632688, 1382645602, 1382709874, 1386126578, 1388184353, 1389190819, 1389902309, 1389912616, 1390104485, 1390958270, 1391687090, 1391699393, 1393151104, 1395748391, 1395924208, 1397018707, 1397022500, 1397827261, 1398423514, 1400330808, 1401462671, 1410284129, 1411428439, 1412479074, 1412717811, 1412831927, 1420822802, 1423109435, 1423890423, 1424552007, 1425040900, 1428131728, 1431817030, 1431897749, 1433480127, 1433483767, 1434457973, 1451286836, 1451565010, 1452211848, 1452224159, 1455851258, 1458060161, 1458176029, 1458620255, 1463365872, 1466302404, 1472319400, 1475303091, 1484355552, 1486115226, 1486401243, 1489893113, 1490054949, 1492145100, 1494001659, 1494630697, 1494690535, 1494695213, 1494714660, 1494714786, 1494714930, 1494889015, 1494990523, 1494992680, 1494997876, 1495466906, 1500014997, 1502962162, 1504548128, 1505655813, 1508029184, 1508045454, 1509815249, 1518807662, 1524160328, 1529373691, 1536802563, 1538089784, 1539586715, 1544812783, 1547140470, 1552392687, 1552405115, 1552405169, 1553111822, 1553462237, 1554120313, 1554158027, 1555241094, 1555436471, 1555595989, 1556675361, 1557492455, 1557696008, 1558835738, 1558865070, 1559582938, 1559928005, 1561078602, 1565016185, 1565113430, 1565407826, 1568314306, 1568314316, 1568317266, 1568696751, 1568699472, 1568940804, 1569248185, 1570879860, 1573625992, 1573800670, 1576869802, 1581247153, 1581398717, 1581675892, 1581718434, 1583510121, 1583803496, 1588886160, 1595292826, 1602148307, 1605015374, 1609481646, 1612153257, 1618209596, 1618218864, 1618873873, 1619384363, 1624861042, 1630153983, 1638526919, 1639454708, 1640524262, 1641042489, 1641812886, 1647303548, 1648240296, 1650468220, 1650500409, 1651513056, 1658862087, 1658979753, 1661301475, 1667470132, 1667473335, 1667728240, 1667806132, 1677105623, 1680875001, 1680882207, 1681660610, 1685495090, 1685495093, 1685495270, 1685495398, 1688394353, 1688567575, 1688665455, 1688778883, 1690751126, 1691125863, 1693300755, 1694472929, 1703388735, 1709297356, 1709313729, 1712511978, 1715661089, 1717927392, 1718114956, 1721373840, 1722360575, 1724823399, 1726408681, 1726606395, 1726645504, 1732927910, 1736066754, 1736347741, 1740486766, 1742215384, 1745377406, 1758824175, 1758930481, 1758975612, 1759122505, 1759143730, 1759143733, 1759227293, 1759313682, 1759313685, 1759412017, 1759432510, 1759498975, 1759505228, 1759507354, 1759515800, 1759642661, 1759864276, 1759893786, 1760159824, 1763810143, 1766750547, 1769211545, 1769618102, 1772590156, 1775156822, 1780760274, 1783870720, 1784406502, 1786353732, 1793007575, 1811810046, 1815656403, 1816569647, 1816866992, 1822574126, 1822868024, 1822868031, 1823268852, 1823275309, 1823288115, 1823390804, 1823768300, 1833535991, 1842420860, 1844031908, 1844296341, 1844524436, 1844853963, 1845272265, 1845433501, 1850725233, 1851761689, 1851765614, 1852766386, 1853687691, 1854177922, 1861204803, 1863593250, 1872674263, 1872992134, 1873841021, 1877281407, 1877305076, 1881597618, 1884316146, 1886743174, 1887188539, 1892879921, 1905997196, 1912353097, 1916296381, 1919640688, 1919643810, 1924325687, 1935798204, 1935801369, 1935813711, 1935815187, 1935818499, 1941710024, 1944260378, 1945210145, 1951157591, 1955955663, 1957378415, 1957388660, 1957444069, 1958153525, 1958153878, 1962799016, 1964448624, 1967235715, 1967514117, 1968334692, 1970709900, 1974828022, 1977445003, 1980811473, 1981302481, 1984866213, 1986874949, 1987285901, 1987558613, 1988913069, 1998855379, 2023930736, 2026542768, 2029442974, 2029502301, 2031253491, 2041190670, 2044176332, 2044519717, 2044521677, 2044845895, 2044862336, 2050748464, 2055299797, 2059226128, 2060744697, 2060874008, 2061631935, 2062602594, 2062613436, 2062713055, 2062721365, 2062782118, 2064194523, 2064289093, 2064667157, 2064835977, 2065546931, 2065580690, 2065783508, 2066019598, 2067177842, 2067640249, 2068518016, 2068619301, 2069026672, 2069773511, 2070805664, 2073324624, 2075547993, 2076314666, 2076760108, 2076927096, 2078661044, 2080078919, 2080126248, 2080270176, 2080768362, 2080948565, 2081049148, 2081811414, 2082081519, 2083365940, 2084275182, 2089789238, 2090043919, 2090165361, 2090287045, 2092471497, 2092773191, 2093281591, 2093290649, 2093484170, 2095261287, 2096596043, 2096775591, 2100685312, 2102866955, 2108433077, 2109903284, 2110249550, 2112026046, 2112754908, 2114424326, 2115251185, 2116737470, 2118764990, 2119510407, 2120903194, 2121183749, 2121530494, 2121539444, 2122085862, 2123968241, 2123974461, 2124038667, 2126585211, 2127702833, 2127711196, 2129393172, 2140172366, 2141043403, 2144163444, 2144352359, 2146552134, 2146559400, 2146579609, 2146771534, 2146787712, 2147192784, 2149214372, 2150227387, 2151276842, 2152677197, 2158829447, 2159124528, 2159550475, 2161337980, 2161361535, 2163722410, 2163917836, 2165826914, 2169168320, 2170868227, 2173022808, 2174751247, 2179048400, 2184998274, 2196541409, 2200622033, 2203412941, 2206322353, 2208794483, 2219653172, 2219657520, 2225010953, 2226828879, 2238722895, 2238722920, 2238723506, 2241976578, 2245936247, 2248375230, 2249276550, 2249625301, 2254065144, 2254179087, 2254183431, 2254275149, 2254449430, 2254449877, 2255178054, 2264880989, 2270863210, 2290294367, 2304704334, 2304866355, 2305219189, 2310350875, 2310486036, 2312897274, 2314773060, 2315564905, 2319231065, 2319463533, 2325240383, 2327016339, 2330482855, 2337919027, 2340169455, 2359883328, 2361871491, 2366081778, 2369823335, 2369831600, 2371523459, 2372759050, 2374977123, 2376431395, 2378889732, 2382890223, 2383755454, 2386589953, 2387052696, 2389856295, 2391789782, 2398718314, 2399324290, 2400888860, 2401211408, 2404756392, 2406557074, 2407241140, 2409418646, 2411497922, 2411691127, 2413846222, 2413908037, 2414944572, 2415208709, 2417936111, 2419639306, 2423159152, 2423360684, 2425978408, 2428076111, 2437572023, 2440527060, 2444775143, 2449407487, 2457428534, 2469735934, 2475146676, 2475744613, 2476033552, 2476112212, 2476147614, 2477393954, 2478803388, 2479415778, 2482075359, 2485317413, 2485370363, 2488499588, 2488699734, 2491415998, 2492607180, 2493496209, 2497515972, 2499072481, 2499532790, 2504383993, 2504870149, 2505121421, 2505147736, 2513647314, 2513693640, 2513701512, 2513706827, 2521253655, 2521398855, 2526527953, 2526528078, 2527291586, 2527292245, 2527666001, 2528098475, 2536669081, 2536933437, 2537106090, 2538335365, 2541170503, 2541170604, 2541177518, 2545965593, 2546249066, 2546819122, 2548278991, 2548782015, 2549421379, 2557808039, 2557863700, 2558865115, 2568950385, 2569073380, 2569341502, 2569405925, 2570837952, 2575053435, 2575619554, 2575627585, 2579451785, 2581687876, 2582936524, 2586547509, 2590439971, 2600983050, 2602643559, 2605946857, 2608238576, 2608504686, 2611889973, 2612202111, 2619739935, 2621175072, 2627204334, 2627570013, 2627677159, 2631480810, 2631901285, 2635187702, 2637430468, 2638897207, 2639751704, 2642390316, 2644459471, 2644532855, 2644906311, 2645171587, 2647433605, 2647443463, 2649904288, 2651288351, 2652440186, 2655263134, 2660229222, 2660362019, 2662714632, 2671981072, 2673085999, 2676359415, 2678218950, 2680015310, 2683201101, 2683726243, 2687071289, 2687546085, 2689958531, 2690565794, 2691049537, 2696922944, 2702278755, 2705586928, 2707450736, 2708750293, 2710694053, 2710777678, 2717039465, 2719746264, 2719953243, 2722365346, 2724396360, 2730361077, 2732178535, 2732249147, 2732255792, 2732453216, 2732465831, 2733162785, 2733179003, 2740913336, 2743326046, 2745816408, 2746770100, 2768031559, 2768594053, 2769743066, 2770453396, 2777301260, 2777413063, 2779047561, 2779131760, 2781151044, 2788878449, 2791114477, 2792266216, 2795123222, 2795130739, 2795148393, 2803000277, 2803220098, 2820015673, 2824852881, 2825063248, 2825297984, 2826183623, 2826618777, 2828159974, 2830840737, 2840364717, 2844137461, 2844192015, 2844331414, 2844474265, 2845536368, 2847702680, 2847708560, 2849875839, 2854691117, 2857021867, 2857111846, 2857167445, 2857291628, 2857718467, 2857718874, 2859609075, 2860369035, 2860944275, 2861234828, 2861431296, 2861773187, 2862323803, 2862729831, 2862789186, 2862818280, 2865000297, 2865536587, 2872917161, 2879220442, 2885591219, 2886256228, 2886266660, 2886337850, 2886340600, 2886347487, 2886358758, 2886559394, 2888553420, 2893735969, 2893987517, 2894277589, 2895201770, 2895970159, 2903889952, 2904798808, 2907566289, 2911967032, 2913775681, 2917443420, 2921648360, 2921994283, 2925162127, 2925540459, 2931480722, 2936112276, 2938485423, 2939997155, 2941295122, 2942568797, 2944555176, 2950549599, 2952067971, 2952072562, 2955690120, 2961421753, 2962144430, 2962519996, 2962841785, 2964270344, 2964373735, 2965548040, 2966852375, 2970298080, 2974400461, 2975755381, 2981996158, 2987922608, 2991195167, 2991625994, 2993771546, 2995901561, 3000958971, 3001281849, 3001388716, 3004478994, 3004479027, 3004479111, 3004479159, 3004479171, 3004479184, 3004479190, 3004479239, 3004479240, 3004479258, 3004479289, 3004479305, 3004479323, 3004479334, 3004479373, 3004479389, 3004479390, 3004479401, 3004479425, 3004479785, 3004479787, 3004479818, 3004479829, 3004479837, 3004479976, 3004479994, 3004480114, 3005847375, 3006723884, 3006726944, 3006727797, 3006731179, 3006737252, 3006744684, 3006811183, 3012299493, 3014399025, 3019017018, 3019072181, 3019996757, 3020108825, 3020133371, 3020188532, 3023885513, 3024558034, 3024589567, 3024626538, 3033483503, 3034109278, 3035739007, 3035887950, 3044634578, 3044797796, 3044821749, 3045244983, 3045788419, 3045876876, 3046124074, 3046256428, 3050244615, 3050333064, 3050334784, 3056297406, 3062281966, 3063798750, 3063849681, 3073445035, 3073797863, 3073848296, 3086119708, 3087786680, 3089398889, 3089451715, 3089454054, 3089461994, 3089735415, 3094552970, 3097888413, 3098875466, 3099276787, 3104375123, 3104503715, 3105798493, 3107144912, 3107146953, 3110631110, 3110681545, 3111601102, 3111601746, 3111606786, 3114815727, 3119543502, 3119594433, 3120807553, 3120857998, 3122897068, 3125786613, 3128821880, 3133975234, 3135838657, 3136281421, 3145164732, 3147940006, 3154068140, 3154152867, 3157412719, 3157501664, 3159380027, 3160589879, 3161016478, 3161897203, 3174437714, 3180245112, 3180300610, 3182786585, 3183126568, 3183293814, 3183325319, 3184294753, 3188347051, 3191217062, 3196370198, 3197567695, 3198643172, 3198783739, 3198824989, 3198841920, 3198930383, 3199640352, 3200095506, 3203439089, 3203573947, 3203579445, 3208441350, 3209729826, 3210506925, 3210514725, 3210570457, 3214383466, 3214394316, 3214653823, 3215790970, 3217760577, 3218901480, 3218928718, 3218996674, 3218997101, 3219339071, 3219427268, 3220535722, 3220543483, 3221757640, 3223098753, 3224727829, 3232284385, 3232339054, 3234508143, 3234559072, 3235473148, 3237969392, 3243142044, 3247991594, 3253953941, 3269910681, 3270985722, 3273573836, 3273628995, 3275986591, 3277061645, 3277112578, 3277868236, 3277980164, 3278129999, 3278154322, 3280832255, 3280992609, 3283017533, 3286262047, 3290414111, 3301409832, 3301494567, 3302526185, 3302610918, 3305712858, 3305866028, 3305950755, 3309540327, 3309590022, 3309595898, 3309596203, 3309660560, 3309660597, 3309937069, 3312550946, 3312639405, 3317007142, 3317095593, 3324397363, 3331028046, 3331525682, 3331580349, 3331802213, 3332642035, 3332696700, 3333929978, 3334870005, 3334920442, 3335058344, 3335315569, 3343940221, 3345496201, 3350023967, 3353092349, 3358586999, 3365687143, 3366763202, 3368167300, 3371155980, 3372842751, 3373802982, 3374003367, 3374007861, 3374013921, 3374033257, 3374071862, 3374072315, 3374075119, 3374222601, 3374506623, 3377952754, 3382868701, 3384928690, 3388197033, 3390931348, 3391051206, 3391063809, 3391068622, 3391334282, 3391402631, 3391423133, 3391432603, 3392425741, 3394879910, 3395277647, 3399311251, 3402270417, 3404440519, 3414226886, 3414277321, 3415566709, 3417045783, 3417060092, 3418683074, 3418733517, 3424453774, 3431921225, 3437307073, 3437430868, 3437705452, 3444401619, 3445590826, 3447374472, 3456431399, 3458638240, 3461359920, 3463272868, 3468986640, 3469121667, 3471246134, 3474393156, 3474446194, 3476056250, 3478543821, 3486841411, 3486906847, 3489097968, 3491201265, 3495569706, 3496705474, 3497897502, 3497994843, 3498252682, 3502149957, 3504414102, 3504826781, 3506839508, 3506948350, 3508950458, 3509210745, 3509498189, 3511959565, 3512025010, 3512493029, 3514111400, 3517669498, 3518790968, 3521920341, 3523035738, 3523862571, 3524226140, 3530307622, 3530358057, 3536335853, 3536792162, 3538712404, 3541452460, 3541507619, 3542648636, 3544416242, 3550676375, 3551025439, 3553383951, 3556498831, 3561501051, 3561585780, 3565016796, 3565023071, 3565174365, 3565227623, 3565288856, 3566089568, 3572109810, 3575114019, 3577841990, 3586425916, 3589694483, 3591020567, 3592221649, 3594125448, 3595182758, 3596128381, 3602035250, 3602533630, 3602552275, 3604829927, 3607233834, 3607322789, 3607604079, 3608554389, 3610981370, 3617629034, 3619761411, 3623812162, 3629877419, 3636237811, 3636292476, 3639577654, 3639632313, 3645953597, 3647523178, 3649784978, 3653883892, 3660676457, 3664234276, 3674197367, 3675513627, 3681233287, 3684650455, 3688377898, 3689406359, 3692544695, 3693437133, 3694959415, 3703294733, 3704443907, 3704956777, 3706490306, 3709178884, 3709268355, 3709272958, 3717182590, 3718660896, 3719413702, 3721853564, 3731122282, 3734934472, 3736397122, 3736397691, 3738359136, 3744502996, 3744505315, 3744515994, 3744516038, 3745225898, 3745403285, 3749377655, 3751498613, 3752631559, 3753565240, 3756319792, 3758308501, 3758308691, 3761682835, 3762386667, 3762488637, 3763193356, 3763904751, 3764062969, 3764739038, 3769398133, 3770065529, 3774076759, 3779092995, 3780318738, 3781089827, 3783201212, 3785420602, 3786786081, 3788364543, 3791375542, 3791430201, 3791912060, 3792007260, 3792147146, 3793208754, 3794029235, 3805317549, 3808957225, 3809652473, 3811984999, 3812594538, 3819295903, 3819351056, 3821104144, 3821104746, 3829518367, 3832811824, 3833121835, 3833171090, 3833706374, 3838812042, 3843969806, 3844552031, 3850681433, 3851222744, 3851541567, 3851602009, 3851679807, 3853676291, 3855415829, 3856249405, 3859110665, 3859972063, 3862928629, 3865386916, 3865396334, 3873108359, 3873163016, 3876524049, 3883472548, 3885986978, 3888196487, 3895773227, 3898366596, 3900605466, 3900796753, 3906034907, 3907036333, 3914330405, 3916906002, 3922403377, 3925982068, 3933039724, 3936549300, 3939824482, 3940957272, 3941201834, 3941535714, 3943160335, 3943296300, 3950173236, 3955179593, 3959867562, 3960938237, 3961299015, 3961303520, 3961836502, 3962329360, 3963273426, 3966271140, 3969493837, 3970184201, 3971378905, 3972349404, 3972404563, 3974206923, 3977375686, 3977639927, 3981851856, 3984175284, 3984369770, 3984383153, 3984388901, 3984577838, 3986753035, 3987449768, 3988320676, 3989122328, 3989124781, 3989300792, 3991957101, 3991978776, 3992246021, 3993156440, 3995285601, 4002046206, 4002059123, 4002298131, 4007368305, 4009075902, 4012314248, 4014272956, 4018800601, 4021398623, 4022152923, 4023242992, 4034787018, 4034837957, 4040007159, 4040507273, 4040558214, 4042630615, 4042667369, 4044815570, 4044899805, 4046325025, 4051504220, 4051593171, 4059166898, 4059387372, 4060969098, 4060986772, 4062588735, 4063625944, 4063736412, 4064813411, 4074640059, 4077930265, 4080197122, 4081731399, 4081736449, 4081740860, 4081761692, 4082508192, 4082648933, 4085037592, 4085499470, 4085741867, 4086206754, 4087477773, 4087973382, 4087974431, 4087975312, 4087977920, 4087977986, 4087982672, 4087983230, 4087984585, 4087984590, 4087984656, 4087988411, 4087993231, 4087993234, 4087993291, 4087993428, 4088004545, 4089941093, 4090379779, 4094838531, 4095533224, 4098180267, 4104794847, 4104808845, 4105491350, 4105500480, 4109580593, 4111598640, 4115797781, 4116207257, 4116258198, 4116322118, 4116406345, 4116912946, 4122262153, 4126221625, 4127308650, 4128209898, 4128210099, 4128224738, 4128228031, 4128452341, 4131804567, 4131859224, 4137741343, 4141029933, 4142953920, 4145022541, 4149201544, 4150566897, 4151710650, 4152474623, 4155185738, 4156445644, 4157556469, 4157644922, 4159136925, 4159401066, 4159780211, 4159864444, 4164601660, 4166043368, 4168091484, 4169450331, 4170161097, 4170579962, 4170925049, 4171014006, 4171016671, 4171029715, 4172482250, 4175353143, 4176008925, 4178981053, 4184703759, 4186748423, 4188894668, 4189635776, 4190045706, 4190142208, 4195146068, 4196943735, 4199824850, 4203521301, 4206809827, 4206944958, 4207535653, 4208164707, 4211585807, 4215346074, 4215356593, 4218114605, 4218115138, 4218132009, 4219656584, 4219999876, 4220379359, 4221957810, 4222018626, 4225873997, 4227433758, 4228171984, 4228217908, 4228360888, 4228368741, 4228368760, 4231583294, 4231662792, 4232149414, 4232629512, 4234942237, 4235762280, 4240864861, 4241320459, 4241740950, 4242647335, 4243702915, 4245105172, 4246629902, 4248741847, 4252833472, 4252840599, 4254781707, 4254799704, 4255058051, 4260594638, 4261873154, 4261894730, 4262104449, 4262374147, 4262375371, 4262499171, 4264253465, 4265048576, 4267292711, 4271528787, 4272039260, 4272350188, 4272417877, 4276136562, 4288066094, 414, 6205003, 54631547, 68945260, 76317054, 90122581, 107533418, 134757519, 142022835, 149084067, 159782934, 165071847, 169736776, 205527546, 224032181, 244603010, 255553804, 262051769, 263431316, 284810646, 289494951, 371032970, 373243562, 374621869, 387545720, 391377589, 415171499, 415171548, 415171976, 418990556, 418990602, 435420269, 461226423, 483976516, 501379566, 529540141, 531625563, 553327069, 590191545, 595217502, 649854972, 656131164, 668816409, 678957092, 680578927, 714686602, 715141614, 717942499, 720960146, 720974524, 720974736, 720975995, 725617684, 744932012, 793535325, 806495002, 817571047, 823641433, 857348365, 862586280, 862607507, 862637170, 862767957, 862847657, 863187547, 863261727, 871542102, 874127079, 874448701, 877175745, 893771636, 914435801, 931438088, 937200556, 985925171, 999743180, 1015486168, 1026348750, 1029964103, 1030875558, 1083568115, 1106088318, 1206251138, 1219433535, 1220725895, 1220852235, 1220852260, 1220852796, 1220852957, 1222628504, 1230410191, 1236957398, 1240508317, 1242746690, 1260212779, 1282239389, 1290343418, 1338160975, 1340954405, 1351436722, 1361325259, 1374669131, 1374800320, 1389479998, 1389489864, 1401511709, 1421711922, 1442213995, 1451199708, 1452449030, 1467196671, 1467386990, 1490648152, 1506058569, 1507763651, 1514073041, 1515782688, 1515784934, 1515785058, 1523142552, 1526329423, 1553174585, 1554493328, 1591300266, 1629584534, 1641166031, 1642384128, 1661678914, 1679178836, 1679485164, 1681545174, 1704277516, 1705410866, 1705908110, 1714538458, 1716909455, 1772526810, 1780819577, 1818263278, 1821800212, 1833750850, 1834601376, 1834613468, 1866278547, 1867401367, 1936236019, 1945296852, 1978039580, 1997464432, 2013078789, 2017904725, 2055461758, 2058918178, 2080694907, 2086814061, 2089989988, 2123843096, 2170766397, 2172738430, 2174442073, 2177527468, 2178512614, 2233637259, 2246941078, 2268386306, 2274845447, 2274845649, 2279046513, 2293400491, 2299670458, 2300280964, 2300527715, 2305877279, 2307152224, 2316307169, 2322963439, 2335588857, 2337430377, 2359562546, 2360555826, 2389375265, 2396889473, 2405952063, 2419834458, 2423179189, 2436862648, 2436862650, 2436862651, 2436862652, 2436862653, 2436862654, 2436862655, 2439178127, 2460729245, 2517521888, 2585317679, 2631335866, 2632842752, 2712012329, 2717013248, 2718435811, 2726590321, 2726667654, 2726667661, 2726667752, 2726667756, 2726667834, 2726667995, 2726668398, 2726870506, 2726991293, 2737177336, 2757711981, 2787445139, 2796817467, 2804945717, 2812190333, 2816464305, 2817592022, 2824075537, 2826795200, 2827908591, 2830699603, 2830965258, 2841353452, 2872823135, 2873905939, 2876785673, 2876785759, 2901134565, 2913059937, 2924726497, 2938670220, 2939089089, 2943360116, 2945389039, 3005172573, 3015670621, 3022308183, 3050185270, 3050185436, 3056015384, 3056015484, 3071839865, 3079506072, 3079929644, 3116612793, 3131379081, 3149479373, 3164097381, 3176028223, 3176996220, 3180729164, 3183078197, 3227651590, 3234391576, 3234432745, 3278041418, 3278041727, 3278041816, 3319967633, 3330642108, 3334769994, 3354637514, 3375261606, 3375312977, 3410061515, 3410068256, 3410106074, 3417365519, 3423153883, 3456106742, 3461071037, 3473412940, 3486684134, 3504293483, 3517650814, 3547292615, 3571189672, 3593285841, 3612407497, 3666061454, 3666061458, 3666061568, 3666061577, 3666061585, 3666061591, 3666061602, 3666061610, 3666061613, 3666061619, 3666061666, 3666061672, 3666061702, 3666061706, 3666061732, 3666061760, 3666061781, 3666061825, 3666061864, 3666061891, 3666061895, 3666061896, 3666061902, 3666061903, 3666061913, 3666062029, 3666062293, 3666062299, 3666062326, 3666062331, 3666062345, 3666062357, 3666062361, 3666062379, 3666062386, 3666062390, 3666062391, 3666062394, 3666062408, 3666062418, 3666062422, 3666062427, 3666062453, 3666062517, 3666062569, 3666062581, 3666062582, 3666062586, 3666062587, 3666099519, 3667007182, 3676644409, 3676644411, 3676644421, 3676644429, 3676644442, 3676644586, 3676644600, 3676644610, 3676644643, 3676644706, 3676644759, 3676644775, 3676644800, 3676644806, 3676644819, 3676644874, 3676644887, 3676644888, 3676644905, 3676644939, 3676644953, 3676644982, 3676645005, 3676645006, 3676645021, 3676645049, 3676645073, 3684315096, 3691777760, 3697941178, 3708654452, 3710369155, 3739453678, 3749170769, 3772863442, 3793240332, 3798969166, 3800169971, 3808938955, 3809042458, 3809042834, 3820675046, 3829710462, 3829710568, 3845152461, 3847111189, 3861225221, 3871154340, 3872238039, 3877533355, 3916589493, 3949265042, 3952274701, 3956209759, 3956209883, 3967179311, 4020468984, 4088042711, 4088042763, 4088043471, 4098608917, 4098609219, 4098704176, 4098704230, 4098775844, 4098776178, 4098815877, 4098816211, 4126370696, 4127380674, 4128194716, 4152440610, 4155818428, 4160021452, 4160641621, 4179162156, 4189349925, 4224941776, 4233200080, 4248600132, 4259920717, 4268151753, 4268562148, 0, 0, 0, 31, 32645503, 343511425, 1030334438, 1035444912, 1035444966, 1126785125, 1126785220, 1126785554, 1126785661, 1160516735, 1286944368, 2016993734, 2016993895, 2496101809, 2496102290, 2496102373, 2501069285, 2501069363, 2501069943, 2506938014, 2613448893, 2668096359, 2767610756, 2943255975, 3483670337, 3483670475, 3483670694, 3483670995, 3641922754, 4206482405, 4233599295, 4, 989615076, 1348282182, 2372695675, 2793429742, 451, 2315777, 2516160, 11643297, 13203897, 21231554, 35967653, 38712935, 47792331, 72865995, 74144458, 82734700, 83460346, 105527502, 113271207, 133175084, 133306274, 134752460, 140540365, 149081424, 159784149, 160693466, 187981691, 201714711, 248032557, 257089230, 271126044, 284628322, 288401789, 293512087, 299470436, 301921344, 303087651, 310748895, 315932160, 317229038, 318673258, 321508235, 328967865, 331740776, 333043316, 343618051, 344116268, 349554276, 368842915, 373240553, 380288946, 385653806, 387546555, 391603917, 397299232, 399675396, 407552584, 411195000, 444280280, 457925677, 459126046, 465045723, 466546683, 476300545, 496262010, 508940895, 516076913, 528158848, 556967719, 576308682, 599016891, 599034260, 599035482, 617473653, 629010449, 643159709, 649306413, 657763177, 658030821, 663498697, 666920016, 684079208, 718967674, 730892591, 745170160, 748876721, 748886222, 752803028, 756281027, 761348098, 764441186, 767592699, 768148470, 771634050, 771637032, 797075449, 798164153, 806496217, 807477757, 814547322, 823640218, 828791723, 830209933, 830328663, 830812219, 831086733, 843422410, 848961657, 871543061, 884068409, 885566443, 898403917, 931459402, 935392831, 935834596, 953760609, 956026316, 973201175, 985556812, 990107236, 1002251210, 1006286666, 1015491227, 1017212284, 1017751931, 1021423441, 1026349709, 1027559288, 1039189287, 1040655967, 1048681185, 1049173028, 1069937338, 1071441344, 1072691903, 1128950639, 1139782538, 1139843834, 1141008431, 1156523661, 1160815779, 1194239092, 1197936283, 1211577197, 1211637010, 1222641289, 1240507358, 1250860863, 1264600767, 1288872441, 1321698432, 1329660539, 1338155660, 1339210968, 1373285759, 1382125974, 1390628516, 1399578255, 1399657308, 1403708559, 1408484449, 1421977812, 1432456391, 1433498959, 1468959011, 1474134153, 1481167509, 1481892069, 1485735468, 1512063165, 1514478145, 1519263375, 1522675342, 1541305645, 1542981532, 1553720283, 1557499238, 1632730660, 1635518266, 1640297675, 1644040136, 1645084619, 1672625515, 1675268949, 1675573659, 1679183895, 1701744405, 1704282831, 1705918154, 1709094170, 1740118996, 1745197398, 1746168006, 1763490076, 1764138250, 1778504542, 1804707890, 1807895638, 1812124962, 1825087480, 1826407997, 1827997201, 1834433178, 1836295865, 1836721468, 1855831597, 1871287494, 1874044309, 1894472089, 1911094612, 1944286571, 1945301911, 1964668429, 1992457158, 2001245397, 2005254865, 2009607860, 2048724462, 2072914399, 2073220142, 2080693816, 2086817070, 2091822363, 2116894487, 2120589916, 2132854800, 2138833857, 2149555928, 2149786502, 2159131792, 2166792548, 2193556503, 2203826663, 2222814745, 2233632200, 2234478015, 2266871804, 2270958851, 2280109123, 2300684501, 2320975486, 2363964101, 2368015199, 2368150205, 2378859099, 2402357659, 2406246052, 2420231640, 2421832104, 2429899162, 2442099500, 2445444524, 2450316872, 2477231344, 2480056360, 2497381376, 2511017726, 2535682339, 2564758885, 2580206998, 2581034625, 2634443356, 2655498207, 2659744440, 2664398480, 2665288759, 2683912382, 2685363948, 2697995386, 2705244823, 2707054618, 2722204667, 2731911143, 2746095604, 2750223108, 2751457001, 2757038073, 2757714990, 2757832374, 2763102979, 2764615893, 2768173321, 2769632227, 2788021838, 2805563472, 2808290141, 2812672828, 2813866328, 2817995155, 2823576784, 2832963785, 2833300206, 2839929991, 2842899363, 2855442276, 2861724882, 2873826097, 2875201553, 2889802328, 2894057006, 2902844704, 2920776771, 2938675535, 2940382413, 2940687092, 2942499160, 2944606430, 2976147113, 2999699036, 3012594373, 3014878073, 3018472732, 3021947486, 3024482894, 3027886950, 3033143700, 3041972547, 3043054392, 3061104959, 3068421535, 3068451149, 3073259213, 3076287128, 3092740204, 3097180103, 3100000510, 3103387337, 3126517186, 3134714387, 3141033517, 3153726305, 3161099645, 3164570023, 3168616586, 3171093691, 3174505760, 3178721795, 3185964212, 3199657339, 3213212569, 3227558031, 3234959359, 3242752110, 3245911312, 3250117513, 3255207552, 3263028169, 3267416959, 3271443733, 3276067803, 3303582289, 3303582897, 3303582994, 3303614961, 3327283712, 3336973745, 3344426237, 3345667381, 3346748653, 3355942409, 3358811093, 3365430328, 3371744816, 3378392276, 3393399711, 3418876414, 3451234301, 3462047339, 3466186248, 3487461167, 3489942689, 3497005689, 3511023565, 3528253833, 3567612396, 3577832733, 3577832874, 3579570991, 3581968529, 3587382024, 3594263141, 3597175734, 3609198260, 3620670314, 3644061745, 3686687805, 3699471696, 3704450806, 3719669200, 3724302375, 3732631655, 3737867596, 3737869333, 3737882439, 3743824089, 3748450386, 3755463030, 3762725071, 3780090414, 3786960458, 3789613664, 3804622433, 3826380201, 3829814476, 3834232417, 3836376093, 3843018675, 3847110230, 3849573984, 3888536498, 3895950835, 3925391633, 3927045026, 3929681833, 3930866393, 3974478460, 3989861270, 3990612749, 3994206764, 3994206767, 4003176468, 4005639964, 4013705057, 4020891302, 4040130402, 4048452106, 4055956024, 4064081091, 4069710253, 4076793042, 4078153021, 4090215578, 4095557691, 4103392506, 4105790268, 4130682685, 4131077260, 4150503708, 4155492542, 4165042016, 4180101814, 4186885299, 4188349987, 4190709408, 4193373567, 4197651626, 4198443983, 4202984206, 4210375752, 4212069506, 4216891535, 4228991204, 4251429164, 4263509307, 4279717352, 4282015733, 0, 0, 0, 2, 898804372, 2420122849, 0, 191, 14034108, 23188555, 69988957, 176179919, 181602757, 231162178, 234878220, 241015393, 282017655, 286917352, 298380305, 303225044, 333040682, 436746473, 437068413, 449019336, 449464240, 451920903, 472319354, 495318858, 500388520, 512606097, 527005648, 531402563, 554651161, 561857715, 570474602, 588675343, 615779940, 680838102, 688229624, 722503086, 733631603, 759879349, 760863762, 768579191, 769161927, 777931472, 804592434, 820388681, 834351359, 838060561, 871806992, 907959623, 917609192, 921095799, 922653385, 936253712, 951807472, 976944213, 1057868108, 1061438860, 1097991931, 1099387701, 1118780323, 1129127307, 1134058690, 1149298066, 1173449599, 1188365042, 1221482277, 1242510922, 1244344576, 1249042959, 1256956692, 1322375458, 1340682260, 1389219463, 1420709285, 1468300758, 1544881072, 1554252850, 1557974723, 1564485910, 1566036640, 1637844009, 1641584834, 1668922875, 1697481902, 1700564263, 1779722906, 1817679755, 1844196310, 1862443027, 1863425670, 1874439438, 1918635827, 1942164974, 1953292144, 1996832610, 2005075462, 2171493616, 2174172768, 2200270403, 2224853335, 2232538822, 2253530761, 2271804726, 2307427283, 2314778321, 2325064176, 2347507979, 2356867634, 2422267260, 2435625787, 2442761119, 2448910470, 2454582508, 2471444403, 2478294033, 2487762682, 2505529649, 2513007594, 2514973059, 2523046044, 2645305307, 2697781106, 2700249759, 2713921343, 2858583336, 2869381059, 2875883974, 2877426354, 2906087318, 2940183875, 2941854634, 2983778787, 2991311078, 3020661286, 3033841873, 3036938981, 3061233249, 3088839886, 3090851000, 3116880000, 3160125774, 3173697968, 3175256934, 3193365922, 3209525171, 3248874150, 3262696949, 3293334302, 3294129343, 3298593000, 3336190368, 3342381501, 3344449059, 3367460946, 3387371732, 3391640312, 3415133140, 3415553447, 3416872467, 3486599559, 3505446608, 3554833241, 3594782899, 3615198865, 3629910769, 3642670614, 3643744473, 3654513786, 3675702820, 3697030868, 3710380917, 3732976135, 3779661543, 3795518186, 3803370028, 3804920752, 3840174405, 3861583079, 3867650596, 3894082090, 3900359633, 3928753122, 3942119031, 3951224511, 4009634354, 4063453845, 4065646590, 4079144597, 4163056211, 4180315949, 4189523019, 4196008531, 4241738188, 4254148468, 4265459019, 4273759132, 0, 0, 0, 1, 1058807915, 0, 5, 1148034389, 1373602048, 2160920720, 2391490885, 2722440867]);

	/**
	 * Find `elt` in `arr` between indices `start` (included) and `end` (excluded)
	 * using a binary search algorithm.
	 */
	function binSearch$1(arr, elt, start, end) {
	    if (start >= end) {
	        return false;
	    }
	    let low = start;
	    let high = end - 1;
	    while (low <= high) {
	        const mid = (low + high) >>> 1;
	        const midVal = arr[mid];
	        if (midVal < elt) {
	            low = mid + 1;
	        }
	        else if (midVal > elt) {
	            high = mid - 1;
	        }
	        else {
	            return true;
	        }
	    }
	    return false;
	}
	// Packed hash algorithm makes use of a rolling hash to lookup suffixes. To
	// avoid having to allocate an array to store them at every invocation, we
	// create one global one that can be reused.
	const BUFFER = new Uint32Array(20);
	/**
	 * Iterate on hashes of labels from `hostname` backward (from last label to
	 * first label), stopping after `maximumNumberOfLabels` have been extracted and
	 * calling `cb` on each of them.
	 *
	 * The `maximumNumberOfLabels` argument is typically used to specify the number
	 * of labels seen in the longest public suffix. We do not need to check further
	 * in very long hostnames.
	 */
	function hashHostnameLabelsBackward(hostname, maximumNumberOfLabels) {
	    let hash = 5381;
	    let index = 0;
	    // Compute hash backward, label per label
	    for (let i = hostname.length - 1; i >= 0; i -= 1) {
	        const code = hostname.charCodeAt(i);
	        // Process label
	        if (code === 46 /* '.' */) {
	            BUFFER[index << 1] = hash >>> 0;
	            BUFFER[(index << 1) + 1] = i + 1;
	            index += 1;
	            if (index === maximumNumberOfLabels) {
	                return index;
	            }
	        }
	        // Update hash
	        hash = (hash * 33) ^ code;
	    }
	    // Let's not forget about last label
	    BUFFER[index << 1] = hash >>> 0;
	    BUFFER[(index << 1) + 1] = 0;
	    index += 1;
	    return index;
	}
	/**
	 * Perform a public suffix lookup for `hostname` using the packed hashes
	 * data-structure. The `options` allows to specify if ICANN/PRIVATE sections
	 * should be considered. By default, both are.
	 *
	 */
	function suffixLookup(hostname, options, out) {
	    if (fastPathLookup(hostname, options, out)) {
	        return;
	    }
	    const { allowIcannDomains, allowPrivateDomains } = options;
	    // Keep track of longest match
	    let matchIndex = -1;
	    let matchKind = 0 /* Result.NO_MATCH */;
	    let matchLabels = 0; // Keep track of number of labels currently matched
	    // Index in the packed array data-structure
	    let index = 1;
	    const numberOfHashes = hashHostnameLabelsBackward(hostname, packed[0] /* maximumNumberOfLabels */);
	    for (let label = 0; label < numberOfHashes; label += 1) {
	        const hash = BUFFER[label << 1];
	        const labelStart = BUFFER[(label << 1) + 1];
	        // For each label, matching proceeds in the following way:
	        //
	        //  1. check exceptions
	        //  2. check wildcards
	        //  3. check normal rules
	        //
	        // For each of these, we also perform the lookup in two parts, once for
	        // the ICANN section and one for the PRIVATE section. Both of which are
	        // optional and can be enabled/disabled using the `options` argument.
	        //
	        // We start with exceptions because if an exception is found, we do not
	        // need to continue matching wildcards or normal rules; the exception will
	        // always have priority.
	        //
	        // Similarly, if we find a wildcard match, we do not need to check the
	        // rules for the same label as the wildcard match is always longer (one
	        // more label is matched).
	        //
	        // **WARNING**: the structure of this code follows exactly the structure
	        // of the packed data structure as create in ./bin/builders/hashes.js
	        let match = 0 /* Result.NO_MATCH */;
	        // ========================================================================
	        // Lookup exceptions
	        // ========================================================================
	        // ICANN
	        if (allowIcannDomains) {
	            match = binSearch$1(packed, hash, index + 1, index + packed[index] + 1)
	                ? 1 /* Result.ICANN_MATCH */ | 4 /* Result.EXCEPTION_MATCH */
	                : 0 /* Result.NO_MATCH */;
	        }
	        index += packed[index] + 1;
	        // PRIVATE
	        if (allowPrivateDomains && match === 0 /* Result.NO_MATCH */) {
	            match = binSearch$1(packed, hash, index + 1, index + packed[index] + 1)
	                ? 2 /* Result.PRIVATE_MATCH */ | 4 /* Result.EXCEPTION_MATCH */
	                : 0 /* Result.NO_MATCH */;
	        }
	        index += packed[index] + 1;
	        // ========================================================================
	        // Lookup wildcards
	        // ========================================================================
	        // ICANN
	        if (allowIcannDomains &&
	            match === 0 /* Result.NO_MATCH */ &&
	            (matchKind & 4 /* Result.EXCEPTION_MATCH */) === 0) {
	            match = binSearch$1(packed, hash, index + 1, index + packed[index] + 1)
	                ? 16 /* Result.WILDCARD_MATCH */ | 1 /* Result.ICANN_MATCH */
	                : 0 /* Result.NO_MATCH */;
	        }
	        index += packed[index] + 1;
	        // PRIVATE
	        if (allowPrivateDomains &&
	            match === 0 /* Result.NO_MATCH */ &&
	            (matchKind & 4 /* Result.EXCEPTION_MATCH */) === 0) {
	            match = binSearch$1(packed, hash, index + 1, index + packed[index] + 1)
	                ? 16 /* Result.WILDCARD_MATCH */ | 2 /* Result.PRIVATE_MATCH */
	                : 0 /* Result.NO_MATCH */;
	        }
	        index += packed[index] + 1;
	        // ========================================================================
	        // Lookup rules
	        // ========================================================================
	        // ICANN
	        if (allowIcannDomains &&
	            match === 0 /* Result.NO_MATCH */ &&
	            (matchKind & 4 /* Result.EXCEPTION_MATCH */) === 0 &&
	            matchLabels <= label) {
	            match = binSearch$1(packed, hash, index + 1, index + packed[index] + 1)
	                ? 8 /* Result.NORMAL_MATCH */ | 1 /* Result.ICANN_MATCH */
	                : 0 /* Result.NO_MATCH */;
	        }
	        index += packed[index] + 1;
	        // PRIVATE
	        if (allowPrivateDomains &&
	            match === 0 /* Result.NO_MATCH */ &&
	            (matchKind & 4 /* Result.EXCEPTION_MATCH */) === 0 &&
	            matchLabels <= label) {
	            match = binSearch$1(packed, hash, index + 1, index + packed[index] + 1)
	                ? 8 /* Result.NORMAL_MATCH */ | 2 /* Result.PRIVATE_MATCH */
	                : 0 /* Result.NO_MATCH */;
	        }
	        index += packed[index] + 1;
	        // If we found a match, the longest match that is being tracked for this
	        // hostname. We need to remember which kind of match it was (exception,
	        // wildcard, normal rule), the index where the suffix starts in `hostname`
	        // as well as the number of labels contained in this suffix (this is
	        // important to make sure that we always keep the longest match if there
	        // are both a wildcard and a normal rule matching).
	        if (match !== 0 /* Result.NO_MATCH */) {
	            matchKind = match;
	            matchLabels = label + ((match & 16 /* Result.WILDCARD_MATCH */) !== 0 ? 2 : 1);
	            matchIndex = labelStart;
	        }
	    }
	    out.isIcann = (matchKind & 1 /* Result.ICANN_MATCH */) !== 0;
	    out.isPrivate = (matchKind & 2 /* Result.PRIVATE_MATCH */) !== 0;
	    // No match found
	    if (matchIndex === -1) {
	        out.publicSuffix =
	            numberOfHashes === 1 ? hostname : hostname.slice(BUFFER[1]);
	        return;
	    }
	    // If match is an exception, this means that we need to count less label.
	    // For example, exception rule !foo.com would yield suffix 'com', so we need
	    // to locate the next dot and slice from there.
	    if ((matchKind & 4 /* Result.EXCEPTION_MATCH */) !== 0) {
	        out.publicSuffix = hostname.slice(BUFFER[((matchLabels - 2) << 1) + 1]);
	        return;
	    }
	    // If match is a wildcard, we need to match one more label. If wildcard rule
	    // was *.com, we would have stored only 'com' in the packed structure and we
	    // need to take one extra label on the left.
	    if ((matchKind & 16 /* Result.WILDCARD_MATCH */) !== 0) {
	        if (matchLabels < numberOfHashes) {
	            out.publicSuffix = hostname.slice(BUFFER[((matchLabels - 1) << 1) + 1]);
	            return;
	        }
	        const parts = hostname.split('.');
	        while (parts.length > matchLabels) {
	            parts.shift();
	        }
	        out.publicSuffix = parts.join('.');
	        return;
	    }
	    // if ((matchKind & Result.NORMAL_MATCH) !== 0)
	    // For normal match, we just slice the hostname at the beginning of suffix.
	    out.publicSuffix = hostname.slice(matchIndex);
	}

	function parse$1(url, options = {}) {
	    return parseImpl(url, 5 /* FLAG.ALL */, suffixLookup, options, getEmptyResult());
	}

	function newNode() {
	    return {
	        chars: new Map(),
	        code: undefined,
	    };
	}
	function create(strings) {
	    const node = newNode();
	    for (let i = 0; i < strings.length; i += 1) {
	        const tok = strings[i];
	        let root = node;
	        for (let j = 0; j < tok.length; j += 1) {
	            const c = tok.charCodeAt(j);
	            let next = root.chars.get(c);
	            if (next === undefined) {
	                next = newNode();
	                root.chars.set(c, next);
	            }
	            root = next;
	        }
	        root.code = i;
	    }
	    return node;
	}

	const EMPTY_UINT8_ARRAY$1 = new Uint8Array(0);
	class SmazCompress {
	    constructor(codebook, maxSize = 30000) {
	        this.trie = create(codebook);
	        this.buffer = new Uint8Array(maxSize);
	        this.verbatim = new Uint8Array(255);
	    }
	    getCompressedSize(str) {
	        if (str.length === 0) {
	            return 0;
	        }
	        let bufferIndex = 0;
	        let verbatimIndex = 0;
	        let inputIndex = 0;
	        while (inputIndex < str.length) {
	            let indexAfterMatch = -1;
	            let code = -1;
	            let root = this.trie;
	            for (let j = inputIndex; j < str.length; j += 1) {
	                root = root.chars.get(str.charCodeAt(j));
	                if (root === undefined) {
	                    break;
	                }
	                if (root.code !== undefined) {
	                    code = root.code;
	                    indexAfterMatch = j + 1;
	                }
	            }
	            if (code === -1) {
	                verbatimIndex++;
	                inputIndex++;
	                if (verbatimIndex === 255) {
	                    bufferIndex += 2 + verbatimIndex;
	                    verbatimIndex = 0;
	                }
	            }
	            else {
	                if (verbatimIndex !== 0) {
	                    bufferIndex += 2 + (verbatimIndex === 1 ? 0 : verbatimIndex);
	                    verbatimIndex = 0;
	                }
	                bufferIndex++;
	                inputIndex = indexAfterMatch;
	            }
	        }
	        if (verbatimIndex !== 0) {
	            bufferIndex += 2 + (verbatimIndex === 1 ? 0 : verbatimIndex);
	        }
	        return bufferIndex;
	    }
	    compress(str) {
	        if (str.length === 0) {
	            return EMPTY_UINT8_ARRAY$1;
	        }
	        let bufferIndex = 0;
	        let verbatimIndex = 0;
	        let inputIndex = 0;
	        const len = str.length;
	        while (inputIndex < str.length) {
	            let indexAfterMatch = -1;
	            let code = -1;
	            let root = this.trie;
	            for (let j = inputIndex; j < len; j += 1) {
	                root = root.chars.get(str.charCodeAt(j));
	                if (root === undefined) {
	                    break;
	                }
	                if (root.code !== undefined) {
	                    code = root.code;
	                    indexAfterMatch = j + 1;
	                }
	            }
	            if (code === -1) {
	                this.verbatim[verbatimIndex++] = str.charCodeAt(inputIndex++);
	                if (verbatimIndex === 255) {
	                    bufferIndex = this.flushVerbatim(verbatimIndex, bufferIndex);
	                    verbatimIndex = 0;
	                }
	            }
	            else {
	                if (verbatimIndex !== 0) {
	                    bufferIndex = this.flushVerbatim(verbatimIndex, bufferIndex);
	                    verbatimIndex = 0;
	                }
	                this.buffer[bufferIndex++] = code;
	                inputIndex = indexAfterMatch;
	            }
	        }
	        if (verbatimIndex !== 0) {
	            bufferIndex = this.flushVerbatim(verbatimIndex, bufferIndex);
	        }
	        return this.buffer.slice(0, bufferIndex);
	    }
	    flushVerbatim(verbatimIndex, bufferIndex) {
	        if (verbatimIndex === 1) {
	            this.buffer[bufferIndex++] = 254;
	            this.buffer[bufferIndex++] = this.verbatim[0];
	        }
	        else {
	            this.buffer[bufferIndex++] = 255;
	            this.buffer[bufferIndex++] = verbatimIndex;
	            for (let k = 0; k < verbatimIndex; k += 1) {
	                this.buffer[bufferIndex++] = this.verbatim[k];
	            }
	        }
	        return bufferIndex;
	    }
	}

	class SmazDecompress {
	    constructor(codebook) {
	        this.codebook = codebook;
	    }
	    decompress(arr) {
	        if (arr.byteLength === 0) {
	            return '';
	        }
	        let output = '';
	        let i = 0;
	        while (i < arr.byteLength) {
	            if (arr[i] === 254) {
	                output += String.fromCharCode(arr[i + 1]);
	                i += 2;
	            }
	            else if (arr[i] === 255) {
	                const stop = i + arr[i + 1] + 2;
	                for (i += 2; i < stop; i += 1) {
	                    output += String.fromCharCode(arr[i]);
	                }
	            }
	            else {
	                output += this.codebook[arr[i]];
	                i += 1;
	            }
	        }
	        return output;
	    }
	}

	class Smaz {
	    constructor(codebook, maxSize = 30000) {
	        this.codebook = codebook;
	        this.compressor = new SmazCompress(codebook, maxSize);
	        this.decompressor = new SmazDecompress(codebook);
	    }
	    compress(str) {
	        return this.compressor.compress(str);
	    }
	    getCompressedSize(str) {
	        return this.compressor.getCompressedSize(str);
	    }
	    decompress(buffer) {
	        return this.decompressor.decompress(buffer);
	    }
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	/* eslint-disable prettier/prettier */
	var cosmeticSelectorCodebook = [
	    "%3D%3D%2527%252Cnecessary%3Atrue%252Cpreferences%3Afalse%252Cstatistics%3Afalse%252Cmarketing%3Afalse%252Cmethod%3A%2527explicit%2",
	    "div[style=\"position: absolute; inset: 0px; overflow: hidden; z-index: 160; background: transparent none repeat scroll 0% 0%; displ",
	    "div[style=\"position: fixed; display: block; width: 100%; height: 100%; inset: 0px; background-color: rgba(0, 0, 0, 0); z-index: 30",
	    "document.currentScript.textContent%3Ddocument.currentScript.textContent.replace(%2F%5C%2F%5C*start%5C*%5C%2F(.*)%5C%2F%5C*end%5C*%",
	    "acs, atob, %2FpopundersPerIP%5B%5Cs%5CS%5D*%3FDate%5B%5Cs%5CS%5D*%3FgetElementsByTagName%5B%5Cs%5CS%5D*%3FinsertBefore%2F",
	    "\"]:not([style^=\"width: 1px; height: 1px; position: absolute; left: -10000px; top: -\"])",
	    "acs, document.createElement, %2Fl%5C.parentNode%5C.insertBefore%5C(s%2F",
	    "%2Fvisit%2F%22%5D%5Btitle%5E%3D%22https%3A%2F%2F%22%5D, %5Btitle%5D",
	    "rmnt, script, %2Fh%3DdecodeURIComponent%7CpopundersPerIP%2F",
	    ":not([style^=\"position: absolute; left: -5000px\"])",
	    ", OptanonConsent, groups%3DC0001%253A1%252CC000",
	    "href-sanitizer, a%5Bhref%5E%3D%22https%3A%2F%2F",
	    "ra, oncontextmenu%7Condragstart%7Conselectstart",
	    ", OptanonAlertBoxClosed, %24currentDate%24",
	    "acs, document.querySelectorAll, popMagic",
	    "acs, addEventListener, google_ad_client",
	    "aost, String.prototype.charCodeAt, ai_",
	    "aopr, app_vars.force_disable_adblock",
	    "acs, document.addEventListener, ",
	    "acs, document.getElementById, ",
	    "no-fetch-if, googlesyndication",
	    "aopr, document.dispatchEvent",
	    "no-xhr-if, googlesyndication",
	    ", document.createElement, ",
	    "acs, String.fromCharCode, ",
	    "%2522%253Afalse%252C%2522",
	    ", document.oncontextmenu",
	    "aeld, DOMContentLoaded, ",
	    "nosiif, visibility, 1000",
	    "set-local-storage-item, ",
	    "trusted-click-element, ",
	    "set, blurred, false",
	    "acs, eval, replace",
	    "decodeURIComponent",
	    "[target=\"_blank\"]",
	    "%22%3Afalse%2C%22",
	    "^script:has-text(",
	    "[href^=\"https://",
	    "[href^=\"http://",
	    "[href=\"https://",
	    "[src^=\"https://",
	    "[data-testid=\"",
	    "modal-backdrop",
	    "rmnt, script, ",
	    "BlockDetected",
	    "trusted-set-",
	    ".prototype.",
	    "contextmenu",
	    "no-fetch-if",
	    "otification",
	    ":has-text(",
	    "background",
	    "[class*=\"",
	    "[class^=\"",
	    "body,html",
	    "container",
	    "Container",
	    "decodeURI",
	    "div[class",
	    "div[id^=\"",
	    "div[style",
	    "document.",
	    "no-xhr-if",
	    "ompliance",
	    "placehold",
	    "sbygoogle",
	    "[href*=\"",
	    "#wpsafe-",
	    "AAAAAAAA",
	    "Detector",
	    "disclaim",
	    "nano-sib",
	    "nextFunc",
	    "noopFunc",
	    "nostif, ",
	    "nowebrtc",
	    ".com/\"]",
	    "300x250",
	    "article",
	    "consent",
	    "Consent",
	    "content",
	    "display",
	    "keydown",
	    "message",
	    "Message",
	    "overlay",
	    "privacy",
	    "sidebar",
	    "sponsor",
	    "wrapper",
	    "[data-",
	    "728x90",
	    "accept",
	    "Accept",
	    "aopr, ",
	    "banner",
	    "bottom",
	    "cookie",
	    "Cookie",
	    "nosiif",
	    "notice",
	    "nowoif",
	    "policy",
	    "Policy",
	    "script",
	    "widget",
	    ":has(",
	    ":not(",
	    "block",
	    "Block",
	    "click",
	    "deskt",
	    "disab",
	    "fixed",
	    "frame",
	    "modal",
	    "popup",
	    "video",
	    "2%3A",
	    "aeld",
	    "body",
	    "butt",
	    "foot",
	    "gdpr",
	    "goog",
	    "html",
	    "icky",
	    "ight",
	    "show",
	    "tion",
	    "true",
	    " > ",
	    "%3D",
	    "%7C",
	    "age",
	    "box",
	    "div",
	    "dow",
	    "ent",
	    "out",
	    "rap",
	    "set",
	    "__",
	    ", ",
	    "\"]",
	    "%2",
	    "%5",
	    "=\"",
	    "00",
	    "ac",
	    "ad",
	    "Ad",
	    "al",
	    "an",
	    "ar",
	    "at",
	    "e-",
	    "ed",
	    "en",
	    "er",
	    "he",
	    "id",
	    "in",
	    "la",
	    "le",
	    "lo",
	    "od",
	    "ol",
	    "om",
	    "on",
	    "op",
	    "or",
	    "re",
	    "s_",
	    "s-",
	    "se",
	    "st",
	    "t-",
	    "te",
	    "ti",
	    "un",
	    " ",
	    "_",
	    "-",
	    ";",
	    ":",
	    ".",
	    "(",
	    ")",
	    "[",
	    "]",
	    "*",
	    "/",
	    "#",
	    "^",
	    "0",
	    "1",
	    "2",
	    "3",
	    "4",
	    "5",
	    "6",
	    "7",
	    "8",
	    "9",
	    "b",
	    "B",
	    "c",
	    "C",
	    "d",
	    "D",
	    "e",
	    "E",
	    "f",
	    "F",
	    "g",
	    "G",
	    "h",
	    "H",
	    "I",
	    "j",
	    "J",
	    "k",
	    "K",
	    "l",
	    "L",
	    "m",
	    "M",
	    "n",
	    "N",
	    "o",
	    "O",
	    "p",
	    "P",
	    "q",
	    "Q",
	    "r",
	    "R",
	    "s",
	    "S",
	    "t",
	    "T",
	    "u",
	    "U",
	    "v",
	    "V",
	    "w",
	    "W",
	    "x",
	    "y",
	    "Y",
	    "z",
	    "Z"
	];

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	/* eslint-disable prettier/prettier */
	var networkCSPCodebook = [
	    "sandbox allow-forms allow-same-origin allow-scripts allow-modals allow-orientation-lock allow-pointer-lock allow-presentation allow-top-navigation",
	    "script-src 'self' 'unsafe-inline' 'unsafe-eval' ",
	    " *.google.com *.gstatic.com *.googleapis.com",
	    ".com *.google.com *.googletagmanager.com *.",
	    "script-src 'self' '*' 'unsafe-inline'",
	    "default-src 'unsafe-inline' 'self'",
	    "script-src 'self' 'unsafe-eval' ",
	    " *.google.com *.gstatic.com *.",
	    "t-src 'self' 'unsafe-inline' ",
	    "script-src * 'unsafe-inline'",
	    ".com *.googleapis.com *.",
	    " *.googletagmanager.com",
	    ".com *.bootstrapcdn.com",
	    "default-src 'self' *.",
	    "frame-src 'self' *",
	    " *.cloudflare.com",
	    "child-src 'none';",
	    "worker-src 'none'",
	    "google-analytics",
	    "'unsafe-inline'",
	    "*.googleapis",
	    "connect-src ",
	    "child-src *",
	    " *.gstatic",
	    "script-src",
	    "style-src ",
	    "frame-src",
	    "facebook",
	    "https://",
	    " 'self'",
	    ".com *.",
	    ".net *.",
	    "addthis",
	    "captcha",
	    "gstatic",
	    "https: ",
	    "youtube",
	    "defaul",
	    "disqus",
	    "google",
	    "jquery",
	    "blob:",
	    "data:",
	    "http:",
	    "media",
	    "scrip",
	    "-src",
	    ".com",
	    ".net",
	    "n.cc",
	    " *.",
	    "age",
	    "img",
	    "str",
	    "vic",
	    " *",
	    "*.",
	    "bo",
	    "cd",
	    "ch",
	    "el",
	    "le",
	    "m:",
	    "ns",
	    "pi",
	    "ra",
	    "re",
	    "te",
	    "wi",
	    "wp",
	    "yt",
	    " ",
	    "-",
	    ";",
	    ":",
	    ".",
	    "'",
	    "*",
	    "/",
	    "3",
	    "a",
	    "b",
	    "c",
	    "d",
	    "e",
	    "f",
	    "g",
	    "h",
	    "i",
	    "j",
	    "k",
	    "l",
	    "m",
	    "n",
	    "o",
	    "p",
	    "q",
	    "r",
	    "s",
	    "t",
	    "u",
	    "v",
	    "w",
	    "x",
	    "y"
	];

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	/* eslint-disable prettier/prettier */
	var networkFilterCodebook = [
	    "/homad-global-configs.schneevonmorgen.com/global_config",
	    "/videojs-vast-vpaid@2.0.2/bin/videojs_5.vast.vpaid.min",
	    "/etc.clientlibs/logitech-common/clientlibs/onetrust.",
	    "[\\/]{1,}.*[a-zA-Z0-9]{3,7}\\/[a-zA-Z0-9]{6,}\\/.*/",
	    "/^https?:\\/\\/[-a-z]{8,15}\\.(?:com|net)\\/",
	    "/pagead/managed/js/gpt/*/pubads_impl",
	    "/pagead/js/adsbygoogle.js",
	    "/vans-adapter-google-ima",
	    "/js/sdkloader/ima3_dai",
	    "/js/sdkloader/ima3.js",
	    "/videojs-contrib-ads",
	    "/wp-content/plugins/",
	    "/wp-content/uploads/",
	    "/wp-content/themes/",
	    "/detroitchicago/",
	    "/appmeasurement",
	    "/413gkwmt/init",
	    "/cdn-cgi/trace",
	    "/^https?:\\/\\/",
	    "[a-zA-Z0-9]{",
	    "/^https:\\/\\/",
	    "notification",
	    "\\/[a-z0-9]{",
	    "fingerprint",
	    "/ljub4etb/",
	    "compliance",
	    "impression",
	    "/plugins/",
	    "/template",
	    "affiliate",
	    "analytics",
	    "telemetry",
	    "(.+?\\.)?",
	    "[0-9a-z]",
	    "/assets/",
	    "/images/",
	    "/pagead/",
	    "tracking",
	    "/public",
	    "300x250",
	    "collect",
	    "consent",
	    "content",
	    "counter",
	    "default",
	    "metrics",
	    "privacy",
	    "[a-z]{",
	    "728x90",
	    "banner",
	    "bundle",
	    "client",
	    "cookie",
	    "detect",
	    "dn-cgi",
	    "google",
	    "iframe",
	    "module",
	    "prebid",
	    "script",
	    "source",
	    "widget",
	    ".aspx",
	    ".cgi?",
	    ".com/",
	    ".html",
	    "/api/",
	    "/beac",
	    "/html",
	    "/img/",
	    "/java",
	    "/stat",
	    "block",
	    "click",
	    "count",
	    "event",
	    "manag",
	    "media",
	    "pixel",
	    "popup",
	    "track",
	    "type=",
	    "video",
	    "visit",
	    ".css",
	    ".gif",
	    ".jpg",
	    ".min",
	    ".php",
	    ".png",
	    "/jqu",
	    "/js/",
	    "/lib",
	    "/log",
	    "/web",
	    "/wp-",
	    "468x",
	    "data",
	    "gdpr",
	    "gi-b",
	    "http",
	    "ight",
	    "plug",
	    "show",
	    "stat",
	    "view",
	    ".js",
	    "/ad",
	    "=*&",
	    "age",
	    "gpt",
	    "id=",
	    "jax",
	    "key",
	    "lay",
	    "log",
	    "new",
	    "sdk",
	    "tag",
	    "web",
	    "ync",
	    "*/",
	    "*^",
	    "/_",
	    "/?",
	    "/*",
	    "/d",
	    "/f",
	    "/g",
	    "/h",
	    "/l",
	    "/n",
	    "/p",
	    "/r",
	    "/w",
	    "^*",
	    "00",
	    "1/",
	    "ac",
	    "ad",
	    "al",
	    "am",
	    "an",
	    "ap",
	    "ar",
	    "as",
	    "at",
	    "bo",
	    "ch",
	    "ck",
	    "de",
	    "e-",
	    "e/",
	    "ed",
	    "el",
	    "em",
	    "en",
	    "er",
	    "es",
	    "et",
	    "ex",
	    "g/",
	    "ic",
	    "id",
	    "ig",
	    "il",
	    "im",
	    "in",
	    "is",
	    "it",
	    "js",
	    "la",
	    "le",
	    "li",
	    "lo",
	    "ma",
	    "mp",
	    "o/",
	    "ol",
	    "om",
	    "on",
	    "op",
	    "or",
	    "ot",
	    "re",
	    "ro",
	    "s_",
	    "s-",
	    "s?",
	    "s/",
	    "si",
	    "sp",
	    "st",
	    "t/",
	    "te",
	    "ti",
	    "tm",
	    "tr",
	    "ub",
	    "um",
	    "un",
	    "up",
	    "ur",
	    "us",
	    "ut",
	    "ve",
	    "_",
	    "-",
	    ":",
	    "?",
	    ".",
	    "}",
	    "*",
	    "/",
	    "\\",
	    "&",
	    "^",
	    "=",
	    "0",
	    "1",
	    "2",
	    "3",
	    "4",
	    "5",
	    "6",
	    "7",
	    "8",
	    "9",
	    "a",
	    "b",
	    "c",
	    "d",
	    "e",
	    "f",
	    "g",
	    "h",
	    "i",
	    "j",
	    "k",
	    "l",
	    "m",
	    "n",
	    "o",
	    "p",
	    "q",
	    "r",
	    "s",
	    "t",
	    "u",
	    "v",
	    "w",
	    "x",
	    "y",
	    "z"
	];

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	/* eslint-disable prettier/prettier */
	var networkHostnameCodebook = [
	    "securepubads.g.doubleclick",
	    ".actonservice.com",
	    "googlesyndication",
	    "imasdk.googleapis",
	    ".cloudfront.net",
	    "analytics.",
	    "marketing.",
	    "tracking.",
	    "metrics.",
	    "images.",
	    ".co.uk",
	    "a8clk.",
	    "stats.",
	    "a8cv.",
	    "media",
	    "track",
	    ".com",
	    ".net",
	    ".top",
	    ".xyz",
	    "ight",
	    "tion",
	    "www.",
	    ".io",
	    ".jp",
	    "app",
	    "cdn",
	    "new",
	    "web",
	    ".b",
	    ".c",
	    ".d",
	    ".f",
	    ".h",
	    ".k",
	    ".m",
	    ".n",
	    ".p",
	    ".s",
	    ".t",
	    ".v",
	    ".w",
	    "a1",
	    "a2",
	    "a4",
	    "ab",
	    "ac",
	    "ad",
	    "af",
	    "ag",
	    "ah",
	    "ai",
	    "ak",
	    "al",
	    "am",
	    "an",
	    "ap",
	    "ar",
	    "as",
	    "at",
	    "au",
	    "av",
	    "aw",
	    "ax",
	    "ay",
	    "az",
	    "be",
	    "bl",
	    "bo",
	    "br",
	    "bu",
	    "ca",
	    "ce",
	    "ch",
	    "ci",
	    "ck",
	    "cl",
	    "cr",
	    "ct",
	    "cu",
	    "de",
	    "di",
	    "do",
	    "dr",
	    "ds",
	    "dy",
	    "e-",
	    "eb",
	    "ec",
	    "ed",
	    "ef",
	    "eg",
	    "el",
	    "em",
	    "en",
	    "ep",
	    "er",
	    "es",
	    "et",
	    "eu",
	    "ev",
	    "ew",
	    "ex",
	    "fe",
	    "fi",
	    "fl",
	    "fo",
	    "fr",
	    "ge",
	    "gh",
	    "gl",
	    "go",
	    "gr",
	    "gs",
	    "gu",
	    "he",
	    "ho",
	    "ia",
	    "ib",
	    "ic",
	    "id",
	    "ie",
	    "if",
	    "ig",
	    "ik",
	    "il",
	    "im",
	    "in",
	    "io",
	    "ip",
	    "ir",
	    "is",
	    "it",
	    "iv",
	    "ix",
	    "iz",
	    "jo",
	    "ke",
	    "ks",
	    "la",
	    "ld",
	    "le",
	    "li",
	    "ll",
	    "lo",
	    "lu",
	    "ly",
	    "ma",
	    "me",
	    "mo",
	    "mp",
	    "my",
	    "ne",
	    "no",
	    "ob",
	    "od",
	    "of",
	    "ok",
	    "ol",
	    "om",
	    "on",
	    "oo",
	    "op",
	    "or",
	    "ot",
	    "ou",
	    "ov",
	    "ow",
	    "pa",
	    "pe",
	    "ph",
	    "pl",
	    "po",
	    "pr",
	    "pu",
	    "qu",
	    "re",
	    "ro",
	    "ru",
	    "s-",
	    "sc",
	    "se",
	    "sh",
	    "si",
	    "sk",
	    "so",
	    "sp",
	    "ss",
	    "st",
	    "su",
	    "sw",
	    "sy",
	    "t-",
	    "ta",
	    "te",
	    "th",
	    "ti",
	    "tn",
	    "to",
	    "tr",
	    "ts",
	    "tu",
	    "tw",
	    "ty",
	    "ub",
	    "ud",
	    "ul",
	    "um",
	    "un",
	    "up",
	    "ur",
	    "us",
	    "ut",
	    "ve",
	    "vi",
	    "we",
	    "-",
	    ".",
	    "0",
	    "1",
	    "2",
	    "3",
	    "4",
	    "5",
	    "6",
	    "7",
	    "8",
	    "9",
	    "a",
	    "b",
	    "c",
	    "d",
	    "e",
	    "f",
	    "g",
	    "h",
	    "i",
	    "j",
	    "k",
	    "l",
	    "m",
	    "n",
	    "o",
	    "p",
	    "q",
	    "r",
	    "s",
	    "t",
	    "u",
	    "v",
	    "w",
	    "x",
	    "y",
	    "z"
	];

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	/* eslint-disable prettier/prettier */
	var networkRedirectCodebook = [
	    "google-analytics.com/analytics.js",
	    "googlesyndication_adsbygoogle.js",
	    "googletagmanager.com/gtm.js",
	    "googletagservices_gpt.js",
	    "googletagmanager_gtm.js",
	    "fuckadblock.js-3.2.0",
	    "amazon_apstag.js",
	    "google-analytics",
	    "fingerprint2.js",
	    "noop-1s.mp4:10",
	    "google-ima.js",
	    "noop-0.1s.mp3",
	    "prebid-ads.js",
	    "nobab2.js:10",
	    "noopmp3-0.1s",
	    "noop-1s.mp4",
	    "hd-main.js",
	    "noopmp4-1s",
	    "32x32.png",
	    "noop.html",
	    "noopframe",
	    "noop.txt",
	    "nooptext",
	    "1x1.gif",
	    "2x2.png",
	    "noop.js",
	    "noopjs",
	    ".com/",
	    ".js:5",
	    "noop",
	    ":10",
	    ".js",
	    "ads",
	    "bea",
	    "_a",
	    ":5",
	    "am",
	    "ar",
	    "ch",
	    "ic",
	    "in",
	    "le",
	    "on",
	    "re",
	    "st",
	    "_",
	    "-",
	    ":",
	    ".",
	    "/",
	    "0",
	    "1",
	    "2",
	    "3",
	    "4",
	    "5",
	    "a",
	    "b",
	    "c",
	    "d",
	    "e",
	    "f",
	    "g",
	    "h",
	    "i",
	    "j",
	    "k",
	    "l",
	    "m",
	    "n",
	    "o",
	    "p",
	    "r",
	    "s",
	    "t",
	    "u",
	    "v",
	    "w",
	    "x",
	    "y",
	    "z"
	];

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	/* eslint-disable prettier/prettier */
	var networkRawCodebook = [
	    "/js/sdkloader/ima3.j",
	    ".com^$third-party",
	    "googlesyndication",
	    "imasdk.googleapis",
	    ".cloudfront.net^",
	    "$script,domain=",
	    "redirect-rule=",
	    "xmlhttprequest",
	    ".actonservice",
	    "^$third-party",
	    "3p,denyallow=",
	    "redirect=noop",
	    "||smetrics.",
	    "third-party",
	    "marketing.",
	    "analytics",
	    ",domain=",
	    "$script,",
	    "metrics.",
	    "tracking",
	    ".co.uk",
	    "$ghide",
	    "a8clk.",
	    "cookie",
	    "google",
	    "script",
	    ".com^",
	    ".top^",
	    ".xyz^",
	    "/wp-c",
	    "$doma",
	    "a8cv.",
	    "image",
	    "media",
	    "track",
	    ".au^",
	    ".com",
	    ".gif",
	    ".jp^",
	    ".net",
	    "/js/",
	    "$doc",
	    "$xhr",
	    "www.",
	    ".jp",
	    ".js",
	    "app",
	    "cdn",
	    "new",
	    "web",
	    ".b",
	    ".c",
	    ".f",
	    ".m",
	    ".n",
	    ".p",
	    ".s",
	    "@@",
	    "/*",
	    "/p",
	    "||",
	    "1p",
	    "a1",
	    "a2",
	    "ab",
	    "ac",
	    "ad",
	    "af",
	    "ag",
	    "ai",
	    "ak",
	    "al",
	    "am",
	    "an",
	    "ap",
	    "ar",
	    "as",
	    "at",
	    "au",
	    "av",
	    "aw",
	    "ax",
	    "ay",
	    "az",
	    "be",
	    "bo",
	    "br",
	    "ca",
	    "ce",
	    "ch",
	    "ck",
	    "cl",
	    "ct",
	    "de",
	    "di",
	    "do",
	    "e-",
	    "e^",
	    "eb",
	    "ec",
	    "ed",
	    "el",
	    "em",
	    "en",
	    "ep",
	    "er",
	    "es",
	    "et",
	    "ev",
	    "ew",
	    "ex",
	    "fe",
	    "ff",
	    "fi",
	    "fo",
	    "fr",
	    "g^",
	    "ge",
	    "gi",
	    "go",
	    "gr",
	    "gu",
	    "he",
	    "hi",
	    "ho",
	    "hp",
	    "ht",
	    "ic",
	    "id",
	    "ig",
	    "il",
	    "im",
	    "in",
	    "io",
	    "ip",
	    "ir",
	    "is",
	    "it",
	    "ix",
	    "iz",
	    "jo",
	    "js",
	    "ke",
	    "ld",
	    "le",
	    "li",
	    "lo",
	    "lu",
	    "ly",
	    "ma",
	    "me",
	    "mo",
	    "mp",
	    "my",
	    "no",
	    "od",
	    "ok",
	    "ol",
	    "om",
	    "on",
	    "op",
	    "or",
	    "ot",
	    "pl",
	    "po",
	    "pr",
	    "qu",
	    "re",
	    "ri",
	    "ro",
	    "ru",
	    "s-",
	    "s/",
	    "sc",
	    "se",
	    "sh",
	    "si",
	    "sk",
	    "so",
	    "sp",
	    "ss",
	    "st",
	    "su",
	    "sw",
	    "t-",
	    "te",
	    "th",
	    "ti",
	    "to",
	    "tr",
	    "ts",
	    "tv",
	    "ty",
	    "ub",
	    "ud",
	    "ul",
	    "um",
	    "un",
	    "up",
	    "ur",
	    "us",
	    "ut",
	    "ve",
	    "vi",
	    "we",
	    "yo",
	    "_",
	    "-",
	    ",",
	    "?",
	    ".",
	    "*",
	    "/",
	    "^",
	    "=",
	    "|",
	    "~",
	    "$",
	    "0",
	    "1",
	    "2",
	    "3",
	    "4",
	    "5",
	    "6",
	    "7",
	    "8",
	    "9",
	    "a",
	    "b",
	    "c",
	    "d",
	    "e",
	    "f",
	    "g",
	    "h",
	    "i",
	    "j",
	    "k",
	    "l",
	    "m",
	    "n",
	    "o",
	    "p",
	    "q",
	    "r",
	    "s",
	    "t",
	    "u",
	    "v",
	    "w",
	    "x",
	    "y",
	    "z"
	];

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	/* eslint-disable prettier/prettier */
	var cosmeticRawCodebook = [
	    "-webkit-touch-callo",
	    ", googlesyndication",
	    "position: initial !",
	    "set-local-storage-i",
	    "set, blurred, false",
	    "user-select: text !",
	    "decodeURIComponent",
	    "[href^=\"https://",
	    "rmnt, script, ",
	    "ut: default !",
	    " !important)",
	    "trusted-set-",
	    ", document.",
	    ", noopFunc)",
	    "##body,html",
	    "contextmenu",
	    "no-fetch-if",
	    "otification",
	    ":has-text(",
	    ".com##+js(",
	    "=\"https://",
	    "background",
	    "important;",
	    " -webkit-",
	    "container",
	    ": auto !",
	    "AAAAAAAA",
	    "nostif, ",
	    ",google",
	    ":style(",
	    "consent",
	    "message",
	    "nowoif)",
	    "privacy",
	    "-wrapp",
	    ",kayak",
	    ".co.uk",
	    "[class",
	    "##+js(",
	    "accept",
	    "aopr, ",
	    "banner",
	    "bottom",
	    "cookie",
	    "Cookie",
	    "notice",
	    "policy",
	    "widget",
	    ":has(",
	    "##div",
	    "block",
	    "cript",
	    "true)",
	    ".co.",
	    ".com",
	    ".de,",
	    ".fr,",
	    ".net",
	    ".nl,",
	    ".pl,",
	    ".xyz",
	    "#@#.",
	    "2%3A",
	    "gdpr",
	    "goog",
	    "html",
	    "ight",
	    "news",
	    "wrap",
	    " > ",
	    ",xh",
	    "##.",
	    "###",
	    "%3D",
	    "%7C",
	    "ent",
	    "lay",
	    "web",
	    "xxx",
	    "__",
	    "-s",
	    ", ",
	    ",b",
	    ",c",
	    ",f",
	    ",g",
	    ",h",
	    ",m",
	    ",p",
	    ",s",
	    ",t",
	    ": ",
	    ".*",
	    ".b",
	    ".c",
	    ".m",
	    ".p",
	    ".s",
	    "\"]",
	    "##",
	    "%2",
	    "%5",
	    "=\"",
	    "00",
	    "a-",
	    "ab",
	    "ac",
	    "ad",
	    "Ad",
	    "af",
	    "ag",
	    "ak",
	    "al",
	    "am",
	    "an",
	    "ap",
	    "ar",
	    "as",
	    "at",
	    "au",
	    "av",
	    "ay",
	    "az",
	    "bo",
	    "ch",
	    "ck",
	    "cl",
	    "ct",
	    "de",
	    "di",
	    "do",
	    "e-",
	    "ed",
	    "el",
	    "em",
	    "en",
	    "er",
	    "es",
	    "et",
	    "ew",
	    "ex",
	    "fi",
	    "fo",
	    "gr",
	    "he",
	    "ic",
	    "id",
	    "if",
	    "ig",
	    "il",
	    "im",
	    "in",
	    "is",
	    "it",
	    "iv",
	    "le",
	    "lo",
	    "mo",
	    "ol",
	    "om",
	    "on",
	    "op",
	    "or",
	    "ot",
	    "ov",
	    "ow",
	    "pl",
	    "po",
	    "re",
	    "ro",
	    "s_",
	    "s-",
	    "se",
	    "sh",
	    "si",
	    "sp",
	    "st",
	    "t-",
	    "th",
	    "ti",
	    "tr",
	    "tv",
	    "ub",
	    "ul",
	    "um",
	    "un",
	    "up",
	    "ur",
	    "us",
	    "ut",
	    "vi",
	    " ",
	    "_",
	    "-",
	    ",",
	    ";",
	    ":",
	    ".",
	    "(",
	    ")",
	    "[",
	    "*",
	    "/",
	    "^",
	    "0",
	    "1",
	    "2",
	    "3",
	    "4",
	    "5",
	    "6",
	    "7",
	    "8",
	    "9",
	    "a",
	    "b",
	    "B",
	    "c",
	    "C",
	    "d",
	    "D",
	    "e",
	    "E",
	    "f",
	    "F",
	    "g",
	    "h",
	    "i",
	    "I",
	    "j",
	    "k",
	    "l",
	    "L",
	    "m",
	    "M",
	    "n",
	    "N",
	    "o",
	    "O",
	    "p",
	    "P",
	    "q",
	    "r",
	    "R",
	    "s",
	    "S",
	    "t",
	    "T",
	    "u",
	    "v",
	    "w",
	    "x",
	    "y",
	    "z"
	];

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	class Compression {
	    constructor() {
	        this.cosmeticSelector = new Smaz(cosmeticSelectorCodebook);
	        this.networkCSP = new Smaz(networkCSPCodebook);
	        this.networkRedirect = new Smaz(networkRedirectCodebook);
	        this.networkHostname = new Smaz(networkHostnameCodebook);
	        this.networkFilter = new Smaz(networkFilterCodebook);
	        this.networkRaw = new Smaz(networkRawCodebook);
	        this.cosmeticRaw = new Smaz(cosmeticRawCodebook);
	    }
	}

	/* crc32.js (C) 2014-present SheetJS -- http://sheetjs.com */
	/* From: https://github.com/SheetJS/js-crc32/ */
	const T = (() => {
	    let c = 0;
	    const table = new Int32Array(256);
	    for (let n = 0; n !== 256; n += 1) {
	        c = n;
	        c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
	        c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
	        c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
	        c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
	        c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
	        c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
	        c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
	        c = c & 1 ? -306674912 ^ (c >>> 1) : c >>> 1;
	        table[n] = c;
	    }
	    return table;
	})();
	function crc32(buf, start, end) {
	    let C = 0 ^ -1;
	    const L = end - 7;
	    let i = start;
	    while (i < L) {
	        C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xff];
	        C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xff];
	        C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xff];
	        C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xff];
	        C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xff];
	        C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xff];
	        C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xff];
	        C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xff];
	    }
	    while (i < L + 7) {
	        C = (C >>> 8) ^ T[(C ^ buf[i++]) & 0xff];
	    }
	    return (C ^ -1) >>> 0;
	}

	/*!
	 * Copyright Mathias Bynens <https://mathiasbynens.be/>
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining
	 * a copy of this software and associated documentation files (the
	 * "Software"), to deal in the Software without restriction, including
	 * without limitation the rights to use, copy, modify, merge, publish,
	 * distribute, sublicense, and/or sell copies of the Software, and to
	 * permit persons to whom the Software is furnished to do so, subject to
	 * the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be
	 * included in all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
	 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
	 * MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
	 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
	 * LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
	 * OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
	 * WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
	 */
	/** Highest positive signed 32-bit float value */
	const maxInt = 2147483647; // aka. 0x7FFFFFFF or 2^31-1
	/** Bootstring parameters */
	const base = 36;
	const tMin = 1;
	const tMax = 26;
	const skew = 38;
	const damp = 700;
	const initialBias = 72;
	const initialN = 128; // 0x80
	const delimiter = '-'; // '\x2D'
	/** Regular expressions */
	const regexNonASCII = /[^\0-\x7E]/; // non-ASCII chars
	const regexSeparators = /[\x2E\u3002\uFF0E\uFF61]/g; // RFC 3490 separators
	const errors = {
	    'invalid-input': 'Invalid input',
	    'not-basic': 'Illegal input >= 0x80 (not a basic code point)',
	    'overflow': 'Overflow: input needs wider integers to process',
	};
	/** Convenience shortcuts */
	const baseMinusTMin = base - tMin;
	/*--------------------------------------------------------------------------*/
	/**
	 * A generic error utility function.
	 * @private
	 * @param {String} type The error type.
	 * @returns {Error} Throws a `RangeError` with the applicable error message.
	 */
	function error(type) {
	    throw new RangeError(errors[type]);
	}
	/**
	 * Creates an array containing the numeric code points of each Unicode
	 * character in the string. While JavaScript uses UCS-2 internally,
	 * this function will convert a pair of surrogate halves (each of which
	 * UCS-2 exposes as separate characters) into a single code point,
	 * matching UTF-16.
	 * @see `punycode.ucs2.encode`
	 * @see <https://mathiasbynens.be/notes/javascript-encoding>
	 * @memberOf punycode.ucs2
	 * @name decode
	 * @param {String} string The Unicode input string (UCS-2).
	 * @returns {Array} The new array of code points.
	 */
	function ucs2decode(str) {
	    const output = [];
	    let counter = 0;
	    const length = str.length;
	    while (counter < length) {
	        const value = str.charCodeAt(counter++);
	        if (value >= 0xd800 && value <= 0xdbff && counter < length) {
	            // It's a high surrogate, and there is a next character.
	            const extra = str.charCodeAt(counter++);
	            if ((extra & 0xfc00) === 0xdc00) {
	                // Low surrogate.
	                output.push(((value & 0x3ff) << 10) + (extra & 0x3ff) + 0x10000);
	            }
	            else {
	                // It's an unmatched surrogate; only append this code unit, in case the
	                // next code unit is the high surrogate of a surrogate pair.
	                output.push(value);
	                counter--;
	            }
	        }
	        else {
	            output.push(value);
	        }
	    }
	    return output;
	}
	/**
	 * Converts a basic code point into a digit/integer.
	 * @see `digitToBasic()`
	 * @private
	 * @param {Number} codePoint The basic numeric code point value.
	 * @returns {Number} The numeric value of a basic code point (for use in
	 * representing integers) in the range `0` to `base - 1`, or `base` if
	 * the code point does not represent a value.
	 */
	function basicToDigit(codePoint) {
	    if (codePoint - 0x30 < 0x0a) {
	        return codePoint - 0x16;
	    }
	    if (codePoint - 0x41 < 0x1a) {
	        return codePoint - 0x41;
	    }
	    if (codePoint - 0x61 < 0x1a) {
	        return codePoint - 0x61;
	    }
	    return base;
	}
	/**
	 * Converts a digit/integer into a basic code point.
	 * @see `basicToDigit()`
	 * @private
	 * @param {Number} digit The numeric value of a basic code point.
	 * @returns {Number} The basic code point whose value (when used for
	 * representing integers) is `digit`, which needs to be in the range
	 * `0` to `base - 1`. If `flag` is non-zero, the uppercase form is
	 * used; else, the lowercase form is used. The behavior is undefined
	 * if `flag` is non-zero and `digit` has no uppercase form.
	 */
	function digitToBasic(digit, flag) {
	    //  0..25 map to ASCII a..z or A..Z
	    // 26..35 map to ASCII 0..9
	    return digit + 22 + 75 * (digit < 26 ? 1 : 0) - ((0) << 5);
	}
	/**
	 * Bias adaptation function as per section 3.4 of RFC 3492.
	 * https://tools.ietf.org/html/rfc3492#section-3.4
	 * @private
	 */
	function adapt(delta, numPoints, firstTime) {
	    let k = 0;
	    delta = firstTime ? Math.floor(delta / damp) : delta >> 1;
	    delta += Math.floor(delta / numPoints);
	    for (; /* no initialization */ delta > (baseMinusTMin * tMax) >> 1; k += base) {
	        delta = Math.floor(delta / baseMinusTMin);
	    }
	    return Math.floor(k + ((baseMinusTMin + 1) * delta) / (delta + skew));
	}
	/**
	 * Converts a Punycode string of ASCII-only symbols to a string of Unicode
	 * symbols.
	 * @memberOf punycode
	 * @param {String} input The Punycode string of ASCII-only symbols.
	 * @returns {String} The resulting string of Unicode symbols.
	 */
	function decode(input) {
	    // Don't use UCS-2.
	    const output = [];
	    const inputLength = input.length;
	    let i = 0;
	    let n = initialN;
	    let bias = initialBias;
	    // Handle the basic code points: let `basic` be the number of input code
	    // points before the last delimiter, or `0` if there is none, then copy
	    // the first basic code points to the output.
	    let basic = input.lastIndexOf(delimiter);
	    if (basic < 0) {
	        basic = 0;
	    }
	    for (let j = 0; j < basic; ++j) {
	        // if it's not a basic code point
	        if (input.charCodeAt(j) >= 0x80) {
	            error('not-basic');
	        }
	        output.push(input.charCodeAt(j));
	    }
	    // Main decoding loop: start just after the last delimiter if any basic code
	    // points were copied; start at the beginning otherwise.
	    for (let index = basic > 0 ? basic + 1 : 0; index < inputLength /* no final expression */;) {
	        // `index` is the index of the next character to be consumed.
	        // Decode a generalized variable-length integer into `delta`,
	        // which gets added to `i`. The overflow checking is easier
	        // if we increase `i` as we go, then subtract off its starting
	        // value at the end to obtain `delta`.
	        const oldi = i;
	        for (let w = 1, k = base /* no condition */;; k += base) {
	            if (index >= inputLength) {
	                error('invalid-input');
	            }
	            const digit = basicToDigit(input.charCodeAt(index++));
	            if (digit >= base || digit > Math.floor((maxInt - i) / w)) {
	                error('overflow');
	            }
	            i += digit * w;
	            const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
	            if (digit < t) {
	                break;
	            }
	            const baseMinusT = base - t;
	            if (w > Math.floor(maxInt / baseMinusT)) {
	                error('overflow');
	            }
	            w *= baseMinusT;
	        }
	        const out = output.length + 1;
	        bias = adapt(i - oldi, out, oldi === 0);
	        // `i` was supposed to wrap around from `out` to `0`,
	        // incrementing `n` each time, so we'll fix that now:
	        if (Math.floor(i / out) > maxInt - n) {
	            error('overflow');
	        }
	        n += Math.floor(i / out);
	        i %= out;
	        // Insert `n` at position `i` of the output.
	        output.splice(i++, 0, n);
	    }
	    return String.fromCodePoint.apply(null, output);
	}
	/**
	 * Converts a string of Unicode symbols (e.g. a domain name label) to a
	 * Punycode string of ASCII-only symbols.
	 * @memberOf punycode
	 * @param {String} input The string of Unicode symbols.
	 * @returns {String} The resulting Punycode string of ASCII-only symbols.
	 */
	function encode(str) {
	    const output = [];
	    // Convert the input in UCS-2 to an array of Unicode code points.
	    const input = ucs2decode(str);
	    // Cache the length.
	    const inputLength = input.length;
	    // Initialize the state.
	    let n = initialN;
	    let delta = 0;
	    let bias = initialBias;
	    // Handle the basic code points.
	    for (let i = 0; i < input.length; i += 1) {
	        const currentValue = input[i];
	        if (currentValue < 0x80) {
	            output.push(String.fromCharCode(currentValue));
	        }
	    }
	    const basicLength = output.length;
	    let handledCPCount = basicLength;
	    // `handledCPCount` is the number of code points that have been handled;
	    // `basicLength` is the number of basic code points.
	    // Finish the basic string with a delimiter unless it's empty.
	    if (basicLength) {
	        output.push(delimiter);
	    }
	    // Main encoding loop:
	    while (handledCPCount < inputLength) {
	        // All non-basic code points < n have been handled already. Find the next
	        // larger one:
	        let m = maxInt;
	        for (let i = 0; i < input.length; i += 1) {
	            const currentValue = input[i];
	            if (currentValue >= n && currentValue < m) {
	                m = currentValue;
	            }
	        }
	        // Increase `delta` enough to advance the decoder's <n,i> state to <m,0>,
	        // but guard against overflow.
	        const handledCPCountPlusOne = handledCPCount + 1;
	        if (m - n > Math.floor((maxInt - delta) / handledCPCountPlusOne)) {
	            error('overflow');
	        }
	        delta += (m - n) * handledCPCountPlusOne;
	        n = m;
	        for (let i = 0; i < input.length; i += 1) {
	            const currentValue = input[i];
	            if (currentValue < n && ++delta > maxInt) {
	                error('overflow');
	            }
	            if (currentValue === n) {
	                // Represent delta as a generalized variable-length integer.
	                let q = delta;
	                for (let k = base /* no condition */;; k += base) {
	                    const t = k <= bias ? tMin : k >= bias + tMax ? tMax : k - bias;
	                    if (q < t) {
	                        break;
	                    }
	                    const qMinusT = q - t;
	                    const baseMinusT = base - t;
	                    output.push(String.fromCharCode(digitToBasic(t + (qMinusT % baseMinusT))));
	                    q = Math.floor(qMinusT / baseMinusT);
	                }
	                output.push(String.fromCharCode(digitToBasic(q)));
	                bias = adapt(delta, handledCPCountPlusOne, handledCPCount === basicLength);
	                delta = 0;
	                ++handledCPCount;
	            }
	        }
	        ++delta;
	        ++n;
	    }
	    return output.join('');
	}
	/**
	 * Converts a Unicode string representing a domain name or an email address to
	 * Punycode. Only the non-ASCII parts of the domain name will be converted,
	 * i.e. it doesn't matter if you call it with a domain that's already in
	 * ASCII.
	 * @memberOf punycode
	 * @param {String} input The domain name or email address to convert, as a
	 * Unicode string.
	 * @returns {String} The Punycode representation of the given domain name or
	 * email address.
	 */
	function toASCII(input) {
	    // Avoid `split(regex)` for IE8 compatibility. See #17.
	    const labels = input.replace(regexSeparators, '\x2E').split('.');
	    const encoded = [];
	    for (let i = 0; i < labels.length; i += 1) {
	        encoded.push(regexNonASCII.test(labels[i]) ? 'xn--' + encode(labels[i]) : labels[i]);
	    }
	    return encoded.join('.');
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	const EMPTY_UINT8_ARRAY = new Uint8Array(0);
	const EMPTY_UINT32_ARRAY$1 = new Uint32Array(0);
	// Check if current architecture is little endian
	const LITTLE_ENDIAN = new Int8Array(new Int16Array([1]).buffer)[0] === 1;
	// Store compression in a lazy, global singleton
	let getCompressionSingleton = () => {
	    const COMPRESSION = new Compression();
	    getCompressionSingleton = () => COMPRESSION;
	    return COMPRESSION;
	};
	function align4(pos) {
	    // From: https://stackoverflow.com/a/2022194
	    return (pos + 3) & ~0x03;
	}
	/**
	 * Return size of of a serialized byte value.
	 */
	function sizeOfByte() {
	    return 1;
	}
	/**
	 * Return size of of a serialized boolean value.
	 */
	function sizeOfBool() {
	    return 1;
	}
	/**
	 * Return number of bytes needed to serialize `length`.
	 */
	function sizeOfLength(length) {
	    return length <= 127 ? 1 : 5;
	}
	/**
	 * Return number of bytes needed to serialize `array` Uint8Array typed array.
	 *
	 * WARNING: this only returns the correct size if `align` is `false`.
	 */
	function sizeOfBytes(array, align) {
	    return sizeOfBytesWithLength(array.length, align);
	}
	/**
	 * Return number of bytes needed to serialize `array` Uint8Array typed array.
	 *
	 * WARNING: this only returns the correct size if `align` is `false`.
	 */
	function sizeOfBytesWithLength(length, align) {
	    // Alignment is a tricky thing because it depends on the current offset in
	    // the buffer at the time of serialization; which we cannot anticipate
	    // before actually starting serialization. This means that we need to
	    // potentially over-estimate the size (at most by 3 bytes) to make sure the
	    // final size is at least equal or a bit bigger than necessary.
	    return (align ? 3 : 0) + length + sizeOfLength(length);
	}
	/**
	 * Return number of bytes needed to serialize `str` ASCII string.
	 */
	function sizeOfASCII(str) {
	    return str.length + sizeOfLength(str.length);
	}
	/**
	 * Return number of bytes needed to serialize `str` UTF8 string.
	 */
	function sizeOfUTF8(str) {
	    const encodedLength = encode(str).length;
	    return encodedLength + sizeOfLength(encodedLength);
	}
	/**
	 * Return number of bytes needed to serialize `array`.
	 */
	function sizeOfUint32Array(array) {
	    return array.byteLength + sizeOfLength(array.length);
	}
	function sizeOfNetworkRedirect(str, compression) {
	    return compression === true
	        ? sizeOfBytesWithLength(getCompressionSingleton().networkRedirect.getCompressedSize(str), false)
	        : sizeOfASCII(str);
	}
	function sizeOfNetworkHostname(str, compression) {
	    return compression === true
	        ? sizeOfBytesWithLength(getCompressionSingleton().networkHostname.getCompressedSize(str), false)
	        : sizeOfASCII(str);
	}
	function sizeOfNetworkCSP(str, compression) {
	    return compression === true
	        ? sizeOfBytesWithLength(getCompressionSingleton().networkCSP.getCompressedSize(str), false)
	        : sizeOfASCII(str);
	}
	function sizeOfNetworkFilter(str, compression) {
	    return compression === true
	        ? sizeOfBytesWithLength(getCompressionSingleton().networkFilter.getCompressedSize(str), false)
	        : sizeOfASCII(str);
	}
	function sizeOfCosmeticSelector(str, compression) {
	    return compression === true
	        ? sizeOfBytesWithLength(getCompressionSingleton().cosmeticSelector.getCompressedSize(str), false)
	        : sizeOfASCII(str);
	}
	function sizeOfRawNetwork(str, compression) {
	    return compression === true
	        ? sizeOfBytesWithLength(getCompressionSingleton().networkRaw.getCompressedSize(encode(str)), false)
	        : sizeOfUTF8(str);
	}
	function sizeOfRawCosmetic(str, compression) {
	    return compression === true
	        ? sizeOfBytesWithLength(getCompressionSingleton().cosmeticRaw.getCompressedSize(encode(str)), false)
	        : sizeOfUTF8(str);
	}
	/**
	 * This abstraction allows to serialize efficiently low-level values of types:
	 * string, uint8, uint16, uint32, etc. while hiding the complexity of managing
	 * the current offset and growing. It should always be instantiated with a
	 * big-enough length because this will not allow for resizing. To allow
	 * deciding the required total size, function estimating the size needed to
	 * store different primitive values are exposes as static methods.
	 *
	 * This class is also more efficient than the built-in `DataView`.
	 *
	 * The way this is used in practice is that you write pairs of function to
	 * serialize and deserialize a given structure/class (with code being pretty
	 * symetrical). In the serializer you `pushX` values, and in the deserializer
	 * you use `getX` functions to get back the values.
	 */
	class StaticDataView {
	    /**
	     * Create an empty (i.e.: size = 0) StaticDataView.
	     */
	    static empty(options) {
	        return StaticDataView.fromUint8Array(EMPTY_UINT8_ARRAY, options);
	    }
	    /**
	     * Instantiate a StaticDataView instance from `array` of type Uint8Array.
	     */
	    static fromUint8Array(array, options) {
	        return new StaticDataView(array, options);
	    }
	    /**
	     * Instantiate a StaticDataView with given `capacity` number of bytes.
	     */
	    static allocate(capacity, options) {
	        return new StaticDataView(new Uint8Array(capacity), options);
	    }
	    constructor(buffer, { enableCompression }) {
	        if (LITTLE_ENDIAN === false) {
	            // This check makes sure that we will not load the adblocker on a
	            // big-endian system. This would not work since byte ordering is important
	            // at the moment (mainly for performance reasons).
	            throw new Error('Adblocker currently does not support Big-endian systems');
	        }
	        if (enableCompression === true) {
	            this.enableCompression();
	        }
	        this.buffer = buffer;
	        this.pos = 0;
	    }
	    enableCompression() {
	        this.compression = getCompressionSingleton();
	    }
	    checksum() {
	        return crc32(this.buffer, 0, this.pos);
	    }
	    dataAvailable() {
	        return this.pos < this.buffer.byteLength;
	    }
	    setPos(pos) {
	        this.pos = pos;
	    }
	    getPos() {
	        return this.pos;
	    }
	    seekZero() {
	        this.pos = 0;
	    }
	    slice() {
	        this.checkSize();
	        return this.buffer.slice(0, this.pos);
	    }
	    subarray() {
	        if (this.pos === this.buffer.byteLength) {
	            return this.buffer;
	        }
	        this.checkSize();
	        return this.buffer.subarray(0, this.pos);
	    }
	    /**
	     * Make sure that `this.pos` is aligned on a multiple of 4.
	     */
	    align4() {
	        this.pos = align4(this.pos);
	    }
	    set(buffer) {
	        this.buffer = new Uint8Array(buffer);
	        this.seekZero();
	    }
	    pushBool(bool) {
	        this.pushByte(Number(bool));
	    }
	    getBool() {
	        return Boolean(this.getByte());
	    }
	    setByte(pos, byte) {
	        this.buffer[pos] = byte;
	    }
	    pushByte(octet) {
	        this.pushUint8(octet);
	    }
	    getByte() {
	        return this.getUint8();
	    }
	    pushBytes(bytes, align = false) {
	        this.pushLength(bytes.length);
	        if (align === true) {
	            this.align4();
	        }
	        this.buffer.set(bytes, this.pos);
	        this.pos += bytes.byteLength;
	    }
	    getBytes(align = false) {
	        const numberOfBytes = this.getLength();
	        if (align === true) {
	            this.align4();
	        }
	        const bytes = this.buffer.subarray(this.pos, this.pos + numberOfBytes);
	        this.pos += numberOfBytes;
	        return bytes;
	    }
	    /**
	     * Allows row access to the internal buffer through a Uint32Array acting like
	     * a view. This is used for super fast writing/reading of large chunks of
	     * Uint32 numbers in the byte array.
	     */
	    getUint32ArrayView(desiredSize) {
	        // Round this.pos to next multiple of 4 for alignement
	        this.align4();
	        // Short-cut when empty array
	        if (desiredSize === 0) {
	            return EMPTY_UINT32_ARRAY$1;
	        }
	        // Create non-empty view
	        const view = new Uint32Array(this.buffer.buffer, this.pos + this.buffer.byteOffset, desiredSize);
	        this.pos += desiredSize * 4;
	        return view;
	    }
	    pushUint8(uint8) {
	        this.buffer[this.pos++] = uint8;
	    }
	    getUint8() {
	        return this.buffer[this.pos++];
	    }
	    pushUint16(uint16) {
	        this.buffer[this.pos++] = uint16 >>> 8;
	        this.buffer[this.pos++] = uint16;
	    }
	    getUint16() {
	        return ((this.buffer[this.pos++] << 8) | this.buffer[this.pos++]) >>> 0;
	    }
	    pushUint32(uint32) {
	        this.buffer[this.pos++] = uint32 >>> 24;
	        this.buffer[this.pos++] = uint32 >>> 16;
	        this.buffer[this.pos++] = uint32 >>> 8;
	        this.buffer[this.pos++] = uint32;
	    }
	    getUint32() {
	        return ((((this.buffer[this.pos++] << 24) >>> 0) +
	            ((this.buffer[this.pos++] << 16) |
	                (this.buffer[this.pos++] << 8) |
	                this.buffer[this.pos++])) >>>
	            0);
	    }
	    pushUint32Array(arr) {
	        this.pushLength(arr.length);
	        // TODO - use `set` to push the full buffer at once?
	        for (const n of arr) {
	            this.pushUint32(n);
	        }
	    }
	    getUint32Array() {
	        const length = this.getLength();
	        const arr = new Uint32Array(length);
	        // TODO - use `subarray`?
	        for (let i = 0; i < length; i += 1) {
	            arr[i] = this.getUint32();
	        }
	        return arr;
	    }
	    pushUTF8(raw) {
	        const str = encode(raw);
	        this.pushLength(str.length);
	        for (let i = 0; i < str.length; i += 1) {
	            this.buffer[this.pos++] = str.charCodeAt(i);
	        }
	    }
	    getUTF8() {
	        const byteLength = this.getLength();
	        this.pos += byteLength;
	        return decode(String.fromCharCode.apply(null, 
	        // @ts-ignore
	        this.buffer.subarray(this.pos - byteLength, this.pos)));
	    }
	    pushASCII(str) {
	        this.pushLength(str.length);
	        for (let i = 0; i < str.length; i += 1) {
	            this.buffer[this.pos++] = str.charCodeAt(i);
	        }
	    }
	    getASCII() {
	        const byteLength = this.getLength();
	        this.pos += byteLength;
	        // @ts-ignore
	        return String.fromCharCode.apply(null, this.buffer.subarray(this.pos - byteLength, this.pos));
	    }
	    pushNetworkRedirect(str) {
	        if (this.compression !== undefined) {
	            this.pushBytes(this.compression.networkRedirect.compress(str));
	        }
	        else {
	            this.pushASCII(str);
	        }
	    }
	    getNetworkRedirect() {
	        if (this.compression !== undefined) {
	            return this.compression.networkRedirect.decompress(this.getBytes());
	        }
	        return this.getASCII();
	    }
	    pushNetworkHostname(str) {
	        if (this.compression !== undefined) {
	            this.pushBytes(this.compression.networkHostname.compress(str));
	        }
	        else {
	            this.pushASCII(str);
	        }
	    }
	    getNetworkHostname() {
	        if (this.compression !== undefined) {
	            return this.compression.networkHostname.decompress(this.getBytes());
	        }
	        return this.getASCII();
	    }
	    pushNetworkCSP(str) {
	        if (this.compression !== undefined) {
	            this.pushBytes(this.compression.networkCSP.compress(str));
	        }
	        else {
	            this.pushASCII(str);
	        }
	    }
	    getNetworkCSP() {
	        if (this.compression !== undefined) {
	            return this.compression.networkCSP.decompress(this.getBytes());
	        }
	        return this.getASCII();
	    }
	    pushNetworkFilter(str) {
	        if (this.compression !== undefined) {
	            this.pushBytes(this.compression.networkFilter.compress(str));
	        }
	        else {
	            this.pushASCII(str);
	        }
	    }
	    getNetworkFilter() {
	        if (this.compression !== undefined) {
	            return this.compression.networkFilter.decompress(this.getBytes());
	        }
	        return this.getASCII();
	    }
	    pushCosmeticSelector(str) {
	        if (this.compression !== undefined) {
	            this.pushBytes(this.compression.cosmeticSelector.compress(str));
	        }
	        else {
	            this.pushASCII(str);
	        }
	    }
	    getCosmeticSelector() {
	        if (this.compression !== undefined) {
	            return this.compression.cosmeticSelector.decompress(this.getBytes());
	        }
	        return this.getASCII();
	    }
	    pushRawCosmetic(str) {
	        if (this.compression !== undefined) {
	            this.pushBytes(this.compression.cosmeticRaw.compress(encode(str)));
	        }
	        else {
	            this.pushUTF8(str);
	        }
	    }
	    getRawCosmetic() {
	        if (this.compression !== undefined) {
	            return decode(this.compression.cosmeticRaw.decompress(this.getBytes()));
	        }
	        return this.getUTF8();
	    }
	    pushRawNetwork(str) {
	        if (this.compression !== undefined) {
	            this.pushBytes(this.compression.networkRaw.compress(encode(str)));
	        }
	        else {
	            this.pushUTF8(str);
	        }
	    }
	    getRawNetwork() {
	        if (this.compression !== undefined) {
	            return decode(this.compression.networkRaw.decompress(this.getBytes()));
	        }
	        return this.getUTF8();
	    }
	    checkSize() {
	        if (this.pos !== 0 && this.pos > this.buffer.byteLength) {
	            throw new Error(`StaticDataView too small: ${this.buffer.byteLength}, but required ${this.pos} bytes`);
	        }
	    }
	    // Serialiez `length` with variable encoding to save space
	    pushLength(length) {
	        if (length <= 127) {
	            this.pushUint8(length);
	        }
	        else {
	            this.pushUint8(128);
	            this.pushUint32(length);
	        }
	    }
	    getLength() {
	        const lengthShort = this.getUint8();
	        return lengthShort === 128 ? this.getUint32() : lengthShort;
	    }
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	class Config {
	    static deserialize(buffer) {
	        return new Config({
	            debug: buffer.getBool(),
	            enableCompression: buffer.getBool(),
	            enableHtmlFiltering: buffer.getBool(),
	            enableInMemoryCache: buffer.getBool(),
	            enableMutationObserver: buffer.getBool(),
	            enableOptimizations: buffer.getBool(),
	            enablePushInjectionsOnNavigationEvents: buffer.getBool(),
	            guessRequestTypeFromUrl: buffer.getBool(),
	            integrityCheck: buffer.getBool(),
	            loadCSPFilters: buffer.getBool(),
	            loadCosmeticFilters: buffer.getBool(),
	            loadExceptionFilters: buffer.getBool(),
	            loadExtendedSelectors: buffer.getBool(),
	            loadGenericCosmeticsFilters: buffer.getBool(),
	            loadNetworkFilters: buffer.getBool(),
	            loadPreprocessors: buffer.getBool(),
	        });
	    }
	    constructor({ debug = false, enableCompression = false, enableHtmlFiltering = false, enableInMemoryCache = true, enableMutationObserver = true, enableOptimizations = true, enablePushInjectionsOnNavigationEvents = true, guessRequestTypeFromUrl = false, integrityCheck = true, loadCSPFilters = true, loadCosmeticFilters = true, loadExceptionFilters = true, loadExtendedSelectors = false, loadGenericCosmeticsFilters = true, loadNetworkFilters = true, loadPreprocessors = false, } = {}) {
	        this.debug = debug;
	        this.enableCompression = enableCompression;
	        this.enableHtmlFiltering = enableHtmlFiltering;
	        this.enableInMemoryCache = enableInMemoryCache;
	        this.enableMutationObserver = enableMutationObserver;
	        this.enableOptimizations = enableOptimizations;
	        this.enablePushInjectionsOnNavigationEvents = enablePushInjectionsOnNavigationEvents;
	        this.guessRequestTypeFromUrl = guessRequestTypeFromUrl;
	        this.integrityCheck = integrityCheck;
	        this.loadCSPFilters = loadCSPFilters;
	        this.loadCosmeticFilters = loadCosmeticFilters;
	        this.loadExceptionFilters = loadExceptionFilters;
	        this.loadExtendedSelectors = loadExtendedSelectors;
	        this.loadGenericCosmeticsFilters = loadGenericCosmeticsFilters;
	        this.loadNetworkFilters = loadNetworkFilters;
	        this.loadPreprocessors = loadPreprocessors;
	    }
	    getSerializedSize() {
	        // NOTE: this should always be the number of attributes and needs to be
	        // updated when `Config` changes.
	        return 16 * sizeOfBool();
	    }
	    serialize(buffer) {
	        buffer.pushBool(this.debug);
	        buffer.pushBool(this.enableCompression);
	        buffer.pushBool(this.enableHtmlFiltering);
	        buffer.pushBool(this.enableInMemoryCache);
	        buffer.pushBool(this.enableMutationObserver);
	        buffer.pushBool(this.enableOptimizations);
	        buffer.pushBool(this.enablePushInjectionsOnNavigationEvents);
	        buffer.pushBool(this.guessRequestTypeFromUrl);
	        buffer.pushBool(this.integrityCheck);
	        buffer.pushBool(this.loadCSPFilters);
	        buffer.pushBool(this.loadCosmeticFilters);
	        buffer.pushBool(this.loadExceptionFilters);
	        buffer.pushBool(this.loadExtendedSelectors);
	        buffer.pushBool(this.loadGenericCosmeticsFilters);
	        buffer.pushBool(this.loadNetworkFilters);
	        buffer.pushBool(this.loadPreprocessors);
	    }
	}

	/**
	 * The MIT License (MIT)
	 *
	 * Copyright (c) Feross Aboukhadijeh
	 *
	 * Originally from: https://github.com/feross/queue-microtask
	 */
	let promise;
	const queueMicrotask = typeof window !== 'undefined' && typeof window.queueMicrotask === 'function'
	    ? (cb) => window.queueMicrotask(cb)
	    : // reuse resolved promise, and allocate it lazily
	        (cb) => (promise || (promise = Promise.resolve())).then(cb).catch((err) => setTimeout(() => {
	            throw err;
	        }, 0));

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	/**
	 * Add `callback` listener for `event` in `listeners` Map.
	 */
	function registerCallback(event, callback, listeners) {
	    let listenersForEvent = listeners.get(event);
	    if (listenersForEvent === undefined) {
	        listenersForEvent = [];
	        listeners.set(event, listenersForEvent);
	    }
	    listenersForEvent.push(callback);
	}
	/**
	 * Remove `callback` listener for `event` from `listeners` Map.
	 */
	function unregisterCallback(event, callback, listeners) {
	    const listenersForEvent = listeners.get(event);
	    if (listenersForEvent !== undefined) {
	        const indexOfCallback = listenersForEvent.indexOf(callback);
	        if (indexOfCallback !== -1) {
	            listenersForEvent.splice(indexOfCallback, 1);
	        }
	    }
	}
	/**
	 * Call all registered listeners for `event` with `args` as arguments. Return
	 * `true` if at least one callback was registered and `false` otherwise.
	 */
	function triggerCallback(event, args, listeners) {
	    // Fast-path for cases where no listener is registered
	    if (listeners.size === 0) {
	        return false;
	    }
	    const listenersForEvent = listeners.get(event);
	    if (listenersForEvent !== undefined) {
	        queueMicrotask(() => {
	            for (const listener of listenersForEvent) {
	                listener(...args);
	            }
	        });
	        return true;
	    }
	    return false;
	}
	/**
	 * Simple and efficient `EventEmitter` abstraction (following conventions from
	 * Node.js) allowing partially typed event emitting. The set of event names is
	 * specified as a type parameter while instantiating the event emitter.
	 */
	class EventEmitter {
	    constructor() {
	        this.onceListeners = new Map();
	        this.onListeners = new Map();
	    }
	    /**
	     * Register an event listener for `event`.
	     */
	    on(event, callback) {
	        registerCallback(event, callback, this.onListeners);
	    }
	    /**
	     * Register an event listener for `event`; but only listen to first instance
	     * of this event. The listener is automatically deleted afterwards.
	     */
	    once(event, callback) {
	        registerCallback(event, callback, this.onceListeners);
	    }
	    /**
	     * Remove `callback` from list of listeners for `event`.
	     */
	    unsubscribe(event, callback) {
	        unregisterCallback(event, callback, this.onListeners);
	        unregisterCallback(event, callback, this.onceListeners);
	    }
	    /**
	     * Emit an event. Call all registered listeners to this event.
	     */
	    emit(event, ...args) {
	        triggerCallback(event, args, this.onListeners);
	        if (triggerCallback(event, args, this.onceListeners) === true) {
	            this.onceListeners.delete(event);
	        }
	    }
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	/**
	 * Built-in fetch helpers can be used to initialize the adblocker from
	 * pre-built presets or raw lists (fetched from multiple sources). In case of
	 * failure (e.g. timeout), the whole process of initialization fails. Timeouts
	 * are not so uncommon, and retrying to fetch usually succeeds.
	 */
	function fetchWithRetry(fetch, url) {
	    let retry = 3;
	    // Wrap `fetch` into a lightweight retry function which makes sure that if
	    // fetching fails, it can be retried up to three times. Failure can happen if
	    // the remote server times-out, but retrying fetching of the same URL will
	    // usually succeed.
	    const fetchWrapper = () => {
	        return fetch(url).catch((ex) => {
	            if (retry > 0) {
	                retry -= 1;
	                return new Promise((resolve, reject) => {
	                    setTimeout(() => {
	                        fetchWrapper().then(resolve).catch(reject);
	                    }, 500);
	                });
	            }
	            throw ex;
	        });
	    };
	    return fetchWrapper();
	}
	function fetchResource(fetch, url) {
	    return fetchWithRetry(fetch, url).then((response) => response.text());
	}
	const PREFIX = 'https://raw.githubusercontent.com/ghostery/adblocker/master/packages/adblocker/assets';
	const adsLists = [
	    `${PREFIX}/easylist/easylist.txt`,
	    `${PREFIX}/peter-lowe/serverlist.txt`,
	    `${PREFIX}/ublock-origin/badware.txt`,
	    `${PREFIX}/ublock-origin/filters-2020.txt`,
	    `${PREFIX}/ublock-origin/filters-2021.txt`,
	    `${PREFIX}/ublock-origin/filters-2022.txt`,
	    `${PREFIX}/ublock-origin/filters-2023.txt`,
	    `${PREFIX}/ublock-origin/filters-2024.txt`,
	    `${PREFIX}/ublock-origin/filters.txt`,
	    `${PREFIX}/ublock-origin/quick-fixes.txt`,
	    `${PREFIX}/ublock-origin/resource-abuse.txt`,
	    `${PREFIX}/ublock-origin/unbreak.txt`,
	];
	const adsAndTrackingLists = [
	    ...adsLists,
	    `${PREFIX}/easylist/easyprivacy.txt`,
	    `${PREFIX}/ublock-origin/privacy.txt`,
	];
	const fullLists = [
	    ...adsAndTrackingLists,
	    `${PREFIX}/easylist/easylist-cookie.txt`,
	    `${PREFIX}/ublock-origin/annoyances-others.txt`,
	    `${PREFIX}/ublock-origin/annoyances-cookies.txt`,
	];
	/**
	 * Fetch latest version of enabledByDefault blocking lists.
	 */
	function fetchLists(fetch, urls) {
	    return Promise.all(urls.map((url) => fetchResource(fetch, url)));
	}
	/**
	 * Fetch latest version of uBlock Origin's resources, used to inject scripts in
	 * the page or redirect request to data URLs.
	 */
	function fetchResources(fetch) {
	    return fetchResource(fetch, `${PREFIX}/ublock-origin/resources.txt`);
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	class NetworkBuilder {
	    constructor() {
	        this.options = new Set();
	        this.prefix = undefined;
	        this.infix = undefined;
	        this.suffix = undefined;
	        this.redirect = undefined;
	    }
	    blockRequestsWithType(t) {
	        if (this.options.has(t)) {
	            throw new Error(`Already blocking type ${t}`);
	        }
	        this.options.add(t);
	        return this;
	    }
	    images() {
	        return this.blockRequestsWithType('image');
	    }
	    scripts() {
	        return this.blockRequestsWithType('script');
	    }
	    frames() {
	        return this.blockRequestsWithType('frame');
	    }
	    fonts() {
	        return this.blockRequestsWithType('font');
	    }
	    medias() {
	        return this.blockRequestsWithType('media');
	    }
	    styles() {
	        return this.blockRequestsWithType('css');
	    }
	    redirectTo(redirect) {
	        if (this.redirect !== undefined) {
	            throw new Error(`Already redirecting: ${this.redirect}`);
	        }
	        this.redirect = `redirect=${redirect}`;
	        return this;
	    }
	    urlContains(infix) {
	        if (this.infix !== undefined) {
	            throw new Error(`Already matching pattern: ${this.infix}`);
	        }
	        this.infix = infix;
	        return this;
	    }
	    urlStartsWith(prefix) {
	        if (this.prefix !== undefined) {
	            throw new Error(`Already matching prefix: ${this.prefix}`);
	        }
	        this.prefix = `|${prefix}`;
	        return this;
	    }
	    urlEndsWith(suffix) {
	        if (this.suffix !== undefined) {
	            throw new Error(`Already matching suffix: ${this.suffix}`);
	        }
	        this.suffix = `${suffix}|`;
	        return this;
	    }
	    withHostname(hostname) {
	        if (this.prefix !== undefined) {
	            throw new Error(`Cannot match hostname if filter already has prefix: ${this.prefix}`);
	        }
	        this.prefix = `||${hostname}^`;
	        return this;
	    }
	    toString() {
	        const parts = [];
	        if (this.prefix !== undefined) {
	            parts.push(this.prefix);
	        }
	        if (this.infix !== undefined) {
	            parts.push(this.infix);
	        }
	        if (this.suffix !== undefined) {
	            parts.push(this.suffix);
	        }
	        const options = ['important'];
	        if (this.options.size !== 0) {
	            for (const option of this.options) {
	                options.push(option);
	            }
	        }
	        if (this.redirect !== undefined) {
	            options.push(this.redirect);
	        }
	        return `${parts.length === 0 ? '*' : parts.join('*')}$${options.join(',')}`;
	    }
	}
	function block() {
	    return new NetworkBuilder();
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	function isAtoms(tokens) {
	    return tokens.every((token) => typeof token !== 'string');
	}
	function isAST(tokens) {
	    return tokens.every((token) => token.type !== 'comma' && token.type !== 'combinator');
	}

	/*!
	 * Based on parsel. Extended by Rémi Berson for Ghostery (2021).
	 * https://github.com/LeaVerou/parsel
	 *
	 * MIT License
	 *
	 * Copyright (c) 2020 Lea Verou
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to deal
	 * in the Software without restriction, including without limitation the rights
	 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
	 * copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in all
	 * copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
	 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
	 * SOFTWARE.
	 */
	const RECURSIVE_PSEUDO_CLASSES = new Set([
	    'any',
	    'dir',
	    'has',
	    'host-context',
	    'if',
	    'if-not',
	    'is',
	    'matches',
	    'not',
	    'where',
	]);
	const TOKENS = {
	    attribute: /\[\s*(?:(?<namespace>\*|[-\w]*)\|)?(?<name>[-\w\u{0080}-\u{FFFF}]+)\s*(?:(?<operator>\W?=)\s*(?<value>.+?)\s*(?<caseSensitive>[iIsS])?\s*)?\]/gu,
	    id: /#(?<name>(?:[-\w\u{0080}-\u{FFFF}]|\\.)+)/gu,
	    class: /\.(?<name>(?:[-\w\u{0080}-\u{FFFF}]|\\.)+)/gu,
	    comma: /\s*,\s*/g, // must be before combinator
	    combinator: /\s*[\s>+~]\s*/g, // this must be after attribute
	    'pseudo-element': /::(?<name>[-\w\u{0080}-\u{FFFF}]+)(?:\((?:¶*)\))?/gu, // this must be before pseudo-class
	    'pseudo-class': /:(?<name>[-\w\u{0080}-\u{FFFF}]+)(?:\((?<argument>¶*)\))?/gu,
	    type: /(?:(?<namespace>\*|[-\w]*)\|)?(?<name>[-\w\u{0080}-\u{FFFF}]+)|\*/gu, // this must be last
	};
	const TOKENS_WITH_PARENS = new Set(['pseudo-class', 'pseudo-element']);
	const TOKENS_WITH_STRINGS = new Set([...TOKENS_WITH_PARENS, 'attribute']);
	const TRIM_TOKENS = new Set(['combinator', 'comma']);
	const TOKENS_FOR_RESTORE = Object.assign({}, TOKENS);
	TOKENS_FOR_RESTORE['pseudo-element'] = RegExp(TOKENS['pseudo-element'].source.replace('(?<argument>¶*)', '(?<argument>.*?)'), 'gu');
	TOKENS_FOR_RESTORE['pseudo-class'] = RegExp(TOKENS['pseudo-class'].source.replace('(?<argument>¶*)', '(?<argument>.*)'), 'gu');
	// TODO - it feels like with some more typing shenanigans we could replace groups validation by generic logic in this function.
	function splitOnMatch(pattern, str) {
	    pattern.lastIndex = 0;
	    const match = pattern.exec(str);
	    if (match === null) {
	        return undefined;
	    }
	    const from = match.index - 1;
	    const content = match[0];
	    const before = str.slice(0, from + 1);
	    const after = str.slice(from + content.length + 1);
	    return [before, [content, match.groups || {}], after];
	}
	const GRAMMAR = [
	    // attribute
	    (str) => {
	        const match = splitOnMatch(TOKENS.attribute, str);
	        if (match === undefined) {
	            return undefined;
	        }
	        const [before, [content, { name, operator, value, namespace, caseSensitive }], after] = match;
	        if (name === undefined) {
	            return undefined;
	        }
	        return [
	            before,
	            {
	                type: 'attribute',
	                content,
	                length: content.length,
	                namespace,
	                caseSensitive,
	                pos: [],
	                name,
	                operator,
	                value,
	            },
	            after,
	        ];
	    },
	    // #id
	    (str) => {
	        const match = splitOnMatch(TOKENS.id, str);
	        if (match === undefined) {
	            return undefined;
	        }
	        const [before, [content, { name }], after] = match;
	        if (name === undefined) {
	            return undefined;
	        }
	        return [
	            before,
	            {
	                type: 'id',
	                content,
	                length: content.length,
	                pos: [],
	                name,
	            },
	            after,
	        ];
	    },
	    // .class
	    (str) => {
	        const match = splitOnMatch(TOKENS.class, str);
	        if (match === undefined) {
	            return undefined;
	        }
	        const [before, [content, { name }], after] = match;
	        if (name === undefined) {
	            return undefined;
	        }
	        return [
	            before,
	            {
	                type: 'class',
	                content,
	                length: content.length,
	                pos: [],
	                name,
	            },
	            after,
	        ];
	    },
	    // comma ,
	    (str) => {
	        const match = splitOnMatch(TOKENS.comma, str);
	        if (match === undefined) {
	            return undefined;
	        }
	        const [before, [content], after] = match;
	        return [
	            before,
	            {
	                type: 'comma',
	                content,
	                length: content.length,
	                pos: [],
	            },
	            after,
	        ];
	    },
	    // combinator
	    (str) => {
	        const match = splitOnMatch(TOKENS.combinator, str);
	        if (match === undefined) {
	            return undefined;
	        }
	        const [before, [content], after] = match;
	        return [
	            before,
	            {
	                type: 'combinator',
	                content,
	                length: content.length,
	                pos: [],
	            },
	            after,
	        ];
	    },
	    // pseudo-element
	    (str) => {
	        const match = splitOnMatch(TOKENS['pseudo-element'], str);
	        if (match === undefined) {
	            return undefined;
	        }
	        const [before, [content, { name }], after] = match;
	        if (name === undefined) {
	            return undefined;
	        }
	        return [
	            before,
	            {
	                type: 'pseudo-element',
	                content,
	                length: content.length,
	                pos: [],
	                name,
	            },
	            after,
	        ];
	    },
	    // pseudo-class
	    (str) => {
	        const match = splitOnMatch(TOKENS['pseudo-class'], str);
	        if (match === undefined) {
	            return undefined;
	        }
	        // TODO - here `argument` can be undefined and should be rejected?
	        const [before, [content, { name, argument }], after] = match;
	        if (name === undefined) {
	            return undefined;
	        }
	        return [
	            before,
	            {
	                type: 'pseudo-class',
	                content,
	                length: content.length,
	                pos: [],
	                name,
	                argument,
	                subtree: undefined,
	            },
	            after,
	        ];
	    },
	    // type
	    (str) => {
	        const match = splitOnMatch(TOKENS.type, str);
	        if (match === undefined) {
	            return undefined;
	        }
	        const [before, [content, { name, namespace }], after] = match;
	        return [
	            before,
	            {
	                type: 'type',
	                content,
	                length: content.length,
	                namespace,
	                pos: [],
	                name,
	            },
	            after,
	        ];
	    },
	];
	function tokenizeBy(text) {
	    if (!text) {
	        return [];
	    }
	    const strarr = [text];
	    for (const tokenizer of GRAMMAR) {
	        for (let i = 0; i < strarr.length; i++) {
	            const str = strarr[i];
	            if (typeof str === 'string') {
	                const match = tokenizer(str);
	                if (match !== undefined) {
	                    strarr.splice(i, 1, ...match.filter((a) => a.length !== 0));
	                }
	            }
	        }
	    }
	    let offset = 0;
	    for (const token of strarr) {
	        if (typeof token !== 'string') {
	            token.pos = [offset, offset + token.length];
	            if (TRIM_TOKENS.has(token.type)) {
	                token.content = token.content.trim() || ' ';
	            }
	        }
	        offset += token.length;
	    }
	    if (isAtoms(strarr)) {
	        return strarr;
	    }
	    // NOTE: here this means that parsing failed.
	    return [];
	}
	function restoreNested(tokens, strings, regex, types) {
	    // TODO - here from offsets in strings and tokens we should be able to find the exact spot without RegExp?
	    for (const str of strings) {
	        for (const token of tokens) {
	            if (types.has(token.type) && token.pos[0] < str.start && str.start < token.pos[1]) {
	                const content = token.content;
	                token.content = token.content.replace(regex, str.str);
	                if (token.content !== content) {
	                    // actually changed?
	                    // Re-evaluate groups
	                    TOKENS_FOR_RESTORE[token.type].lastIndex = 0;
	                    const match = TOKENS_FOR_RESTORE[token.type].exec(token.content);
	                    if (match !== null) {
	                        Object.assign(token, match.groups);
	                    }
	                }
	            }
	        }
	    }
	}
	function isEscaped(str, index) {
	    let backslashes = 0;
	    index -= 1;
	    while (index >= 0 && str[index] === '\\') {
	        backslashes += 1;
	        index -= 1;
	    }
	    return backslashes % 2 !== 0;
	}
	function gobbleQuotes(text, quote, start) {
	    // Find end of quote, taking care of ignoring escaped quotes
	    let end = start + 1;
	    while ((end = text.indexOf(quote, end)) !== -1 && isEscaped(text, end) === true) {
	        end += 1;
	    }
	    if (end === -1) {
	        // Opening quote without closing quote
	        return undefined;
	    }
	    return text.slice(start, end + 1);
	}
	function gobbleParens(text, start) {
	    let stack = 0;
	    for (let i = start; i < text.length; i++) {
	        const char = text[i];
	        if (char === '(') {
	            stack += 1;
	        }
	        else if (char === ')') {
	            if (stack > 0) {
	                stack -= 1;
	            }
	            else {
	                // Closing paren without opening paren
	                return undefined;
	            }
	        }
	        if (stack === 0) {
	            return text.slice(start, i + 1);
	        }
	    }
	    // Opening paren without closing paren
	    return undefined;
	}
	function replace(selector, replacement, opening, gobble) {
	    const strings = [];
	    let offset = 0;
	    while ((offset = selector.indexOf(opening, offset)) !== -1) {
	        const str = gobble(selector, offset);
	        if (str === undefined) {
	            break;
	        }
	        strings.push({ str, start: offset });
	        selector = `${selector.slice(0, offset + 1)}${replacement.repeat(str.length - 2)}${selector.slice(offset + str.length - 1)}`;
	        offset += str.length;
	    }
	    return [strings, selector];
	}
	function tokenize$2(selector) {
	    if (typeof selector !== 'string') {
	        return [];
	    }
	    // Prevent leading/trailing whitespace be interpreted as combinators
	    selector = selector.trim();
	    if (selector.length === 0) {
	        return [];
	    }
	    // Replace strings with whitespace strings (to preserve offsets)
	    const [doubleQuotes, selectorWithoutDoubleQuotes] = replace(selector, '§', '"', (text, start) => gobbleQuotes(text, '"', start));
	    const [singleQuotes, selectorWithoutQuotes] = replace(selectorWithoutDoubleQuotes, '§', "'", (text, start) => gobbleQuotes(text, "'", start));
	    // Now that strings are out of the way, extract parens and replace them with parens with whitespace (to preserve offsets)
	    const [parens, selectorWithoutParens] = replace(selectorWithoutQuotes, '¶', '(', gobbleParens);
	    // Now we have no nested structures and we can parse with regexes
	    const tokens = tokenizeBy(selectorWithoutParens);
	    // Now restore parens and strings in reverse order
	    restoreNested(tokens, parens, /\(¶*\)/, TOKENS_WITH_PARENS);
	    restoreNested(tokens, doubleQuotes, /"§*"/, TOKENS_WITH_STRINGS);
	    restoreNested(tokens, singleQuotes, /'§*'/, TOKENS_WITH_STRINGS);
	    return tokens;
	}
	// Convert a flat list of tokens into a tree of complex & compound selectors
	function nestTokens(tokens, { list = true } = {}) {
	    if (list === true && tokens.some((t) => t.type === 'comma')) {
	        const selectors = [];
	        const temp = [];
	        for (let i = 0; i < tokens.length; i += 1) {
	            const token = tokens[i];
	            if (token.type === 'comma') {
	                if (temp.length === 0) {
	                    throw new Error('Incorrect comma at ' + i);
	                }
	                const sub = nestTokens(temp, { list: false });
	                if (sub !== undefined) {
	                    selectors.push(sub);
	                }
	                temp.length = 0;
	            }
	            else {
	                temp.push(token);
	            }
	        }
	        if (temp.length === 0) {
	            throw new Error('Trailing comma');
	        }
	        else {
	            const sub = nestTokens(temp, { list: false });
	            if (sub !== undefined) {
	                selectors.push(sub);
	            }
	        }
	        return { type: 'list', list: selectors };
	    }
	    for (let i = tokens.length - 1; i >= 0; i--) {
	        const token = tokens[i];
	        if (token.type === 'combinator') {
	            const left = nestTokens(tokens.slice(0, i));
	            const right = nestTokens(tokens.slice(i + 1));
	            if (right === undefined) {
	                return undefined;
	            }
	            if (token.content !== ' ' &&
	                token.content !== '~' &&
	                token.content !== '+' &&
	                token.content !== '>') {
	                return undefined;
	            }
	            return {
	                type: 'complex',
	                combinator: token.content,
	                left,
	                right,
	            };
	        }
	    }
	    if (tokens.length === 0) {
	        return undefined;
	    }
	    if (isAST(tokens)) {
	        if (tokens.length === 1) {
	            return tokens[0];
	        }
	        // If we're here, there are no combinators, so it's just a list
	        return {
	            type: 'compound',
	            compound: [...tokens], // clone to avoid pointers messing up the AST
	        };
	    }
	    return undefined;
	}
	// Traverse an AST (or part thereof), in depth-first order
	function walk(node, callback, o, parent) {
	    if (node === undefined) {
	        return;
	    }
	    if (node.type === 'complex') {
	        walk(node.left, callback, o, node);
	        walk(node.right, callback, o, node);
	    }
	    else if (node.type === 'compound') {
	        for (const n of node.compound) {
	            walk(n, callback, o, node);
	        }
	    }
	    else if (node.type === 'pseudo-class' &&
	        node.subtree !== undefined &&
	        o !== undefined &&
	        o.type === 'pseudo-class' &&
	        o.subtree !== undefined) {
	        walk(node.subtree, callback, o, node);
	    }
	    callback(node, parent);
	}
	/**
	 * Parse a CSS selector
	 * @param selector {String} The selector to parse
	 * @param options.recursive {Boolean} Whether to parse the arguments of pseudo-classes like :is(), :has() etc. Defaults to true.
	 * @param options.list {Boolean} Whether this can be a selector list (A, B, C etc). Defaults to true.
	 */
	function parse(selector, { recursive = true, list = true } = {}) {
	    const tokens = tokenize$2(selector);
	    if (tokens.length === 0) {
	        return undefined;
	    }
	    const ast = nestTokens(tokens, { list });
	    if (recursive === true) {
	        walk(ast, (node) => {
	            if (node.type === 'pseudo-class' &&
	                node.argument &&
	                node.name !== undefined &&
	                RECURSIVE_PSEUDO_CLASSES.has(node.name)) {
	                node.subtree = parse(node.argument, { recursive: true, list: true });
	            }
	        });
	    }
	    return ast;
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	const EXTENDED_PSEUDO_CLASSES = new Set([
	    // '-abp-contains',
	    // '-abp-has',
	    // '-abp-properties',
	    'has',
	    'has-text',
	    'if',
	    // 'if-not',
	    // 'matches-css',
	    // 'matches-css-after',
	    // 'matches-css-before',
	    // 'min-text-length',
	    // 'nth-ancestor',
	    // 'upward',
	    // 'watch-attr',
	    // 'watch-attrs',
	    // 'xpath',
	]);
	const PSEUDO_CLASSES = new Set([
	    'active',
	    'any',
	    'any-link',
	    'blank',
	    'checked',
	    'default',
	    'defined',
	    'dir',
	    'disabled',
	    'empty',
	    'enabled',
	    'first',
	    'first-child',
	    'first-of-type',
	    'focus',
	    'focus-visible',
	    'focus-within',
	    'fullscreen',
	    'host',
	    'host-context',
	    'hover',
	    'in-range',
	    'indeterminate',
	    'invalid',
	    'is',
	    'lang',
	    'last-child',
	    'last-of-type',
	    'left',
	    'link',
	    'matches',
	    // NOTE: by default we consider `:not(...)` to be a normal CSS selector since,
	    // we are only interested in cases where the argument is an extended selector.
	    // If that is the case, it will still be detected as such.
	    'not',
	    'nth-child',
	    'nth-last-child',
	    'nth-last-of-type',
	    'nth-of-type',
	    'only-child',
	    'only-of-type',
	    'optional',
	    'out-of-range',
	    'placeholder-shown',
	    'read-only',
	    'read-write',
	    'required',
	    'right',
	    'root',
	    'scope',
	    'target',
	    'valid',
	    'visited',
	    'where',
	]);
	// NOTE: here we only need to list the pseudo-elements which can appear with a
	// single colon (e.g. :after or ::after are valid for backward compatibility
	// reasons). They can be misinterpreted as pseudo-classes by the tokenizer for
	// this reason.
	const PSEUDO_ELEMENTS = new Set(['after', 'before', 'first-letter', 'first-line']);
	var SelectorType;
	(function (SelectorType) {
	    SelectorType[SelectorType["Normal"] = 0] = "Normal";
	    SelectorType[SelectorType["Extended"] = 1] = "Extended";
	    SelectorType[SelectorType["Invalid"] = 2] = "Invalid";
	})(SelectorType || (SelectorType = {}));
	function classifySelector(selector) {
	    // In most cases there is no pseudo-anything so we can quickly exit.
	    if (selector.indexOf(':') === -1) {
	        return SelectorType.Normal;
	    }
	    const tokens = tokenize$2(selector);
	    // Detect pseudo-classes
	    let foundSupportedExtendedSelector = false;
	    for (const token of tokens) {
	        if (token.type === 'pseudo-class') {
	            const { name } = token;
	            if (EXTENDED_PSEUDO_CLASSES.has(name) === true) {
	                foundSupportedExtendedSelector = true;
	            }
	            else if (PSEUDO_CLASSES.has(name) === false && PSEUDO_ELEMENTS.has(name) === false) {
	                return SelectorType.Invalid;
	            }
	            // Recursively
	            if (foundSupportedExtendedSelector === false &&
	                token.argument !== undefined &&
	                RECURSIVE_PSEUDO_CLASSES.has(name) === true) {
	                const argumentType = classifySelector(token.argument);
	                if (argumentType === SelectorType.Invalid) {
	                    return argumentType;
	                }
	                else if (argumentType === SelectorType.Extended) {
	                    foundSupportedExtendedSelector = true;
	                }
	            }
	        }
	    }
	    if (foundSupportedExtendedSelector === true) {
	        return SelectorType.Extended;
	    }
	    return SelectorType.Normal;
	}

	const EXTENSIONS$5 = new Set(['htm', 'html', 'xhtml']);

	const EXTENSIONS$4 = new Set([
	    'eot',
	    'otf',
	    'sfnt',
	    'ttf',
	    'woff',
	    'woff2',
	]);

	const EXTENSIONS$3 = new Set([
	    'apng',
	    'bmp',
	    'cur',
	    'dib',
	    'eps',
	    'gif',
	    'heic',
	    'heif',
	    'ico',
	    'j2k',
	    'jfi',
	    'jfif',
	    'jif',
	    'jp2',
	    'jpe',
	    'jpeg',
	    'jpf',
	    'jpg',
	    'jpm',
	    'jpx',
	    'mj2',
	    'pjp',
	    'pjpeg',
	    'png',
	    'svg',
	    'svgz',
	    'tif',
	    'tiff',
	    'webp',
	]);

	const EXTENSIONS$2 = new Set([
	    'avi',
	    'flv',
	    'mp3',
	    'mp4',
	    'ogg',
	    'wav',
	    'weba',
	    'webm',
	    'wmv',
	]);

	const EXTENSIONS$1 = new Set(['js', 'ts', 'jsx', 'esm']);

	const EXTENSIONS = new Set(['css', 'scss']);

	function extname(url) {
	    let endOfPath = url.length;
	    // Check for fragment
	    const indexOfFragment = url.indexOf('#');
	    if (indexOfFragment !== -1) {
	        endOfPath = indexOfFragment;
	    }
	    const indexOfQuery = url.indexOf('?');
	    if (indexOfQuery !== -1 && indexOfQuery < endOfPath) {
	        endOfPath = indexOfQuery;
	    }
	    let startOfExt = endOfPath - 1;
	    let code = 0;
	    for (; startOfExt >= 0; startOfExt -= 1) {
	        code = url.charCodeAt(startOfExt);
	        if (((code >= 65 && code <= 90) ||
	            (code >= 97 && code <= 122) ||
	            (code >= 48 && code <= 57)) === false) {
	            break;
	        }
	    }
	    if (code !== 46 || startOfExt < 0 || endOfPath - startOfExt >= 10) {
	        return '';
	    }
	    return url.slice(startOfExt + 1, endOfPath);
	}

	function getRequestType(url) {
	    const ext = extname(url);
	    // Images
	    if (EXTENSIONS$3.has(ext) ||
	        url.startsWith('data:image/') ||
	        url.startsWith('https://frog.wix.com/bt')) {
	        return 'image';
	    }
	    // Medias
	    if (EXTENSIONS$2.has(ext) ||
	        url.startsWith('data:audio/') ||
	        url.startsWith('data:video/')) {
	        return 'media';
	    }
	    // Stylesheets
	    if (EXTENSIONS.has(ext) || url.startsWith('data:text/css')) {
	        return 'stylesheet';
	    }
	    // Scripts
	    if (EXTENSIONS$1.has(ext) ||
	        (url.startsWith('data:') &&
	            (url.startsWith('data:application/ecmascript') ||
	                url.startsWith('data:application/javascript') ||
	                url.startsWith('data:application/x-ecmascript') ||
	                url.startsWith('data:application/x-javascript') ||
	                url.startsWith('data:text/ecmascript') ||
	                url.startsWith('data:text/javascript') ||
	                url.startsWith('data:text/javascript1.0') ||
	                url.startsWith('data:text/javascript1.1') ||
	                url.startsWith('data:text/javascript1.2') ||
	                url.startsWith('data:text/javascript1.3') ||
	                url.startsWith('data:text/javascript1.4') ||
	                url.startsWith('data:text/javascript1.5') ||
	                url.startsWith('data:text/jscript') ||
	                url.startsWith('data:text/livescript') ||
	                url.startsWith('data:text/x-ecmascript') ||
	                url.startsWith('data:text/x-javascript'))) ||
	        url.startsWith('https://maps.googleapis.com/maps/api/js') ||
	        url.startsWith('https://www.googletagmanager.com/gtag/js')) {
	        return 'script';
	    }
	    // Documents
	    if (EXTENSIONS$5.has(ext) ||
	        url.startsWith('data:text/html') ||
	        url.startsWith('data:application/xhtml') ||
	        url.startsWith('https://www.youtube.com/embed/') ||
	        url.startsWith('https://www.google.com/gen_204')) {
	        return 'document';
	    }
	    // Fonts
	    if (EXTENSIONS$4.has(ext) || url.startsWith('data:font/')) {
	        return 'font';
	    }
	    return 'other';
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	/**
	 * Thin abstraction around a Uint32Array which allows to push tokens
	 * whithout caring for the offset. It is used as a way to avoid multiple
	 * allocations while calling tokenization (mostly beneficitial for
	 * `NetworkFilter.getTokens()`).
	 */
	class TokensBuffer {
	    constructor(size) {
	        this.pos = 0;
	        this.buffer = new Uint32Array(size);
	    }
	    reset() {
	        this.pos = 0;
	    }
	    slice() {
	        return this.buffer.slice(0, this.pos);
	    }
	    push(token) {
	        this.buffer[this.pos++] = token;
	    }
	    empty() {
	        return this.pos === 0;
	    }
	    full() {
	        return this.pos === this.buffer.length;
	    }
	    remaining() {
	        return this.buffer.length - this.pos;
	    }
	}
	const TOKENS_BUFFER = new TokensBuffer(1024);

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	const HASH_INTERNAL_MULT = 37;
	const HASH_SEED = 5011;
	/***************************************************************************
	 *  Bitwise helpers
	 * ************************************************************************* */
	// From: https://stackoverflow.com/a/43122214/1185079
	function bitCount(n) {
	    n = n - ((n >> 1) & 0x55555555);
	    n = (n & 0x33333333) + ((n >> 2) & 0x33333333);
	    return (((n + (n >> 4)) & 0xf0f0f0f) * 0x1010101) >> 24;
	}
	function getBit(n, mask) {
	    return !!(n & mask);
	}
	function setBit(n, mask) {
	    return n | mask;
	}
	function clearBit(n, mask) {
	    return n & ~mask;
	}
	function fastHashBetween(str, begin, end) {
	    let hash = HASH_SEED;
	    for (let i = begin; i < end; i += 1) {
	        hash = (hash * HASH_INTERNAL_MULT) ^ str.charCodeAt(i);
	    }
	    return hash >>> 0;
	}
	function fastHash(str) {
	    if (typeof str !== 'string') {
	        return HASH_SEED;
	    }
	    if (str.length === 0) {
	        return HASH_SEED;
	    }
	    return fastHashBetween(str, 0, str.length);
	}
	function hashStrings(strings) {
	    const result = new Uint32Array(strings.length);
	    let index = 0;
	    for (const str of strings) {
	        result[index++] = fastHash(str);
	    }
	    return result;
	}
	// https://jsperf.com/string-startswith/21
	function fastStartsWith(haystack, needle) {
	    if (haystack.length < needle.length) {
	        return false;
	    }
	    const ceil = needle.length;
	    for (let i = 0; i < ceil; i += 1) {
	        if (haystack[i] !== needle[i]) {
	            return false;
	        }
	    }
	    return true;
	}
	function fastStartsWithFrom(haystack, needle, start) {
	    if (haystack.length - start < needle.length) {
	        return false;
	    }
	    const ceil = start + needle.length;
	    for (let i = start; i < ceil; i += 1) {
	        if (haystack[i] !== needle[i - start]) {
	            return false;
	        }
	    }
	    return true;
	}
	function isDigit(ch) {
	    // 48 == '0'
	    // 57 == '9'
	    return ch >= 48 && ch <= 57;
	}
	function isAlpha(ch) {
	    // 65 == 'A'
	    // 90 == 'Z'
	    // 97 == 'a'
	    // 122 === 'z'
	    return (ch >= 97 && ch <= 122) || (ch >= 65 && ch <= 90);
	}
	function isAlphaExtended(ch) {
	    // 192 -> 450
	    // À  Á  Â  Ã  Ä  Å  Æ  Ç  È  É  Ê  Ë  Ì  Í  Î  Ï  Ð  Ñ  Ò  Ó  Ô  Õ  Ö  ×  Ø
	    // Ù  Ú  Û  Ü  Ý  Þ  ß  à  á  â  ã  ä  å  æ  ç  è  é  ê  ë  ì  í  î  ï  ð  ñ
	    // ò  ó  ô  õ  ö  ÷  ø  ù  ú  û  ü  ý  þ  ÿ  Ā  ā  Ă  ă  Ą  ą  Ć  ć  Ĉ  ĉ  Ċ
	    // ċ  Č  č  Ď  ď  Đ  đ  Ē  ē  Ĕ  ĕ  Ė  ė  Ę  ę  Ě  ě  Ĝ  ĝ  Ğ  ğ  Ġ  ġ  Ģ  ģ
	    // Ĥ  ĥ  Ħ  ħ  Ĩ  ĩ  Ī  ī  Ĭ  ĭ  Į  į  İ  ı  Ĳ  ĳ  Ĵ  ĵ  Ķ  ķ  ĸ  Ĺ  ĺ  Ļ  ļ
	    // Ľ  ľ  Ŀ  ŀ  Ł  ł  Ń  ń  Ņ  ņ  Ň  ň  ŉ  Ŋ  ŋ  Ō  ō  Ŏ  ŏ  Ő  ő  Œ  œ  Ŕ  ŕ
	    // Ŗ  ŗ  Ř  ř  Ś  ś  Ŝ  ŝ  Ş  ş  Š  š  Ţ  ţ  Ť  ť  Ŧ  ŧ  Ũ  ũ  Ū  ū  Ŭ  ŭ  Ů
	    // ů  Ű  ű  Ų  ų  Ŵ  ŵ  Ŷ  ŷ  Ÿ  Ź  ź  Ż  ż  Ž  ž  ſ  ƀ  Ɓ  Ƃ  ƃ  Ƅ  ƅ  Ɔ  Ƈ
	    // ƈ  Ɖ  Ɗ  Ƌ  ƌ  ƍ  Ǝ  Ə  Ɛ  Ƒ  ƒ  Ɠ  Ɣ  ƕ  Ɩ  Ɨ  Ƙ  ƙ  ƚ  ƛ  Ɯ  Ɲ  ƞ  Ɵ  Ơ
	    // ơ  Ƣ  ƣ  Ƥ  ƥ  Ʀ  Ƨ  ƨ  Ʃ  ƪ  ƫ  Ƭ  ƭ  Ʈ  Ư  ư  Ʊ  Ʋ  Ƴ  ƴ  Ƶ  ƶ  Ʒ  Ƹ  ƹ
	    // ƺ  ƻ  Ƽ  ƽ  ƾ  ƿ  ǀ  ǁ  ǂ
	    return ch >= 192 && ch <= 450;
	}
	function isCyrillic(ch) {
	    // 1024 -> 1279
	    // Ѐ Ё Ђ Ѓ Є Ѕ І Ї Ј Љ Њ Ћ Ќ Ѝ Ў Џ А Б В Г Д Е Ж З И Й К Л М Н О П Р С Т У Ф Х
	    // Ц Ч Ш Щ Ъ Ы Ь Э Ю Я а б в г д е ж з и й к л м н о п р с т у ф х ц ч ш щ ъ ы
	    // ь э ю я ѐ ё ђ ѓ є ѕ і ї ј љ њ ћ ќ ѝ ў џ Ѡ ѡ Ѣ ѣ Ѥ ѥ Ѧ ѧ Ѩ ѩ Ѫ ѫ Ѭ ѭ Ѯ ѯ
	    // Ѱ ѱ Ѳ ѳ Ѵ ѵ Ѷ ѷ Ѹ ѹ Ѻ ѻ Ѽ ѽ Ѿ ѿ Ҁ ҁ ҂ ҃ ҄ ҅ ҆ ҇ ҈ ҉ Ҋ ҋ Ҍ ҍ Ҏ ҏ Ґ ґ Ғ ғ Ҕ ҕ Җ җ Ҙ ҙ
	    // Қ қ Ҝ ҝ Ҟ ҟ Ҡ ҡ Ң ң Ҥ ҥ Ҧ ҧ Ҩ ҩ Ҫ ҫ Ҭ ҭ Ү ү Ұ ұ Ҳ ҳ Ҵ ҵ Ҷ ҷ Ҹ ҹ Һ һ Ҽ ҽ Ҿ
	    // ҿ Ӏ Ӂ ӂ Ӄ ӄ Ӆ ӆ Ӈ ӈ Ӊ ӊ Ӌ ӌ Ӎ ӎ ӏ Ӑ ӑ Ӓ ӓ Ӕ ӕ Ӗ ӗ Ә ә Ӛ ӛ Ӝ ӝ Ӟ ӟ Ӡ ӡ Ӣ ӣ Ӥ
	    // ӥ Ӧ ӧ Ө ө Ӫ ӫ Ӭ ӭ Ӯ ӯ Ӱ ӱ Ӳ ӳ Ӵ ӵ Ӷ ӷ Ӹ ӹ Ӻ ӻ Ӽ ӽ Ӿ ӿ
	    return ch >= 1024 && ch <= 1279;
	}
	function isAllowedCode(ch) {
	    return (isAlpha(ch) || isDigit(ch) || ch === 37 /* '%' */ || isAlphaExtended(ch) || isCyrillic(ch));
	}
	function tokenizeWithWildcardsInPlace(pattern, skipFirstToken, skipLastToken, buffer) {
	    // TODO maybe better to check if buffer is full?
	    // Otherwise we are under-using the space.
	    const len = Math.min(pattern.length, buffer.remaining() * 2);
	    let inside = false;
	    let precedingCh = 0;
	    let start = 0;
	    let hash = HASH_SEED;
	    for (let i = 0; i < len; i += 1) {
	        const ch = pattern.charCodeAt(i);
	        if (isAllowedCode(ch) === true) {
	            if (inside === false) {
	                hash = HASH_SEED;
	                inside = true;
	                start = i;
	            }
	            hash = (hash * HASH_INTERNAL_MULT) ^ ch;
	        }
	        else {
	            if (inside === true) {
	                inside = false;
	                if (i - start > 1 && // Ignore tokens of 1 character
	                    ch !== 42 && // Ignore tokens followed by a '*'
	                    precedingCh !== 42 && // Ignore tokens preceeded by a '*'
	                    (skipFirstToken === false || start !== 0)) {
	                    buffer.push(hash >>> 0);
	                }
	            }
	            precedingCh = ch;
	        }
	    }
	    if (skipLastToken === false &&
	        inside === true &&
	        precedingCh !== 42 && // Ignore tokens preceeded by a '*'
	        pattern.length - start > 1 && // Ignore tokens of 1 character
	        buffer.full() === false) {
	        buffer.push(hash >>> 0);
	    }
	}
	function tokenizeInPlace(pattern, skipFirstToken, skipLastToken, buffer) {
	    const len = Math.min(pattern.length, buffer.remaining() * 2);
	    let inside = false;
	    let start = 0;
	    let hash = HASH_SEED;
	    for (let i = 0; i < len; i += 1) {
	        const ch = pattern.charCodeAt(i);
	        if (isAllowedCode(ch) === true) {
	            if (inside === false) {
	                hash = HASH_SEED;
	                inside = true;
	                start = i;
	            }
	            hash = (hash * HASH_INTERNAL_MULT) ^ ch;
	        }
	        else if (inside === true) {
	            inside = false;
	            if (i - start > 1 && // Ignore tokens of 1 character
	                (skipFirstToken === false || start !== 0)) {
	                buffer.push(hash >>> 0);
	            }
	        }
	    }
	    if (inside === true &&
	        skipLastToken === false &&
	        pattern.length - start > 1 && // Ignore tokens of 1 character
	        buffer.full() === false) {
	        buffer.push(hash >>> 0);
	    }
	}
	function tokenizeNoSkipInPlace(pattern, buffer) {
	    const len = Math.min(pattern.length, buffer.remaining() * 2);
	    let inside = false;
	    let start = 0;
	    let hash = HASH_SEED;
	    for (let i = 0; i < len; i += 1) {
	        const ch = pattern.charCodeAt(i);
	        if (isAllowedCode(ch) === true) {
	            if (inside === false) {
	                hash = HASH_SEED;
	                inside = true;
	                start = i;
	            }
	            hash = (hash * HASH_INTERNAL_MULT) ^ ch;
	        }
	        else if (inside === true) {
	            inside = false;
	            if (i - start > 1) {
	                buffer.push(hash >>> 0);
	            }
	        }
	    }
	    if (inside === true && pattern.length - start > 1 && buffer.full() === false) {
	        buffer.push(hash >>> 0);
	    }
	}
	function tokenizeNoSkip(pattern) {
	    TOKENS_BUFFER.reset();
	    tokenizeNoSkipInPlace(pattern, TOKENS_BUFFER);
	    return TOKENS_BUFFER.slice();
	}
	function tokenize$1(pattern, skipFirstToken, skipLastToken) {
	    TOKENS_BUFFER.reset();
	    tokenizeInPlace(pattern, skipFirstToken, skipLastToken, TOKENS_BUFFER);
	    return TOKENS_BUFFER.slice();
	}
	function tokenizeRegexInPlace(selector, tokens) {
	    let end = selector.length - 1;
	    let begin = 1;
	    let prev = 0;
	    // Try to find the longest safe *prefix* that we can tokenize
	    for (; begin < end; begin += 1) {
	        const code = selector.charCodeAt(begin);
	        // If we encounter '|' before any other opening bracket, then it's not safe
	        // to tokenize this filter (e.g.: 'foo|bar'). Instead we abort tokenization
	        // to be safe.
	        if (code === 124 /* '|' */) {
	            return;
	        }
	        if (code === 40 /* '(' */ ||
	            code === 42 /* '*' */ ||
	            code === 43 /* '+' */ ||
	            code === 63 /* '?' */ ||
	            code === 91 /* '[' */ ||
	            code === 123 /* '{' */ ||
	            (code === 46 /* '.' */ && prev !== 92) /* '\' */ ||
	            (code === 92 /* '\' */ && isAlpha(selector.charCodeAt(begin + 1)))) {
	            break;
	        }
	        prev = code;
	    }
	    // Try to find the longest safe *suffix* that we can tokenize
	    prev = 0;
	    for (; end >= begin; end -= 1) {
	        const code = selector.charCodeAt(end);
	        // If we encounter '|' before any other opening bracket, then it's not safe
	        // to tokenize this filter (e.g.: 'foo|bar'). Instead we abort tokenization
	        // to be safe.
	        if (code === 124 /* '|' */) {
	            return;
	        }
	        if (code === 41 /* ')' */ ||
	            code === 42 /* '*' */ ||
	            code === 43 /* '+' */ ||
	            code === 63 /* '?' */ ||
	            code === 93 /* ']' */ ||
	            code === 125 /* '}' */ ||
	            (code === 46 /* '.' */ && selector.charCodeAt(end - 1) !== 92) /* '\' */ ||
	            (code === 92 /* '\' */ && isAlpha(prev))) {
	            break;
	        }
	        prev = code;
	    }
	    if (end < begin) {
	        // Full selector is safe
	        const skipFirstToken = selector.charCodeAt(1) !== 94; /* '^' */
	        const skipLastToken = selector.charCodeAt(selector.length - 1) !== 36; /* '$' */
	        tokenizeInPlace(selector.slice(1, selector.length - 1), skipFirstToken, skipLastToken, tokens);
	    }
	    else {
	        // Tokenize prefix
	        if (begin > 1) {
	            tokenizeInPlace(selector.slice(1, begin), selector.charCodeAt(1) !== 94 /* '^' */, // skipFirstToken
	            true, tokens);
	        }
	        // Tokenize suffix
	        if (end < selector.length - 1) {
	            tokenizeInPlace(selector.slice(end + 1, selector.length - 1), true, selector.charCodeAt(selector.length - 1) !== 94 /* '^' */, // skipLastToken
	            tokens);
	        }
	    }
	}
	function binSearch(arr, elt) {
	    if (arr.length === 0) {
	        return -1;
	    }
	    let low = 0;
	    let high = arr.length - 1;
	    while (low <= high) {
	        const mid = (low + high) >>> 1;
	        const midVal = arr[mid];
	        if (midVal < elt) {
	            low = mid + 1;
	        }
	        else if (midVal > elt) {
	            high = mid - 1;
	        }
	        else {
	            return mid;
	        }
	    }
	    return -1;
	}
	function binLookup(arr, elt) {
	    return binSearch(arr, elt) !== -1;
	}
	// eslint-disable-next-line no-control-regex
	const hasUnicodeRe = /[^\u0000-\u00ff]/;
	function hasUnicode(str) {
	    return hasUnicodeRe.test(str);
	}
	/**
	 * Finds the last index of an unescaped character in the given string.
	 * This function tries to find the match from the backward.
	 * When this function sees an escaping character, it will jump to the next index.
	 */
	function findLastIndexOfUnescapedCharacter(text, character) {
	    let lastIndex = text.lastIndexOf(character);
	    if (lastIndex === -1) {
	        return -1;
	    }
	    while (lastIndex > 0 && text.charCodeAt(lastIndex - 1) === 92 /* '\\' */) {
	        lastIndex = text.lastIndexOf(character, lastIndex - 1);
	    }
	    return lastIndex;
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	const TLDTS_OPTIONS = {
	    extractHostname: true,
	    mixedInputs: false,
	    validateHostname: false,
	};
	const NORMALIZED_TYPE_TOKEN = {
	    beacon: fastHash('type:beacon'),
	    cspReport: fastHash('type:csp'),
	    csp_report: fastHash('type:csp'),
	    cspviolationreport: fastHash('type:cspviolationreport'),
	    document: fastHash('type:document'),
	    eventsource: fastHash('type:other'),
	    fetch: fastHash('type:xhr'),
	    font: fastHash('type:font'),
	    image: fastHash('type:image'),
	    imageset: fastHash('type:image'),
	    mainFrame: fastHash('type:document'),
	    main_frame: fastHash('type:document'),
	    manifest: fastHash('type:other'),
	    media: fastHash('type:media'),
	    object: fastHash('type:object'),
	    object_subrequest: fastHash('type:object'),
	    other: fastHash('type:other'),
	    ping: fastHash('type:ping'),
	    prefetch: fastHash('type:other'),
	    preflight: fastHash('type:preflight'),
	    script: fastHash('type:script'),
	    signedexchange: fastHash('type:signedexchange'),
	    speculative: fastHash('type:other'),
	    stylesheet: fastHash('type:stylesheet'),
	    subFrame: fastHash('type:subdocument'),
	    sub_frame: fastHash('type:subdocument'),
	    texttrack: fastHash('type:other'),
	    webSocket: fastHash('type:websocket'),
	    web_manifest: fastHash('type:other'),
	    websocket: fastHash('type:websocket'),
	    xhr: fastHash('type:xhr'),
	    xml_dtd: fastHash('type:other'),
	    xmlhttprequest: fastHash('type:xhr'),
	    xslt: fastHash('type:other'),
	};
	function hashHostnameBackward(hostname) {
	    let hash = HASH_SEED;
	    for (let j = hostname.length - 1; j >= 0; j -= 1) {
	        hash = (hash * HASH_INTERNAL_MULT) ^ hostname.charCodeAt(j);
	    }
	    return hash >>> 0;
	}
	function getHashesFromLabelsBackward(hostname, end, startOfDomain) {
	    TOKENS_BUFFER.reset();
	    let hash = HASH_SEED;
	    // Compute hash backward, label per label
	    for (let i = end - 1; i >= 0; i -= 1) {
	        const code = hostname.charCodeAt(i);
	        // Process label
	        if (code === 46 /* '.' */ && i < startOfDomain) {
	            TOKENS_BUFFER.push(hash >>> 0);
	        }
	        // Update hash
	        hash = (hash * HASH_INTERNAL_MULT) ^ code;
	    }
	    TOKENS_BUFFER.push(hash >>> 0);
	    return TOKENS_BUFFER.slice();
	}
	/**
	 * Given a hostname and its domain, return the hostname without the public
	 * suffix. We know that the domain, with one less label on the left, will be a
	 * the public suffix; and from there we know which trailing portion of
	 * `hostname` we should remove.
	 */
	function getHostnameWithoutPublicSuffix(hostname, domain) {
	    let hostnameWithoutPublicSuffix = null;
	    const indexOfDot = domain.indexOf('.');
	    if (indexOfDot !== -1) {
	        const publicSuffix = domain.slice(indexOfDot + 1);
	        hostnameWithoutPublicSuffix = hostname.slice(0, -publicSuffix.length - 1);
	    }
	    return hostnameWithoutPublicSuffix;
	}
	function getEntityHashesFromLabelsBackward(hostname, domain) {
	    const hostnameWithoutPublicSuffix = getHostnameWithoutPublicSuffix(hostname, domain);
	    if (hostnameWithoutPublicSuffix !== null) {
	        return getHashesFromLabelsBackward(hostnameWithoutPublicSuffix, hostnameWithoutPublicSuffix.length, hostnameWithoutPublicSuffix.length);
	    }
	    return EMPTY_UINT32_ARRAY$1;
	}
	function getHostnameHashesFromLabelsBackward(hostname, domain) {
	    return getHashesFromLabelsBackward(hostname, hostname.length, hostname.length - domain.length);
	}
	function isThirdParty(hostname, domain, sourceHostname, sourceDomain, type) {
	    if (type === 'main_frame' || type === 'mainFrame') {
	        return false;
	    }
	    else if (domain.length !== 0 && sourceDomain.length !== 0) {
	        return domain !== sourceDomain;
	    }
	    else if (domain.length !== 0 && sourceHostname.length !== 0) {
	        return domain !== sourceHostname;
	    }
	    else if (sourceDomain.length !== 0 && hostname.length !== 0) {
	        return hostname !== sourceDomain;
	    }
	    return false;
	}
	class Request {
	    /**
	     * Create an instance of `Request` from raw request details.
	     */
	    static fromRawDetails({ requestId = '0', tabId = 0, url = '', hostname, domain, sourceUrl = '', sourceHostname, sourceDomain, type = 'main_frame', _originalRequestDetails, }) {
	        url = url.toLowerCase();
	        if (hostname === undefined || domain === undefined) {
	            const parsed = parse$1(url, TLDTS_OPTIONS);
	            hostname = hostname || parsed.hostname || '';
	            domain = domain || parsed.domain || '';
	        }
	        // Initialize source URL
	        if (sourceHostname === undefined || sourceDomain === undefined) {
	            const parsed = parse$1(sourceHostname || sourceDomain || sourceUrl, TLDTS_OPTIONS);
	            sourceHostname = sourceHostname || parsed.hostname || '';
	            sourceDomain = sourceDomain || parsed.domain || sourceHostname || '';
	        }
	        return new Request({
	            requestId,
	            tabId,
	            domain,
	            hostname,
	            url,
	            sourceDomain,
	            sourceHostname,
	            sourceUrl,
	            type,
	            _originalRequestDetails,
	        });
	    }
	    constructor({ requestId, tabId, type, domain, hostname, url, sourceDomain, sourceHostname, _originalRequestDetails, }) {
	        // Lazy attributes
	        this.tokens = undefined;
	        this.hostnameHashes = undefined;
	        this.entityHashes = undefined;
	        this._originalRequestDetails = _originalRequestDetails;
	        this.id = requestId;
	        this.tabId = tabId;
	        this.type = type;
	        this.url = url;
	        this.hostname = hostname;
	        this.domain = domain;
	        this.sourceHostnameHashes =
	            sourceHostname.length === 0
	                ? EMPTY_UINT32_ARRAY$1
	                : getHostnameHashesFromLabelsBackward(sourceHostname, sourceDomain);
	        this.sourceEntityHashes =
	            sourceHostname.length === 0
	                ? EMPTY_UINT32_ARRAY$1
	                : getEntityHashesFromLabelsBackward(sourceHostname, sourceDomain);
	        // Decide on partiness
	        this.isThirdParty = isThirdParty(hostname, domain, sourceHostname, sourceDomain, type);
	        this.isFirstParty = !this.isThirdParty;
	        // Check protocol
	        this.isSupported = true;
	        if (this.type === 'websocket' || this.url.startsWith('ws:') || this.url.startsWith('wss:')) {
	            this.isHttp = false;
	            this.isHttps = false;
	            this.type = 'websocket';
	            this.isSupported = true;
	        }
	        else if (this.url.startsWith('http:')) {
	            this.isHttp = true;
	            this.isHttps = false;
	        }
	        else if (this.url.startsWith('https:')) {
	            this.isHttps = true;
	            this.isHttp = false;
	        }
	        else if (this.url.startsWith('data:')) {
	            this.isHttp = false;
	            this.isHttps = false;
	            // Only keep prefix of URL
	            const indexOfComa = this.url.indexOf(',');
	            if (indexOfComa !== -1) {
	                this.url = this.url.slice(0, indexOfComa);
	            }
	        }
	        else {
	            this.isHttp = false;
	            this.isHttps = false;
	            this.isSupported = false;
	        }
	    }
	    getHostnameHashes() {
	        if (this.hostnameHashes === undefined) {
	            this.hostnameHashes =
	                this.hostname.length === 0
	                    ? EMPTY_UINT32_ARRAY$1
	                    : getHostnameHashesFromLabelsBackward(this.hostname, this.domain);
	        }
	        return this.hostnameHashes;
	    }
	    getEntityHashes() {
	        if (this.entityHashes === undefined) {
	            this.entityHashes =
	                this.hostname.length === 0
	                    ? EMPTY_UINT32_ARRAY$1
	                    : getEntityHashesFromLabelsBackward(this.hostname, this.domain);
	        }
	        return this.entityHashes;
	    }
	    getTokens() {
	        if (this.tokens === undefined) {
	            TOKENS_BUFFER.reset();
	            for (const hash of this.sourceHostnameHashes) {
	                TOKENS_BUFFER.push(hash);
	            }
	            // Add token corresponding to request type
	            TOKENS_BUFFER.push(NORMALIZED_TYPE_TOKEN[this.type]);
	            tokenizeNoSkipInPlace(this.url, TOKENS_BUFFER);
	            this.tokens = TOKENS_BUFFER.slice();
	        }
	        return this.tokens;
	    }
	    isMainFrame() {
	        return this.type === 'main_frame' || this.type === 'mainFrame';
	    }
	    isSubFrame() {
	        return this.type === 'sub_frame' || this.type === 'subFrame';
	    }
	    /**
	     * Calling this method will attempt to guess the type of a request based on
	     * information found in `url` only. This can be useful to try and fine-tune
	     * the type of a Request when it is not otherwise available or if it was
	     * inferred as 'other'.
	     */
	    guessTypeOfRequest() {
	        const currentType = this.type;
	        this.type = getRequestType(this.url);
	        if (currentType !== this.type) {
	            this.tokens = undefined;
	        }
	        return this.type;
	    }
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	class Domains {
	    static parse(parts, debug = false) {
	        if (parts.length === 0) {
	            return undefined;
	        }
	        const entities = [];
	        const notEntities = [];
	        const hostnames = [];
	        const notHostnames = [];
	        for (let hostname of parts) {
	            if (hasUnicode(hostname)) {
	                hostname = toASCII(hostname);
	            }
	            const negation = hostname.charCodeAt(0) === 126; /* '~' */
	            const entity = hostname.charCodeAt(hostname.length - 1) === 42 /* '*' */ &&
	                hostname.charCodeAt(hostname.length - 2) === 46; /* '.' */
	            const start = negation ? 1 : 0;
	            const end = entity ? hostname.length - 2 : hostname.length;
	            const hash = hashHostnameBackward(negation === true || entity === true ? hostname.slice(start, end) : hostname);
	            if (negation) {
	                if (entity) {
	                    notEntities.push(hash);
	                }
	                else {
	                    notHostnames.push(hash);
	                }
	            }
	            else {
	                if (entity) {
	                    entities.push(hash);
	                }
	                else {
	                    hostnames.push(hash);
	                }
	            }
	        }
	        return new Domains({
	            entities: entities.length !== 0 ? new Uint32Array(entities).sort() : undefined,
	            hostnames: hostnames.length !== 0 ? new Uint32Array(hostnames).sort() : undefined,
	            notEntities: notEntities.length !== 0 ? new Uint32Array(notEntities).sort() : undefined,
	            notHostnames: notHostnames.length !== 0 ? new Uint32Array(notHostnames).sort() : undefined,
	            parts: debug === true ? parts.join(',') : undefined,
	        });
	    }
	    static deserialize(buffer) {
	        const optionalParts = buffer.getUint8();
	        // The order of these fields should be the same as when we serialize them.
	        return new Domains({
	            entities: (optionalParts & 1) === 1 ? buffer.getUint32Array() : undefined,
	            hostnames: (optionalParts & 2) === 2 ? buffer.getUint32Array() : undefined,
	            notEntities: (optionalParts & 4) === 4 ? buffer.getUint32Array() : undefined,
	            notHostnames: (optionalParts & 8) === 8 ? buffer.getUint32Array() : undefined,
	            parts: (optionalParts & 16) === 16 ? buffer.getUTF8() : undefined,
	        });
	    }
	    constructor({ entities, hostnames, notEntities, notHostnames, parts, }) {
	        // Hostname constraints
	        this.entities = entities;
	        this.hostnames = hostnames;
	        // Hostname exceptions
	        this.notEntities = notEntities;
	        this.notHostnames = notHostnames;
	        // Debug
	        this.parts = parts;
	    }
	    updateId(hash) {
	        const { hostnames, entities, notHostnames, notEntities } = this;
	        if (hostnames !== undefined) {
	            for (const hostname of hostnames) {
	                hash = (hash * HASH_INTERNAL_MULT) ^ hostname;
	            }
	        }
	        if (entities !== undefined) {
	            for (const entity of entities) {
	                hash = (hash * HASH_INTERNAL_MULT) ^ entity;
	            }
	        }
	        if (notHostnames !== undefined) {
	            for (const notHostname of notHostnames) {
	                hash = (hash * HASH_INTERNAL_MULT) ^ notHostname;
	            }
	        }
	        if (notEntities !== undefined) {
	            for (const notEntity of notEntities) {
	                hash = (hash * HASH_INTERNAL_MULT) ^ notEntity;
	            }
	        }
	        return hash;
	    }
	    serialize(buffer) {
	        // Mandatory fields
	        const index = buffer.getPos();
	        buffer.pushUint8(0);
	        // This bit-mask indicates which optional parts of the filter were serialized.
	        let optionalParts = 0;
	        if (this.entities !== undefined) {
	            optionalParts |= 1;
	            buffer.pushUint32Array(this.entities);
	        }
	        if (this.hostnames !== undefined) {
	            optionalParts |= 2;
	            buffer.pushUint32Array(this.hostnames);
	        }
	        if (this.notEntities !== undefined) {
	            optionalParts |= 4;
	            buffer.pushUint32Array(this.notEntities);
	        }
	        if (this.notHostnames !== undefined) {
	            optionalParts |= 8;
	            buffer.pushUint32Array(this.notHostnames);
	        }
	        if (this.parts !== undefined) {
	            optionalParts |= 16;
	            buffer.pushUTF8(this.parts);
	        }
	        buffer.setByte(index, optionalParts);
	    }
	    getSerializedSize() {
	        let estimate = 1; // optional parts (1 byte)
	        if (this.entities !== undefined) {
	            estimate += sizeOfUint32Array(this.entities);
	        }
	        if (this.hostnames !== undefined) {
	            estimate += sizeOfUint32Array(this.hostnames);
	        }
	        if (this.notHostnames !== undefined) {
	            estimate += sizeOfUint32Array(this.notHostnames);
	        }
	        if (this.notEntities !== undefined) {
	            estimate += sizeOfUint32Array(this.notEntities);
	        }
	        if (this.parts !== undefined) {
	            estimate += sizeOfUTF8(this.parts);
	        }
	        return estimate;
	    }
	    match(hostnameHashes, entityHashes) {
	        // Check if `hostname` is blacklisted
	        if (this.notHostnames !== undefined) {
	            for (const hash of hostnameHashes) {
	                if (binLookup(this.notHostnames, hash)) {
	                    return false;
	                }
	            }
	        }
	        // Check if `hostname` is blacklisted by *entity*
	        if (this.notEntities !== undefined) {
	            for (const hash of entityHashes) {
	                if (binLookup(this.notEntities, hash)) {
	                    return false;
	                }
	            }
	        }
	        // Check if `hostname` is allowed
	        if (this.hostnames !== undefined || this.entities !== undefined) {
	            if (this.hostnames !== undefined) {
	                for (const hash of hostnameHashes) {
	                    if (binLookup(this.hostnames, hash)) {
	                        return true;
	                    }
	                }
	            }
	            if (this.entities !== undefined) {
	                for (const hash of entityHashes) {
	                    if (binLookup(this.entities, hash)) {
	                        return true;
	                    }
	                }
	            }
	            return false;
	        }
	        return true;
	    }
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	function extractHTMLSelectorFromRule(rule) {
	    if (rule.startsWith('^script') === false) {
	        return undefined;
	    }
	    const prefix = ':has-text(';
	    const selectors = [];
	    let index = 7;
	    // ^script:has-text
	    //        ^ 7
	    // Prepare for finding one or more ':has-text(' selectors in a row
	    while (rule.startsWith(prefix, index)) {
	        index += prefix.length;
	        let currentParsingDepth = 1;
	        const startOfSelectorIndex = index;
	        let prev = -1; // previous character
	        for (; index < rule.length && currentParsingDepth !== 0; index += 1) {
	            const code = rule.charCodeAt(index);
	            if (prev !== 92 /* '\' */) {
	                if (code === 40 /* '(' */) {
	                    currentParsingDepth += 1;
	                }
	                if (code === 41 /* ')' */) {
	                    currentParsingDepth -= 1;
	                }
	            }
	            prev = code;
	        }
	        selectors.push(rule.slice(startOfSelectorIndex, index - 1));
	    }
	    if (index !== rule.length) {
	        return undefined;
	    }
	    return ['script', selectors];
	}
	function extractTagsFromHtml(html, tag) {
	    const tags = [];
	    const prefix = `<${tag}`;
	    const suffix = `</${tag}>`;
	    // Keep track of the beginning of current identified tag
	    let index = html.indexOf(prefix);
	    // Keep tracks of index immediately following last extracted tag
	    let endOfLastTag = 0;
	    while (index !== -1) {
	        // Find index of end of current tag. If we do not find it, it could be
	        // because it will come in the next chunk and we should try parsing it
	        // again then.
	        const endOfTagIndex = html.indexOf('>', index + prefix.length);
	        if (endOfTagIndex === -1) {
	            return [tags, html.slice(0, index), html.slice(index)];
	        }
	        // Handle short tag form <tag/> which will not have a closing tag.
	        if (html.charCodeAt(endOfTagIndex - 1) === 47 /* '/' */) {
	            endOfLastTag = endOfTagIndex + 1;
	            tags.push([index, html.slice(index, endOfLastTag)]);
	        }
	        else {
	            // Find index of closing tag '</tag>'. If we do not find it, again, it
	            // could mean that it will come in next chunk and we need to try parsing
	            // it again with more input.
	            const indexOfClosingTag = html.indexOf(suffix, endOfTagIndex);
	            if (indexOfClosingTag === -1) {
	                return [tags, html.slice(0, index), html.slice(index)];
	            }
	            tags.push([index, html.slice(index, indexOfClosingTag + suffix.length)]);
	            endOfLastTag = indexOfClosingTag + suffix.length;
	        }
	        index = html.indexOf(prefix, endOfLastTag);
	    }
	    // Make sure we consume as much input as possible so that we do not parse the
	    // same portion of HTML again next time and we can stream chunks as early as
	    // possible.
	    //
	    // We check if there is at least one '<' char after the end of the last
	    // extracted tag; this would indicate that the next chunk might contain the
	    // remaining of a valid tag. We then look up to N characters after this '<'
	    // character, where N is the size of 'prefix'. The rational is that if we
	    // reached this part of the code, then it cannot be a match otherwise we
	    // would have returned earlier (from the loop).
	    let lastClosingTagIndex = html.lastIndexOf('>');
	    if (lastClosingTagIndex === -1) {
	        lastClosingTagIndex = endOfLastTag;
	    }
	    const indexOfNextTag = html.indexOf('<', lastClosingTagIndex);
	    // If no '<' in the remaining of input, then it means we can count this chunk
	    // as fully parsed (i.e.: next chunk can be parsed independently without
	    // missing a tag which would start in this one).
	    if (indexOfNextTag === -1) {
	        return [tags, html, ''];
	    }
	    // In case of a partial tag ending this 'html' chunk. Then check if we have
	    // enough information to discard it already based on the kind of tags we are
	    // looking for.
	    if (html.length - indexOfNextTag >= prefix.length ||
	        prefix.startsWith(html.slice(indexOfNextTag)) === false) {
	        return [tags, html, ''];
	    }
	    return [tags, html.slice(0, indexOfNextTag), html.slice(indexOfNextTag)];
	}
	function extractSelectorsFromRules(filter) {
	    const patterns = [];
	    for (const [, selectors] of filter) {
	        const plainPatterns = [];
	        const regexpPatterns = [];
	        for (const selector of selectors) {
	            if (selector.charCodeAt(0) === 47 /* '/' */) {
	                if (selector.endsWith('/')) {
	                    regexpPatterns.push(new RegExp(selector.slice(1, -1)));
	                }
	                else if (selector.endsWith('/i')) {
	                    regexpPatterns.push(new RegExp(selector.slice(1, -2), 'i'));
	                }
	            }
	            else {
	                plainPatterns.push(selector);
	            }
	        }
	        if (plainPatterns.length !== 0 || regexpPatterns.length !== 0) {
	            patterns.push([plainPatterns, regexpPatterns]);
	        }
	    }
	    return patterns;
	}
	/**
	 * Check if `tag` should be removed from HTML based on `plainPatterns` and
	 * `regexpPatterns`. For a tag to be removed, all elements from `plainPatterns`
	 * and `regexpPatterns` must match.
	 */
	function tagShouldBeRemoved(tag, plainPatterns, regexpPatterns) {
	    for (const pattern of plainPatterns) {
	        if (tag.indexOf(pattern) === -1) {
	            return false;
	        }
	    }
	    for (const pattern of regexpPatterns) {
	        if (pattern.test(tag) === false) {
	            return false;
	        }
	    }
	    return true;
	}
	function selectTagsToRemove(patterns, tags) {
	    const toRemove = [];
	    for (const tag of tags) {
	        for (const [plainPatterns, regexpPatterns] of patterns) {
	            if (tagShouldBeRemoved(tag[1], plainPatterns, regexpPatterns)) {
	                toRemove.push(tag);
	                break;
	            }
	        }
	    }
	    return toRemove;
	}
	function removeTagsFromHtml(html, toRemove) {
	    if (toRemove.length === 0) {
	        return html;
	    }
	    let filteredHtml = html;
	    toRemove.reverse(); // make sure to remove from last to first tag (preserve indices)
	    for (const [index, tag] of toRemove) {
	        filteredHtml = filteredHtml.slice(0, index) + filteredHtml.slice(index + tag.length);
	    }
	    return filteredHtml;
	}
	class StreamingHtmlFilter {
	    constructor(selectors) {
	        this.buffer = '';
	        this.patterns = extractSelectorsFromRules(selectors);
	    }
	    flush() {
	        return this.buffer;
	    }
	    write(chunk) {
	        // If there are no valid selectors, abort.
	        if (this.patterns.length === 0) {
	            return chunk;
	        }
	        // If given an empty string, abort.
	        if (chunk.length === 0) {
	            return chunk;
	        }
	        // Accumulate buffer + new data
	        this.buffer += chunk;
	        // Parse tags from `this.buffer`
	        const [tags, parsed, rest] = extractTagsFromHtml(this.buffer, 'script');
	        this.buffer = rest;
	        // If no tags were found, just return the parsed version
	        if (tags.length === 0) {
	            return parsed;
	        }
	        // Perform tags filtering using `this.patterns` and `this.regexps`.
	        return removeTagsFromHtml(parsed, selectTagsToRemove(this.patterns, tags));
	    }
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	const EMPTY_TOKENS = [EMPTY_UINT32_ARRAY$1];
	const DEFAULT_HIDDING_STYLE = 'display: none !important;';
	const REGEXP_UNICODE_COMMA = new RegExp(/\\u002C/, 'g');
	const REGEXP_UNICODE_BACKSLASH = new RegExp(/\\u005C/, 'g');
	const REGEXP_ESCAPED_COMMA = new RegExp(/\\,/, 'g');
	/**
	 * Given a `selector` starting with either '#' or '.' check if what follows is
	 * a simple CSS selector: /^-?[_a-zA-Z]+[_a-zA-Z0-9-]*$/
	 */
	function isSimpleSelector(selector) {
	    for (let i = 1; i < selector.length; i += 1) {
	        const code = selector.charCodeAt(i);
	        if (!(code === 45 /* '-' */ ||
	            code === 95 /* '_' */ ||
	            (code >= 48 && code <= 57) /* [0-9] */ ||
	            (code >= 65 && code <= 90) /* [A-Z] */ ||
	            (code >= 97 && code <= 122)) /* [a-z] */) {
	            if (i < selector.length - 1) {
	                // Check if what follows is a ' >' or ' ~' or ' +', in which case we
	                // also consider it a simple selector and the token this filter can be
	                // indexed with is the first selector.
	                const nextCode = selector.charCodeAt(i + 1);
	                if (code === 91 /* '[' */ ||
	                    code === 46 /* '.' */ ||
	                    code === 58 /* ':' */ ||
	                    (code === 32 /* ' ' */ &&
	                        (nextCode === 62 /* '>' */ ||
	                            nextCode === 43 /* '+' */ ||
	                            nextCode === 126 /* '~' */ ||
	                            nextCode === 46 /* '.' */ ||
	                            nextCode === 35)) /* '#' */) {
	                    return true;
	                }
	            }
	            return false;
	        }
	    }
	    return true;
	}
	/**
	 * Given a `selector` starting with either 'a[' or '[', check if what follows
	 * is a simple href attribute selector of the form: 'href^=' or 'href*='.
	 */
	function isSimpleHrefSelector(selector, start) {
	    return (selector.startsWith('href^="', start) ||
	        selector.startsWith('href*="', start) ||
	        selector.startsWith('href="', start));
	}
	/**
	 * Validate CSS selector. There is a fast path for simple selectors (e.g.: #foo
	 * or .bar) which are the most common case. For complex ones, we rely on
	 * `Element.matches` (if available).
	 */
	const isValidCss = (() => {
	    const div = typeof document !== 'undefined'
	        ? document.createElement('div')
	        : {
	            matches: () => {
	                /* noop */
	            },
	        };
	    const matches = (selector) => div.matches(selector);
	    const validSelectorRe = /^[#.]?[\w-.]+$/;
	    return function isValidCssImpl(selector) {
	        if (validSelectorRe.test(selector)) {
	            return true;
	        }
	        try {
	            matches(selector);
	        }
	        catch (ex) {
	            return false;
	        }
	        return true;
	    };
	})();
	/**
	 * Masks used to store options of cosmetic filters in a bitmask.
	 */
	var COSMETICS_MASK;
	(function (COSMETICS_MASK) {
	    COSMETICS_MASK[COSMETICS_MASK["unhide"] = 1] = "unhide";
	    COSMETICS_MASK[COSMETICS_MASK["scriptInject"] = 2] = "scriptInject";
	    COSMETICS_MASK[COSMETICS_MASK["isUnicode"] = 4] = "isUnicode";
	    COSMETICS_MASK[COSMETICS_MASK["isClassSelector"] = 8] = "isClassSelector";
	    COSMETICS_MASK[COSMETICS_MASK["isIdSelector"] = 16] = "isIdSelector";
	    COSMETICS_MASK[COSMETICS_MASK["isHrefSelector"] = 32] = "isHrefSelector";
	    COSMETICS_MASK[COSMETICS_MASK["remove"] = 64] = "remove";
	    COSMETICS_MASK[COSMETICS_MASK["extended"] = 128] = "extended";
	})(COSMETICS_MASK || (COSMETICS_MASK = {}));
	function computeFilterId$1(mask, selector, domains, style) {
	    let hash = (HASH_SEED * HASH_INTERNAL_MULT) ^ mask;
	    if (selector !== undefined) {
	        for (let i = 0; i < selector.length; i += 1) {
	            hash = (hash * HASH_INTERNAL_MULT) ^ selector.charCodeAt(i);
	        }
	    }
	    if (domains !== undefined) {
	        hash = domains.updateId(hash);
	    }
	    if (style !== undefined) {
	        for (let i = 0; i < style.length; i += 1) {
	            hash = (hash * HASH_INTERNAL_MULT) ^ style.charCodeAt(i);
	        }
	    }
	    return hash >>> 0;
	}
	/***************************************************************************
	 *  Cosmetic filters parsing
	 * ************************************************************************ */
	class CosmeticFilter {
	    /**
	     * Given a line that we know contains a cosmetic filter, create a CosmeticFiler
	     * instance out of it. This function should be *very* efficient, as it will be
	     * used to parse tens of thousands of lines.
	     */
	    static parse(line, debug = false) {
	        const rawLine = line;
	        // Mask to store attributes. Each flag (unhide, scriptInject, etc.) takes
	        // only 1 bit at a specific offset defined in COSMETICS_MASK.
	        // cf: COSMETICS_MASK for the offset of each property
	        let mask = 0;
	        let selector;
	        let domains;
	        let style;
	        const sharpIndex = line.indexOf('#');
	        // Start parsing the line
	        const afterSharpIndex = sharpIndex + 1;
	        let suffixStartIndex = afterSharpIndex + 1;
	        // hostname1,hostname2#?#.selector
	        // hostname1,hostname2#@#.selector
	        //                    ^^ ^
	        //                    || |
	        //                    || suffixStartIndex
	        //                    |afterSharpIndex
	        //                    sharpIndex
	        // Check if unhide
	        if (line.length > afterSharpIndex) {
	            if (line[afterSharpIndex] === '@') {
	                mask = setBit(mask, COSMETICS_MASK.unhide);
	                suffixStartIndex += 1;
	            }
	            else if (line[afterSharpIndex] === '?') {
	                suffixStartIndex += 1;
	            }
	        }
	        if (suffixStartIndex >= line.length) {
	            return null;
	        }
	        // Parse hostnames and entitites as well as their negations.
	        //
	        // - ~hostname##.selector
	        // - hostname##.selector
	        // - entity.*##.selector
	        // - ~entity.*##.selector
	        //
	        // Each kind will have its own Uint32Array containing hashes, sorted by
	        // number of labels considered. This allows a compact representation of
	        // hostnames and fast matching without any string copy.
	        if (sharpIndex > 0) {
	            domains = Domains.parse(line.slice(0, sharpIndex).split(','), debug);
	        }
	        if (line.endsWith(':remove()')) {
	            // ##selector:remove()
	            mask = setBit(mask, COSMETICS_MASK.remove);
	            mask = setBit(mask, COSMETICS_MASK.extended);
	            line = line.slice(0, -9);
	        }
	        else if (line.length - suffixStartIndex >= 8 &&
	            line.endsWith(')') &&
	            line.indexOf(':style(', suffixStartIndex) !== -1) {
	            // ##selector:style(...)
	            const indexOfStyle = line.indexOf(':style(', suffixStartIndex);
	            style = line.slice(indexOfStyle + 7, -1);
	            line = line.slice(0, indexOfStyle);
	        }
	        // Deal with HTML filters
	        if (line.charCodeAt(suffixStartIndex) === 94 /* '^' */) {
	            if (fastStartsWithFrom(line, 'script:has-text(', suffixStartIndex + 1) === false ||
	                line.charCodeAt(line.length - 1) !== 41 /* ')' */) {
	                return null;
	            }
	            // NOTE: currently only ^script:has-text(...) is supported.
	            //
	            //   ^script:has-text(selector)
	            //   ^                         ^
	            //   |                         |
	            //   |                         |
	            //   |                         line.length
	            //   |
	            //   suffixStartIndex
	            //
	            selector = line.slice(suffixStartIndex, line.length);
	            if (extractHTMLSelectorFromRule(selector) === undefined) {
	                return null;
	            }
	        }
	        else if (line.length - suffixStartIndex > 4 &&
	            line.charCodeAt(suffixStartIndex) === 43 /* '+' */ &&
	            fastStartsWithFrom(line, '+js(', suffixStartIndex)) {
	            // Generic scriptlets are invalid, unless they are un-hide
	            if ((domains === undefined ||
	                (domains.hostnames === undefined && domains.entities === undefined)) &&
	                getBit(mask, COSMETICS_MASK.unhide) === false) {
	                return null;
	            }
	            mask = setBit(mask, COSMETICS_MASK.scriptInject);
	            selector = line.slice(suffixStartIndex + 4, line.length - 1);
	            // An empty scriptlet (i.e. '+js()') can be specified to cancel injections
	            // on a specific domain or globally. It does not make sense though to have
	            // an empty scriptlet without an exception (i.e. '#@#' is mandatory).
	            if (getBit(mask, COSMETICS_MASK.unhide) === false && selector.length === 0) {
	                return null;
	            }
	        }
	        else {
	            selector = line.slice(suffixStartIndex);
	            const selectorType = classifySelector(selector);
	            if (selectorType === SelectorType.Extended) {
	                mask = setBit(mask, COSMETICS_MASK.extended);
	            }
	            else if (selectorType === SelectorType.Invalid || !isValidCss(selector)) {
	                // console.error('Invalid', line);
	                // TODO - maybe perform `isValidCss` from the other module.
	                return null;
	            }
	        }
	        // Extended selectors should always be specific to some domain.
	        if (domains === undefined && getBit(mask, COSMETICS_MASK.extended) === true) {
	            return null;
	        }
	        if (selector !== undefined) {
	            // Check if unicode appears in selector
	            if (hasUnicode(selector)) {
	                mask = setBit(mask, COSMETICS_MASK.isUnicode);
	            }
	            // Classify selector
	            if (getBit(mask, COSMETICS_MASK.scriptInject) === false &&
	                getBit(mask, COSMETICS_MASK.remove) === false &&
	                getBit(mask, COSMETICS_MASK.extended) === false &&
	                selector.startsWith('^') === false) {
	                const c0 = selector.charCodeAt(0);
	                const c1 = selector.charCodeAt(1);
	                const c2 = selector.charCodeAt(2);
	                // Check if we have a specific case of simple selector (id, class or
	                // href) These are the most common filters and will benefit greatly from
	                // a custom dispatch mechanism.
	                if (getBit(mask, COSMETICS_MASK.scriptInject) === false) {
	                    if (c0 === 46 /* '.' */ && isSimpleSelector(selector)) {
	                        mask = setBit(mask, COSMETICS_MASK.isClassSelector);
	                    }
	                    else if (c0 === 35 /* '#' */ && isSimpleSelector(selector)) {
	                        mask = setBit(mask, COSMETICS_MASK.isIdSelector);
	                    }
	                    else if (c0 === 97 /* a */ &&
	                        c1 === 91 /* '[' */ &&
	                        c2 === 104 /* 'h' */ &&
	                        isSimpleHrefSelector(selector, 2)) {
	                        mask = setBit(mask, COSMETICS_MASK.isHrefSelector);
	                    }
	                    else if (c0 === 91 /* '[' */ &&
	                        c1 === 104 /* 'h' */ &&
	                        isSimpleHrefSelector(selector, 1)) {
	                        mask = setBit(mask, COSMETICS_MASK.isHrefSelector);
	                    }
	                }
	            }
	        }
	        return new CosmeticFilter({
	            mask,
	            rawLine: debug === true ? rawLine : undefined,
	            selector,
	            style,
	            domains,
	        });
	    }
	    /**
	     * Deserialize cosmetic filters. The code accessing the buffer should be
	     * symetrical to the one in `serializeCosmeticFilter`.
	     */
	    static deserialize(buffer) {
	        const mask = buffer.getUint8();
	        const isUnicode = getBit(mask, COSMETICS_MASK.isUnicode);
	        const optionalParts = buffer.getUint8();
	        const selector = isUnicode ? buffer.getUTF8() : buffer.getCosmeticSelector();
	        // The order of these fields should be the same as when we serialize them.
	        return new CosmeticFilter({
	            // Mandatory fields
	            mask,
	            selector,
	            // Optional fields
	            domains: (optionalParts & 1) === 1 ? Domains.deserialize(buffer) : undefined,
	            rawLine: (optionalParts & 2) === 2 ? buffer.getRawCosmetic() : undefined,
	            style: (optionalParts & 4) === 4 ? buffer.getASCII() : undefined,
	        });
	    }
	    constructor({ mask, selector, domains, rawLine, style, }) {
	        this.mask = mask;
	        this.selector = selector;
	        this.domains = domains;
	        this.style = style;
	        this.id = undefined;
	        this.rawLine = rawLine;
	    }
	    isCosmeticFilter() {
	        return true;
	    }
	    isNetworkFilter() {
	        return false;
	    }
	    /**
	     * The format of a cosmetic filter is:
	     *
	     * | mask | selector length | selector... | hostnames length | hostnames...
	     *   32     16                              16
	     *
	     * The header (mask) is 32 bits, then we have a total of 32 bits to store the
	     * length of `selector` and `hostnames` (16 bits each).
	     *
	     * Improvements similar to the onces mentioned in `serializeNetworkFilters`
	     * could be applied here, to get a more compact representation.
	     */
	    serialize(buffer) {
	        // Mandatory fields
	        buffer.pushUint8(this.mask);
	        const index = buffer.getPos();
	        buffer.pushUint8(0);
	        if (this.isUnicode()) {
	            buffer.pushUTF8(this.selector);
	        }
	        else {
	            buffer.pushCosmeticSelector(this.selector);
	        }
	        // This bit-mask indicates which optional parts of the filter were serialized.
	        let optionalParts = 0;
	        if (this.domains !== undefined) {
	            optionalParts |= 1;
	            this.domains.serialize(buffer);
	        }
	        if (this.rawLine !== undefined) {
	            optionalParts |= 2;
	            buffer.pushRawCosmetic(this.rawLine);
	        }
	        if (this.style !== undefined) {
	            optionalParts |= 4;
	            buffer.pushASCII(this.style);
	        }
	        buffer.setByte(index, optionalParts);
	    }
	    /**
	     * Return an estimation of the size (in bytes) needed to persist this filter
	     * in a DataView. This does not need to be 100% accurate but should be an
	     * upper-bound. It should also be as fast as possible.
	     */
	    getSerializedSize(compression) {
	        let estimate = 1 + 1; // mask (1 byte) + optional parts (1 byte)
	        if (this.isUnicode()) {
	            estimate += sizeOfUTF8(this.selector);
	        }
	        else {
	            estimate += sizeOfCosmeticSelector(this.selector, compression);
	        }
	        if (this.domains !== undefined) {
	            estimate += this.domains.getSerializedSize();
	        }
	        if (this.rawLine !== undefined) {
	            estimate += sizeOfRawCosmetic(this.rawLine, compression);
	        }
	        if (this.style !== undefined) {
	            estimate += sizeOfASCII(this.style);
	        }
	        return estimate;
	    }
	    /**
	     * Create a more human-readable version of this filter. It is mainly used for
	     * debugging purpose, as it will expand the values stored in the bit mask.
	     */
	    toString() {
	        if (this.rawLine !== undefined) {
	            return this.rawLine;
	        }
	        let filter = '';
	        if (this.domains !== undefined) {
	            if (this.domains.parts !== undefined) {
	                filter += this.domains.parts;
	            }
	            else {
	                filter += '<hostnames>';
	            }
	        }
	        if (this.isUnhide()) {
	            filter += '#@#';
	        }
	        else {
	            filter += '##';
	        }
	        if (this.isScriptInject()) {
	            filter += '+js(';
	            filter += this.selector;
	            filter += ')';
	        }
	        else {
	            filter += this.selector;
	        }
	        return filter;
	    }
	    match(hostname, domain) {
	        // Not constraint on hostname, match is true
	        if (this.hasHostnameConstraint() === false) {
	            return true;
	        }
	        // No `hostname` available but this filter has some constraints on hostname.
	        if (!hostname && this.hasHostnameConstraint()) {
	            return false;
	        }
	        if (this.domains !== undefined) {
	            // TODO - this hashing could be re-used between cosmetics by using an
	            // abstraction like `Request` (similar to network filters matching).
	            // Maybe could we reuse `Request` directly without any change?
	            return this.domains.match(hostname.length === 0
	                ? EMPTY_UINT32_ARRAY$1
	                : getHostnameHashesFromLabelsBackward(hostname, domain), hostname.length === 0
	                ? EMPTY_UINT32_ARRAY$1
	                : getEntityHashesFromLabelsBackward(hostname, domain));
	        }
	        return true;
	    }
	    /**
	     * Get tokens for this filter. It can be indexed multiple times if multiple
	     * hostnames are specified (e.g.: host1,host2##.selector).
	     */
	    getTokens() {
	        const tokens = [];
	        // Note, we do not need to use negated domains or entities as tokens here
	        // since they will by definition not match on their own, unless accompanied
	        // by a domain or entity. Instead, they are handled in
	        // `CosmeticFilterBucket.getCosmeticsFilters(...)`.
	        if (this.domains !== undefined) {
	            const { hostnames, entities } = this.domains;
	            if (hostnames !== undefined) {
	                for (const hostname of hostnames) {
	                    tokens.push(new Uint32Array([hostname]));
	                }
	            }
	            if (entities !== undefined) {
	                for (const entity of entities) {
	                    tokens.push(new Uint32Array([entity]));
	                }
	            }
	        }
	        // Here we only take selector into account if the filter is not unHide.
	        if (tokens.length === 0 && this.isUnhide() === false) {
	            if (this.isIdSelector() || this.isClassSelector()) {
	                // Here we try to identify the end of selector si that we can extract a
	                // valid token out of it. In all these examples, 'selector' is our
	                // token:
	                //
	                //   .selector[...]
	                //   #selector[...]
	                //   #selector ~ foo
	                //   .selector:not(...)
	                //   .selector.foo
	                //
	                // We now try to identify the first valid end of selector which will
	                // also be the end of our token: space, bracket, colon, dot.
	                let endOfSelector = 1;
	                const selector = this.selector;
	                for (; endOfSelector < selector.length; endOfSelector += 1) {
	                    const code = selector.charCodeAt(endOfSelector);
	                    if (code === 32 /* ' ' */ ||
	                        code === 46 /* '.' */ ||
	                        code === 58 /* ':' */ ||
	                        code === 91 /* '[' */) {
	                        break;
	                    }
	                }
	                const arr = new Uint32Array(1);
	                arr[0] = fastHashBetween(selector, 1, endOfSelector);
	                tokens.push(arr);
	            }
	            else if (this.isHrefSelector() === true) {
	                const selector = this.getSelector();
	                // Locate 'href' in selector
	                let hrefIndex = selector.indexOf('href');
	                if (hrefIndex === -1) {
	                    return EMPTY_TOKENS;
	                }
	                hrefIndex += 4;
	                // Tokenize optimally depending on the kind of selector: 'href=',
	                // 'href*=', 'href^='.
	                let skipFirstToken = false;
	                let skipLastToken = true;
	                if (selector.charCodeAt(hrefIndex) === 42 /* '*' */) {
	                    // skip: '*'
	                    skipFirstToken = true;
	                    hrefIndex += 1;
	                }
	                else if (selector.charCodeAt(hrefIndex) === 94 /* '^' */) {
	                    // skip: '^'
	                    hrefIndex += 1;
	                }
	                else {
	                    skipLastToken = false;
	                }
	                hrefIndex += 2; // skip:  '="'
	                // Locate end of href
	                const hrefEnd = selector.indexOf('"', hrefIndex);
	                if (hrefEnd === -1) {
	                    // That cannot happen unless the filter is not well-formed. In this
	                    // case, we just return no tokens, which will result in this filter
	                    // ending up in the "wildcard" bucket of the index.
	                    return EMPTY_TOKENS;
	                }
	                tokens.push(tokenize$1(this.selector.slice(hrefIndex, hrefEnd), skipFirstToken, skipLastToken));
	            }
	        }
	        if (tokens.length === 0) {
	            return EMPTY_TOKENS;
	        }
	        return tokens;
	    }
	    parseScript() {
	        const selector = this.getSelector();
	        if (selector.length === 0) {
	            return undefined;
	        }
	        const parts = [];
	        let index = 0;
	        let lastComaIndex = -1;
	        let inDoubleQuotes = false;
	        let inSingleQuotes = false;
	        let inRegexp = false;
	        let objectNesting = 0;
	        let lastCharIsBackslash = false;
	        let inArgument = false;
	        for (; index < selector.length; index += 1) {
	            const char = selector[index];
	            if (lastCharIsBackslash === false) {
	                if (inDoubleQuotes === true) {
	                    if (char === '"') {
	                        inDoubleQuotes = false;
	                    }
	                }
	                else if (inSingleQuotes === true) {
	                    if (char === "'") {
	                        inSingleQuotes = false;
	                    }
	                }
	                else if (objectNesting !== 0) {
	                    if (char === '{') {
	                        objectNesting += 1;
	                    }
	                    else if (char === '}') {
	                        objectNesting -= 1;
	                    }
	                    else if (char === '"') {
	                        inDoubleQuotes = true;
	                    }
	                    else if (char === "'") {
	                        inSingleQuotes = true;
	                    }
	                }
	                else if (inRegexp === true) {
	                    if (char === '/') {
	                        inRegexp = false;
	                    }
	                }
	                else {
	                    if (inArgument === false) {
	                        if (char === ' ') ;
	                        else if (char === '"' && selector.indexOf('"', index + 1) > 0) {
	                            inDoubleQuotes = true;
	                        }
	                        else if (char === "'" && selector.indexOf("'", index + 1) > 0) {
	                            inSingleQuotes = true;
	                        }
	                        else if (char === '{' && selector.indexOf('}', index + 1) > 0) {
	                            objectNesting += 1;
	                        }
	                        else if (char === '/' && selector.indexOf('/', index + 1) > 0) {
	                            inRegexp = true;
	                        }
	                        else {
	                            inArgument = true;
	                        }
	                    }
	                    if (char === ',') {
	                        parts.push(selector.slice(lastComaIndex + 1, index).trim());
	                        lastComaIndex = index;
	                        inArgument = false;
	                    }
	                }
	            }
	            lastCharIsBackslash = char === '\\';
	        }
	        parts.push(selector.slice(lastComaIndex + 1).trim());
	        if (parts.length === 0) {
	            return undefined;
	        }
	        const args = parts
	            .slice(1)
	            .map((part) => {
	            if ((part.startsWith(`'`) && part.endsWith(`'`)) ||
	                (part.startsWith(`"`) && part.endsWith(`"`))) {
	                return part.substring(1, part.length - 1);
	            }
	            return part;
	        })
	            .map((part) => part
	            .replace(REGEXP_UNICODE_COMMA, ',')
	            .replace(REGEXP_UNICODE_BACKSLASH, '\\')
	            .replace(REGEXP_ESCAPED_COMMA, ','));
	        return { name: parts[0], args };
	    }
	    getScript(js) {
	        const parsed = this.parseScript();
	        if (parsed === undefined) {
	            return undefined;
	        }
	        const { name, args } = parsed;
	        let script = js.get(name);
	        if (script !== undefined) {
	            for (let i = 0; i < args.length; i += 1) {
	                // escape some characters so they wont get evaluated with escape characters during script injection
	                const arg = args[i].replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	                script = script.replace(`{{${i + 1}}}`, arg);
	            }
	            return script;
	        } // TODO - else throw an exception?
	        return undefined;
	    }
	    hasHostnameConstraint() {
	        return this.domains !== undefined;
	    }
	    getId() {
	        if (this.id === undefined) {
	            this.id = computeFilterId$1(this.mask, this.selector, this.domains, this.style);
	        }
	        return this.id;
	    }
	    hasCustomStyle() {
	        return this.style !== undefined;
	    }
	    getStyle() {
	        return this.style || DEFAULT_HIDDING_STYLE;
	    }
	    getStyleAttributeHash() {
	        return `s${fastHash(this.getStyle())}`;
	    }
	    getSelector() {
	        return this.selector;
	    }
	    getSelectorAST() {
	        return parse(this.getSelector());
	    }
	    getExtendedSelector() {
	        return extractHTMLSelectorFromRule(this.selector);
	    }
	    isExtended() {
	        return getBit(this.mask, COSMETICS_MASK.extended);
	    }
	    isRemove() {
	        return getBit(this.mask, COSMETICS_MASK.remove);
	    }
	    isUnhide() {
	        return getBit(this.mask, COSMETICS_MASK.unhide);
	    }
	    isScriptInject() {
	        return getBit(this.mask, COSMETICS_MASK.scriptInject);
	    }
	    isCSS() {
	        return this.isScriptInject() === false;
	    }
	    isIdSelector() {
	        return getBit(this.mask, COSMETICS_MASK.isIdSelector);
	    }
	    isClassSelector() {
	        return getBit(this.mask, COSMETICS_MASK.isClassSelector);
	    }
	    isHrefSelector() {
	        return getBit(this.mask, COSMETICS_MASK.isHrefSelector);
	    }
	    isUnicode() {
	        return getBit(this.mask, COSMETICS_MASK.isUnicode);
	    }
	    isHtmlFiltering() {
	        return this.getSelector().startsWith('^');
	    }
	    // A generic hide cosmetic filter is one that:
	    //
	    // * Do not have a domain specified. "Hide this element on all domains"
	    // * Have only domain exceptions specified. "Hide this element on all domains except example.com"
	    //
	    // For example: ~example.com##.ad  is a generic filter as well!
	    isGenericHide() {
	        var _a, _b;
	        return ((_a = this === null || this === void 0 ? void 0 : this.domains) === null || _a === void 0 ? void 0 : _a.hostnames) === undefined && ((_b = this === null || this === void 0 ? void 0 : this.domains) === null || _b === void 0 ? void 0 : _b.entities) === undefined;
	    }
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	const HTTP_HASH = fastHash('http');
	const HTTPS_HASH = fastHash('https');
	function isAllowedHostname(ch) {
	    return (isDigit(ch) || isAlpha(ch) || ch === 95 /* '_' */ || ch === 45 /* '-' */ || ch === 46 /* '.' */);
	}
	/**
	 * Masks used to store options of network filters in a bitmask.
	 */
	var NETWORK_FILTER_MASK;
	(function (NETWORK_FILTER_MASK) {
	    // Request Type
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["fromDocument"] = 1] = "fromDocument";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["fromFont"] = 2] = "fromFont";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["fromHttp"] = 4] = "fromHttp";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["fromHttps"] = 8] = "fromHttps";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["fromImage"] = 16] = "fromImage";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["fromMedia"] = 32] = "fromMedia";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["fromObject"] = 64] = "fromObject";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["fromOther"] = 128] = "fromOther";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["fromPing"] = 256] = "fromPing";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["fromScript"] = 512] = "fromScript";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["fromStylesheet"] = 1024] = "fromStylesheet";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["fromSubdocument"] = 2048] = "fromSubdocument";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["fromWebsocket"] = 4096] = "fromWebsocket";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["fromXmlHttpRequest"] = 8192] = "fromXmlHttpRequest";
	    // Partiness
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["firstParty"] = 16384] = "firstParty";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["thirdParty"] = 32768] = "thirdParty";
	    // Options
	    // FREE - 1 << 16
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["isBadFilter"] = 131072] = "isBadFilter";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["isCSP"] = 262144] = "isCSP";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["isGenericHide"] = 524288] = "isGenericHide";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["isImportant"] = 1048576] = "isImportant";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["isSpecificHide"] = 2097152] = "isSpecificHide";
	    // Kind of patterns
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["isFullRegex"] = 4194304] = "isFullRegex";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["isRegex"] = 8388608] = "isRegex";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["isUnicode"] = 16777216] = "isUnicode";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["isLeftAnchor"] = 33554432] = "isLeftAnchor";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["isRightAnchor"] = 67108864] = "isRightAnchor";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["isException"] = 134217728] = "isException";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["isHostnameAnchor"] = 268435456] = "isHostnameAnchor";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["isRedirectRule"] = 536870912] = "isRedirectRule";
	    NETWORK_FILTER_MASK[NETWORK_FILTER_MASK["isRedirect"] = 1073741824] = "isRedirect";
	})(NETWORK_FILTER_MASK || (NETWORK_FILTER_MASK = {}));
	/**
	 * Mask used when a network filter can be applied on any content type.
	 */
	const FROM_ANY = NETWORK_FILTER_MASK.fromDocument |
	    NETWORK_FILTER_MASK.fromFont |
	    NETWORK_FILTER_MASK.fromImage |
	    NETWORK_FILTER_MASK.fromMedia |
	    NETWORK_FILTER_MASK.fromObject |
	    NETWORK_FILTER_MASK.fromOther |
	    NETWORK_FILTER_MASK.fromPing |
	    NETWORK_FILTER_MASK.fromScript |
	    NETWORK_FILTER_MASK.fromStylesheet |
	    NETWORK_FILTER_MASK.fromSubdocument |
	    NETWORK_FILTER_MASK.fromWebsocket |
	    NETWORK_FILTER_MASK.fromXmlHttpRequest;
	/**
	 * Map content type value to mask the corresponding mask.
	 * ref: https://developer.mozilla.org/en-US/docs/Mozilla/Tech/XPCOM/Reference/Interface/nsIContentPolicy
	 */
	const REQUEST_TYPE_TO_MASK = {
	    beacon: NETWORK_FILTER_MASK.fromPing, // fromOther?
	    document: NETWORK_FILTER_MASK.fromDocument,
	    cspviolationreport: NETWORK_FILTER_MASK.fromOther,
	    fetch: NETWORK_FILTER_MASK.fromXmlHttpRequest,
	    font: NETWORK_FILTER_MASK.fromFont,
	    image: NETWORK_FILTER_MASK.fromImage,
	    imageset: NETWORK_FILTER_MASK.fromImage,
	    mainFrame: NETWORK_FILTER_MASK.fromDocument,
	    main_frame: NETWORK_FILTER_MASK.fromDocument,
	    media: NETWORK_FILTER_MASK.fromMedia,
	    object: NETWORK_FILTER_MASK.fromObject,
	    object_subrequest: NETWORK_FILTER_MASK.fromObject,
	    ping: NETWORK_FILTER_MASK.fromPing, // fromOther?
	    script: NETWORK_FILTER_MASK.fromScript,
	    stylesheet: NETWORK_FILTER_MASK.fromStylesheet,
	    subFrame: NETWORK_FILTER_MASK.fromSubdocument,
	    sub_frame: NETWORK_FILTER_MASK.fromSubdocument,
	    webSocket: NETWORK_FILTER_MASK.fromWebsocket,
	    websocket: NETWORK_FILTER_MASK.fromWebsocket,
	    xhr: NETWORK_FILTER_MASK.fromXmlHttpRequest,
	    xmlhttprequest: NETWORK_FILTER_MASK.fromXmlHttpRequest,
	    // Other
	    cspReport: NETWORK_FILTER_MASK.fromOther,
	    csp_report: NETWORK_FILTER_MASK.fromOther,
	    eventsource: NETWORK_FILTER_MASK.fromOther,
	    manifest: NETWORK_FILTER_MASK.fromOther,
	    other: NETWORK_FILTER_MASK.fromOther,
	    prefetch: NETWORK_FILTER_MASK.fromOther,
	    preflight: NETWORK_FILTER_MASK.fromOther,
	    signedexchange: NETWORK_FILTER_MASK.fromOther,
	    speculative: NETWORK_FILTER_MASK.fromOther,
	    texttrack: NETWORK_FILTER_MASK.fromOther,
	    web_manifest: NETWORK_FILTER_MASK.fromOther,
	    xml_dtd: NETWORK_FILTER_MASK.fromOther,
	    xslt: NETWORK_FILTER_MASK.fromOther,
	};
	function getListOfRequestTypesNegated(filter) {
	    const types = [];
	    if (filter.fromDocument() === false) {
	        types.push('document');
	    }
	    if (filter.fromImage() === false) {
	        types.push('image');
	    }
	    if (filter.fromMedia() === false) {
	        types.push('media');
	    }
	    if (filter.fromObject() === false) {
	        types.push('object');
	    }
	    if (filter.fromOther() === false) {
	        types.push('other');
	    }
	    if (filter.fromPing() === false) {
	        types.push('ping');
	    }
	    if (filter.fromScript() === false) {
	        types.push('script');
	    }
	    if (filter.fromStylesheet() === false) {
	        types.push('stylesheet');
	    }
	    if (filter.fromSubdocument() === false) {
	        types.push('sub_frame');
	    }
	    if (filter.fromWebsocket() === false) {
	        types.push('websocket');
	    }
	    if (filter.fromXmlHttpRequest() === false) {
	        types.push('xhr');
	    }
	    if (filter.fromFont() === false) {
	        types.push('font');
	    }
	    return types;
	}
	function getListOfRequestTypes(filter) {
	    const types = [];
	    if (filter.fromDocument()) {
	        types.push('document');
	    }
	    if (filter.fromImage()) {
	        types.push('image');
	    }
	    if (filter.fromMedia()) {
	        types.push('media');
	    }
	    if (filter.fromObject()) {
	        types.push('object');
	    }
	    if (filter.fromOther()) {
	        types.push('other');
	    }
	    if (filter.fromPing()) {
	        types.push('ping');
	    }
	    if (filter.fromScript()) {
	        types.push('script');
	    }
	    if (filter.fromStylesheet()) {
	        types.push('stylesheet');
	    }
	    if (filter.fromSubdocument()) {
	        types.push('sub_frame');
	    }
	    if (filter.fromWebsocket()) {
	        types.push('websocket');
	    }
	    if (filter.fromXmlHttpRequest()) {
	        types.push('xhr');
	    }
	    if (filter.fromFont()) {
	        types.push('font');
	    }
	    return types;
	}
	function computeFilterId(mask, filter, hostname, domains, denyallow, optionValue) {
	    let hash = (HASH_SEED * HASH_INTERNAL_MULT) ^ mask;
	    if (domains !== undefined) {
	        hash = domains.updateId(hash);
	    }
	    if (denyallow !== undefined) {
	        hash = denyallow.updateId(hash);
	    }
	    if (filter !== undefined) {
	        for (let i = 0; i < filter.length; i += 1) {
	            hash = (hash * HASH_INTERNAL_MULT) ^ filter.charCodeAt(i);
	        }
	    }
	    if (hostname !== undefined) {
	        for (let i = 0; i < hostname.length; i += 1) {
	            hash = (hash * HASH_INTERNAL_MULT) ^ hostname.charCodeAt(i);
	        }
	    }
	    if (optionValue !== undefined) {
	        for (let i = 0; i < optionValue.length; i += 1) {
	            hash = (hash * HASH_INTERNAL_MULT) ^ optionValue.charCodeAt(i);
	        }
	    }
	    return hash >>> 0;
	}
	/**
	 * Compiles a filter pattern to a regex. This is only performed *lazily* for
	 * filters containing at least a * or ^ symbol. Because Regexes are expansive,
	 * we try to convert some patterns to plain filters.
	 */
	function compileRegex(filter, isLeftAnchor, isRightAnchor, isFullRegex) {
	    if (isFullRegex === true) {
	        return new RegExp(filter.slice(1, filter.length - 1), 'i');
	    }
	    // Escape special regex characters: |.$+?{}()[]\
	    filter = filter.replace(/([|.$+?{}()[\]\\])/g, '\\$1');
	    // * can match anything
	    filter = filter.replace(/\*/g, '.*');
	    // ^ can match any separator or the end of the pattern
	    filter = filter.replace(/\^/g, '(?:[^\\w\\d_.%-]|$)');
	    // Should match end of url
	    if (isRightAnchor) {
	        filter = `${filter}$`;
	    }
	    if (isLeftAnchor) {
	        filter = `^${filter}`;
	    }
	    return new RegExp(filter);
	}
	/**
	 * Collects a filter option key until the function sees the special character.
	 * This function will stop iterating over the given string if it sees equal sign or comma sign.
	 * If there's an equal sign, it means that we'll see the value.
	 * Otherwise, if there's a comma sign, it means that the option doesn't have any values.
	 */
	function getFilterOptionName(line, pos, end) {
	    const start = pos;
	    for (; pos < end; pos++) {
	        const code = line.charCodeAt(pos);
	        if (code === 61 /* '=' */ || code === 44 /* ',' */) {
	            end = pos;
	            break;
	        }
	    }
	    return [pos, line.slice(start, end)];
	}
	/**
	 * Collects a filter option value until the function sees the special character.
	 * This function respects the escaping characters, so we can safely collect the full value
	 * including the special characters which are not allowed normally.
	 * This function will stop if it sees a comma sign.
	 */
	function getFilterOptionValue(line, pos, end) {
	    let start = pos;
	    let value = '';
	    for (; pos < end; pos++) {
	        const code = line.charCodeAt(pos);
	        if (code === 92 /* '\\' */) {
	            value += line.slice(start, pos);
	            start = ++pos;
	        }
	        else if (code === 44 /* ',' */) {
	            break;
	        }
	    }
	    if (start - pos !== 0) {
	        value += line.slice(start, pos);
	    }
	    return [pos, value];
	}
	/**
	 * Collects an array of filter options from the given index.
	 * This function leverages `getFilterOptionKey`, `getFilterOptionValue`, and every extension functions.
	 * Depending on the filter option key, the function to collect filter option value can vary.
	 * For the generic filter option value, it'll use `getFilterOptionValue` function to get the value.
	 */
	function getFilterOptions(line, pos, end) {
	    const options = [];
	    let name;
	    let value;
	    for (; pos < end; pos++) {
	        [pos, name] = getFilterOptionName(line, pos, end);
	        if (name !== undefined) {
	            if (line.charCodeAt(pos) === 61 /* '=' */) {
	                pos++;
	            }
	            [pos, value] = getFilterOptionValue(line, pos, end);
	            options.push([name, value]);
	        }
	    }
	    return options;
	}
	const MATCH_ALL = new RegExp('');
	class NetworkFilter {
	    static parse(line, debug = false) {
	        // Represent options as a bitmask
	        let mask = NETWORK_FILTER_MASK.thirdParty |
	            NETWORK_FILTER_MASK.firstParty |
	            NETWORK_FILTER_MASK.fromHttps |
	            NETWORK_FILTER_MASK.fromHttp;
	        // Temporary masks for positive (e.g.: $script) and negative (e.g.: $~script)
	        // content type options.
	        let cptMaskPositive = 0;
	        let cptMaskNegative = FROM_ANY;
	        let hostname;
	        let domains;
	        let denyallow;
	        let optionValue;
	        // Start parsing
	        let filterIndexStart = 0;
	        let filterIndexEnd = line.length;
	        // @@filter == Exception
	        if (line.charCodeAt(0) === 64 /* '@' */ && line.charCodeAt(1) === 64 /* '@' */) {
	            filterIndexStart += 2;
	            mask = setBit(mask, NETWORK_FILTER_MASK.isException);
	        }
	        // filter$options == Options
	        // ^     ^
	        // |     |
	        // |     optionsIndex
	        // filterIndexStart
	        const optionsIndex = findLastIndexOfUnescapedCharacter(line, '$');
	        if (optionsIndex !== -1 && line.charCodeAt(optionsIndex + 1) !== 47 /* '/' */) {
	            // Parse options and set flags
	            filterIndexEnd = optionsIndex;
	            // --------------------------------------------------------------------- //
	            // parseOptions
	            // --------------------------------------------------------------------- //
	            for (const rawOption of getFilterOptions(line, optionsIndex + 1, line.length)) {
	                const negation = rawOption[0].charCodeAt(0) === 126; /* '~' */
	                const option = negation === true ? rawOption[0].slice(1) : rawOption[0];
	                const value = rawOption[1];
	                switch (option) {
	                    case 'denyallow': {
	                        denyallow = Domains.parse(value.split('|'), debug);
	                        break;
	                    }
	                    case 'domain':
	                    case 'from': {
	                        // domain list starting or ending with '|' is invalid
	                        if (value.charCodeAt(0) === 124 /* '|' */ ||
	                            value.charCodeAt(value.length - 1) === 124 /* '|' */) {
	                            return null;
	                        }
	                        domains = Domains.parse(value.split('|'), debug);
	                        break;
	                    }
	                    case 'badfilter':
	                        mask = setBit(mask, NETWORK_FILTER_MASK.isBadFilter);
	                        break;
	                    case 'important':
	                        // Note: `negation` should always be `false` here.
	                        if (negation) {
	                            return null;
	                        }
	                        mask = setBit(mask, NETWORK_FILTER_MASK.isImportant);
	                        break;
	                    case 'match-case':
	                        // Note: `negation` should always be `false` here.
	                        if (negation) {
	                            return null;
	                        }
	                        // We currently consider all filters to be case-insensitive.
	                        break;
	                    case '3p':
	                    case 'third-party':
	                        if (negation) {
	                            // ~third-party means we should clear the flag
	                            mask = clearBit(mask, NETWORK_FILTER_MASK.thirdParty);
	                        }
	                        else {
	                            // third-party means ~first-party
	                            mask = clearBit(mask, NETWORK_FILTER_MASK.firstParty);
	                        }
	                        break;
	                    case '1p':
	                    case 'first-party':
	                        if (negation) {
	                            // ~first-party means we should clear the flag
	                            mask = clearBit(mask, NETWORK_FILTER_MASK.firstParty);
	                        }
	                        else {
	                            // first-party means ~third-party
	                            mask = clearBit(mask, NETWORK_FILTER_MASK.thirdParty);
	                        }
	                        break;
	                    case 'redirect-rule':
	                    case 'redirect':
	                        // Negation of redirection doesn't make sense
	                        if (negation) {
	                            return null;
	                        }
	                        // Ignore this filter if no redirection resource is specified
	                        if (value.length === 0) {
	                            return null;
	                        }
	                        mask = setBit(mask, NETWORK_FILTER_MASK.isRedirect);
	                        if (option === 'redirect-rule') {
	                            mask = setBit(mask, NETWORK_FILTER_MASK.isRedirectRule);
	                        }
	                        optionValue = value;
	                        break;
	                    case 'csp':
	                        if (negation) {
	                            return null;
	                        }
	                        mask = setBit(mask, NETWORK_FILTER_MASK.isCSP);
	                        if (value.length > 0) {
	                            optionValue = value;
	                        }
	                        break;
	                    case 'ehide':
	                    case 'elemhide':
	                        if (negation) {
	                            return null;
	                        }
	                        mask = setBit(mask, NETWORK_FILTER_MASK.isGenericHide);
	                        mask = setBit(mask, NETWORK_FILTER_MASK.isSpecificHide);
	                        break;
	                    case 'shide':
	                    case 'specifichide':
	                        if (negation) {
	                            return null;
	                        }
	                        mask = setBit(mask, NETWORK_FILTER_MASK.isSpecificHide);
	                        break;
	                    case 'ghide':
	                    case 'generichide':
	                        if (negation) {
	                            return null;
	                        }
	                        mask = setBit(mask, NETWORK_FILTER_MASK.isGenericHide);
	                        break;
	                    case 'inline-script':
	                        if (negation) {
	                            return null;
	                        }
	                        mask = setBit(mask, NETWORK_FILTER_MASK.isCSP);
	                        optionValue =
	                            "script-src 'self' 'unsafe-eval' http: https: data: blob: mediastream: filesystem:";
	                        break;
	                    case 'inline-font':
	                        if (negation) {
	                            return null;
	                        }
	                        mask = setBit(mask, NETWORK_FILTER_MASK.isCSP);
	                        optionValue =
	                            "font-src 'self' 'unsafe-eval' http: https: data: blob: mediastream: filesystem:";
	                        break;
	                    default: {
	                        // Handle content type options separatly
	                        let optionMask = 0;
	                        switch (option) {
	                            case 'all':
	                                if (negation) {
	                                    return null;
	                                }
	                                // NOTE: Currently a filter cannot be both blocking and CSP, so
	                                // we will have to create multiple filters to keep the semantics
	                                // of 'all'.
	                                // mask = setBit(mask, NETWORK_FILTER_MASK.isCSP);
	                                // csp = [
	                                //   "script-src 'self' 'unsafe-eval' http: https: data: blob: mediastream: filesystem:",
	                                //   "font-src 'self' 'unsafe-eval' http: https: data: blob: mediastream: filesystem:",
	                                // ].join('; ');
	                                break;
	                            case 'image':
	                                optionMask = NETWORK_FILTER_MASK.fromImage;
	                                break;
	                            case 'media':
	                                optionMask = NETWORK_FILTER_MASK.fromMedia;
	                                break;
	                            case 'object':
	                            case 'object-subrequest':
	                                optionMask = NETWORK_FILTER_MASK.fromObject;
	                                break;
	                            case 'other':
	                                optionMask = NETWORK_FILTER_MASK.fromOther;
	                                break;
	                            case 'ping':
	                            case 'beacon':
	                                optionMask = NETWORK_FILTER_MASK.fromPing;
	                                break;
	                            case 'script':
	                                optionMask = NETWORK_FILTER_MASK.fromScript;
	                                break;
	                            case 'css':
	                            case 'stylesheet':
	                                optionMask = NETWORK_FILTER_MASK.fromStylesheet;
	                                break;
	                            case 'frame':
	                            case 'subdocument':
	                                optionMask = NETWORK_FILTER_MASK.fromSubdocument;
	                                break;
	                            case 'xhr':
	                            case 'xmlhttprequest':
	                                optionMask = NETWORK_FILTER_MASK.fromXmlHttpRequest;
	                                break;
	                            case 'websocket':
	                                optionMask = NETWORK_FILTER_MASK.fromWebsocket;
	                                break;
	                            case 'font':
	                                optionMask = NETWORK_FILTER_MASK.fromFont;
	                                break;
	                            case 'doc':
	                            case 'document':
	                                optionMask = NETWORK_FILTER_MASK.fromDocument;
	                                break;
	                            default:
	                                // Disable this filter if we don't support all the options
	                                return null;
	                        }
	                        // We got a valid cpt option, update mask
	                        if (negation) {
	                            cptMaskNegative = clearBit(cptMaskNegative, optionMask);
	                        }
	                        else {
	                            cptMaskPositive = setBit(cptMaskPositive, optionMask);
	                        }
	                        break;
	                    }
	                }
	            }
	            // End of option parsing
	            // --------------------------------------------------------------------- //
	        }
	        if (cptMaskPositive === 0) {
	            mask |= cptMaskNegative;
	        }
	        else if (cptMaskNegative === FROM_ANY) {
	            mask |= cptMaskPositive;
	        }
	        else {
	            mask |= cptMaskPositive & cptMaskNegative;
	        }
	        // Identify kind of pattern
	        let filter;
	        // Detect Regexps (i.e.: /pattern/)
	        if (filterIndexEnd - filterIndexStart >= 2 &&
	            line.charCodeAt(filterIndexStart) === 47 /* '/' */ &&
	            line.charCodeAt(filterIndexEnd - 1) === 47 /* '/' */) {
	            // Some extra ideas which could be applied to RegExp filters:
	            // * convert rules without any special RegExp syntax to plain patterns
	            // * remove extra `isFullRegex` flag since `isRegex` might be enough
	            // * apply some optimizations on the fly: /^https?:\\/\\/rest => isHttp + isHttps + rest
	            filter = line.slice(filterIndexStart, filterIndexEnd);
	            // Validate RegExp to make sure this rule is fine
	            try {
	                compileRegex(filter, false /* isLeftAnchor */, false /* isRightAnchor */, true /* isFullRegex */);
	            }
	            catch (ex) {
	                return null; // invalid RegExp
	            }
	            mask = setBit(mask, NETWORK_FILTER_MASK.isFullRegex);
	        }
	        else {
	            // Deal with hostname pattern
	            if (filterIndexEnd > 0 && line.charCodeAt(filterIndexEnd - 1) === 124 /* '|' */) {
	                mask = setBit(mask, NETWORK_FILTER_MASK.isRightAnchor);
	                filterIndexEnd -= 1;
	            }
	            if (filterIndexStart < filterIndexEnd &&
	                line.charCodeAt(filterIndexStart) === 124 /* '|' */) {
	                if (filterIndexStart < filterIndexEnd - 1 &&
	                    line.charCodeAt(filterIndexStart + 1) === 124 /* '|' */) {
	                    mask = setBit(mask, NETWORK_FILTER_MASK.isHostnameAnchor);
	                    filterIndexStart += 2;
	                }
	                else {
	                    mask = setBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
	                    filterIndexStart += 1;
	                }
	            }
	            // const isRegex = checkIsRegex(line, filterIndexStart, filterIndexEnd);
	            // mask = setNetworkMask(mask, NETWORK_FILTER_MASK.isRegex, isRegex);
	            if (getBit(mask, NETWORK_FILTER_MASK.isHostnameAnchor)) {
	                // Split at the first character which is not allowed in a hostname
	                let firstSeparator = filterIndexStart;
	                while (firstSeparator < filterIndexEnd &&
	                    isAllowedHostname(line.charCodeAt(firstSeparator)) === true) {
	                    firstSeparator += 1;
	                }
	                // No separator found so hostname has full length
	                if (firstSeparator === filterIndexEnd) {
	                    hostname = line.slice(filterIndexStart, filterIndexEnd);
	                    filterIndexStart = filterIndexEnd;
	                    // mask = setBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
	                }
	                else {
	                    // Found a separator
	                    hostname = line.slice(filterIndexStart, firstSeparator);
	                    filterIndexStart = firstSeparator;
	                    const separatorCode = line.charCodeAt(firstSeparator);
	                    if (separatorCode === 94 /* '^' */) {
	                        // If the only symbol remaining for the selector is '^' then ignore it
	                        // but set the filter as right anchored since there should not be any
	                        // other label on the right
	                        if (filterIndexEnd - filterIndexStart === 1) {
	                            filterIndexStart = filterIndexEnd;
	                            mask = setBit(mask, NETWORK_FILTER_MASK.isRightAnchor);
	                        }
	                        else {
	                            mask = setBit(mask, NETWORK_FILTER_MASK.isRegex);
	                            mask = setBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
	                        }
	                    }
	                    else if (separatorCode === 42 /* '*' */) {
	                        mask = setBit(mask, NETWORK_FILTER_MASK.isRegex);
	                        // mask = setBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
	                    }
	                    else {
	                        mask = setBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
	                    }
	                }
	            }
	            // Remove trailing '*'
	            if (filterIndexEnd - filterIndexStart > 0 &&
	                line.charCodeAt(filterIndexEnd - 1) === 42 /* '*' */) {
	                filterIndexEnd -= 1;
	            }
	            // Remove leading '*' if the filter is not hostname anchored.
	            if (getBit(mask, NETWORK_FILTER_MASK.isHostnameAnchor) === false &&
	                filterIndexEnd - filterIndexStart > 0 &&
	                line.charCodeAt(filterIndexStart) === 42 /* '*' */) {
	                mask = clearBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
	                filterIndexStart += 1;
	            }
	            // Transform filters on protocol (http, https, ws)
	            if (getBit(mask, NETWORK_FILTER_MASK.isLeftAnchor)) {
	                if (filterIndexEnd - filterIndexStart === 5 &&
	                    fastStartsWithFrom(line, 'ws://', filterIndexStart)) {
	                    mask = setBit(mask, NETWORK_FILTER_MASK.fromWebsocket);
	                    mask = clearBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
	                    mask = clearBit(mask, NETWORK_FILTER_MASK.fromHttp);
	                    mask = clearBit(mask, NETWORK_FILTER_MASK.fromHttps);
	                    filterIndexStart = filterIndexEnd;
	                }
	                else if (filterIndexEnd - filterIndexStart === 7 &&
	                    fastStartsWithFrom(line, 'http://', filterIndexStart)) {
	                    mask = setBit(mask, NETWORK_FILTER_MASK.fromHttp);
	                    mask = clearBit(mask, NETWORK_FILTER_MASK.fromHttps);
	                    mask = clearBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
	                    filterIndexStart = filterIndexEnd;
	                }
	                else if (filterIndexEnd - filterIndexStart === 8 &&
	                    fastStartsWithFrom(line, 'https://', filterIndexStart)) {
	                    mask = setBit(mask, NETWORK_FILTER_MASK.fromHttps);
	                    mask = clearBit(mask, NETWORK_FILTER_MASK.fromHttp);
	                    mask = clearBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
	                    filterIndexStart = filterIndexEnd;
	                }
	                else if (filterIndexEnd - filterIndexStart === 8 &&
	                    fastStartsWithFrom(line, 'http*://', filterIndexStart)) {
	                    mask = setBit(mask, NETWORK_FILTER_MASK.fromHttps);
	                    mask = setBit(mask, NETWORK_FILTER_MASK.fromHttp);
	                    mask = clearBit(mask, NETWORK_FILTER_MASK.isLeftAnchor);
	                    filterIndexStart = filterIndexEnd;
	                }
	            }
	            if (filterIndexEnd - filterIndexStart > 0) {
	                filter = line.slice(filterIndexStart, filterIndexEnd).toLowerCase();
	                mask = setNetworkMask(mask, NETWORK_FILTER_MASK.isUnicode, hasUnicode(filter));
	                if (getBit(mask, NETWORK_FILTER_MASK.isRegex) === false) {
	                    mask = setNetworkMask(mask, NETWORK_FILTER_MASK.isRegex, checkIsRegex(filter, 0, filter.length));
	                }
	            }
	            // TODO
	            // - ignore hostname anchor is not hostname provided
	            if (hostname !== undefined) {
	                hostname = hostname.toLowerCase();
	                if (hasUnicode(hostname)) {
	                    mask = setNetworkMask(mask, NETWORK_FILTER_MASK.isUnicode, true);
	                    hostname = toASCII(hostname);
	                }
	            }
	        }
	        return new NetworkFilter({
	            filter,
	            hostname,
	            mask,
	            domains,
	            denyallow,
	            optionValue,
	            rawLine: debug === true ? line : undefined,
	            regex: undefined,
	        });
	    }
	    /**
	     * Deserialize network filters. The code accessing the buffer should be
	     * symetrical to the one in `serializeNetworkFilter`.
	     */
	    static deserialize(buffer) {
	        const mask = buffer.getUint32();
	        const optionalParts = buffer.getUint8();
	        const isUnicode = getBit(mask, NETWORK_FILTER_MASK.isUnicode);
	        // The order of these statements is important. Since `buffer.getX()` will
	        // internally increment the position of next byte to read, they need to be
	        // retrieved in the exact same order they were serialized (check
	        // `serializeNetworkFilter`).
	        return new NetworkFilter({
	            // Mandatory field
	            mask,
	            // Optional parts
	            filter: (optionalParts & 1) === 1
	                ? isUnicode
	                    ? buffer.getUTF8()
	                    : buffer.getNetworkFilter()
	                : undefined,
	            hostname: (optionalParts & 2) === 2 ? buffer.getNetworkHostname() : undefined,
	            domains: (optionalParts & 4) === 4 ? Domains.deserialize(buffer) : undefined,
	            rawLine: (optionalParts & 8) === 8 ? buffer.getRawNetwork() : undefined,
	            denyallow: (optionalParts & 16) === 16 ? Domains.deserialize(buffer) : undefined,
	            optionValue: (optionalParts & 32) === 32
	                ? getBit(mask, NETWORK_FILTER_MASK.isCSP)
	                    ? buffer.getNetworkCSP()
	                    : getBit(mask, NETWORK_FILTER_MASK.isRedirect)
	                        ? buffer.getNetworkRedirect()
	                        : buffer.getUTF8()
	                : undefined,
	            regex: undefined,
	        });
	    }
	    constructor({ filter, hostname, mask, domains, denyallow, optionValue, rawLine, regex, }) {
	        this.filter = filter;
	        this.hostname = hostname;
	        this.mask = mask;
	        this.domains = domains;
	        this.denyallow = denyallow;
	        this.optionValue = optionValue;
	        this.rawLine = rawLine;
	        this.id = undefined;
	        this.regex = regex;
	    }
	    get csp() {
	        if (!this.isCSP()) {
	            return undefined;
	        }
	        return this.optionValue;
	    }
	    get redirect() {
	        if (!this.isRedirect()) {
	            return undefined;
	        }
	        return this.optionValue;
	    }
	    isCosmeticFilter() {
	        return false;
	    }
	    isNetworkFilter() {
	        return true;
	    }
	    match(request) {
	        return checkOptions(this, request) && checkPattern(this, request);
	    }
	    /**
	     * To allow for a more compact representation of network filters, the
	     * representation is composed of a mandatory header, and some optional
	     *
	     * Header:
	     * =======
	     *
	     *  | opt | mask
	     *     8     32
	     *
	     * For an empty filter having no pattern, hostname, the minimum size is: 42 bits.
	     *
	     * Then for each optional part (filter, hostname optDomains, optNotDomains,
	     * redirect), it takes 16 bits for the length of the string + the length of the
	     * string in bytes.
	     *
	     * The optional parts are written in order of there number of occurrence in the
	     * filter list used by the adblocker. The most common being `hostname`, then
	     * `filter`, `optDomains`, `optNotDomains`, `redirect`.
	     *
	     * Example:
	     * ========
	     *
	     * @@||cliqz.com would result in a serialized version:
	     *
	     * | 1 | mask | 9 | c | l | i | q | z | . | c | o | m  (16 bytes)
	     *
	     * In this case, the serialized version is actually bigger than the original
	     * filter, but faster to deserialize. In the future, we could optimize the
	     * representation to compact small filters better.
	     *
	     * Ideas:
	     *  * variable length encoding for the mask (if not option, take max 1 byte).
	     *  * first byte could contain the mask as well if small enough.
	     *  * when packing ascii string, store several of them in each byte.
	     */
	    serialize(buffer) {
	        buffer.pushUint32(this.mask);
	        const index = buffer.getPos();
	        buffer.pushUint8(0);
	        // This bit-mask indicates which optional parts of the filter were serialized.
	        let optionalParts = 0;
	        if (this.filter !== undefined) {
	            optionalParts |= 1;
	            if (this.isUnicode()) {
	                buffer.pushUTF8(this.filter);
	            }
	            else {
	                buffer.pushNetworkFilter(this.filter);
	            }
	        }
	        if (this.hostname !== undefined) {
	            optionalParts |= 2;
	            buffer.pushNetworkHostname(this.hostname);
	        }
	        if (this.domains !== undefined) {
	            optionalParts |= 4;
	            this.domains.serialize(buffer);
	        }
	        if (this.rawLine !== undefined) {
	            optionalParts |= 8;
	            buffer.pushRawNetwork(this.rawLine);
	        }
	        if (this.denyallow !== undefined) {
	            optionalParts |= 16;
	            this.denyallow.serialize(buffer);
	        }
	        if (this.optionValue !== undefined) {
	            optionalParts |= 32;
	            if (this.isCSP()) {
	                buffer.pushNetworkCSP(this.optionValue);
	            }
	            else if (this.isRedirect()) {
	                buffer.pushNetworkRedirect(this.optionValue);
	            }
	            else {
	                buffer.pushUTF8(this.optionValue);
	            }
	        }
	        buffer.setByte(index, optionalParts);
	    }
	    getSerializedSize(compression) {
	        let estimate = 4 + 1; // mask = 4 bytes // optional parts = 1 byte
	        if (this.filter !== undefined) {
	            if (this.isUnicode() === true) {
	                estimate += sizeOfUTF8(this.filter);
	            }
	            else {
	                estimate += sizeOfNetworkFilter(this.filter, compression);
	            }
	        }
	        if (this.hostname !== undefined) {
	            estimate += sizeOfNetworkHostname(this.hostname, compression);
	        }
	        if (this.domains !== undefined) {
	            estimate += this.domains.getSerializedSize();
	        }
	        if (this.rawLine !== undefined) {
	            estimate += sizeOfRawNetwork(this.rawLine, compression);
	        }
	        if (this.denyallow !== undefined) {
	            estimate += this.denyallow.getSerializedSize();
	        }
	        if (this.optionValue !== undefined) {
	            if (this.isCSP()) {
	                estimate += sizeOfNetworkCSP(this.optionValue, compression);
	            }
	            else if (this.isRedirect()) {
	                estimate += sizeOfNetworkRedirect(this.optionValue, compression);
	            }
	            else {
	                estimate += sizeOfUTF8(this.optionValue);
	            }
	        }
	        return estimate;
	    }
	    /**
	     * Tries to recreate the original representation of the filter (adblock
	     * syntax) from the internal representation. If `rawLine` is set (when filters
	     * are parsed in `debug` mode for example), then it is returned directly.
	     * Otherwise, we try to stick as closely as possible to the original form;
	     * there are things which cannot be recovered though, like domains options
	     * of which only hashes are stored.
	     */
	    toString(modifierReplacer) {
	        if (this.rawLine !== undefined) {
	            return this.rawLine;
	        }
	        let filter = '';
	        if (this.isException()) {
	            filter += '@@';
	        }
	        if (this.isHostnameAnchor()) {
	            filter += '||';
	        }
	        else if (this.fromHttp() !== this.fromHttps()) {
	            if (this.fromHttp()) {
	                filter += '|http://';
	            }
	            else {
	                filter += '|https://';
	            }
	        }
	        else if (this.isLeftAnchor()) {
	            filter += '|';
	        }
	        if (this.hasHostname()) {
	            filter += this.getHostname();
	            filter += '^';
	        }
	        if (this.isFullRegex()) {
	            filter += `/${this.getRegex().source}/`;
	        }
	        else if (this.isRegex()) {
	            filter += this.getRegex().source;
	        }
	        else {
	            filter += this.getFilter();
	        }
	        if (this.isRightAnchor() && filter[filter.length - 1] !== '^') {
	            filter += '|';
	        }
	        // Options
	        const options = [];
	        if (this.fromAny() === false) {
	            const numberOfCptOptions = bitCount(this.getCptMask());
	            const numberOfNegatedOptions = bitCount(FROM_ANY) - numberOfCptOptions;
	            if (numberOfNegatedOptions < numberOfCptOptions) {
	                for (const type of getListOfRequestTypesNegated(this)) {
	                    options.push(`~${type}`);
	                }
	            }
	            else {
	                for (const type of getListOfRequestTypes(this)) {
	                    options.push(type);
	                }
	            }
	        }
	        if (this.isImportant()) {
	            options.push('important');
	        }
	        if (this.isRedirectRule()) {
	            if (this.optionValue === '') {
	                options.push('redirect-rule');
	            }
	            else {
	                options.push(`redirect-rule=${this.optionValue}`);
	            }
	        }
	        else if (this.isRedirect()) {
	            if (this.optionValue === '') {
	                options.push('redirect');
	            }
	            else {
	                options.push(`redirect=${this.optionValue}`);
	            }
	        }
	        if (this.isCSP()) {
	            options.push(`csp=${this.optionValue}`);
	        }
	        if (this.isElemHide()) {
	            options.push('elemhide');
	        }
	        if (this.isSpecificHide()) {
	            options.push('specifichide');
	        }
	        if (this.isGenericHide()) {
	            options.push('generichide');
	        }
	        if (this.firstParty() !== this.thirdParty()) {
	            if (this.firstParty()) {
	                options.push('1p');
	            }
	            if (this.thirdParty()) {
	                options.push('3p');
	            }
	        }
	        if (this.domains !== undefined) {
	            if (this.domains.parts !== undefined) {
	                options.push(`domain=${this.domains.parts}`);
	            }
	            else {
	                options.push('domain=<hashed>');
	            }
	        }
	        if (this.denyallow !== undefined) {
	            if (this.denyallow.parts !== undefined) {
	                options.push(`denyallow=${this.denyallow.parts}`);
	            }
	            else {
	                options.push('denyallow=<hashed>');
	            }
	        }
	        if (this.isBadFilter()) {
	            options.push('badfilter');
	        }
	        if (options.length > 0) {
	            if (typeof modifierReplacer === 'function') {
	                filter += `$${options.map(modifierReplacer).join(',')}`;
	            }
	            else {
	                filter += `$${options.join(',')}`;
	            }
	        }
	        return filter;
	    }
	    // Public API (Read-Only)
	    getIdWithoutBadFilter() {
	        // This method computes the id ignoring the $badfilter option (which will
	        // correspond to the ID of filters being discarded). This allows us to
	        // eliminate bad filters by comparing IDs, which is more robust and faster
	        // than string comparison.
	        return computeFilterId(this.mask & ~NETWORK_FILTER_MASK.isBadFilter, this.filter, this.hostname, this.domains, this.denyallow, this.optionValue);
	    }
	    getId() {
	        if (this.id === undefined) {
	            this.id = computeFilterId(this.mask, this.filter, this.hostname, this.domains, this.denyallow, this.optionValue);
	        }
	        return this.id;
	    }
	    hasFilter() {
	        return this.filter !== undefined;
	    }
	    hasDomains() {
	        return this.domains !== undefined;
	    }
	    getMask() {
	        return this.mask;
	    }
	    getCptMask() {
	        return this.getMask() & FROM_ANY;
	    }
	    isRedirect() {
	        return getBit(this.getMask(), NETWORK_FILTER_MASK.isRedirect);
	    }
	    isRedirectRule() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.isRedirectRule);
	    }
	    getRedirect() {
	        var _a;
	        return (_a = this.optionValue) !== null && _a !== void 0 ? _a : '';
	    }
	    hasHostname() {
	        return this.hostname !== undefined;
	    }
	    getHostname() {
	        return this.hostname || '';
	    }
	    getFilter() {
	        return this.filter || '';
	    }
	    getRegex() {
	        if (this.regex === undefined) {
	            this.regex =
	                this.filter !== undefined && this.isRegex()
	                    ? compileRegex(this.filter, this.isLeftAnchor(), this.isRightAnchor(), this.isFullRegex())
	                    : MATCH_ALL;
	        }
	        return this.regex;
	    }
	    getTokens() {
	        TOKENS_BUFFER.reset();
	        // If there is only one domain and no domain negation, we also use this
	        // domain as a token.
	        if (this.domains !== undefined &&
	            this.domains.hostnames !== undefined &&
	            this.domains.entities === undefined &&
	            this.domains.notHostnames === undefined &&
	            this.domains.notEntities === undefined &&
	            this.domains.hostnames.length === 1) {
	            TOKENS_BUFFER.push(this.domains.hostnames[0]);
	        }
	        // Get tokens from filter
	        if (this.isFullRegex() === false) {
	            if (this.filter !== undefined) {
	                const skipLastToken = !this.isRightAnchor();
	                const skipFirstToken = !this.isLeftAnchor();
	                tokenizeWithWildcardsInPlace(this.filter, skipFirstToken, skipLastToken, TOKENS_BUFFER);
	            }
	            // Append tokens from hostname, if any
	            if (this.hostname !== undefined) {
	                tokenizeInPlace(this.hostname, false, this.filter !== undefined && this.filter.charCodeAt(0) === 42 /* '*' */, TOKENS_BUFFER);
	            }
	        }
	        else if (this.filter !== undefined) {
	            tokenizeRegexInPlace(this.filter, TOKENS_BUFFER);
	        }
	        // If we got no tokens for the filter/hostname part, then we will dispatch
	        // this filter in multiple buckets based on the domains option.
	        if (TOKENS_BUFFER.empty() === true &&
	            this.domains !== undefined &&
	            this.domains.hostnames !== undefined &&
	            this.domains.entities === undefined &&
	            this.domains.notHostnames === undefined &&
	            this.domains.notEntities === undefined) {
	            const result = [];
	            for (const hostname of this.domains.hostnames) {
	                const arr = new Uint32Array(1);
	                arr[0] = hostname;
	                result.push(arr);
	            }
	            return result;
	        }
	        // Add optional token for types
	        if (TOKENS_BUFFER.empty() === true && this.fromAny() === false) {
	            const types = getListOfRequestTypes(this);
	            if (types.length !== 0) {
	                const result = [];
	                for (const type of types) {
	                    const arr = new Uint32Array(1);
	                    arr[0] = NORMALIZED_TYPE_TOKEN[type];
	                    result.push(arr);
	                }
	                return result;
	            }
	        }
	        // Add optional token for protocol
	        if (this.fromHttp() === true && this.fromHttps() === false) {
	            TOKENS_BUFFER.push(HTTP_HASH);
	        }
	        else if (this.fromHttps() === true && this.fromHttp() === false) {
	            TOKENS_BUFFER.push(HTTPS_HASH);
	        }
	        return [TOKENS_BUFFER.slice()];
	    }
	    /**
	     * Check if this filter should apply to a request with this content type.
	     */
	    isCptAllowed(cpt) {
	        const mask = REQUEST_TYPE_TO_MASK[cpt];
	        if (mask !== undefined) {
	            return getBit(this.mask, mask);
	        }
	        // If content type is not supported (or not specified), we return `true`
	        // only if the filter does not specify any resource type.
	        return this.fromAny();
	    }
	    isException() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.isException);
	    }
	    isHostnameAnchor() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.isHostnameAnchor);
	    }
	    isRightAnchor() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.isRightAnchor);
	    }
	    isLeftAnchor() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.isLeftAnchor);
	    }
	    isImportant() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.isImportant);
	    }
	    isFullRegex() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.isFullRegex);
	    }
	    isRegex() {
	        return (getBit(this.mask, NETWORK_FILTER_MASK.isRegex) ||
	            getBit(this.mask, NETWORK_FILTER_MASK.isFullRegex));
	    }
	    isPlain() {
	        return !this.isRegex();
	    }
	    isCSP() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.isCSP);
	    }
	    isElemHide() {
	        return this.isSpecificHide() && this.isGenericHide();
	    }
	    isSpecificHide() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.isSpecificHide);
	    }
	    isGenericHide() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.isGenericHide);
	    }
	    isBadFilter() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.isBadFilter);
	    }
	    isUnicode() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.isUnicode);
	    }
	    fromAny() {
	        return this.getCptMask() === FROM_ANY;
	    }
	    thirdParty() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.thirdParty);
	    }
	    firstParty() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.firstParty);
	    }
	    fromImage() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.fromImage);
	    }
	    fromMedia() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.fromMedia);
	    }
	    fromObject() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.fromObject);
	    }
	    fromOther() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.fromOther);
	    }
	    fromPing() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.fromPing);
	    }
	    fromScript() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.fromScript);
	    }
	    fromStylesheet() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.fromStylesheet);
	    }
	    fromDocument() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.fromDocument);
	    }
	    fromSubdocument() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.fromSubdocument);
	    }
	    fromWebsocket() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.fromWebsocket);
	    }
	    fromHttp() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.fromHttp);
	    }
	    fromHttps() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.fromHttps);
	    }
	    fromXmlHttpRequest() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.fromXmlHttpRequest);
	    }
	    fromFont() {
	        return getBit(this.mask, NETWORK_FILTER_MASK.fromFont);
	    }
	}
	// ---------------------------------------------------------------------------
	// Filter parsing
	// ---------------------------------------------------------------------------
	function setNetworkMask(mask, m, value) {
	    if (value === true) {
	        return setBit(mask, m);
	    }
	    return clearBit(mask, m);
	}
	/**
	 * Check if the sub-string contained between the indices start and end is a
	 * regex filter (it contains a '*' or '^' char).
	 */
	function checkIsRegex(filter, start, end) {
	    const indexOfSeparator = filter.indexOf('^', start);
	    if (indexOfSeparator !== -1 && indexOfSeparator < end) {
	        return true;
	    }
	    const indexOfWildcard = filter.indexOf('*', start);
	    return indexOfWildcard !== -1 && indexOfWildcard < end;
	}
	/**
	 * Handle hostname anchored filters, given 'hostname' from ||hostname and
	 * request's hostname, check if there is a match. This is tricky because
	 * filters authors rely and different assumptions. We can have prefix of suffix
	 * matches of anchor.
	 */
	function isAnchoredByHostname(filterHostname, hostname, isFollowedByWildcard) {
	    // Corner-case, if `filterHostname` is empty, then it's a match
	    if (filterHostname.length === 0) {
	        return true;
	    }
	    // `filterHostname` cannot be longer than actual hostname
	    if (filterHostname.length > hostname.length) {
	        return false;
	    }
	    // If they have the same length, they should be equal
	    if (filterHostname.length === hostname.length) {
	        return filterHostname === hostname;
	    }
	    // Check if `filterHostname` appears anywhere in `hostname`
	    const matchIndex = hostname.indexOf(filterHostname);
	    // No match
	    if (matchIndex === -1) {
	        return false;
	    }
	    // `filterHostname` is a prefix of `hostname` and needs to match full a label.
	    //
	    // Examples (filterHostname, hostname):
	    //   * (foo, foo.com)
	    //   * (sub.foo, sub.foo.com)
	    if (matchIndex === 0) {
	        return (isFollowedByWildcard === true ||
	            hostname.charCodeAt(filterHostname.length) === 46 /* '.' */ ||
	            filterHostname.charCodeAt(filterHostname.length - 1) === 46 /* '.' */);
	    }
	    // `filterHostname` is a suffix of `hostname`.
	    //
	    // Examples (filterHostname, hostname):
	    //    * (foo.com, sub.foo.com)
	    //    * (com, foo.com)
	    if (hostname.length === matchIndex + filterHostname.length) {
	        return (hostname.charCodeAt(matchIndex - 1) === 46 /* '.' */ ||
	            filterHostname.charCodeAt(0) === 46 /* '.' */);
	    }
	    // `filterHostname` is infix of `hostname` and needs match full labels
	    return ((isFollowedByWildcard === true ||
	        hostname.charCodeAt(filterHostname.length) === 46 /* '.' */ ||
	        filterHostname.charCodeAt(filterHostname.length - 1) === 46) /* '.' */ &&
	        (hostname.charCodeAt(matchIndex - 1) === 46 || filterHostname.charCodeAt(0) === 46));
	}
	/**
	 * Specialize a network filter depending on its type. It allows for more
	 * efficient matching function.
	 */
	function checkPattern(filter, request) {
	    const pattern = filter.getFilter();
	    if (filter.isHostnameAnchor() === true) {
	        // Make sure request is anchored by hostname before proceeding to matching
	        const filterHostname = filter.getHostname();
	        if (isAnchoredByHostname(filterHostname, request.hostname, filter.filter !== undefined && filter.filter.charCodeAt(0) === 42 /* '*' */) === false) {
	            return false;
	        }
	        // At this point we know request is hostname anchored so we match the rest of the filter.
	        if (filter.isRegex()) {
	            // ||pattern*^
	            return filter
	                .getRegex()
	                .test(request.url.slice(request.url.indexOf(filterHostname) + filterHostname.length));
	        }
	        else if (filter.isRightAnchor() && filter.isLeftAnchor()) {
	            // |||pattern|
	            // Since this is not a regex, the filter pattern must follow the hostname
	            // with nothing in between. So we extract the part of the URL following
	            // after hostname and will perform the matching on it.
	            const urlAfterHostname = request.url.slice(request.url.indexOf(filterHostname) + filterHostname.length);
	            // Since it must follow immediatly after the hostname and be a suffix of
	            // the URL, we conclude that filter must be equal to the part of the
	            // url following the hostname.
	            return pattern === urlAfterHostname;
	        }
	        else if (filter.isRightAnchor()) {
	            // ||pattern|
	            const requestHostname = request.hostname;
	            if (filter.hasFilter() === false) {
	                // In this specific case it means that the specified hostname should match
	                // at the end of the hostname of the request. This allows to prevent false
	                // positive like ||foo.bar which would match https://foo.bar.baz where
	                // ||foo.bar^ would not.
	                return (filterHostname.length === requestHostname.length ||
	                    requestHostname.endsWith(filterHostname));
	            }
	            else {
	                // pattern|
	                return request.url.endsWith(pattern);
	            }
	        }
	        else if (filter.isLeftAnchor()) {
	            // ||pattern + left-anchor => This means that a plain pattern needs to appear
	            // exactly after the hostname, with nothing in between.
	            // Since this is not a regex, the filter pattern must follow the hostname
	            // with nothing in between. So we extract the part of the URL following
	            // after hostname and will perform the matching on it.
	            return fastStartsWithFrom(request.url, pattern, request.url.indexOf(filterHostname) + filterHostname.length);
	        }
	        if (filter.hasFilter() === false) {
	            return true;
	        }
	        // We consider this a match if the plain patter (i.e.: filter) appears anywhere.
	        return (request.url.indexOf(pattern, request.url.indexOf(filterHostname) + filterHostname.length) !==
	            -1);
	    }
	    else if (filter.isRegex()) {
	        // pattern*^
	        return filter.getRegex().test(request.url);
	    }
	    else if (filter.isLeftAnchor() && filter.isRightAnchor()) {
	        // |pattern|
	        return request.url === pattern;
	    }
	    else if (filter.isLeftAnchor()) {
	        // |pattern
	        return fastStartsWith(request.url, pattern);
	    }
	    else if (filter.isRightAnchor()) {
	        // pattern|
	        return request.url.endsWith(pattern);
	    }
	    // pattern
	    if (filter.hasFilter() === false) {
	        return true;
	    }
	    return request.url.indexOf(pattern) !== -1;
	}
	function checkOptions(filter, request) {
	    // We first discard requests based on type, protocol and party. This is really
	    // cheap and should be done first.
	    if (filter.isCptAllowed(request.type) === false ||
	        (request.isHttps === true && filter.fromHttps() === false) ||
	        (request.isHttp === true && filter.fromHttp() === false) ||
	        (filter.firstParty() === false && request.isFirstParty === true) ||
	        (filter.thirdParty() === false && request.isThirdParty === true)) {
	        return false;
	    }
	    // If `sourceHostname` is *not* matched by `domain` then the request should be allowed.
	    if (filter.domains !== undefined &&
	        filter.domains.match(request.sourceHostnameHashes, request.sourceEntityHashes) === false) {
	        return false;
	    }
	    // If `hostname` is matched by `denyallow` then the request should be allowed.
	    if (filter.denyallow !== undefined &&
	        filter.denyallow.match(request.getHostnameHashes(), request.getEntityHashes()) === true) {
	        return false;
	    }
	    return true;
	}

	class Env extends Map {
	}
	var PreprocessorTokens;
	(function (PreprocessorTokens) {
	    PreprocessorTokens[PreprocessorTokens["INVALID"] = 0] = "INVALID";
	    PreprocessorTokens[PreprocessorTokens["BEGIF"] = 1] = "BEGIF";
	    PreprocessorTokens[PreprocessorTokens["ELSE"] = 2] = "ELSE";
	    PreprocessorTokens[PreprocessorTokens["ENDIF"] = 3] = "ENDIF";
	})(PreprocessorTokens || (PreprocessorTokens = {}));
	function detectPreprocessor(line) {
	    // Minimum size of a valid condition should be 6 for something like: "!#if x" or "!#else"
	    if (line.length < 6 ||
	        line.charCodeAt(0) !== 33 /* '!' */ ||
	        line.charCodeAt(1) !== 35 /* '#' */) {
	        return PreprocessorTokens.INVALID;
	    }
	    if (line.startsWith('!#if ')) {
	        return PreprocessorTokens.BEGIF;
	    }
	    if (line.startsWith('!#else')) {
	        return PreprocessorTokens.ELSE;
	    }
	    if (line.startsWith('!#endif')) {
	        return PreprocessorTokens.ENDIF;
	    }
	    return PreprocessorTokens.INVALID;
	}
	const tokenizerPattern = /(!|&&|\|\||\(|\)|[a-zA-Z0-9_]+)/g;
	const identifierPattern = /^[a-zA-Z0-9_]+$/;
	const tokenize = (expression) => expression.match(tokenizerPattern);
	const isIdentifier = (expression) => identifierPattern.test(expression);
	const precedence = {
	    '!': 2,
	    '&&': 1,
	    '||': 0,
	};
	const isOperator = (token) => Object.prototype.hasOwnProperty.call(precedence, token);
	const testIdentifier = (identifier, env) => {
	    if (identifier === 'true' && !env.has('true')) {
	        return true;
	    }
	    if (identifier === 'false' && !env.has('false')) {
	        return false;
	    }
	    return !!env.get(identifier);
	};
	/// The parsing is done using the [Shunting yard algorithm](https://en.wikipedia.org/wiki/Shunting_yard_algorithm).
	/// This function takes as input a string expression and an environment Map.
	/// The expression is made of constants (identifiers), logical operators
	/// (&&, ||), negations (!constant) and parentheses.
	///
	/// The environment is a simple Map that associates identifiers to boolean values.
	///
	/// The function should return the result of evaluating the expression using
	/// the values from `environment`. The return value of this function is
	/// either `true` or `false`.
	const evaluate = (expression, env) => {
	    if (expression.length === 0) {
	        return false;
	    }
	    if (isIdentifier(expression)) {
	        if (expression[0] === '!') {
	            return !testIdentifier(expression.slice(1), env);
	        }
	        return testIdentifier(expression, env);
	    }
	    const tokens = tokenize(expression);
	    if (!tokens || tokens.length === 0) {
	        return false;
	    }
	    // Exit if an unallowed character found.
	    // Since we're tokenizing via String.prototype.match function,
	    // the total length of matched tokens will be different in case
	    // unallowed characters were injected.
	    // However, we expect all spaces were already removed in prior step.
	    if (expression.length !== tokens.reduce((partialSum, token) => partialSum + token.length, 0)) {
	        return false;
	    }
	    const output = [];
	    const stack = [];
	    for (const token of tokens) {
	        if (token === '(') {
	            stack.push(token);
	        }
	        else if (token === ')') {
	            while (stack.length !== 0 && stack[stack.length - 1] !== '(') {
	                output.push(stack.pop());
	            }
	            // If the opening parenthesis doesn't exist
	            if (stack.length === 0) {
	                return false;
	            }
	            stack.pop();
	        }
	        else if (isOperator(token)) {
	            while (stack.length &&
	                isOperator(stack[stack.length - 1]) &&
	                precedence[token] <= precedence[stack[stack.length - 1]]) {
	                output.push(stack.pop());
	            }
	            stack.push(token);
	        }
	        else {
	            output.push(testIdentifier(token, env));
	        }
	    }
	    // If there is incomplete parenthesis
	    if (stack[0] === '(' || stack[0] === ')') {
	        return false;
	    }
	    while (stack.length !== 0) {
	        output.push(stack.pop());
	    }
	    for (const token of output) {
	        if (token === true || token === false) {
	            stack.push(token);
	        }
	        else if (token === '!') {
	            stack.push(!stack.pop());
	        }
	        else if (isOperator(token)) {
	            const right = stack.pop();
	            const left = stack.pop();
	            if (token === '&&') {
	                stack.push(left && right);
	            }
	            else {
	                stack.push(left || right);
	            }
	        }
	    }
	    return stack[0] === true;
	};
	class Preprocessor {
	    static getCondition(line) {
	        return line.slice(5 /* '!#if '.length */).replace(/\s/g, '');
	    }
	    static parse(line, filterIDs) {
	        return new this({
	            condition: Preprocessor.getCondition(line),
	            filterIDs,
	        });
	    }
	    static deserialize(view) {
	        const condition = view.getUTF8();
	        const filterIDs = new Set();
	        for (let i = 0, l = view.getUint32(); i < l; i++) {
	            filterIDs.add(view.getUint32());
	        }
	        return new this({
	            condition,
	            filterIDs,
	        });
	    }
	    constructor({ condition, filterIDs = new Set(), }) {
	        this.condition = condition;
	        this.filterIDs = filterIDs;
	    }
	    evaluate(env) {
	        return evaluate(this.condition, env);
	    }
	    serialize(view) {
	        view.pushUTF8(this.condition);
	        view.pushUint32(this.filterIDs.size);
	        for (const filterID of this.filterIDs) {
	            view.pushUint32(filterID);
	        }
	    }
	    getSerializedSize() {
	        let estimatedSize = sizeOfUTF8(this.condition);
	        estimatedSize += (1 + this.filterIDs.size) * 4;
	        return estimatedSize;
	    }
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	var FilterType;
	(function (FilterType) {
	    FilterType[FilterType["NOT_SUPPORTED"] = 0] = "NOT_SUPPORTED";
	    FilterType[FilterType["NETWORK"] = 1] = "NETWORK";
	    FilterType[FilterType["COSMETIC"] = 2] = "COSMETIC";
	    // available only with `extendedNonSupportedTypes` option for #detectFilterType
	    FilterType[FilterType["NOT_SUPPORTED_EMPTY"] = 100] = "NOT_SUPPORTED_EMPTY";
	    FilterType[FilterType["NOT_SUPPORTED_COMMENT"] = 101] = "NOT_SUPPORTED_COMMENT";
	    FilterType[FilterType["NOT_SUPPORTED_ADGUARD"] = 102] = "NOT_SUPPORTED_ADGUARD";
	})(FilterType || (FilterType = {}));
	/**
	 * Given a single line (string), checks if this would likely be a cosmetic
	 * filter, a network filter or something that is not supported. This check is
	 * performed before calling a more specific parser to create an instance of
	 * `NetworkFilter` or `CosmeticFilter`.
	 */
	function detectFilterType(line, { extendedNonSupportedTypes = false } = {}) {
	    // Ignore empty line
	    if (line.length === 0 || line.length === 1) {
	        if (extendedNonSupportedTypes) {
	            return FilterType.NOT_SUPPORTED_EMPTY;
	        }
	        return FilterType.NOT_SUPPORTED;
	    }
	    // Ignore comments
	    const firstCharCode = line.charCodeAt(0);
	    const secondCharCode = line.charCodeAt(1);
	    if (firstCharCode === 33 /* '!' */ ||
	        (firstCharCode === 35 /* '#' */ && secondCharCode <= 32) ||
	        (firstCharCode === 91 /* '[' */ && fastStartsWith(line, '[Adblock'))) {
	        if (extendedNonSupportedTypes) {
	            return FilterType.NOT_SUPPORTED_COMMENT;
	        }
	        return FilterType.NOT_SUPPORTED;
	    }
	    // Fast heuristics to detect network filters
	    const lastCharCode = line.charCodeAt(line.length - 1);
	    if ((firstCharCode === 36 /* '$' */ &&
	        secondCharCode !== 36 &&
	        secondCharCode !== 64) /* $$ and $@ as those may be Adguard HTML filtering rules */ ||
	        firstCharCode === 38 /* '&' */ ||
	        firstCharCode === 42 /* '*' */ ||
	        firstCharCode === 45 /* '-' */ ||
	        firstCharCode === 46 /* '.' */ ||
	        firstCharCode === 47 /* '/' */ ||
	        firstCharCode === 58 /* ':' */ ||
	        firstCharCode === 61 /* '=' */ ||
	        firstCharCode === 63 /* '?' */ ||
	        firstCharCode === 64 /* '@' */ ||
	        firstCharCode === 95 /* '_' */ ||
	        firstCharCode === 124 /* '|' */ ||
	        lastCharCode === 124 /* '|' */) {
	        return FilterType.NETWORK;
	    }
	    // Ignore Adguard cosmetics
	    // `$$` = HTML filtering rules
	    const dollarIndex = line.indexOf('$');
	    if (dollarIndex !== -1 && dollarIndex !== line.length - 1) {
	        const afterDollarIndex = dollarIndex + 1;
	        const afterDollarCharCode = line.charCodeAt(afterDollarIndex);
	        // Ignore Adguard HTML rewrite rules
	        if (afterDollarCharCode === 36 /* '$' */ ||
	            (afterDollarCharCode === 64 /* '@' */ &&
	                fastStartsWithFrom(line, /* $@$ */ '@$', afterDollarIndex))) {
	            if (extendedNonSupportedTypes) {
	                return FilterType.NOT_SUPPORTED_ADGUARD;
	            }
	            return FilterType.NOT_SUPPORTED;
	        }
	    }
	    // Check if filter is cosmetics
	    const sharpIndex = line.indexOf('#');
	    if (sharpIndex !== -1 && sharpIndex !== line.length - 1) {
	        const afterSharpIndex = sharpIndex + 1;
	        const afterSharpCharCode = line.charCodeAt(afterSharpIndex);
	        if (afterSharpCharCode === 35 /* '#'*/ ||
	            (afterSharpCharCode === 64 /* '@' */ &&
	                fastStartsWithFrom(line, /* #@# */ '@#', afterSharpIndex))
	        // TODO - support ADB/AdGuard extended css selectors
	        // || (afterSharpCharCode === 63 /* '?' */ &&
	        //   fastStartsWithFrom(line, /* #?# */ '?#', afterSharpIndex))
	        ) {
	            // Parse supported cosmetic filter
	            // `##` `#@#`
	            return FilterType.COSMETIC;
	        }
	        else if ((afterSharpCharCode === 64 /* '@'*/ &&
	            (fastStartsWithFrom(line, /* #@$# */ '@$#', afterSharpIndex) ||
	                fastStartsWithFrom(line, /* #@%# */ '@%#', afterSharpIndex) ||
	                fastStartsWithFrom(line, /* #@?# */ '@?#', afterSharpIndex))) ||
	            (afterSharpCharCode === 37 /* '%' */ &&
	                fastStartsWithFrom(line, /* #%# */ '%#', afterSharpIndex)) ||
	            (afterSharpCharCode === 36 /* '$' */ &&
	                (fastStartsWithFrom(line, /* #$# */ '$#', afterSharpIndex) ||
	                    fastStartsWithFrom(line, /* #$?# */ '$?#', afterSharpIndex))) ||
	            (afterSharpCharCode === 63 /* '?' */ &&
	                fastStartsWithFrom(line, /* #?# */ '?#', afterSharpIndex))) {
	            if (extendedNonSupportedTypes) {
	                return FilterType.NOT_SUPPORTED_ADGUARD;
	            }
	            return FilterType.NOT_SUPPORTED;
	        }
	    }
	    // Everything else is a network filter
	    return FilterType.NETWORK;
	}
	function parseFilters(list, config = new Config()) {
	    config = new Config(config);
	    const networkFilters = [];
	    const cosmeticFilters = [];
	    const notSupportedFilters = [];
	    const lines = list.split('\n');
	    const preprocessors = [];
	    const preprocessorStack = [];
	    for (let i = 0; i < lines.length; i += 1) {
	        let line = lines[i];
	        // Check if `line` should be left-trimmed
	        if (line.length !== 0 && line.charCodeAt(0) <= 32) {
	            line = line.trim();
	        }
	        // Handle continuations
	        if (line.length > 2) {
	            while (i < lines.length - 1 &&
	                line.charCodeAt(line.length - 1) === 92 &&
	                line.charCodeAt(line.length - 2) === 32) {
	                line = line.slice(0, -2);
	                const nextLine = lines[i + 1];
	                if (nextLine.length > 4 &&
	                    nextLine.charCodeAt(0) === 32 &&
	                    nextLine.charCodeAt(1) === 32 &&
	                    nextLine.charCodeAt(2) === 32 &&
	                    nextLine.charCodeAt(3) === 32 &&
	                    nextLine.charCodeAt(4) !== 32) {
	                    line += nextLine.slice(4);
	                    i += 1;
	                }
	                else {
	                    break;
	                }
	            }
	        }
	        // Check if `line` should be right-trimmed
	        if (line.length !== 0 && line.charCodeAt(line.length - 1) <= 32) {
	            line = line.trim();
	        }
	        // Detect if filter is supported, network or cosmetic
	        const filterType = detectFilterType(line, { extendedNonSupportedTypes: true });
	        if (filterType === FilterType.NETWORK && config.loadNetworkFilters === true) {
	            const filter = NetworkFilter.parse(line, config.debug);
	            if (filter !== null) {
	                networkFilters.push(filter);
	                if (preprocessorStack.length > 0) {
	                    preprocessorStack[preprocessorStack.length - 1].filterIDs.add(filter.getId());
	                }
	            }
	            else {
	                notSupportedFilters.push({
	                    lineNumber: i,
	                    filter: line,
	                    filterType,
	                });
	            }
	        }
	        else if (filterType === FilterType.COSMETIC && config.loadCosmeticFilters === true) {
	            const filter = CosmeticFilter.parse(line, config.debug);
	            if (filter !== null) {
	                if (config.loadGenericCosmeticsFilters === true || filter.isGenericHide() === false) {
	                    cosmeticFilters.push(filter);
	                    if (preprocessorStack.length > 0) {
	                        preprocessorStack[preprocessorStack.length - 1].filterIDs.add(filter.getId());
	                    }
	                }
	            }
	            else {
	                notSupportedFilters.push({
	                    lineNumber: i,
	                    filter: line,
	                    filterType: FilterType.COSMETIC,
	                });
	            }
	        }
	        else if (config.loadPreprocessors) {
	            const preprocessorToken = detectPreprocessor(line);
	            if (preprocessorToken === PreprocessorTokens.BEGIF) {
	                if (preprocessorStack.length > 0) {
	                    preprocessorStack.push(new Preprocessor({
	                        condition: `(${preprocessorStack[preprocessorStack.length - 1].condition})&&(${Preprocessor.getCondition(line)})`,
	                    }));
	                }
	                else {
	                    preprocessorStack.push(Preprocessor.parse(line));
	                }
	            }
	            else if ((preprocessorToken === PreprocessorTokens.ENDIF ||
	                preprocessorToken === PreprocessorTokens.ELSE) &&
	                preprocessorStack.length > 0) {
	                const lastPreprocessor = preprocessorStack.pop();
	                preprocessors.push(lastPreprocessor);
	                if (preprocessorToken === PreprocessorTokens.ELSE) {
	                    preprocessorStack.push(new Preprocessor({
	                        condition: `!(${lastPreprocessor.condition})`,
	                    }));
	                }
	            }
	            else if (filterType === FilterType.NOT_SUPPORTED_ADGUARD) {
	                notSupportedFilters.push({
	                    lineNumber: i,
	                    filter: line,
	                    filterType,
	                });
	            }
	        }
	        else if (filterType === FilterType.NOT_SUPPORTED_ADGUARD) {
	            notSupportedFilters.push({
	                lineNumber: i,
	                filter: line,
	                filterType,
	            });
	        }
	    }
	    return {
	        networkFilters,
	        cosmeticFilters,
	        preprocessors: preprocessors.filter((preprocessor) => preprocessor.filterIDs.size > 0),
	        notSupportedFilters,
	    };
	}

	const CONTENT_TYPE$g = 'video/flv';
	var flv = {
	    contentType: `${CONTENT_TYPE$g};base64`,
	    aliases: [
	        CONTENT_TYPE$g,
	        '.flv',
	        'flv',
	    ],
	    body: 'RkxWAQEAAAAJAAAAABIAALgAAAAAAAAAAgAKb25NZXRhRGF0YQgAAAAIAAhkdXJhdGlvbgAAAAAAAAAAAAAFd2lkdGgAP/AAAAAAAAAABmhlaWdodAA/8AAAAAAAAAANdmlkZW9kYXRhcmF0ZQBAaGoAAAAAAAAJZnJhbWVyYXRlAEBZAAAAAAAAAAx2aWRlb2NvZGVjaWQAQAAAAAAAAAAAB2VuY29kZXICAA1MYXZmNTcuNDEuMTAwAAhmaWxlc2l6ZQBAaoAAAAAAAAAACQAAAMM=',
	};

	const CONTENT_TYPE$f = 'image/gif';
	var gif = {
	    contentType: `${CONTENT_TYPE$f};base64`,
	    aliases: [
	        CONTENT_TYPE$f,
	        '.gif',
	        'gif',
	    ],
	    body: 'R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7',
	};

	const CONTENT_TYPE$e = 'text/html';
	var html = {
	    contentType: CONTENT_TYPE$e,
	    aliases: [
	        CONTENT_TYPE$e,
	        '.html',
	        'html',
	        '.htm',
	        'htm',
	        'noopframe',
	        'noop.html',
	    ],
	    body: '<!DOCTYPE html>',
	};

	const CONTENT_TYPE$d = 'image/vnd.microsoft.icon';
	var ico = {
	    contentType: `${CONTENT_TYPE$d};base64`,
	    aliases: [
	        CONTENT_TYPE$d,
	        '.ico',
	        'ico',
	    ],
	    body: 'AAABAAEAAQEAAAEAGAAwAAAAFgAAACgAAAABAAAAAgAAAAEAGAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP8AAAAAAA==',
	};

	const CONTENT_TYPE$c = 'image/jpeg';
	var jpg = {
	    contentType: `${CONTENT_TYPE$c};base64`,
	    aliases: [
	        CONTENT_TYPE$c,
	        '.jpg',
	        'jpg',
	        '.jpeg',
	        'jpeg',
	    ],
	    body: '/9j/2wBDAAMCAgICAgMCAgIDAwMDBAYEBAQEBAgGBgUGCQgKCgkICQkKDA8MCgsOCwkJDRENDg8QEBEQCgwSExIQEw8QEBD/yQALCAABAAEBAREA/8wABgAQEAX/2gAIAQEAAD8A0s8g/9k=',
	};

	const CONTENT_TYPE$b = 'application/javascript';
	var js = {
	    contentType: CONTENT_TYPE$b,
	    aliases: [
	        CONTENT_TYPE$b,
	        '.js',
	        'js',
	        'javascript',
	        '.jsx',
	        'jsx',
	        'typescript',
	        '.ts',
	        'ts',
	        'noop.js',
	        'noopjs',
	    ],
	    body: '',
	};

	const CONTENT_TYPE$a = 'application/json';
	var json = {
	    contentType: CONTENT_TYPE$a,
	    aliases: [
	        CONTENT_TYPE$a,
	        '.json',
	        'json',
	    ],
	    body: '0',
	};

	const CONTENT_TYPE$9 = 'audio/mpeg';
	var mp3 = {
	    contentType: `${CONTENT_TYPE$9};base64`,
	    aliases: [
	        CONTENT_TYPE$9,
	        '.mp3',
	        'mp3',
	        'noop-0.1s.mp3',
	        'noopmp3-0.1s',
	    ],
	    body: '/+MYxAAAAANIAAAAAExBTUUzLjk4LjIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
	};

	const CONTENT_TYPE$8 = 'video/mp4';
	var mp4 = {
	    contentType: `${CONTENT_TYPE$8};base64`,
	    aliases: [
	        CONTENT_TYPE$8,
	        '.mp4',
	        'mp4',
	        '.m4a',
	        'm4a',
	        '.m4p',
	        'm4p',
	        '.m4b',
	        'm4b',
	        '.m4r',
	        'm4r',
	        '.m4v',
	        'm4v',
	        'noop-1s.mp4',
	        'noopmp4-1s',
	    ],
	    body: 'AAAAHGZ0eXBpc29tAAACAGlzb21pc28ybXA0MQAAAAhmcmVlAAAC721kYXQhEAUgpBv/wAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA3pwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcCEQBSCkG//AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADengAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAcAAAAsJtb292AAAAbG12aGQAAAAAAAAAAAAAAAAAAAPoAAAALwABAAABAAAAAAAAAAAAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADAAAB7HRyYWsAAABcdGtoZAAAAAMAAAAAAAAAAAAAAAIAAAAAAAAALwAAAAAAAAAAAAAAAQEAAAAAAQAAAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAEAAAAAAAAAAAAAAAAAAACRlZHRzAAAAHGVsc3QAAAAAAAAAAQAAAC8AAAAAAAEAAAAAAWRtZGlhAAAAIG1kaGQAAAAAAAAAAAAAAAAAAKxEAAAIAFXEAAAAAAAtaGRscgAAAAAAAAAAc291bgAAAAAAAAAAAAAAAFNvdW5kSGFuZGxlcgAAAAEPbWluZgAAABBzbWhkAAAAAAAAAAAAAAAkZGluZgAAABxkcmVmAAAAAAAAAAEAAAAMdXJsIAAAAAEAAADTc3RibAAAAGdzdHNkAAAAAAAAAAEAAABXbXA0YQAAAAAAAAABAAAAAAAAAAAAAgAQAAAAAKxEAAAAAAAzZXNkcwAAAAADgICAIgACAASAgIAUQBUAAAAAAfQAAAHz+QWAgIACEhAGgICAAQIAAAAYc3R0cwAAAAAAAAABAAAAAgAABAAAAAAcc3RzYwAAAAAAAAABAAAAAQAAAAIAAAABAAAAHHN0c3oAAAAAAAAAAAAAAAIAAAFzAAABdAAAABRzdGNvAAAAAAAAAAEAAAAsAAAAYnVkdGEAAABabWV0YQAAAAAAAAAhaGRscgAAAAAAAAAAbWRpcmFwcGwAAAAAAAAAAAAAAAAtaWxzdAAAACWpdG9vAAAAHWRhdGEAAAABAAAAAExhdmY1Ni40MC4xMDE=',
	};

	const CONTENT_TYPE$7 = 'application/pdf';
	var pdf = {
	    contentType: `${CONTENT_TYPE$7};base64`,
	    aliases: [
	        CONTENT_TYPE$7,
	        '.pdf',
	        'pdf',
	    ],
	    body: 'JVBERi0xLgoxIDAgb2JqPDwvUGFnZXMgMiAwIFI+PmVuZG9iagoyIDAgb2JqPDwvS2lkc1szIDAgUl0vQ291bnQgMT4+ZW5kb2JqCjMgMCBvYmo8PC9QYXJlbnQgMiAwIFI+PmVuZG9iagp0cmFpbGVyIDw8L1Jvb3QgMSAwIFI+Pg==',
	};

	const CONTENT_TYPE$6 = 'image/png';
	var png = {
	    contentType: `${CONTENT_TYPE$6};base64`,
	    aliases: [
	        CONTENT_TYPE$6,
	        '.png',
	        'png',
	    ],
	    body: 'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAACklEQVR4nGMAAQAABQABDQottAAAAABJRU5ErkJggg==',
	};

	const CONTENT_TYPE$5 = 'image/svg+xml';
	var svg = {
	    contentType: CONTENT_TYPE$5,
	    aliases: [
	        CONTENT_TYPE$5,
	        '.svg',
	        'svg',
	    ],
	    body: 'https://raw.githubusercontent.com/mathiasbynens/small/master/svg.svg',
	};

	const CONTENT_TYPE$4 = 'text/plain';
	var txt = {
	    contentType: CONTENT_TYPE$4,
	    aliases: [
	        CONTENT_TYPE$4,
	        '.txt',
	        'txt',
	        'text',
	        'nooptext',
	        'noop.txt',
	    ],
	    body: '',
	};

	const CONTENT_TYPE$3 = 'audio/wav';
	var wav = {
	    contentType: `${CONTENT_TYPE$3};base64`,
	    aliases: [
	        CONTENT_TYPE$3,
	        '.wav',
	        'wav',
	    ],
	    body: 'UklGRiQAAABXQVZFZm10IBAAAAABAAEARKwAAIhYAQACABAAZGF0YQAAAAA=',
	};

	const CONTENT_TYPE$2 = 'video/webm';
	var webm = {
	    contentType: `${CONTENT_TYPE$2};base64`,
	    aliases: [
	        CONTENT_TYPE$2,
	        '.webm',
	        'webm',
	    ],
	    body: 'GkXfo0AgQoaBAUL3gQFC8oEEQvOBCEKCQAR3ZWJtQoeBAkKFgQIYU4BnQI0VSalmQCgq17FAAw9CQE2AQAZ3aGFtbXlXQUAGd2hhbW15RIlACECPQAAAAAAAFlSua0AxrkAu14EBY8WBAZyBACK1nEADdW5khkAFVl9WUDglhohAA1ZQOIOBAeBABrCBCLqBCB9DtnVAIueBAKNAHIEAAIAwAQCdASoIAAgAAUAmJaQAA3AA/vz0AAA=',
	};

	const CONTENT_TYPE$1 = 'image/webp';
	var webp = {
	    contentType: `${CONTENT_TYPE$1};base64`,
	    aliases: [
	        CONTENT_TYPE$1,
	        '.webp',
	        'webp',
	    ],
	    body: 'UklGRhIAAABXRUJQVlA4TAYAAAAvQWxvAGs=',
	};

	const CONTENT_TYPE = 'video/wmv';
	var wmv = {
	    contentType: `${CONTENT_TYPE};base64`,
	    aliases: [
	        CONTENT_TYPE,
	        '.wmv',
	        'wmv',
	    ],
	    body: 'MCaydY5mzxGm2QCqAGLObOUBAAAAAAAABQAAAAECodyrjEepzxGO5ADADCBTZWgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABcCAAAAAAAAAIA+1d6xnQEAAAAAAAAAAMAF2QEAAAAAAAAAAAAAAAAcDAAAAAAAAAIAAACADAAAgAwAAEANAwC1A79fLqnPEY7jAMAMIFNlLgAAAAAAAAAR0tOruqnPEY7mAMAMIFNlBgAAAAAAQKTQ0gfj0hGX8ACgyV6oUGQAAAAAAAAAAQAoAFcATQAvAEUAbgBjAG8AZABpAG4AZwBTAGUAdAB0AGkAbgBnAHMAAAAAABwATABhAHYAZgA1ADcALgA0ADEALgAxADAAMAAAAJEH3Le3qc8RjuYAwAwgU2WBAAAAAAAAAMDvGbxNW88RqP0AgF9cRCsAV/sgVVvPEaj9AIBfXEQrAAAAAAAAAAAzAAAAAAAAAAEAAAAAAAEAAAABAAAAAigAKAAAAAEAAAABAAAAAQAYAE1QNDMDAAAAAAAAAAAAAAAAAAAAAAAAAEBS0YYdMdARo6QAoMkDSPZMAAAAAAAAAEFS0YYdMdARo6QAoMkDSPYBAAAAAQAKAG0AcwBtAHAAZQBnADQAdgAzAAAAAAAEAE1QNDM2JrJ1jmbPEabZAKoAYs5sMgAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABAQ==',
	};

	// List of mime types:
	// - [ ] .aac 	AAC audio 	audio/aac
	// - [ ] .abw 	AbiWord document 	application/x-abiword
	// - [ ] .arc 	Archive document (multiple files embedded) 	application/x-freearc
	// - [ ] .avi 	AVI: Audio Video Interleave 	video/x-msvideo
	// - [ ] .azw 	Amazon Kindle eBook format 	application/vnd.amazon.ebook
	// - [ ] .bin 	Any kind of binary data 	application/octet-stream
	// - [ ] .bmp 	Windows OS/2 Bitmap Graphics 	image/bmp
	// - [ ] .bz 	BZip archive 	application/x-bzip
	// - [ ] .bz2 	BZip2 archive 	application/x-bzip2
	// - [ ] .csh 	C-Shell script 	application/x-csh
	// - [ ] .css 	Cascading Style Sheets (CSS) 	text/css
	// - [ ] .csv 	Comma-separated values (CSV) 	text/csv
	// - [ ] .doc 	Microsoft Word 	application/msword
	// - [ ] .docx 	Microsoft Word (OpenXML) 	application/vnd.openxmlformats-officedocument.wordprocessingml.document
	// - [ ] .eot 	MS Embedded OpenType fonts 	application/vnd.ms-fontobject
	// - [ ] .epub 	Electronic publication (EPUB) 	application/epub+zip
	// - [ ] .gz 	GZip Compressed Archive 	application/gzip
	// - [x] .gif 	Graphics Interchange Format (GIF) 	image/gif
	// - [x] .htm, .html 	HyperText Markup Language (HTML) 	text/html
	// - [x] .ico 	Icon format 	image/vnd.microsoft.icon
	// - [ ] .ics 	iCalendar format 	text/calendar
	// - [ ] .jar 	Java Archive (JAR) 	application/java-archive
	// - [x] .jpeg, .jpg 	JPEG images 	image/jpeg
	// - [x] .js 	JavaScript 	text/javascript
	// - [x] .json 	JSON format 	application/json
	// - [ ] .jsonld 	JSON-LD format 	application/ld+json
	// - [ ] .mid
	// - [ ] .midi 	Musical Instrument Digital Interface (MIDI) 	audio/midi audio/x-midi
	// - [ ] .mjs 	JavaScript module 	text/javascript
	// - [x] .mp3 	MP3 audio 	audio/mpeg
	// - [ ] .mpeg 	MPEG Video 	video/mpeg
	// - [ ] .mpkg 	Apple Installer Package 	application/vnd.apple.installer+xml
	// - [ ] .odp 	OpenDocument presentation document 	application/vnd.oasis.opendocument.presentation
	// - [ ] .ods 	OpenDocument spreadsheet document 	application/vnd.oasis.opendocument.spreadsheet
	// - [ ] .odt 	OpenDocument text document 	application/vnd.oasis.opendocument.text
	// - [ ] .oga 	OGG audio 	audio/ogg
	// - [ ] .ogv 	OGG video 	video/ogg
	// - [ ] .ogx 	OGG 	application/ogg
	// - [ ] .opus 	Opus audio 	audio/opus
	// - [ ] .otf 	OpenType font 	font/otf
	// - [x] .png 	Portable Network Graphics 	image/png
	// - [x] .pdf 	Adobe Portable Document Format (PDF) 	application/pdf
	// - [ ] .php 	Hypertext Preprocessor (Personal Home Page) 	application/php
	// - [ ] .ppt 	Microsoft PowerPoint 	application/vnd.ms-powerpoint
	// - [ ] .pptx 	Microsoft PowerPoint (OpenXML) 	application/vnd.openxmlformats-officedocument.presentationml.presentation
	// - [ ] .rar 	RAR archive 	application/vnd.rar
	// - [ ] .rtf 	Rich Text Format (RTF) 	application/rtf
	// - [ ] .sh 	Bourne shell script 	application/x-sh
	// - [x] .svg 	Scalable Vector Graphics (SVG) 	image/svg+xml
	// - [ ] .swf 	Small web format (SWF) or Adobe Flash document 	application/x-shockwave-flash
	// - [ ] .tar 	Tape Archive (TAR) 	application/x-tar
	// - [ ] .tif
	// - [ ] .tiff 	Tagged Image File Format (TIFF) 	image/tiff
	// - [ ] .ts 	MPEG transport stream 	video/mp2t
	// - [ ] .ttf 	TrueType Font 	font/ttf
	// - [ ] .txt 	Text, (generally ASCII or ISO 8859-n) 	text/plain
	// - [ ] .vsd 	Microsoft Visio 	application/vnd.visio
	// - [x] .wav 	Waveform Audio Format 	audio/wav
	// - [ ] .weba 	WEBM audio 	audio/webm
	// - [x] .webm 	WEBM video 	video/webm
	// - [x] .webp 	WEBP image 	image/webp
	// - [ ] .woff 	Web Open Font Format (WOFF) 	font/woff
	// - [ ] .woff2 	Web Open Font Format (WOFF) 	font/woff2
	// - [ ] .xhtml 	XHTML 	application/xhtml+xml
	// - [ ] .xls 	Microsoft Excel 	application/vnd.ms-excel
	// - [ ] .xlsx 	Microsoft Excel (OpenXML) 	application/vnd.openxmlformats-officedocument.spreadsheetml.sheet
	// - [ ] .xml 	XML 	application/xml if not readable from casual users (RFC 3023, section 3)
	// - [ ] text/xml if readable from casual users (RFC 3023, section 3)
	// - [ ] .xul 	XUL 	application/vnd.mozilla.xul+xml
	// - [ ] .zip 	ZIP archive 	application/zip
	// - [ ] .3gp 	3GPP audio/video container 	video/3gpp, audio/3gpp if it doesn't contain video
	// - [ ] .3g2 	3GPP2 audio/video container 	video/3gpp2, audio/3gpp2 if it doesn't contain video
	// - [ ] .7z 	7-zip archive 	application/x-7z-compressed
	const MIME_TO_RESOURCE = (() => {
	    const resources = {};
	    for (const fake of [
	        flv,
	        gif,
	        html,
	        ico,
	        jpg,
	        js,
	        json,
	        mp3,
	        mp4,
	        pdf,
	        png,
	        svg,
	        txt,
	        wav,
	        webm,
	        webp,
	        wmv,
	    ]) {
	        for (const alias of fake.aliases) {
	            resources[alias] = fake;
	        }
	    }
	    return resources;
	})();
	function getFallbackTextResource() {
	    return txt;
	}
	function getResourceForMime(mime) {
	    return MIME_TO_RESOURCE[mime] || getFallbackTextResource();
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	// Polyfill for `btoa`
	function btoaPolyfill(buffer) {
	    if (typeof btoa !== 'undefined') {
	        return btoa(buffer);
	    }
	    else if (typeof Buffer !== 'undefined') {
	        return Buffer.from(buffer).toString('base64');
	    }
	    return buffer;
	}
	// TODO - support # alias
	// TODO - support empty resource body
	/**
	 * Abstraction on top of resources.txt used for redirections as well as script
	 * injections. It contains logic to parse, serialize and get resources by name
	 * for use in the engine.
	 */
	class Resources {
	    static deserialize(buffer) {
	        const checksum = buffer.getASCII();
	        // Deserialize `resources`
	        const resources = new Map();
	        const numberOfResources = buffer.getUint16();
	        for (let i = 0; i < numberOfResources; i += 1) {
	            resources.set(buffer.getASCII(), {
	                contentType: buffer.getASCII(),
	                body: buffer.getUTF8(),
	            });
	        }
	        // Deserialize `js`
	        const js = new Map();
	        resources.forEach(({ contentType, body }, name) => {
	            if (contentType === 'application/javascript') {
	                js.set(name, body);
	            }
	        });
	        return new Resources({
	            checksum,
	            js,
	            resources,
	        });
	    }
	    static parse(data, { checksum }) {
	        const typeToResource = new Map();
	        const trimComments = (str) => str.replace(/^\s*#.*$/gm, '');
	        const chunks = data.split('\n\n');
	        for (const chunk of chunks) {
	            const resource = trimComments(chunk).trim();
	            if (resource.length !== 0) {
	                const firstNewLine = resource.indexOf('\n');
	                const split = resource.slice(0, firstNewLine).split(/\s+/);
	                const name = split[0];
	                const type = split[1];
	                const body = resource.slice(firstNewLine + 1);
	                if (name === undefined || type === undefined || body === undefined) {
	                    continue;
	                }
	                let resources = typeToResource.get(type);
	                if (resources === undefined) {
	                    resources = new Map();
	                    typeToResource.set(type, resources);
	                }
	                resources.set(name, body);
	            }
	        }
	        // The resource containing javascirpts to be injected
	        const js = typeToResource.get('application/javascript') || new Map();
	        for (const [key, value] of js.entries()) {
	            if (key.endsWith('.js')) {
	                js.set(key.slice(0, -3), value);
	            }
	        }
	        // Create a mapping from resource name to { contentType, data }
	        // used for request redirection.
	        const resourcesByName = new Map();
	        typeToResource.forEach((resources, contentType) => {
	            resources.forEach((resource, name) => {
	                resourcesByName.set(name, {
	                    contentType,
	                    body: resource,
	                });
	            });
	        });
	        return new Resources({
	            checksum,
	            js,
	            resources: resourcesByName,
	        });
	    }
	    constructor({ checksum = '', js = new Map(), resources = new Map() } = {}) {
	        this.checksum = checksum;
	        this.js = js;
	        this.resources = resources;
	    }
	    getResource(name) {
	        const { body, contentType } = this.resources.get(name) || getResourceForMime(name);
	        let dataUrl;
	        if (contentType.indexOf(';') !== -1) {
	            dataUrl = `data:${contentType},${body}`;
	        }
	        else {
	            dataUrl = `data:${contentType};base64,${btoaPolyfill(body)}`;
	        }
	        return { body, contentType, dataUrl };
	    }
	    getSerializedSize() {
	        let estimatedSize = sizeOfASCII(this.checksum) + 2 * sizeOfByte(); // resources.size
	        this.resources.forEach(({ contentType, body }, name) => {
	            estimatedSize += sizeOfASCII(name) + sizeOfASCII(contentType) + sizeOfUTF8(body);
	        });
	        return estimatedSize;
	    }
	    serialize(buffer) {
	        // Serialize `checksum`
	        buffer.pushASCII(this.checksum);
	        // Serialize `resources`
	        buffer.pushUint16(this.resources.size);
	        this.resources.forEach(({ contentType, body }, name) => {
	            buffer.pushASCII(name);
	            buffer.pushASCII(contentType);
	            buffer.pushUTF8(body);
	        });
	    }
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	function compactTokens(tokens) {
	    const sorted = tokens.sort();
	    let lastIndex = 1;
	    for (let i = 1; i < sorted.length; i += 1) {
	        if (sorted[lastIndex - 1] !== sorted[i]) {
	            sorted[lastIndex++] = sorted[i];
	        }
	    }
	    return sorted.subarray(0, lastIndex);
	}
	const EMPTY_UINT32_ARRAY = new Uint32Array(0);
	function concatTypedArrays(arrays) {
	    if (arrays.length === 0) {
	        return EMPTY_UINT32_ARRAY;
	    }
	    if (arrays.length === 1) {
	        return arrays[0];
	    }
	    let totalSize = 0;
	    for (let i = 0; i < arrays.length; i += 1) {
	        totalSize += arrays[i].length;
	    }
	    const result = new Uint32Array(totalSize);
	    let index = 0;
	    for (let i = 0; i < arrays.length; i += 1) {
	        const array = arrays[i];
	        for (let j = 0; j < array.length; j += 1) {
	            result[index++] = array[j];
	        }
	    }
	    return result;
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	function processRegex(r) {
	    return `(?:${r.source})`;
	}
	function escape(s) {
	    return `(?:${s.replace(/[-/\\^$*+?.()|[\]{}]/g, '\\$&')})`;
	}
	function setWithDefault(map, key, value) {
	    let bucket = map.get(key);
	    if (bucket === undefined) {
	        bucket = [];
	        map.set(key, bucket);
	    }
	    bucket.push(value);
	}
	function groupBy(filters, criteria) {
	    const grouped = new Map();
	    for (const filter of filters) {
	        setWithDefault(grouped, criteria(filter), filter);
	    }
	    return Array.from(grouped.values());
	}
	function splitBy(filters, condition) {
	    const positive = [];
	    const negative = [];
	    for (const filter of filters) {
	        if (condition(filter)) {
	            positive.push(filter);
	        }
	        else {
	            negative.push(filter);
	        }
	    }
	    return {
	        negative,
	        positive,
	    };
	}
	const OPTIMIZATIONS = [
	    {
	        description: 'Remove duplicated filters by ID',
	        fusion: (filters) => filters[0],
	        groupByCriteria: (filter) => '' + filter.getId(),
	        select: () => true,
	    },
	    {
	        description: 'Group idential filter with same mask but different domains in single filters',
	        fusion: (filters) => {
	            const parts = [];
	            const hostnames = new Set();
	            const notHostnames = new Set();
	            const entities = new Set();
	            const notEntities = new Set();
	            for (const { domains } of filters) {
	                if (domains !== undefined) {
	                    if (domains.parts !== undefined) {
	                        parts.push(domains.parts);
	                    }
	                    if (domains.hostnames !== undefined) {
	                        for (const hash of domains.hostnames) {
	                            hostnames.add(hash);
	                        }
	                    }
	                    if (domains.entities !== undefined) {
	                        for (const hash of domains.entities) {
	                            entities.add(hash);
	                        }
	                    }
	                    if (domains.notHostnames !== undefined) {
	                        for (const hash of domains.notHostnames) {
	                            notHostnames.add(hash);
	                        }
	                    }
	                    if (domains.notEntities !== undefined) {
	                        for (const hash of domains.notEntities) {
	                            notEntities.add(hash);
	                        }
	                    }
	                }
	            }
	            return new NetworkFilter(Object.assign({}, filters[0], {
	                domains: new Domains({
	                    hostnames: hostnames.size !== 0 ? new Uint32Array(hostnames).sort() : undefined,
	                    entities: entities.size !== 0 ? new Uint32Array(entities).sort() : undefined,
	                    notHostnames: notHostnames.size !== 0 ? new Uint32Array(notHostnames).sort() : undefined,
	                    notEntities: notEntities.size !== 0 ? new Uint32Array(notEntities).sort() : undefined,
	                    parts: parts.length !== 0 ? parts.join(',') : undefined,
	                }),
	                rawLine: filters[0].rawLine !== undefined
	                    ? filters.map(({ rawLine }) => rawLine).join(' <+> ')
	                    : undefined,
	            }));
	        },
	        groupByCriteria: (filter) => filter.getHostname() + filter.getFilter() + filter.getMask() + filter.getRedirect(),
	        select: (filter) => !filter.isCSP() && filter.denyallow === undefined && filter.domains !== undefined,
	    },
	    {
	        description: 'Group simple patterns, into a single filter',
	        fusion: (filters) => {
	            const patterns = [];
	            for (const f of filters) {
	                if (f.isRegex()) {
	                    patterns.push(processRegex(f.getRegex()));
	                }
	                else if (f.isRightAnchor()) {
	                    patterns.push(`${escape(f.getFilter())}$`);
	                }
	                else if (f.isLeftAnchor()) {
	                    patterns.push(`^${escape(f.getFilter())}`);
	                }
	                else {
	                    patterns.push(escape(f.getFilter()));
	                }
	            }
	            return new NetworkFilter(Object.assign({}, filters[0], {
	                mask: setBit(filters[0].mask, NETWORK_FILTER_MASK.isRegex),
	                rawLine: filters[0].rawLine !== undefined
	                    ? filters.map(({ rawLine }) => rawLine).join(' <+> ')
	                    : undefined,
	                regex: new RegExp(patterns.join('|')),
	            }));
	        },
	        groupByCriteria: (filter) => '' + (filter.getMask() & ~NETWORK_FILTER_MASK.isRegex & ~NETWORK_FILTER_MASK.isFullRegex),
	        select: (filter) => filter.domains === undefined &&
	            filter.denyallow === undefined &&
	            !filter.isHostnameAnchor() &&
	            !filter.isRedirect() &&
	            !filter.isCSP(),
	    },
	];
	/**
	 * Optimizer which returns the list of original filters.
	 */
	function noopOptimizeNetwork(filters) {
	    return filters;
	}
	function noopOptimizeCosmetic(filters) {
	    return filters;
	}
	/**
	 * Fusion a set of `filters` by applying optimizations sequentially.
	 */
	function optimizeNetwork(filters) {
	    const fused = [];
	    let toFuse = filters;
	    for (const { select, fusion, groupByCriteria } of OPTIMIZATIONS) {
	        const { positive, negative } = splitBy(toFuse, select);
	        toFuse = negative;
	        const groups = groupBy(positive, groupByCriteria);
	        for (const group of groups) {
	            if (group.length > 1) {
	                fused.push(fusion(group));
	            }
	            else {
	                toFuse.push(group[0]);
	            }
	        }
	    }
	    for (const filter of toFuse) {
	        fused.push(filter);
	    }
	    return fused;
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	// https://graphics.stanford.edu/~seander/bithacks.html#RoundUpPowerOf2
	function nextPow2(v) {
	    v--;
	    v |= v >> 1;
	    v |= v >> 2;
	    v |= v >> 4;
	    v |= v >> 8;
	    v |= v >> 16;
	    v++;
	    return v;
	}
	/**
	 * Generate unique IDs for requests, which is used to avoid matching the same
	 * buckets multiple times on the same request (which can happen if a token
	 * appears more than once in a URL).
	 */
	let UID = 1;
	function getNextId() {
	    const id = UID;
	    UID = (UID + 1) % 1000000000;
	    return id;
	}
	const EMPTY_BUCKET$1 = Number.MAX_SAFE_INTEGER >>> 0;
	/**
	 * The ReverseIndex is an accelerating data structure which allows finding a
	 * subset of the filters given a list of tokens seen in a URL. It is the core
	 * of the adblocker's matching capabilities and speed.
	 *
	 * It has mainly two caracteristics:
	 * 1. It is very compact and is able to load fast.
	 * 2. It is *very fast* in finding potential candidates.
	 *
	 * Conceptually, the reverse index dispatches filters in "buckets" (an array of
	 * one or more filters). Filters living in the same bucket are guaranteed to
	 * share at least one of their tokens (appearing in the pattern). For example:
	 *
	 *   - Bucket 1 (ads):
	 *       - /ads.js
	 *       - /script/ads/tracking.js
	 *       - /ads/
	 *   - Bucket 2 (tracking)
	 *       - /tracking.js
	 *       - ||tracking.com/cdn
	 *
	 * We see that filters in "Bucket 1" are indexed using the token "ads" and
	 * "Bucket 2" using token "tracking".
	 *
	 * This property allows to quickly discard most of the filters when we match a
	 * URL. To achieve this, the URL is tokenized in the same way filters are
	 * tokenized and for each token, we check if there are some filters available.
	 *
	 * For example:
	 *
	 *  URL "https://tracking.com/" has the following tokens: "https", "tracking"
	 *  and "com". We immediatly see that we only check the two filters in the
	 *  "tracking" bucket since they are the only ones having a common token with
	 *  the URL.
	 *
	 * How do we pick the token for each filter?
	 * =========================================
	 *
	 * Each filter is only indexed *once*, which means that we need to pick one of
	 * the tokens appearing in the pattern. We choose the token such that each
	 * filter is indexed using the token which was the *least seen* globally. In
	 * other words, we pick the most discriminative token for each filter. This is
	 * done using the following algorithm:
	 *   1. Tokenize all the filters which will be stored in the index
	 *   2. Compute a histogram of frequency of each token (globally)
	 *   3. Select the best token for each filter (lowest frequency)
	 */
	class ReverseIndex {
	    static deserialize(buffer, deserialize, optimize, config) {
	        const tokensLookupIndexSize = buffer.getUint32();
	        const bucketsIndexSize = buffer.getUint32();
	        const numberOfFilters = buffer.getUint32();
	        // Alignement to 4 bytes is important here since `view` (Uint8Array) can
	        // appear at any offset of `buffer`. But to be sure we can read back
	        // Uint32Array directly from raw buffer, the alignement has to be a
	        // multiple of 4. The same alignement is taken care of in `serialize`.
	        const view = StaticDataView.fromUint8Array(buffer.getBytes(true /* align */), config);
	        const tokensLookupIndex = view.getUint32ArrayView(tokensLookupIndexSize);
	        const bucketsIndex = view.getUint32ArrayView(bucketsIndexSize);
	        const filtersIndexStart = view.pos;
	        view.seekZero(); // not strictly needed but make sure reverse index can be compared with deep equal
	        return new ReverseIndex({
	            config,
	            deserialize,
	            filters: [],
	            optimize,
	        }).updateInternals({
	            bucketsIndex,
	            filtersIndexStart,
	            numberOfFilters,
	            tokensLookupIndex,
	            view,
	        });
	    }
	    constructor({ deserialize, filters, optimize, config, }) {
	        // Internal, compact representation of the reverse index. It contains three
	        // distinct parts stored in the same typed array:
	        //
	        // 1. "tokens lookup index" allows to identify a sub-set of buckets which
	        // likely contain filters for a given token. It is an approximate dispatch
	        // table which maps a mask of N bits (N being smaller than 31 bits, the size
	        // of a token) to a list of buckets having a 'token' sharing these same N
	        // bits sub-set. If the binary representation of the token for bucket1 is
	        // 101010 and suffix has size 3, then we would lookup the "tokens lookup
	        // index" using the last 3 bits "010" which would give us the offset in our
	        // typed array where we can start reading the filters of buckets having a
	        // token ending with the same 3 bits. The value of N is always a power of 2
	        // depending on the total number of filters stored in the index; determined
	        // at the time `update(...)` is called.
	        //
	        // 2. "buckets index" is an array which associates tokens to filters. The
	        // structure is: token, filter, token, filter, etc. To identify all the
	        // filters indexed with 'token' a naive approach would be to iterate on
	        // "buckets index" and collect all the filters indexed with 'token'. This
	        // would be *very inefficient*! To make this process faster, filters in
	        // "buckets index" are grouped so that buckets sharing the same suffix of N
	        // bits in their indexing token (see "tokens lookup index") are stored side
	        // by side in the typed array. To know where this section start given a
	        // particular token, we use "tokens lookup index" which associated the suffix
	        // of size N to an index in "buckets index". From there we can iterate on the
	        // candidates.
	        //
	        // 3. "filters index" contains the filters themselves. "buckets index"
	        // presented earlier does not contain filters, but an index to the "filters
	        // index". This allows a filter to be indexed multiple times without
	        // introducing any overhead; the filter can be associated with multiple
	        // tokens in "buckets index" (each pointing to the same place in "filters
	        // index") but its actual representation is stored only once in "filters
	        // index".
	        this.bucketsIndex = EMPTY_UINT32_ARRAY$1;
	        this.filtersIndexStart = 0;
	        this.numberOfFilters = 0;
	        this.tokensLookupIndex = EMPTY_UINT32_ARRAY$1;
	        // In-memory cache used to keep track of buckets which have been loaded from
	        // the compact representation (i.e.: this.view). It is not strictly necessary
	        // but will speed-up retrival of popular filters (since we do not have to
	        // perform the lookup in "tokens index" and "buckets index" everytime).
	        this.cache = new Map();
	        this.view = StaticDataView.empty(config);
	        this.deserializeFilter = deserialize;
	        this.optimize = optimize;
	        this.config = config;
	        if (filters.length !== 0) {
	            this.update(filters, undefined);
	        }
	    }
	    /**
	     * Load all filters from this index in memory (i.e.: deserialize them from
	     * the byte array into NetworkFilter or CosmeticFilter instances). This is
	     * mostly useful for debugging or testing purposes.
	     */
	    getFilters() {
	        const filters = [];
	        if (this.numberOfFilters === 0) {
	            return filters;
	        }
	        // set view cursor at the start of "filters index"
	        this.view.setPos(this.filtersIndexStart);
	        for (let i = 0; i < this.numberOfFilters; i += 1) {
	            filters.push(this.deserializeFilter(this.view));
	        }
	        this.view.seekZero();
	        return filters;
	    }
	    /**
	     * Return an array of all the tokens currently used as keys of the "buckets index".
	     */
	    getTokens() {
	        const tokens = new Set();
	        for (let i = 0; i < this.bucketsIndex.length; i += 2) {
	            tokens.add(this.bucketsIndex[i]);
	        }
	        return new Uint32Array(tokens);
	    }
	    /**
	     * Estimate the number of bytes needed to serialize this instance of `ReverseIndex`.
	     */
	    getSerializedSize() {
	        // 12 = 4 bytes (tokensLookupIndex.length) + 4 bytes (bucketsIndex.length) + 4 bytes (numberOfFilters)
	        return 12 + sizeOfBytes(this.view.buffer, true /* align */);
	    }
	    /**
	     * Dump this index to `buffer`.
	     */
	    serialize(buffer) {
	        buffer.pushUint32(this.tokensLookupIndex.length);
	        buffer.pushUint32(this.bucketsIndex.length);
	        buffer.pushUint32(this.numberOfFilters);
	        // Aligmenent is crucial here, see comment in `deserialize` for more info.
	        buffer.pushBytes(this.view.buffer, true /* align */);
	    }
	    /**
	     * Iterate on all filters found in buckets associated with the given list of
	     * tokens. The callback is called on each of them. Early termination can be
	     * achieved if the callback returns `false`.
	     *
	     * This will not check if each filter returned would match a given request but
	     * is instead used as a list of potential candidates (much smaller than the
	     * total set of filters; typically between 5 and 10 filters will be checked).
	     */
	    iterMatchingFilters(tokens, cb) {
	        // Each request is assigned an ID so that we can keep track of the last
	        // request seen by each bucket in the reverse index. This provides a cheap
	        // way to prevent filters from being inspected more than once per request
	        // (which could happen if the same token appears more than once in the URL).
	        const requestId = getNextId();
	        for (const token of tokens) {
	            if (this.iterBucket(token, requestId, cb) === false) {
	                return;
	            }
	        }
	        // Fallback to 0 (i.e.: wildcard bucket) bucket if nothing was found before.
	        this.iterBucket(0, requestId, cb);
	    }
	    /**
	     * Re-create the internal data-structure of the reverse index *in-place*. It
	     * needs to be called with a list of new filters and optionally a list of ids
	     * (as returned by either NetworkFilter.getId() or CosmeticFilter.getId())
	     * which need to be removed from the index.
	     */
	    update(newFilters, removedFilters) {
	        // Reset internal cache on each update
	        if (this.cache.size !== 0) {
	            this.cache.clear();
	        }
	        const compression = this.config.enableCompression;
	        let totalNumberOfTokens = 0;
	        let totalNumberOfIndexedFilters = 0;
	        const filtersTokens = [];
	        // Keep track of the final size of the buckets index. `bucketsIndexSize` is
	        // the number of indexed filters, multiplied by 2 (since we store both the
	        // token a filter is indexed with and the index of the filter).
	        let bucketsIndexSize = 0;
	        // Re-use the current size of "filters index" as a starting point so that
	        // we only need to update with new or removed filters. This saves time if
	        // we perform a small update on an existing index.
	        let estimatedBufferSize = this.view.buffer.byteLength - this.filtersIndexStart;
	        // Create a list of all filters which will be part of the index. This means
	        // loading existing filters, removing the ones that need to be deleted and
	        // adding the new ones.  At the same time, we update the estimation of
	        // buffer size needed to store this index.
	        let filters = this.getFilters();
	        if (filters.length !== 0) {
	            // If there is at least one existing filter, then we check if some should
	            // be removed. We subtract their size from the total estimated buffer
	            // size.
	            if (removedFilters !== undefined && removedFilters.size !== 0) {
	                filters = filters.filter((f) => {
	                    if (removedFilters.has(f.getId())) {
	                        estimatedBufferSize -= f.getSerializedSize(compression);
	                        return false;
	                    }
	                    return true;
	                });
	            }
	            // Add new filters to the list and also update estimated size
	            for (const filter of newFilters) {
	                estimatedBufferSize += filter.getSerializedSize(compression);
	                filters.push(filter);
	            }
	        }
	        else {
	            // In the case where there is no existing filter in the index (happens on
	            // initialization), then we can take a fast-path and not check removed
	            // filters at all. There is also no need to copy the array of filters.
	            filters = newFilters;
	            for (const filter of newFilters) {
	                estimatedBufferSize += filter.getSerializedSize(compression);
	            }
	        }
	        // No filters given; reset to empty index and abort.
	        if (filters.length === 0) {
	            this.updateInternals({
	                bucketsIndex: EMPTY_UINT32_ARRAY$1,
	                filtersIndexStart: 0,
	                numberOfFilters: 0,
	                tokensLookupIndex: EMPTY_UINT32_ARRAY$1,
	                view: StaticDataView.empty(this.config),
	            });
	            return;
	        }
	        // When we run in `debug` mode, we enable fully deterministic updates of
	        // internal data-structures. To this effect, we sort all filters before
	        // insertion.
	        if (this.config.debug === true) {
	            filters.sort((f1, f2) => f1.getId() - f2.getId());
	        }
	        const histogram = new Uint32Array(Math.max(nextPow2(2 * filters.length), 256));
	        // Tokenize all filters stored in this index. And compute a histogram of
	        // tokens so that we can decide how to index each filter efficiently.
	        for (const filter of filters) {
	            // Tokenize `filter` and store the result in `filtersTokens` which will
	            // be used in the next step to select the best token for each filter.
	            const multiTokens = filter.getTokens();
	            filtersTokens.push(multiTokens);
	            // Update estimated size of "buckets index" based on number of times this
	            // particular filter will be indexed.
	            bucketsIndexSize += 2 * multiTokens.length; // token + filter index
	            totalNumberOfIndexedFilters += multiTokens.length;
	            // Each filter can be indexed more than once, so `getTokens(...)` returns
	            // multiple sets of tokens. We iterate on all of them and update the
	            // histogram for each.
	            for (const tokens of multiTokens) {
	                totalNumberOfTokens += tokens.length;
	                for (const token of tokens) {
	                    histogram[token % histogram.length] += 1;
	                }
	            }
	        }
	        // Add size of bucketsIndex to total size (x4 because these are 32 bits numbers)
	        estimatedBufferSize += bucketsIndexSize * 4;
	        // Prepare "tokens index" (see documentation in constructor of `ReverseIndex` class above).
	        const tokensLookupIndexSize = Math.max(2, nextPow2(totalNumberOfIndexedFilters));
	        const mask = tokensLookupIndexSize - 1;
	        const suffixes = [];
	        for (let i = 0; i < tokensLookupIndexSize; i += 1) {
	            suffixes.push([]);
	        }
	        // Add size of tokensLookupIndex to total size (x4 because these are 32 bits numbers)
	        estimatedBufferSize += tokensLookupIndexSize * 4;
	        // At this point we know the number of bytes needed for the compact
	        // representation of this reverse index ("tokens index" + "buckets index" +
	        // "filters index"). We allocate it at once and proceed with populating it.
	        const buffer = StaticDataView.allocate(estimatedBufferSize, this.config);
	        const tokensLookupIndex = buffer.getUint32ArrayView(tokensLookupIndexSize);
	        const bucketsIndex = buffer.getUint32ArrayView(bucketsIndexSize);
	        const filtersIndexStart = buffer.getPos();
	        // For each filter, find the best token (least seen) based on histogram.
	        // Since we are iterating again on the filters, we populate "filters index"
	        // in the same loop and keep track of their indices so that we can later
	        // populate "buckets index".
	        for (let i = 0; i < filtersTokens.length; i += 1) {
	            const filter = filters[i];
	            const multiTokens = filtersTokens[i];
	            // Serialize this filter and keep track of its index in the byte array;
	            // it will be used in "buckets index" to point to this filter.
	            const filterIndex = buffer.pos;
	            filter.serialize(buffer);
	            // Index the filter once per "tokens"
	            for (const tokens of multiTokens) {
	                // Find best token (least seen) from `tokens` using `histogram`.
	                let bestToken = 0; // default = wildcard bucket
	                let minCount = totalNumberOfTokens + 1;
	                for (const token of tokens) {
	                    const tokenCount = histogram[token % histogram.length];
	                    if (tokenCount < minCount) {
	                        minCount = tokenCount;
	                        bestToken = token;
	                        // Fast path, if the current token has only been seen once, we can
	                        // stop iterating since we will not find a better alternarive!
	                        if (minCount === 1) {
	                            break;
	                        }
	                    }
	                }
	                // `bestToken & mask` represents the N last bits of `bestToken`. We
	                // group all filters indexed with a token sharing the same N bits.
	                suffixes[bestToken & mask].push([bestToken, filterIndex]);
	            }
	        }
	        // Populate "tokens index" and "buckets index" based on best token found for each filter.
	        let indexInBucketsIndex = 0;
	        for (let i = 0; i < tokensLookupIndexSize; i += 1) {
	            const filtersForMask = suffixes[i];
	            tokensLookupIndex[i] = indexInBucketsIndex;
	            for (const [token, filterIndex] of filtersForMask) {
	                bucketsIndex[indexInBucketsIndex++] = token;
	                bucketsIndex[indexInBucketsIndex++] = filterIndex;
	            }
	        }
	        // Update internals
	        buffer.seekZero();
	        this.updateInternals({
	            bucketsIndex,
	            filtersIndexStart,
	            numberOfFilters: filtersTokens.length,
	            tokensLookupIndex,
	            view: buffer,
	        });
	    }
	    updateInternals({ bucketsIndex, filtersIndexStart, numberOfFilters, tokensLookupIndex, view, }) {
	        this.bucketsIndex = bucketsIndex;
	        this.filtersIndexStart = filtersIndexStart;
	        this.numberOfFilters = numberOfFilters;
	        this.tokensLookupIndex = tokensLookupIndex;
	        this.view = view;
	        view.seekZero();
	        return this;
	    }
	    /**
	     * If a bucket exists for the given token, call the callback on each filter
	     * found inside. An early termination mechanism is built-in, to stop iterating
	     * as soon as `false` is returned from the callback.
	     */
	    iterBucket(token, requestId, cb) {
	        let bucket = this.config.enableInMemoryCache === true ? this.cache.get(token) : undefined;
	        // Lazily create bucket if it does not yet exist in memory. Lookup the
	        // compact bucket representation and find all filters being associated with
	        // `token`. Create a `Bucket` out of them and store them in cache.
	        if (bucket === undefined) {
	            const offset = token & (this.tokensLookupIndex.length - 1);
	            const startOfBucket = this.tokensLookupIndex[offset];
	            // We do not have any filters for this token
	            if (startOfBucket === EMPTY_BUCKET$1) {
	                return true;
	            }
	            // Since we do not store explicitly the number of filters in each
	            // "bucket", we check the index of the next one and use it to infer the
	            // number of filters (each filter being stored as a token + index to the
	            // "filters store")
	            const endOfBucket = offset === this.tokensLookupIndex.length - 1
	                ? this.bucketsIndex.length
	                : this.tokensLookupIndex[offset + 1];
	            // Get indices of filters indexed with `token`, if any.
	            const filtersIndices = [];
	            for (let i = startOfBucket; i < endOfBucket; i += 2) {
	                const currentToken = this.bucketsIndex[i];
	                if (currentToken === token) {
	                    filtersIndices.push(this.bucketsIndex[i + 1]);
	                }
	            }
	            // No filter indexed with `token`.
	            if (filtersIndices.length === 0) {
	                return true; // continue looking for a match
	            }
	            // If we have filters for `token` then deserialize filters in memory and
	            // create a `Bucket` instance to hold them for future access.
	            const filters = [];
	            const view = this.view;
	            for (let i = 0; i < filtersIndices.length; i += 1) {
	                view.setPos(filtersIndices[i]);
	                filters.push(this.deserializeFilter(view));
	            }
	            // Create new bucket with found filters (only optimize if we have more
	            // than one filter).
	            bucket = {
	                filters: filters.length > 1 ? this.optimize(filters) : filters,
	                lastRequestSeen: -1, // safe because all ids are positive
	            };
	            if (this.config.enableInMemoryCache === true) {
	                this.cache.set(token, bucket);
	            }
	        }
	        // Look for matching filter in this bucket
	        if (bucket.lastRequestSeen !== requestId) {
	            bucket.lastRequestSeen = requestId;
	            const filters = bucket.filters;
	            for (let i = 0; i < filters.length; i += 1) {
	                // Break the loop if the callback returns `false`
	                if (cb(filters[i]) === false) {
	                    // Whenever we get a match from a filter, we also swap it one
	                    // position up in the list. This way, over time, popular filters will
	                    // be first and might match earlier. This should decrease the time
	                    // needed to get a match.
	                    if (i > 0) {
	                        const filter = filters[i];
	                        filters[i] = filters[i - 1];
	                        filters[i - 1] = filter;
	                    }
	                    return false;
	                }
	            }
	        }
	        return true;
	    }
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	// Empty filters is 4 bytes because we need at least one 32 bits number to keep
	// track of the number of filters in the container. If there is no filter then
	// the number will be 0.
	const EMPTY_FILTERS = new Uint8Array(4);
	/**
	 * Generic filters container (for both CosmeticFilter and NetworkFilter
	 * instances). This abstracts away some of the logic to serialize/lazy-load
	 * lists of filters (which is useful for things like generic cosmetic filters
	 * or $badfilter).
	 */
	class FiltersContainer {
	    static deserialize(buffer, deserialize, config) {
	        const container = new FiltersContainer({ deserialize, config, filters: [] });
	        container.filters = buffer.getBytes();
	        return container;
	    }
	    constructor({ config, deserialize, filters, }) {
	        this.deserialize = deserialize;
	        this.filters = EMPTY_FILTERS;
	        this.config = config;
	        if (filters.length !== 0) {
	            this.update(filters, undefined);
	        }
	    }
	    /**
	     * Update filters based on `newFilters` and `removedFilters`.
	     */
	    update(newFilters, removedFilters) {
	        // Estimate size of the buffer we will need to store filters. This avoids
	        // having to allocate a big chunk of memory up-front if it's not needed.
	        // We start with the current size of `this.filters` then update it with
	        // removed/added filters.
	        let bufferSizeEstimation = this.filters.byteLength;
	        let selected = [];
	        const compression = this.config.enableCompression;
	        // Add existing rules (removing the ones with ids in `removedFilters`)
	        const currentFilters = this.getFilters();
	        if (currentFilters.length !== 0) {
	            // If no filter was removed (we only add new ones), we don't need to
	            // filter out removed existing filters. So we just assign the array to
	            // `selected` directly to save a bit of effort.
	            if (removedFilters === undefined || removedFilters.size === 0) {
	                selected = currentFilters;
	            }
	            else {
	                // There might be some removed selected filters, so we iterate through
	                // them and make sure we keep only the ones not having been deleted.
	                for (const filter of currentFilters) {
	                    if (removedFilters.has(filter.getId()) === false) {
	                        selected.push(filter);
	                    }
	                    else {
	                        bufferSizeEstimation -= filter.getSerializedSize(compression);
	                    }
	                }
	            }
	        }
	        // If `selected` and `currentFilters` have the same length then no filter was removed.
	        const storedFiltersRemoved = selected.length !== currentFilters.length;
	        // Add new rules.
	        const numberOfExistingFilters = selected.length;
	        for (const filter of newFilters) {
	            bufferSizeEstimation += filter.getSerializedSize(compression);
	            selected.push(filter);
	        }
	        // Check if any new filter was added in `selected` (from `newFilters`).
	        const storedFiltersAdded = selected.length > numberOfExistingFilters;
	        // If selected changed, then update the compact representation of filters.
	        if (selected.length === 0) {
	            this.filters = EMPTY_FILTERS;
	        }
	        else if (storedFiltersAdded === true || storedFiltersRemoved === true) {
	            // Store filters in their compact form
	            const buffer = StaticDataView.allocate(bufferSizeEstimation, this.config);
	            buffer.pushUint32(selected.length);
	            // When we run in `debug` mode, we enable fully deterministic updates of
	            // internal data-structure. To this effect, we sort all filters before
	            // insertion.
	            if (this.config.debug === true) {
	                selected.sort((f1, f2) => f1.getId() - f2.getId());
	            }
	            for (const filter of selected) {
	                filter.serialize(buffer);
	            }
	            // Update internals
	            this.filters = buffer.buffer;
	        }
	    }
	    getSerializedSize() {
	        return sizeOfBytes(this.filters, false /* no alignement */);
	    }
	    serialize(buffer) {
	        buffer.pushBytes(this.filters);
	    }
	    getFilters() {
	        // No filter stored in the container
	        if (this.filters.byteLength <= 4) {
	            return [];
	        }
	        // Load all filters in memory and store them in `cache`
	        const filters = [];
	        const buffer = StaticDataView.fromUint8Array(this.filters, this.config);
	        const numberOfFilters = buffer.getUint32();
	        for (let i = 0; i < numberOfFilters; i += 1) {
	            filters.push(this.deserialize(buffer));
	        }
	        return filters;
	    }
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	/**
	 * Given a list of CSS selectors, create a valid stylesheet ready to be
	 * injected in the page. This also takes care to no create rules with too many
	 * selectors for Chrome, see: https://crbug.com/804179
	 */
	function createStylesheet(rules, style) {
	    if (rules.length === 0) {
	        return '';
	    }
	    const maximumNumberOfSelectors = 1024;
	    const parts = [];
	    const styleStr = ` { ${style} }`;
	    for (let i = 0; i < rules.length; i += maximumNumberOfSelectors) {
	        // Accumulate up to `maximumNumberOfSelectors` selectors into `selector`.
	        // We use string concatenation here since it's faster than using
	        // `Array.prototype.join`.
	        let selector = rules[i];
	        for (let j = i + 1, end = Math.min(rules.length, i + maximumNumberOfSelectors); j < end; j += 1) {
	            selector += ',\n' + rules[j];
	        }
	        // Insert CSS after last selector (e.g.: `{ display: none }`)
	        selector += styleStr;
	        // If `rules` has less than the limit, we can short-circuit here
	        if (rules.length < maximumNumberOfSelectors) {
	            return selector;
	        }
	        // Keep track of this chunk and process next ones
	        parts.push(selector);
	    }
	    // Join all chunks together
	    return parts.join('\n');
	}
	/**
	 * If at least one filter from `rules` has a custom style (e.g.: `##.foo
	 * :style(...)`) then we fallback to `createStylesheetFromRulesWithCustomStyles`
	 * which is slower than `createStylesheetFromRules`.
	 */
	function createStylesheetFromRulesWithCustomStyles(rules) {
	    const selectorsPerStyle = new Map();
	    for (const rule of rules) {
	        const style = rule.getStyle();
	        const selectors = selectorsPerStyle.get(style);
	        if (selectors === undefined) {
	            selectorsPerStyle.set(style, [rule.getSelector()]);
	        }
	        else {
	            selectors.push(rule.getSelector());
	        }
	    }
	    const stylesheets = [];
	    const selectorsPerStyleArray = Array.from(selectorsPerStyle.entries());
	    for (const [style, selectors] of selectorsPerStyleArray) {
	        stylesheets.push(createStylesheet(selectors, style));
	    }
	    return stylesheets.join('\n\n');
	}
	/**
	 * Given a list of cosmetic filters, create a stylesheet ready to be injected.
	 * This function is optimistic and will assume there is no `:style` filter in
	 * `rules`. In case one is found on the way, we fallback to the slower
	 * `createStylesheetFromRulesWithCustomStyles` function.
	 */
	function createStylesheetFromRules(rules) {
	    const selectors = [];
	    for (const rule of rules) {
	        if (rule.hasCustomStyle()) {
	            return createStylesheetFromRulesWithCustomStyles(rules);
	        }
	        selectors.push(rule.selector);
	    }
	    return createStylesheet(selectors, DEFAULT_HIDDING_STYLE);
	}
	function createLookupTokens(hostname, domain) {
	    const hostnamesHashes = getHostnameHashesFromLabelsBackward(hostname, domain);
	    const entitiesHashes = getEntityHashesFromLabelsBackward(hostname, domain);
	    const tokens = new Uint32Array(hostnamesHashes.length + entitiesHashes.length);
	    let index = 0;
	    for (const hash of hostnamesHashes) {
	        tokens[index++] = hash;
	    }
	    for (const hash of entitiesHashes) {
	        tokens[index++] = hash;
	    }
	    return tokens;
	}
	/**
	 * Efficient container for CosmeticFilter instances. Allows to quickly
	 * retrieved scripts and stylesheets to inject in pages for a specific
	 * hostname/domain.
	 */
	class CosmeticFilterBucket {
	    static deserialize(buffer, config) {
	        const bucket = new CosmeticFilterBucket({ config });
	        bucket.genericRules = FiltersContainer.deserialize(buffer, CosmeticFilter.deserialize, config);
	        bucket.classesIndex = ReverseIndex.deserialize(buffer, CosmeticFilter.deserialize, noopOptimizeCosmetic, config);
	        bucket.hostnameIndex = ReverseIndex.deserialize(buffer, CosmeticFilter.deserialize, noopOptimizeCosmetic, config);
	        bucket.hrefsIndex = ReverseIndex.deserialize(buffer, CosmeticFilter.deserialize, noopOptimizeCosmetic, config);
	        bucket.htmlIndex = ReverseIndex.deserialize(buffer, CosmeticFilter.deserialize, noopOptimizeCosmetic, config);
	        bucket.idsIndex = ReverseIndex.deserialize(buffer, CosmeticFilter.deserialize, noopOptimizeCosmetic, config);
	        bucket.unhideIndex = ReverseIndex.deserialize(buffer, CosmeticFilter.deserialize, noopOptimizeCosmetic, config);
	        return bucket;
	    }
	    constructor({ filters = [], config }) {
	        this.genericRules = new FiltersContainer({
	            config,
	            deserialize: CosmeticFilter.deserialize,
	            filters: [],
	        });
	        this.classesIndex = new ReverseIndex({
	            config,
	            deserialize: CosmeticFilter.deserialize,
	            filters: [],
	            optimize: noopOptimizeCosmetic,
	        });
	        this.hostnameIndex = new ReverseIndex({
	            config,
	            deserialize: CosmeticFilter.deserialize,
	            filters: [],
	            optimize: noopOptimizeCosmetic,
	        });
	        this.hrefsIndex = new ReverseIndex({
	            config,
	            deserialize: CosmeticFilter.deserialize,
	            filters: [],
	            optimize: noopOptimizeCosmetic,
	        });
	        this.htmlIndex = new ReverseIndex({
	            config,
	            deserialize: CosmeticFilter.deserialize,
	            filters: [],
	            optimize: noopOptimizeCosmetic,
	        });
	        this.idsIndex = new ReverseIndex({
	            config,
	            deserialize: CosmeticFilter.deserialize,
	            filters: [],
	            optimize: noopOptimizeCosmetic,
	        });
	        this.unhideIndex = new ReverseIndex({
	            config,
	            deserialize: CosmeticFilter.deserialize,
	            filters: [],
	            optimize: noopOptimizeCosmetic,
	        });
	        // In-memory cache, lazily initialized
	        this.baseStylesheet = null;
	        this.extraGenericRules = null;
	        if (filters.length !== 0) {
	            this.update(filters, undefined, config);
	        }
	    }
	    getFilters() {
	        const filters = [];
	        return filters.concat(this.genericRules.getFilters(), this.classesIndex.getFilters(), this.hostnameIndex.getFilters(), this.hrefsIndex.getFilters(), this.htmlIndex.getFilters(), this.idsIndex.getFilters(), this.unhideIndex.getFilters());
	    }
	    update(newFilters, removedFilters, config) {
	        const classSelectors = [];
	        const genericHideRules = [];
	        const hostnameSpecificRules = [];
	        const hrefSelectors = [];
	        const htmlRules = [];
	        const idSelectors = [];
	        const unHideRules = [];
	        for (const rule of newFilters) {
	            if (rule.isUnhide()) {
	                unHideRules.push(rule);
	            }
	            else if (rule.isHtmlFiltering()) {
	                htmlRules.push(rule);
	            }
	            else if (rule.isGenericHide()) {
	                if (rule.isClassSelector()) {
	                    classSelectors.push(rule);
	                }
	                else if (rule.isIdSelector()) {
	                    idSelectors.push(rule);
	                }
	                else if (rule.isHrefSelector()) {
	                    hrefSelectors.push(rule);
	                }
	                else {
	                    genericHideRules.push(rule);
	                }
	            }
	            else if (rule.isExtended() === false || config.loadExtendedSelectors === true) {
	                hostnameSpecificRules.push(rule);
	            }
	        }
	        this.genericRules.update(genericHideRules, removedFilters);
	        this.classesIndex.update(classSelectors, removedFilters);
	        this.hostnameIndex.update(hostnameSpecificRules, removedFilters);
	        this.hrefsIndex.update(hrefSelectors, removedFilters);
	        this.htmlIndex.update(htmlRules, removedFilters);
	        this.idsIndex.update(idSelectors, removedFilters);
	        this.unhideIndex.update(unHideRules, removedFilters);
	    }
	    getSerializedSize() {
	        return (this.genericRules.getSerializedSize() +
	            this.classesIndex.getSerializedSize() +
	            this.hostnameIndex.getSerializedSize() +
	            this.hrefsIndex.getSerializedSize() +
	            this.htmlIndex.getSerializedSize() +
	            this.idsIndex.getSerializedSize() +
	            this.unhideIndex.getSerializedSize());
	    }
	    serialize(buffer) {
	        this.genericRules.serialize(buffer);
	        this.classesIndex.serialize(buffer);
	        this.hostnameIndex.serialize(buffer);
	        this.hrefsIndex.serialize(buffer);
	        this.htmlIndex.serialize(buffer);
	        this.idsIndex.serialize(buffer);
	        this.unhideIndex.serialize(buffer);
	    }
	    getHtmlFilters({ domain, hostname, isFilterExcluded, }) {
	        const filters = [];
	        // Tokens from `hostname` and `domain` which will be used to lookup filters
	        // from the reverse index. The same tokens are re-used for multiple indices.
	        const hostnameTokens = createLookupTokens(hostname, domain);
	        this.htmlIndex.iterMatchingFilters(hostnameTokens, (rule) => {
	            if (rule.match(hostname, domain) && !(isFilterExcluded === null || isFilterExcluded === void 0 ? void 0 : isFilterExcluded(rule))) {
	                filters.push(rule);
	            }
	            return true;
	        });
	        const unhides = [];
	        // If we found at least one candidate, check if we have unhidden rules.
	        if (filters.length !== 0) {
	            this.unhideIndex.iterMatchingFilters(hostnameTokens, (rule) => {
	                if (rule.match(hostname, domain) && !(isFilterExcluded === null || isFilterExcluded === void 0 ? void 0 : isFilterExcluded(rule))) {
	                    unhides.push(rule);
	                }
	                return true;
	            });
	        }
	        return { filters, unhides };
	    }
	    /**
	     * Request cosmetics and scripts to inject in a page.
	     */
	    getCosmeticsFilters({ domain, hostname, classes = [], hrefs = [], ids = [], allowGenericHides = true, allowSpecificHides = true, 
	    // Allows to specify which rules to return
	    getRulesFromDOM = true, getRulesFromHostname = true, isFilterExcluded, }) {
	        // Tokens from `hostname` and `domain` which will be used to lookup filters
	        // from the reverse index. The same tokens are re-used for multiple indices.
	        const hostnameTokens = createLookupTokens(hostname, domain);
	        const filters = [];
	        // =======================================================================
	        // Rules: hostname-specific
	        // =======================================================================
	        // Collect matching rules which specify a hostname constraint.
	        if (getRulesFromHostname === true) {
	            this.hostnameIndex.iterMatchingFilters(hostnameTokens, (filter) => {
	                // A hostname-specific filter is considered if it's a scriptlet (not
	                // impacted by disabling of specific filters) or specific hides are
	                // allowed.
	                if ((allowSpecificHides === true || filter.isScriptInject() === true) &&
	                    filter.match(hostname, domain) &&
	                    !(isFilterExcluded === null || isFilterExcluded === void 0 ? void 0 : isFilterExcluded(filter))) {
	                    filters.push(filter);
	                }
	                return true;
	            });
	        }
	        // =======================================================================
	        // Rules: generic hide
	        // =======================================================================
	        // Optionally, collect genericHide rules. We need to make sure the `rule`
	        // matches the hostname and domain since some generic rules can specify
	        // negated hostnames and entities (e.g.: ~foo.*##generic).
	        if (allowGenericHides === true && getRulesFromHostname === true) {
	            const genericRules = this.getGenericRules();
	            for (const filter of genericRules) {
	                if (filter.match(hostname, domain) === true && !(isFilterExcluded === null || isFilterExcluded === void 0 ? void 0 : isFilterExcluded(filter))) {
	                    filters.push(filter);
	                }
	            }
	        }
	        // =======================================================================
	        // Class selector based
	        // =======================================================================
	        if (allowGenericHides === true && getRulesFromDOM === true && classes.length !== 0) {
	            this.classesIndex.iterMatchingFilters(hashStrings(classes), (filter) => {
	                if (filter.match(hostname, domain) && !(isFilterExcluded === null || isFilterExcluded === void 0 ? void 0 : isFilterExcluded(filter))) {
	                    filters.push(filter);
	                }
	                return true;
	            });
	        }
	        // =======================================================================
	        // Id selector based
	        // =======================================================================
	        if (allowGenericHides === true && getRulesFromDOM === true && ids.length !== 0) {
	            this.idsIndex.iterMatchingFilters(hashStrings(ids), (filter) => {
	                if (filter.match(hostname, domain) && !(isFilterExcluded === null || isFilterExcluded === void 0 ? void 0 : isFilterExcluded(filter))) {
	                    filters.push(filter);
	                }
	                return true;
	            });
	        }
	        // =======================================================================
	        // Href selector based
	        // =======================================================================
	        if (allowGenericHides === true && getRulesFromDOM === true && hrefs.length !== 0) {
	            this.hrefsIndex.iterMatchingFilters(compactTokens(concatTypedArrays(hrefs.map((href) => tokenizeNoSkip(href)))), (filter) => {
	                if (filter.match(hostname, domain) && !(isFilterExcluded === null || isFilterExcluded === void 0 ? void 0 : isFilterExcluded(filter))) {
	                    filters.push(filter);
	                }
	                return true;
	            });
	        }
	        const unhides = [];
	        // If we found at least one candidate, check if we have unhidden rules,
	        // apply them and dispatch rules into `injections` (i.e.: '+js(...)'),
	        // `extended` (i.e. :not(...)), and `styles` (i.e.: '##rule').
	        if (filters.length !== 0) {
	            // =======================================================================
	            // Rules: unhide
	            // =======================================================================
	            // Collect unhidden selectors. They will be used to filter-out canceled
	            // rules from other indices.
	            this.unhideIndex.iterMatchingFilters(hostnameTokens, (filter) => {
	                if (filter.match(hostname, domain) && !(isFilterExcluded === null || isFilterExcluded === void 0 ? void 0 : isFilterExcluded(filter))) {
	                    unhides.push(filter);
	                }
	                return true;
	            });
	        }
	        return {
	            filters,
	            unhides,
	        };
	    }
	    getStylesheetsFromFilters({ filters, extendedFilters, }, { getBaseRules, allowGenericHides, }) {
	        let stylesheet = getBaseRules === false || allowGenericHides === false ? '' : this.getBaseStylesheet();
	        if (filters.length !== 0) {
	            if (stylesheet.length !== 0) {
	                stylesheet += '\n\n';
	            }
	            stylesheet += createStylesheetFromRules(filters);
	        }
	        const extended = [];
	        if (extendedFilters.length !== 0) {
	            const extendedStyles = new Map();
	            for (const filter of extendedFilters) {
	                const ast = filter.getSelectorAST();
	                if (ast !== undefined) {
	                    const attribute = filter.isRemove() ? undefined : filter.getStyleAttributeHash();
	                    if (attribute !== undefined) {
	                        extendedStyles.set(filter.getStyle(), attribute);
	                    }
	                    extended.push({
	                        ast,
	                        remove: filter.isRemove(),
	                        attribute,
	                    });
	                }
	            }
	            if (extendedStyles.size !== 0) {
	                if (stylesheet.length !== 0) {
	                    stylesheet += '\n\n';
	                }
	                stylesheet += [...extendedStyles.entries()]
	                    .map(([style, attribute]) => `[${attribute}] { ${style} }`)
	                    .join('\n\n');
	            }
	        }
	        return { stylesheet, extended };
	    }
	    /**
	     * Return the list of filters which can potentially be un-hidden by another
	     * rule currently contained in the cosmetic bucket.
	     */
	    getGenericRules() {
	        if (this.extraGenericRules === null) {
	            return this.lazyPopulateGenericRulesCache().genericRules;
	        }
	        return this.extraGenericRules;
	    }
	    /**
	     * The base stylesheet is made of generic filters (not specific to any
	     * hostname) which cannot be hidden (i.e.: there is currently no rule which
	     * might hide their selector). This means that it will never change and is
	     * the same for all sites. We generate it once and re-use it any-time we want
	     * to inject it.
	     */
	    getBaseStylesheet() {
	        if (this.baseStylesheet === null) {
	            return this.lazyPopulateGenericRulesCache().baseStylesheet;
	        }
	        return this.baseStylesheet;
	    }
	    /**
	     * This is used to lazily generate both the list of generic rules which can
	     * *potentially be un-hidden* (i.e.: there exists at least one unhide rule
	     * for the selector) and a stylesheet containing all selectors which cannot
	     * be un-hidden. Since this list will not change between updates we can
	     * generate once and use many times.
	     */
	    lazyPopulateGenericRulesCache() {
	        if (this.baseStylesheet === null || this.extraGenericRules === null) {
	            // Collect all selectors which can be subjected to an unhide rule
	            const unHideRules = this.unhideIndex.getFilters();
	            const canBeHiddenSelectors = new Set();
	            for (const rule of unHideRules) {
	                canBeHiddenSelectors.add(rule.getSelector());
	            }
	            // Split generic rules into two groups:
	            // 1. Rules which cannot be hidden
	            // 2. Rules which can be hidden on some domains
	            //
	            // This allows to create a base stylesheet which we know will never
	            // change then keep a minority of rules in-memory which can potentially
	            // be hidden.
	            const genericRules = this.genericRules.getFilters();
	            const cannotBeHiddenRules = [];
	            const canBeHiddenRules = [];
	            for (const rule of genericRules) {
	                if (rule.hasCustomStyle() ||
	                    rule.isScriptInject() ||
	                    rule.hasHostnameConstraint() ||
	                    canBeHiddenSelectors.has(rule.getSelector())) {
	                    canBeHiddenRules.push(rule);
	                }
	                else {
	                    cannotBeHiddenRules.push(rule);
	                }
	            }
	            this.baseStylesheet = createStylesheetFromRules(cannotBeHiddenRules);
	            this.extraGenericRules = canBeHiddenRules;
	        }
	        return {
	            baseStylesheet: this.baseStylesheet,
	            genericRules: this.extraGenericRules,
	        };
	    }
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	/**
	 * Accelerating data structure for network filters matching.
	 */
	class NetworkFilterBucket {
	    static deserialize(buffer, config) {
	        const bucket = new NetworkFilterBucket({ config });
	        bucket.index = ReverseIndex.deserialize(buffer, NetworkFilter.deserialize, config.enableOptimizations ? optimizeNetwork : noopOptimizeNetwork, config);
	        bucket.badFilters = FiltersContainer.deserialize(buffer, NetworkFilter.deserialize, config);
	        return bucket;
	    }
	    constructor({ filters = [], config }) {
	        this.index = new ReverseIndex({
	            config,
	            deserialize: NetworkFilter.deserialize,
	            filters: [],
	            optimize: config.enableOptimizations ? optimizeNetwork : noopOptimizeNetwork,
	        });
	        this.badFiltersIds = null;
	        this.badFilters = new FiltersContainer({
	            config,
	            deserialize: NetworkFilter.deserialize,
	            filters: [],
	        });
	        if (filters.length !== 0) {
	            this.update(filters, undefined);
	        }
	    }
	    getFilters() {
	        const filters = [];
	        return filters.concat(this.badFilters.getFilters(), this.index.getFilters());
	    }
	    update(newFilters, removedFilters) {
	        const badFilters = [];
	        const remaining = [];
	        for (const filter of newFilters) {
	            if (filter.isBadFilter()) {
	                badFilters.push(filter);
	            }
	            else {
	                remaining.push(filter);
	            }
	        }
	        this.badFilters.update(badFilters, removedFilters);
	        this.index.update(remaining, removedFilters);
	        this.badFiltersIds = null;
	    }
	    getSerializedSize() {
	        return this.badFilters.getSerializedSize() + this.index.getSerializedSize();
	    }
	    serialize(buffer) {
	        this.index.serialize(buffer);
	        this.badFilters.serialize(buffer);
	    }
	    matchAll(request, isFilterExcluded) {
	        const filters = [];
	        this.index.iterMatchingFilters(request.getTokens(), (filter) => {
	            if (filter.match(request) &&
	                this.isFilterDisabled(filter) === false &&
	                !(isFilterExcluded === null || isFilterExcluded === void 0 ? void 0 : isFilterExcluded(filter))) {
	                filters.push(filter);
	            }
	            return true;
	        });
	        return filters;
	    }
	    match(request, isFilterExcluded) {
	        let match;
	        this.index.iterMatchingFilters(request.getTokens(), (filter) => {
	            if (filter.match(request) &&
	                this.isFilterDisabled(filter) === false &&
	                !(isFilterExcluded === null || isFilterExcluded === void 0 ? void 0 : isFilterExcluded(filter))) {
	                match = filter;
	                return false;
	            }
	            return true;
	        });
	        return match;
	    }
	    /**
	     * Given a matching filter, check if it is disabled by a $badfilter.
	     */
	    isFilterDisabled(filter) {
	        // Lazily load information about bad filters in memory. The only thing we
	        // keep in memory is the list of IDs from $badfilter (ignoring the
	        // $badfilter option from mask). This allows to check if a matching filter
	        // should be ignored just by doing a lookup in a set of IDs.
	        if (this.badFiltersIds === null) {
	            const badFilters = this.badFilters.getFilters();
	            // Shortcut if there is no badfilter in this bucket
	            if (badFilters.length === 0) {
	                return false;
	            }
	            // Create in-memory list of disabled filter IDs
	            const badFiltersIds = new Set();
	            for (const badFilter of badFilters) {
	                badFiltersIds.add(badFilter.getIdWithoutBadFilter());
	            }
	            this.badFiltersIds = badFiltersIds;
	        }
	        return this.badFiltersIds.has(filter.getId());
	    }
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	const EMPTY_BUCKET = Number.MAX_SAFE_INTEGER >>> 0;
	/**
	 * This is a simpler version of reverse-index data structure which implements
	 * a simple Map-like class, backed by compact typed arrays. This means that
	 * the structure can be serialized to a typed array very quickly and loaded
	 * back instantly.
	 */
	class CompactMap {
	    static deserialize(buffer, deserialize) {
	        const tokensLookupIndexSize = buffer.getUint32();
	        const bucketsIndexSize = buffer.getUint32();
	        const numberOfValues = buffer.getUint32();
	        // Alignement to 4 bytes is important here since `view` (Uint8Array) can
	        // appear at any offset of `buffer`. But to be sure we can read back
	        // Uint32Array directly from raw buffer, the alignement has to be a
	        // multiple of 4. The same alignement is taken care of in `serialize`.
	        const view = StaticDataView.fromUint8Array(buffer.getBytes(true /* align */), {
	            enableCompression: false,
	        });
	        const tokensLookupIndex = view.getUint32ArrayView(tokensLookupIndexSize);
	        const bucketsIndex = view.getUint32ArrayView(bucketsIndexSize);
	        const valuesIndexStart = view.pos;
	        view.seekZero(); // not strictly needed but make sure reverse index can be compared with deep equal
	        return new CompactMap({
	            deserialize,
	            // Left empty on purpose since we don't need these to deserialize (all
	            // the data is already in the serialized data).
	            values: [],
	            getKeys: () => [],
	            getSerializedSize: () => 0,
	            serialize: () => {
	                /* Empty */
	            },
	        }).updateInternals({
	            bucketsIndex,
	            valuesIndexStart,
	            numberOfValues,
	            tokensLookupIndex,
	            view,
	        });
	    }
	    constructor({ serialize, deserialize, getKeys, getSerializedSize, values, }) {
	        // In-memory cache used to keep track of metadata which has already been
	        // loaded from the compact representation (i.e.: this.view). It is not
	        // strictly necessary but will speed-up retrival of popular patterns
	        // (since we do not have to perform the lookup again).
	        this.cache = new Map();
	        this.bucketsIndex = EMPTY_UINT32_ARRAY$1;
	        this.tokensLookupIndex = EMPTY_UINT32_ARRAY$1;
	        this.valuesIndexStart = 0;
	        this.numberOfValues = 0;
	        this.view = StaticDataView.empty({ enableCompression: false });
	        this.deserializeValue = deserialize;
	        if (values.length !== 0) {
	            const patternsKeys = [];
	            // Keep track of the final size of the buckets index. `bucketsIndexSize`
	            // is the number of indexed values, multiplied by 2 (since we store both
	            // the `key` a value is indexed with and the index of the value itself).
	            let bucketsIndexSize = 0;
	            // Create a list of all values which will be part of the map. This means
	            // computing an estimation of the buffer size needed to store this index.
	            let estimatedBufferSize = 0;
	            for (const value of values) {
	                estimatedBufferSize += getSerializedSize(value);
	            }
	            // No values given; reset to empty index and abort.
	            if (values.length === 0) {
	                this.updateInternals({
	                    bucketsIndex: EMPTY_UINT32_ARRAY$1,
	                    valuesIndexStart: 0,
	                    numberOfValues: 0,
	                    tokensLookupIndex: EMPTY_UINT32_ARRAY$1,
	                    view: StaticDataView.empty({ enableCompression: false }),
	                });
	                return;
	            }
	            for (const value of values) {
	                // Get keys from `value` and store the result in `patternsKeys` which
	                // will be used in the next step to select the best key for each value.
	                const keys = getKeys(value);
	                patternsKeys.push(keys);
	                bucketsIndexSize += 2 * keys.length; // key + value index
	            }
	            // Add size of bucketsIndex to total size (x4 because these are 32 bits numbers)
	            estimatedBufferSize += bucketsIndexSize * 4;
	            // Prepare "tokens index" (see documentation in constructor of `ReverseIndex` class).
	            const tokensLookupIndexSize = Math.max(2, nextPow2(values.length));
	            const mask = tokensLookupIndexSize - 1;
	            const suffixes = [];
	            for (let i = 0; i < tokensLookupIndexSize; i += 1) {
	                suffixes.push([]);
	            }
	            // Add size of tokensLookupIndex to total size (x4 because these are 32 bits numbers)
	            estimatedBufferSize += tokensLookupIndexSize * 4;
	            // At this point we know the number of bytes needed for the compact
	            // representation of this map ("tokens index" + "buckets index" +
	            // "values index"). We allocate it at once and proceed with populating it.
	            const buffer = StaticDataView.allocate(estimatedBufferSize, { enableCompression: false });
	            const tokensLookupIndex = buffer.getUint32ArrayView(tokensLookupIndexSize);
	            const bucketsIndex = buffer.getUint32ArrayView(bucketsIndexSize);
	            const valuesIndexStart = buffer.getPos();
	            // For each value, find the best token (least seen) based on histogram.
	            // Since we are iterating again on the values, we populate "values index"
	            // in the same loop and keep track of their indices so that we can later
	            // populate "buckets index".
	            for (let i = 0; i < patternsKeys.length; i += 1) {
	                const value = values[i];
	                const keys = patternsKeys[i];
	                // Serialize this value and keep track of its index in the byte array;
	                // it will be used in "buckets index" to point to this value.
	                const valueIndex = buffer.pos;
	                serialize(value, buffer);
	                for (const key of keys) {
	                    // `key & mask` represents the N last bits of `key`. We group all
	                    // values indexed with the same `key` sharing the same N bits.
	                    suffixes[key & mask].push([key, valueIndex]);
	                }
	            }
	            // Populate "tokens index" and "buckets index" based on keys for each value.
	            let indexInBucketsIndex = 0;
	            for (let i = 0; i < tokensLookupIndexSize; i += 1) {
	                const valuesForMask = suffixes[i];
	                tokensLookupIndex[i] = indexInBucketsIndex;
	                for (const [token, valueIndex] of valuesForMask) {
	                    bucketsIndex[indexInBucketsIndex++] = token;
	                    bucketsIndex[indexInBucketsIndex++] = valueIndex;
	                }
	            }
	            // Update internals
	            this.updateInternals({
	                bucketsIndex,
	                valuesIndexStart,
	                numberOfValues: patternsKeys.length,
	                tokensLookupIndex,
	                view: buffer,
	            });
	        }
	    }
	    updateInternals({ bucketsIndex, valuesIndexStart, numberOfValues, tokensLookupIndex, view, }) {
	        this.bucketsIndex = bucketsIndex;
	        this.valuesIndexStart = valuesIndexStart;
	        this.numberOfValues = numberOfValues;
	        this.tokensLookupIndex = tokensLookupIndex;
	        this.view = view;
	        view.seekZero();
	        return this;
	    }
	    getValues() {
	        const values = [];
	        if (this.numberOfValues === 0) {
	            return values;
	        }
	        // set view cursor at the start of "values index"
	        this.view.setPos(this.valuesIndexStart);
	        for (let i = 0; i < this.numberOfValues; i += 1) {
	            values.push(this.deserializeValue(this.view));
	        }
	        this.view.seekZero();
	        return values;
	    }
	    /**
	     * Estimate the number of bytes needed to serialize this instance of `Map`.
	     */
	    getSerializedSize() {
	        // 12 = 4 bytes (tokensLookupIndex.length) + 4 bytes (bucketsIndex.length) + 4 bytes (numberOfValues)
	        return 12 + sizeOfBytes(this.view.buffer, true /* align */);
	    }
	    /**
	     * Dump this index to `buffer`.
	     */
	    serialize(buffer) {
	        buffer.pushUint32(this.tokensLookupIndex.length);
	        buffer.pushUint32(this.bucketsIndex.length);
	        buffer.pushUint32(this.numberOfValues);
	        // Aligmenent is crucial here, see comment in `deserialize` for more info.
	        buffer.pushBytes(this.view.buffer, true /* align */);
	    }
	    get(key) {
	        const cachedValues = this.cache.get(key);
	        if (cachedValues !== undefined) {
	            return cachedValues;
	        }
	        const offset = key & (this.tokensLookupIndex.length - 1);
	        const startOfBucket = this.tokensLookupIndex[offset];
	        // We do not have any values for this token
	        if (startOfBucket === EMPTY_BUCKET) {
	            return [];
	        }
	        // Since we do not store explicitly the number of values in each
	        // "bucket", we check the index of the next one and use it to infer the
	        // number of values (each value being stored as a token + index to the
	        // "values store")
	        const endOfBucket = offset === this.tokensLookupIndex.length - 1
	            ? this.bucketsIndex.length
	            : this.tokensLookupIndex[offset + 1];
	        // Get indices of values indexed with `token`, if any.
	        const valuesIndices = [];
	        for (let i = startOfBucket; i < endOfBucket; i += 2) {
	            const currentToken = this.bucketsIndex[i];
	            if (currentToken === key) {
	                valuesIndices.push(this.bucketsIndex[i + 1]);
	            }
	        }
	        // No value indexed with `token`.
	        if (valuesIndices.length === 0) {
	            return []; // continue looking for a match
	        }
	        // If we have values for `token` then deserialize values in memory and
	        // create a `Bucket` instance to hold them for future access.
	        const values = [];
	        const view = this.view;
	        for (let i = 0; i < valuesIndices.length; i += 1) {
	            view.setPos(valuesIndices[i]);
	            values.push(this.deserializeValue(view));
	        }
	        this.cache.set(key, values);
	        return values;
	    }
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	function isValid$2(category) {
	    if (category === null) {
	        return false;
	    }
	    if (typeof category !== 'object') {
	        return false;
	    }
	    const { key, name, color, description } = category;
	    if (typeof key !== 'string') {
	        return false;
	    }
	    if (typeof name !== 'string') {
	        return false;
	    }
	    if (typeof color !== 'string') {
	        return false;
	    }
	    if (typeof description !== 'string') {
	        return false;
	    }
	    return true;
	}
	function getKey$1(category) {
	    return fastHash(category.key);
	}
	function getSerializedSize$2(category) {
	    return (sizeOfUTF8(category.key) +
	        sizeOfUTF8(category.name) +
	        sizeOfUTF8(category.color) +
	        sizeOfUTF8(category.description));
	}
	function serialize$2(category, view) {
	    view.pushUTF8(category.key);
	    view.pushUTF8(category.name);
	    view.pushUTF8(category.color);
	    view.pushUTF8(category.description);
	}
	function deserialize$2(view) {
	    return {
	        key: view.getUTF8(),
	        name: view.getUTF8(),
	        color: view.getUTF8(),
	        description: view.getUTF8(),
	    };
	}
	function createMap$2(categories) {
	    return new CompactMap({
	        getSerializedSize: getSerializedSize$2,
	        getKeys: (category) => [getKey$1(category)],
	        serialize: serialize$2,
	        deserialize: deserialize$2,
	        values: categories,
	    });
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	/**
	 * This function takes an object representing an organization from TrackerDB
	 * dump and validates its shape. The result is the same object, but strongly
	 * typed.
	 */
	function isValid$1(organization) {
	    if (organization === null) {
	        return false;
	    }
	    if (typeof organization !== 'object') {
	        return false;
	    }
	    const { key, name, description, country, website_url: websiteUrl, privacy_policy_url: privacyPolicyUrl, privacy_contact: privacyContact, ghostery_id: ghosteryId, } = organization;
	    if (typeof key !== 'string') {
	        return false;
	    }
	    if (typeof name !== 'string') {
	        return false;
	    }
	    if (description !== null && typeof description !== 'string') {
	        return false;
	    }
	    if (country !== null && typeof country !== 'string') {
	        return false;
	    }
	    if (websiteUrl !== null && typeof websiteUrl !== 'string') {
	        return false;
	    }
	    if (privacyPolicyUrl !== null && typeof privacyPolicyUrl !== 'string') {
	        return false;
	    }
	    if (privacyContact !== null && typeof privacyContact !== 'string') {
	        return false;
	    }
	    if (ghosteryId !== null && typeof ghosteryId !== 'string') {
	        return false;
	    }
	    return true;
	}
	function getKey(organization) {
	    return fastHash(organization.key);
	}
	function getSerializedSize$1(organization) {
	    return (sizeOfUTF8(organization.key) +
	        sizeOfUTF8(organization.name) +
	        sizeOfUTF8(organization.description || '') +
	        sizeOfUTF8(organization.website_url || '') +
	        sizeOfUTF8(organization.country || '') +
	        sizeOfUTF8(organization.privacy_policy_url || '') +
	        sizeOfUTF8(organization.privacy_contact || '') +
	        sizeOfUTF8(organization.ghostery_id || ''));
	}
	function serialize$1(organization, view) {
	    view.pushUTF8(organization.key);
	    view.pushUTF8(organization.name);
	    view.pushUTF8(organization.description || '');
	    view.pushUTF8(organization.website_url || '');
	    view.pushUTF8(organization.country || '');
	    view.pushUTF8(organization.privacy_policy_url || '');
	    view.pushUTF8(organization.privacy_contact || '');
	    view.pushUTF8(organization.ghostery_id || '');
	}
	function deserialize$1(view) {
	    return {
	        key: view.getUTF8(),
	        name: view.getUTF8(),
	        description: view.getUTF8() || null,
	        website_url: view.getUTF8() || null,
	        country: view.getUTF8() || null,
	        privacy_policy_url: view.getUTF8() || null,
	        privacy_contact: view.getUTF8() || null,
	        ghostery_id: view.getUTF8() || null,
	    };
	}
	function createMap$1(organizations) {
	    return new CompactMap({
	        getSerializedSize: getSerializedSize$1,
	        getKeys: (organization) => [getKey(organization)],
	        serialize: serialize$1,
	        deserialize: deserialize$1,
	        values: organizations,
	    });
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	/**
	 * This function takes an object representing a pattern from TrackerDB dump
	 * and validates its shape. The result is the same object, but strongly typed.
	 */
	function isValid(pattern) {
	    if (pattern === null) {
	        return false;
	    }
	    if (typeof pattern !== 'object') {
	        return false;
	    }
	    const { key, name, category, organization, alias, website_url: websiteUrl, domains, filters, } = pattern;
	    if (typeof key !== 'string') {
	        return false;
	    }
	    if (typeof name !== 'string') {
	        return false;
	    }
	    if (typeof category !== 'string') {
	        return false;
	    }
	    if (organization !== null && typeof organization !== 'string') {
	        return false;
	    }
	    if (typeof alias !== 'string' && alias !== null) {
	        return false;
	    }
	    if (websiteUrl !== null && typeof websiteUrl !== 'string') {
	        return false;
	    }
	    if (!Array.isArray(domains) || !domains.every((domain) => typeof domain === 'string')) {
	        return false;
	    }
	    if (!Array.isArray(filters) || !filters.every((filter) => typeof filter === 'string')) {
	        return false;
	    }
	    return true;
	}
	function getKeys(pattern) {
	    const keys = [];
	    for (const filter of pattern.filters) {
	        const parsedFilter = NetworkFilter.parse(filter);
	        if (parsedFilter !== null) {
	            keys.push(parsedFilter.getId());
	        }
	    }
	    for (const domain of pattern.domains) {
	        const parsedFilter = NetworkFilter.parse(`||${domain}^`);
	        if (parsedFilter !== null) {
	            keys.push(parsedFilter.getId());
	        }
	    }
	    return [...new Set(keys)];
	}
	function getSerializedSize(pattern) {
	    let sizeOfDomains = sizeOfLength(pattern.domains.length);
	    for (const domain of pattern.domains) {
	        sizeOfDomains += sizeOfUTF8(domain);
	    }
	    let sizeOfFilters = sizeOfLength(pattern.filters.length);
	    for (const filter of pattern.filters) {
	        sizeOfFilters += sizeOfUTF8(filter);
	    }
	    return (sizeOfUTF8(pattern.key) +
	        sizeOfUTF8(pattern.name) +
	        sizeOfUTF8(pattern.category) +
	        sizeOfUTF8(pattern.organization || '') +
	        sizeOfUTF8(pattern.alias || '') +
	        sizeOfUTF8(pattern.website_url || '') +
	        sizeOfUTF8(pattern.ghostery_id || '') +
	        sizeOfDomains +
	        sizeOfFilters);
	}
	function serialize(pattern, view) {
	    view.pushUTF8(pattern.key);
	    view.pushUTF8(pattern.name);
	    view.pushUTF8(pattern.category);
	    view.pushUTF8(pattern.organization || '');
	    view.pushUTF8(pattern.alias || '');
	    view.pushUTF8(pattern.website_url || '');
	    view.pushUTF8(pattern.ghostery_id || '');
	    view.pushLength(pattern.domains.length);
	    for (const domain of pattern.domains) {
	        view.pushUTF8(domain);
	    }
	    view.pushLength(pattern.filters.length);
	    for (const filter of pattern.filters) {
	        view.pushUTF8(filter);
	    }
	}
	function deserialize(view) {
	    const key = view.getUTF8();
	    const name = view.getUTF8();
	    const category = view.getUTF8();
	    const organization = view.getUTF8() || null;
	    const alias = view.getUTF8() || null;
	    const website_url = view.getUTF8() || null;
	    const ghostery_id = view.getUTF8() || null;
	    const numberOfDomains = view.getLength();
	    const domains = [];
	    for (let i = 0; i < numberOfDomains; i += 1) {
	        domains.push(view.getUTF8());
	    }
	    const numberOfFilters = view.getLength();
	    const filters = [];
	    for (let i = 0; i < numberOfFilters; i += 1) {
	        filters.push(view.getUTF8());
	    }
	    return {
	        key,
	        name,
	        category,
	        organization,
	        alias,
	        website_url,
	        ghostery_id,
	        domains,
	        filters,
	    };
	}
	function createMap(patterns) {
	    return new CompactMap({
	        getSerializedSize,
	        getKeys,
	        serialize,
	        deserialize,
	        values: patterns,
	    });
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	// Optionally, we can also compress their names and descriptions but I think that should not be necessary as it's probably pretty small.
	// Usage in MV3 extension
	// ======================
	// 1. The extension will load the binary engine containing metadata and store it locally
	// 2. Either on webRequest events or DNR filter IDs (requires to synchronize the IDs), we tag the request with their metadata
	// (2.) At runtime, we will either feed it a request and we expect to get metadata (match, get filter, then from filter ID, get metadata)
	//    Or we feed it the filter ID directly, from the DNR engine (but then it means we need to use the filter hash as an ID there as well and hope for no collision)
	class Metadata {
	    static deserialize(buffer) {
	        const metadata = new Metadata(null);
	        metadata.categories = CompactMap.deserialize(buffer, deserialize$2);
	        metadata.organizations = CompactMap.deserialize(buffer, deserialize$1);
	        metadata.patterns = CompactMap.deserialize(buffer, deserialize);
	        return metadata;
	    }
	    constructor(rawTrackerDB) {
	        if (!rawTrackerDB) {
	            this.organizations = createMap$1([]);
	            this.categories = createMap$2([]);
	            this.patterns = createMap([]);
	            return;
	        }
	        const { patterns: rawPatterns, organizations: rawOrganizations, categories: rawCategories, } = rawTrackerDB;
	        // Type-check categories
	        const categories = [];
	        if (typeof rawCategories === 'object') {
	            for (const [key, category] of Object.entries(rawCategories)) {
	                if (typeof category !== 'object') {
	                    continue;
	                }
	                const categoryWithKey = { key, ...category };
	                if (isValid$2(categoryWithKey)) {
	                    categories.push(categoryWithKey);
	                }
	                else {
	                    console.error('?? invalid category', categoryWithKey);
	                }
	            }
	        }
	        this.categories = createMap$2(categories);
	        // Type-check organizations
	        const organizations = [];
	        if (typeof rawOrganizations === 'object') {
	            for (const [key, organization] of Object.entries(rawOrganizations)) {
	                if (typeof organization !== 'object') {
	                    continue;
	                }
	                const organizationWithKey = { key, ...organization };
	                if (isValid$1(organizationWithKey)) {
	                    organizations.push(organizationWithKey);
	                }
	                else {
	                    console.error('?? invalid organization', organizationWithKey);
	                }
	            }
	        }
	        this.organizations = createMap$1(organizations);
	        // Type-check patterns
	        const patterns = [];
	        if (typeof rawPatterns === 'object') {
	            for (const [key, pattern] of Object.entries(rawPatterns)) {
	                if (typeof pattern !== 'object') {
	                    continue;
	                }
	                const patternWithKey = { key, ...pattern };
	                if (isValid(patternWithKey)) {
	                    patterns.push(patternWithKey);
	                }
	                else {
	                    console.error('?? invalid pattern', patternWithKey);
	                }
	            }
	        }
	        this.patterns = createMap(patterns);
	    }
	    getCategories() {
	        return this.categories.getValues();
	    }
	    getOrganizations() {
	        return this.organizations.getValues();
	    }
	    getPatterns() {
	        return this.patterns.getValues();
	    }
	    /**
	     * Estimate the total serialized size of this Metadata instance.
	     */
	    getSerializedSize() {
	        return (this.categories.getSerializedSize() +
	            this.organizations.getSerializedSize() +
	            this.patterns.getSerializedSize());
	    }
	    /**
	     * Serialize this instance of Metadata into `view`
	     */
	    serialize(buffer) {
	        this.categories.serialize(buffer);
	        this.organizations.serialize(buffer);
	        this.patterns.serialize(buffer);
	    }
	    /**
	     * Given an instance of NetworkFilter, retrieve pattern, organization and
	     * category information.
	     */
	    fromFilter(filter) {
	        return this.fromId(filter.getId());
	    }
	    /**
	     * Given a domain, retrieve pattern, organization and category information.
	     */
	    fromDomain(domain) {
	        const domainParts = domain.split('.');
	        for (; domainParts.length >= 2; domainParts.shift()) {
	            const subdomain = domainParts.join('.');
	            const parsedDomainFilter = NetworkFilter.parse(`||${subdomain}^`);
	            if (parsedDomainFilter === null) {
	                continue;
	            }
	            const patterns = this.fromId(parsedDomainFilter.getId());
	            if (patterns.length > 0) {
	                return patterns;
	            }
	        }
	        return [];
	    }
	    /**
	     * Given an `id` from filter, retrieve using the NetworkFilter.getId() method,
	     * lookup associated patterns (including organization and category) in an
	     * efficient way.
	     */
	    fromId(id) {
	        var _a, _b;
	        const results = [];
	        for (const pattern of this.patterns.get(id)) {
	            results.push({
	                pattern,
	                category: (_a = this.categories.get(getKey$1({ key: pattern.category }))) === null || _a === void 0 ? void 0 : _a[0],
	                organization: pattern.organization !== null
	                    ? (_b = this.organizations.get(getKey({ key: pattern.organization }))) === null || _b === void 0 ? void 0 : _b[0]
	                    : null,
	            });
	        }
	        return results;
	    }
	}

	class PreprocessorBucket {
	    static deserialize(view) {
	        const excluded = new Set();
	        for (let i = 0, l = view.getUint32(); i < l; i++) {
	            excluded.add(view.getUint32());
	        }
	        const preprocessors = [];
	        for (let i = 0, l = view.getUint32(); i < l; i++) {
	            preprocessors.push(Preprocessor.deserialize(view));
	        }
	        return new this({
	            excluded,
	            preprocessors,
	        });
	    }
	    constructor({ excluded = new Set(), preprocessors = [], }) {
	        this.excluded = excluded;
	        this.preprocessors = preprocessors;
	    }
	    isFilterExcluded(filter) {
	        return this.excluded.has(filter.getId());
	    }
	    updateEnv(env) {
	        // Update excluded filter ids based on bindings
	        this.excluded.clear();
	        for (const preprocessor of this.preprocessors) {
	            if (!preprocessor.evaluate(env)) {
	                for (const filterID of preprocessor.filterIDs) {
	                    this.excluded.add(filterID);
	                }
	            }
	        }
	    }
	    update({ added, removed, }, env) {
	        if (removed) {
	            for (const preprocessor of removed) {
	                const local = this.preprocessors.find((local) => local.condition === preprocessor.condition);
	                // Skip if we don't have any preprocessor on local
	                // In the context of filters updates from CDN this should never happen.
	                if (!local) {
	                    continue;
	                }
	                for (const filterID of preprocessor.filterIDs) {
	                    local.filterIDs.delete(filterID);
	                }
	            }
	        }
	        if (added) {
	            for (const preprocessor of added) {
	                const local = this.preprocessors.find((local) => local.condition === preprocessor.condition);
	                if (!local) {
	                    this.preprocessors.push(preprocessor);
	                    continue;
	                }
	                for (const filterID of preprocessor.filterIDs) {
	                    local.filterIDs.add(filterID);
	                }
	            }
	        }
	        if ((removed && removed.length !== 0) || (added && added.length !== 0)) {
	            this.updateEnv(env);
	        }
	    }
	    serialize(view) {
	        view.pushUint32(this.excluded.size);
	        for (const filterID of this.excluded) {
	            view.pushUint32(filterID);
	        }
	        view.pushUint32(this.preprocessors.length);
	        for (const preprocessor of this.preprocessors) {
	            preprocessor.serialize(view);
	        }
	    }
	    getSerializedSize() {
	        let estimatedSize = (1 + this.excluded.size) * 4;
	        estimatedSize += 4;
	        for (const preprocessor of this.preprocessors) {
	            estimatedSize += preprocessor.getSerializedSize();
	        }
	        return estimatedSize;
	    }
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	const ENGINE_VERSION = 665;
	function shouldApplyHideException(filters) {
	    if (filters.length === 0) {
	        return false;
	    }
	    // Get $Xhide filter with highest priority:
	    // $Xhide,important > $Xhide > @@$Xhide
	    let genericHideFilter;
	    let currentScore = 0;
	    for (const filter of filters) {
	        // To encode priority between filters, we create a bitmask with the following:
	        // $important,Xhide = 100 (takes precedence)
	        // $Xhide           = 010 (exception to @@$Xhide)
	        // @@$Xhide         = 001 (forbids Xhide filters)
	        const score = (filter.isImportant() ? 4 : 0) | (filter.isException() ? 1 : 2);
	        // Highest `score` has precedence
	        if (score >= currentScore) {
	            currentScore = score;
	            genericHideFilter = filter;
	        }
	    }
	    if (genericHideFilter === undefined) {
	        return false;
	    }
	    // Check that there is at least one $generichide match and no exception
	    return genericHideFilter.isException();
	}
	class FilterEngine extends EventEmitter {
	    static fromCached(init, caching) {
	        if (caching === undefined) {
	            return init();
	        }
	        const { path, read, write } = caching;
	        return read(path)
	            .then((buffer) => this.deserialize(buffer))
	            .catch(() => init().then((engine) => write(path, engine.serialize()).then(() => engine)));
	    }
	    static empty(config = {}) {
	        return new this({ config });
	    }
	    /**
	     * Create an instance of `FiltersEngine` (or subclass like `ElectronBlocker`,
	     * etc.), from the list of subscriptions provided as argument (e.g.:
	     * EasyList).
	     *
	     * Lists are fetched using the instance of `fetch` provided as a first
	     * argument. Optionally resources.txt and config can be provided.
	     */
	    static fromLists(fetch, urls, config = {}, caching) {
	        return this.fromCached(() => {
	            const listsPromises = fetchLists(fetch, urls);
	            const resourcesPromise = fetchResources(fetch);
	            return Promise.all([listsPromises, resourcesPromise]).then(([lists, resources]) => {
	                const engine = this.parse(lists.join('\n'), config);
	                if (resources !== undefined) {
	                    engine.updateResources(resources, '' + resources.length);
	                }
	                return engine;
	            });
	        }, caching);
	    }
	    /**
	     * Initialize blocker of *ads only*.
	     *
	     * Attempt to initialize a blocking engine using a pre-built version served
	     * from Ghostery's CDN. If this fails (e.g.: if no pre-built engine is available
	     * for this version of the library), then falls-back to using `fromLists(...)`
	     * method with the same subscriptions.
	     */
	    static fromPrebuiltAdsOnly(fetchImpl = fetch, caching) {
	        return this.fromLists(fetchImpl, adsLists, {}, caching);
	    }
	    /**
	     * Same as `fromPrebuiltAdsOnly(...)` but also contains rules to block
	     * tracking (i.e.: using extra lists such as EasyPrivacy and more).
	     */
	    static fromPrebuiltAdsAndTracking(fetchImpl = fetch, caching) {
	        return this.fromLists(fetchImpl, adsAndTrackingLists, {}, caching);
	    }
	    /**
	     * Same as `fromPrebuiltAdsAndTracking(...)` but also contains annoyances
	     * rules to block things like cookie notices.
	     */
	    static fromPrebuiltFull(fetchImpl = fetch, caching) {
	        return this.fromLists(fetchImpl, fullLists, {}, caching);
	    }
	    static fromTrackerDB(rawJsonDump, options = {}) {
	        const config = new Config(options);
	        const metadata = new Metadata(rawJsonDump);
	        const filters = [];
	        for (const pattern of metadata.getPatterns()) {
	            filters.push(...pattern.filters);
	        }
	        const engine = this.parse(filters.join('\n'), config);
	        engine.metadata = metadata;
	        return engine;
	    }
	    static merge(engines) {
	        if (!engines || engines.length < 2) {
	            throw new Error('merging engines requires at least two engines');
	        }
	        const config = engines[0].config;
	        const lists = new Map();
	        const networkFilters = new Map();
	        const cosmeticFilters = new Map();
	        const preprocessors = [];
	        const metadata = {
	            organizations: {},
	            categories: {},
	            patterns: {},
	        };
	        const resources = new Map();
	        const compatibleConfigKeys = [];
	        const configKeysMustMatch = Object.keys(config).filter(function (key) {
	            return (typeof config[key] === 'boolean' && !compatibleConfigKeys.includes(key));
	        });
	        for (const engine of engines) {
	            // Validate the config
	            for (const configKey of configKeysMustMatch) {
	                if (config[configKey] !== engine.config[configKey]) {
	                    throw new Error(`config "${configKey}" of all merged engines must be the same`);
	                }
	            }
	            const filters = engine.getFilters();
	            for (const networkFilter of filters.networkFilters) {
	                networkFilters.set(networkFilter.getId(), networkFilter);
	            }
	            for (const cosmeticFilter of filters.cosmeticFilters) {
	                cosmeticFilters.set(cosmeticFilter.getId(), cosmeticFilter);
	            }
	            for (const preprocessor of engine.preprocessors.preprocessors) {
	                preprocessors.push(preprocessor);
	            }
	            for (const [key, value] of engine.lists) {
	                if (lists.has(key)) {
	                    continue;
	                }
	                lists.set(key, value);
	            }
	            if (engine.metadata !== undefined) {
	                for (const organization of engine.metadata.organizations.getValues()) {
	                    if (metadata.organizations[organization.key] === undefined) {
	                        metadata.organizations[organization.key] = organization;
	                    }
	                }
	                for (const category of engine.metadata.categories.getValues()) {
	                    if (metadata.categories[category.key] === undefined) {
	                        metadata.categories[category.key] = category;
	                    }
	                }
	                for (const pattern of engine.metadata.patterns.getValues()) {
	                    if (metadata.patterns[pattern.key] === undefined) {
	                        metadata.patterns[pattern.key] = pattern;
	                    }
	                }
	            }
	            for (const [name, resource] of engine.resources.resources) {
	                if (!resources.has(name)) {
	                    resources.set(name, resource);
	                }
	            }
	        }
	        const resourcesText = [...resources.entries()]
	            .reduce((state, [name, resource]) => {
	            return [...state, `${name} ${resource.contentType}\n${resource.body}`];
	        }, [])
	            .join('\n\n');
	        const engine = new this({
	            networkFilters: Array.from(networkFilters.values()),
	            cosmeticFilters: Array.from(cosmeticFilters.values()),
	            preprocessors,
	            lists,
	            config,
	        });
	        if (Object.keys(metadata.categories).length +
	            Object.keys(metadata.organizations).length +
	            Object.keys(metadata.patterns).length !==
	            0) {
	            engine.metadata = new Metadata(metadata);
	        }
	        engine.resources = Resources.parse(resourcesText, {
	            checksum: fastHash(resourcesText).toString(16),
	        });
	        return engine;
	    }
	    static parse(filters, options = {}) {
	        const config = new Config(options);
	        return new this({
	            ...parseFilters(filters, config),
	            config,
	        });
	    }
	    static deserialize(serialized) {
	        const buffer = StaticDataView.fromUint8Array(serialized, {
	            enableCompression: false,
	        });
	        // Before starting deserialization, we make sure that the version of the
	        // serialized engine is the same as the current source code. If not, we
	        // start fresh and create a new engine from the lists.
	        const serializedEngineVersion = buffer.getUint16();
	        if (ENGINE_VERSION !== serializedEngineVersion) {
	            throw new Error(`serialized engine version mismatch, expected ${ENGINE_VERSION} but got ${serializedEngineVersion}`);
	        }
	        // Create a new engine with same options
	        const config = Config.deserialize(buffer);
	        // Optionally turn compression ON
	        if (config.enableCompression) {
	            buffer.enableCompression();
	        }
	        // Also make sure that the built-in checksum is correct. This allows to
	        // detect data corruption and start fresh if the serialized version was
	        // altered.
	        if (config.integrityCheck) {
	            const currentPos = buffer.pos;
	            buffer.pos = serialized.length - 4;
	            const checksum = buffer.checksum();
	            const expected = buffer.getUint32();
	            if (checksum !== expected) {
	                throw new Error(`serialized engine checksum mismatch, expected ${expected} but got ${checksum}`);
	            }
	            buffer.pos = currentPos;
	        }
	        const engine = new this({ config });
	        // Deserialize resources
	        engine.resources = Resources.deserialize(buffer);
	        // Deserialize lists
	        const lists = new Map();
	        const numberOfLists = buffer.getUint16();
	        for (let i = 0; i < numberOfLists; i += 1) {
	            lists.set(buffer.getASCII(), buffer.getASCII());
	        }
	        engine.lists = lists;
	        // Deserialize preprocessors
	        engine.preprocessors = PreprocessorBucket.deserialize(buffer);
	        // Deserialize buckets
	        engine.importants = NetworkFilterBucket.deserialize(buffer, config);
	        engine.redirects = NetworkFilterBucket.deserialize(buffer, config);
	        engine.filters = NetworkFilterBucket.deserialize(buffer, config);
	        engine.exceptions = NetworkFilterBucket.deserialize(buffer, config);
	        engine.csp = NetworkFilterBucket.deserialize(buffer, config);
	        engine.cosmetics = CosmeticFilterBucket.deserialize(buffer, config);
	        engine.hideExceptions = NetworkFilterBucket.deserialize(buffer, config);
	        // Optionally deserialize metadata
	        const hasMetadata = buffer.getBool();
	        if (hasMetadata) {
	            engine.metadata = Metadata.deserialize(buffer);
	        }
	        buffer.seekZero();
	        return engine;
	    }
	    constructor({ 
	    // Optionally initialize the engine with filters
	    cosmeticFilters = [], networkFilters = [], preprocessors = [], config = new Config(), lists = new Map(), } = {}) {
	        super(); // init super-class EventEmitter
	        this.config = new Config(config);
	        // Subscription management: disabled by default
	        this.lists = lists;
	        // Preprocessors
	        this.preprocessors = new PreprocessorBucket({});
	        // $csp=
	        this.csp = new NetworkFilterBucket({ config: this.config });
	        // $elemhide
	        // $generichide
	        // $specifichide
	        this.hideExceptions = new NetworkFilterBucket({ config: this.config });
	        // @@filter
	        this.exceptions = new NetworkFilterBucket({ config: this.config });
	        // $important
	        this.importants = new NetworkFilterBucket({ config: this.config });
	        // $redirect
	        this.redirects = new NetworkFilterBucket({ config: this.config });
	        // All other filters
	        this.filters = new NetworkFilterBucket({ config: this.config });
	        // Cosmetic filters
	        this.cosmetics = new CosmeticFilterBucket({ config: this.config });
	        // Injections
	        this.resources = new Resources();
	        if (networkFilters.length !== 0 || cosmeticFilters.length !== 0) {
	            this.update({
	                newCosmeticFilters: cosmeticFilters,
	                newNetworkFilters: networkFilters,
	                newPreprocessors: preprocessors,
	            });
	        }
	    }
	    isFilterExcluded(filter) {
	        return this.preprocessors.isFilterExcluded(filter);
	    }
	    updateEnv(env) {
	        this.preprocessors.updateEnv(env);
	    }
	    /**
	     * Estimate the number of bytes needed to serialize this instance of
	     * `FiltersEngine` using the `serialize(...)` method. It is used internally
	     * by `serialize(...)` to allocate a buffer of the right size and you should
	     * not have to call it yourself most of the time.
	     *
	     * There are cases where we cannot estimate statically the exact size of the
	     * resulting buffer (due to alignement which needs to be performed); this
	     * method will return a safe estimate which will always be at least equal to
	     * the real number of bytes needed, or bigger (usually of a few bytes only:
	     * ~20 bytes is to be expected).
	     */
	    getSerializedSize() {
	        let estimatedSize = sizeOfByte() + // engine version
	            this.config.getSerializedSize() +
	            this.resources.getSerializedSize() +
	            this.preprocessors.getSerializedSize() +
	            this.filters.getSerializedSize() +
	            this.exceptions.getSerializedSize() +
	            this.importants.getSerializedSize() +
	            this.redirects.getSerializedSize() +
	            this.csp.getSerializedSize() +
	            this.cosmetics.getSerializedSize() +
	            this.hideExceptions.getSerializedSize() +
	            4; // checksum
	        // Estimate size of `this.lists` which stores information of checksum for each list.
	        for (const [name, checksum] of this.lists) {
	            estimatedSize += sizeOfASCII(name) + sizeOfASCII(checksum);
	        }
	        estimatedSize += sizeOfBool();
	        if (this.metadata !== undefined) {
	            estimatedSize += this.metadata.getSerializedSize();
	        }
	        return estimatedSize;
	    }
	    /**
	     * Creates a binary representation of the full engine. It can be stored
	     * on-disk for faster loading of the adblocker. The `deserialize` static
	     * method of Engine can be used to restore the engine.
	     */
	    serialize(array) {
	        const buffer = StaticDataView.fromUint8Array(array || new Uint8Array(this.getSerializedSize()), this.config);
	        buffer.pushUint16(ENGINE_VERSION);
	        // Config
	        this.config.serialize(buffer);
	        // Resources (js, resources)
	        this.resources.serialize(buffer);
	        // Serialize the state of lists (names and checksums)
	        buffer.pushUint16(this.lists.size);
	        for (const [name, value] of Array.from(this.lists.entries()).sort()) {
	            buffer.pushASCII(name);
	            buffer.pushASCII(value);
	        }
	        // Preprocessors
	        this.preprocessors.serialize(buffer);
	        // Filters buckets
	        this.importants.serialize(buffer);
	        this.redirects.serialize(buffer);
	        this.filters.serialize(buffer);
	        this.exceptions.serialize(buffer);
	        this.csp.serialize(buffer);
	        this.cosmetics.serialize(buffer);
	        this.hideExceptions.serialize(buffer);
	        // Optionally serialize metadata
	        buffer.pushBool(this.metadata !== undefined);
	        if (this.metadata !== undefined) {
	            this.metadata.serialize(buffer);
	        }
	        // Optionally append a checksum at the end
	        if (this.config.integrityCheck) {
	            buffer.pushUint32(buffer.checksum());
	        }
	        return buffer.subarray();
	    }
	    /**
	     * Update engine with new filters or resources.
	     */
	    loadedLists() {
	        return Array.from(this.lists.keys());
	    }
	    hasList(name, checksum) {
	        return this.lists.has(name) && this.lists.get(name) === checksum;
	    }
	    /**
	     * Update engine with `resources.txt` content.
	     */
	    updateResources(data, checksum) {
	        if (this.resources.checksum === checksum) {
	            return false;
	        }
	        this.resources = Resources.parse(data, { checksum });
	        return true;
	    }
	    getFilters() {
	        const cosmeticFilters = [];
	        const networkFilters = [];
	        return {
	            cosmeticFilters: cosmeticFilters.concat(this.cosmetics.getFilters()),
	            networkFilters: networkFilters.concat(this.filters.getFilters(), this.exceptions.getFilters(), this.importants.getFilters(), this.redirects.getFilters(), this.csp.getFilters(), this.hideExceptions.getFilters()),
	        };
	    }
	    /**
	     * Update engine with new filters as well as optionally removed filters.
	     */
	    update({ newNetworkFilters = [], newCosmeticFilters = [], newPreprocessors = [], removedCosmeticFilters = [], removedNetworkFilters = [], removedPreprocessors = [], }, env = new Env()) {
	        let updated = false;
	        // Update preprocessors
	        if (this.config.loadPreprocessors &&
	            (newPreprocessors.length !== 0 || removedPreprocessors.length !== 0)) {
	            updated = true;
	            this.preprocessors.update({
	                added: newPreprocessors,
	                removed: removedPreprocessors,
	            }, env);
	        }
	        // Update cosmetic filters
	        if (this.config.loadCosmeticFilters &&
	            (newCosmeticFilters.length !== 0 || removedCosmeticFilters.length !== 0)) {
	            updated = true;
	            this.cosmetics.update(newCosmeticFilters, removedCosmeticFilters.length === 0 ? undefined : new Set(removedCosmeticFilters), this.config);
	        }
	        // Update network filters
	        if (this.config.loadNetworkFilters &&
	            (newNetworkFilters.length !== 0 || removedNetworkFilters.length !== 0)) {
	            updated = true;
	            const filters = [];
	            const csp = [];
	            const exceptions = [];
	            const importants = [];
	            const redirects = [];
	            const hideExceptions = [];
	            for (const filter of newNetworkFilters) {
	                // NOTE: it's important to check for $generichide, $elemhide,
	                // $specifichide and $csp before exceptions and important as we store
	                // all of them in the same filter bucket. The check for exceptions is
	                // done at match-time directly.
	                if (filter.isCSP()) {
	                    csp.push(filter);
	                }
	                else if (filter.isGenericHide() || filter.isSpecificHide()) {
	                    hideExceptions.push(filter);
	                }
	                else if (filter.isException()) {
	                    exceptions.push(filter);
	                }
	                else if (filter.isImportant()) {
	                    importants.push(filter);
	                }
	                else if (filter.isRedirect()) {
	                    redirects.push(filter);
	                }
	                else {
	                    filters.push(filter);
	                }
	            }
	            const removedNetworkFiltersSet = removedNetworkFilters.length === 0 ? undefined : new Set(removedNetworkFilters);
	            // Update buckets in-place
	            this.importants.update(importants, removedNetworkFiltersSet);
	            this.redirects.update(redirects, removedNetworkFiltersSet);
	            this.filters.update(filters, removedNetworkFiltersSet);
	            if (this.config.loadExceptionFilters === true) {
	                this.exceptions.update(exceptions, removedNetworkFiltersSet);
	            }
	            if (this.config.loadCSPFilters === true) {
	                this.csp.update(csp, removedNetworkFiltersSet);
	            }
	            this.hideExceptions.update(hideExceptions, removedNetworkFiltersSet);
	        }
	        return updated;
	    }
	    updateFromDiff({ added, removed, preprocessors }, env) {
	        const newCosmeticFilters = [];
	        const newNetworkFilters = [];
	        const newPreprocessors = [];
	        const removedCosmeticFilters = [];
	        const removedNetworkFilters = [];
	        const removedPreprocessors = [];
	        if (removed !== undefined && removed.length !== 0) {
	            const { networkFilters, cosmeticFilters } = parseFilters(removed.join('\n'), this.config);
	            Array.prototype.push.apply(removedCosmeticFilters, cosmeticFilters);
	            Array.prototype.push.apply(removedNetworkFilters, networkFilters);
	        }
	        if (added !== undefined && added.length !== 0) {
	            const { networkFilters, cosmeticFilters } = parseFilters(added.join('\n'), this.config);
	            Array.prototype.push.apply(newCosmeticFilters, cosmeticFilters);
	            Array.prototype.push.apply(newNetworkFilters, networkFilters);
	        }
	        if (preprocessors !== undefined) {
	            for (const [condition, details] of Object.entries(preprocessors)) {
	                if (details.removed !== undefined && details.removed.length !== 0) {
	                    const { networkFilters, cosmeticFilters } = parseFilters(details.removed.join('\n'), this.config);
	                    const filterIDs = new Set([]
	                        .concat(cosmeticFilters.map((filter) => filter.getId()))
	                        .concat(networkFilters.map((filter) => filter.getId())));
	                    removedPreprocessors.push(new Preprocessor({
	                        condition,
	                        filterIDs,
	                    }));
	                }
	                if (details.added !== undefined && details.added.length !== 0) {
	                    const { networkFilters, cosmeticFilters } = parseFilters(details.added.join('\n'), this.config);
	                    const filterIDs = new Set([]
	                        .concat(cosmeticFilters.map((filter) => filter.getId()))
	                        .concat(networkFilters.map((filter) => filter.getId())));
	                    newPreprocessors.push(new Preprocessor({
	                        condition,
	                        filterIDs,
	                    }));
	                }
	            }
	        }
	        return this.update({
	            newCosmeticFilters,
	            newNetworkFilters,
	            newPreprocessors,
	            removedCosmeticFilters: removedCosmeticFilters.map((f) => f.getId()),
	            removedNetworkFilters: removedNetworkFilters.map((f) => f.getId()),
	            removedPreprocessors,
	        }, env);
	    }
	    /**
	     * Return a list of HTML filtering rules.
	     */
	    getHtmlFilters({ 
	    // Page information
	    url, hostname, domain, callerContext, }) {
	        const htmlSelectors = [];
	        if (this.config.enableHtmlFiltering === false || this.config.loadCosmeticFilters === false) {
	            return htmlSelectors;
	        }
	        domain || (domain = '');
	        const { filters, unhides } = this.cosmetics.getHtmlFilters({
	            domain,
	            hostname,
	            isFilterExcluded: this.isFilterExcluded.bind(this),
	        });
	        const exceptions = new Map(unhides.map((unhide) => [unhide.getSelector(), unhide]));
	        for (const filter of filters) {
	            const extended = filter.getExtendedSelector();
	            if (extended === undefined) {
	                continue;
	            }
	            const exception = exceptions.get(filter.getSelector());
	            if (exception !== undefined) {
	                htmlSelectors.push(extended);
	            }
	            this.emit('filter-matched', { filter, exception }, {
	                url,
	                callerContext,
	                filterType: FilterType.COSMETIC,
	            });
	        }
	        if (htmlSelectors.length !== 0) {
	            this.emit('html-filtered', htmlSelectors, url);
	        }
	        return htmlSelectors;
	    }
	    /**
	     * Given `hostname` and `domain` of a page (or frame), return the list of
	     * styles and scripts to inject in the page.
	     */
	    getCosmeticsFilters({ 
	    // Page information
	    url, hostname, domain, 
	    // DOM information
	    classes, hrefs, ids, 
	    // Allows to specify which rules to return
	    getBaseRules = true, getInjectionRules = true, getExtendedRules = true, getRulesFromDOM = true, getRulesFromHostname = true, callerContext, }) {
	        if (this.config.loadCosmeticFilters === false) {
	            return {
	                active: false,
	                extended: [],
	                scripts: [],
	                styles: '',
	            };
	        }
	        domain || (domain = '');
	        let allowGenericHides = true;
	        let allowSpecificHides = true;
	        const exceptions = this.hideExceptions.matchAll(Request.fromRawDetails({
	            domain,
	            hostname,
	            url,
	            sourceDomain: '',
	            sourceHostname: '',
	            sourceUrl: '',
	        }), this.isFilterExcluded.bind(this));
	        const genericHides = [];
	        const specificHides = [];
	        for (const filter of exceptions) {
	            if (filter.isElemHide()) {
	                allowGenericHides = false;
	                allowSpecificHides = false;
	                break;
	            }
	            if (filter.isSpecificHide()) {
	                specificHides.push(filter);
	            }
	            else if (filter.isGenericHide()) {
	                genericHides.push(filter);
	            }
	        }
	        if (allowGenericHides === true) {
	            allowGenericHides = shouldApplyHideException(genericHides) === false;
	        }
	        if (allowSpecificHides === true) {
	            allowSpecificHides = shouldApplyHideException(specificHides) === false;
	        }
	        // Lookup injections as well as stylesheets
	        const { filters, unhides } = this.cosmetics.getCosmeticsFilters({
	            domain,
	            hostname,
	            classes,
	            hrefs,
	            ids,
	            allowGenericHides,
	            allowSpecificHides,
	            getRulesFromDOM,
	            getRulesFromHostname,
	            isFilterExcluded: this.isFilterExcluded.bind(this),
	        });
	        let injectionsDisabled = false;
	        const unhideExceptions = new Map();
	        for (const unhide of unhides) {
	            if (unhide.isScriptInject() === true &&
	                unhide.isUnhide() === true &&
	                unhide.getSelector().length === 0) {
	                injectionsDisabled = true;
	            }
	            unhideExceptions.set(unhide.getSelector(), unhide);
	        }
	        const injections = [];
	        const styleFilters = [];
	        const extendedFilters = [];
	        if (filters.length !== 0) {
	            // Apply unhide rules + dispatch
	            for (const filter of filters) {
	                // Make sure `rule` is not un-hidden by a #@# filter
	                const exception = unhideExceptions.get(filter.getSelector());
	                if (exception !== undefined) {
	                    continue;
	                }
	                let applied = false;
	                // Dispatch filters in `injections` or `styles` depending on type
	                if (filter.isScriptInject() === true) {
	                    if (getInjectionRules === true && injectionsDisabled === false) {
	                        injections.push(filter);
	                        applied = true;
	                    }
	                }
	                else if (filter.isExtended()) {
	                    if (getExtendedRules === true) {
	                        extendedFilters.push(filter);
	                        applied = true;
	                    }
	                }
	                else {
	                    styleFilters.push(filter);
	                    applied = true;
	                }
	                if (applied) {
	                    this.emit('filter-matched', {
	                        filter,
	                        exception,
	                    }, {
	                        url,
	                        callerContext,
	                        filterType: FilterType.COSMETIC,
	                    });
	                }
	            }
	        }
	        // Perform interpolation for injected scripts
	        const scripts = [];
	        for (const injection of injections) {
	            const script = injection.getScript(this.resources.js);
	            if (script !== undefined) {
	                this.emit('script-injected', script, url);
	                scripts.push(script);
	            }
	        }
	        const { stylesheet, extended } = this.cosmetics.getStylesheetsFromFilters({
	            filters: styleFilters,
	            extendedFilters,
	        }, { getBaseRules, allowGenericHides });
	        // Emit events
	        if (stylesheet.length !== 0) {
	            this.emit('style-injected', stylesheet, url);
	        }
	        return {
	            active: true,
	            extended,
	            scripts,
	            styles: stylesheet,
	        };
	    }
	    /**
	     * Given a `request`, return all matching network filters found in the engine.
	     */
	    matchAll(request) {
	        const filters = [];
	        if (request.isSupported) {
	            Array.prototype.push.apply(filters, this.importants.matchAll(request, this.isFilterExcluded.bind(this)));
	            Array.prototype.push.apply(filters, this.filters.matchAll(request, this.isFilterExcluded.bind(this)));
	            Array.prototype.push.apply(filters, this.exceptions.matchAll(request, this.isFilterExcluded.bind(this)));
	            Array.prototype.push.apply(filters, this.csp.matchAll(request, this.isFilterExcluded.bind(this)));
	            Array.prototype.push.apply(filters, this.hideExceptions.matchAll(request, this.isFilterExcluded.bind(this)));
	            Array.prototype.push.apply(filters, this.redirects.matchAll(request, this.isFilterExcluded.bind(this)));
	        }
	        return new Set(filters);
	    }
	    /**
	     * Given a "main_frame" request, check if some content security policies
	     * should be injected in the page.
	     */
	    getCSPDirectives(request) {
	        if (!this.config.loadNetworkFilters) {
	            return undefined;
	        }
	        if (request.isSupported !== true || request.isMainFrame() === false) {
	            return undefined;
	        }
	        const matches = this.csp.matchAll(request, this.isFilterExcluded.bind(this));
	        // No $csp filter found
	        if (matches.length === 0) {
	            return undefined;
	        }
	        // Collect all CSP directives and keep track of exceptions
	        const cspExceptions = new Map();
	        const cspFilters = [];
	        for (const filter of matches) {
	            if (filter.isException()) {
	                if (filter.csp === undefined) {
	                    // All CSP directives are disabled for this site
	                    this.emit('filter-matched', { exception: filter }, { request, filterType: FilterType.NETWORK });
	                    return undefined;
	                }
	                cspExceptions.set(filter.csp, filter);
	            }
	            else {
	                cspFilters.push(filter);
	            }
	        }
	        if (cspFilters.length === 0) {
	            return undefined;
	        }
	        const enabledCsp = new Set();
	        // Combine all CSPs (except the black-listed ones)
	        for (const filter of cspFilters.values()) {
	            const exception = cspExceptions.get(filter.csp);
	            if (exception === undefined) {
	                enabledCsp.add(filter.csp);
	            }
	            this.emit('filter-matched', { filter, exception }, { request, filterType: FilterType.NETWORK });
	        }
	        const csps = Array.from(enabledCsp).join('; ');
	        if (csps.length > 0) {
	            this.emit('csp-injected', request, csps);
	        }
	        return csps;
	    }
	    /**
	     * Decide if a network request (usually from WebRequest API) should be
	     * blocked, redirected or allowed.
	     */
	    match(request, withMetadata = false) {
	        const result = {
	            exception: undefined,
	            filter: undefined,
	            match: false,
	            redirect: undefined,
	            metadata: undefined,
	        };
	        if (!this.config.loadNetworkFilters) {
	            return result;
	        }
	        if (request.isSupported) {
	            // Check the filters in the following order:
	            // 1. $important (not subject to exceptions)
	            // 2. redirection ($redirect=resource)
	            // 3. normal filters
	            // 4. exceptions
	            result.filter = this.importants.match(request, this.isFilterExcluded.bind(this));
	            let redirectNone;
	            let redirectRule;
	            // If `result.filter` is `undefined`, it means there was no $important
	            // filter found so far. We look for a $redirect filter.  There is some
	            // extra logic to handle special cases like redirect-rule and
	            // redirect=none.
	            //
	            // * If redirect=none is found, then cancel all redirects.
	            // * Else if redirect-rule is found, only redirect if request would be blocked.
	            // * Else if redirect is found, redirect.
	            if (result.filter === undefined) {
	                const redirects = this.redirects.matchAll(request, this.isFilterExcluded.bind(this));
	                if (redirects.length !== 0) {
	                    for (const filter of redirects) {
	                        if (filter.getRedirect() === 'none') {
	                            redirectNone = filter;
	                        }
	                        else if (filter.isRedirectRule()) {
	                            redirectRule = filter;
	                        }
	                        else {
	                            result.filter = filter;
	                        }
	                    }
	                }
	                // If `result.filter` is still `undefined`, it means that there was no
	                // redirection rule triggered for the request. We look for a normal
	                // match.
	                if (result.filter === undefined) {
	                    result.filter = this.filters.match(request, this.isFilterExcluded.bind(this));
	                    // If we found a match, and a `$redirect-rule` as found previously,
	                    // then we transform the match into a redirect, following the
	                    // semantics of redirect-rule.
	                    if (redirectRule !== undefined && result.filter !== undefined) {
	                        result.filter = redirectRule;
	                    }
	                }
	                // If we found either a redirection rule or a normal match, then check
	                // for exceptions which could apply on the request and un-block it.
	                if (result.filter !== undefined) {
	                    result.exception = this.exceptions.match(request, this.isFilterExcluded.bind(this));
	                }
	            }
	            // If there was a redirect match and no exception was found, then we
	            // proceed and process the redirect rule. This means two things:
	            //
	            // 1. Check if a redirect=none rule was found, which acts as exception.
	            // 2. If no exception was found, prepare `result.redirect` response.
	            if (result.filter !== undefined &&
	                result.exception === undefined &&
	                result.filter.isRedirect()) {
	                if (redirectNone !== undefined) {
	                    result.exception = redirectNone;
	                }
	                else {
	                    result.redirect = this.resources.getResource(result.filter.getRedirect());
	                }
	            }
	        }
	        result.match = result.exception === undefined && result.filter !== undefined;
	        if (result.filter) {
	            this.emit('filter-matched', { filter: result.filter, exception: result.exception }, { request, filterType: FilterType.NETWORK });
	        }
	        if (result.exception !== undefined) {
	            this.emit('request-whitelisted', request, result);
	        }
	        else if (result.redirect !== undefined) {
	            this.emit('request-redirected', request, result);
	        }
	        else if (result.filter !== undefined) {
	            this.emit('request-blocked', request, result);
	        }
	        else {
	            this.emit('request-allowed', request, result);
	        }
	        if (withMetadata === true && result.filter !== undefined && this.metadata) {
	            result.metadata = this.metadata.fromFilter(result.filter);
	        }
	        return result;
	    }
	    getPatternMetadata(request, { getDomainMetadata = false } = {}) {
	        if (this.metadata === undefined) {
	            return [];
	        }
	        const seenPatterns = new Set();
	        const patterns = [];
	        for (const filter of this.matchAll(request)) {
	            for (const patternInfo of this.metadata.fromFilter(filter)) {
	                if (!seenPatterns.has(patternInfo.pattern.key)) {
	                    seenPatterns.add(patternInfo.pattern.key);
	                    patterns.push(patternInfo);
	                }
	            }
	        }
	        if (getDomainMetadata) {
	            for (const patternInfo of this.metadata.fromDomain(request.hostname)) {
	                if (!seenPatterns.has(patternInfo.pattern.key)) {
	                    seenPatterns.add(patternInfo.pattern.key);
	                    patterns.push(patternInfo);
	                }
	            }
	        }
	        return patterns;
	    }
	    blockScripts() {
	        this.updateFromDiff({
	            added: [block().scripts().redirectTo('javascript').toString()],
	        });
	        return this;
	    }
	    blockImages() {
	        this.updateFromDiff({
	            added: [block().images().redirectTo('png').toString()],
	        });
	        return this;
	    }
	    blockMedias() {
	        this.updateFromDiff({
	            added: [block().medias().redirectTo('mp4').toString()],
	        });
	        return this;
	    }
	    blockFrames() {
	        this.updateFromDiff({
	            added: [block().frames().redirectTo('html').toString()],
	        });
	        return this;
	    }
	    blockFonts() {
	        this.updateFromDiff({
	            added: [block().fonts().toString()],
	        });
	        return this;
	    }
	    blockStyles() {
	        this.updateFromDiff({
	            added: [block().styles().toString()],
	        });
	        return this;
	    }
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	/*!
	 * Copyright (c) 2008-2009 Bjoern Hoehrmann <bjoern@hoehrmann.de>
	 *
	 * Permission is hereby granted, free of charge, to any person obtaining a copy
	 * of this software and associated documentation files (the "Software"), to
	 * deal in the Software without restriction, including without limitation the
	 * rights to use, copy, modify, merge, publish, distribute, sublicense, and/or
	 * sell copies of the Software, and to permit persons to whom the Software is
	 * furnished to do so, subject to the following conditions:
	 *
	 * The above copyright notice and this permission notice shall be included in
	 * all copies or substantial portions of the Software.
	 *
	 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
	 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
	 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
	 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
	 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
	 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS
	 * IN THE SOFTWARE.
	 */
	// From http://bjoern.hoehrmann.de/utf-8/decoder/dfa/
	const utf8d = new Uint8Array([
	    /* eslint-disable prettier/prettier */
	    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 00..1f
	    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 20..3f
	    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 40..5f
	    0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, // 60..7f
	    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, 9, // 80..9f
	    7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, 7, // a0..bf
	    8, 8, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, // c0..df
	    0xa, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x3, 0x4, 0x3, 0x3, // e0..ef
	    0xb, 0x6, 0x6, 0x6, 0x5, 0x8, 0x8, 0x8, 0x8, 0x8, 0x8, 0x8, 0x8, 0x8, 0x8, 0x8, // f0..ff
	    0x0, 0x1, 0x2, 0x3, 0x5, 0x8, 0x7, 0x1, 0x1, 0x1, 0x4, 0x6, 0x1, 0x1, 0x1, 0x1, // s0..s0
	    1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1, 1, 1, 0, 1, 0, 1, 1, 1, 1, 1, 1, // s1..s2
	    1, 2, 1, 1, 1, 1, 1, 2, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, // s3..s4
	    1, 2, 1, 1, 1, 1, 1, 1, 1, 2, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, // s5..s6
	    1, 3, 1, 1, 1, 1, 1, 3, 1, 3, 1, 1, 1, 1, 1, 1, 1, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, // s7..s8
	    /* eslint-enable prettier/prettier */
	]);
	function isAscii(bytes) {
	    if (bytes.length === 0) {
	        return true;
	    }
	    for (let i = 0; i < bytes.length; i += 1) {
	        if (bytes[i] > 127) {
	            return false;
	        }
	    }
	    return true;
	}
	function isUTF8(bytes) {
	    if (bytes.length === 0) {
	        return true;
	    }
	    if (isAscii(bytes) === true) {
	        return true;
	    }
	    let state = 0;
	    for (let i = 0; i < bytes.length; i += 1) {
	        const type = utf8d[bytes[i]];
	        state = utf8d[256 + state * 16 + type];
	        if (state === 1 || state === undefined) {
	            return false;
	        }
	    }
	    return true;
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	function isFirefox() {
	    try {
	        return navigator.userAgent.indexOf('Firefox') !== -1;
	    }
	    catch (e) {
	        return false;
	    }
	}
	/**
	 * There are different ways to inject scriptlets ("push" vs "pull").
	 * This function should decide based on the environment what to use:
	 *
	 * 1) "Pushing" means the adblocker will listen on "onCommitted" events
	 *    and then execute scripts by running the tabs.executeScript API.
	 * 2) "Pulling" means the adblocker will inject a content script, which
	 *    runs before the page loads (and on the DOM changes), fetches
	 *    scriplets from the background and runs them.
	 *
	 * Note:
	 * - the "push" model requires permission to the webNavigation API.
	 *   If that is not available, the implementation will fall back to the
	 *   "pull" model, which does not have this requirement.
	 */
	function usePushScriptsInjection() {
	    // There is no fundamental reason why it should not work on Firefox,
	    // but given that there are no known issues with Firefox, let's keep
	    // the old, proven technique until there is evidence that changes
	    // are needed.
	    //
	    // Take YouTube as an example: on Chrome (or forks like Edge), the adblocker
	    // will sometimes fail to block ads if you reload the page multiple times;
	    // on Firefox, the same steps do not seem to trigger any ads.
	    return !isFirefox();
	}
	const USE_PUSH_SCRIPTS_INJECTION = usePushScriptsInjection();
	/**
	 * Create an instance of `Request` from WebRequest details.
	 */
	function fromWebRequestDetails(details) {
	    const sourceUrl = details.initiator || details.originUrl || details.documentUrl;
	    return Request.fromRawDetails(sourceUrl
	        ? {
	            _originalRequestDetails: details,
	            requestId: details.requestId,
	            sourceUrl,
	            tabId: details.tabId,
	            type: details.type,
	            url: details.url,
	        }
	        : {
	            _originalRequestDetails: details,
	            requestId: details.requestId,
	            tabId: details.tabId,
	            type: details.type,
	            url: details.url,
	        });
	}
	/**
	 * Helper used when injecting custom CSP headers to update `responseHeaders`.
	 */
	function updateResponseHeadersWithCSP(details, policies) {
	    if (policies === undefined) {
	        return {};
	    }
	    let responseHeaders = details.responseHeaders || [];
	    const CSP_HEADER_NAME = 'content-security-policy';
	    // Collect existing CSP headers from response
	    responseHeaders.forEach(({ name, value }) => {
	        if (name.toLowerCase() === CSP_HEADER_NAME) {
	            policies += `; ${value}`;
	        }
	    });
	    // Remove all CSP headers from response
	    responseHeaders = responseHeaders.filter(({ name }) => name.toLowerCase() !== CSP_HEADER_NAME);
	    // Add updated CSP header
	    responseHeaders.push({ name: CSP_HEADER_NAME, value: policies });
	    return { responseHeaders };
	}
	/**
	 * Enable stream HTML filter on request `id` using `rules`.
	 */
	function filterRequestHTML(filterResponseData, { id }, rules) {
	    // Create filter to observe loading of resource
	    const filter = filterResponseData(id);
	    const decoder = new TextDecoder();
	    const encoder = new TextEncoder();
	    const htmlFilter = new StreamingHtmlFilter(rules);
	    const teardown = (event) => {
	        // Before disconnecting our streaming filter, we need to be extra careful
	        // and make sure that no data remains in either our streaming `TextDecoder`
	        // instance or the HTML filterer.
	        //
	        // In case any data remains, we write it to filter.
	        try {
	            const remaining = htmlFilter.write(decoder.decode()) + htmlFilter.flush();
	            if (remaining.length !== 0) {
	                filter.write(encoder.encode(remaining));
	            }
	        }
	        catch (ex) {
	            // If we reach this point, there is probably no way we can recover...
	            console.error('Failed to flush HTML filterer', ex);
	        }
	        // If latest event had some data attached (i.e. 'ondata' event), we make
	        // sure to flush it through the filterer before disconnecting.
	        if (event.data !== undefined) {
	            filter.write(event.data);
	        }
	        // Disconnect streaming filter.
	        filter.disconnect();
	    };
	    filter.ondata = (event) => {
	        // On any chunk of data we implementa very fast UTF-8 validity check to make
	        // sure that we will be able to decode it. Note that in theory it should be
	        // possible that a chunk ends on the boundary of a multi-byte UTF-8 code and
	        // this check would fail?
	        if (isUTF8(new Uint8Array(event.data)) === false) {
	            return teardown(event);
	        }
	        try {
	            filter.write(encoder.encode(htmlFilter.write(decoder.decode(event.data, { stream: true }))));
	        }
	        catch (ex) {
	            // If we fail to decode a chunk, we need to be extra conservative and stop
	            // listening to streaming response. Teardown takes care of flushing any
	            // data remaining in the pipeline and disconnecting the listener.
	            return teardown(event);
	        }
	    };
	    filter.onstop = () => {
	        teardown({});
	    };
	}
	/**
	 * This abstraction takes care of blocking in one instance of `browser` (in
	 * practice this would be `chrome` or `browser` global in the WebExtension
	 * context).
	 */
	class BlockingContext {
	    constructor(browser, blocker) {
	        var _a;
	        this.browser = browser;
	        this.blocker = blocker;
	        this.onBeforeRequest = (details) => blocker.onBeforeRequest(browser, details);
	        this.onHeadersReceived = (details) => blocker.onHeadersReceived(browser, details);
	        this.onRuntimeMessage = (msg, sender) => blocker.onRuntimeMessage(browser, msg, sender);
	        if (this.blocker.config.enablePushInjectionsOnNavigationEvents === true &&
	            USE_PUSH_SCRIPTS_INJECTION) {
	            if ((_a = this.browser.webNavigation) === null || _a === void 0 ? void 0 : _a.onCommitted) {
	                this.onCommittedHandler = (details) => blocker.onCommittedHandler(browser, details);
	            }
	            else {
	                console.warn('Consider adding the "webNavigation" permission in the manifest to improve the reliability of the adblocker. ' +
	                    'If you do not want to see this warning, turn off the "enablePushInjectionsOnNavigationEvents" flag.');
	            }
	        }
	    }
	    enable() {
	        if (this.blocker.config.loadNetworkFilters === true && this.browser.webRequest !== undefined) {
	            this.browser.webRequest.onBeforeRequest.addListener(this.onBeforeRequest, { urls: ['<all_urls>'] }, ['blocking']);
	            this.browser.webRequest.onHeadersReceived.addListener(this.onHeadersReceived, { urls: ['<all_urls>'], types: ['main_frame'] }, ['blocking', 'responseHeaders']);
	        }
	        // Start listening to messages coming from the content-script
	        if (this.blocker.config.loadCosmeticFilters === true &&
	            this.browser.runtime !== undefined &&
	            this.browser.runtime.onMessage !== undefined) {
	            this.browser.runtime.onMessage.addListener(this.onRuntimeMessage);
	        }
	        if (this.onCommittedHandler) {
	            this.browser.webNavigation.onCommitted.addListener(this.onCommittedHandler);
	        }
	    }
	    disable() {
	        if (this.browser.webRequest !== undefined) {
	            this.browser.webRequest.onBeforeRequest.removeListener(this.onBeforeRequest);
	            this.browser.webRequest.onHeadersReceived.removeListener(this.onHeadersReceived);
	        }
	        if (this.browser.runtime !== undefined && this.browser.runtime.onMessage !== undefined) {
	            this.browser.runtime.onMessage.removeListener(this.onRuntimeMessage);
	        }
	        if (this.onCommittedHandler) {
	            this.browser.webNavigation.onCommitted.removeListener(this.onCommittedHandler);
	        }
	    }
	    get pushInjectionsActive() {
	        return this.onCommittedHandler !== undefined;
	    }
	}
	/**
	 * Wrap `FiltersEngine` into a WebExtension-friendly helper class. It exposes
	 * methods to interface with WebExtension APIs needed to block ads.
	 */
	class WebExtensionBlocker extends FilterEngine {
	    constructor() {
	        super(...arguments);
	        this.contexts = new WeakMap();
	        this.handleRuntimeMessage = async (browser, msg, sender, sendResponse) => {
	            var _a, _b;
	            const promises = [];
	            // Make sure we only listen to messages coming from our content-script
	            // based on the value of `action`.
	            if (msg.action !== 'getCosmeticsFilters') {
	                return;
	            }
	            if (sender.tab === undefined) {
	                throw new Error('required "sender.tab" information is not available');
	            }
	            if (sender.tab.id === undefined) {
	                throw new Error('required "sender.tab.id" information is not available');
	            }
	            if (sender.frameId === undefined) {
	                throw new Error('required "sender.frameId" information is not available');
	            }
	            // Extract hostname from sender's URL
	            const { url = '', frameId } = sender;
	            const parsed = parse$1(url);
	            const hostname = parsed.hostname || '';
	            const domain = parsed.domain || '';
	            // Once per tab/page load we inject base stylesheets. These are always
	            // the same for all frames of a given page because they do not depend on
	            // a particular domain and cannot be cancelled using unhide rules.
	            // Because of this, we specify `allFrames: true` when injecting them so
	            // that we do not need to perform this operation for sub-frames.
	            if (frameId === 0 && msg.lifecycle === 'start') {
	                const { active, styles } = this.getCosmeticsFilters({
	                    domain,
	                    hostname,
	                    url,
	                    classes: msg.classes,
	                    hrefs: msg.hrefs,
	                    ids: msg.ids,
	                    // This needs to be done only once per tab
	                    getBaseRules: true,
	                    getInjectionRules: false,
	                    getExtendedRules: false,
	                    getRulesFromDOM: false,
	                    getRulesFromHostname: false,
	                    callerContext: {
	                        tabId: (_a = sender.tab) === null || _a === void 0 ? void 0 : _a.id,
	                        frameId: sender.frameId,
	                    },
	                });
	                if (active === false) {
	                    return;
	                }
	                promises.push(this.injectStylesWebExtension(browser, styles, {
	                    tabId: sender.tab.id,
	                    allFrames: true,
	                }));
	            }
	            // Separately, requests cosmetics which depend on the page it self
	            // (either because of the hostname or content of the DOM). Content script
	            // logic is responsible for returning information about lists of classes,
	            // ids and hrefs observed in the DOM. MutationObserver is also used to
	            // make sure we can react to changes.
	            {
	                const { active, styles, scripts, extended } = this.getCosmeticsFilters({
	                    domain,
	                    hostname,
	                    url,
	                    classes: msg.classes,
	                    hrefs: msg.hrefs,
	                    ids: msg.ids,
	                    // This needs to be done only once per frame
	                    getBaseRules: false,
	                    getInjectionRules: msg.lifecycle === 'start',
	                    getExtendedRules: msg.lifecycle === 'start',
	                    getRulesFromHostname: msg.lifecycle === 'start',
	                    // This will be done every time we get information about DOM mutation
	                    getRulesFromDOM: msg.lifecycle === 'dom-update',
	                    callerContext: {
	                        tabId: (_b = sender.tab) === null || _b === void 0 ? void 0 : _b.id,
	                        frameId: sender.frameId,
	                    },
	                });
	                if (active === false) {
	                    return;
	                }
	                promises.push(this.injectStylesWebExtension(browser, styles, { tabId: sender.tab.id, frameId }));
	                // Inject scripts from content script
	                if (scripts.length !== 0 && !this.pushInjectionsActive(browser)) {
	                    sendResponse({
	                        active,
	                        extended,
	                        scripts,
	                        styles: '',
	                    });
	                }
	            }
	            await Promise.all(promises);
	        };
	        /**
	         * Deal with request cancellation (`{ cancel: true }`) and redirection (`{ redirectUrl: '...' }`).
	         */
	        this.onBeforeRequest = (browser, details) => {
	            const request = fromWebRequestDetails(details);
	            if (this.config.guessRequestTypeFromUrl === true && request.type === 'other') {
	                request.guessTypeOfRequest();
	            }
	            if (request.isMainFrame()) {
	                this.performHTMLFiltering(browser, request);
	                return {};
	            }
	            const { redirect, match } = this.match(request);
	            if (redirect !== undefined) {
	                return { redirectUrl: redirect.dataUrl };
	            }
	            else if (match === true) {
	                return { cancel: true };
	            }
	            return {};
	        };
	        this.onHeadersReceived = (_, details) => {
	            return updateResponseHeadersWithCSP(details, this.getCSPDirectives(fromWebRequestDetails(details)));
	        };
	        this.onRuntimeMessage = (browser, msg, sender) => {
	            return new Promise((resolve, reject) => {
	                this.handleRuntimeMessage(browser, msg, sender, resolve)
	                    .catch(reject)
	                    .finally(() => resolve({}));
	            });
	        };
	    }
	    // ----------------------------------------------------------------------- //
	    // Helpers to enable and disable blocking for 'browser'
	    // ----------------------------------------------------------------------- //
	    enableBlockingInBrowser(browser) {
	        let context = this.contexts.get(browser);
	        if (context !== undefined) {
	            return context;
	        }
	        // Create new blocking context for `browser`
	        context = new BlockingContext(browser, this);
	        this.contexts.set(browser, context);
	        context.enable();
	        return context;
	    }
	    disableBlockingInBrowser(browser) {
	        const context = this.contexts.get(browser);
	        if (context === undefined) {
	            throw new Error('Trying to disable blocking which was not enabled');
	        }
	        this.contexts.delete(browser);
	        context.disable();
	    }
	    onCommittedHandler(browser, details) {
	        const { hostname, domain } = parse$1(details.url);
	        if (!hostname) {
	            return;
	        }
	        // Find the scriptlets to run and execute them as soon as possible.
	        //
	        // If possible, everything in this path should be kept synchronously,
	        // since the scriptlets will attempt to patch the website while it is
	        // already loading. Every additional asynchronous step increases the risk
	        // of losing the race (i.e. that the patching is too late to have an effect)
	        const { active, scripts } = this.getCosmeticsFilters({
	            url: details.url,
	            hostname,
	            domain: domain || '',
	            getBaseRules: false,
	            getInjectionRules: true,
	            getExtendedRules: false,
	            getRulesFromDOM: false,
	            getRulesFromHostname: true,
	            callerContext: {
	                tabId: details.tabId,
	                frameId: details.frameId,
	            },
	        });
	        if (active === false) {
	            return;
	        }
	        if (scripts.length > 0) {
	            this.executeScriptlets(browser, details, scripts);
	        }
	    }
	    isBlockingEnabled(browser) {
	        return this.contexts.has(browser);
	    }
	    pushInjectionsActive(browser) {
	        const context = this.contexts.get(browser);
	        if (!context) {
	            // This means the browser instance is not controlled by the library directly.
	            // For instance, if there is another wrapping layer on top (e.g. Ghostery).
	            return false;
	        }
	        return context.pushInjectionsActive;
	    }
	    // ----------------------------------------------------------------------- //
	    // WebExtensionBlocker-specific additions to FiltersEngine
	    //
	    // Note: some of these methods internally require access to the 'browser'
	    // global in order to perform their function. Because WebExtensionBlocker can
	    // be registered in multiple ones (in theory), we do not want to depend either
	    // on the global object, or a single instance of 'browser' stored internally
	    // (except as part of a BlockingContext which binds one 'browser' object with
	    // a WebExtensionBlocker object to perform blocking in this context), so an
	    // extra 'browser' argument is often needed.
	    // ----------------------------------------------------------------------- //
	    /**
	     * This methods takes care of optionally performing HTML filtering.
	     *
	     * This can only be done if:
	     * 1. Request is 'main_frame'
	     * 2. `enableHtmlFiltering` is set to `true`.
	     * 3. `browser.webRequest.filterResponseData` (Firefox only!).
	     * 4. `TextEncoder` and `TextDecoder` are available.
	     */
	    performHTMLFiltering(browser, request) {
	        if (this.config.enableHtmlFiltering === true &&
	            browser.webRequest !== undefined &&
	            browser.webRequest.filterResponseData !== undefined &&
	            request.isMainFrame() === true &&
	            typeof TextDecoder !== 'undefined' &&
	            typeof TextEncoder !== 'undefined') {
	            const htmlFilters = this.getHtmlFilters(request);
	            if (htmlFilters.length !== 0) {
	                filterRequestHTML(browser.webRequest.filterResponseData, request, htmlFilters);
	            }
	        }
	    }
	    async injectStylesWebExtension(browser, styles, { tabId, frameId, allFrames = false, }) {
	        // Abort if stylesheet is empty.
	        if (styles.length === 0) {
	            return;
	        }
	        // Abort if `this.browser.tabs` is not available.
	        if (browser.tabs === undefined) {
	            throw new Error('required "tabs" API is not defined');
	        }
	        // Abort if `this.browser.tabs.insertCSS` is not available.
	        if (browser.tabs.insertCSS === undefined) {
	            throw new Error('required "tabs.insertCSS" API is not defined');
	        }
	        // Proceed with stylesheet injection.
	        return browser.tabs.insertCSS(tabId, frameId
	            ? {
	                allFrames,
	                code: styles,
	                cssOrigin: 'user',
	                frameId,
	                matchAboutBlank: true,
	                runAt: 'document_start',
	            }
	            : {
	                allFrames,
	                code: styles,
	                cssOrigin: 'user',
	                matchAboutBlank: true,
	                runAt: 'document_start',
	            });
	    }
	    executeScriptlets(browser, details, scripts) {
	        // Dynamically injected scripts scripts can be difficult to find later in
	        // the debugger. Console logs simplifies setting up breakpoints if needed.
	        let debugMarker;
	        if (this.config.debug) {
	            debugMarker = (text) => `console.log('[ADBLOCKER-DEBUG]:', ${JSON.stringify(text)});`;
	        }
	        else {
	            debugMarker = () => '';
	        }
	        // the scriptlet code that contains patches for the website
	        const codeRunningInPage = `(function(){
${debugMarker('run scriptlets (executing in "page world")')}
${scripts.join('\n\n')}}
)()`;
	        // wrapper to break the "isolated world" so that the patching operates
	        // on the website, not on the content script's isolated environment.
	        const codeRunningInContentScript = `
(function(code) {
    ${debugMarker('run injection wrapper (executing in "content script world")')}
    var script;
    try {
      script = document.createElement('script');
      script.appendChild(document.createTextNode(decodeURIComponent(code)));
      (document.head || document.documentElement).appendChild(script);
    } catch (ex) {
      console.error('Failed to run script', ex);
    }
    if (script) {
        if (script.parentNode) {
          script.parentNode.removeChild(script);
        }
        script.textContent = '';
    }
})(\`${encodeURIComponent(codeRunningInPage)}\`);`;
	        browser.tabs
	            .executeScript(details.tabId, {
	            code: codeRunningInContentScript,
	            runAt: 'document_start',
	            frameId: details.frameId,
	            matchAboutBlank: true,
	        })
	            .catch((err) => {
	            console.error('Failed to inject scriptlets', err);
	        });
	    }
	}

	/*!
	 * Copyright (c) 2017-present Ghostery GmbH. All rights reserved.
	 *
	 * This Source Code Form is subject to the terms of the Mozilla Public
	 * License, v. 2.0. If a copy of the MPL was not distributed with this
	 * file, You can obtain one at https://mozilla.org/MPL/2.0/.
	 */
	/**
	 * Keep track of number of network requests altered for each tab
	 */
	const counter = new Map();
	/**
	 * Helper function used to both reset, increment and show the current value of
	 * the blocked requests counter for a given tabId.
	 */
	function updateBlockedCounter(tabId, { reset = false, incr = false } = {}) {
	    counter.set(tabId, (reset === true ? 0 : counter.get(tabId) || 0) + (incr === true ? 1 : 0));
	    chrome.browserAction.setBadgeText({
	        text: '' + (counter.get(tabId) || 0),
	    });
	}
	function incrementBlockedCounter(request, blockingResponse) {
	    updateBlockedCounter(request.tabId, {
	        incr: Boolean(blockingResponse.match),
	        reset: request.isMainFrame(),
	    });
	}
	// Whenever the active tab changes, then we update the count of blocked request
	chrome.tabs.onActivated.addListener(({ tabId }) => updateBlockedCounter(tabId));
	// Reset counter if tab is reloaded
	chrome.tabs.onUpdated.addListener((tabId, { status, url }) => {
	    if (status === 'loading' && url === undefined) {
	        updateBlockedCounter(tabId, {
	            incr: false,
	            reset: true,
	        });
	    }
	});
	WebExtensionBlocker.fromLists(fetch, fullLists, {
	    enableCompression: true,
	    enableHtmlFiltering: true,
	    loadExtendedSelectors: true,
	}).then((blocker) => {
	    blocker.enableBlockingInBrowser(browser$1);
	    blocker.on('request-blocked', (request, result) => {
	        incrementBlockedCounter(request, result);
	        console.log('block', request.url);
	    });
	    blocker.on('request-redirected', (request, result) => {
	        incrementBlockedCounter(request, result);
	        console.log('redirect', request.url, result);
	    });
	    blocker.on('csp-injected', (request, csps) => {
	        console.log('csp', request.url, csps);
	    });
	    blocker.on('script-injected', (script, url) => {
	        console.log('script', script.length, url);
	    });
	    blocker.on('style-injected', (style, url) => {
	        console.log('style', url, style.length);
	    });
	    blocker.on('html-filtered', (htmlSelectors, url) => {
	        console.log('html selectors', htmlSelectors, url);
	    });
	    blocker.on('filter-matched', ({ filter, exception }, context) => {
	        console.log('filter-matched', filter, exception, context);
	    });
	    console.log('Ready to roll!');
	});

})();
//# sourceMappingURL=background.iife.js.map
