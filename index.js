"use strict";

module.exports = function targetPrint(element, callback) {

	var wrapper = document.createElement('div');
    wrapper.classList.add('print-target-wrap')

    var body = document.getElementsByTagName('body')[0]
	
	element.parentNode.appendChild(wrapper);
    wrapper.appendChild(element);


	addStylesheetRules([
	  ['body',
	    ['visibility', 'hidden'],
	  ], 
	  ['.print-target-btn',
	    ['display', 'none']
	  ], 
	  ['.print-target-wrap', 
	    ['position', 'fixed'],
	    ['top', 0],
	    ['left', 0]
	  ],
	  ['.print-target-wrap > *', 
	    ['position', 'fixed'],
	    ['top', 0],
	    ['left', 0],
	   	['-webkit-print-color-adjust', 'exact']
	  ],
	  ['.print-target-wrap > * *', 
	    ['visibility', 'visible'],
	    ['-webkit-print-color-adjust', 'exact']
	  ]
	]);

    window.onafterprint = function(){
		var child = wrapper.children[0]
        wrapper.parentNode.appendChild(child)
        wrapper.parentNode.removeChild(wrapper);

		body.classList.remove('print-body');

      	window.onafterprint = null
      	removeStyleSheet()
      	if(callback) {callback()}
    }

    window.print()
}

function removeStyleSheet () {
	var sheet = document.getElementById('dom-target-printer-style');
	sheet.disabled = true;
	sheet.parentNode.removeChild(sheet);
}

function addStylesheetRules (rules) {
  var styleEl = document.createElement('style'),
      styleSheet;



  // Append style element to head
  document.head.appendChild(styleEl);
  styleEl.setAttribute("id", "dom-target-printer-style");
  // Grab style sheet
  styleSheet = styleEl.sheet;

  let ruleStr = ""

  for (var i = 0, rl = rules.length; i < rl; i++) {
    var j = 1, rule = rules[i], selector = rules[i][0], propStr = '';
    // If the second argument of a rule is an array of arrays, correct our variables.
    if (Object.prototype.toString.call(rule[1][0]) === '[object Array]') {
      rule = rule[1];
      j = 0;
    }

    for (var pl = rule.length; j < pl; j++) {
      var prop = rule[j];
      propStr += prop[0] + ':' + prop[1] + (prop[2] ? ' !important' : '') + ';\n';
    }

	ruleStr += selector + '{' + propStr + '}';
    // Insert CSS Rule
    // styleSheet.insertRule(selector + '{' + propStr + '}', styleSheet.cssRules.length);
  }
  styleSheet.insertRule("@media print {" + ruleStr + "}")
}