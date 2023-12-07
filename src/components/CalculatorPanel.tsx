import { useEffect } from "react";

interface Props {
  operation: string;
  result: string;
  operationRef: React.RefObject<HTMLDivElement>;
}

const CalculatorPanel: React.FC<Props> = ({ operation, result, operationRef }) => {
  useEffect(() => {
    const scrollOperation = (): void => {
      if (operationRef.current) {
        operationRef.current.scrollLeft = operationRef.current.scrollWidth;
      }
    }

    scrollOperation()
  }, [operation, operationRef])

  return (
    <div className="container-result">
      <div className="operations" ref={operationRef}>{operation || "0"}</div>
      <div className="result">{result === "" ? "\u00A0" : result}</div>
    </div>
  );
}

export default CalculatorPanel