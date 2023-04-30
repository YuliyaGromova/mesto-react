import React from "react";
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup(props) {
  const avatarRef = React.useRef();

  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateAvatar({
      avatar: avatarRef.current.value,
    });
    avatarRef.current.value = "";
  }

  return (
    <PopupWithForm
      title="Обновить аватар"
      name="popupEditAvatar"
      nameButton="Сохранить"
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
    >
      <input
        className="popup__item popup__item_el_info"
        ref={avatarRef}
        type="url"
        placeholder="Ссылка на Вашу фотографию"
        id="avatar"
        name="avatar"
        required
      />
      <span className="avatar-error popup__item-error"></span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;
