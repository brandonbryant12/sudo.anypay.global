import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import config from 'ember-get-config';
import { inject } from '@ember/service';
import $ from 'jquery';

export default Route.extend(AuthenticatedRouteMixin, {
  session: inject('session'),

  model: function() {
    let accessToken = this.get('session')['session']['content']['authenticated']['accessToken'];
    let headers = {
      'Authorization': `Basic ${btoa(accessToken + ":")}`
    };
    return $.ajax({
      method: 'GET',
      url: `${config.apiEndpoint}/sudo/coins`,
      headers: headers
    });
  },

  setupController(controller, model) {

    console.log('model', model);

    controller.set('coins', model);

  }
});
