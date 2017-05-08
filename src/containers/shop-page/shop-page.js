import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

import 'jquery';
import 'jquery-ui-dist';

import { default as ShopItem } from '../../entities/shop-item';
import { AddedToCartSuccessEvent } from '../../events/events';

@inject(EventAggregator)
export class ShopPage {
  shopItems = [
    new ShopItem('Saw blade', '../../media/img/saw-blade.jpg', 2.00, '$', 120),
    new ShopItem('Hammer', '../../media/img/hammer.jpg', 15.00, '$', 25),
    new ShopItem('Pliers', '../../media/img/pliers.jpg', 23.40, '$', 24),
    new ShopItem('Drill', '../../media/img/drill.jpg', 100.00, '$', 5),
    new ShopItem('Screwdriver kit', '../../media/img/screw-drivers.jpg', 35.00, '$', 10),
    new ShopItem('Wrench', '../../media/img/wrench.jpg', 17.00, '$', 24)
  ];

  constructor(ea) {
    this.ea = ea;
    this.audioBank = {
      cartClank: new Audio('../../media/audio/shopping_cart_clank.mp3'),
      cartSemiClank: new Audio('../../media/audio/shopping_cart_cut_short.mp3'),
      cartOpen: new Audio('../../media/audio/shopping_cart_open.mp3')
    };
  }

  attached() {
    // animate adding stuff to the cart
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
          }, 750, 'easeInOutExpo');
        setTimeout(() => {
          this.ea.publish(new AddedToCartSuccessEvent());
        }, 1250);

        itemIconClone.animate({ 'width': 0, 'height': 0 }, () => {
          $(itemIconClone).detach();
        });
      }
    });
  }
}
