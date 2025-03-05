import {url, urlUsu, urlClases} from './variables.js';
function redirigir(event) {
    id = event.target.id;
    window.href = url + id;
}