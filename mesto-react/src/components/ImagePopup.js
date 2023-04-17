import close from "../images/close.svg";

function ImagePopup(props) {
  const card= props.card;
  return (
    <section
      className="popup popup_place_bigphoto popup_opened"
      id="popupOpenPic"
    >
      <div className="popup__place-info">
        <button
          type="button"
          className="popup__toggle button toggle"
          name="closePopup"
        >
          <img
            className="popup__toggle-image"
            src={close}
            alt="закрыть"
            onClick={props.isClose}
          />
        </button>
        <img
          className="popup__photo"
          alt={card.name}
          src={(card)? card?.link: ''}
        />
        <h2 className="popup__subtitle">{card.name}</h2>
      </div>
    </section>
  );
}

export default ImagePopup;
