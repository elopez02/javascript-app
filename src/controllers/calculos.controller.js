import view from '../views/calculos.html';
import { calculos } from '../index.const';

/**
 * 
 * @param {dia del mes} day 
 * Retorna un objeto con el dia del mes y un valor aleatorio
 */
const dayValue = (day) => {
  const value = (Math.random() * (calculos.range.max - 1) + calculos.range.min).toFixed(2);
  return {
    day,
    value
  };
}

/**
 * 
 * @param {array de objetos del mes seleccioando} data 
 * Retorna la tabla iterada con los datos recibidos
 */
const getTable = (data) => {
  let rowDays = ``;
  let rowValues = ``;
  data.map(r => {
    rowDays += `<th>Día ${r.day}</th>`;
    rowValues += `<td>${r.value}</td>`;
  });
  return `
    <div class="table-responsive">
      <table class="table table-striped table-bordered">
        <thead>
          <tr class="btn-primary text-white">${rowDays}</tr>
        </thead>
        <tbody>
          <tr>${rowValues}</tr>
        </tbody>
      </table>
    </div>
  `;
}

/**
 * Retorna las opciones para el "select" de meses
 */
const getMonthsElements = () => {
  return calculos.months.map(month => {
    return `<option value="${month.value}">${month.text}</option>`;
  });
}

/**
 * 
 * @param {recibe el numero del mes} month 
 * retorna los dias del mes enviado
 */
const getDaysInMonth = (month) => {
  const year = new Date().getFullYear();
  return new Date(year, month, 0).getDate();
}

export default () => {
  const el = document.createElement('div');
  el.innerHTML = view;

  const selectMonths = el.querySelector('#months');
  const btnCalcular = el.querySelector('#btn-calcular');
  const contentCalculo = el.querySelector('#calculos');

  selectMonths.innerHTML = getMonthsElements();

  const print = () => {
    const month = selectMonths.options[selectMonths.selectedIndex].value;
    const days = getDaysInMonth(month);
    let data = [];

    for (let i = 1; i <= days; i++) {
      data.push(dayValue(i));
    }

    const dataAux = data.slice();

    const max = dataAux.sort((a, b) => b.value - a.value)[0];
    const min = dataAux.sort((a, b) => a.value - b.value)[0];
    const avg = (dataAux.reduce((prev, current) => {
      return parseFloat(prev) + parseFloat(current.value);
    }, 0) / dataAux.length).toFixed(2);


    contentCalculo.innerHTML = `
      ${getTable(data)}
      <div class="form-group row mt-2">
        <label class="col-sm-3 col-form-label font-weight-bold">Cantidad máxima de Agua:</label>
        <label class="col-form-label col-sm-9">El día con mayor lluvia fue: <b>Día ${max.day}</b> con <b>${max.value} mm</b> de agua.</label>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label font-weight-bold">Cantidad mínina de Agua:</label>
        <label class="col-form-label col-sm-9">El día con menor lluvia fue: <b>Día ${min.day}</b> con <b>${min.value} mm</b> de agua.</label>
      </div>
      <div class="form-group row">
        <label class="col-sm-3 col-form-label font-weight-bold">Promedio de Agua al mes:</label>
        <label class="col-form-label col-sm-9">El promedio de lluvia al mes fue: <b>${avg} mm</b> de agua.</label>
      </div>
    `;
  }
 
  btnCalcular.addEventListener('click', print);
  return el;
}