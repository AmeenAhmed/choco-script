#!/usr/bin/env node

var choco = require('../lib/chocoscript');
var preprocessor = require('../lib/preprocessor');
var _ = require('underscore');

var args = process.argv;


if(args.length <= 2) {
	console.log('usage chocoscript <filename> [-c]');
	process.exit(0);
}

var compile = _.find(args, function(item){ 
	return item === '-c';
});

var echo = _.find(args, function(item) {
	return item === "-s";
});

var filename = args[2];



var file = preprocessor.preprocess(filename);

if(compile || echo) {
	var source = choco.compile(file, true);

	if(compile) {
		var filename = filename.split('.')[0] + '.js';
		fs.writeFileSync(filename, target, 'utf-8');
	}
	if (echo) {
		console.log(source);
	}
} else {
	choco.run(file, true);	
}
