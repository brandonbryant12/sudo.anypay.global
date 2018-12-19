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
    let invoices = await $.ajax({
      method: 'GET',
      url: `${config.apiEndpoint}/sudo/invoices`,
      headers: headers
    });

    return invoices.invoices
  },

  setupController: function(controller, model){ 

    controller.set('invoiceUID', null);

    controller.set('invoices', model);

    console.log('model', model);

  }


});
