import Component from '../../views/component.js';
import Regions from '../../models/regions.js';

class Calendar extends Component {
  static async render() {
    return `
    <div class="calendar-wrapper">
      <button class="btn up-btn">
        Назад
      </button>

      <div class="calendar-container">
        <p class="year-on-page"></p>

        <p class="month-on-page"></p>
    
        <table class="calendar-content">
          <thead>
            <tr class="calendar-content__days-of-the-week">
              <td data-id = "1">ПН</td>
              <td data-id = "2">ВТ</td>
              <td data-id = "3">СР</td>
              <td data-id = "4">ЧТ</td>
              <td data-id = "5">ПТ</td>
              <td data-id = "6">СБ</td>
              <td data-id = "0">ВС</td>
            </tr>
          </thead>

          <tbody></tbody>
        </table>

        <div class="action-buttons">
          <button class="btn action-buttons__current-month">Очистить события текущeго месяца</button>
          <button class="btn action-buttons__whereToGo">Куда бы поехать в этом месяце?</button>
          <button class="btn action-buttons__all-months">Очистить все события</button>
        </div>

        <div class="confirmation" hidden>
          <p class="message"></p>

          <div>
            <button class="btn confirmation_approved">ДА</button>
            <button class="btn confirmation_unapproved">НЕТ</button>
          </div>
        </div>

        <div class="advices" hidden></div>

        <div class="comment_box" hidden>
          <textarea></textarea>

          <div class="action-buttons">
            <button class="btn action-buttons__save">Сохранить</button>
            <button class="btn action-buttons__delete">Удалить</button>
            <button class="btn action-buttons__close">Закрыть</button>
          </div>
        </div>
      </div>

      <button class="btn down-btn">
        Вперед
      </button>
    </div>  
    `;
  } 
  
  static afterRender() {
    this.setActions();
    this.removeAside ();
    this.renderCalendarLayout();
    this.setDefaultDate ();
  }

  static setActions() {
    const months = ['Январь', 'Февраль','Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    let monthWrapper = document.getElementsByClassName('month-on-page')[0],
        yearWrapper = document.getElementsByClassName('year-on-page')[0],
        backButton = document.getElementsByClassName('down-btn')[0],
        forwardButton = document.getElementsByClassName('up-btn')[0],
        clearAllBtn = document.getElementsByClassName('action-buttons__all-months')[0],
        clearCurrentBtn = document.getElementsByClassName('action-buttons__current-month')[0],
        whereToGoBtn = document.getElementsByClassName('action-buttons__whereToGo')[0],
        calendarWrapper = document.getElementsByTagName('tbody')[0];

    backButton.addEventListener('click', this.goBack.bind(Calendar, months, monthWrapper, yearWrapper)) 
    forwardButton.addEventListener('click', this.goForward.bind(Calendar, months, monthWrapper, yearWrapper))
    clearAllBtn.addEventListener('click', this.clearAll.bind(Calendar));
    clearCurrentBtn.addEventListener('click', this.clearCurrentInfo.bind(Calendar, months))
    whereToGoBtn.onclick = this.showBestPlaces.bind(Calendar, months);
    calendarWrapper.addEventListener('click', this.addComment.bind(Calendar));
  }

  static removeAside () {
    let aside = document.getElementsByClassName('main-container__aside')[0];
    aside.classList.add('none');
  }

  static renderCalendarLayout () {
    let calendarWrapper = document.getElementsByTagName('tbody')[0];

    for (let i=0; i<5; i++) {
      const weeksInMonth = calendarWrapper.getElementsByTagName('tr')
      let newWeek = document.createElement('tr'),
          date = document.createElement('p');

      if (weeksInMonth.length === i) {
        newWeek.dataset.id = i;
        calendarWrapper.appendChild(newWeek);

        for (let j = 1; j <= 7; j++) {
          let newDay = document.createElement('td');
          newDay.classList.add('day');
          newDay.dataset.dayOfTheWeek = j;

          j === 7 ? newDay.dataset.dayOfTheWeek = 0 : '';

          newWeek.appendChild(newDay);
          newDay.appendChild(date);
        }
      }          
    }
    this.fillCalendar ();
    this.extraLine ();
  }
  
  static setDefaultDate () {
    const months = ['Январь', 'Февраль','Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    let defaultDate = new Date(),
        monthWrapper = document.getElementsByClassName('month-on-page')[0],
        yearWrapper = document.getElementsByClassName('year-on-page')[0];
    
    monthWrapper.innerHTML = months[defaultDate.getMonth()];
    yearWrapper.innerHTML = defaultDate.getFullYear();

    this.fillComments (monthWrapper, yearWrapper);
    this.extraLine();
  }

  static goForward (months, monthWrapper, yearWrapper) {
    let currentYear = yearWrapper.innerHTML,
      currentMonthName = monthWrapper.innerHTML;

    if (currentMonthName === "Январь") {
      monthWrapper.innerHTML = months[11];
      currentYear--;
    } else {
      let currentMonthNumber = months.indexOf(currentMonthName);
      monthWrapper.innerHTML = months[currentMonthNumber-1];
    }   
    yearWrapper.innerHTML = currentYear;

    this.fillCalendar();
    this.extraLine();
  }

  static goBack (months, monthWrapper, yearWrapper) {   
    let currentMonthName = monthWrapper.innerHTML,
        currentYear = yearWrapper.innerHTML;
        
    if (currentMonthName === "Декабрь") {
      monthWrapper.innerHTML = months[0];
      currentYear++;
    } else {
      let currentMonthNumber = months.indexOf(currentMonthName);
      monthWrapper.innerHTML = months[currentMonthNumber+1];
    }
    yearWrapper.innerHTML = currentYear;

    this.fillCalendar();
    this.extraLine();
  }

  static clearCurrentInfo (months) {
    let userComments =  document.querySelectorAll('textarea'),
        monthWrapper = document.getElementsByClassName('month-on-page')[0],
        currentMonthName = monthWrapper.innerHTML,
        monthsInLocalStorage = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        confirmationBox = document.getElementsByClassName('confirmation')[0];
        
    confirmationBox.hidden = false;
    confirmationBox.firstElementChild.innerHTML = 'Вы уверены, что хотите удалить события текущего месяца?';

    this.blockActions();

    let approved = document.getElementsByClassName('confirmation_approved')[0],
    unapproved = document.getElementsByClassName('confirmation_unapproved')[0];

    approved.onclick = () => {
      let currentMonthNumber = months.indexOf(currentMonthName);

      for(let i=0; i<localStorage.length; i++) {
        let key = localStorage.key(i);
          (key.substr(4,3) === monthsInLocalStorage[currentMonthNumber]) ? localStorage.removeItem(key) : '';
      }

      for (let i = 0; i <userComments.length; i++) {
        userComments[i].value = '';
      }
      confirmationBox.hidden = true;
      this.unlockActions ();
    }

    unapproved.onclick = () => {
      confirmationBox.hidden = true;
      this.unlockActions ();
    }
  }

  static clearAll () {
    let userComments =  document.querySelectorAll('textarea'),
        confirmationBox = document.getElementsByClassName('confirmation')[0],
        approved = document.getElementsByClassName('confirmation_approved')[0],
        unapproved = document.getElementsByClassName('confirmation_unapproved')[0];
    
    confirmationBox.hidden = false;
    confirmationBox.firstElementChild.innerHTML = 'Вы уверены, что хотите удалить все события в календаре?';

    this.blockActions();

    approved.onclick = () => {
      localStorage.clear();
      for (let i = 0; i <userComments.length; i++) {
        userComments[i].value = '';
      }
      confirmationBox.hidden = true;
      this.unlockActions ();
    }

    unapproved.onclick = () => {
      confirmationBox.hidden = true;
      this.unlockActions ();
    }
  }

  static addComment (event) {
    let target = event.target;

    let deleteCommentBtn = document.getElementsByClassName('action-buttons__delete')[0],
        monthWrapper = document.getElementsByClassName('month-on-page')[0],
        yearWrapper = document.getElementsByClassName('year-on-page')[0];

    const months = ['Январь', 'Февраль','Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];

    if (target.tagName === 'TEXTAREA') {
      let commentBox = document.getElementsByClassName('comment_box')[0],
          closeBtn = commentBox.getElementsByClassName('action-buttons__close')[0],
          saveBtn = commentBox.getElementsByClassName('action-buttons__save')[0],
          commentContent = commentBox.getElementsByTagName('textarea')[0];
      
      target.disabled = true;
      this.blockActions();

      commentContent.value = target.value;
      commentBox.hidden = false;

      saveBtn.onclick = () => {
        let currentYear = yearWrapper.innerHTML,
          currentMonthName = monthWrapper.innerHTML,
          date = new Date (Number(currentYear), months.indexOf(currentMonthName), target.dataset.id);

        target.value = commentContent.value;
        commentBox.hidden = true;
        target.disabled = false;
        this.unlockActions();

        localStorage.setItem(date, commentContent.value);
      }

      closeBtn.onclick = () => {
        commentBox.hidden = true;
        target.disabled = false;
        this.unlockActions();
      }

      deleteCommentBtn.onclick = () => {
        let currentYear = yearWrapper.innerHTML,
          currentMonthName = monthWrapper.innerHTML,
          date = new Date (Number(currentYear), months.indexOf(currentMonthName), target.dataset.id);

        localStorage.removeItem(date);
        target.value = '';
        commentBox.hidden = true;
        target.disabled = false;
        this.unlockActions();
      }
    }
  }

  static blockActions () {
    let clearCurrentBtn = document.getElementsByClassName('action-buttons__current-month')[0],
        clearAllBtn = document.getElementsByClassName('action-buttons__all-months')[0],
        whereToGoBtn = document.getElementsByClassName('action-buttons__whereToGo')[0];

    let calendarWrapper = document.getElementsByTagName('tbody')[0];

    whereToGoBtn.disabled = true;
    clearAllBtn.disabled = true;
    clearCurrentBtn.disabled = true;
    calendarWrapper.removeEventListener('click', this.addComment.bind(Calendar));
  }

  static unlockActions () {
    let clearCurrentBtn = document.getElementsByClassName('action-buttons__current-month')[0],
    clearAllBtn = document.getElementsByClassName('action-buttons__all-months')[0],
    whereToGoBtn = document.getElementsByClassName('action-buttons__whereToGo')[0];

    let calendarWrapper = document.getElementsByTagName('tbody')[0];

    whereToGoBtn.disabled = false;
    clearAllBtn.disabled = false;
    clearCurrentBtn.disabled = false;
    calendarWrapper.addEventListener('click', this.addComment.bind(Calendar));
  }

  static getLastDayOfMonth(year, monthNumber) {
    let date = new Date(year, monthNumber + 1, 0);
    return date.getDate();
  }

  static extraLine () {
    const months = ['Январь', 'Февраль','Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let monthWrapper = document.getElementsByClassName('month-on-page')[0],
        calendarWrapper = document.getElementsByTagName('tbody')[0],
        yearWrapper = document.getElementsByClassName('year-on-page')[0],
        currentYear = yearWrapper.innerHTML,
        currentMonthName = monthWrapper.innerHTML,
        lastDayOfCurrentMonth = this.getLastDayOfMonth(Number(currentYear), months.indexOf(currentMonthName)),
        allDaysInCalendar = document.querySelectorAll('[data-day-of-the-week] > div > span'),
        weekRows = calendarWrapper.getElementsByTagName('tr');
      
    if ((Number(allDaysInCalendar[allDaysInCalendar.length-1].innerHTML) != 0) && (Number(allDaysInCalendar[allDaysInCalendar.length-1].innerHTML) != lastDayOfCurrentMonth)) {
      let week = document.createElement('tr'),
          lastDayInCurrentCalendar = Number(allDaysInCalendar[allDaysInCalendar.length-1].innerHTML),
          secDay = lastDayInCurrentCalendar;

      calendarWrapper.appendChild(week);

      for (let j = 1; j <= 7; j++) {
        let day = document.createElement('td');

        if (secDay < lastDayOfCurrentMonth) {
          day.innerHTML = `<div>
                             <span>${secDay + 1}</span> 
                             <textarea placeholder="Запланируйте мероприятие" disabled></textarea>
                           </div>`;
          day.classList.add('extraDay');
        }

        secDay++;
        day.dataset.dayOfTheWeek = j;

        j === 7 ? day.dataset.dayOfTheWeek = 0 : '';
        
        week.dataset.dayOfTheWeek = 5;
        week.appendChild(day);
      }

    } else if ((weekRows[5]) && (Number(allDaysInCalendar[allDaysInCalendar.length-1].innerHTML) === 0) || (Number(allDaysInCalendar[allDaysInCalendar.length-1].innerHTML) === lastDayOfCurrentMonth)) {
        let lastRow = weekRows[5];

        lastRow ? lastRow.parentElement.removeChild(lastRow) : '';
    }
  }

  static async showBestPlaces (months) {
    let monthWrapper = document.getElementsByClassName('month-on-page')[0],
        currentMonthName = monthWrapper.innerHTML,
        currentMonthNumber = months.indexOf(currentMonthName),
        adviceBox = document.getElementsByClassName('advices')[0],
        adviceBoxTitle = document.createElement('p'),
        adviceBoxContent = document.createElement('div'),
        closeBtn = document.createElement('button');

    const placesToVisit = await Regions.getplacesToVisit(),
    bestPlacesToVisit = placesToVisit.filter(placeToVisit => placeToVisit.visitingSeason.find(month => {
      if (JSON.parse(month) === currentMonthNumber) {
        return placeToVisit;         
      }
    }));

    adviceBox.hidden = false;
    this.blockActions();

    adviceBoxTitle.classList.add('advices__title');
    adviceBoxTitle.innerHTML = 'Советуем посетить следующие места:';
    adviceBox.appendChild(adviceBoxTitle);
    adviceBoxContent.classList.add('advices__content');
    
    for (let i = 0; i < bestPlacesToVisit.length; i++) {
      let bestPlace = document.createElement('p');
      bestPlace.innerHTML = bestPlacesToVisit[i].title;
      adviceBoxContent.appendChild (bestPlace);
    }   
    
    adviceBox.appendChild(adviceBoxContent);
    closeBtn.classList.add('btn');
    closeBtn.innerHTML = "ОК"
    adviceBox.appendChild(closeBtn);

    closeBtn.onclick = () => {
      this.unlockActions();
      adviceBox.innerHTML = '';
      adviceBox.hidden = true;     
    }
  } 

  static fillCalendar () {
    let monthWrapper = document.getElementsByClassName('month-on-page')[0],
        yearWrapper = document.getElementsByClassName('year-on-page')[0];
 
    this.fillComments (monthWrapper, yearWrapper);
  }

  static fillComments (monthWrapper, yearWrapper) {
    const months = ['Январь', 'Февраль','Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
    let calendarWrapper = document.getElementsByTagName('tbody')[0],
    currentYear = yearWrapper.innerHTML,
    currentMonthName = monthWrapper.innerHTML;

    let currentDate = new Date (Number(currentYear), months.indexOf(currentMonthName), 1),
        firstDayOfCurrentMonth = currentDate.getDay(),
        lastDayOfCurrentMonth = this.getLastDayOfMonth(Number(currentYear), months.indexOf(currentMonthName)),
        allDaysInCalendar = document.querySelectorAll('[data-day-of-the-week]'),
        firstWeek = calendarWrapper.getElementsByTagName('tr')[0],
        daysInFirstWeek = firstWeek.querySelectorAll('td');

    for (let i = 0; i < allDaysInCalendar.length; i++) {
      allDaysInCalendar[i].innerHTML = `<div></div>`;
    }

    for (let i = 0; i < daysInFirstWeek.length; i++) {
      (daysInFirstWeek[i].dataset.firstDay) ? delete daysInFirstWeek[i].dataset.firstDay : '';

      (Number(daysInFirstWeek[i].dataset.dayOfTheWeek) === firstDayOfCurrentMonth) ? daysInFirstWeek[i].dataset.firstDay = "true" : '';   
    }

    let firstDay = document.querySelector('[data-first-Day="true"]'),
        counter = 1;
    
    for (let i = firstDay.cellIndex; i < allDaysInCalendar.length; i++) {
      if (counter <= lastDayOfCurrentMonth) {
          let date = new Date (Number(currentYear), months.indexOf(currentMonthName), counter);       
          
          allDaysInCalendar[i].innerHTML = `<div>
                                              <span>${counter}</span>
                                              <textarea placeholder="Запланируйте мероприятие" data-id = "${counter}" disabled>${localStorage.getItem(date) ? localStorage.getItem(date) : ''}</textarea>
                                            </div>`;
      } 
      counter++;
    }
  }
}

export default Calendar;