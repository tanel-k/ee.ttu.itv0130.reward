define('app',['exports'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var App = exports.App = function () {
    function App() {
      _classCallCheck(this, App);
    }

    App.prototype.configureRouter = function configureRouter(config, router) {
      this.router = router;
      config.title = 'Reward store';
      config.map([{
        route: '',
        name: 'shop-page',
        moduleId: 'containers/shop-page/shop-page'
      }]);
    };

    return App;
  }();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('entities/shop-item',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var ShopItem = function () {
    function ShopItem(code, name, imgPath, price, priceCurrencySymbol, stockCount) {
      _classCallCheck(this, ShopItem);

      Object.assign(this, {
        code: code,
        name: name,
        imgPath: imgPath,
        price: price,
        priceCurrencySymbol: priceCurrencySymbol,
        stockCount: stockCount
      });
    }

    _createClass(ShopItem, [{
      key: "priceString",
      get: function get() {
        return "" + this.priceCurrencySymbol + this.price.toFixed(2);
      }
    }]);

    return ShopItem;
  }();

  exports.default = ShopItem;
});
define('events/events',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var AddToCartSuccessEvent = exports.AddToCartSuccessEvent = function AddToCartSuccessEvent(item) {
    _classCallCheck(this, AddToCartSuccessEvent);

    this.item = item;
  };

  var AddToCartFailureEvent = exports.AddToCartFailureEvent = function AddToCartFailureEvent() {
    _classCallCheck(this, AddToCartFailureEvent);
  };
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('components/cart/cart',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../../events/events', 'jquery', 'jquery-ui-dist'], function (exports, _aureliaFramework, _aureliaEventAggregator, _events) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _dec, _class;

  var Cart = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function Cart(element, ea) {
      _classCallCheck(this, Cart);

      this.element = element;
      this.ea = ea;

      this.initializeData();
    }

    Cart.prototype.attached = function attached() {
      this.initializeDOMHooks();
      this.wireEvents();
    };

    Cart.prototype.initializeData = function initializeData() {
      this.isBuying = false;
      this.isProcessing = false;
      this.cartItemSet = new Set();
      this.countMap = {};
      this.priceMap = {};
      this.audioBank = {
        cartClank: new Audio('media/audio/shopping_cart_clank.mp3'),
        cartSemiClank: new Audio('media/audio/shopping_cart_cut_short.mp3'),
        cartOpen: new Audio('media/audio/shopping_cart_open.mp3'),
        cartClose: new Audio('media/audio/shopping_cart_close.mp3'),
        ding: new Audio('media/audio/cash_register_ding.mp3')
      };
    };

    Cart.prototype.initializeDOMHooks = function initializeDOMHooks() {
      this.$element = $(this.element);
      this.$cartIcon = $(this.element.querySelector('i.shopping-cart-icon'));
      this.shoppingCartToggle = this.element.querySelector('.shopping-cart-toggle');
      this.$shoppingCartToggle = $(this.shoppingCartToggle);
      this.$priceLabel = $(this.element.querySelector('#price-label'));
    };

    Cart.prototype.wireEvents = function wireEvents() {
      var _this = this;

      this.ea.subscribe(_events.AddToCartSuccessEvent, function (event) {
        _this.registerItem(event.item);
        _this.animatePriceLabel();
        _this.audioBank.cartClank.cloneNode().play();
        _this.$cartIcon.effect('shake', { times: 2 }, 200);
      });

      this.ea.subscribe(_events.AddToCartFailureEvent, function (event) {
        _this.audioBank.cartSemiClank.cloneNode().play();
      });
    };

    Cart.prototype.animatePriceLabel = function animatePriceLabel() {
      var _this2 = this;

      this.$priceLabel.removeClass('animated flipInX');
      setTimeout(function () {
        return _this2.$priceLabel.addClass('animated flipInX');
      }, 0);
    };

    Cart.prototype.registerItem = function registerItem(item) {
      this.cartItemSet.add(item);
      if (typeof this.countMap[item.code] !== 'number') {
        this.countMap[item.code] = 0;
      }
      this.countMap[item.code]++;

      if (typeof this.priceMap[item.code] !== 'number') {
        this.priceMap[item.code] = 0.0;
      }
      this.priceMap[item.code] += item.price;
    };

    Cart.prototype.resetCart = function resetCart() {
      this.cartItemSet.clear();
      this.countMap = {};
      this.priceMap = {};
    };

    Cart.prototype.toPriceString = function toPriceString(price) {
      return '$' + price.toFixed(2);
    };

    Cart.prototype.buy = function buy() {
      var _this3 = this;

      this.audioBank.ding.cloneNode().play();
      this.isBuying = true;
      this.isProcessing = true;
      this.resetCart();
      setTimeout(function () {
        _this3.isProcessing = false;
        setTimeout(function () {
          var $thankYouNote = _this3.$element.find('#thank-you-note');
          $thankYouNote.removeClass('animated fadeOut');
          $thankYouNote.addClass('animated fadeIn');
        }, 0);
      }, 900);
      setTimeout(function () {
        var $thankYouNote = _this3.$element.find('#thank-you-note');
        $thankYouNote.removeClass('animated fadeIn');
        $thankYouNote.addClass('animated fadeOut');
        setTimeout(function () {
          return _this3.isBuying = false;
        }, 500);
      }, 1500);
    };

    Cart.prototype.cartClicked = function cartClicked() {
      if (this.shoppingCartToggle.getAttribute('aria-expanded') === 'true') {
        this.audioBank.cartOpen.cloneNode().play();
      } else {
        this.audioBank.cartClose.cloneNode().play();
      }
    };

    _createClass(Cart, [{
      key: 'isEmpty',
      get: function get() {
        return this.cartItemSet.size === 0;
      }
    }, {
      key: 'totalPriceString',
      get: function get() {
        if (this.isEmpty) {
          return '$0.00';
        }
        var total = Object.values(this.priceMap).reduce(function (prev, curr) {
          return prev + curr;
        }, 0.0);
        return '$' + total.toFixed(2);
      }
    }]);

    return Cart;
  }()) || _class);
  exports.default = Cart;
});
define('components/shop-item/shop-item',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../../events/events', 'jquery', 'jquery-ui-dist'], function (exports, _aureliaFramework, _aureliaEventAggregator, _events) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var _createClass = function () {
    function defineProperties(target, props) {
      for (var i = 0; i < props.length; i++) {
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
      }
    }

    return function (Constructor, protoProps, staticProps) {
      if (protoProps) defineProperties(Constructor.prototype, protoProps);
      if (staticProps) defineProperties(Constructor, staticProps);
      return Constructor;
    };
  }();

  var _dec, _class;

  var ShopItem = (_dec = (0, _aureliaFramework.inject)(Element, _aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function ShopItem(element, ea) {
      _classCallCheck(this, ShopItem);

      this.element = element;
      this.ea = ea;
    }

    ShopItem.prototype.activate = function activate(_ref) {
      var shopItem = _ref.shopItem,
          cartViewModel = _ref.cartViewModel;

      this.shopItem = shopItem;
      this.cartViewModel = cartViewModel;
    };

    ShopItem.prototype.attached = function attached() {
      this.initializeDOMHooks();
      this.wireEvents();
    };

    ShopItem.prototype.initializeDOMHooks = function initializeDOMHooks() {
      this.addToCartButton = this.element.querySelector('button.add-to-cart');
      this.$addToCartButton = $(this.addToCartButton);
      this.itemIcon = this.element.querySelector('img.item-image');
      this.$itemIcon = $(this.itemIcon);
      this.$cartIcon = this.cartViewModel.currentViewModel.$cartIcon;
    };

    ShopItem.prototype.reduceStock = function reduceStock() {
      if (this.shopItem.stockCount > 0) {
        this.shopItem.stockCount--;
      }
    };

    ShopItem.prototype.wireEvents = function wireEvents() {
      var _this = this;

      this.$addToCartButton.on('click', function (event) {
        if (!_this.isOutOfStock) {
          _this.reduceStock();
          _this.animateDropToCart();
        } else {
          _this.ea.publish(new _events.AddToCartFailureEvent());
        }
      });
    };

    ShopItem.prototype.animateDropToCart = function animateDropToCart() {
      var _this2 = this;

      var $cartIcon = this.$cartIcon;
      var $itemIcon = this.$itemIcon;
      var $itemIconClone = $itemIcon.clone();
      $itemIconClone.offset({
        top: $itemIcon.offset().top,
        left: $itemIcon.offset().left
      }).css({
        'opacity': '0.5',
        'position': 'absolute',
        'height': '150px',
        'width': '150px',
        'z-index': '100'
      }).appendTo($('body')).animate({
        'top': $cartIcon.offset().top + 10,
        'left': $cartIcon.offset().left + 10,
        'width': 75,
        'height': 75
      }, 750, 'easeInOutExpo');

      setTimeout(function () {
        _this2.ea.publish(new _events.AddToCartSuccessEvent(_this2.shopItem));
      }, 1250);

      $itemIconClone.animate({ 'width': 0, 'height': 0 }, function () {
        $itemIconClone.detach();
      });
    };

    _createClass(ShopItem, [{
      key: 'isOutOfStock',
      get: function get() {
        return this.shopItem.stockCount <= 0;
      }
    }]);

    return ShopItem;
  }()) || _class);
  exports.default = ShopItem;
});
define('containers/shop-page/shop-page',['exports', '../../entities/shop-item'], function (exports, _shopItem) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ShopPage = undefined;

  var _shopItem2 = _interopRequireDefault(_shopItem);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ShopPage = exports.ShopPage = function ShopPage() {
    _classCallCheck(this, ShopPage);

    this.shopItems = [new _shopItem2.default('sb', 'Saw blade', 'media/img/saw-blade.jpg', 2.00, '$', 12), new _shopItem2.default('hm', 'Hammer', 'media/img/hammer.jpg', 15.00, '$', 25), new _shopItem2.default('pl', 'Pliers', 'media/img/pliers.jpg', 23.40, '$', 24), new _shopItem2.default('dr', 'Drill', 'media/img/drill.jpg', 100.00, '$', 5), new _shopItem2.default('sk', 'Screwdriver kit', 'media/img/screw-drivers.jpg', 35.00, '$', 10), new _shopItem2.default('wr', 'Wrench', 'media/img/wrench.jpg', 17.00, '$', 24), new _shopItem2.default('ag', 'Angle grinder', 'media/img/angle-grinder.jpg', 250.00, '$', 4), new _shopItem2.default('lc', 'Locking clamp', 'media/img/locking-clamp.jpg', 3.00, '$', 45), new _shopItem2.default('mt', 'Masking tape', 'media/img/masking-tape.jpg', 1.00, '$', 35), new _shopItem2.default('sr', 'Remover set', 'media/img/scraper-and-remover-set.jpg', 25.00, '$', 3), new _shopItem2.default('st', 'Rubber mallet', 'media/img/rubber-mallet.jpg', 15.00, '$', 12), new _shopItem2.default('st', 'Scraper set', 'media/img/scraper-set.jpg', 20.00, '$', 23)];
  };
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"jquery-ui-dist/jquery-ui.css\"></require><router-view></router-view></template>"; });
define('text!components/cart/cart.html', ['module'], function(module) { module.exports = "<template><require from=\"./cart.css\"></require><div class=\"collapse navbar-collapse\"><div class=\"btn-group nav navbar-nav navbar-right\"><a href=\"#\" class=\"btn btn-default dropdown-toggle shopping-cart-toggle shopping-cart-container\" click.delegate=\"cartClicked()\" data-toggle=\"dropdown\" aria-expanded=\"false\"><span if.bind=\"!isBuying\" class=\"cart-phase-span\"><i class=\"shopping-cart-icon fa fa-shopping-cart\"></i><span class=\"total-text\"> Total: <span style=\"display:inline-block\" id=\"price-label\">${totalPriceString}</span></span> <span class=\"caret\"></span> </span><span if.bind=\"isBuying\"><span class=\"cart-phase-span\" if.bind=\"isProcessing\"><i class=\"cart-icon fa fa-circle-o-notch fa-spin\"></i> Processing...</span> <span class=\"cart-phase-span\" id=\"thank-you-note\" if.bind=\"!isProcessing\"><i class=\"cart-icon fa fa-check\"></i> Thank you!</span></span></a><ul class=\"dropdown-menu\"><li repeat.for=\"cartItem of cartItemSet\"><span class=\"dropdown-item\">${cartItem.name} &#10005; ${countMap[cartItem.code]} (${toPriceString(priceMap[cartItem.code])})</span></li><li if.bind=\"isEmpty\"><span class=\"dropdown-item\">Empty</span></li><li if.bind=\"!isEmpty\"><button click.trigger=\"buy()\" class=\"btn btn-buy btn-block btn-primary dropdown-item\">BUY</button></li></ul></div></div></template>"; });
define('text!components/cart/cart.css', ['module'], function(module) { module.exports = ".shopping-cart-container {\n  float: right;\n  width: 225px; }\n  .shopping-cart-container + .dropdown-menu {\n    width: 100% !important; }\n\n.cart-phase-span {\n  display: inline-block; }\n\n.navbar-collapse.collapse {\n  display: block !important; }\n\n.navbar-nav > li, .navbar-nav {\n  float: left !important; }\n\n.navbar-nav.navbar-right:last-child {\n  margin-right: -15px !important; }\n\n.navbar-right {\n  float: right !important; }\n\n.dropdown-menu > li > .dropdown-item {\n  display: block;\n  padding: 3px 20px;\n  clear: both;\n  font-weight: normal;\n  line-height: 1.846;\n  color: #666666;\n  white-space: nowrap; }\n\n.btn-buy {\n  color: white !important; }\n\n#thank-you-note {\n  color: green; }\n"; });
define('text!components/shop-item/shop-item.html', ['module'], function(module) { module.exports = "<template><require from=\"./shop-item.css\"></require><div class=\"item panel panel-primary\"><div class=\"panel-heading\"><h4 class=\"primary\">${shopItem.name}</h4><h5 class=\"secondary\">${shopItem.priceString}</h5></div><div class=\"panel-body\"><img class=\"item-image\" src=\"${shopItem.imgPath}\"><p>In stock: <strong class=\"${isOutOfStock ? 'stock-count-out' : 'stock-count-has'}\">${shopItem.stockCount}</strong></p></div><div class=\"panel-footer\"><button class=\"btn ${isOutOfStock ? 'disabled' : ''} btn-primary btn-block add-to-cart\" type=\"button\">${isOutOfStock ? 'Out of stock' : 'Add to cart'}</button></div></div></template>"; });
define('text!components/shop-item/shop-item.css', ['module'], function(module) { module.exports = ".item {\n  background-color: #fff;\n  float: left;\n  padding: 5px;\n  margin: 5px; }\n  .item img {\n    display: block;\n    margin: auto;\n    height: 200px;\n    width: 200px; }\n  .item p {\n    margin: 0; }\n  .item .stock-count-out {\n    color: red; }\n  .item .stock-count-has {\n    color: green; }\n\n.item.panel-primary .panel-heading h1.primary, .item.panel-primary .panel-heading h2.primary, .item.panel-primary .panel-heading h3.primary, .item.panel-primary .panel-heading h4.primary, .item.panel-primary .panel-heading h5.primary, .item.panel-primary .panel-heading h6.primary {\n  color: white !important; }\n\n.item.panel-primary .panel-heading h1.secondary, .item.panel-primary .panel-heading h2.secondary, .item.panel-primary .panel-heading h3.secondary, .item.panel-primary .panel-heading h4.secondary, .item.panel-primary .panel-heading h5.secondary, .item.panel-primary .panel-heading h6.secondary {\n  color: #F5F3F0 !important; }\n"; });
define('text!containers/shop-page/shop-page.html', ['module'], function(module) { module.exports = "<template><require from=\"./shop-page.css\"></require><div class=\"navbar navbar-default navbar-fixed-top\"><div class=\"container\"><div class=\"navbar-header\"><span class=\"navbar-brand\">Rewarding Tool Store</span></div><compose class=\"cart-port\" view-model.ref=\"cartViewModel\" view-model=\"../../components/cart/cart\"></compose></div></div><div class=\"container\"><div class=\"bs-component\"><div class=\"wrapper\"><div class=\"items\"><compose repeat.for=\"shopItem of shopItems\" view-model=\"../../components/shop-item/shop-item\" model.bind=\"{ shopItem, cartViewModel }\"></compose></div></div></div></div></template>"; });
define('text!containers/shop-page/shop-page.css', ['module'], function(module) { module.exports = ".wrapper {\n  width: 800px;\n  margin: 20px auto;\n  padding: 20px; }\n\n.items {\n  display: block;\n  margin: 20px 0; }\n\nbody {\n  padding-top: 30px; }\n\n.navbar-fixed-top {\n  z-index: 1 !important; }\n  .navbar-fixed-top .shopping-cart-container {\n    margin-top: 9px !important; }\n"; });
//# sourceMappingURL=app-bundle.js.map