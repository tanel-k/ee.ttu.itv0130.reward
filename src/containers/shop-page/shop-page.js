import 'jquery';
import 'jquery-ui-dist';

export class ShopPage {
  shopItems = [
    {
      img: '../../media/img/saw-blade.jpg',
      name: 'Saw blade',
      price: '$2.00',
      inStock: 10
    },
    {
      img: '../../media/img/hammer.jpg',
      name: 'Hammer',
      price: '$15.00',
      inStock: 10
    },
    {
      img: '../../media/img/pliers.jpg',
      name: 'Pliers',
      price: '$23.40',
      inStock: 10
    },
    {
      img: '../../media/img/drill.jpg',
      name: 'Drill',
      price: '$100.00',
      inStock: 10
    },
    {
      img: '../../media/img/screw-drivers.jpg',
      name: 'Screwdriver kit',
      price: '$35.00',
      inStock: 10
    }
  ];

  constructor() {
    this.audioBank = {
      cartClank: new Audio('../../media/audio/shopping_cart_clank.mp3'),
      cartSemiClank: new Audio('../../media/audio/shopping_cart_cut_short.mp3'),
      cartOpen: new Audio('../../media/audio/shopping_cart_open.mp3')
    };
  }

  attached() {
    $('button.add-to-cart').on('click', (event) => {
      const cart = $('.shopping-cart-icon');
      const itemIcon = $(event.target).parents('.item').find('img').eq(0);

      if (itemIcon) {
        const itemIconClone = itemIcon.clone()
          .offset({
            top: itemIcon.offset().top,
            left: itemIcon.offset().left
          })
          .css({
            'opacity': '0.5',
            'position': 'absolute',
            'height': '150px',
            'width': '150px',
            'z-index': '100'
          })
          .appendTo($('body'))
          .animate({
            'top': cart.offset().top + 10,
            'left': cart.offset().left + 10,
            'width': 75,
            'height': 75
          }, 1000, 'easeInOutExpo');

        setTimeout(() => {
          this.playCartClank();
          cart.effect('shake', { times: 2 }, 200);
        }, 1500);

        itemIconClone.animate({ 'width': 0, 'height': 0 }, () => {
          $(itemIconClone).detach();
        });
      }
    });
  }

  playCartClank() {
    this.audioBank.cartClank.play();
  }

  playCartSemiClank() {
    this.audioBank.cartSemiClank.play();
  }

  playCartOpen() {
    this.audioBank.cartOpen.play();
  }
}
