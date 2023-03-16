import {parseCurrentURL} from './helpers/utils.js';

import Header from './views/partials/header.js'; 
import Main from './views/pages/main.js';
import Aside from './views/partials/aside.js';
import Footer from './views/partials/footer.js';
import Error404 from './views/pages/error404.js';
import Calendar from './views/pages/calendar.js';
import Account from './views/pages/userAccount.js';

import VitebskRegion from './views/pages/regions/vitebskRegion.js';
import BrestRegion from './views/pages/regions/brestRegion.js';
import GomelRegion from './views/pages/regions/gomelRegion.js';
import GrodnoRegion from './views/pages/regions/grodnoRegion.js';
import MinskRegion from './views/pages/regions/minskRegion.js';
import MogilevRegion from './views/pages/regions/mogilevRegion.js';

const Routes = {
  '/': Main,
  '/Calendar': Calendar,
  '/userAccount': Account,
  '/VitebskRegion': VitebskRegion,
  '/BrestRegion': BrestRegion,
  '/GomelRegion': GomelRegion,
  '/GrodnoRegion': GrodnoRegion,
  '/MinskRegion': MinskRegion,
  '/MogilevRegion': MogilevRegion,
};

const router = async() => {
  const headerContainer = document.getElementsByClassName('header-container')[0],
        contentContainer = document.getElementsByClassName('main-container__content')[0],
        asideContainer = document.getElementsByClassName('main-container__aside')[0],
        urlParts = parseCurrentURL(),

        pagePath = `/${urlParts.region || ''}${urlParts.location ? `/${urlParts.location}` : ''}${urlParts.action ? ':region' : ''}`,
        Page = Routes[pagePath] ? Routes[pagePath] : Error404;

  headerContainer.innerHTML = await Header.render();

  asideContainer.classList.remove('none');

  asideContainer.innerHTML = await Aside.render();
  Aside.afterRender();

  contentContainer.innerHTML = await Page.render();
  Page.afterRender();
};

(async() => {
  const footerContainer = document.getElementsByClassName('footer-container')[0];

  footerContainer.innerHTML = await Footer.render();
})();

window.onload = router;
window.onhashchange = router;