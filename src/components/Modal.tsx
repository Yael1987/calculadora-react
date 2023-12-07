import '../styles/modal.css'
import Button from './Button'

interface Props {
  onOpenModal: () => void,
  onClickOk: () => void,
}

const Modal: React.FC<Props> = ({ onOpenModal, onClickOk }) => {
  return (
    <div
      className="popup-alert"
      onClick={(e: React.MouseEvent<HTMLDivElement>) => {
        if ((e.target as Element).classList.contains("popup-alert")) {
          onOpenModal()
        }
      }}
    >
      <div className="alert">
        <div className="alert-text">
          <p>¿Deseas eliminar el historial?</p>
        </div>

        <div className="alert-options">
          <Button type='popup' color='main' onClick={onClickOk}> Aceptar </Button>
          <Button type='popup' color='white' onClick={onOpenModal}> Cancelar </Button>
        </div>
      </div>
    </div>
  )
}

export default Modal;