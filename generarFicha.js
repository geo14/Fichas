// @ts-check
const newman = require('C:/Users/Geovanny/AppData/Roaming/npm/node_modules/newman'),
	  fs = require('fs');

var myArgs = process.argv.slice(2);
let today = Date.now();
let todayDate = new Date(today);
var finalDate = todayDate.getDate() + '_' + (todayDate.getMonth() + 1);
var fileName = './responses/response' + myArgs[0] + '_' + finalDate + '.html';

newman.run({
	collection: require('./ObtenerFicha' + myArgs[0] + '.postman_collection.json'),
	environment: require('./Fichas' + myArgs[0] + '.postman_environment.json'),
	reporters: 'cli',
	timeout: 999999999,
	timeoutScript: 999999999
}).on('request', function (error, args) {
	if (error) {
		console.error(error);
		process.exit();
	}
	else {
		fs.writeFile(fileName, args.response.stream, function (error) {
			if (error) { 
				console.error(error); 
			}
		});	
		if(args.request.url.path[0].includes('GeneradorFichas')) {
			while(true) {
				let ts = Date.now();
				let date_ob = new Date(ts);
				var n = date_ob.getMinutes();
				//var n = date_ob.getSeconds();
				console.log('...Esperando para ingresar...'); 
				if(n === 0) {
					break;
				}
			}
		} else if(args.request.url.path[0].includes('VerificaIngreso') && args.response.responseSize < 5000) {
			console.error('Error en login');
			//process.exit();
		}
	}
}).on('done', function (error, args) {
	if (error) {
		console.error(error);
	}
	else {
		getPositions();
	}
});

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