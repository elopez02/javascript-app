import view from '../views/facturacion.html';
import facturacionPartial from '../controllers/facturacion-partial.controller';

const partidas = [];

function Factura(
  fecha,
  clave,
  nombre,
  tipoCambio,
  descuento,
  partidas
) {
  this.fecha = fecha;
  this.clave = clave;
  this.nombre = nombre;
  this.tipoCambio = tipoCambio;
  this.descuento = descuento;
  this.partidas = partidas;

  this.rawValues = () => {
    return {
      fecha: this.fecha,
      clave: this.clave,
      nombre: this.nombre,
      tipoCambio: this.tipoCambio,
      descuento: this.descuento,
      partidas: this.partidas
    }
  }

  this.save = (el) => {
    if (this.partidas.length < 2) {
      alert('Debe ingresar un mínimo de 3 partidas para generar la factura.');
      return;
    }
    localStorage.setItem('factura', JSON.stringify(this.rawValues()));
    const partial = el.querySelector('#facturacion-content');
    partial.innerHTML = '';
    partial.appendChild(facturacionPartial());
  }
}

function Partidas(
  cantidad,
  codProducto,
  precio,
  iva,
  descuento
) {
  this.cantidad = cantidad;
  this.codProducto = codProducto;
  this.precio = precio;
  this.iva = iva;
  this.descuento = descuento;

  this.rawValues = () => {
    return {
      cantidad: this.cantidad,
      codProducto: this.codProducto,
      precio: this.precio,
      iva: this.iva,
      descuento: this.descuento
    }
  }

  this.save = () => {
    partidas.push(this.rawValues());
    console.log('factura saved');
    console.log('partidas', partidas);
  }
}

export default () => {
  const el = document.createElement('div');
  el.innerHTML = view;

  el.querySelector('#form-cliente').addEventListener('submit', (e) => {
    e.preventDefault();
    const factura = new Factura(
      el.querySelector('#fecha').value,
      el.querySelector('#clave').value,
      el.querySelector('#nombreCliente').value,
      el.querySelector('#tipoCambio').value,
      el.querySelector('#descuentoCliente').value,
      partidas
    );
    factura.save(el);
  });

  el.querySelector('#form-partida').addEventListener('submit', (e) => {
    e.preventDefault();
    const partida = new Partidas(
      el.querySelector('#cantidad').value,
      el.querySelector('#codProducto').value,
      el.querySelector('#precio').value,
      el.querySelector('#iva').value,
      el.querySelector('#descuentoPartida').value
    );
    partida.save();
  });

  return el;
}