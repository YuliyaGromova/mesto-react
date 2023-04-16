import React from "react";
import Header from "./components/Header.js";
import Main from "./components/Main.js";
import Footer from "./components/Footer.js";
import PopupWithForm from "./components/PopupWithForm.js";
import ImagePopup from "./components/ImagePopup.js";
import api from "./utils/Api.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState('');
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
        const userId = data[0]._id;
        setUserName(data[0].name);
        setUserDescription(data[0].about);
        setUserAvatar(data[0].avatar);
        data[1].reverse();
        setCards(data[1]);
      })
      .catch((err) => {
        //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
        disabledAll();
      });
  }, []);

  function disabledAll() {
    document.querySelector(".content").classList.add("content_disabled");
    document.querySelector(".error").classList.add("error_active");
  }

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
    setSelectedCard('');
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
      <section className="error">
        <h2 className="error__message">
          По техническим причинам страница недоступна. Попробуйте позднее...
        </h2>
      </section>
      <Footer />
      {/* редактировать профиль */}
      <PopupWithForm
        title="Редактировать профиль"
        name="popupEdit"
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
        <button className="popup__submit" type="submit" name="saveEdit">
          Сохранить
        </button>
      </PopupWithForm>
      {/* новое место */}
      <PopupWithForm
        title="Новое место"
        name="popupAdd"
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
        <button className="popup__submit" type="submit" name="saveAdd">
          Создать
        </button>
      </PopupWithForm>
      {/* Обновить аватар */}
      <PopupWithForm
        title="Обновить аватар"
        name="popupEditAvatar"
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
        <button className="popup__submit" type="submit" name="saveEdit">
          Сохранить
        </button>
      </PopupWithForm>
      {/*Вы уверены? */}
      <PopupWithForm
        title="Вы уверены?"
        name="popupDeleteCard"
        onClose={closeAllPopups}
      >
        <button className="popup__submit" type="submit" name="saveEdit">
          Да
        </button>
      </PopupWithForm>
      {/* большая картинка */}
      <ImagePopup isClose={closeAllPopups} card={selectedCard}></ImagePopup>
    </div>
  );
}

export default App;
