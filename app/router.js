import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL
});

Router.map(function() {
  this.route('login');
  this.route('dashboard', { path: '/' });
  this.route('logout');
  this.route('accounts');
  this.route('invoices');
  this.route('forwards');
  this.route('coins');
});

export default Router;
