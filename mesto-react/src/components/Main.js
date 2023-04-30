import React from "react";
import edit from "../images/edit.svg";
import editAvatar from "../images/editAvatar.svg";
import pluse from "../images/pluse.svg";
import Card from "../components/Card.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function Main(props) {
  const cardList = props.cards.map((item) => (
    <Card key={item._id} card={item} onCardClick={props.onCardClick} onCardLike={props.onCardLike} onCardDelete={props.onCardDelete}></Card>
  ));
  function handleEditProfileClick() {
    props.onEditProfile();
  }
  const currentUser= React.useContext(CurrentUserContext);
  return (
    <main className="content">
      <section className="profile" aria-label="Профиль пользователя">
        <div className="profile__edit-avatar">
          <div
            className="profile__avatar"
            style={{ backgroundImage: `url(${currentUser.avatar})` }}
          ></div>
          <button
            className="profile__button-avatar button"
            type="button"
            name="editAvatar"
            onClick={props.onEditAvatar}
          >
            <img src={editAvatar} alt="редактировать" />
          </button>
        </div>
        <div className="profile__user">
          <div className="profile__name-edit">
            <h1 className="profile__name">{currentUser.name}</h1>
            <button
              className="profile__button-edit button"
              type="button"
              name="edit"
              onClick={handleEditProfileClick}
            >
              <img src={edit} alt="редактировать" />
            </button>
          </div>
          <p className="profile__info">{currentUser.about}</p>
        </div>
        <button
          className="profile__button-add button"
          name="add"
          type="button"
          onClick={props.onAddPlace}
        >
          <img className="button__add" src={pluse} alt="добавить" />
        </button>
      </section>
      <section className="gallery" aria-label="Галерея">
        <ul className="gallery__cards">
          {cardList}
        </ul>
      </section>
    </main>
  );
}

export default Main;
