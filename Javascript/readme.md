# JavaScript Practice 

## [Excercise](https://www.w3resource.com/javascript-exercises/)


# Comprehensive JavaScript Notes for Developers

## 1. JavaScript Basics

### Variables and Data Types
- **Variables**: Use `let` for mutable variables, `const` for immutable values (objects/arrays are mutable), avoid `var`.
  ```javascript
  let age = 25;
  const name = "Alice";
  age = 26; // OK
  // name = "Bob"; // Error
  ```
- **Data Types**:
  - Primitive: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`
  - Object: `Object`, `Array`, `Function`, `Date`, `RegExp`, etc.
  ```javascript
  const num = 42;
  const obj = { key: "value" };
  const arr = [1, 2, 3];
  ```

### Operators
- Arithmetic: `+`, `-`, `*`, `/`, `%`, `**` (exponentiation)
- Comparison: `==`, `===` (strict equality), `!=`, `!==`, `>`, `<`, etc.
- Logical: `&&`, `||`, `!`
- Nullish Coalescing (`??`): Returns right operand if left is `null` or `undefined`.
  ```javascript
  const value = null ?? "default"; // "default"
  ```

### Functions
- **Declaration**:
  ```javascript
  function greet(name) {
    return `Hello, ${name}`;
  }
  ```
- **Expression**:
  ```javascript
  const add = function(a, b) { return a + b; };
  ```
- **Arrow Functions** (ES6):
  ```javascript
  const multiply = (a, b) => a * b;
  ```

### Control Flow
- **Conditionals**:
  ```javascript
  if (condition) { /* code */ } else if (otherCondition) { /* code */ } else { /* code */ }
  ```
- **Switch**:
  ```javascript
  switch (day) {
    case "Monday":
      console.log("Start of week");
      break;
    default:
      console.log("Other day");
  }
  ```
- **Loops**:
  - `for`, `while`, `do...while`
  - `for...of` (iterables), `for...in` (object properties)
  ```javascript
  for (const item of [1, 2, 3]) {
    console.log(item);
  }
  ```

## 2. ES6+ Features

### Let and Const
- Block-scoped, no hoisting like `var`.
  ```javascript
  let x = 10;
  if (true) {
    let x = 20; // Separate scope
    console.log(x); // 20
  }
  console.log(x); // 10
  ```

### Arrow Functions
- Concise syntax, lexical `this`.
  ```javascript
  const obj = {
    name: "Alice",
    greet: () => console.log(this.name), // `this` is outer scope
    greetNormal: function() { console.log(this.name); } // `this` is obj
  };
  ```

### Template Literals
- String interpolation and multi-line strings.
  ```javascript
  const name = "Bob";
  console.log(`Hello, ${name}!
  Welcome!`); // Multi-line
  ```

### Destructuring
- **Array**:
  ```javascript
  const [a, b, ...rest] = [1, 2, 3, 4];
  console.log(a, b, rest); // 1, 2, [3, 4]
  ```
- **Object**:
  ```javascript
  const { name: userName, age = 18 } = { name: "Alice" };
  console.log(userName, age); // Alice, 18
  ```

### Default Parameters
  ```javascript
  function log(message = "No message") {
    console.log(message);
  }
  log(); // No message
  ```

### Rest and Spread
- **Rest**: Collects arguments/elements.
  ```javascript
  function sum(...nums) {
    return nums.reduce((a, b) => a + b, 0);
  }
  ```
- **Spread**: Expands arrays/objects.
  ```javascript
  const arr = [1, 2];
  console.log([...arr, 3]); // [1, 2, 3]
  ```

### Classes
- Constructor and methods:
  ```javascript
  class Person {
    constructor(name) {
      this.name = name;
    }
    greet() {
      return `Hello, ${this.name}`;
    }
  }
  ```
- Inheritance:
  ```javascript
  class Student extends Person {
    constructor(name, grade) {
      super(name);
      this.grade = grade;
    }
  }
  ```

### Modules
- **Export**:
  ```javascript
  // math.js
  export const add = (a, b) => a + b;
  export default function subtract(a, b) { return a - b; }
  ```
- **Import**:
  ```javascript
  // main.js
  import subtract, { add } from './math.js';
  ```

### Promises
- Handle async operations:
  ```javascript
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("Done"), 1000);
  });
  promise.then(result => console.log(result));
  ```

### Async/Await
- Cleaner Promise syntax:
  ```javascript
  async function fetchData() {
    try {
      const response = await fetch('https://api.example.com/data');
      return await response.json();
    } catch (error) {
      console.error(error);
    }
  }
  ```

### Enhanced Object Literals
  ```javascript
  const name = "Alice";
  const obj = { name, greet() { return `Hi, ${this.name}`; } };
  ```

### Symbols
- Unique identifiers:
  ```javascript
  const sym = Symbol("id");
  const obj = { [sym]: 123 };
  console.log(obj[sym]); // 123
  ```

### Map and Set
- **Map**: Key-value pairs, any key type.
  ```javascript
  const map = new Map();
  map.set("key", "value");
  ```
- **Set**: Unique values.
  ```javascript
  const set = new Set([1, 2, 2]);
  console.log(set); // Set {1, 2}
  ```

### Array Methods
- `map`, `filter`, `reduce`, `forEach`, `find`, `some`, `every`:
  ```javascript
  const nums = [1, 2, 3];
  console.log(nums.map(n => n * 2)); // [2, 4, 6]
  console.log(nums.filter(n => n > 1)); // [2, 3]
  ```

## 3. Advanced JavaScript

### Closures
- Functions that retain access to their outer scope:
  ```javascript
  function counter() {
    let count = 0;
    return () => count++;
  }
  const increment = counter();
  console.log(increment()); // 0
  console.log(increment()); // 1
  ```

### `this` Keyword
- Depends on context:
  - Global: `window` (browser)
  - Object method: Object itself
  - Constructor: New instance
  - Arrow function: Parent scope’s `this`
  ```javascript
  const obj = {
    name: "Alice",
    say: function() { console.log(this.name); }
  };
  obj.say(); // Alice
  ```

### Prototypes and Inheritance
- Objects inherit from prototypes:
  ```javascript
  function Animal(name) {
    this.name = name;
  }
  Animal.prototype.speak = function() {
    console.log(`${this.name} speaks`);
  };
  const dog = new Animal("Dog");
  dog.speak(); // Dog speaks
  ```

### Event Loop and Async
- JavaScript is single-threaded; event loop handles async tasks.
- **Call Stack**: Executes synchronous code.
- **Task Queue**: Handles async callbacks (e.g., `setTimeout`, Promises).
  ```javascript
  console.log("Start");
  setTimeout(() => console.log("Timeout"), 0);
  console.log("End");
  // Output: Start, End, Timeout
  ```

### Error Handling
- Use `try/catch`:
  ```javascript
  try {
    throw new Error("Something went wrong");
  } catch (error) {
    console.error(error.message);
  }
  ```

## 4. Working with the DOM

### Selecting Elements
  ```javascript
  const el = cautionedocument.querySelector("#myId");
  const els = document.querySelectorAll(".myClass");
  ```

### Manipulating DOM
  ```javascript
  el.textContent = "New text";
  el.classList.add("active");
  const newEl = document.createElement("div");
  document.body.appendChild(newEl);
  ```

### Events
  ```javascript
  el.addEventListener("click", () => console.log "Clicked"));
  ```

## 5. Modern JavaScript Development

### Fetch API
- HTTP requests:
  ```javascript
  fetch('https://api.example.com/data')
    .then(res => res.json())
    .then(data => console.log(data))
    .catch(err => console.error(err));
  ```

### ES Modules in Browser
  ```html
  <script type="module" src="main.js"></script>
  ```

### Strict Mode
- Enforces better practices:
  ```javascript
  "use strict";
  x = 10; // Error: x is not defined
  ```

### Optional Chaining (`?.`)
  ```javascript
  const user = { profile: { name: "Alice" } };
  console.log(user?.profile?.name); // Alice
  console.log(user?.address?.city); // undefined
  ```

### Nullish Coalescing (`??`)
  ```javascript
  const value = 0 ?? "default"; // 0 (not "default")
  ```

### Logical Assignment Operators
  ```javascript
  let x = 0;
  x ||= 10; // x = 10 if x is falsy
  x &&= 20; // x = 20 if x is truthy
  x ??= 30; // x = 30 if x is null/undefined
  ```

## 6. Practical Skills for JS Developers

### Debugging
- Use `console.log`, `console.error`, `console.table`.
- Browser DevTools: Breakpoints, watch expressions.
- Tools: VS Code debugger, Chrome DevTools.

### Package Management
- **npm/yarn**:
  ```bash
  npm init -y
  npm install lodash
  ```
  ```javascript
  import _ from 'lodash';
  ```

### Build Tools
- **Webpack**, **Vite**, **Parcel**: Bundle JS, CSS, assets.
- **Babel**: Transpile modern JS for older browsers.
- **ESLint**: Enforce code quality.

### Frameworks/Libraries
- **React**:
  ```javascript
  import React, { useState } from 'react';
  function Counter() {
    const [count, setCount] = useState(0);
    return <button onClick={() => setCount(count + 1)}>{count}</button>;
  }
  ```
- **Vue**, **Angular**, **Svelte**: Other popular choices.
- **Node.js**: Server-side JavaScript.

### Testing
- **Unit Testing**: Jest, Mocha, Chai.
  ```javascript
  // Jest example
  test('adds 1 + 2 to equal 3', () => {
    expect(1 + 2).toBe(3);
  });
  ```
- **E2E Testing**: Cypress, Playwright.

### Performance Optimization
- **Debouncing/Throttling**:
  ```javascript
  function debounce(fn, delay) {
    let timeout;
    return (...args) => {
      clearTimeout(timeout);
      timeout = setTimeout(() => fn(...args), delay);
    };
  }
  ```
- **Lazy Loading**: Load scripts/images on demand.
- **Memoization**: Cache expensive computations.

