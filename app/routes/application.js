import Route from '@ember/routing/route';

import ApplicationRouteMixin from "ember-simple-auth/mixins/application-route-mixin";

export default Route.extend(ApplicationRouteMixin, {
  sessionInvalidationSucceeded: function() {
    this.transitionTo("login");
  },
  sessionInvalidationFailed: function() {
    this.transitionTo("login");
  },
  sessionAuthenticationSucceeded: function() {
    this.transitionTo("dashboard");
  }
});
