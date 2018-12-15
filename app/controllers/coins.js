import Controller from '@ember/controller';
import config from 'ember-get-config';

export default Controller.extend({
  session: Ember.inject.service('session'),

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

  return Ember.$.ajax({
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

  return Ember.$.ajax({
    method: 'POST',
    url: `${config.apiEndpoint}/sudo/coins/deactivate`,
    data: { code: coin }, 
    headers: headers
  });
  
}
