import viewPartial from '../views/facturacion-partial.html';

export default () => {
  const el = document.createElement('div');
  el.innerHTML = viewPartial;
  return el;
}