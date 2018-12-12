import Controller from '@ember/controller';

export default Controller.extend({

  actions: {
    authenticate() {

      let { identification , password } = this.getProperties('identification', 'password');

      console.log(`login ${identification}`);

      this.get('session').authenticate('authenticator:password', password).catch((reason) => {
        this.set('errorMessage', reason.error || reason);
      });
    }
  }
});
