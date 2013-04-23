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

Choco-Script has the familiar C-Style syntax, not much different from Javascript. 

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
-----------

```js
class Chicken {
	
};
```

Access specifiers - Class can have public and private varriables and functions
------------------------------------------------------------------------------
```js
class Chicken {
	public var color;
	private var taste;
};
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

Public items are accessed using the 'this' keyword and private items directly

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

