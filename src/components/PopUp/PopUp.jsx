import './PopUp.css';

function PopUp({ message, onClose }) {
  return (
    <div className="popup-container">
      <div className="popup">
        <span className="popup-message">{message}</span>
        <button className="popup-close" onClick={onClose}>
          Cerrar
        </button>
      </div>
    </div>
  );
}

export default PopUp;