

function PopupForm(props){
  return (
    
    <section className= {!props.isOpen ? ("popup") : ("popup popup_active")}  id={`popup_${props.name}`} aria-label="карточка редактирования профиля">
  
      <div className="popup__eddit-form">
        <button className="popup__close-button animation-hover" onClick={props.onClose} id={`popup_${props.name}-close`} type="button" aria-label="кнопка закрыть попап"></button>
        <h2 className="popup__title">{props.title}</h2>
        <form className="popup__form" id={`popup_form-${props.name}`} name={`popup_${props.name}`} novalidate >

            {props.id < 3 && 
            <>
              <input className="popup__input" id={`popup_name-${props.name}`} type="text" value="" name="popup_name" minlength={2} maxlength={40} required placeholder=""/>
              <span className="popup__input-error" id={`popup_name-${props.name}-error`}></span>
              <input className="popup__input" id={`popup_work-${props.name}`} type="text" value="" minlength={2} maxlength={200} name="popup_work" required placeholder=""/>
              <span className="popup__input-error" id={`popup_work-${props.name}-error`} ></span>
              <button className="popup__button hover-batton" id={`popup_button-${props.name}`} type="submit">Сохранить</button>
            </>}
            {props.id == 3 && 
            <>
              <input className="popup__input" id={`popup__link-${props.name}`} type="url" name="popup_link" required  placeholder="Ссылка на картинку"/>
              <span className="popup__input-error" id={`popup__link-${props.name}-error`}></span>
              <button className="popup__button hover-batton" id={`popup_button-${props.name}`} type="submit">Сохранить</button>
            </>}
            {props.id == 4 &&       
              <button className="popup__button hover-batton" id={`popup_button-${props.name}`} type="submit">Да</button>
            }
          
        </form>
      </div>

    </section>
  );
}

export default PopupForm;
