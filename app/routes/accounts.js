import Route from '@ember/routing/route';
import AuthenticatedRouteMixin from "ember-simple-auth/mixins/authenticated-route-mixin";
import config from 'ember-get-config';
import { inject } from '@ember/service';
import $ from 'jquery';

export default Route.extend(AuthenticatedRouteMixin, {
  session: inject('session'),

  model: async function() {

    /*
      Retrieve payment_forwards list from API
    */

    let accessToken = this.get('session')['session']['content']['authenticated']['accessToken'];
    let headers = {
      'Authorization': `Basic ${btoa(accessToken + ":")}`
    };
    let accounts = await $.ajax({
      method: 'GET',
      url: `${config.apiEndpoint}/sudo/accounts`,
      headers: headers
    });

    return accounts
  },

  setupController: function(controller, model){ 

    controller.set('accounts', model);

    console.log('model', model);

  }


});
