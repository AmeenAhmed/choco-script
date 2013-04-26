var parser = require('./parser').parser;
var fs = require('fs');
var util = require('util');
var _ = require('underscore');
var vm = require('vm');


exports.compile = function() {

	var args = process.argv;


	if(args.length <= 2) {
		console.log('usage chocoscript <filename> [-c]');
		process.exit(0);
	}

	var compile = _.find(args, function(item){ 
		return item === '-c';
	});

	var filename = args[2];

	var file = load(filename);

	function load(fn) {
		
		var file = fs.readFileSync(fn,'utf-8');

		file = file.replace(/\/\/.*/, '');
		var imports = file.match(/import ('[^']*')/g);
		
		
		
		if(imports) {
			imports = imports.reverse();
			
			file = file.replace(/import ('[^']*';)/g, '');
			for(var i=0; i<imports.length; i++) {
				var f = imports[i].replace('import ', '').replace(/'/g,'').replace(/\./,'/');
				
				if(fs.existsSync('./' + f + '.choco')) {
					
					file = load('./' + f + '.choco') + '\n' + file;
					
				} else {
					console.log('Error : cannot find file ' + f + '.choco');
					return null;
				}
			}	
			return file;
		} else {
			return file;
		}
	}


	var ast = parser.parse(file);


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
		
		if(compile) {
			target += temp + ';';	
		} else {
			vm.runInContext(temp, context);
		}
		
	}

	if(compile) {
		target += '})();';
		var filename = filename.split('.')[0] + '.js';
		fs.writeFileSync(filename, target, 'utf-8');
	}
}



