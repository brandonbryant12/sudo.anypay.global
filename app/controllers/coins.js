import Controller from '@ember/controller';
import config from 'ember-get-config';
import $ from 'jquery';
import { inject } from '@ember/service';

export default Controller.extend({
  session: inject('session'),

  actions: {

    async activateCoin(coin) {

      console.log('activate coin', coin);

      let accessToken = this.get('session')['session']['content']['authenticated']['accessToken'];

      await activateCoin(coin, accessToken);

      alert(`${coin} activated`);

      return true;

    },

    async deactivateCoin(coin) {

      console.log('deactivate coin', coin);

      let accessToken = this.get('session')['session']['content']['authenticated']['accessToken'];

      await deactivateCoin(coin, accessToken);

      alert(`${coin} deactivated`);

      return true;

    }

  }
});

function activateCoin(coin, accessToken) {

  let headers = {
    'Authorization': `Basic ${btoa(accessToken + ":")}`
  };

  return $.ajax({
    method: 'POST',
    url: `${config.apiEndpoint}/sudo/coins/activate`,
    data: { code: coin }, 
    headers: headers
  });
  
}

function deactivateCoin(coin, accessToken) {

  let headers = {
    'Authorization': `Basic ${btoa(accessToken + ":")}`
  };

  return $.ajax({
    method: 'POST',
    url: `${config.apiEndpoint}/sudo/coins/deactivate`,
    data: { code: coin }, 
    headers: headers
  });
  
}
