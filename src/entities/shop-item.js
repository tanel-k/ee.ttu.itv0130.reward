export default class ShopItem {
  constructor(name, imgPath, price, priceCurrencySymbol, stockCount) {
    Object.assign(this, {
      name,
      imgPath,
      price,
      priceCurrencySymbol,
      stockCount
    });
  }

  get priceString() {
    return `${this.priceCurrencySymbol}${this.price.toFixed(2)}`;
  }
}
