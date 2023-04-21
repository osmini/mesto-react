import {useState} from 'react';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

function App() {

  // открытие попапа
  const [isEditProfilePopupOpen, setleEditProfileClick] = useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarClick] = useState(false);
  const [isAddPlacePopupOpen, setAddPlaceClick] = useState(false);
  const [selectedCard, setSelectedCard] = useState([]);

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
  //****************/

  // закрытие попапа
  function closeAllPopups(){
    setleEditProfileClick(false);
    setEditAvatarClick(false);
    setAddPlaceClick(false);
    setSelectedCard([]);
  }

  return (

  <>
        
    <Header />
    <Main 
      onEditProfile = {() => handleEditProfileClick()}
      onEditAvatar = {() => handleEditAvatarClick()} 
      onAddPlace = {() => handleAddPlaceClick()}  
      onCardClick = {handleCardClick}
      popapProfile = {isEditProfilePopupOpen}
      popapAvatar = {isEditAvatarPopupOpen}
      popapPlace = {isAddPlacePopupOpen}
      card = {selectedCard}
      onClose = {() => closeAllPopups()}
    />
    <Footer />
        
  </>
  );
}

export default App;
