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
  this.route('account', { path: '/accounts/:id' });
  this.route('invoices');
  this.route('forwards');
  this.route('forward', { path: '/forwards/:forward_id' });
  this.route('coins');
  this.route('invoice', { path: '/invoices/:id' });
  this.route('addresses');
});

export default Router;
