import { beforeEach, describe } from '@bigtest/mocha';
import { always } from '@bigtest/convergence';
import { expect } from 'chai';

import setupApplication from '../helpers/setup-application';
import CheckOutInteractor from '../interactors/check-out';

const checkOut = new CheckOutInteractor();

describe('checkout session', () => {
  setupApplication({
    scenarios: ['sessionTimeout'],
  });

  beforeEach(function () {
    return this.visit('/checkout', () => {
      expect(checkOut.$root).to.exist;
    });
  });

  describe('session times out', () => {
    beforeEach(async function () {
      this.server.create('user', {
        barcode: '123456',
        personal: {
          firstName: 'Bob',
          lastName: 'Brown',
        },
      });

      await checkOut
        .fillPatronBarcode('123456')
        .clickPatronBtn()
        .whenUserIsLoaded();

      await always(() => true, 8000);
    });

  //   it('resets the app', () => {
  //   //  setTimeout(() => {
  //  //     expect(checkOut.patronFullName).to.equal('Brown, Bob');
  //       expect(checkOut.endSessionBtnPresent).to.be.false;
  //  //   }, 1000);
  //   });
  });
});
