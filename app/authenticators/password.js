import Base from "ember-simple-auth/authenticators/base";
import config from 'ember-get-config';
import $ from 'jquery';

export default Base.extend({
  async restore(data) {
    return data;
  },
  async authenticate(password) {

    let accessToken = await $.ajax({
      url: `${config.apiEndpoint}/access_tokens`,
      method: "POST",
      headers: {
        Authorization: `Basic ${btoa(`${password}:`)}`
      }
    });

    return { accessToken: accessToken.uid };

  },
  async invalidate() {
    return;
  }
});
