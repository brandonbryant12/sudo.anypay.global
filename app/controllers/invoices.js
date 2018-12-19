import Controller from '@ember/controller';
import { inject } from '@ember/service';

export default Controller.extend({
  session: inject('session'),

  invoiceUID: null,

  actions: {

    searchInvoice() {

      this.transitionToRoute('invoice', this.get('invoice_uid'));

    }
  }
});
