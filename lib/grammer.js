var Parser = require('jison').Parser;

var grammer = {
	'lex': {
		'rules': [

            ["\\/\\/(.)*\\n", "/* single line comment */"],

            ["\\/\\*[^]*\\*\\/",  "/* single line comment */"],

			["\\s+",											"/* skip whitespaces */"],


            ["var(?![a-zA-Z0-9_$])",            "return 'VAR'"],                                 //"return 'VAR';"],

            ["function(?![a-zA-Z0-9_$])",                                        "return 'FUNC';"],

            ["class(?![a-zA-Z0-9_$])",                                            "return 'CLASS';"],

            ["private(?![a-zA-Z0-9_$])",                                          "return 'PRIVATE';"],

            ["public(?![a-zA-Z0-9_$])",                                          "return 'PUBLIC';"],

            ["elseif(?![a-zA-Z0-9_$])",                                            "return 'ELSEIF';"],

            ["if(?![a-zA-Z0-9_$])",                                              "return 'IF';"],

            ["else(?![a-zA-Z0-9_$])",                                              "return 'ELSE';"],

            ["switch(?![a-zA-Z0-9_$])",                                              "return 'SWITCH';"],

            ["case(?![a-zA-Z0-9_$])",                                              "return 'CASE';"],

            ["default(?![a-zA-Z0-9_$])",                                           "return 'DEFAULT';"],

            ["foreach(?![a-zA-Z0-9_$])",                                               "return 'FOREACH';"],

            ["for(?![a-zA-Z0-9_$])",                                               "return 'FOR';"],

            ["in(?![a-zA-Z0-9_$])",                                               "return 'IN';"],            

            ["while(?![a-zA-Z0-9_$])",                                               "return 'WHILE';"],            

            ["do(?![a-zA-Z0-9_$])",                                               "return 'DO';"],

            ["return(?![a-zA-Z0-9_$])",                                               "return 'RETURN';"],

            ["has(?![a-zA-Z0-9_$])",                                               "return 'HAS';"],

            ["define(?![a-zA-Z0-9_$])",                                               "return 'DEFINE';"],

            ["new(?![a-zA-Z0-9_$])",                                               "return 'NEW';"],

            ["static(?![a-zA-Z0-9_$])",                                            "return 'STATIC';"],

            ["this(?![a-zA-Z0-9_$])",                                              "return 'THIS';"],

            ["true(?![a-zA-Z0-9_$])",                                               "return 'TRUE';"],
            ["false(?![a-zA-Z0-9_$])",                                              "return 'FALSE';"],
            ["null(?![a-zA-Z0-9_$])",                                               "return 'NULL';"],
            ["undefined(?![a-zA-Z0-9_$])",                                          "return 'UNDEFINED';"],

			["[0-9]+(?:\\.[0-9]+)?\\b",                          "return 'NUMBER'"],


            ["\"[^\"]*\"",                                      "return 'STRING';"],

            ["'[^'']*'",                                        "return 'STRING';"],            

            ["[a-zA-Z\\_\\$][a-zA-Z\\_0-9\\$]*",                      "return 'IDENTIFIER';"],



            ["<=",                                               "return 'LE';"],

            [">=",                                               "return 'GE';"],

            ["<",                                               "return 'LT';"],

            [">",                                               "return 'GT';"],

            ["==",                                               "return 'EQ';"],

            ["!=",                                               "return 'NEQ';"],

            ["\\+",                                               "return '+';"],

            ["-",                                               "return '-';"],

            ["\\*",                                               "return '*';"],

            ["\\/",                                               "return '/';"],

            [";",                                               "return ';';"],

            ["=",                                               "return '=';"],

            ["\\(",                                               "return '(';"],

            ["\\)",                                               "return ')';"],
            
            ["\\[",                                               "return '[';"],

            ["\\]",                                               "return ']';"],

            [",",                                               "return ',';"],

            [":",                                               "return ':';"],

            ["&&",                                               "return 'AND';"],

            ["\\|\\|",                                               "return 'OR';"],

            ["!",                                               "return 'NOT';"],

            ["\\{",                                               "return '{';"],

            ["\\}",                                               "return '}';"],

            ["\\.\\.",                                               "return '..';"],

            ["\\.",                                               "return '.';"],
            

            ["$",                                               "return 'EOF';"]
		]
	},
    
    //"tokens": "LT GT LE GE EQ NEQ NUMBER STRING EOF + - * / ; = AND OR NOT , VAR IDENTIFIER FUNC ",

    "operators": [
        ["left", "(", ")"],
        ["left", "AND", "OR", "NOT"],
        ["left", "+", "-"],
        ["left", "*", "/"],
        ["left", "LT","GT","LE","GE","EQ","NEQ"],
        ["left", "="],
        //["left", "VAR"],
        
    ],

    "start": "script",
    
	"bnf" : {
        "script": [
                    ["statements EOF",  "return $1"]
                    ],
        "statements": [
                        ["statement statements", "$$ = [$1, $2];"],//{type:'statement', val:$1}, {type:'statement', val:$2}
                        ["statement ", "$$ = [$1]"]
                        ],

        "statement": [
                        ["exp ;",       "$$ = $1;"],
                        ["assign ;",    "$$ = $1;"],
                        ["var_decl ", "$$ = $1;"],
                        ["func_decl", "$$= $1;"],
                        ["func_call ;", "$$= $1;"],
                        ["class_decl ;", "$$=$1;"],
                        ["if_construct", "$$=$1"],
                        ["switch", "$$=$1"],
                        ["fordo", "$$=$1"],
                        ["forin", "$$=$1"],
                        ["while", "$$=$1"],
                        ["do", "$$=$1"],
                        ["foreach", "$$=$1"],
                        ["array_literal ;", "$$=$1"],
                        ["object_literal ;", "$$=$1"],
                        ["return ;", "$$=$1"],
                        ["has_keyword", "$$=$1"],
                        ["range", "$$=$1"],
                        
                        ["define ;", "$$=$1"],
                        ["new ;", "$$=$1"],

                        
                        ],
        "return":       [
                            ["RETURN array_statements", "$$={type:'return', val: $2}"]
                        ],

        "array_access": [
                            ["IDENTIFIER [ exp ]", "$$={type:'array_access', var:$1, val:$3};"],
                        ],
                        
                        
        "array_statements": [
                                ["exp ",       "$$ = $1;"],
                                ["assign ",    "$$ = $1;"],
                                ["func_decl", "$$= $1;"],
                                ["func_call ", "$$= $1;"],
                                ["new ;", "$$=$1"],
                                ["array_literal ", "$$=$1"],
                                ["object_literal ", "$$=$1"],
                            ],

        "forStatements":    [
                                ["forStatement , forStatements", "$$=[$1, $3]"],
                                ["forStatement", "$$=[$1]"]
                            ],

        "forStatement": [
                            ["exp",       "$$ = $1;"],
                            ["assign", "$$=$1"],
                            ["VAR IDENTIFIER", "$$=$2"],
                            ["VAR IDENTIFIER = exp", "$$={type: 'assignment', var: $2, val: $4};"],
                            ["func_call", "$$= $1;"],
                            ],

        "func_call_args_list": [
                                    [", exp func_call_args_list", "$$=[$2,$3];"], //"$$={type: 'func_call_arg', val: $2, list: $3};"
                                    [", exp", "$$=$2;"]//"$$={type: 'func_call_arg', val: $1};"
                                ],

        "func_call_list":   [
                                ["exp func_call_args_list", "$$=[$1, $2];"],//"$$={type:'func_call_arg', val: $1, list: $2}"
                                ["func_call func_call_args_list", "$$=[$1, $2];"],//"$$={type:'func_call_arg', val: $1, list: $2}"
                                ["new func_call_args_list", "$$=[$1, $2];"],//"$$={type:'func_call_arg', val: $1, list: $2}"
                                ["func_decl func_call_args_list", "$$=[$1, $2];"],//"$$={type:'func_call_arg', val: $1, list: $2}"
                                ["exp", "$$=$1"],
                                ["func_call", "$$=$1"],
                                ["new", "$$=$1"],
                                ["func_decl", "$$=$1"],

                            ],

        "func_call":    [
                            ["IDENTIFIER ( func_call_list )", "$$ = {type:'func_call', val:$1, args:[$3]};"],

                            ["IDENTIFIER ( )", "$$ = {type:'func_call', val:$1, args:null};"]
                        ],

        "func_decl_args_list": [
                                    [", identifier func_decl_args_list", "$$=[$2,$3];"], //"$$={type: 'func_call_arg', val: $2, list: $3};"
                                    [", identifier", "$$=$2;"]//"$$={type: 'func_call_arg', val: $1};"
                                ],

        "func_decl_list":   [
                                ["identifier func_decl_args_list", "$$=[$1, $2];"],//"$$={type:'func_call_arg', val: $1, list: $2}"
                                ["identifier", "$$=$1"]
                            ],


        "code_block":    [
                                ["{ }", "$$=null;"],
                                ["{ statements }", "$$=$2;"]
                            ],

        "func_decl":    [
                            ["FUNC IDENTIFIER ( func_decl_list ) code_block", "$$ = {type:'func', name:$2, args: [$4], block: $6};"],

                            ["FUNC IDENTIFIER ( ) code_block", "$$ = {type:'func', name:$2, args: null, block: $5};"],

                            ["FUNC ( ) code_block", "$$ = {type:'func', name:null, args: null, block: $4};"],

                            ["FUNC ( func_decl_list ) code_block", "$$ = {type:'func', name:null, args: [$3], block: $5};"],
                        ],

        
        "this":         [
                            ["THIS . assign", "$$={type:'this', val:$3}"],
                            ["THIS . identifier", "$$={type:'this', val:$3}"],
                            ["THIS . dot", "$$={type:'this', val:$3}"],
                            ["THIS", "$$={type:'this', val:null}"]
                        ],

        "class_statement": [
                                ["PRIVATE var_decl ", "$$={ type:'class_var_decl', visibility:'private', val:$2};"],
                                ["PUBLIC var_decl ", "$$={ type:'class_var_decl', visibility:'public', val:$2};"],
                                ["PRIVATE func_decl", "$$={ type:'class_func_decl', visibility:'private', val:$2};"],
                                ["PUBLIC func_decl", "$$={ type:'class_func_decl', visibility:'public', val:$2};"],
                                ["STATIC var_decl", "$$={type:'class_var_decl', visibility:'static', val:$2}"],
                                ["STATIC func_decl", "$$={type:'class_func_decl', visibility:'static', val:$2}"]  
                            ],

        "class_statements": [
                                ["class_statement class_statements", "$$=[$1,$2]"],
                                ["class_statement", "$$=[$1]"]
                            ],

        "class_block":  [
                            ["{ class_statements }", "$$=$2;"],
                            ["{ }", "$$=null;"]
                        ],

        "class_decl":   [
                            ["CLASS IDENTIFIER class_block", "$$={type:'class', name:$2, block:$3}"],
                            ["CLASS IDENTIFIER : PUBLIC IDENTIFIER class_block", "$$={type:'class', name:$2, base:$5, inherit:$4, block:$6}"]
                        ],

        "switch_block":     [
                                ["CASE exp : statements switch_block", "$$=[{type:'case', exp:$2, val:$4},$5];"],
                                ["CASE exp : switch_block", "$$=[{type:'case', exp:$2, val:null},$4];"],
                                ["CASE exp : statements", "$$=[{type:'case', exp:$2, val:$4}];"]

                            ],

        "switch":       [
                            ["SWITCH ( exp ) { switch_block }", "$$={type:'switch', exp:$3, block:$6};"],
                            ["SWITCH ( exp ) { switch_block DEFAULT : statements }", "$$={type:'switch', exp:$3, block:$6, default:$9};"],
                            ["SWITCH ( exp ) { }", "$$={type:'switch', exp:$3, block:null};"]
                        ],

        "else_ifs":     [
                            ["ELSEIF ( exp ) code_block else_ifs", "$$={type:'else_if', exp:$3, block:[$5, $6]};"],
                            ["ELSEIF ( exp ) code_block", "$$={type:'else_if', exp:$3, block:[$5]};"]
                        ],

        "if_construct":     [
                                ["IF ( exp ) code_block", "$$={type:'if', exp:$3, if_block:$5};"],
                                ["IF ( exp ) code_block else_ifs", "$$={type:'if', exp:$3, if_block:$5, else_ifs:$6};"],
                                ["IF ( exp ) code_block else_ifs ELSE code_block", "$$={type:'if', exp:$3, if_block:$5, else_ifs:$6, else_block:$8};"],
                                ["IF ( exp ) code_block ELSE code_block", "$$={type:'if', exp:$3, if_block:$5,  else_block:$7};"],
                                ["IF ( func_call ) code_block ELSE code_block", "$$={type:'if', exp:$3, if_block:$5,  else_block:$7};"],
                            ],
        "fordo":        [
                            ["FOR ( forStatements ; forStatements ; forStatements ) code_block", "$$={type:'for', exp1:$3, exp2:$5, exp3:$7, block:$9}"]
                            
                        ],

        "forin":    [
                        ["FOR ( IDENTIFIER IN forStatement ) code_block", "$$={type:'forin', var:$3, exp:$5, block:$7}"],
                        ["FOR ( VAR IDENTIFIER IN forStatement ) code_block", "$$={type:'forin', var:$4, exp:$6, block:$8}"]
                    ],
        "while":    [
                        ["WHILE ( forStatement ) code_block", "$$={type:'while', exp:$3, block:$5};"]
                    ],
        "do":       [
                        ["DO code_block WHILE ( forStatement )", "$$={type:'do',exp:$5, block:$2};"]
                    ],

        "foreach":  [
                        ["FOREACH ( identifier IN identifier ) code_block", "$$={type:'foreach', var: $3, array: $5, block: $7};"],
                        ["FOREACH ( identifier IN array_literal ) code_block", "$$={type:'foreach', var: $3, array: $5, block: $7};"],
                        ["FOREACH ( identifier IN range ) code_block", "$$={type:'foreach', var: $3, array: $5, block: $7};"]
                    ],

        "assign":     [
                            ["IDENTIFIER = exp", "$$ = {type: 'assignment', 'var': $1, val: $3};"],
                            ["IDENTIFIER = func_decl", "$$ = {type: 'assignment', 'var': $1, val: $3};"],
                            ["IDENTIFIER = func_call", "$$ = {type: 'assignment', 'var': $1, val: $3};"],
                            
                            ["IDENTIFIER = object_literal", "$$ = {type: 'assignment', 'var': $1, val: $3};"],
                            ["IDENTIFIER = array_literal", "$$ = {type: 'assignment', 'var': $1, val: $3};"],
                            ["IDENTIFIER = new", "$$ = {type: 'assignment', 'var': $1, val: $3};"],
                        ],

        "var_list_items": [
                                    
                                    [", IDENTIFIER", "$$=$2;"]
                                ],

        "var_list":   [
                                ["identifier , var_list ", "$$=[$1, $3];"],
                                ["assign , var_list ", "$$=[$1, $3];"],
                                
                                ["identifier", "$$=[$1];"],
                                ["assign", "$$=[$1];"],
        

                        ],

        "var_decl":     [
                               ["VAR identifier ;", "$$ = {type:'var_decl', val:$2};"], 
                               ["VAR identifier , var_list ;", "$$ = {type:'var_decl', val:[$2 , $4]};"], 
                               ["VAR assign ;",      "$$ = {type:'var_decl', val:$2};"], 
                               ["VAR assign , var_list ;",      "$$ = {type:'var_decl', val:[$2 , $4]};"], 
                          
                        ],
        "identifier":   [
                            ["IDENTIFIER",  "$$ = {type: 'identifier', val: $1};"],
                        ],

        "string":       [
                            ["STRING",      "$$ = {type: 'string', val: $1};"],
                        ],

        "number":       [
                            ["NUMBER",      "$$ = {type: 'number', val: $1};"]
                        ],

        "statement_list":   [
                                ["array_statements , statement_list", "$$=[$1,$3]"],
                                ["array_statements", "$$=[$1]"],
                            ],

        "array_literal":    [
                                ["[ ]", "$$={type:'array_literal', values:null}"],
                                ["[ statement_list ]", "$$={type:'array_literal', values:$2}"],
                            ],

        "key":              [
                                ["identifier", "$$=$1"],
                                ["string", "$$=$1"]
                            ],

        "key_value":         [
                                ["key : array_statements", "$$={type:'key',key:$1, value: $3}"]
                            ],

        "key_value_list":   [
                                ["key_value , key_value_list", "$$=[$1,$3]"],
                                ["key_value", "$$=[$1]"],
                            ],

        "object_literal":   [
                                ["{ }", "$$={type:'object_literal', values:null}"],
                                ["{ key_value_list }", "$$={type:'object_literal', values:$2}"],
                            ],

        "has_keyword":      [
                                ["IDENTIFIER HAS STRING", "$$={type:'has', obj:{type: 'identifier', val: $1}, key:{type: 'string', val: $3}}"]
                            ],
        "range":    [
                        ["[ NUMBER .. NUMBER ]", "$$={type:'range', start:$2, end:$4}"]
                    ],
        "dot":      [
                        ["IDENTIFIER . IDENTIFIER", "$$={type:'member', parent: {type: 'identifier', val: $1}, child:{type: 'identifier', val: $3}}"],
                        ["IDENTIFIER . func_call", "$$={type:'member', parent: {type: 'identifier', val: $1}, child:$3}"],
                        ["IDENTIFIER . assign", "$$={type:'member', parent: {type: 'identifier', val: $1}, child:$3}"],
                        ["array_literal . func_call", "$$={type:'member', parent: $1, child:$3}"],
                        ["object_literal . func_call", "$$={type:'member', parent: $1, child:$3}"],
                        ["array_literal . IDENTIFIER", "$$={type:'member', parent: $1, child:{type: 'identifier', val: $3}}"],
                        ["object_literal . IDENTIFIER", "$$={type:'member', parent: $1, child:{type: 'identifier', val: $3}}"],
                        ["range . IDENTIFIER", "$$={type:'member', parent: $1, child:{type: 'identifier', val: $3}}"],
                        ["range . func_call", "$$={type:'member', parent: $1, child:$3}"],
                        ["func_call . IDENTIFIER", "$$={type:'member', parent: $1, child:{type: 'identifier', val: $1}, child:{type: 'identifier', val: $3}}"],
                        ["func_call . func_call", "$$={type:'member', parent: $1, child:$3}"],
                        ["IDENTIFIER . dot", "$$={type:'member', parent: {type: 'identifier', val: $1}, child:$3}"],
                        ["array_literal . dot", "$$={type:'member', parent: $1, child:$3}"],
                        ["object_literal . dot", "$$={type:'member', parent: $1, child:$3}"],
                        ["func_call . dot", "$$={type:'member', parent: $1, child:$3}"],
                        ["range . dot", "$$={type:'member', parent: $1, child:$3}"]
                        
                    ],

        "define":   [
                        ["DEFINE identifier string", "$$={type:'define', name:$2, val:$3}"],
                        ["DEFINE identifier number", "$$={type:'define', name:$2, val:$3}"]
                    ],

        "new":      [
                        ["NEW func_call", "$$={type:'new', val:$2}"]
                    ],



		"exp":    [     
                        ["( exp )",     "$$= {type: 'bracketed', val:$2};"],
                        ["NUMBER",      "$$ = {type: 'number', val: $1};"],
                        ["STRING",      "$$ = {type: 'string', val: $1};"],
                        ["IDENTIFIER",  "$$ = {type: 'identifier', val: $1};"],
                        ["this ", "$$=$1"],
                        ["- exp", "$$={type:'unaryOp', op:$2, opr:'-'}"],
                        
                        ["dot", "$$=$1"],
                        ["array_access", "$$=$1"],
                        ["TRUE",  "$$ = {type: 'literal', val: $1};"],
                        ["FALSE",  "$$ = {type: 'literal', val: $1};"],
                        ["NULL",  "$$ = {type: 'literal', val: $1};"],
                        ["UNDEFINED",  "$$ = {type: 'literal', val: $1};"],
                        ["exp + exp",   "$$ = {type: 'arithOp', op1: $1, op2: $3, opr: $2};"],
                        ["exp - exp",    "$$ = {type: 'arithOp', op1: $1, op2: $3, opr: $2};"],
                        ["exp * exp",    "$$ = {type: 'arithOp', op1: $1, op2: $3, opr: $2};"],
                        ["exp / exp",    "$$ = {type: 'arithOp', op1: $1, op2: $3, opr: $2};"],
                        ["exp AND exp",    "$$ = {type: 'condition', op1: $1, op2: $3, opr: $2};"],
                        ["exp OR exp",    "$$ = {type: 'condition', op1: $1, op2: $3, opr: $2};"],
                        ["NOT exp",    "$$ = {type: 'condition', op: $2,  opr: $1};"],
                        ["exp LT exp",    "$$ = {type: 'relation', op1: $1, op2: $3, opr: $2};"],
                        ["exp GT exp",    "$$ = {type: 'relation', op1: $1, op2: $3, opr: $2};"],
                        ["exp LE exp",    "$$ = {type: 'relation', op1: $1, op2: $3, opr: $2};"],
                        ["exp GE exp",    "$$ = {type: 'relation', op1: $1, op2: $3, opr: $2};"],
                        ["exp EQ exp",    "$$ = {type: 'relation', op1: $1, op2: $3, opr: '==='};"],
                        ["exp NEQ exp",    "$$ = {type: 'relation', op1: $1, op2: $3, opr: '!=='};"]
                    ]

	}
}


var parser = new Parser(grammer);

var parserSource = parser.generate();


require('fs').writeFileSync('./lib/parser.js', parserSource, 'utf-8');




