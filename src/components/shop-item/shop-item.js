import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

import 'jquery';
import 'jquery-ui-dist';

import { AddToCartSuccessEvent, AddToCartFailureEvent } from '../../events/events';

@inject(Element, EventAggregator)
export default class ShopItem {
  constructor(element, ea) {
    this.element = element;
    this.ea = ea;
  }

  activate({ shopItem, cartViewModel }) {
    this.shopItem = shopItem;
    this.cartViewModel = cartViewModel;
  }

  attached() {
    this.initializeDOMHooks();
    this.wireEvents();
  }

  initializeDOMHooks() {
    this.addToCartButton = this.element.querySelector('button.add-to-cart');
    this.$addToCartButton = $(this.addToCartButton);
    this.itemIcon = this.element.querySelector('img.item-image');
    this.$itemIcon = $(this.itemIcon);
    this.$cartIcon = this.cartViewModel.currentViewModel.$cartIcon;
  }

  get isOutOfStock() {
    return this.shopItem.stockCount <= 0;
  }

  reduceStock() {
    if (this.shopItem.stockCount > 0) {
      this.shopItem.stockCount--;
    }
  }

  wireEvents() {
    this.$addToCartButton.on('click', (event) => {
      if (!this.isOutOfStock) {
        this.reduceStock();
        this.animateDropToCart();
      } else {
        this.ea.publish(new AddToCartFailureEvent());
      }
    });
  }

  animateDropToCart() {
    const $cartIcon = this.$cartIcon;
    const $itemIcon = this.$itemIcon;
    const $itemIconClone = $itemIcon.clone();
    $itemIconClone
      .offset({
        top: $itemIcon.offset().top,
        left: $itemIcon.offset().left
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
        'top': $cartIcon.offset().top + 10,
        'left': $cartIcon.offset().left + 10,
        'width': 75,
        'height': 75
      }, 750, 'easeInOutExpo');

    setTimeout(() => {
      this.ea.publish(new AddToCartSuccessEvent(this.shopItem));
    }, 1250);

    $itemIconClone.animate({ 'width': 0, 'height': 0 }, () => {
      $itemIconClone.detach();
    });
  }
}
