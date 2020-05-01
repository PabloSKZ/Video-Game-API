import '@fortawesome/fontawesome-free/js/all.js';
import AOS from 'aos';
import 'aos/dist/aos.css'; 
import "../scss/styles.scss";
import routes from './routes'

AOS.init();

let pageArgument;

function setRoute() {
  let path = window.location.hash.substring(1).split("/");
  pageArgument = path[1] || "";

  var pageContent = document.getElementById("pageContent");
  routes[path[0]](pageArgument);
  return true;
}

window.addEventListener("hashchange", () => setRoute());
window.addEventListener("DOMContentLoaded", () => setRoute());

