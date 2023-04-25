import {useEffect, useState} from 'react';
import Card  from './Card';
import Api from '../utils/Api';

function Main({onEditAvatar, onEditProfile, onAddPlace, onCardClick }){


  const [profile, setProfile] = useState({});  //информация о пользователи
  const [cards, setCards] = useState([]); //карточки места

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
  }, []);

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


  return (

    <main id="main">
  
      <section className="profile">
  
        <button className="profile__avatar-button" onClick={onEditAvatar} type="button" ariaLabel="кнопка изменение аватара профиля" >
          <img className="profile__avatar" src={profile.userAvatar} alt="Аватар автора"/>
        </button>
  
        <div className="profile-info">
          <h1 className="profile-info__title">{profile.userName}</h1>
          <button className="profile-info__button-edit animation-hover" onClick={onEditProfile} type="button" ariaLabel="кнопка изменение информации профиля" ></button>
          <p className="profile-info__subtitle">{profile.userDescription}</p>
        </div>
    
        <button className="profile__button-add animation-hover" onClick={onAddPlace} type="button" ariaLabel="кнопка добавления места"></button>
      </section>
    
      <section className="plases" ariaLabel="Карточки мест">
        
        {cards.map((card) =>
          <Card 
            key = {card.id}
            card={card} 
            onCardClick = {onCardClick}
            />
        )}
        
      </section>

    </main>
  );
}

export default Main;