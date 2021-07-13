export default class CheckCardValidity {
  constructor(cards) {
    this.cards = cards;
    this.form = document.querySelector('.card-check');
    this.cardInput = document.querySelector('.card-check__card-number');
    this.cardsElements = document.querySelectorAll('.card');
    this.cardCheckStatus = document.querySelector('.card-check-status');

    this.cardCheck = this.cardCheck.bind(this);
    this.onInput = this.onInput.bind(this);
    this.luhnAlgorithm = this.luhnAlgorithm.bind(this);
    this.identifyIssuer = this.identifyIssuer.bind(this);
  }

  init() {
    this.form.addEventListener('submit', this.cardCheck);
    this.cardInput.addEventListener('input', this.onInput);
  }

  onInput() {
    if (this.cardCheckStatus.classList.length > 1) {
      this.cardCheckStatus.classList.remove('valid-card', 'invalid-card', 'unknown-issuer');
      this.cardCheckStatus.textContent = '';
    }
  }

  cardCheck(event) {
    event.preventDefault();
    const value = this.cardInput.value.replace(/\D/g, '');
    this.cardInput.value = value;
    if (this.cardCheckStatus.classList.length > 1) {
      this.cardCheckStatus.classList.remove('valid-card', 'invalid-card', 'unknown-issuer');
    }
    const isLuhnAlgorithmPassed = this.luhnAlgorithm(value);
    if (!isLuhnAlgorithmPassed) {
      this.cardCheckStatus.classList.add('invalid-card');
      this.cardCheckStatus.textContent = 'Проверьте корректность номера';
    } else {
      const isIssuerIdentified = this.identifyIssuer(value);
      if (!isIssuerIdentified) {
        this.cardCheckStatus.classList.add('unknown-issuer');
        this.cardCheckStatus.textContent = 'Номер корректен, платежная система не определена';
      } else {
        this.cardCheckStatus.classList.add('valid-card');
        this.cardCheckStatus.textContent = 'Номер корректен';
        Array.from(this.cardsElements).forEach((card) => {
          if (card.classList.contains(isIssuerIdentified)) {
            card.classList.add('active');
          }
        });
      }
    }
  }

  luhnAlgorithm(value) {
    this.numberCheck = false;

    if (value.length < 13 || value.length > 19) {
      return false;
    }

    let sum = 0;
    const isEven = value.length % 2 === 0;
    if (isEven) {
      for (let i = 0; i < value.length; i += 1) {
        const digit = parseInt(value[i], 10);
        if (i % 2 === 0 && digit * 2 > 9) {
          sum += digit * 2 - 9;
        } else if (i % 2 === 0 && digit * 2 <= 9) {
          sum += digit * 2;
        } else {
          sum += digit;
        }
      }
    } else {
      for (let i = 0; i < value.length; i += 1) {
        const digit = parseInt(value[i], 10);
        if (i % 2 !== 0 && digit * 2 > 9) {
          sum += digit * 2 - 9;
        } else if (i % 2 !== 0 && digit * 2 <= 9) {
          sum += digit * 2;
        } else {
          sum += digit;
        }
      }
    }
    return sum % 10 === 0;
  }

  identifyIssuer(value) {
    Array.from(this.cardsElements).forEach((card) => card.classList.remove('active'));
    const suitableLength = this.cards.filter((issuer) => issuer.numberLength
      .some((length) => length === value.length));
    const suitablePrefixes = suitableLength.filter((issuer) => issuer.prefixes
      .some((prefix) => prefix === +value.slice(0, String(prefix).length)));
    if (suitablePrefixes.length === 0) {
      return false;
    }
    const issuer = suitablePrefixes[0].name;
    return issuer;
  }
}
