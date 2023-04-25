import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  //const [userName, setUserName] = React.useState("");
  //const [userDescription, setUserDescription] = React.useState("");
  //const [userAvatar, setUserAvatar] = React.useState("");
  const [cards, setCards] = React.useState([]);
  const [currentUser, setCurrentUser] = React.useState({});

  React.useEffect(() => {
    Promise.all([
      //в Promise.all передаем массив промисов которые нужно выполнить
      api.getUserInfo(),
      api.getInitialCards(),
    ])
      .then(([dataUserInfo, dataCards]) => {
        setCurrentUser(dataUserInfo);
        //setUserName(dataUserInfo.name);
        //setUserDescription(dataUserInfo.about);
        //setUserAvatar(dataUserInfo.avatar);
        dataCards.reverse();
        setCards(dataCards);
      })
      .catch((err) => {
        //попадаем сюда если один из промисов завершаться ошибкой
        console.log(err);
      });
  }, []);
  //console.log(currentUser);

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

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card) {
    api.deleteCardApi(card._id)
    //доптсать
  }

  function handleUpdateUser(data) {
    api.editUserInfo(data);
    closeAllPopups();
  }
  
  return (
    <div className="page">
      <Header />
      <CurrentUserContext.Provider value={currentUser}>
      <Main
        cards={cards}
        // userName={userName}
        // userAvatar={userAvatar}
        // userDescription={userDescription}
        onEditAvatar={handleEditAvatarClick}
        onEditProfile={handleEditProfileClick}
        onAddPlace={handleAddPlaceClick}
        onCardClick={handleCardClick}
        onCardLike={handleCardLike}
        onCardDelete={handleCardDelete}
      />
      </CurrentUserContext.Provider>
      <Footer />
      {/* редактировать профиль */}
      <CurrentUserContext.Provider value={currentUser}>
        <EditProfilePopup isOpen={isEditProfilePopupOpen} onClose={closeAllPopups} onUpdateUser={handleUpdateUser} />
      </CurrentUserContext.Provider>
      
      
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
