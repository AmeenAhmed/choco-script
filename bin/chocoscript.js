#!/usr/bin/env node

var choco = require('../lib/chocoscript');
var preprocessor = require('../lib/preprocessor');

var args = process.argv;


if(args.length <= 2) {
	console.log('usage chocoscript <filename> [-c]');
	process.exit(0);
}

var compile = _.find(args, function(item){ 
	return item === '-c';
});

var filename = args[2];



var file = preprocessor.preprocess(filename);

if(compile) {
	var source = choco.compile(file, true);
	var filename = filename.split('.')[0] + '.js';
	fs.writeFileSync(filename, target, 'utf-8');
} else {
	choco.run(file, true);	
}
