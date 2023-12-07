interface Props{
  children: React.ReactNode
}

const Calculator: React.FC<Props> = ({children}) => {
  return (
    <div className="calculator">
      {children}
    </div>
  );  
}

export default Calculator
