import React from "react";
import Header from "./Header.js";
import Main from "./Main.js";
import Footer from "./Footer.js";
import PopupWithForm from "./PopupWithForm.js";
import EditProfilePopup from "./EditProfilePopup.js";
import EditAvatarPopup from "./EditAvatarPopup.js";
import AddPlacePopup from "./AddPlacePopup.js";
import ImagePopup from "./ImagePopup.js";
import api from "../utils/Api.js";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";


function App() {
  const [isEditProfilePopupOpen, setEditProfilePopupOpen] =
    React.useState(false);
  const [isAddPlacePopupOpen, setAddPlacePopupOpen] = React.useState(false);
  const [isEditAvatarPopupOpen, setEditAvatarPopupOpen] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState(null);
  
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
        //dataCards.reverse();
        setCards(dataCards);
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

  function handleCardLike(card) {
    const isLiked = card.likes.some(i => i._id === currentUser._id);
    
    // Отправляем запрос в API и получаем обновлённые данные карточки
    api.changeLikeCardStatus(card._id, !isLiked).then((newCard) => {
        setCards((state) => state.map((c) => c._id === card._id ? newCard : c));
    });
  }

  function handleCardDelete(card) {
    api.deleteCardApi(card._id)
    .then(()=>{
      setCards((state) => state.filter((c) => c._id !== card._id))
    })
    .catch((err) => {
      console.log(err);
    }
    )
  }

  function handleUpdateUser(data) {
    api.editUserInfo(data)
    .then((res) => {
      setCurrentUser(res);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    }
    )
    
  }

  function handleUpdateAvatar(data) {
    api.editAvatar(data)
    .then((res)=> {
      setCurrentUser(res);
      closeAllPopups();

    })
    .catch((err) => {
      console.log(err);
    }
    )
  }

  function handleUpdateCards(data) {
    api.addNewCard(data)
    .then((newCard)=>{
      setCards([newCard, ...cards]);
      closeAllPopups();
    })
    .catch((err) => {
      console.log(err);
    }
    )
  }
  
  return (
    <div className="page">
      <Header />
      <CurrentUserContext.Provider value={currentUser}>
      <Main
        cards={cards}
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
      
      {/* новое место */}
      
        <AddPlacePopup isOpen={isAddPlacePopupOpen} onClose={closeAllPopups} onAddPlace={handleUpdateCards} />
      
      {/* Обновить аватар */}
      
        <EditAvatarPopup isOpen={isEditAvatarPopupOpen} onClose={closeAllPopups} onUpdateAvatar={handleUpdateAvatar}/>
      </CurrentUserContext.Provider>
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
