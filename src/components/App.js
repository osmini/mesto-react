import {useState} from 'react';
import '../index.css';
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
    setleEditProfileClick(!isEditProfilePopupOpen);
  }

  function handleEditAvatarClick(){
    setEditAvatarClick(!isEditAvatarPopupOpen);
  }

  function handleAddPlaceClick(){
    setAddPlaceClick(!isAddPlacePopupOpen);
  }

  function handleCardClick (selectedCard){
    setSelectedCard(selectedCard);
  }
  //****************/

  // закрытие попапа
  function closeAllPopups(){

    if(isEditProfilePopupOpen) {
      setleEditProfileClick(!isEditProfilePopupOpen);
    }
    if(isEditAvatarPopupOpen){ 
      setEditAvatarClick(!isEditAvatarPopupOpen);
    }
    if(isAddPlacePopupOpen){
      setAddPlaceClick(!isAddPlacePopupOpen);
    }
    setSelectedCard([]);
  }

  return (
    <html lang="ru">

      <body className="body">
        
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
        
        <script type="module" src="./pages/index.js"></script>
        
      </body>
    </html>
  );
}

export default App;
