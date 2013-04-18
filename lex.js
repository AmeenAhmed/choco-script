
var lex = {
	rules: []
};


function addRule(rule, fn) {
	lex.rules.push([rule, fn]);
}






exports.lexer = function() {

	addRule('\/\/(.)*\n', function() {
		return '/* Skip single line comment */';
	});

	addRule('\\/\\*[^]*\\*\\/', function() {
		return '/* Skip multi-line comment */';
	});

	addRule("\\s+", function() {
		return '/* Skip white spaces */';
	});

	return lex;
};

console.log(exports.lexer());


