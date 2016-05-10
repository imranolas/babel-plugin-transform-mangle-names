# babel-plugin-transform-mangle-names
An ES2015-aware Babel plugin to generate shorter names for variables and function arguments.

## Installation

```sh
$ npm install babel-plugin-transform-mangle-names
```

## Usage

### Via `.babelrc` (Recommended)

**.babelrc**

```js
{
  "plugins": ["transform-mangle-names"]
}
```

### Via CLI

```sh
$ babel --plugins transform-mangle-names script.js
```

## Example

**In**
```javascript
const SEPARATOR = ' ';

function joinNames(first, second) {
  return `${first}${SEPARATOR}${second}`;
}

const reverseName = (name) => name.split('').reverse().join('');

class Person {
  constructor(firstName, lastName, age) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.age = age;
  }

  get fullName() {
    return joinNames(this.firstName, this.lastName);
  }

  reverseName() {
    return reverseName(this.fullName);
  }

  toString() {
    return `${this.fullName} (${this.age} years old)`;
  }
}

const person = new Person("Gnome", "Chompski", 85); // https://youtu.be/8mjky2QE9DA
```

**Out**
```javascript
const a = ' ';

function joinNames(c, d) {
  return `${ c }${ a }${ d }`;
}

const reverseName = c => c.split('').reverse().join('');

class Person {
  constructor(c, d, e) {
    this.firstName = c;
    this.lastName = d;
    this.age = e;
  }

  get fullName() {
    return joinNames(this.firstName, this.lastName);
  }

  reverseName() {
    return reverseName(this.fullName);
  }

  toString() {
    return `${ this.fullName } (${ this.age } years old)`;
  }
}

const b = new Person("Gnome", "Chompski", 85); //https://youtu.be/8mjky2QE9DA
```
