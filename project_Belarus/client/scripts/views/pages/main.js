import Component from '../../views/component.js';

class Main extends Component {
  static async render() {
    return `
      <div class="map-wrapper">
        <img src="../client/img/oblasti/belarus7.png" class="belarusImg" alt="belarus map" usemap="#Belarus">

        <map name="Belarus">
          <area shape="poly" coords="293, 176, 321, 95, 367, 47, 407, 56, 407, 40, 494, 10, 566, 32, 560, 60, 566, 65, 576, 55, 621, 43, 644, 47, 696, 100, 684, 129, 698, 163, 675, 198, 714, 225, 705, 252, 658, 266, 654, 279, 555, 282, 561, 235, 482, 231, 479, 239, 459, 227, 443, 237, 376, 178, 325, 185, 297, 179" href="#/VitebskRegion" alt="Vitebskaya oblast">

          <area shape="poly" coords="256, 175, 222, 189, 216, 241, 192, 276, 159, 296, 131, 303, 135, 320, 102, 333, 24, 330, 52, 444, 58, 504, 117, 506, 125, 477, 148, 480, 169, 493, 208, 466, 214, 419, 263, 422, 291, 414, 290, 396, 264, 353, 280, 338, 266, 314, 258, 319, 246, 302, 256, 297, 271, 296, 297, 260, 299, 234, 258, 172" href="#/GrodnoRegion" alt="Grodnenskaya oblast">

          <area shape="poly" coords="293, 197, 365, 190, 408, 228, 414, 243, 452, 238, 482, 240, 493, 248, 534, 244, 555, 258, 549, 354, 555, 364, 533, 381, 507, 397, 472, 402, 465, 433, 442, 441, 479, 457, 464, 543, 436, 544, 428, 552, 403, 550, 388, 540, 376, 557, 351, 536, 350, 511, 344, 511, 303, 499, 301, 477, 308, 464, 288, 447, 298, 434, 297, 425, 311, 411, 284, 359, 293, 343, 268, 312, 284, 300, 317, 277, 319, 250, 290, 201" href="#/MinskRegion" alt="Minskaya oblast">

          <area shape="poly" coords="578, 291, 624, 291, 653, 298, 663, 282, 711, 274, 722, 305, 766, 332, 756, 368, 789, 366, 829, 421, 782, 464, 728, 452, 720, 469, 686, 441, 626, 451, 597, 436, 589, 482, 550, 484, 489, 527, 478, 512, 485, 459, 449, 442, 480, 437, 478, 418, 500, 396, 528, 399, 562, 371, 559, 330, 579, 292" href="#/MogilevRegion" alt="Mogilevskaya oblast">

          <area shape="poly" coords="697, 459, 750, 533, 745, 580, 702, 581, 698, 617, 662, 676, 670, 717, 650, 720, 628, 694, 563, 712, 550, 680, 519, 705, 474, 682, 453, 692, 415, 679, 416, 603, 395, 587, 406, 559, 449, 569, 458, 560, 481, 563, 493, 539, 553, 500, 588, 501, 587, 479, 602, 452, 631, 460, 661, 452, 698, 458" href="#/GomelRegion" alt="Gomelskaya oblast">

          <area shape="poly" coords="228, 427, 292, 436, 280, 459, 302, 479, 292, 495, 293, 511, 306, 503, 349, 529, 394, 601, 389, 691, 364, 694, 354, 671, 326, 677, 236, 650, 107, 657, 104, 677, 78, 692, 32, 692, 25, 679, 39, 629, 0, 602, 37, 548, 77, 519, 122, 524, 131, 495, 165, 494, 189, 507, 188, 499, 214, 479, 222, 425" href="#/BrestRegion" alt="Brestskaya oblast">
        </map>
      </div>`;
  } 

  static afterRender() {
    this.asideRender ();
    this.setActions (); 
  }

  static setActions () {
    window.addEventListener('resize', this.resizeBelarusMap());   
  }

  static asideRender () {
    let aside = document.getElementsByClassName('main-container__aside')[0];

    aside.innerHTML = `
      <div class="about">
        <p class="title">О приложении:</p>
        <p>Дорогие беларусы! Когда, как не сейчас, открыть всю прелесть нашей страны. Кликни на желаемую область, чтобы узнать о достопримечательностях Беларуси побольше, выбрать интересуемую и запланировать свое путешествие на вкладке "Календарь".</p>
      </div>`;
  }
  
  static resizeBelarusMap () {
    let belarusImg = document.getElementsByClassName('belarusImg')[0],
        map = document.getElementsByTagName('map')[0];

    if (belarusImg.height <= 450) {
      map.innerHTML = `
      <area shape="poly" coords="187, 106, 199, 78, 198, 53, 231, 30, 282, 1, 347, 18, 393, 28, 429, 57, 436, 98, 443, 153, 346, 178, 348, 150, 271, 147, 232, 113, 182, 113" href="#/VitebskRegion" alt="Vitebskaya oblast">

      <area shape="poly" coords="16, 208, 73, 200, 121, 169, 132, 149, 135, 117, 162, 106, 187, 144, 185, 163, 171, 182, 161, 193, 171, 209, 182, 257, 169, 263, 136, 260, 128, 290, 108, 307, 81, 300, 76, 313, 37, 318, 36, 280, 14, 207" href="#/GrodnoRegion" alt="Grodnenskaya oblast">

      <area shape="poly" coords="183, 122, 231, 119, 261, 154, 279, 149, 302, 149, 308, 157, 347, 156, 343, 226, 323, 244, 295, 252, 291, 273, 278, 276, 299, 289, 292, 336, 255, 346, 222, 340, 221, 318, 186, 312, 188, 290, 184, 286, 191, 254, 174, 222, 184, 212, 165, 193, 184, 186, 194, 151, 183, 122" href="#/MinskRegion" alt="Minskaya oblast">

      <area shape="poly" coords="299, 324, 307, 288, 284, 276, 299, 271, 299, 259, 319, 247, 329, 249, 352, 232, 348, 212, 361, 186, 389, 180, 442, 172, 449, 190, 476, 204, 473, 229, 496, 227, 502, 242, 516, 266, 494, 292, 459, 282, 451, 290, 429, 274, 391, 278, 374, 271, 369, 299, 343, 302, 302, 324" href="#/MogilevRegion" alt="Mogilevskaya oblast">

      <area shape="poly" coords="436, 288, 467, 329, 467, 358, 437, 363, 437, 386, 413, 423, 417, 448, 402, 446, 393, 437, 352, 446, 342, 426, 323, 442, 296, 429, 258, 424, 261, 377, 244, 368, 258, 348, 278, 354, 343, 312, 368, 312, 367, 298, 376, 280, 396, 289, 434, 284" href="#/GomelRegion" alt="Gomelskaya oblast">

      <area shape="poly" coords="182, 272, 187, 300, 181, 321, 192, 313, 219, 337, 246, 373, 244, 432, 229, 433, 222, 424, 158, 408, 64, 413, 65, 421, 46, 432, 22, 430, 24, 392, -1, 376, 5, 359, 23, 339, 47, 323, 73, 327, 83, 309, 97, 310, 114, 317, 134, 300, 137, 264, 178, 272" href="#/BrestRegion" alt="Brestskaya oblast">`;
    } else {
      map.innerHTML = `
      <area shape="poly" coords="293, 176, 321, 95, 367, 47, 407, 56, 407, 40, 494, 10, 566, 32, 560, 60, 566, 65, 576, 55, 621, 43, 644, 47, 696, 100, 684, 129, 698, 163, 675, 198, 714, 225, 705, 252, 658, 266, 654, 279, 555, 282, 561, 235, 482, 231, 479, 239, 459, 227, 443, 237, 376, 178, 325, 185, 297, 179" href="#/VitebskRegion" alt="Vitebskaya oblast">

      <area shape="poly" coords="256, 175, 222, 189, 216, 241, 192, 276, 159, 296, 131, 303, 135, 320, 102, 333, 24, 330, 52, 444, 58, 504, 117, 506, 125, 477, 148, 480, 169, 493, 208, 466, 214, 419, 263, 422, 291, 414, 290, 396, 264, 353, 280, 338, 266, 314, 258, 319, 246, 302, 256, 297, 271, 296, 297, 260, 299, 234, 258, 172" href="#/GrodnoRegion" alt="Grodnenskaya oblast">

      <area shape="poly" coords="293, 197, 365, 190, 408, 228, 414, 243, 452, 238, 482, 240, 493, 248, 534, 244, 555, 258, 549, 354, 555, 364, 533, 381, 507, 397, 472, 402, 465, 433, 442, 441, 479, 457, 464, 543, 436, 544, 428, 552, 403, 550, 388, 540, 376, 557, 351, 536, 350, 511, 344, 511, 303, 499, 301, 477, 308, 464, 288, 447, 298, 434, 297, 425, 311, 411, 284, 359, 293, 343, 268, 312, 284, 300, 317, 277, 319, 250, 290, 201" href="#/MinskRegion" alt="Minskaya oblast">

      <area shape="poly" coords="578, 291, 624, 291, 653, 298, 663, 282, 711, 274, 722, 305, 766, 332, 756, 368, 789, 366, 829, 421, 782, 464, 728, 452, 720, 469, 686, 441, 626, 451, 597, 436, 589, 482, 550, 484, 489, 527, 478, 512, 485, 459, 449, 442, 480, 437, 478, 418, 500, 396, 528, 399, 562, 371, 559, 330, 579, 292" href="#/MogilevRegion" alt="Mogilevskaya oblast">

      <area shape="poly" coords="697, 459, 750, 533, 745, 580, 702, 581, 698, 617, 662, 676, 670, 717, 650, 720, 628, 694, 563, 712, 550, 680, 519, 705, 474, 682, 453, 692, 415, 679, 416, 603, 395, 587, 406, 559, 449, 569, 458, 560, 481, 563, 493, 539, 553, 500, 588, 501, 587, 479, 602, 452, 631, 460, 661, 452, 698, 458" href="#/GomelRegion" alt="Gomelskaya oblast">

      <area shape="poly" coords="228, 427, 292, 436, 280, 459, 302, 479, 292, 495, 293, 511, 306, 503, 349, 529, 394, 601, 389, 691, 364, 694, 354, 671, 326, 677, 236, 650, 107, 657, 104, 677, 78, 692, 32, 692, 25, 679, 39, 629, 0, 602, 37, 548, 77, 519, 122, 524, 131, 495, 165, 494, 189, 507, 188, 499, 214, 479, 222, 425" href="#/BrestRegion" alt="Brestskaya oblast">`;
    }
  }
}

export default Main;