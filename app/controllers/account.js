import Controller from '@ember/controller';
import { inject } from '@ember/service';
import { observer } from '@ember/object';
import config from 'ember-get-config';
import $ from 'jquery';

async function setDashback(accessToken, email, isEnabled) {

  let headers = {
    'Authorization': `Basic ${btoa(accessToken + ":")}`
  };

  let urlBase = `${config.apiEndpoint}/sudo/dashback/merchants/${email}`;

  var url;

  if (isEnabled) {
    url = `${urlBase}/activate`;
  } else {
    url = `${urlBase}/deactivate`;
  }

  let dashback = await $.ajax({
    method: 'POST',
    url: url,
    headers: headers
  });

  return dashback

}

export default Controller.extend({

  session: inject('session'),

  dashback: false,

  dashbackChange: observer('dashback', async function() { 

    let enable = this.get('dashback');

    console.log('dashback changed', enable);

    let accessToken = this.get('session')['session']['content']['authenticated']['accessToken'];

    await setDashback(accessToken, this.get('account').email, enable);

    console.log(`dashback ${enable ? "enabled" : "disabled"}`)

  }),

  actions: {

    toggleDashback: function() {

      console.log("toggle dashback");

    }
  }
});
