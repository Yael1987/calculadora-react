import { evaluate } from "mathjs";
import AppError from "../../utils/AppError";
import { type CalculatorResponseType, type CalculatorType } from "../../utils/types";
import { StringModifier } from "./StringModifier";
import ErrorController from "../../utils/ErrorController";

export class Calculator implements CalculatorType {
  result: number = 0;
  operationString: string = "";
  stringToEvaluate: string = "";
  openParentesis: number = 0;
  stringModifier: StringModifier;
  response: CalculatorResponseType = {
    success: false,
    message: "",
  };
  MAX_STRING_LENGTH: number = 40;

  constructor() {
    this.stringModifier = new StringModifier(this);
  }

  resultOperation(): CalculatorResponseType {
    try {
      this.operationString = this.stringModifier.adaptString();

      this.response = this.makeOperation("", true);
    } catch (error) {
      if (error instanceof AppError) {
        this.response = {
          success: false,
          errorCode: error.code,
          message: error.message,
        };
      }
    }

    return this.response;
  }

  clearOperation(forResult: boolean = false): CalculatorResponseType {
    try {
      this.operationString = forResult
        ? this.stringModifier.resetStringData(String(this.result))
        : this.stringModifier.resetStringData();

      this.result = 0;
      this.openParentesis = 0;

      this.response = {
        success: true,
        message: "Estado de la calculadora reseteado",
      };
    } catch (error) {
      if (error instanceof AppError) {
        this.response = {
          success: false,
          errorCode: error.code,
          message: error.message,
        };
      }
    }

    return this.response;
  }

  makeOperation(
    userEntry?: string,
    forResult: boolean = false
  ): CalculatorResponseType {
    try {
      // Checks if the user is getting some entry
      if (userEntry) {
        this.operationString = this.stringModifier.modifyString(userEntry);
      }

      // Parses the operation string in order to be able to evaluate the operation
      this.stringToEvaluate = this.stringModifier.parseOperationString(
        this.operationString
      );

      // Checks if the user wants the result of the current operation
      if (!forResult) {
        // if user dont want the result of the current operation checks if all the parentesis are closed
        if (this.openParentesis !== 0) throw ErrorController.operationError();
      }

      // If there is no string to evaluate or there is just one character to evaluate returns
      if (
        !this.stringToEvaluate ||
        (this.stringToEvaluate.length === 1 && this.stringToEvaluate !== "e")
      )
        throw ErrorController.operationError();

      // Checks if the string to evaluate y valid to be evaluated
      if (
        !isNaN(Number(this.stringToEvaluate)) &&
        this.stringToEvaluate.length >= 2 &&
        !["e", "pi"].includes(this.stringToEvaluate)
      )
        throw ErrorController.operationError();

      // Checks that the last character of the string no be a special character
      if (["+", "-", "*", "/", "("].includes(this.stringToEvaluate.slice(-1)))
        throw ErrorController.operationError();
      
      this.result = evaluate(this.stringToEvaluate);

      this.response = {
        success: true,
        message: "Operacion realizada correctamente",
        data: {
          result: this.result,
          operation: this.operationString,
        },
      };
    } catch (error) {
      if (error instanceof AppError) {
        this.response = {
          success: false,
          errorCode: error.code,
          message: error.message,
          data: {
            result: this.result,
            operation: this.operationString,
          },
        };
      }
    }

    return this.response;
  }

  undoOperation(): CalculatorResponseType {
    try {
      this.operationString = this.stringModifier.undoStringData();
      this.response = {
        success: true,
        message: "Backup string applied",
      };
    } catch (error) {
      if (error instanceof AppError) {
        this.response = {
          success: false,
          errorCode: error.code,
          message: error.message,
        };
      }
    }

    return this.response
  }

  updateCurrentOperation(uiString: string): CalculatorResponseType {
    try {
      this.operationString = this.stringModifier.updateString(uiString);

      this.response = this.makeOperation("", true);
    } catch (error) {
      if (error instanceof AppError) {
        this.response = {
          success: false,
          errorCode: error.code,
          message: error.message,
        };
      }
    }
    return this.response
  }

  increaseParentesisCounter() {
    this.openParentesis += 1;
  }

  decreaseParentesisCounter() {
    this.openParentesis -= 1;
  }

  getParentesisCounter() {
    return this.openParentesis;
  }

  setMaxStringLength(maxStringLength: number): void{
    this.MAX_STRING_LENGTH = maxStringLength;
  }
}

export default new Calculator()