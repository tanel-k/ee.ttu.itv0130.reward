import { default as ShopItem } from '../../entities/shop-item';

export class ShopPage {
  constructor() {
    this.shopItems = [
      new ShopItem('sb', 'Saw blade', 'media/img/saw-blade.jpg', 2.00, '$', 12),
      new ShopItem('hm', 'Hammer', 'media/img/hammer.jpg', 15.00, '$', 25),
      new ShopItem('pl', 'Pliers', 'media/img/pliers.jpg', 23.40, '$', 24),
      new ShopItem('dr', 'Drill', 'media/img/drill.jpg', 100.00, '$', 5),
      new ShopItem('sk', 'Screwdriver kit', 'media/img/screw-drivers.jpg', 35.00, '$', 10),
      new ShopItem('wr', 'Wrench', 'media/img/wrench.jpg', 17.00, '$', 24),
      new ShopItem('ag', 'Angle grinder', 'media/img/angle-grinder.jpg', 250.00, '$', 4),
      new ShopItem('lc', 'Locking clamp', 'media/img/locking-clamp.jpg', 3.00, '$', 45),
      new ShopItem('mt', 'Masking tape', 'media/img/masking-tape.jpg', 1.00, '$', 35),
      new ShopItem('sr', 'Remover set', 'media/img/scraper-and-remover-set.jpg', 25.00, '$', 3),
      new ShopItem('st', 'Rubber mallet', 'media/img/rubber-mallet.jpg', 15.00, '$', 12),
      new ShopItem('st', 'Scraper set', 'media/img/scraper-set.jpg', 20.00, '$', 23)
    ];
  }
}
