import CheckCardValidity from '../../CheckCardValidity';
import cards from '../../../json/cards.json'

describe('card validation', () => {

  const checkCards = new CheckCardValidity(cards);
  const input = checkCards.cardInput;
  const cardsElements = checkCards.cardsElements;
  const cardCheckStatus = checkCards.cardCheckStatus;
  const submitButton = document.querySelector('.card-check__submit-button');

  test.each([    
    ['4939344763173176', 'visa'],
    ['5333468245447699', 'mastercard'],
    ['347469319299185', 'amex'],
    ['6011621390591920', 'discover'],
    ['3544094226330868', 'jcb'],
    ['36053449243713', 'dinersclub'],
    ['2204376782288637', 'mir'],
  ])('luhnAlgorithm pass, identifyIssuer pass', (number, issuer) => {

    input.value = number;
    submitButton.click();
    
    const cardIcon = cardsElements.querySelector(`.${issuer}`);

    expect(cardIcon.classList.contains('active')).toBeTruthy();
    expect(cardCheckStatus.classList.contains('valid-card')).toBeTruthy();
  });
});
