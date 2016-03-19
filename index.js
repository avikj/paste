#!/usr/bin/env node
var program = require('commander'),
	prompt = require('prompt'),
	fs = require('fs'),
	PastebinAPI = require('pastebin-js');

program
	.version('0.0.1')
	.arguments('<filename> [title]')
	.action(function(filename, title){
		fs.stat(__dirname+'/pastebinAPIKey.txt', function(err, stat){

			// if the key has not already been saved
			if(err){
				prompt.start();	//prompt the user for their key
				prompt.get(['pastebinAPIKey'], function (err, result) {
					if(err) throw err;
					// write the key to pastebinAPIKey.txt
					fs.writeFile(__dirname+'/pastebinAPIKey.txt', result.pastebinAPIKey, function(err){
						if(err) throw err;
						// paste the file
						pasteIt(filename, title);
					});
				});
			}
			// if the key has already been saved
			else{
				// paste the file
				pasteIt(filename, title);
			}
		});
	})
	.parse(process.argv);

// precondition: API key has already been saved in pastebinAPIKey.txt
function pasteIt(filename, title){
	fs.readFile(__dirname+'/pastebinAPIKey.txt', 'utf8', function(err, data) {
	  if (err) throw err;
	  pastebin = new PastebinAPI(data);
	  pastebin
		.createPasteFromFile(filename, title?title:filename, extractFileFormat(filename))
		.then(function(data){
			console.log("http://pastebin.com/"+data);
		})
		.fail(function(err){
			// if paste failed, try to paste as plain text
			pastebin
				.createPasteFromFile(filename, title?title:filename)
				.then(function(data){
					console.log("http://pastebin.com/"+data);
				})
				.fail(function(err){
					console.log(err);
				});
		});
	});
}

function extractFileFormat(filename){
	if(filename.indexOf('.') == -1)
		return null;
	var ext =  filename.substring(filename.indexOf('.')+1);
	if(ext == 'js')
		return 'javascript';
	return ext;
}
