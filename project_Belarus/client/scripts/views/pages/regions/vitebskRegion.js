import Component from '../../component.js';
import Actions from './actions.js';

class VitebskRegion extends Component {

  static async render() {
    return `
    <div class="region">
      <img src="../client/img/oblasti/vitebskaya.png" alt="" class="regionImg">

      <img src="../client/img/elnya.png" alt="" class="locationIcon elnya" data-id="elnya">
      <img src="../client/img/braslavskie_ozera.png" alt="" class="locationIcon braslavskie_ozera" data-id="braslavskie_ozera">  
      <img src="../client/img/sofiiski_sobor.png" alt="" class="locationIcon sofiiski_sobor" data-id="sofiiski_sobor">
      <img src="../client/img/karyer_v_Rube.png" alt="" class="locationIcon karyer_v_Rube" data-id="karyer_v_Rube">
      <img src="../client/img/ruiny_smolyanskogo_zamka.png" alt="" class="locationIcon ruiny_smolyanskogo_zamka" data-id="ruiny_smolyanskogo_zamka">
      <img src="../client/img/lesnoi_zoopark.png" alt="" class="locationIcon lesnoi_zoopark" data-id="lesnoi_zoopark">
      <img src="../client/img/berezinski_biosferny_zapovednik.png" alt="" class="locationIcon berezinski_biosferny_zapovednik" data-id="berezinski_biosferny_zapovednik">
      <img src="../client/img/kostel_rozhdestva_devy_marii.png" alt="" class="locationIcon kostel_rozhdestva_devy_marii" data-id="kostel_rozhdestva_devy_marii">
    </div>
    `;
    }

  static afterRender() {
    Actions.setActions();
  }
}

export default VitebskRegion;
 