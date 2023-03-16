import Component from '../../component.js';
import Actions from './actions.js';

class BrestRegion extends Component {

  static async render() {
    return `
    <div class="region">
      <img src="../client/img/oblasti/brestskaya.png" alt="" class="regionImg">

      <img src="../client/img/belovezhskaya_puscha.png" alt="" class="locationIcon belovezhskaya_puscha" data-id="belovezhskaya_puscha">
      <img src="../client/img/brestskaya_krepost.png" alt="" class="locationIcon brestskaya_krepost" data-id="brestskaya_krepost">
      <img src="../client/img/kossovski_dvorets.png" alt="" class="locationIcon kossovski_dvorets" data-id="kossovski_dvorets">
      <img src="../client/img/chasovnya_ozheshko.png" alt="" class="locationIcon chasovnya_ozheshko" data-id="chasovnya_ozheshko">
      <img src="../client/img/dvortsovy_kompleks_Sapegov.png" alt="" class="locationIcon dvortsovy_kompleks_Sapegov" data-id="dvortsovy_kompleks_Sapegov">
      <img src="../client/img/granitnyi_karyer.png" alt="" class="locationIcon granitnyi_karyer" data-id="granitnyi_karyer">
      <img src="../client/img/olmanskiye_bolota.png" alt="" class="locationIcon olmanskiye_bolota" data-id="olmanskiye_bolota">
    </div>
    `;
  }

  static afterRender() {
    Actions.setActions();
  }
}

export default BrestRegion;