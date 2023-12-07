import { memo } from "react";
import ToogleDarkMode from "./ToogleDarkMode";

const CalculatorHeader: React.FC = memo(() => {
  return (
    <div className="calculator-header">
      <h1 className="calculator-title">Calculadora</h1>

      <ToogleDarkMode />
    </div>
  );
})

export default CalculatorHeader