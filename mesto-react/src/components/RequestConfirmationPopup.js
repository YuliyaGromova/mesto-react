import React from "react";
import PopupWithForm from "./PopupWithForm";

function RequestConfirmationPopup(props) {
  function handleSubmit(e) {
    e.preventDefault();

    props.onUpdateCardDelete(props.card)
  }
    return(
        <PopupWithForm
        title="Вы уверены?"
        name="popupDeleteCard"
        nameButton="Да"
        isOpen={props.isOpen}
        onClose={props.onClose}
        onSubmit={handleSubmit}
      >
      </PopupWithForm>
    )
}

export default RequestConfirmationPopup;