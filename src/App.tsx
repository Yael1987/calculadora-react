import { useEffect, useRef, useState } from 'react';

import { SavedOperation, type CalculatorResponseType } from './utils/types';
import calculator from './features/calculator/Calculator'

import History from './components/History';
import Modal from './components/Modal';
import Notification from './components/Notification';
import Calculator from './components/Calculator';
import CalculatorHeader from './components/CalculatorHeader';
import CalculatorPanel from './components/CalculatorPanel';
import CalculatorOptions from './components/CalculatorOptions';
import Keyboard from './components/Keyboard';

import './styles/calculator.css'
import { replaceKeyValue, validateBtnValue, validateKeyEntry } from './utils/validateEntry';
import storage from './features/storage/Storage';

const App = () => {
  const [operation, setOperation] = useState<string>("")
  const [result, setResult] = useState<string>("")
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [notificationMessage, setNotificationMessage] = useState<string>("");
  const [savedOperations, setSavedOperations] = useState<SavedOperation[]>(storage.getSavedOperations())

  const historyRef = useRef<HTMLDivElement>(null);
  const operationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener("keydown", (keydown: KeyboardEvent) => {
      if (!validateKeyEntry(keydown.key)) return 
      
      keydown.preventDefault();

      if (keydown.key === "i" && keydown.ctrlKey) {
        return console.log("Cambio de tema");
      }

      let calcResponse: CalculatorResponseType

      switch (keydown.key) {
        case "Backspace":
           calcResponse = calculator.undoOperation();

          if (!calcResponse.success) {
            return setNotificationMessage(calcResponse.message);
          }

          calcResponse = calculator.makeOperation();

          if (!calcResponse.success) {
            if (calcResponse.errorCode === 1001 || calcResponse.errorCode === 1004) {
              return setNotificationMessage(calcResponse.message);
            }
          }

          setOperation(calcResponse.data!.operation);
          setResult(() => calcResponse.data!.operation ? String(calcResponse.data!.result) : "");

          return;

        case " ":
          calcResponse = calculator.resultOperation();

          if (!calcResponse.success) {
            setNotificationMessage(calcResponse.message);

            return
          }

          if (calcResponse.data?.operation || calcResponse.data?.result) {
            const operationToSave: SavedOperation = {
              operation: calcResponse.data.operation,
              result: String(calcResponse.data.result),
            };

            setSavedOperations(currOperations => [operationToSave, ...currOperations])

            storage.updateSavedOperations([operationToSave, ...savedOperations])

            setOperation(String(calcResponse.data.result));
            setResult("");
          }
          
          calculator.clearOperation(true)
          return;

        case "Enter":
          calcResponse = calculator.resultOperation();

          if (!calcResponse.success) {
            setNotificationMessage(calcResponse.message);

            return
          }

          if (calcResponse.data?.operation || calcResponse.data?.result) {
            const operationToSave: SavedOperation = {
              operation: calcResponse.data.operation,
              result: String(calcResponse.data.result),
            };

            setSavedOperations(currOperations => [operationToSave, ...currOperations])

            storage.updateSavedOperations([operationToSave, ...savedOperations])

            setOperation(String(calcResponse.data.result));
            setResult("");
          }
          
          calculator.clearOperation(true)
          return;

        case "c":
          calcResponse = calculator.clearOperation();

          if (!calcResponse.success) {
            setNotificationMessage(calcResponse.message);
          }

          setOperation("")
          setResult("")

          return;

        default:
          calcResponse = calculator.makeOperation(replaceKeyValue(keydown.key))
          
          if (!calcResponse.success) {
            if (calcResponse.errorCode === 1001 || calcResponse.errorCode === 1004) {
              setNotificationMessage(calcResponse.message);
            }
          }
            
            
          if (calcResponse.data?.operation || calcResponse.data?.result) { 
            setOperation(calcResponse.data.operation)
            setResult(String(calcResponse.data.result))
          }
          return;
      }
    })
  }, [savedOperations])

  const showHistory = (): void => {
    historyRef.current?.classList.toggle("container-history-display");
  };

  const handleOpenModal = (): void => {
    setIsModalOpen(showModal => !showModal)
  }

  const handleClickOk = (): void => {
    storage.clearSavedOperations();
    setSavedOperations([]);
    setIsModalOpen((showModal) => !showModal);
    setNotificationMessage("Historial eliminado")
  }

  const handleSavedOperationClick = (event: React.MouseEvent<HTMLDivElement>): void => {
    if (event.target instanceof HTMLDivElement) { 
      let value: string = "";

      if (event.target.classList.contains("result-history")) {
        value = event.target.innerText;
      } else if (event.target.classList.contains("operation-history")) {
        value = event.target.innerText;
      }

      if (value === "") return

      const calcResponse = calculator.updateCurrentOperation(value)

      if (!calcResponse.success) {
        if (calcResponse.errorCode === 1001)
          setNotificationMessage(calcResponse.message);
      }

      if (calcResponse.data?.operation || calcResponse.data?.result) {
        setOperation(calcResponse.data.operation);
        setResult(String(calcResponse.data.result));
      }
    }
  }

  const handleButtonClick = (event: React.MouseEvent<Element>): void => {
    if (event.target instanceof Element) { 
      const entryValue = validateBtnValue(event.target)
      let calcResponse: CalculatorResponseType;

      switch (entryValue) {
        case "result": 
          calcResponse = calculator.resultOperation();

          if (!calcResponse.success) {
            setNotificationMessage(calcResponse.message);

            return
          }

          if (calcResponse.data?.operation || calcResponse.data?.result) {
            const operationToSave: SavedOperation = {
              operation: calcResponse.data.operation,
              result: String(calcResponse.data.result),
            };

            setSavedOperations(currOperations => [operationToSave, ...currOperations])

            storage.updateSavedOperations([operationToSave, ...savedOperations])

            setOperation(String(calcResponse.data.result));
            setResult("");
          }
          
          calculator.clearOperation(true)
          break;
        case "clear":
          calcResponse = calculator.clearOperation();

          if (!calcResponse.success) {
            setNotificationMessage(calcResponse.message);
          }

          setOperation("")
          setResult("")

          break;
        default:

          calcResponse = calculator.makeOperation(entryValue)
          
          if (!calcResponse.success) {
            if (calcResponse.errorCode === 1001 || calcResponse.errorCode === 1004) {
              setNotificationMessage(calcResponse.message);
            }
          }
            
            
          if (calcResponse.data?.operation || calcResponse.data?.result) { 
            setOperation(calcResponse.data.operation)
            setResult(String(calcResponse.data.result))
          }
          break;
      }
    }
  }

  const handleUndoClick = () => {
    let calcResponse: CalculatorResponseType = calculator.undoOperation();

    if (!calcResponse.success) {
      return setNotificationMessage(calcResponse.message);
    }

    calcResponse = calculator.makeOperation();

    if (!calcResponse.success) {
      if (calcResponse.errorCode === 1001 || calcResponse.errorCode === 1004) {
        return setNotificationMessage(calcResponse.message);
      }
    }

    setOperation(calcResponse.data!.operation);
    setResult(() => calcResponse.data!.operation ? String(calcResponse.data!.result) : "");
  }

  return (
    <div className="container">
      <History onSavedOperationClick={handleSavedOperationClick} historyRef={historyRef} onShowHistory={showHistory} onOpenModal={handleOpenModal} savedOperations={savedOperations} />

      <div className="container-calculator">
        <Calculator>
          <CalculatorHeader />

          <div className="calculator-ui">
            <CalculatorPanel operationRef={operationRef} operation={operation} result={result}/>

            <CalculatorOptions handleHistoryAction={showHistory} handleDeleteAction={handleUndoClick} />

            <Keyboard onButtonClick={handleButtonClick} />
          </div>
        </Calculator>
      </div>

      {isModalOpen && <Modal onOpenModal={handleOpenModal} onClickOk={handleClickOk}/>}

      <Notification message={notificationMessage} clearMessage={()=> setNotificationMessage("")} />
    </div>
  );
}

export default App
