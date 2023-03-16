import Component from '../../component.js';
import Regions from '../../../models/regions.js';

class Actions extends Component {
  static setActions() {
    const region = document.getElementsByClassName('region')[0];    
    region.onclick = this.showInfo;
    region.addEventListener('click', this.hideInfo);

    let like = document.getElementsByClassName('like')[0];
    like.addEventListener('click', this.addToFavorite);
  }

  static showInfo = async(event) => {
    if (event.target.classList.contains('locationIcon')) {
      const target = event.target,
      targetId = target.dataset.id;

      let locationDescription = document.getElementsByClassName('description')[0];
      let like = locationDescription.getElementsByClassName('like')[0];
    
      locationDescription.classList.remove('inactive');
      locationDescription.classList.add('active');

      const locationData = await Regions.getData();
      const location = locationData.find(location => location.id === targetId);

      like.classList.add('heart');
      like.dataset.id = location.id;
 
      this.setImg (location, locationDescription);
      this.setTitle (location, locationDescription);      
      this.setDescription (location, locationDescription)
      this.setFactsInfo (location, locationDescription);
      this.setActivitiesInfo (location, locationDescription);  
      this.checkFavorite (location, like);
      this.setRoute (location, locationDescription);   
    }
  }

  static addToFavorite () {
    let like = document.getElementsByClassName('like')[0];
    if (!like.classList.contains('red_heart')) {
      like.classList.add('red_heart');
      localStorage.setItem(`like_${like.dataset.id}`, like.dataset.id);
    } else {
      like.classList.remove('red_heart');
      localStorage.removeItem(`like_${like.dataset.id}`);
    }
  }

  static checkFavorite (location, like) {
    localStorage.getItem(`like_${location.id}`) ? like.classList.add('red_heart') : like.classList.remove('red_heart');
  }

  static setImg (location, locationDescription) {
    let imgBox = locationDescription.getElementsByClassName('imgBox')[0];
    imgBox.src = `./img/aside_pictures/${location.id}.jpg`;
  }

  static setTitle (location, locationDescription) {
    let title = locationDescription.getElementsByClassName('title')[0];
    title.innerHTML = location.title;
  }

  static setDescription (location, locationDescription) {
    let description = locationDescription.getElementsByClassName('location-description')[0];
    description.innerHTML = location.description;
  }

  static setFactsInfo (location, locationDescription) {
    let facts = locationDescription.getElementsByClassName('facts')[0];
    let factsArr = location.facts;
    facts.innerHTML = `Главные факты: \n`;

    if (factsArr != undefined) {
      for (let i = 0; i < factsArr.length; i++) {
        let facts = document.getElementsByClassName('facts')[0];  
          facts.innerHTML+=`<li>${factsArr[i]}</li>`; 
      }
    } else {
      facts.innerHTML = '';
    }
  }

  static setActivitiesInfo (location, locationDescription) {
    let activitiesArr = location.activities,
    activities = locationDescription.getElementsByClassName('activities')[0];

    activities.innerHTML = `Активности: \n`;

    for (let i = 0; i < activitiesArr.length; i++) {
      let activities = document.getElementsByClassName('activities')[0];
      activities.innerHTML+=`<li>${activitiesArr[i]}</li>`;
    }
  }

  static setRoute (location, locationDescription) {
    let route = locationDescription.getElementsByClassName('route')[0];
    route.href = location.yandexLocation;
    route.innerHTML = 'Построить маршрут на Яндекс-карте';
  }

  static hideInfo (event) {
    let locationDescription = document.getElementsByClassName('description')[0];

    if (!event.target.classList.contains('locationIcon') && !event.target.classList.contains('like')) {
      locationDescription.classList.add('inactive');

      setTimeout (() => {
        for (let el of locationDescription.children) {           
          if(el.tagName === 'IMG') {
            el.src = '';
          } else if (el.classList.contains('header')) {
              el.firstElementChild.innerHTML = '';
              el.lastElementChild.classList.remove('heart');
              el.lastElementChild.classList.remove('red_heart');
          } else {
            el.innerHTML = '';
          }   
        }
      }, 1000) 
    }    
  }
}

export default Actions;