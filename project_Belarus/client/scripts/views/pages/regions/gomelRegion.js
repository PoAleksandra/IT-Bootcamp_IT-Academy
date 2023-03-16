import Component from '../../component.js';
import Actions from './actions.js';

class GomelRegion extends Component {

  static async render() {
    return `
    <div class="region">
      <img src="../client/img/oblasti/gomelskaya.png" alt="" class="regionImg">

      <img src="../client/img/more_gerodota.png" alt="" class="locationIcon more_gerodota" data-id="more_gerodota">
      <img src="../client/img/turovskiye_kresty.png" alt="" class="locationIcon turovskiye_kresty" data-id="turovskiye_kresty">
      <img src="../client/img/usadba_gerardov.png" alt="" class="locationIcon usadba_gerardov" data-id="usadba_gerardov">
      <img src="../client/img/usadba_kozel-poklevskikh.png" alt="" class="locationIcon usadba_kozel-poklevskikh" data-id="usadba_kozel-poklevskikh">
      <img src="../client/img/zdanie_dohodnogo_doma_v_gomele.png" alt="" class="locationIcon zdanie_dohodnogo_doma_v_gomele" data-id="zdanie_dohodnogo_doma_v_gomele">
    </div>
    `;
  }

  static afterRender() {
    Actions.setActions();
  }
}

export default GomelRegion;