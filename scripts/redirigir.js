import {url, urlUsu, urlClases} from './variables';
function redirigir(event) {
    id = event.target.id;
    window.href = url + id;
}