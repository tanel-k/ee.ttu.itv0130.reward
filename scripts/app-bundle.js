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
      this.audioBank = {
        cartClank: new Audio('../../media/audio/shopping_cart_clank.mp3'),
        cartSemiClank: new Audio('../../media/audio/shopping_cart_cut_short.mp3')
      };
    };

    Cart.prototype.initializeDOMHooks = function initializeDOMHooks() {
      this.$cartIcon = $(this.element.querySelector('.shopping-cart-icon'));
    };

    Cart.prototype.wireEvents = function wireEvents() {
      var _this = this;

      this.ea.subscribe(_events.AddedToCartSuccessEvent, function (event) {
        _this.audioBank.cartClank.cloneNode().play();
        _this.$cartIcon.effect('shake', { times: 2 }, 200);
      });

      this.ea.subscribe(_events.AddedToCartFailureEvent, function (event) {
        _this.audioBank.cartSemiClank.cloneNode().play();
      });
    };

    return Cart;
  }()) || _class);
  exports.default = Cart;
});
define('components/shop-item/shop-item',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ShopItem = function () {
    function ShopItem() {
      _classCallCheck(this, ShopItem);
    }

    ShopItem.prototype.activate = function activate(shopItem) {
      this.shopItem = shopItem;
    };

    return ShopItem;
  }();

  exports.default = ShopItem;
});
define('containers/shop-page/shop-page',['exports', 'aurelia-framework', 'aurelia-event-aggregator', '../../entities/shop-item', '../../events/events', 'jquery', 'jquery-ui-dist'], function (exports, _aureliaFramework, _aureliaEventAggregator, _shopItem, _events) {
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

  var _dec, _class;

  var ShopPage = exports.ShopPage = (_dec = (0, _aureliaFramework.inject)(_aureliaEventAggregator.EventAggregator), _dec(_class = function () {
    function ShopPage(ea) {
      _classCallCheck(this, ShopPage);

      this.shopItems = [new _shopItem2.default('Saw blade', '../../media/img/saw-blade.jpg', 2.00, '$', 120), new _shopItem2.default('Hammer', '../../media/img/hammer.jpg', 15.00, '$', 25), new _shopItem2.default('Pliers', '../../media/img/pliers.jpg', 23.40, '$', 24), new _shopItem2.default('Drill', '../../media/img/drill.jpg', 100.00, '$', 5), new _shopItem2.default('Screwdriver kit', '../../media/img/screw-drivers.jpg', 35.00, '$', 10), new _shopItem2.default('Wrench', '../../media/img/wrench.jpg', 17.00, '$', 24)];

      this.ea = ea;
      this.audioBank = {
        cartClank: new Audio('../../media/audio/shopping_cart_clank.mp3'),
        cartSemiClank: new Audio('../../media/audio/shopping_cart_cut_short.mp3'),
        cartOpen: new Audio('../../media/audio/shopping_cart_open.mp3')
      };
    }

    ShopPage.prototype.attached = function attached() {
      var _this = this;

      $('button.add-to-cart').on('click', function (event) {
        var cart = $('.shopping-cart-icon');
        var itemIcon = $(event.target).parents('.item').find('img').eq(0);

        if (itemIcon) {
          var itemIconClone = itemIcon.clone().offset({
            top: itemIcon.offset().top,
            left: itemIcon.offset().left
          }).css({
            'opacity': '0.5',
            'position': 'absolute',
            'height': '150px',
            'width': '150px',
            'z-index': '100'
          }).appendTo($('body')).animate({
            'top': cart.offset().top + 10,
            'left': cart.offset().left + 10,
            'width': 75,
            'height': 75
          }, 750, 'easeInOutExpo');
          setTimeout(function () {
            _this.ea.publish(new _events.AddedToCartSuccessEvent());
          }, 1250);

          itemIconClone.animate({ 'width': 0, 'height': 0 }, function () {
            $(itemIconClone).detach();
          });
        }
      });
    };

    return ShopPage;
  }()) || _class);
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
    function ShopItem(name, imgPath, price, priceCurrencySymbol, stockCount) {
      _classCallCheck(this, ShopItem);

      Object.assign(this, {
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
define('events/added-to-cart',[], function () {
  "use strict";
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

  var AddedToCartSuccessEvent = exports.AddedToCartSuccessEvent = function AddedToCartSuccessEvent() {
    _classCallCheck(this, AddedToCartSuccessEvent);
  };

  var AddedToCartFailureEvent = exports.AddedToCartFailureEvent = function AddedToCartFailureEvent() {
    _classCallCheck(this, AddedToCartFailureEvent);
  };
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"jquery-ui-dist/jquery-ui.css\"></require><div class=\"bs-component\"><router-view></router-view></div></template>"; });
define('text!components/cart/cart.html', ['module'], function(module) { module.exports = "<template><require from=\"./cart.css\"></require><div class=\"shopping-cart-container\"><i class=\"shopping-cart-icon\"></i></div></template>"; });
define('text!components/cart/cart.css', ['module'], function(module) { module.exports = ".shopping-cart-container {\n  float: right; }\n\n.shopping-cart-icon {\n  display: inline-block;\n  background: url(\"http://cdn1.iconfinder.com/data/icons/jigsoar-icons/24/_cart.png\") no-repeat 0 0;\n  width: 24px;\n  height: 24px;\n  margin: 0 10px 0 0; }\n"; });
define('text!components/shop-item/shop-item.html', ['module'], function(module) { module.exports = "<template><require from=\"./shop-item.css\"></require><div class=\"item panel panel-primary\"><div class=\"panel-heading\"><h4 class=\"primary\">${shopItem.name}</h4><h5 class=\"secondary\">${shopItem.priceString}</h5></div><div class=\"panel-body\"><img src=\"${shopItem.imgPath}\"><p>In stock: <strong>${shopItem.stockCount}</strong></p></div><div class=\"panel-footer\"><button class=\"btn btn-primary btn-block add-to-cart\" type=\"button\">Add to cart</button></div></div></template>"; });
define('text!components/shop-item/shop-item.css', ['module'], function(module) { module.exports = ".item {\n  background-color: #fff;\n  float: left;\n  padding: 5px;\n  margin: 5px; }\n  .item img {\n    display: block;\n    margin: auto;\n    height: 200px;\n    width: 200px; }\n  .item p {\n    margin: 0; }\n\n.item.panel-primary .panel-heading h1.primary, .item.panel-primary .panel-heading h2.primary, .item.panel-primary .panel-heading h3.primary, .item.panel-primary .panel-heading h4.primary, .item.panel-primary .panel-heading h5.primary, .item.panel-primary .panel-heading h6.primary {\n  color: white !important; }\n\n.item.panel-primary .panel-heading h1.secondary, .item.panel-primary .panel-heading h2.secondary, .item.panel-primary .panel-heading h3.secondary, .item.panel-primary .panel-heading h4.secondary, .item.panel-primary .panel-heading h5.secondary, .item.panel-primary .panel-heading h6.secondary {\n  color: #F5F3F0 !important; }\n"; });
define('text!containers/shop-page/shop-page.html', ['module'], function(module) { module.exports = "<template><require from=\"./shop-page.css\"></require><div class=\"wrapper\"><span><i class=\"shopping-cart\"></i></span><compose view-model.ref=\"cartViewModel\" view-model=\"../../components/cart/cart\" model.bind=\"{}\"></compose><h3>A Rewarding Webstore</h3><div class=\"items\"><compose repeat.for=\"shopItem of shopItems\" view-model=\"../../components/shop-item/shop-item\" model.bind=\"shopItem\"></compose></div></div></template>"; });
define('text!containers/shop-page/shop-page.css', ['module'], function(module) { module.exports = ".wrapper {\n  width: 800px;\n  margin: 20px auto;\n  padding: 20px; }\n\n.items {\n  display: block;\n  margin: 20px 0; }\n"; });
//# sourceMappingURL=app-bundle.js.map