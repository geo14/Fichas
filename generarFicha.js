// @ts-check
const newman = require('./npm/node_modules/newman'),
	  fs = require('fs');

var myArgs = process.argv.slice(2);

let today = Date.now();
let todayDate = new Date(today);
var finalDate = todayDate.getDate() + '_' + (todayDate.getMonth() + 1);
var fileName = './responses/response' + myArgs[0] + '_' + finalDate + '.html';

newman.run({
	collection: require('./Collections/ObtenerFicha' + myArgs[0] + '.postman_collection.json'),
	environment: require('./Fichas/Fichas' + myArgs[0] + '.postman_environment.json'),
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
		} else if(args.request.url.path[0].includes('VerificaIngreso') && args.response.responseSize < 4200) {
			console.log('Error en login');
			process.exit();
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
		var index = text.indexOf('Ficha No. ');
		var index2 = text.indexOf(')', index);
		var number = text.substring(index + 10, index2);
		console.log('Exito revisar correo, el valor para ' + myArgs[0] + ' es: ' + number);
	  });
}