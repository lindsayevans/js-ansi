// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS
// @output_file_name ansi.min.js
// ==/ClosureCompiler==

/*!
 * JS-ANSI 0.0.1a - JavaScript library for the parsing & display of ANSI art
 *
 * Copyright (c) 2011 Lindsay Evans <http://linz.id.au/>
 * Licensed under the MIT <http://www.opensource.org/licenses/mit-license.php> license.
 */

/*jslint eqeqeq: true */

(function(){

	// ANSI(...) shortcut
	var _ANSI = function(){
		return _ANSI.parse(arguments);
	};

	// Metadata
	_ANSI.meta = {
		type: 'library',
		name: 'ANSI',
		major_version: 0,
		minor_version: 0,
		patch_version: 1,
		special_version: 'a',
		version: '0.0.1a',
		globals: ['ANSI', '$A']
	};


	// Public properties


	// Public methods

	// noConflict
	// Give control of $A back
	_ANSI.noConflict = function(remove_all){

		remove_all ? window.ANSI = window.$A = old_ANSI : window.$A = old_ANSI;

		return _ANSI;

	};
	

	// Do it
	_ANSI.parse = function(ansi){

		var html = '', value, m_chunk, index = 0;

		while((m_chunk = ansi_escape_regex.exec(ansi)) !== null){

//console.log(m_chunk);

			value = '<span class="ansi-esc-' + m_chunk[2] + '-' + m_chunk[3] + '">';

			value += escape_ansi(m_chunk[4]);

			value += '</span>';

			html += value;

	//			value = ansi[index++] || '';

			//specifier_function = specifier_function_map[specifier];
			//value = specifier_function.call(Stringifier, value, specifier);
			//value = apply_flags(value, flags, width, precision, length, specifier);

			//if(specifier === '%'){
			//	index--;
			//}
		}

console.log(html)
		return html;

	}

	function escape_ansi(ansi){
		var ansi_html = '', i = ansi.length;

		while(i--){

			// Newline
			if(ansi.charCodeAt(i) === 13 || ansi.charCodeAt(i) === 10){
				// Skip first line
				if(i !== 0){
					ansi_html += "\n";
				}
				continue;
			}

			ansi_html += '&#x' + (ansi.charCodeAt(i) + 2415) + ';';
		}

		return ansi_html;

	}


	// Private properties
	var
		ansi_escape_regex = /\x1B\x5B([=?]*)([;0-9]*)([HfABCDRsuJKmhl;p]+)([^\x1B\x5B]+)/g
	;

	// Keep existing ANSI around for noConflict()
	var old_ANSI = window.ANSI;

	// Expose in globals
	window.ANSI = window.$A = _ANSI;

})();










function __ansify_old($canvas, ansi){
/*

° - 176
± - 177
² - 178

&#x2591;
&#x2592;
&#x2593;

*/

	var /*$canvas = $('#test-canvas'), ansi = $('#test-animation').text(), */ansi_html = '', code, i = 0, ansi_length = ansi.length;

	for(; i < ansi_length; i++){

		console.log(i, ansi.charAt(i) + ' - ' + ansi.charCodeAt(i))

		// Escape sequence, bitches!
		// http://isthe.com/chongo/tech/comp/ansi_escapes.html
		// http://en.wikipedia.org/wiki/ANSI_escape_code
		if(ansi.charCodeAt(i) === 27 && ansi.charCodeAt(i + 1) === 91){
			// FIXME: wrong - need to lookahead to 'm' or whatever
			code = ansi.substr(i + 2, 2);
			i += 5; 
			ansi_html += '</span><span class="ansi-esc-' + code + '">';
		}

		// Newline
		if(ansi.charCodeAt(i) === 13 || ansi.charCodeAt(i) === 10){
			// Skip first line
			if(i !== 0){
				ansi_html += "\n";
			}
			continue;
		}

		// Regular old character
		ansi_html += '&#x' + (ansi.charCodeAt(i) + 2415) + ';'; // TODO: Any cases where 2415 isn't right?

	}
//console.log(ansi_html)
}


