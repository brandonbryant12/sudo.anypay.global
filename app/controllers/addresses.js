import Controller from '@ember/controller';

export default Controller.extend({

  actions: {

    lockAddress: async function() {

      let email    = this.get('address_lock_email');
      let currency = this.get('address_lock_currency');

      console.log(`lock address ${email} ${currency}`);

    },

    unlockAddress: async function() {

      let email    = this.get('address_unlock_email');
      let currency = this.get('address_unlock_currency');

      console.log(`unlock address ${email} ${currency}`);

    }

  }

});
