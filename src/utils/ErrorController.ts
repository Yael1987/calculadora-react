import AppError from './AppError'

class ErrorController{
  entryError(): AppError {
    return new AppError("Accion no permitida", 1001);
  }

  operationStringError(): AppError {
    return new AppError("Campo de operacion vacio", 1002);
  }

  operationError(): AppError {
   return new AppError("Formato no valido", -1003);
  }

  limitStringError(limitLength: number): AppError {
   return new AppError(`Maximo ${limitLength} caracteres permitidos`, 1004);
  }

  resultOperationError(): AppError {
   return new AppError("Formato no permitido", 1005);
  }

  historyError(): AppError {
   return new AppError("Historial vacio", 1006);
  }

  storageError(): AppError {
   return new AppError("No hay datos guardados aun", -1007);
  }
}

export default new ErrorController()