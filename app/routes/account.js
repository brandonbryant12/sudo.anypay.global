import Route from '@ember/routing/route';
import { inject } from '@ember/service';
import config from 'ember-get-config';
import $ from 'jquery';

async function getDashback(accessToken, email) {

  let headers = {
    'Authorization': `Basic ${btoa(accessToken + ":")}`
  };

  let dashback = await $.ajax({

    method: 'GET',
    url: `${config.apiEndpoint}/sudo/dashback/merchants/${email}`,
    headers: headers
  });

  return dashback

}

export default Route.extend({
  session: inject('session'),

  actions: {

    toggleDashback: function() {
      console.log("toggledashback");
    }
  },

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

    let dashback = await getDashback(accessToken, account.email);

    account.dashback = dashback.merchant ? true : false;

    return account;
  },

  setupController(controller, model) {

    controller.set('account', model);

    controller.set('dashback', model.dashback);

  }

});
