import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import config from 'ember-get-config';

export default Route.extend({
  session: inject('session'),

  async model(params) {

    let accessToken = this.get('session')['session']['content']['authenticated']['accessToken'];
    let headers = {
      'Authorization': `Basic ${btoa(accessToken + ":")}`
    };
    let account = await $.ajax({

      method: 'GET',
      url: `${config.apiEndpoint}/sudo/accounts/${params.account_id}`,
      headers: headers
    });

    return account;
  },

  setupController(controller, model) {

    console.log('model', model);

    controller.set('account', model);
    controller.set('accountUpdate', {
      physical_address: model.physical_address,
      business_name: model.business_name,
      latitude: model.latitude,
      longitude: model.longitude
    });

  }

});
