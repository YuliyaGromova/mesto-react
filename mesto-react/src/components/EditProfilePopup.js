import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext.js";

function EditProfilePopup(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  function handleSubmit(e) {
    // Запрещаем браузеру переходить по адресу формы
    e.preventDefault();

    // Передаём значения управляемых компонентов во внешний обработчик
    props.onUpdateUser({
      name,
      about: description,
    });
  }

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser]);

  function handleChangeName(e) {
    setName(e.target.value);
    //
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value);
  }

  return (
    <PopupWithForm
      title="Редактировать профиль"
      name="popupEdit"
      nameButton="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__item popup__item_el_name"
        value={name}
        onChange={handleChangeName}
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
        value={description}
        onChange={handleChangeDescription}
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
  );
}

export default EditProfilePopup;
