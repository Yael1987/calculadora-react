import AppError from "../../utils/AppError";
import ErrorController from "../../utils/ErrorController";
import { type SavedOperation } from "../../utils/types"

type UserData = {
  isDarkMode: boolean,
  savedOperations: SavedOperation[]
}

class Storage {
  userData: UserData = {
    isDarkMode: false,
    savedOperations: [],
  };

  setData(): void {
    localStorage.setItem(
      "calculatorConfig",
      JSON.stringify({...this.userData})
    );
  }

  getIsDarkMode(): boolean{
    let isDarkMode: boolean;
    const savedData = localStorage.getItem("calculatorConfig");

    if (savedData) {
      const data = JSON.parse(savedData);

      isDarkMode = data.isDarkMode;
    } else {
      isDarkMode = false;
    }


    this.userData.isDarkMode = isDarkMode;

    return isDarkMode
  }

  getSavedOperations(): SavedOperation[] {
    let savedOperations: SavedOperation[];
    const savedData = localStorage.getItem("calculatorConfig");

    if (savedData) {
      const data = JSON.parse(savedData);

      savedOperations = data.savedOperations;
    } else {
      savedOperations = [];
    }

    this.userData.savedOperations = savedOperations;

    return savedOperations;
  }

  getSavedData() {
    try {
      const savedData = localStorage.getItem("calculatorConfig");

      if (!savedData) {
        throw ErrorController.storageError();
      }

      const data = JSON.parse(savedData);

      this.userData = data;

      return {
        success: true,
        message: "Datos obtenidos",
        data: {...this.userData},
      };
    } catch (error) {
      if (error instanceof AppError) { 
        return {
          success: false,
          errorCode: error.code,
          message: error.message,
        };
      }
    }
  }

  updateSavedTheme( newTheme: boolean ) {
    this.userData.isDarkMode = newTheme; 
    localStorage.setItem(
      "calculatorConfig",
      JSON.stringify({...this.userData})
    );
  }

  updateSavedOperations( operations: SavedOperation[] ) {
    this.userData.savedOperations = operations;
    localStorage.setItem(
      "calculatorConfig",
      JSON.stringify({...this.userData})
    );
  }

  clearSavedOperations() {
    this.userData.savedOperations = [];

    localStorage.setItem(
      "calculatorConfig",
      JSON.stringify({...this.userData})
    );

    return {
      success: true,
      message: "Historial eliminado",
    };
  }
}

export default new Storage()