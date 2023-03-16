import Component from '../../component.js';
import Actions from './actions.js';

class GrodnoRegion extends Component {

  static async render() {
    return `
    <div class="region">
      <img src="../client/img/oblasti/grodnenskaya.png" alt="" class="regionImg grodno">

      <img src="../client/img/avgustovskiy_kanal.png" alt="" class="locationIcon avgustovskiy_kanal" data-id="avgustovskiy_kanal">
      <img src="../client/img/borisoglebskaya_tserkov.png" alt="" class="locationIcon borisoglebskaya_tserkov" data-id="borisoglebskaya_tserkov">
      <img src="../client/img/golshany.png" alt="" class="locationIcon golshany" data-id="golshany">
      <img src="../client/img/kostel_svyatoy_troitsy.png" alt="" class="locationIcon kostel_svyatoy_troitsy" data-id="kostel_svyatoy_troitsy">
      <img src="../client/img/mirski_zamok.png" alt="" class="locationIcon mirski_zamok" data-id="mirski_zamok">
      <img src="../client/img/slonimskaya_sinagoga.png" alt="" class="locationIcon slonimskaya_sinagoga" data-id="slonimskaya_sinagoga">
      <img src="../client/img/svyatopolk-chetvertinsky.png" alt="" class="locationIcon svyatopolk-chetvertinsky" data-id="svyatopolk-chetvertinsky">
    </div>
    `;
  }

  static afterRender() {
    Actions.setActions();
  }
}

export default GrodnoRegion;