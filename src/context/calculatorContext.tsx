import { createContext, useContext, useState } from "react";

interface CalculatorTypes {
  isMobile: boolean,
  isDarkMode: boolean,
  operation: string,
  handleChangeOperation: (value: string) => void,
}

interface Props {
  children: JSX.Element
}

const CalculatorContext = createContext<CalculatorTypes>({} as CalculatorTypes)

const CalculatorProvider = ({ children }: Props) => {
  const [operation, setOperation] = useState<CalculatorTypes["operation"]>("")

  const handleChangeOperation = (value: string): void => {
    setOperation(operation => operation + value)
  }

  return ( 
    <CalculatorContext.Provider value={{
      isMobile: false,
      isDarkMode: false,
      operation,
      handleChangeOperation
    }}>
      {children}
    </CalculatorContext.Provider>
  )
}

export const useCalculator = () => {
  const context = useContext(CalculatorContext)

  if (!context) {
    throw new Error("useCalculator must be used within a CalculatorProvider")
  }

  return context
}

export default CalculatorProvider