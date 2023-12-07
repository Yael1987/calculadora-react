import '../styles/history.css'
import { type SavedOperation } from '../utils/types';
import Button from "./Button";
import HistoryOperations from './HistoryOperations';
import Icon from './Icon';

interface Props{
  historyRef: React.RefObject<HTMLDivElement>,
  onShowHistory: () => void,
  onOpenModal: () => void,
  savedOperations: SavedOperation[],
  onSavedOperationClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

const History: React.FC<Props> = ({ historyRef, onShowHistory, onOpenModal, savedOperations, onSavedOperationClick }) => {
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

        <HistoryOperations savedOperations={savedOperations} onSavedOperationClick={onSavedOperationClick} />
      </div>
    </>
  );
}

export default History