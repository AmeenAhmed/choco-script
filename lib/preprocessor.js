var fs = require('fs');


function load(fn, isString) {
	
	var file = fn;

	if(!isString) {
		file = fs.readFileSync(fn,'utf-8');	
	}
	

	file = file.replace(/\/\/.*/, '');
	var imports = file.match(/import ('[^']*')/g);
	
	
	
	if(imports) {
		imports = imports.reverse();
		
		file = file.replace(/import ('[^']*';)/g, '');
		for(var i=0; i<imports.length; i++) {
			var f = imports[i].replace('import ', '').replace(/'/g,'').replace(/\./,'/');
			
			if(fs.existsSync(process.cwd() + '/' + f + '.choco')) {
				
				file = load(process.cwd() + '/' + f + '.choco') + '\n' + file;
				
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



exports.preprocess = function(str, isString) {
	return load(str, isString);
}