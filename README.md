# Simple calculator made with React and Typescript

Esta es una calculadora simple construida usando React, Typescript y el paquete MathJS para realizar desde operaciones simples hasta trabajar con entidades trigonometricas, potencias, raices y con constantes como PI y e. La logica de la calculadora sigue un enfoque orientado oriententado a objetos.

Operaciiones que se pueden realizar:

- [x] Suma
- [x] Resta
- [x] Multiplicacion
- [x] Division
- [x] Seno
- [x] Coseno
- [x] Tangente
- [x] Logaritmo (base 10)
- [x] Valor absoluto
- [x] Valor factorial
- [x] PI
- [x] e
- [x] Potencia
- [x] Raiz cuadrada
- [x] Porcentaje
- [x] Numero al cuadrado

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh


## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
    project: ['./tsconfig.json', './tsconfig.node.json'],
    tsconfigRootDir: __dirname,
  },
}
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list