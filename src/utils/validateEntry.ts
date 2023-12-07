const validKeyValues = [
  "1",
  "2",
  "3",
  "4",
  "5",
  "6",
  "7",
  "8",
  "9",
  "0",
  ".",
  "%",
  "(",
  ")",
  "/",
  "!",
  "+",
  "*",
  "-",
  "Enter", //Result
  "Backspace", //Delete
  " ", //Result
  "s", //Square
  "l", //Log
  "S", //sin
  "C", //Cos
  "T", //Tan
  "a", //Abs
  "e", //e
  "r", //root
  "p", //pi
  "P", //pow
  "c", //clear
  "i",
];

export function validateBtnValue(targetElement: Element): string {
  if (targetElement.classList.contains("icon")) {
    if (targetElement.parentElement instanceof HTMLButtonElement) {
      return targetElement.parentElement!.value;
    }
  } else if (targetElement.classList.length === 0) {
    if (targetElement.parentElement?.classList.contains("icon")) {
      if (
        targetElement.parentElement.parentElement instanceof HTMLButtonElement
      ) {
        return targetElement.parentElement.parentElement.value;
      }
    }
  } else {
    if (targetElement instanceof HTMLButtonElement) {
      return targetElement.value;
    }
  }

  return "";
}

export function validateKeyEntry(keydown: string) {
  return validKeyValues.includes(keydown);
}

export function replaceKeyValue(keydown: string): string {
    switch (keydown) {
      case "s":
        return 'square';
      case "l":
        return 'log';
      case "S":
        return 'sin';
      case "C":
        return 'cos';
      case "T":
        return 'tan';
      case "a":
        return 'abs';
      case "e":
        return 'e';
      case "r":
        return "√";
      case "p":
        return 'pi';
      case "P":
        return 'pow';
      default:
        return keydown;
    }
  }
