"use strict";
let router;
let currentPath = window.location.pathname;
let viewContainer = document.getElementById('view-container');
const Router = function(name, routes) {
  return {
    name,
    routes
  };
};
function validRoute() {
  if (currentPath === '/') {
    console.log('Path default');
  }
  else {
    const route = routes.find((r => r.path === this.currentPath));
    if (route) {
      console.log('ruta encontrada: ', route);
      console.log('container: ', viewContainer);
    }
    else {
      console.log('No encontro la ruta');
      console.log('container: ', viewContainer);
    }
  }
};
window.onload = () => {
  /**
   * Constructor de rutas
   * Agregar las rutas aqui
   */
  router = new Router('routes', [
    {
      path: '/',
      name: 'Root'
    },
    {
      path: '/ProcesosCalculo',
      name: 'Procesos de Cálculo'
    },
    {
      path: '/CadenasTexto',
      name: 'Cadenas de Texto'
    },
  ]);
  validRoute();
}
