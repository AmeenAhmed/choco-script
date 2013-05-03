# Choco-Script


A delicious language which compiles to javascript. 

#Installation

```sh
sudo npm install chocoscript -g
```

#Usage

```sh
# Run the code directly
chocoscript example.choco
```

```sh
# Compile the code to javascript
chocoscript example.choco -c
```

#Usage in code

```js
var choco = require('chocoscript');

// compile the code and return js
var js = choco.compile('var x = [1..10];');

// directly run the chocoscript code
choco.run('var x = [1..10];');
```

# Features

- No type coercion - Only '==' in ChocoScript and which translates to '==='
- Semicolon is mandatory
- Range literal eg: [0..7] which is an array with values from 0 to 7

```js
var array = [1..10];
```
- For Each loop

```js
var array = [1,2,3];

foreach(i in array) {
	console.log(array[i]);
}

```
- String Interpolation

```js
var name = 'Ameen';

// Stores 'Hello, Ameen'
var greet = 'Hello, ${name}';
```
- Has keyword - shortcut for the hasOwnProperty method

```js
var Batman = {
	description: 'I am Batman!!!'
}

// returns true
Batman has 'description'
```

- Define keyword - Defines a constant, works like a C macro

```js
define PI 3.14159

// Replaces the identifier PI with 3.14159
var area = PI * r * r;
```


# Class 

Declaration


```js
class Chicken {
	
}
```

Access specifiers - Class can have public and private varriables and functions

```js
class Chicken {
	public var color;
	private var taste;
}
```

Constructor - is defined by the same name as the class and should always be public

```js
class Chicken {
	public var color;
	private var taste;	

	public function Chicken(color) {
	
	}
}
```

Public members are accessed using the 'this' keyword and private items directly

```js
class Chicken {
	public var color;
	private var taste;	

	public function Chicken(color) {
		this.color = color;
		taste = 'As it always has. Awesome!!!';
	}
}
```

We can have static members

```js
class Chicken {
	public static var name = "Chicken Little";
}

console.log("Hello, " + Chicken.name);
```

Inheritance

```js
class Man {
	public var name;

	public function Man(name) {
		this.name = name;
	}
}

class SuperHero : public Man {
	public var superName;

	public function SuperHero(normalName, superName) {
		// call the base class's constructor
		super(normalName);

		this.superName = superName;
	}
}

var Batman = new SuperHero('Bruce Wayne', 'Batman');

```

Module and Import

```js

module 'http';

// translates to var http = require('http');

module 'node-test'

// translates to var node_test = require('node-test');

import 'hello';

// loads the moudle './hello.choco' in place

import 'hello.world';

// loads the module './hello/world.choco' in place
```

Currently 'import' just loads the file inplace before compilation, so all the variables are available directly.


Roadmap
--
- Namespaces
- Interface
- Operator overloading
- Source maps

The MIT License (MIT)
--

Copyright © 2013 Ameen Ahmed

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the “Software”), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED “AS IS”, WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.



