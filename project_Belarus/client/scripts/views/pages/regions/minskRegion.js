import Component from '../../component.js';
import Actions from './actions.js';

class MinskRegion extends Component {

  static async render() {
    return `
    <div class="region">
      <img src="../client/img/oblasti/minskaya.png" alt="" class="regionImg minsk">

      <img src="../client/img/hatyn.png" alt="" class="locationIcon hatyn" data-id="hatyn">
      <img src="../client/img/logoisk.png" alt="" class="locationIcon logoisk" data-id="logoisk">
      <img src="../client/img/gorod_solntsa_minsk.png" alt="" class="locationIcon gorod_solntsa_minsk" data-id="gorod_solntsa_minsk">
      <img src="../client/img/kostel_bozhego_tela_v_bogushevichakh.png" alt="" class="locationIcon kostel_bozhego_tela_v_bogushevichakh" data-id="kostel_bozhego_tela_v_bogushevichakh">
      <img src="../client/img/lubanskie_melovye_karyery.png" alt="" class="locationIcon lubanskie_melovye_karyery" data-id="lubanskie_melovye_karyery">
      <img src="../client/img/nalibokskaya_puscha.png" alt="" class="locationIcon nalibokskaya_puscha" data-id="nalibokskaya_puscha">
      <img src="../client/img/nesvizhskiy_zamok.png" alt="" class="locationIcon nesvizhskiy_zamok" data-id="nesvizhskiy_zamok">
      <img src="../client/img/terrikony_soligorska.png" alt="" class="locationIcon terrikony_soligorska" data-id="terrikony_soligorska">
      <img src="../client/img/usadba_gutten-chapskikh.png" alt="" class="locationIcon usadba_gutten-chapskikh" data-id="usadba_gutten-chapskikh">
      <img src="../client/img/nats_park_narochanski.png" alt="" class="locationIcon nats_park_narochanski" data-id="nats_park_narochanski">
    </div>
    `;
  }

  static afterRender() {
    Actions.setActions();
  }
}

export default MinskRegion;