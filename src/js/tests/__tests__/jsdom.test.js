import CheckCardValidity from '../../CheckCardValidity';
import cards from '../../../json/cards.json';

describe('card validation (jsdom)', () => {
  document.body.innerHTML = `
  <div class="container">
    <ul class="card-list">
      <li class="card-list__item"><span class="card visa">Visa</span></li>
      <li class="card-list__item"><span class="card mastercard">MasterCard</span></li>
      <li class="card-list__item"><span class="card amex">American Express</span></li>
      <li class="card-list__item"><span class="card discover">Discover</span></li>
      <li class="card-list__item"><span class="card jcb">JCB</span></li>
      <li class="card-list__item"><span class="card dinersclub">Diners Club</span></li>
      <li class="card-list__item"><span class="card mir">Мир</span></li>
    </ul>
    <form class="card-check">
      <input type="text" required class="card-check__card-number">
      <button class="card-check__submit-button">Click to Validate</button>
    </form>
    <p class="card-check-status">Введите номер карты</p>
  </div>
  `;
  const checkCards = new CheckCardValidity(cards);
  const input = checkCards.cardInput;
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

    const cardIcon = document.querySelector(`.${issuer}`);

    expect(cardIcon.classList.contains('active')).toBeTruthy();
    expect(cardCheckStatus.classList.contains('valid-card')).toBeTruthy();
  });
});
