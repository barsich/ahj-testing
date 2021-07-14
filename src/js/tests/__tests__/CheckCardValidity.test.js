import CheckCardValidity from '../../CheckCardValidity';
import cards from '../../../json/cards.json'

describe('card validation', () => {
  const checkCards = new CheckCardValidity(cards);
  test.each([
    // visa
    ['4939344763173176', 'visa'],
    ['4485291273368127', 'visa'],
    ['4929702173591321106', 'visa'],
    ['4024007193305306', 'visa'],
    ['4191968583937213', 'visa'],
    // mastercard
    ['5333468245447699', 'mastercard'],
    ['5165352728043618', 'mastercard'],
    ['5589252192439367', 'mastercard'],
    ['5216287702788771', 'mastercard'],
    ['5137761240103822', 'mastercard'],
    // amex
    ['347469319299185', 'amex'],
    ['341004192907509', 'amex'],
    ['378901239315479', 'amex'],
    ['377601832325369', 'amex'],
    ['342669743682238', 'amex'],
    // discover
    ['6011621390591920', 'discover'],
    ['6011038648115669', 'discover'],
    ['6011928826577585597', 'discover'],
    ['6575649678753412985', 'discover'],
    ['6221261878082267088', 'discover'],
    // jcb
    ['3544094226330868', 'jcb'],
    ['3533600670301925', 'jcb'],
    ['3528678703497853405', 'jcb'],
    ['358960779528012254', 'jcb'],
    ['3540032707076463235', 'jcb'],
    // dinersclub
    ['36053449243713', 'dinersclub'],
    ['36713119702039', 'dinersclub'],
    ['36964581342792', 'dinersclub'],
    ['3614015909663882', 'dinersclub'],
    ['3644584802259613', 'dinersclub'],
    // mir
    ['2204376782288637', 'mir'],
    ['2202823958623206', 'mir'],
    ['2201521370298349', 'mir'],
    ['2200638637756009', 'mir'],
    ['2204679760786716', 'mir'],
  ])('luhnAlgorithm pass, identifyIssuer pass', (number, issuer) => {
    expect(checkCards.luhnAlgorithm(number)).toBeTruthy();
    expect(checkCards.identifyIssuer(number)).toBe(issuer);
  });

  test.each([
    '3949344763173176',
    '8559252192439367',
    '279901239315479',
    '6110928826577585597',
    '3825678703497853405',
    '35974581342792',
    '1211521370298349',
  ])('luhnAlgorithm pass, identifyIssuer fail', (number) => {
    expect(checkCards.luhnAlgorithm(number)).toBeTruthy();
    expect(checkCards.identifyIssuer(number)).toBeFalsy();
  });

  test.each([
    '394934473173176',
    '855925212439367',
    '27990123315479',
    '611092886577585597',
    '382567734978053405',
    '3597458142792',
    '121152130298349',
  ])('luhnAlgorithm fail, identifyIssuer fail', (number) => {
    expect(checkCards.luhnAlgorithm(number)).toBeFalsy();
    expect(checkCards.identifyIssuer(number)).toBeFalsy();
  });
});
