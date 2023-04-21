import {useEffect, useState} from 'react';
import PopupWithForm  from './PopupWithForm';
import ImagePopup  from './ImagePopup';
import Card  from './Card';
import Api from '../utils/Api';

function Main(props){

  //информация о пользователи
  const [profile, setProfile] = useState([]);

  useEffect(()=>{
    Api.getInfoUserForServer()
      .then((res) => {
        const resultProfile = {
          userName: res.name,
          userDescription: res.about,
          userAvatar: res.avatar
        };
        setProfile(resultProfile);
      })
      .catch(err => {
        console.log(err);
      })
  }, [profile.userAvatar, profile.userName, profile.userDescription]);
  //********************/

  //карточки места
  const [cards, setCards] = useState([]);

  useEffect(()=>{
    Api.getCardsForServer()
      .then((res) => {
        const resultCards = res.map((item) =>({
          likes: item.likes.length,
          name: item.name,
          link: item.link,
          id: item._id
        }));
        setCards(resultCards);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);
  //********************/

  return (

    <main id="main">
   
      <section className="profile">
  
        <button className="profile__avatar-button" onClick={props.onEditAvatar} type="button" aria-label="кнопка изменение аватара профиля" >
          <img className="profile__avatar" src={profile.userAvatar} alt="Аватар автора"/>
        </button>
  
        <div className="profile-info">
          <h1 className="profile-info__title">{profile.userName}</h1>
          <button className="profile-info__button-edit animation-hover" onClick={props.onEditProfile} type="button" aria-label="кнопка изменение информации профиля" ></button>
          <p className="profile-info__subtitle">{profile.userDescription}</p>
        </div>
    
        <button className="profile__button-add animation-hover" onClick={props.onAddPlace} type="button" aria-label="кнопка добавления места"></button>
      </section>
    
      <section className="plases" aria-label="Карточки мест">
        
        {cards.map((card) =>
          <Card 
            card={card} 
            onCardClick = {props.onCardClick}
            />
        )}
        
      </section>

      <PopupWithForm onClose = {props.onClose} name='profile'  title='Редактировать профиль' isOpen = {props.popapProfile}>
        <input className="popup__input" id="popup_name-profile" type="text" value="Жак-Ив Кусто" name="popup_name" minlength={2} maxlength={40} required placeholder=""/>
        <span className="popup__input-error" id="popup_name-profile-error"></span>
        <input className="popup__input" id="popup_work-profile" type="text" value="Исследователь океана" minlength={2} maxlength={200} name="popup_work" required placeholder=""/>
        <span className="popup__input-error" id="popup_work-profile-error"></span>
        <button className="popup__button hover-batton" id="popup_button-profile" type="submit">Сохранить</button>
      </PopupWithForm>

      <PopupWithForm onClose = {props.onClose} name='mesto' title='Новое место' isOpen = {props.popapPlace}>
        <input className="popup__input" id="popup__name-place" type="text" name="popup_name" minlength={2} maxlength={30} required placeholder="Название"/>
        <span className="popup__input-error" id="popup__name-place-error"></span>
        <input className="popup__input" id="popup__link-place" type="url" name="popup_link" required  placeholder="Ссылка на картинку"/>
        <span className="popup__input-error" id="popup__link-place-error"></span>
        <button className="popup__button hover-batton" id="popup_button-place" type="submit">Сохранить</button>
      </PopupWithForm>

      <PopupWithForm onClose = {props.onClose} name='avatar' title='Обновить аватар' isOpen = {props.popapAvatar}>
        <input className="popup__input" id="popup__link-avatar" type="url" name="popup_link" required  placeholder="Ссылка на картинку"/>
        <span className="popup__input-error" id="popup__link-avatar-error"></span>
        <button className="popup__button hover-batton" id="popup_button-avatar" type="submit">Сохранить</button>
      </PopupWithForm>

      <ImagePopup card = {props.card} onClose = {props.onClose}/>

    </main>
  );
}

export default Main;