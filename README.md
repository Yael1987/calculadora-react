
# Simple calculator

This is a simple calculator built using React, Typescript, and the MathJS library to perform operations ranging from basic arithmetic to working with trigonometric functions, powers, roots, and constants like PI and e. The calculator's logic follows an object-oriented approach and uses localStorage to save user data like color theme and operations history.

You can visit the deployed project in:

- [Simple calculator](https://calculadora-react-am79l8j6z-yael1987.vercel.app/) deployed using Vercel

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
## Keyboard shorcuts
- Addition ( **+** )
- Substraction ( **-** )
- Multiplication ( * )
- Division ( **/** )
- Sine ( **shift + s** )
- Cosine ( **shift + c** )
- Tangent ( **shift + t** )
- Logarithm (**ctrl + l**)
- Absolute value (**a**)
- Factorial (**!**)
- PI (**p**)
- e (**e**)
- Power (**shift + p**)
- Square root (**r**)
- Percentage (**%**)
- Square of a number (**s**)
- Clear operation (**c**)
- Result (**enter, space**)
- Undo operation (**backspace**)

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


## License

MIT License

Copyright (c) 2023 Cristian Yael De Jesus Reyes

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.


## Contact Information

If you have any questions, suggestions, or just want to connect, feel free to reach out!

- **Email:** [dejesusyael1987@gmail.com](mailto:dejesusyael1987@gmail.com)
- **LinkedIn:** [Cristian Yael De Jesus Reyes](https://www.linkedin.com/in/cristian-yael-de-jesus-reyes-b96572211/)
- **GitHub:** [Yael1987](https://github.com/Yael1987)

I'm open to feedback and collaboration. Don't hesitate to drop a message or connect on social media.
