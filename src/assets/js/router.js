import { routes } from '../../routes.const';
import { views } from '../../controllers/index';

const viewContainer = document.getElementById('view-container');

export const Router = (currentPath) => {
  viewContainer.innerHTML = '';
  const route = routes.find((r => r.path === currentPath));
  if (route) {
    console.log('ruta', route);
    return viewContainer.appendChild(views[route.controller]());
  }
  else {
    console.log('No encontro la ruta');
    console.log('container: ', viewContainer);
  }
};
