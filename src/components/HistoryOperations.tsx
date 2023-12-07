import { type SavedOperation } from "../utils/types";

interface Props {
  savedOperations: SavedOperation[];
  onSavedOperationClick: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const HistoryOperations: React.FC<Props> = ({ savedOperations, onSavedOperationClick }) => {
  return (
    <div className="container-history-operations">
      {savedOperations.length !== 0
        ? (
          savedOperations.map((operation, index) => (
            <div className="history-div" key={index} onClick={onSavedOperationClick}>
              <div className="operation-history">{operation.operation}</div>
              <div className="result-history">{operation.result}</div>
            </div>
          ))
        )
        : <p className="history-empty">El historial esta vacío</p>
      }
    </div>
  );
}

export default HistoryOperations