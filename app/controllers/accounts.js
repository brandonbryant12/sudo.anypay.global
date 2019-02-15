import Controller from '@ember/controller';
import config from 'ember-get-config';
import { inject } from '@ember/service';
import $ from 'jquery';

async function lookupAccountByEmail(email, token) {

  let headers = {
    'Authorization': `Basic ${btoa(token + ":")}`
  };


  let resp = await $.ajax({

      method: 'GET',

      url: `${config.apiEndpoint}/sudo/account-by-email/${email}`,

      headers

  })

  console.log(resp);

  return resp;

}

export default Controller.extend({

  session: inject('session'),

  accountSearchEmail: null,

  actions: {

    searchAccountEmail: async function() {

      let accessToken = this.get('session')['session']['content']['authenticated']['accessToken'];

      console.log(this.get('accountSearchEmail'));

      let account = await lookupAccountByEmail(this.get('accountSearchEmail'), accessToken);

      console.log('account', account.id);

      this.transitionToRoute('account', account.id);
       
    }

  }

});
