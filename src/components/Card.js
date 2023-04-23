
// компонент принимат props
function Card(props){

  // функция которая выполняется в компоненте
  function handleClick() {
    props.onCardClick(props.card);
  }  

  // возвращаем разметку jsx 
  return (
    <article key={props.card.id} className="plases-card" ariaLabel="места России">
      <img className="plases-card__img" onClick={handleClick} src={props.card.link} alt={props.card.name}/>
      <button className="plases-card__del animation-hover " type="button" ariaLabel="кнопка удалить"></button>
      <div className="plases-card__card-title">
        <h2 className="plases-card__title">{props.card.name}</h2>
        <div className="plases-card__like">
          <button className="plases-card__like-button hover-like" type="button" ariaLabel="кнопка лайк"></button>
          <div className="plases-card__like-count">{props.card.likes}</div>
        </div>
      </div>
    </article>
  );
}

export default Card;