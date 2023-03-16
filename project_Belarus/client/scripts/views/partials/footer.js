import Component from '../../views/component.js';

class Footer extends Component {
  static async render() {
      return `
          <footer class="footer">                   
              <p class="footer__info">
                  Для Беларусов с любовью ❤
              </p>                  
          </footer>
      `;
  }
}

export default Footer;