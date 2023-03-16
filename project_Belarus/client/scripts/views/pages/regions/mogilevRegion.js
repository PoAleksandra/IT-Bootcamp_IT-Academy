import Component from '../../component.js';
import Actions from './actions.js';

class MogilevRegion extends Component {

  static async render() {
    return `
    <div class="region">
      <img src="../client/img/oblasti/mogilevskaya.png" alt="" class="regionImg">

      <img src="../client/img/buynichskoye_pole.png" alt="" class="locationIcon buynichskoye_pole" data-id="buynichskoye_pole">
      <img src="../client/img/golubaya_krinitsa.png" alt="" class="locationIcon golubaya_krinitsa" data-id="golubaya_krinitsa">
      <img src="../client/img/mogilevskaya_ratusha.png" alt="" class="locationIcon mogilevskaya_ratusha" data-id="mogilevskaya_ratusha">
      <img src="../client/img/usadba_bulgakov.png" alt="" class="locationIcon usadba_bulgakov" data-id="usadba_bulgakov">
      <img src="../client/img/usadba_grafskogo_roda_tolstykh.png" alt="" class="locationIcon usadba_grafskogo_roda_tolstykh" data-id="usadba_grafskogo_roda_tolstykh">
    </div>
    `;
  }

    static afterRender() {
    Actions.setActions();
  }
}

export default MogilevRegion;