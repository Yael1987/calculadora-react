import React from 'react';
import Button from './Button'
import Icon from './Icon'

interface Props{
  handleHistoryAction: () => void,
  handleDeleteAction: () => void,
}

const CalculatorOptions : React.FC<Props> = ({handleDeleteAction, handleHistoryAction}) => {
  return (
    <div className="container-options">
      <Button type="option" className="btn--history" onClick={handleHistoryAction}>
        <Icon name="history" size="md" color="main" />
      </Button>

      <Button type="option" value="delete" onClick={handleDeleteAction}>
        <Icon size="md" color="main" name="delete" />
      </Button>
    </div>
  );
}

export default CalculatorOptions