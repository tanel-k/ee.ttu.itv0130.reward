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
define('components/cart/cart',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var Cart = function Cart() {
    _classCallCheck(this, Cart);
  };

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

    ShopItem.prototype.activate = function activate(itemModel) {
      Object.assign(this, itemModel);
    };

    return ShopItem;
  }();

  exports.default = ShopItem;
});
define('containers/shop-page/shop-page',['exports', 'jquery', 'jquery-ui-dist'], function (exports) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.ShopPage = undefined;

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  var ShopPage = exports.ShopPage = function () {
    function ShopPage() {
      _classCallCheck(this, ShopPage);

      this.shopItems = [{
        img: '../../media/img/saw-blade.jpg',
        name: 'Saw blade',
        price: '$2.00',
        inStock: 10
      }, {
        img: '../../media/img/hammer.jpg',
        name: 'Hammer',
        price: '$15.00',
        inStock: 10
      }, {
        img: '../../media/img/pliers.jpg',
        name: 'Pliers',
        price: '$23.40',
        inStock: 10
      }, {
        img: '../../media/img/drill.jpg',
        name: 'Drill',
        price: '$100.00',
        inStock: 10
      }, {
        img: '../../media/img/screw-drivers.jpg',
        name: 'Screwdriver kit',
        price: '$35.00',
        inStock: 10
      }];

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
          }, 1000, 'easeInOutExpo');

          setTimeout(function () {
            _this.playCartClank();
            cart.effect('shake', { times: 2 }, 200);
          }, 1500);

          itemIconClone.animate({ 'width': 0, 'height': 0 }, function () {
            $(itemIconClone).detach();
          });
        }
      });
    };

    ShopPage.prototype.playCartClank = function playCartClank() {
      this.audioBank.cartClank.play();
    };

    ShopPage.prototype.playCartSemiClank = function playCartSemiClank() {
      this.audioBank.cartSemiClank.play();
    };

    ShopPage.prototype.playCartOpen = function playCartOpen() {
      this.audioBank.cartOpen.play();
    };

    return ShopPage;
  }();
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"jquery-ui-dist/jquery-ui.css\"></require><div class=\"bs-component\"><router-view></router-view></div></template>"; });
define('text!components/cart/cart.html', ['module'], function(module) { module.exports = "<template><require from=\"./cart.css\"></require><div class=\"shopping-cart-container\"><i class=\"shopping-cart-icon\"></i></div></template>"; });
define('text!components/cart/cart.css', ['module'], function(module) { module.exports = ".shopping-cart-container {\n  float: right; }\n\n.shopping-cart-icon {\n  display: inline-block;\n  background: url(\"http://cdn1.iconfinder.com/data/icons/jigsoar-icons/24/_cart.png\") no-repeat 0 0;\n  width: 24px;\n  height: 24px;\n  margin: 0 10px 0 0; }\n"; });
define('text!components/shop-item/shop-item.html', ['module'], function(module) { module.exports = "<template><require from=\"./shop-item.css\"></require><div class=\"item panel panel-primary\"><div class=\"panel-heading\"><h4>${name}</h4><h5>${price}</h5></div><div class=\"panel-body\"><img src=\"${img}\"><p>In stock: <strong>${inStock}</strong></p></div><div class=\"panel-footer\"><button class=\"btn btn-primary btn-block add-to-cart\" type=\"button\">Add to cart</button></div></div></template>"; });
define('text!components/shop-item/shop-item.css', ['module'], function(module) { module.exports = ".item {\n  background-color: #fff;\n  float: left;\n  padding: 5px;\n  margin: 5px; }\n  .item img {\n    display: block;\n    margin: auto;\n    height: 200px;\n    width: 200px; }\n  .item p {\n    margin: 0; }\n\n.item.panel-primary .panel-heading h1, .item.panel-primary .panel-heading h2, .item.panel-primary .panel-heading h3, .item.panel-primary .panel-heading h4, .item.panel-primary .panel-heading h5, .item.panel-primary .panel-heading h6 {\n  color: white !important; }\n"; });
define('text!containers/shop-page/shop-page.html', ['module'], function(module) { module.exports = "<template><require from=\"./shop-page.css\"></require><div class=\"wrapper\"><span><i class=\"shopping-cart\"></i></span><compose view-model=\"../../components/cart/cart\" model.bind=\"{}\"></compose><h3>A Rewarding Toolshed</h3><div class=\"items\"><compose repeat.for=\"shopItem of shopItems\" view-model=\"../../components/shop-item/shop-item\" model.bind=\"shopItem\"></compose></div></div></template>"; });
define('text!containers/shop-page/shop-page.css', ['module'], function(module) { module.exports = ".wrapper {\n  width: 800px;\n  margin: 20px auto;\n  padding: 20px; }\n\n.items {\n  display: block;\n  margin: 20px 0; }\n"; });
//# sourceMappingURL=app-bundle.js.map