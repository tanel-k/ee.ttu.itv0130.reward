import { default as ShopItem } from '../../entities/shop-item';

export class ShopPage {
  constructor() {
    this.shopItems = [
      new ShopItem('Saw blade', '../../media/img/saw-blade.jpg', 2.00, '$', 120),
      new ShopItem('Hammer', '../../media/img/hammer.jpg', 15.00, '$', 25),
      new ShopItem('Pliers', '../../media/img/pliers.jpg', 23.40, '$', 24),
      new ShopItem('Drill', '../../media/img/drill.jpg', 100.00, '$', 5),
      new ShopItem('Screwdriver kit', '../../media/img/screw-drivers.jpg', 35.00, '$', 10),
      new ShopItem('Wrench', '../../media/img/wrench.jpg', 17.00, '$', 24)
    ];
  }
}
