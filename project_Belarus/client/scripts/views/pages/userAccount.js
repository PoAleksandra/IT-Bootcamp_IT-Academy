import Component from '../../views/component.js';
import Regions from '../../models/regions.js';

class Account extends Component {
  static async render() {
    return `
    <div class="userInfo">
      <div class="userInfo__favorite-locations">
        <p class="title">Избранные локации:</p>
        <div class="favorite-locations"></div>  
        <div>
  
        </div>
        
      </div>
    
      <div class="userInfo__notes">
        <p class="title">Мои записи:</p> 
        <div class="notes_wrapper"></div>   
      </div>
    </div>
      `;
  }
  
  static afterRender() {
    this.loadActions();
  }

  static loadActions() {
    this.removeAside ();
    this.loadNotes ();
    this.loadFavoriteLocations ();
  }

  static removeAside () {
    let aside = document.getElementsByClassName('main-container__aside')[0];
    aside.classList.add('none');
  }

  static loadNotes () {
    let notesWrapper = document.getElementsByClassName('notes_wrapper')[0],
      monthsInLocalStorage = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      monthsNamesRus = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'],
      dayOfTheWeekNamesInLocalStorage = ['Sun', 'Mon', 'Thu', 'Wed', 'Tue', 'Fri', 'Sat'],
      dayOfTheWeekNamesRus = ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'];
    
    for(let i=0; i < localStorage.length; i++) {
      let noteContainer = document.createElement('div'),
          date = document.createElement('p'),
          note = document.createElement('textarea'),
          buttonsBox = document.createElement('div'),
          saveBtn = document.createElement('button'),
          deleteBtn = document.createElement('button'),
          key = localStorage.key(i),
          month = key.substr(4,3),
          dayOfTheMonth = key.substr(8,2),
          dayOfTheWeek = key.substr(0,3),
          year = key.substr(11, 4);

      noteContainer.classList.add('note_container');
      note.classList.add('note');
      date.classList.add('date');
      buttonsBox.classList.add('actionButtons');
      note.dataset.date = key.substr(0, 15);
     
      if (key.substr(0, 4) != 'like') {        
        date.innerHTML = `${dayOfTheMonth.substr(0,1) === '0' ? dayOfTheMonth.substr(1,1): dayOfTheMonth} ${monthsNamesRus[monthsInLocalStorage.indexOf(month)]} ${year} - ${dayOfTheWeekNamesRus[dayOfTheWeekNamesInLocalStorage.indexOf(dayOfTheWeek)]}`;
        note.innerHTML = localStorage.getItem(key);
        saveBtn.innerHTML = 'Сохранить'; 
        deleteBtn.innerHTML = 'Удалить';  
  
        noteContainer.appendChild(date);
        noteContainer.appendChild(note);
        
        buttonsBox.appendChild(saveBtn);
        buttonsBox.appendChild(deleteBtn);

        noteContainer.appendChild(buttonsBox);
        notesWrapper.appendChild(noteContainer);
      }
        
      this.saveComment (saveBtn, note, year, monthsInLocalStorage, month, dayOfTheMonth);

      this.deleteComment (deleteBtn, year, monthsInLocalStorage, month, dayOfTheMonth, noteContainer);
    }
  }

  static async loadFavoriteLocations () {
    let favLocationsContainer = document.getElementsByClassName('favorite-locations')[0];
    for(let i=0; i<localStorage.length; i++) {
      let key = localStorage.key(i);

      const getFavLocationData = await Regions.getFavLocationData();

      if (key.substr(0, 4) === 'like') {
        let favLocationInfo = getFavLocationData.find(locationInfo => {
          return (locationInfo.id === key.substr(5)) ? locationInfo.id : '';
        });

        let favLocationBox = document.createElement('div'),
            imgBox = document.createElement('img'),
            locationInfoContainer = document.createElement('div'),
            locationTitle = document.createElement('p'),
            locationLink = document.createElement('a');

        favLocationBox.classList.add('favorite-locations__box');
        locationInfoContainer.classList.add('favorite-locations__info');
        imgBox.classList.add('favLocationImg');
        
        locationTitle.innerHTML = favLocationInfo.title;
        imgBox.src = `./img/${favLocationInfo.id}.png`;
        locationLink.innerHTML = "Перейти к области";
        locationLink.href = `#/${favLocationInfo.region}`;  

        favLocationBox.appendChild(imgBox);
        locationInfoContainer.appendChild(locationTitle);
        locationInfoContainer.appendChild(locationLink);
        favLocationBox.appendChild(locationInfoContainer);
        favLocationsContainer.appendChild(favLocationBox);
      }
    }
  }

  static saveComment (saveBtn, note, year, monthsInLocalStorage, month, dayOfTheMonth) {
    saveBtn.onclick = () => {
      let comment = note.value;
      let date = new Date (Number(year), monthsInLocalStorage.indexOf(month), Number(dayOfTheMonth));
      localStorage.setItem(date, comment);
    }
  }

  static deleteComment (deleteBtn, year, monthsInLocalStorage, month, dayOfTheMonth, noteContainer) {
    deleteBtn.onclick = () => {
      let date = new Date (Number(year), monthsInLocalStorage.indexOf(month), Number(dayOfTheMonth));
      localStorage.removeItem(date);
      noteContainer.remove();
    }
  }
}
export default Account;