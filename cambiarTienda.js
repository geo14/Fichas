// @ts-check
const fs = require('fs');

var myArgs = process.argv.slice(2);

function getPositions() {
	fs.readFile(fileName, (err, data) => {
		if (err) throw err;
		var text = data.toString();
		var index = data.indexOf('<label class="col-form-label" style="font-size: 200px; display: block; text-align: center; color: #');
		index = index + 102;
		var number = text.substring(index, index + 2);
		var closing = number.indexOf('<');
		number = closing != -1 ? number.substring(0, closing) : number;
		console.log('La ficha para ' + myArgs[0] + ' es: ' + number);
	  });
}