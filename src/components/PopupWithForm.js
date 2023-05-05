
function PopupWithForm ({isOpen, onClose, name, title, button, children, onSubmit}){

  return (

  <section className= {!isOpen ? ("popup") : ("popup popup_active")}  id={`popup_${name}`} aria-label="карточка редактирования профиля">
    
    <div className="popup__eddit-form">
      <button className="popup__close-button animation-hover" onClick={onClose} id={`popup_${name}-close`} type="button" aria-label="кнопка закрыть попап"></button>
      <h2 className="popup__title">{title}</h2>
      <form className="popup__form" id={`popup_form-${name}`} name={`popup_${name}`} onSubmit={onSubmit}>

        {children}

        <button className="popup__button hover-batton" id="popup_button-profile" type="submit"> {button}</button>
      </form>
    </div>

  </section>

  );
}

export default PopupWithForm ;
