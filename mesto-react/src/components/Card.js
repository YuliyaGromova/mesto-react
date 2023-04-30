import React from "react";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Card(props) {
  const card = props.card;
  function handleClick() {
    props.onCardClick(card);
  }
  function handleCardLike() {
    props.onCardLike(card);
  }
  function handleDeleteCardClick() {
    props.onCardDelete(props.card)
  }

  const context= React.useContext(CurrentUserContext);
  const isOwn = card.owner._id === context._id;
  const isLiked = card.likes.some(i => i._id === context._id);

  return (
    <li className="gallery__card">
      {isOwn && <button className="gallery__delete button" onClick={handleDeleteCardClick}/>}
      <div
        className="gallery__photo"
        style={{ backgroundImage: `url(${card.link})` }}
        onClick={handleClick}
      ></div>
      <div className="gallery__info">
        <h2 className="gallery__name-place">{card.name}</h2>
        <div>
          <button className={isLiked ? 'gallery__like like like_active': 'gallery__like like'} onClick={handleCardLike}></button>
          <p className="gallery__like-counter">{card.likes.length}</p>
        </div>
      </div>
    </li>
  );
}

export default Card;
