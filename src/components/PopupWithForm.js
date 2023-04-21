import PopupForm from './PopupForm';

function PopupWithForm (props){

  return (
  <>
    <PopupForm id='1' name='profile'  title='Редактировать профиль' isOpen = {props.popapProfile} onClose = {props.onClose} />
    <PopupForm id='2' name='mesto' title='Новое место' isOpen = {props.popapPlace} onClose = {props.onClose} />
    <PopupForm id='3' name='avatar' title='Обновить аватар' isOpen = {props.popapAvatar} onClose = {props.onClose} />
    
  </>

  );
}

export default PopupWithForm ;