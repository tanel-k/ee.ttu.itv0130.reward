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
  }

  initializeDOMHooks() {
    this.$element = $(this.element);
    this.$cartIcon = $(this.element.querySelector('i.shopping-cart-icon'));
    this.shoppingCartToggle = this.element.querySelector('.shopping-cart-toggle');
    this.$shoppingCartToggle = $(this.shoppingCartToggle);
    this.$priceLabel = $(this.element.querySelector('#price-label'));
  }

  wireEvents() {
    this.ea.subscribe(AddToCartSuccessEvent, event => {
      this.registerItem(event.item);
      this.animatePriceLabel();
      this.audioBank.cartClank.cloneNode().play();
      this.$cartIcon.effect('shake', { times: 2 }, 200);
    });

    this.ea.subscribe(AddToCartFailureEvent, event => {
      this.audioBank.cartSemiClank.cloneNode().play();
    });
  }

  get isEmpty() {
    return this.cartItemSet.size === 0;
  }

  get totalPriceString() {
    if (this.isEmpty) {
      return '$0.00';
    }
    const total = Object.values(this.priceMap).reduce((prev, curr) => (prev + curr), 0.0);
    return `$${total.toFixed(2)}`;
  }

  animatePriceLabel() {
    this.$priceLabel.removeClass('animated flipInX');
    setTimeout(() => this.$priceLabel.addClass('animated flipInX'), 0);
  }

  registerItem(item) {
    this.cartItemSet.add(item);
    if (typeof this.countMap[item.code] !== 'number') {
      this.countMap[item.code] = 0;
    }
    this.countMap[item.code]++;

    if (typeof this.priceMap[item.code] !== 'number') {
      this.priceMap[item.code] = 0.0;
    }
    this.priceMap[item.code] += item.price;
  }

  resetCart() {
    this.cartItemSet.clear();
    this.countMap = {};
    this.priceMap = {};
  }

  toPriceString(price) {
    return `$${price.toFixed(2)}`;
  }

  buy() {
    this.audioBank.ding.cloneNode().play();
    this.isBuying = true;
    this.isProcessing = true;
    this.resetCart();
    setTimeout(() => {
      this.isProcessing = false;
      setTimeout(() => {
        const $thankYouNote = this.$element.find('#thank-you-note');
        $thankYouNote.removeClass('animated fadeOut');
        $thankYouNote.addClass('animated fadeIn');
      }, 0);
    }, 900);
    setTimeout(() => {
      const $thankYouNote = this.$element.find('#thank-you-note');
      $thankYouNote.removeClass('animated fadeIn');
      $thankYouNote.addClass('animated fadeOut');
      setTimeout(() => this.isBuying = false, 500);
    }, 1500);
  }

  cartClicked() {
    if (this.shoppingCartToggle.getAttribute('aria-expanded') === 'true') {
      this.audioBank.cartOpen.cloneNode().play();
    } else {
      this.audioBank.cartClose.cloneNode().play();
    }
  }
}
