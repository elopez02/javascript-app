import './assets/css/styles.css';
import './assets/js/main.js'
import { Router } from './assets/js/router.js'

window.addEventListener('hashchange', (event) => {
    console.log('hash changed', window.location.hash);
    Router(window.location.hash);
    event.stopImmediatePropagation();
}, false);
window.addEventListener('load', (event) => {
    Router(window.location.hash);
    console.log('load changed', window.location.hash);
    event.stopImmediatePropagation();
}, false);