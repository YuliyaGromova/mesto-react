import close from "../images/close.svg";

function PopupWithForm(props) {
  return (
    <section
      className={props.isOpen ? "popup popup_opened" : "popup"}
      id={props.name}
    >
      <div className="popup__container">
        <button
          type="button"
          className="popup__toggle button"
          name="closePopup"
          onClick={props.onClose}
        >
          <img className="popup__toggle-image" src={close} alt="закрыть" />
        </button>
        <form className="popup__edit" name={props.name} noValidate>
          <h2 className="popup__heading">{props.title}</h2>
          {props.children}
          <button className="popup__submit" type="submit" name="saveEdit">
          {props.nameButton}
        </button>
        </form>
      </div>
    </section>
  );
}

export default PopupWithForm;
