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
      url: `${config.apiEndpoint}/sudo/accounts/${params.id}`,
      headers: headers
    });

    return account;
  },

  setupController(controller, model) {

    controller.set('account', model);

  }

});
