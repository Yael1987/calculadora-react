import ErrorController from "../../utils/ErrorController";
import { type StringModifierType } from "../../utils/types";
import { Calculator } from "./Calculator";
import { EntryEvaluator } from "./EntryEvaluator";

export class StringModifier implements StringModifierType {
  string = "";
  backup: string[] = [];
  specialSigns = ["π", "%", "e", "!"];
  signs = ["+", "-", "*", "/"];
  calculator: Calculator;
  evaluator: EntryEvaluator;

  constructor(calculator: Calculator) {
    this.calculator = calculator;
    this.evaluator = new EntryEvaluator(this);
  }

  modifyString(userEntry: string): string {
    if (this.string.length >= this.calculator.MAX_STRING_LENGTH) throw ErrorController.limitStringError(this.calculator.MAX_STRING_LENGTH);
    const lastWord = this.string.slice(-1);

    return this.evaluator.evaluateEntry(lastWord, userEntry);
  }

  updateString(uiString: string): string {
    if (this.string.length + uiString.length >= this.calculator.MAX_STRING_LENGTH)
      throw ErrorController.limitStringError(this.calculator.MAX_STRING_LENGTH);

    const firstElement = uiString.slice(0, 1);
    const lastWord = this.string.slice(-1);

    if (lastWord === ".") throw ErrorController.entryError();

    if ([...this.specialSigns, ")"].includes(lastWord) && !isNaN(Number(firstElement))) {
      this.backup.push(this.string);
      this.string += `*${uiString}`;

      return this.string;
    }

    if (!isNaN(Number(firstElement)) && isNaN(Number(lastWord))) {      
      this.backup.push(this.string);
      this.string += uiString;

      return this.string;
    }

    if (isNaN(Number(firstElement)) && isNaN(Number(lastWord))) {      
      this.backup.push(this.string);
      this.string += uiString;

      return this.string;
    }

    if (!isNaN(Number(lastWord)) && isNaN(Number(firstElement))) {
      this.backup.push(this.string);
      this.string += `*${uiString}`;

      return this.string;
    }

    if (!isNaN(Number(lastWord)) && !isNaN(Number(firstElement))) {
      for (let i = this.string.length - 1; i >= 0; i--) {
        if (this.string[i] === ".") {
          throw ErrorController.entryError();
        }

        if (isNaN(Number(this.string[i]))) {
          break;
        }
      }

      this.backup.push(this.string);
      this.string += uiString;

      return this.string;
    }

    return this.string
  }

  resetStringData(result: string = ""): string {
    if (!this.string) throw ErrorController.operationStringError();

    this.string = result && result !== "0" ? result : "";
    this.backup = [];

    return this.string;
  }

  undoStringData(): string {
    if (!this.string) throw ErrorController.operationStringError();

    const tempString = this.string;

    this.string = this.backup.slice(-1).toString();

    const erasedString = tempString.replace(this.string, "");

    if (erasedString.includes("(")) this.calculator.decreaseParentesisCounter();

    if (erasedString.includes(")")) this.calculator.increaseParentesisCounter();

    this.backup.pop();
    return this.string;
  }

  adaptString(): string {
    if (this.string.slice(-1) === "(") throw ErrorController.resultOperationError();

    if (this.signs.includes(this.string.slice(-1)))
      throw ErrorController.resultOperationError();

    if (this.calculator.getParentesisCounter() !== 0) {
      for (let i = this.calculator.getParentesisCounter(); i > 0; i--) {
        this.string += ")";
      }
    }
    
    return this.string;
  }

  addSquare(lastWord: string): string {
    if (
      !this.string ||
      (isNaN(Number(lastWord)) && !this.specialSigns.includes(lastWord))
    )
      throw ErrorController.entryError();

    this.backup.push(this.string);
    return (this.string += "^(2)");
  }

  addPow(lastWord: string): string {
    if (
      !this.string ||
      (isNaN(Number(lastWord)) && !this.specialSigns.includes(lastWord))
    )
      throw ErrorController.entryError();

    this.backup.push(this.string);
    this.calculator.increaseParentesisCounter();

    return (this.string += "^(");
  }

  addE(lastWord: string): string {
    this.backup.push(this.string);

    if (!this.string) return (this.string += "e");

    if (lastWord === ")" || !isNaN(Number(lastWord))) return (this.string += "*e");

    return (this.string += "e");
  }

  addPi(lastWord: string): string {
    this.backup.push(this.string);

    if (!this.string) return (this.string += "π");

    if (lastWord === ")" || !isNaN(Number(lastWord))) return (this.string += "*π");

    return (this.string += "π");
  }

  addProperty(lastWord: string, userEntry: string) {
    this.backup.push(this.string);
    this.calculator.increaseParentesisCounter();

    if (!this.string) return (this.string += `${userEntry}(`);

    if (lastWord === ")" || !isNaN(Number(lastWord)))
      return (this.string += `*${userEntry}(`);

    return (this.string += `${userEntry}(`);
  }

  addParentesis(lastWord: string): string {
    if (lastWord === ".") throw ErrorController.entryError();

    if ([...this.signs, "("].includes(lastWord) || !lastWord) {
      this.calculator.increaseParentesisCounter();
      this.backup.push(this.string);
      return (this.string += "(");
    }

    //add de close parentesis
    if (this.calculator.getParentesisCounter() !== 0) {
      if (isNaN(Number(lastWord)) && this.string.includes("(")) {
        if ([...this.signs, "("].includes(lastWord)) {
          this.calculator.increaseParentesisCounter();
          this.backup.push(this.string);
          return (this.string += "(");
        }
      }

      if (
        isNaN(Number(lastWord)) &&
        ![...this.specialSigns, "(", ")"].includes(lastWord)
      )
        throw ErrorController.entryError();

      if (!isNaN(Number(lastWord)) || [...this.specialSigns, ")"].includes(lastWord)) {
        this.calculator.decreaseParentesisCounter();
        this.backup.push(this.string);
        return (this.string += ")");
      }

      if (lastWord === "(") {
        this.calculator.decreaseParentesisCounter();
        this.backup.push(this.string);
        return (this.string += "0)");
      }
    }

    if (!isNaN(Number(lastWord)) || [...this.specialSigns, ")"].includes(lastWord)) {
      this.calculator.increaseParentesisCounter();
      this.backup.push(this.string);
      return (this.string += "*(");
    }

    return ""
  }

  addOpenParentesis(lastWord: string): string {
    if (lastWord === ".") throw ErrorController.entryError();

    this.backup.push(this.string);

    if (!isNaN(Number(lastWord)) || [...this.specialSigns, ")"].includes(lastWord)) {
      this.calculator.increaseParentesisCounter();
      return (this.string += "*(");
    }

    if ([...this.signs, "("].includes(lastWord) || !lastWord) {
      this.calculator.increaseParentesisCounter();
      return (this.string += "(");
    }

    return ""
  }

  addCloseParentesis(lastWord: string): string {
    if (this.calculator.getParentesisCounter() === 0)
      throw ErrorController.entryError();

    if (isNaN(Number(lastWord)) && ![...this.specialSigns, ")", "("].includes(lastWord))
      throw ErrorController.entryError();

    this.backup.push(this.string);

    if (!isNaN(Number(lastWord)) || [...this.specialSigns, ")"].includes(lastWord)) {
      this.calculator.decreaseParentesisCounter();
      return (this.string += ")");
    }

    if (lastWord === "(") {
      this.calculator.decreaseParentesisCounter();

      return (this.string += "0)");
    }

    return ""
  }

  addSigns(lastWord: string, userEntry: string): string {
    if (!lastWord) throw ErrorController.entryError();

    this.backup.push(this.string);

    if (
      !isNaN(Number(lastWord)) ||
      (lastWord === "(" && userEntry === "-") ||
      [...this.specialSigns, ")"].includes(lastWord)
    )
      return (this.string += userEntry);

    return this.string;
  }

  addPercent(lastWord: string): string {
    if (
      !lastWord ||
      (isNaN(Number(lastWord)) && !["π", "e", ")", "!"].includes(lastWord))
    )
      throw ErrorController.entryError();

    this.backup.push(this.string);
    return (this.string += "%");
  }

  addDot(lastWord: string): string {
    for (let i = this.string.length - 1; i >= 0; i--) {
      if (isNaN(Number(this.string[i]))) break;

      if (this.string[i] === ".") throw ErrorController.entryError();
    }

    this.backup.push(this.string);

    if ([...this.signs, "("].includes(lastWord) || !lastWord)
      return (this.string += "0.");

    if ([...this.specialSigns, ")"].includes(lastWord))
      return (this.string += "*0.");

    return (this.string += ".");
  }

  addMultiplyNumber(userEntry: string): string {
    this.backup.push(this.string);
    return (this.string += `*${userEntry}`);
  }

  addNumber(userEntry: string): string {
    this.backup.push(this.string);
    return (this.string += userEntry);
  }

  parseOperationString(string: string): string {
    return string
      .replace(/π/g, "pi")
      .replace(/√/g, "sqrt")
      .replace(/log/g, "log10")
      .replace(/sin\((.*?)\)/g, "sin(unit($1, 'deg'))")
      .replace(/cos\((.*?)\)/g, "cos(unit($1, 'deg'))")
      .replace(/tan\((.*?)\)/g, "tan(unit($1, 'deg'))");
  }
}