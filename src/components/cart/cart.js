import { inject } from 'aurelia-framework';
import { EventAggregator } from 'aurelia-event-aggregator';

import 'jquery';
import 'jquery-ui-dist';

import { AddedToCartSuccessEvent, AddedToCartFailureEvent } from '../../events/events';

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
    this.audioBank = {
      cartClank: new Audio('../../media/audio/shopping_cart_clank.mp3'),
      cartSemiClank: new Audio('../../media/audio/shopping_cart_cut_short.mp3')
    };
  }

  initializeDOMHooks() {
    this.$cartIcon = $(this.element.querySelector('.shopping-cart-icon'));
  }

  wireEvents() {
    this.ea.subscribe(AddedToCartSuccessEvent, event => {
      this.audioBank.cartClank.cloneNode().play();
      this.$cartIcon.effect('shake', { times: 2 }, 200);
    });

    this.ea.subscribe(AddedToCartFailureEvent, event => {
      this.audioBank.cartSemiClank.cloneNode().play();
    });
  }
}
