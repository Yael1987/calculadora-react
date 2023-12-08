
# Simple calculator

This is a simple calculator built using React, Typescript, and the MathJS library to perform operations ranging from basic arithmetic to working with trigonometric functions, powers, roots, and constants like PI and e. The calculator's logic follows an object-oriented approach and uses localStorage to save user data like color theme and operations history.

You can visit the deployed project in:

- [Simple calculator](https://calculadora-react-yael1987.vercel.app/) deployed using Vercel

## Technologies used and how are implemented

- **React**: Is used to build the user interface and control the app state using build in hooks like useState and useEffect, also I implemented performance optimizations using memo and useCallback fuctions to prevent wasted re-renders.

- **Typescript**: Is the programing language used in the project in order to make easer coding and maintain the project. I implemented custom types and interfaces in both React and business logic.

- **MathJs**: Is used to evaluate the operation (which will be and string) using its evaluate method. I used this library instead of the build in evaluate function of Javascript to prevent some security problems.

## Features

- Light/dark mode toggle
- History persistence using localStorage
- Keyboard shortcuts

Operations that can be performed:

- Addition
- Subtraction
- Multiplication
- Division
- Sine
- Cosine
- Tangent
- Logarithm (base 10)
- Absolute value
- Factorial
- PI
- e
- Power
- Square root
- Percentage
- Square of a number

## Project structure
The project use a simple files and directories structure
- **src**: Contains all the application files and directories that make up the application

- **components**: Contains all the app components required to build the user interface

- **features**: Contains all the business logic needed to perform mathematical operations and manage the storage

- **hooks**: Contains the custom hook for change calculator buttons distribution

- **styles**: Contains all the application styles in separated files

- **utils**: Contains needed files like types file, utility classes and validators 

## Run Locally

Clone the project

```bash
  git clone https://github.com/Yael1987/calculadora-react.git
```

Go to the project directory

```bash
  cd calculadora-react
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run dev
```