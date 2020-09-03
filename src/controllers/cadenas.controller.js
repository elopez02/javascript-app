import view from '../views/cadenas.html';
import { cadenas } from '../index.const';

/**
 * 
 * @param { valor ingresado por el usuario } str 
 * Funcion que retorna una cadena de texto al reves.
 */
const reverse = (str) => {
  return str.split('').reverse().join('');
}

/**
 * 
 * @param { valor ingresado por el usuario } str 
 * Funcion que retorna la cantidad de vocales de una cadena
 */
const countVowels = (str) => {
  return str.match(/[aeiou]/gi) ? str.match(/[aeiou]/gi).length : 0;
}

/**
 * 
 * @param { valor ingresado por el usuario } str 
 * Funcion que retorna una cadena cifrada
 */
const encrypt = (str) => {
  return window.btoa(str);
}

/**
 * 
 * @param { evento del input del keypress } e 
 * Valida que no ingrese caracteres especiales y el máximo de caraceteres
 */
const validations = (e) => {
  return !!(e.key.match(cadenas.validations.regExp)) &&
  e.target.value.length < cadenas.validations.maxLength
  ? true : e.preventDefault();
}

export default () => {
  const el = document.createElement('div');
  el.innerHTML = view;

  const inputCadena = el.querySelector('#input-cadena');
  const btnCadena = el.querySelector('#btn-cadena');
  const contentCadena = el.querySelector('#cadena');

  inputCadena.addEventListener('keypress', validations);

  const print = () => {
    const value = inputCadena.value;

    if (value === '') {
      return;
    }

    contentCadena.innerHTML = '';

    const strVowels = countVowels(value);
    const strReverse = reverse(value);
    const strEncrypted = encrypt(value);

    contentCadena.innerHTML = `
      <div class="form-group row mt-2">
        <label class="col-sm-3 col-form-label font-weight-bold">Cantidad de vocales:</label>
        <label class="col-form-label col-sm-9">La cadena de texto tiene: <b>${ strVowels }</b> vocal(es).</label>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label font-weight-bold">Texto al revés:</label>
        <label class="col-form-label col-sm-9">${ strReverse }</label>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label font-weight-bold">Texto cifrado:</label>
        <label class="col-form-label col-sm-9">${ strEncrypted }</label>
      </div>
    `;
  }

  btnCadena.addEventListener('click', print);
  return el;
}