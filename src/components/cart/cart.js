import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

import 'jquery';
import 'jquery-ui-dist';

import { AddToCartSuccessEvent, AddToCartFailureEvent } from '../../events/events';

@inject(Element, EventAggregator)
export default class Cart {
  constructor(element, ea) {
    this.element = element;
    this.ea = ea;

    this.initializeData();
  }

  attached() {
    this.initializeDOMHooks();
    this.wireEvents();
  }

  initializeData() {
    this.cartItems = [];
    this.audioBank = {
      cartClank: new Audio('../../media/audio/shopping_cart_clank.mp3'),
      cartSemiClank: new Audio('../../media/audio/shopping_cart_cut_short.mp3')
    };
  }

  initializeDOMHooks() {
    this.$cartIcon = $(this.element.querySelector('i.shopping-cart-icon'));
  }

  get totalPriceString() {
    if (!this.cartItems.length) {
      return '0.00';
    }
    const total = this.cartItems.map(item => (item.price)).reduce((prev, curr) => (prev + curr), 0.0);
    return `${this.cartItems[0].priceCurrencySymbol}${total.toFixed(2)}`;
  }

  wireEvents() {
    this.ea.subscribe(AddToCartSuccessEvent, event => {
      this.cartItems.push(event.item);
      this.audioBank.cartClank.cloneNode().play();
      this.$cartIcon.effect('shake', { times: 2 }, 200);
    });

    this.ea.subscribe(AddToCartFailureEvent, event => {
      this.audioBank.cartSemiClank.cloneNode().play();
    });
  }
}
