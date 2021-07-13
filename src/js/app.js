/*
Информация по картам отсюда: https://en.wikipedia.org/wiki/Payment_card_number#Issuer_identification_number_.28IIN.29
Номера карт отсюда: https://www.freeformatter.com/credit-card-number-generator-validator.html
и отсюда: https://cardguru.io/credit-card-generator/mir
*/

import CheckCardValidity from './CheckCardValidity';
import cards from '../json/cards.json';

const checkCards = new CheckCardValidity(cards);
checkCards.init();
