export interface Button {
  value: string;
  color: string;
  label: string;
  icon?: string;
}

export interface CalculatorResponseType {
  success: boolean;
  message: string;
  errorCode?: number;
  data?: {
    result: number;
    operation: string;
  };
}

export interface CalculatorType {
  result: number;
  operationString: string;
  stringToEvaluate: string;
  openParentesis: number;
  stringModifier: StringModifier;
  response: CalculatorResponse;
}

export interface StringModifierType {
  string: string,
  backup: string[],
  specialSigns: string[],
  signs: string[],
  calculator: CalculatorType;
  evaluator: EntryEvaluatorType;
}

export interface EntryEvaluatorType {
  modifierString: StringModifierType;
}

export type SavedOperation = {
  operation: string;
  result: string;
};