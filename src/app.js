export class App {
  constructor() {}

  configureRouter(config, router) {
    this.router = router;
    config.title = 'Reward store';
    config.map([
      {
        route: '',
        name: 'shop-page',
        moduleId: 'containers/shop-page/shop-page'
      }
    ]);
  }
}
