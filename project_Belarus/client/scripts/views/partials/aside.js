import Component from '../../views/component.js';

class Aside extends Component {
  static async render() {
    return `
    <div class="description">
      <img class="imgBox"></img>
      <div class="header">
        <p class="title"></p>
        <div class="like"></div>
      </div>
      
      <p class="location-description"></p>
      <ul class="facts"></ul>
      <ul class="activities"></ul>
      <a class="route" target="_blank"></a>
    </div>
  `;
  }
}

export default Aside;




