import {useState, useEffect} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup  from './ImagePopup';
import EditProfilePopup  from './EditProfilePopup';
import EditAvatarPopup  from './EditAvatarPopup';
import AddPlacePopup   from './AddPlacePopup ';
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

  // добавить карточку
  function handleAddPlaceSubmit(card) {

    Api.postCardsForServer(card)
    .then((newCard) => {
      setCards([newCard, ...cards]); 
      closeAllPopups();
    })
    .catch((err) => {
      console.error(err);
    });  
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

    Api.patchInfoUserForServer(date)
    .then((user) => {
      setCurrentUser(user);
      closeAllPopups();
    }).catch((err) => {
      console.error(err);
    });
  }

  // изменить аватар
  function handleUpdateAvatar(date){

    Api.patchAvatarForServer(date)
    .then((avatar) => {
      setCurrentUser(avatar);
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

      <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar} />
      <AddPlacePopup  isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleAddPlaceSubmit} />
      <ImagePopup card = {selectedCard} onClose = {() => closeAllPopups()}/> 
      
      <Footer />  

    </CurrentUserContext.Provider>
  );
}

export default App;
