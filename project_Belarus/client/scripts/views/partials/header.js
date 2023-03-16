import Component from '../../views/component.js';

class Header extends Component {
  static async render() {
      const page = this.urlParts.region;

      return `
         <nav class="header-container__nav">
        <a class="header__link ${!page ? 'active' : ''}" href="#/">
          Карта
        </a>

        <a class="header__link ${page === 'Calendar' ? 'active' : ''}" href="#/Calendar">
          Календарь
        </a>

        <a class="header__link ${page === 'userAccount' ? 'active' : ''}" href="#/userAccount">
          Избранное
        </a>
      </nav>  
      `;
  }
}

export default Header;