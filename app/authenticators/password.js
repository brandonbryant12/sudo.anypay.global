import Base from "ember-simple-auth/authenticators/base";
import Ember from "ember";
import config from 'ember-get-config';

export default Base.extend({
  restore(data) {
    return Ember.RSVP.Promise.resolve(data);
  },
  authenticate(password, _empty) {
    return new Ember.RSVP.Promise((resolve, reject) => {
      Ember.$
        .ajax({
          url: `${config.apiEndpoint}/access_tokens`,
          method: "POST",
          headers: {
            Authorization: `Basic ${btoa(`${password}:`)}`
          }
        })
        .then(accessToken => resolve({ accessToken: accessToken.uid }))
        .catch(error => {
          console.log("error", error);
          reject("invalid credentials");
        });
    });
  },
  invalidate() {
    return Ember.RSVP.Promise.resolve();
  }
});
