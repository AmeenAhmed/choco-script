var _ = require('underscore');
var consts = {};
var classes = {};

function isArray(obj) {
    return Object.prototype.toString.call(obj) === '[object Array]';
}

exports.newStatement = newStatement;

function newStatement(node, dontAddSemicolon, checkForSuper) {
	
	var sc = (!dontAddSemicolon) ? '' : '';

	if(node.type === 'number' || 
		node.type === 'identifier' ||
		node.type === 'literal') {
		
		if(node.type === 'identifier' && consts[node.val] !== undefined) {
			return consts[node.val];
		}

		return node.val + sc;

	} else if(node.type === 'string') {

		node.val = node.val.substr(1).substr(0,node.val.length-2);
		var arr = node.val.match(/\${[^}]*}/g);
		
		var ret = '\'';
		if(arr) {
			var parts = node.val.split(/\${[^}]*}/g);
			
			ret += parts[0] + '\'';
			
			for(var i=0; i<arr.length; i++) {
				var var_val = arr[i].replace(/\$\{/,'').replace(/\}/,'');
				
				ret +=  ' + ' + var_val +' + \'' + parts[i+1] + '\'' ; 
			}	

			return ret;
		}
		
		return '\'' + node.val + '\'';
		
	} else if(node.type === 'arithOp') {
		return newExpression(node) + sc;
	} else if(node.type === 'var_decl') {
		return newVarDeclaration(node);
	} else if(node.type === 'assignment') {
		return newAssignment(node) + sc;
	} else if(node.type === 'condition') {
		return newExpression(node) + sc;
	} else if(node.type === 'relation') {
		return newExpression(node) + sc;
	} else if(node.type === 'if') {
		return newIf(node);
	} else if(node.type === 'switch') {
		return newSwitch(node);
	} else if(node.type === 'for') {
		return newFor(node);
	} else if(node.type === 'forin') {
		return newForIn(node);
	} else if(node.type === 'while') {
		return newWhile(node);
	} else if(node.type === 'do') {
		return newDo(node);
	} else if(node.type === 'array_literal') {
		return newArrayLiteral(node);
	} else if(node.type === 'object_literal') {
		return newObjectLiteral(node);
	} else if(node.type === 'foreach') {
		return newForEach(node);
	} else if(node.type === 'func') {
		return newFunction(node);
	} else if(node.type === 'return') {
		return newReturn(node);
	} else if(node.type === 'func_call') {
		return newFunctionCall(node, checkForSuper);
	} else if(node.type === 'has') {
		return newHas(node);
	} else if(node.type === 'range') {
		return newRange(node);
	} else if(node.type === 'member') {
		return newMember(node);
	} else if(node.type === 'define') {
		return newDefine(node);
	} else if(node.type === 'class') {
		return newClass(node);
	} else if(node.type === 'new') {
		return newNew(node);
	} else if(node.type === 'this') {
		return newThis(node);
	} else if(node.type === 'unaryOp') {
		return node.opr + newStatement(node.op);
	} else if(node.type === 'array_access') {
		return newArrayAccess(node);
	} else if(node.type	=== 'module') {
		console.log(node);
		return newModule(node);

	}

}

function newReturn(node) {
	return 'return ' + newStatement(node.val, true) + ';';
}

function newArithmeticOperation(node) {
	if(node.type === 'number' || 
		node.type === 'identifier' ||
		node.type === 'literal') {
		

		if(node.type === 'identifier' && consts[node.val] !== undefined) {
			return consts[node.val];
		}

		return node.val;

	}

	if(node.type === 'string') {

		node.val = node.val.substr(1).substr(0,node.val.length-2);
		var arr = node.val.match(/\${[^}]*}/g);
		
		var ret = '\'';
		if(arr) {
			var parts = node.val.split(/\${[^}]*}/g);
			
			ret += parts[0] + '\'';
			
			for(var i=0; i<arr.length; i++) {
				var var_val = arr[i].replace(/\$\{/,'').replace(/\}/,'');
				
				ret +=  ' + ' + var_val +' + \'' + parts[i+1] + '\'' ; 
			}	

			return ret;
		}
		
		return '\'' + node.val + '\'';
		
	}

	if(node.type === 'bracketed') {
		return '(' + newArithmeticOperation(node.val) + ')';
	}

	if(node.type === 'arithOp') {
		return newArithmeticOperation(node.op1) + node.opr + 
				newArithmeticOperation(node.op2);
	}
	if(node.type === 'array_access') {
		return newArrayAccess(node);
	}

}

function newVarDeclaration(node, DontSayVar) {
	var v = (DontSayVar) ? DontSayVar : 'var ';
	if(isArray(node)) {
		var arr = '';
		for(var i=0; i<node.length; i++) {
			
			arr += newVarDeclaration(node[i], DontSayVar);
		}
		return arr;
	}

	if(node.type === 'var_decl') {
		return newVarDeclaration(node.val, DontSayVar);
	}

	if(node.type === 'identifier') {
		return v + node.val + ';';
	}

	if(node.type === 'assignment') {
		return v + newAssignment(node) + ';';
	}

	if(node.type === 'if') {
		return  + newIf(node);
	}	
}


function newAssignment(node) {
	
	return node.var + '=' + newExpression(node.val);
}

function newExpression(node) {


	if(node.type === 'number' || 
		node.type === 'identifier' ||
		node.type === 'literal') {
		
		return node.val;

	} 

	if(node.type === 'string') {

		node.val = node.val.substr(1).substr(0,node.val.length-2);
		var arr = node.val.match(/\${[^}]*}/g);
		
		var ret = '\'';
		if(arr) {
			var parts = node.val.split(/\${[^}]*}/g);
			
			ret += parts[0] + '\'';
			
			for(var i=0; i<arr.length; i++) {
				var var_val = arr[i].replace(/\$\{/,'').replace(/\}/,'');
				
				ret +=  ' + ' + var_val +' + \'' + parts[i+1] + '\'' ; 
			}	

			return ret;
		}
		
		return '\'' + node.val + '\'';
		
	}

	if(node.type === 'bracketed') {
		return '(' + newExpression(node.val) + ')';
	}

	if(node.type === 'condition') {

		if(node.opr === '!') {
			return node.opr + newExpression(node.op);
		}
		return newExpression(node.op1) + node.opr + 
				newExpression(node.op2);
	}

	if(node.type === 'arithOp') {
		return newExpression(node.op1) + node.opr + 
				newExpression(node.op2);
	}

	if(node.type === 'relation') {
		return newExpression(node.op1) + node.opr + 
				newExpression(node.op2);
	}

	if(node.type === 'func') {
		return newFunction(node);
	}

	if(node.type === 'func_call') {
		return newFunctionCall(node);
	}

	if(node.type === 'array_literal') {
		return newArrayLiteral(node);
	}

	if(node.type === 'object_literal') {
		return newObjectLiteral(node);
	}

	if(node.type === 'new') {
		return newNew(node);
	}

	if(node.type === 'this') {
		return newThis(node);
	}
	if(node.type === 'member') {
		return newMember(node);
	}
	if(node.type === 'array_access') {
		return newArrayAccess(node);
	}
}


function newIf(node) {
	var ret='';
	if(node.if_block) {
		var statements = _.flatten(node.if_block);
		ret += 'if(' + 
				newExpression(node.exp) +
				') { ';
		for(var i=0;i<statements.length;i++) {
			
			ret += newStatement(statements[i]); 
		}
		ret += ' } ';
	}

	if(node.else_ifs) {
		var statements = _.flatten(node.else_ifs.block)
		ret += 'else if(' +
				newExpression(node.else_ifs.exp) +
				') { ';
		for(var i=0;i<statements.length;i++) {
			
			ret += newStatement(statements[i]); 
		}

		ret += ' } ';		
	}

	if(node.else_block) {
		var statements = _.flatten(node.else_block);
		ret += 'else { ';
		for(var i=0;i<statements.length;i++) {
			
			ret += newStatement(statements[i]); 
		}

		ret += ' } ';			
	}

	return ret;
}

function newSwitch(node) {
	var ret = '';
	ret += 'switch(' + newExpression(node.exp);
	ret += ') { ';
	
	var cases = _.flatten(node.block);
	
	
	
	for(var i=0;i<cases.length;i++) {
		ret += 'case ';
		ret += newExpression(cases[i].exp);
		ret += ': ';
		if(cases[i].val) {
			var statements = _.flatten(cases[i].val);
			
			for(var j=0;j<statements.length;j++) {
				ret += newStatement(statements[j]);
			}
			ret += 'break; ';
		}
		
		
		
	}
	if(node.default) {
		ret += ' default:';
		var statements = _.flatten(node.default);
		
		for(var j=0;j<statements.length;j++) {
			ret += newStatement(statements[j]);
		}
	}
	ret += '}';

	return ret;
}

function newFor(node) {
	var ret = 'for(';
	var statements = _.flatten(node.exp1);
	for(var i=0; i<statements.length; i++) {
		ret += (i) ? ',' : '';
		ret += newStatement(statements[i], true);
	}
	ret += ';';
	statements = _.flatten(node.exp2);
	for(var i=0; i<statements.length; i++) {
		ret += (i) ? ',' : '';
		ret += newStatement(statements[i], true);
	}
	ret += ';';
	statements = _.flatten(node.exp3);
	for(var i=0; i<statements.length; i++) {
		ret += (i) ? ',' : '';
		ret += newStatement(statements[i], true);
	}
	ret += '){ ';
	if(node.block) {
		var statements = _.flatten(node.block);
		for(var i=0; i<statements.length; i++) {
			ret += newStatement(statements[i]);
		}
	}
		

	ret += ' }';
	return ret;
}

function newForIn(node) {
	var ret = 'for(var ';
	ret += node.var;
	ret += ' in ';
	ret += newStatement(node.exp,true);
	ret += '){ ';
	if(node.block) {
		var statements = _.flatten(node.block);
		for(var i=0; i<statements.length; i++) {
			ret += newStatement(statements[i]);
		}
	}
	ret += ' }';
	return ret;
}

function newWhile(node) {
	var ret = 'while(';
	ret += newStatement(node.exp,true);
	ret += '){ ';
	if(node.block) {
		var statements = _.flatten(node.block);
		for(var i=0; i<statements.length; i++) {
			ret += newStatement(statements[i]);
		}
	}
	ret += ' }';
	return ret;	
}

function newDo(node) {
	var ret = 'do{ ';
	if(node.block) {
		var statements = _.flatten(node.block);
		for(var i=0; i<statements.length; i++) {
			ret += newStatement(statements[i]);
		}
	}
	ret += ' } while(';
	ret += newStatement(node.exp,true);
	ret += ');';
	
	
	return ret;	
}

function newArrayLiteral(node) {
	var ret = '[';
	if(node.values) {
		var statements = _.flatten(node.values);
		for(var i=0; i<statements.length; i++) {
			ret += (i) ? ',' : '';
			ret += newStatement(statements[i], true);
		}
	}
	ret += ']';
	return ret;
}

function newKeyValue(node) {
	var ret = '';
	ret += newStatement(node.key, true);
	ret += ' : ';
	ret += newStatement(node.value, true);
	return ret;
}

function newObjectLiteral(node) {
	var ret = '{ ';
	if(node.values) {
		var statements = _.flatten(node.values);
		for(var i=0; i<statements.length; i++) {
			ret += (i) ? ',' : '';
			ret += newKeyValue(statements[i], true);
		}
	}
	ret += ' };';
	return ret;
}

function newForEach(node) {
	var ret = 'for(var __i=0;__i<';

	ret += newStatement(node.array, true) + '.length;';

	ret += '__i+=1){ ';

	ret += 'var ' + newStatement(node.var, true);

	ret += ' = ' +  newStatement(node.array, true) + '[__i];';

	if(node.block) {
		var statements = _.flatten(node.block);
		for(var i=0; i<statements.length; i++) {
			
			ret += newStatement(statements[i]);
		}
	}

	ret += ' }';
	
	return ret;

}

function newFunction(node, onObject, checkForSuper) {
	
	var __obj = 'function ';
	var eq = '';
	if(onObject) {
		__obj = onObject + '.';
		eq = ' = function';
	}

	var ret = __obj;
	if(node.name) {
		ret += node.name + eq;	
	}
	
	ret += '(';

	if(node.args) {
		var statements = _.flatten(node.args);
		for(var i=0; i<statements.length; i++) {
			ret += (i) ? ',' : '';
			ret += newStatement(statements[i], true);
		}
	}
	ret += '){ ';

	if(node.block) {
		var statements = _.flatten(node.block);
		for(var i=0; i<statements.length; i++) {
			
			ret += newStatement(statements[i],false, checkForSuper) + ';';
		}
	}

	ret += ' }';

	return ret;
}

function newFunctionCall(node,checkForSuper) {

	if(node.val === 'super') {
		var ret = '';
		ret += 'base = new ' + checkForSuper.name + '(';
		if(node.args) {
			var statements = _.flatten(node.args);
			
			for(var i=0; i<statements.length; i++) {
				ret += (i) ? ',' : '';
				ret += newStatement(statements[i], true);
			}
		}
		ret += ')'
		return ret;
	}
	var ret = '' + node.val + '(';
	
	if(node.args) {
		var statements = _.flatten(node.args);
		
		for(var i=0; i<statements.length; i++) {
			ret += (i) ? ',' : '';
			ret += newStatement(statements[i], true);
		}
	}

	ret += ')';

	return ret;
}

function newHas(node) {
	var ret = newStatement(node.obj,true) + 
				'.hasOwnProperty(' +
				newStatement(node.key, true) + ') '; 

	return ret;
}

function newRange(node) {
	var ret = '[';
	for(var i = +node.start,c = 0; i<= +node.end;i+=1, c+=1) {
		ret += (c) ? ',' : '';
		ret += i;
	}
	ret += ']';
	return ret;
}

function newMember(node) {
	var ret = '';
	ret += newStatement(node.parent, true);
	ret += '.';
	ret += newStatement(node.child, true);
	return ret;
}

function newDefine(node) {
	consts[newStatement(node.name, true)] = newStatement(node.val, true);
	return '';
}


function newClass(node) {
	var className = node.name;
	classes[className] = node;
	var ret = 'var ' + className + ' = (function() { ';
	var block = _.flatten(node.block);
	var privateVars = [];
	var privateMethods = [];

	var publicVars = [];
	var publicMethods = [];

	var staticVars = [];
	var staticMethods = [];

	var constructor = null;

	
	for(var i=0;i<block.length;i+=1) {
		var statement = block[i];
		if(statement.visibility === 'private') {
			if(statement.type === 'class_var_decl') {
				privateVars.push(statement);
			} else if(statement.type === 'class_func_decl') {
				privateMethods.push(statement);
			}
		}

		if(statement.visibility === 'public') {
			if(statement.type === 'class_var_decl') {
				publicVars.push(statement);
			} else if(statement.type === 'class_func_decl') {
				if(statement.val.name === className) {
					constructor = statement;
				} else {
					publicMethods.push(statement);	
				}
				
			}
		} 

		if(statement.visibility === 'static') {
			if(statement.type === 'class_var_decl') {
				staticVars.push(statement);
			} else if(statement.type === 'class_func_decl') {
				staticMethods.push(statement);
			}

		}

	}

	if(node.inherit) {
		ret += ' var base = {}; ';
	}

	for(var i=0; i<privateVars.length;i++) {
		var statement = privateVars[i].val;
		ret += newStatement(statement, true);
	}

	for(var i=0; i<privateMethods.length;i++) {
		var name = privateMethods[i].val.name;
		ret += ' var ' + name + ';';
	}

	ret += 'var __proto = {}; ';

	for(var i=0; i<publicVars.length;i++) {
		var var_node = publicVars[i].val;
		ret += newVarDeclaration(var_node, ' __proto.');
	}

	for(var i=0; i<publicMethods.length;i++) {
		var var_node = publicMethods[i].val;
		ret +=  newFunction(var_node,'__proto') + ';';
	}	

	for(var i=0; i<privateMethods.length;i++) {
		var method = privateMethods[i].val;
		var name = method.name;
		method.name = '';
		ret += name + '=(' + newFunction(method) + ').bind(__proto);';
	}

	if(constructor) {
		var method = constructor.val;
		method.name ='';
		ret += '(';
		var base = (node.base) ? {
			name:node.base
		} : null;
		ret += newFunction(method,null,base);
		ret += ').apply(__proto,Array.prototype.slice.call(arguments));'
	}

	if(node.inherit) {
		ret += 'return __extend(base,__proto);});';
	} else {
		ret += 'return __proto; });';	
	}

	for(var i=0; i<staticVars.length;i++) {
		var var_node = staticVars[i].val;
		ret += newVarDeclaration(var_node, className + '.');
	}

	for(var i=0; i<staticMethods.length;i++) {
		var var_node = staticMethods[i].val;
		ret +=  newFunction(var_node,className) + ';';
	}
	
	return ret;
}

function newNew(node) {
	return ' new ' + newFunctionCall(node.val);
}

function newThis(node) {
	return 'this.' + newStatement(node.val, true);
}

function newArrayAccess(node) {
	return node.var + '[' + newStatement(node.val) + ']';
}

function newModule(node) {
	var str = node.val.val;
	var name = (str.match('-')) ? str.replace('-','_').replace(/('|")/g,'') : str.replace(/('|")/g,'');

	return 'var ' + name + ' = require(' + str + ')';
}

