function Card(props) {
  const card = props.card;
  function handleClick() {
    props.onCardClick(card);
  }
  return (
    <li className="gallery__card">
      <button className="gallery__delete button"></button>
      <div
        className="gallery__photo"
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleClick}
      ></div>
      <div className="gallery__info">
        <h2 className="gallery__name-place">{card.name}</h2>
        <div>
          <button className="gallery__like like"></button>
          <p className="gallery__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
