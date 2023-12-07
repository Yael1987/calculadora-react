import '../styles/history.css'
import Button from "./Button";
import Icon from './Icon';

interface Props{
  historyRef: React.RefObject<HTMLDivElement>,
  onShowHistory: () => void,
  onOpenModal: () => void,
  children: JSX.Element
}

const History: React.FC<Props> = ({ historyRef, onShowHistory, onOpenModal, children }) => {
  return (
    <>
      {/* <!-- container-history-display will display the history when this disapears in mobile screens --> */}
      <div className="container-history" ref={historyRef}>
        <div className="closer-history" onClick={onShowHistory}>&nbsp;</div>
        
        <div className="history-header">
          <h1 className="history-title">Historial</h1>

          <Button onClick={onOpenModal}>
            <Icon name="trash" size="sm" color="main"/>
          </Button>
        </div>

        {children}
      </div>
    </>
  );
}

export default History