import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  const [userName, setUserName] = React.useState("");
  const [userDescription, setUserDescription] = React.useState("");
  const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    Promise.all([
      //в Promise.all передаем массив промисов которые нужно выполнить
      api.getUserInfo(),
      api.getInitialCards(),
    ])
      .then((data) => {
        setUserName(data[0].name);
        setUserDescription(data[0].about);
        setUserAvatar(data[0].avatar);
        data[1].reverse();
        setCards(data[1]);
      })
      .catch((err) => {
        //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
      });
  }, []);


  function handleCardClick(card) {
    setSelectedCard(card);
  }

  function handleEditAvatarClick() {
    setEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setAddPlacePopupOpen(true);
  }

  function closeAllPopups() {
    setAddPlacePopupOpen(false);
    setEditAvatarPopupOpen(false);
    setEditProfilePopupOpen(false);
    setSelectedCard(null);
  }
  return (
    <div className="page">
      <Header />
      <Main
        cards={cards}
        userName={userName}
        userAvatar={userAvatar}
        userDescription={userDescription}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
      />
      <Footer />
      {/* редактировать профиль */}
      <PopupWithForm
        title="Редактировать профиль"
        name="popupEdit"
        nameButton='Сохранить'
        isOpen={isEditProfilePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__item popup__item_el_name"
          type="text"
          placeholder="Ваше имя"
          id="name-profile"
          name="name"
          minLength="2"
          maxLength="40"
          required
        />
        <span className="name-profile-error popup__item-error"></span>
        <input
          className="popup__item popup__item_el_info"
          type="text"
          placeholder="О себе"
          id="info-profile"
          name="about"
          minLength="2"
          maxLength="200"
          required
        />
        <span className="info-profile-error popup__item-error"></span>
        
      </PopupWithForm>
      {/* новое место */}
      <PopupWithForm
        title="Новое место"
        name="popupAdd"
        nameButton='Создать'
        isOpen={isAddPlacePopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__item popup__item_el_name"
          type="text"
          placeholder="Название"
          id="name-place"
          name="name"
          minLength="2"
          maxLength="30"
          required
        />
        <span className="name-place-error popup__item-error"></span>
        <input
          className="popup__item popup__item_el_info"
          type="url"
          placeholder="Ссылка на картинку"
          id="link"
          name="link"
          required
        />
        <span className="link-error popup__item-error"></span>
      </PopupWithForm>
      {/* Обновить аватар */}
      <PopupWithForm
        title="Обновить аватар"
        name="popupEditAvatar"
        nameButton='Сохранить'
        isOpen={isEditAvatarPopupOpen}
        onClose={closeAllPopups}
      >
        <input
          className="popup__item popup__item_el_info"
          type="url"
          placeholder="Ссылка на Вашу фотографию"
          id="avatar"
          name="avatar"
          required
        />
        <span className="avatar-error popup__item-error"></span>
      </PopupWithForm>
      {/*Вы уверены? */}
      <PopupWithForm
        title="Вы уверены?"
        name="popupDeleteCard"
        nameButton="Да"
        onClose={closeAllPopups}
      >
      </PopupWithForm>
      {/* большая картинка */}
      {
      (selectedCard) && <ImagePopup isClose={closeAllPopups} card={selectedCard}></ImagePopup>
      }
      
    </div>
  );
}

export default App;
