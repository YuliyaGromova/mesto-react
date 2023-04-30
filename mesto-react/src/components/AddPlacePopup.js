import React from "react";
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup(props) {
    const nameRef = React.useRef();
    const linkRef = React.useRef();
    function handleSubmit(e) {
        // Запрещаем браузеру переходить по адресу формы
        e.preventDefault();
    
        // Передаём значения управляемых компонентов во внешний обработчик
        props.onAddPlace({
            name: nameRef.current.value,
            link: linkRef.current.value
        });
        nameRef.current.value="";
        linkRef.current.value=""
      }


    return (
        <PopupWithForm
        title="Новое место"
        name="popupAdd"
        nameButton='Создать'
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
        <input
          className="popup__item popup__item_el_name"
          ref={nameRef}
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
          ref={linkRef}
          type="url"
          placeholder="Ссылка на картинку"
          id="link"
          name="link"
          required
        />
        <span className="link-error popup__item-error"></span>
      </PopupWithForm>
      );
    }
    
    export default AddPlacePopup;