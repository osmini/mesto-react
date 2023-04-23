function ImagePopup(props){
  return (

    <section className= {!props.card.link ? ("popup") : ("popup popup_active")} id="popup_img" ariaLabel="карточка просмотра фотографии">
      <figure className="popup__figure">
        <button className="popup__close-button popup__close-button_rigth animation-hover" onClick={props.onClose} id="popup_img-close" type="button" ariaLabel="кнопка закрыть попап"></button>
        <img className="popup__image" src={props.card.link} alt={props.card.name}/>
        <figcaption className="popup__caption"> {props.card.name} </figcaption>
      </figure>
    </section>
  );
}

export default ImagePopup;