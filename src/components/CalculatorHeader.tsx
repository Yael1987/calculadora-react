import ToogleDarkMode from "./ToogleDarkMode";

const CalculatorHeader = () => {
  return (
    <div className="calculator-header">
      <h1 className="calculator-title">Calculadora</h1>

      <ToogleDarkMode />
    </div>
  );
}

export default CalculatorHeader