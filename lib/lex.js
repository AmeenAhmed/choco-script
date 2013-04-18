
var lex = {
	rules: []
};


function addRule(rule, fn) {
	lex.rules.push([rule, fn]);
}


var keywords = [

	'var',
	'function',
	'class',
	'private',
	'public',
	'elseif',
	'if',
	'else',
	'switch',
	'case',
	'default',
	'foreach',
	'for',
	'in',
	'while',
	'do',
	'return',
	'has',
	'define',
	'new',
	'static',
	'this',
	'true',
	'false',
	'null',
	'undefined'
];

var operators = [
	
	["<=",		"LE"],
	[">=",		"GE"],
	["<",		"LT"],
	[">",		"GT"],
	["==",		"EQ"],
	["!=",		"NEQ"],
	["<=",		"LE"],
	["\\+",		"+"],
	["-",		"-"],
	["*",		"*"],
	["\\/",		"/"],
	[";",		";"],
	["=",		"="],
	["\\(",		"("],
	["\\)",		")"],
	["\\[",		"["],
	["\\]",		"]"],
	[",",		","],
	[":",		":"],
	["&&",		"AND"],
	["\\|\\|",	"OR"],
	["!",		"NOT"],
	["\\{",		"{"],
	["\\}",		"}"],
	["\\.\\.",	".."],
	["\\.",		"."],
	["$",		"EOF"],

];





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

	
	var keywordsEnd = '(?![a-zA-Z0-9_$])';
	for(var i=0; i<keywords.length; i++) {
		(function(keyword) {
			addRule(keyword + keywordsEnd, function() {
				return keyword.toUpperCase();
			});	
		})(keywords[i]);
		
	}

	addRule("[0-9]+(?:\\.[0-9]+)?\\b", function() {
		return 'NUMBER';
	});

	addRule("\"[^\"]*\"", function() {
		return 'STRING';
	});

	addRule("'[^'']*'", function() {
		return 'STRING';
	});

	addRule("[a-zA-Z\\_\\$][a-zA-Z\\_0-9\\$]*", function() {
		return 'IDENTIFIER';
	});

	for(var i=0; i<operators.length; i++) {
		
		(function(opr) {
			addRule(opr[0], function() {
				return opr[1];
			});
		})(operators[i]);
	}

	return lex;
};




