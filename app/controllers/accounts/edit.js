import Controller from '@ember/controller';
import { inject } from '@ember/service';
import config from 'ember-get-config';

async function updateAccount(account, updateParams, token) {

    let headers = {
      'Authorization': `Basic ${btoa(token + ":")}`
    };

    let resp = await $.ajax({

      method: 'PUT',
      data: updateParams,
      url: `${config.apiEndpoint}/sudo/accounts/${account.id}`,
      headers: headers
    });

    return resp.account;

}


export default Controller.extend({
  session: inject('session'),

  account: {},

  accountUpdate: {},

  actions: {

    updateAccount: async function() {

    },

    save: async function() {

      console.log("SAVE", this.get('accountUpdate'));

      let accessToken = this.get('session')['session']['content']['authenticated']['accessToken'];

      console.log(accessToken);
      let account = await updateAccount(this.account, this.get('accountUpdate'), accessToken);

      console.log('updated account', account);

      this.transitionToRoute("account", account)

    }

  }

});

