// @ts-check
const fs = require('fs');
const execFileSync = require('child_process');

var myArgs = process.argv.slice(2);
var directoryPath = './Fichas';

fs.readdir(directoryPath, function (err, files) {
	//handling error
	if (err) {
		return console.log('Unable to scan directory: ' + err);
	}
	//listing all files using forEach
	files.forEach(function (file) {
		modifyFile('./Fichas/' + file);
	});
});

execFileSync.exec('git add *', (error, stdout) => {
	if (error) {
		console.error(`exec error in add: ${error}`);
		return;
	}
	console.log(stdout);
	execFileSync.exec('git commit -m "Changing store number to: ' + myArgs[0], (error, stdout) => {
		if (error) {
			console.error(`exec error in commit: ${error}`);
			return;
		}
		console.log(stdout);
		execFileSync.exec('git push', (error, stdout) => {
			if (error) {
				console.error(`exec error in push: ${error}`);
				return;
			}
			console.log(stdout);
		});
	});
});

function modifyFile(currentFileName) {
	fs.readFile(currentFileName, (err, data) => {
		if (err) throw err;
		var text = data.toString();
		var index = text.indexOf('value"');
		index = index + 9;
		text = text.substring(0, index) + myArgs[0] + text.substring(index + 1, text.length);
		fs.writeFile(currentFileName, text, function (error) {
			if (error) {
				console.error(error);
			}
		});
	});
}

