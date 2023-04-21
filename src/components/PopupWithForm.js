
function PopupWithForm (props){

  return (

  <section className= {!props.isOpen ? ("popup") : ("popup popup_active")}  id={`popup_${props.name}`} aria-label="карточка редактирования профиля">
    
    <div className="popup__eddit-form">
      <button className="popup__close-button animation-hover" onClick={props.onClose} id={`popup_${props.name}-close`} type="button" aria-label="кнопка закрыть попап"></button>
      <h2 className="popup__title">{props.title}</h2>
      <form className="popup__form" id={`popup_form-${props.name}`} name={`popup_${props.name}`} novalidate >

        {props.children}

      </form>
    </div>

  </section>

  );
}

export default PopupWithForm ;
