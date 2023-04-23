
function PopupWithForm ({isOpen, onClose, name, title, button, children}){

  return (

  <section className= {!isOpen ? ("popup") : ("popup popup_active")}  id={`popup_${name}`} ariaLabel="карточка редактирования профиля">
    
    <div className="popup__eddit-form">
      <button className="popup__close-button animation-hover" onClick={onClose} id={`popup_${name}-close`} type="button" ariaLabel="кнопка закрыть попап"></button>
      <h2 className="popup__title">{title}</h2>
      <form className="popup__form" id={`popup_form-${name}`} name={`popup_${name}`} >

        {children}

        <button className="popup__button hover-batton" id="popup_button-profile" type="submit"> {button}</button>
      </form>
    </div>

  </section>

  );
}

export default PopupWithForm ;
