export default class ShopItem {
  constructor(code, name, imgPath, price, priceCurrencySymbol, stockCount) {
    Object.assign(this, {
      code,
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
