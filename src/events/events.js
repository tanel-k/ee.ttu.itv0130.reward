export class AddToCartSuccessEvent {
  constructor(item) {
    this.item = item;
  }
}

export class AddToCartFailureEvent {}
