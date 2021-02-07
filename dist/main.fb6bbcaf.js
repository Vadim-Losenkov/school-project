// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"js/main.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

$(function () {
  $('.slider__carousel-inner').slick({
    autoplay: true,
    autoplaySpeed: 2000
  });
  var icon = $('[data-icon="bars"]');
  icon.on('click', function () {
    $('[data-menu="bars"]').toggleClass('open');
    icon.toggleClass('open');
  });
  mixitup('.portfolio-items');
  /*if ($('.wrapper-main.open')) {
    $('.home').css()
  } */
});

var Pagination = /*#__PURE__*/function () {
  function Pagination(toolbar) {
    var elements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

    _classCallCheck(this, Pagination);

    this.toolbar = document.querySelector(toolbar);
    this.elements = elements.map(function ($el) {
      return document.querySelector($el);
    });
    this.headerListener();
  }

  _createClass(Pagination, [{
    key: "headerListener",
    value: function headerListener() {
      var _this = this;

      this.toolbar.addEventListener('click', function (event) {
        event.preventDefault();
        var pageClass = event.target.dataset.class;

        if (pageClass !== undefined) {
          _this.open(document.querySelector(pageClass));
        }

        var body = document.querySelector('body');

        switch (pageClass) {
          case '.wrapper-main':
            body.style.backgroundColor = '#7ec1c1';
            break;

          case '.wrapper-about':
            body.style.backgroundColor = '#ddd8c8';
            break;

          case '.wrapper-portfolio':
            body.style.backgroundColor = '#e28968';
            break;

          case '.wrapper-blog':
            body.style.backgroundColor = '#dad7d4';
            break;

          case '.wrapper-contact':
            body.style.backgroundColor = '#4e5258';
            break;
        }
      });
    }
  }, {
    key: "open",
    value: function open(page) {
      this.elements.forEach(function ($el) {
        return $el.classList.remove('open');
      });
      page.classList.add('open');
    }
  }]);

  return Pagination;
}();

new Pagination('[data-toolbar="header"]', ['[data-type="main"]', '[data-type="about"]', '[data-type="portofolo"]', '[data-type="blog"]', '[data-type="contact"]']);

var Calculator = /*#__PURE__*/function () {
  function Calculator(form) {
    _classCallCheck(this, Calculator);

    this.form = document.querySelector(form);
    this.value = null;
    this.inputType = '';
    this.formula = 'Формула';
    this.catet = null;
    this.catet2 = null;
    this.gip = null;
    this.render();
  }

  _createClass(Calculator, [{
    key: "render",
    value: function render() {
      var _this2 = this;

      var html = function html() {
        var inputSide = {
          value1: '<input type="text" data-info="catet" data-type="value-1" placeholder="Катет" />',
          value2: '<input type="text" data-info="catet2" data-type="value-2" placeholder="Катет" />',
          value3: '<input type="text" data-info="gip" data-type="value-3" placeholder="Гипотенуза" />',
          s1: '<input type="text" data-info="catet" data-type="value-1" placeholder="1 сторона" />',
          s2: '<input type="text" data-info="catet2" data-type="value-2" placeholder="2 сторона" />',
          s3: '<input type="text" data-info="gip" data-type="value-3" placeholder="3 сторона" />'
        };

        function template(value) {
          switch (value) {
            case 'gip':
              return "\n            ".concat(inputSide.value1, "\n            ").concat(inputSide.value2, "\n            ");
              break;

            case 'catet':
              return "\n            ".concat(inputSide.value1, "\n            ").concat(inputSide.value3, "\n            ");
              break;

            case 's':
              return "\n            ".concat(inputSide.s1, "\n            ").concat(inputSide.s2, "\n            ").concat(inputSide.s3, "\n            ");
              break;
          }

          return '';
        }

        return "\n      <input type=\"text\" data-type=\"counter\" placeholder=\"\u0413\u0438\u043F\u043E\u0442\u0435\u043D\u0443\u0437\u0430 / \u041A\u0430\u0442\u0435\u0442 / \u041F\u043B\u043E\u0449\u0430\u0434\u044C\" class=\"true\" value=\"".concat(_this2.inputType, "\"/>\n      ").concat(template(_this2.value), "\n      <textarea data-type=\"ansver\" placeholder=\"\u041E\u0442\u0432\u0435\u0442: \"></textarea>\n      <button type=\"submit\" data-type=\"submit\">\u041F\u043E\u0441\u0447\u0438\u0442\u0430\u0442\u044C!</button>\n      <div class=\"contact__button\">\n        <span class=\"contact__button-link\" data-type=\"formula\">\n          ").concat(_this2.formula, "\n        </span>\n      </div>\n      ");
      };

      this.form.innerHTML = html();
      this.input();
    }
  }, {
    key: "input",
    value: function input() {
      var _this3 = this;

      this.form.addEventListener('input', function (event) {
        var _event$target$dataset = event.target.dataset,
            type = _event$target$dataset.type,
            info = _event$target$dataset.info;

        var $el = _this3.form.querySelector("[data-type=\"".concat(type, "\"]"));

        var userValue = $el.value.trim().toLowerCase();
        var keyWords = ['катет', 'гипотенуза', 'площадь'];
        var inputValues = ['value-1', 'value-2', 'value-3'];
        var formuls = ['c = <span>a<sup>2</sup> + b<sup>2</sup></span>', 'a = <span>c<sup>2</sup> - b<sup>2</sup></span>', 's = <span class="s">a<sup>2</sup> + b<sup>2</sup> + c<sup>2</sup></span>'];

        if (type === 'counter') {
          if (keyWords.includes(userValue)) {
            _this3.trueClass($el);

            switch (true) {
              case userValue === keyWords[0]:
                _this3.value = 'catet';
                _this3.inputType = 'Катет';
                _this3.formula = formuls[1];

                _this3.render();

                break;

              case userValue === keyWords[1]:
                _this3.inputType = 'Гипотенуза';
                _this3.value = 'gip';
                _this3.formula = formuls[0];

                _this3.render();

                break;

              case userValue === keyWords[2]:
                _this3.inputType = 'Площадь';
                _this3.value = 's';
                _this3.formula = formuls[2];

                _this3.render();

                break;
            }
          } else {
            _this3.falseClass($el);
          }
        } else if (inputValues.includes(type)) {
          var countValue = +userValue;

          if (!Number.isNaN(countValue) || countValue === 0) {
            _this3.trueClass($el);

            switch (true) {
              case info === 'catet':
                _this3.catet = $el.value;
                break;

              case info === 'catet2':
                _this3.catet2 = $el.value;
                break;

              case info === 'gip':
                _this3.gip = $el.value;
                break;
            }
          } else {
            _this3.falseClass($el);
          }
        }
      });
      this.submit();
    }
  }, {
    key: "submit",
    value: function submit() {
      var _this4 = this;

      var $button = this.form.querySelector('[data-type="submit"]');
      var $ansver = this.form.querySelector('[data-type="ansver"]');
      $button.addEventListener('click', function (event) {
        event.preventDefault();

        switch (true) {
          case _this4.value === 'catet':
            var calc = calcCatet(_this4.gip, _this4.catet);
            $ansver.textContent = Number.isNaN(calc) ? _this4.valueError('гипотенуза не может быть меньше катета') : _this4.clearValueError(calc);
            break;

          case _this4.value === 'gip':
            $ansver.textContent = calcGip(_this4.catet, _this4.catet2);
            break;

          case _this4.value === 's':
            var calculate = calcS(_this4.gip, _this4.catet, _this4.catet2);
            $ansver.textContent = calculate;
            break;
        }
      });
    }
  }, {
    key: "trueClass",
    value: function trueClass(input) {
      input.classList.add('true');
      input.classList.remove('false');
    }
  }, {
    key: "falseClass",
    value: function falseClass(input) {
      input.classList.add('false');
      input.classList.remove('true');
    }
  }, {
    key: "valueError",
    value: function valueError(text) {
      this.form.classList.add('error');
      return text;
    }
  }, {
    key: "clearValueError",
    value: function clearValueError(value) {
      this.form.classList.remove('error');
      return value;
    }
  }]);

  return Calculator;
}();

var calculator = new Calculator('[data-form="calculator"]');

var calcCatet = function calcCatet(gip, catet) {
  return Math.sqrt(Math.pow(gip, 2) - Math.pow(catet, 2));
};

var calcGip = function calcGip(catet, catet2) {
  return Math.sqrt(Math.pow(catet2, 2) + Math.pow(catet, 2));
};

var calcS = function calcS(catet, catet2, gip) {
  return Math.sqrt(Math.pow(gip, 2) + Math.pow(catet, 2) + Math.pow(catet2, 2));
}; // switch (true) {
//   case this.catet <= 0:
//     $ansver.textContent = 'катет/гипотенуза не может быть меньше 0 или равным ему'
//     break;
//   case this.catet2 <= 0:
//     $ansver.textContent = 'катет/гипотенуза не может быть меньше 0 или равным ему'
//     break;
//   case this.gip <= 0:
//     $ansver.textContent = 'катет/гипотенуза не может быть меньше 0 или равным ему'
//     break;
// }
},{}],"../../../../../../../data/data/com.termux/files/usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "42131" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../../../../data/data/com.termux/files/usr/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","js/main.js"], null)
//# sourceMappingURL=/main.fb6bbcaf.js.map