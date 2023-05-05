import {useState, useEffect} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup  from './ImagePopup';
import PopupWithForm  from './PopupWithForm';
import EditProfilePopup  from './EditProfilePopup';
import Api from '../utils/Api';

// Импортируем объект контекста
import CurrentUserContext from './../contexts/CurrentUserContext';


function App() {

  // открытие попапа
  const [isEditProfilePopupOpen, setleEditProfileClick] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarClick] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = useState(false);
  const [selectedCard, setSelectedCard] = useState([]);
  const [cards, setCards] = useState([]); //карточки места
  const [currentUser , setCurrentUser ] = useState({}); // текущий пользователя

  function handleEditProfileClick(){
    setleEditProfileClick(true);
  }

  function handleEditAvatarClick(){
    setEditAvatarClick(true);
  }

  function handleAddPlaceClick(){
    setAddPlaceClick(true);
  }

  function handleCardClick (selectedCard){
    setSelectedCard(selectedCard);
  }

  // закрытие попапов
  function closeAllPopups(){
    setleEditProfileClick(false);
    setEditAvatarClick(false);
    setAddPlaceClick(false);
    setSelectedCard([]);
  }

  // запрос пользователя с сервера
  useEffect(()=>{
    Api.getInfoUserForServer()
      .then((res) => {
        setCurrentUser(res);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  // запрос карточек с сервера
  useEffect(()=>{
    Api.getCardsForServer()
      .then((res) => {
        setCards(res);
      })
      .catch(err => {
        console.log(err);
      })
  }, []);

  // поставить, убрать лайк
  function handleCardLike(card) {

    // Снова проверяем, есть ли уже лайк на этой карточке
    const isLiked = card.likes.some(i => i._id === currentUser._id);

    if (!isLiked) {
      Api.putLikeForServer(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.error(err);
      });  
    } else {
      Api.deleteLikeForServer(card._id)
      .then((newCard) => {
        setCards((state) => state.map((c) => (c._id === card._id ? newCard : c)));
      })
      .catch((err) => {
        console.error(err);
      });  
    }
  }

  // удалить карточку
  function handleCardDelete(card) {

    Api.deleteCardForServer(card._id)
    .then(() => {
      setCards((state) => state.filter((item) => (item._id !== card._id && item)));
    })
    .catch((err) => {
      console.error(err);
    });  
  }

  // обновить данные о пользователе
  function handleUpdateUser(date) {

    //console.log(date);
    Api.patchInfoUserForServer(date)
    .then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }
  
  return (

    <CurrentUserContext.Provider value={currentUser}>
          
      <Header />
      
      <Main 
        onEditProfile = {() => handleEditProfileClick()}
        onEditAvatar = {() => handleEditAvatarClick()} 
        onAddPlace = {() => handleAddPlaceClick()}  
        onCardClick = {handleCardClick}
        onCardLike = {handleCardLike}
        onCardDelete = {handleCardDelete}
        cards = {cards}
      />

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser ={handleUpdateUser}/>

      <PopupWithForm onClose = {() => closeAllPopups()} name='mesto' title='Новое место' isOpen = {isAddPlacePopupOpen} button = 'Сохранить'>
          <input className="popup__input" id="popup__name-place" type="text" name="popup_name" minLength={2} maxLength={30} required placeholder="Название"/>
          <span className="popup__input-error" id="popup__name-place-error"></span>
          <input className="popup__input" id="popup__link-place" type="url" name="popup_link" required  placeholder="Ссылка на картинку"/>
          <span className="popup__input-error" id="popup__link-place-error"></span>
      </PopupWithForm>

      <PopupWithForm onClose = {() => closeAllPopups()} name='avatar' title='Обновить аватар' isOpen = {isEditAvatarPopupOpen} button = 'Сохранить'>
        <input className="popup__input" id="popup__link-avatar" type="url" name="popup_link" required  placeholder="Ссылка на картинку"/>
        <span className="popup__input-error" id="popup__link-avatar-error"></span>
      </PopupWithForm>

      <ImagePopup card = {selectedCard} onClose = {() => closeAllPopups()}/> 
      
      <Footer />  

    </CurrentUserContext.Provider>
  );
}

export default App;
