var parser = require('./parser').parser;
var fs = require('fs');
var util = require('util');
var _ = require('underscore');
var vm = require('vm');
var preprocessor = require('./preprocessor');


exports.do = function(source, options) {

	var ast = parser.parse(source);


	var target = '(function() {';
	target += 'var __extend  = function(parent, child) {for(var prop in child){parent[prop] = child[prop];} return parent;};';
	

	__extend= function(parent, child) {
		for(var prop in child) {
			parent[prop] = child[prop];
		}

		return parent;
	}


	var context = vm.createContext(global);
	context.require = require;
		

	var nodes  =require('./nodes');

	ast = _.flatten(ast);

	for(var i=0; i<ast.length; i++) {
		
		var temp = nodes.newStatement(ast[i], true) + ';'; 
		
		if(options && options.compile) {
			target += temp + ';';	
		} else {
			vm.runInContext(temp, context);
		}
		
	}

	if(options && options.compile) {
		target += '})();';
		return target;
		
	}
}

exports.run = function(source, preprocessed) {
	if(!preprocessed) {
		preprocessor.preprocess(source, true);
	}
	exports.do(source);
}

exports.compile = function(source, preprocessed) {
	if(!preprocessed) {
		preprocessor.preprocess(source, true);
	}
	return exports.do(source, {compile: true});
}


