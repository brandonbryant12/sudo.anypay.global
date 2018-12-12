import Base from "ember-simple-auth/authenticators/base";
import config from 'ember-get-config';
import $ from 'jquery';

export default Base.extend({

  async restore(data) {
    return data;
  },

  async authenticate(password) {
    console.log('password', password);

    await $.ajax({
      url: `${config.apiEndpoint}/sudo/auth`,
      method: "GET",
      headers: {
        Authorization: `Basic ${btoa(`${password}:`)}`
      }
    });

    return { accessToken: password };

  },
  async invalidate() {
    return;
  }
});
