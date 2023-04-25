import {useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';
import ImagePopup  from './ImagePopup';
import PopupWithForm  from './PopupWithForm';

function App() {

  // открытие попапа
  const [isEditProfilePopupOpen, setleEditProfileClick] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarClick] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = useState(false);
  const [selectedCard, setSelectedCard] = useState({});

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
    setSelectedCard({});
  }

  return (

  <>
        
    <Header />
    
    <Main 
      onEditProfile = {() => handleEditProfileClick()}
      onEditAvatar = {() => handleEditAvatarClick()} 
      onAddPlace = {() => handleAddPlaceClick()}  
      onCardClick = {handleCardClick}
      card = {selectedCard}
    />
    
    <Footer />

    <PopupWithForm 
      onClose = {() => closeAllPopups()} 
      name='profile'  
      title='Редактировать профиль' 
      isOpen = {isEditProfilePopupOpen} 
      button = 'Сохранить'>
        <input className="popup__input" id="popup_name-profile" type="text" value="Жак-Ив Кусто" name="popup_name" minLength={2} maxLength={40} required placeholder=""/>
        <span className="popup__input-error" id="popup_name-profile-error"></span>
        <input className="popup__input" id="popup_work-profile" type="text" value="Исследователь океана" minLength={2} maxLength={200} name="popup_work" required placeholder=""/>
        <span className="popup__input-error" id="popup_work-profile-error"></span>
    </PopupWithForm>

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


  </>
  );
}

export default App;
