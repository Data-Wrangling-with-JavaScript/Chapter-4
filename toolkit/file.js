'use strict';

//
// Toolkit functions for reading and writing files.
//

var fs = require('fs');

//
// Read a text file form the file system.
//
var read = function (fileName) {
    return new Promise((resolve, reject) => {
        fs.readFile(fileName, 'utf8',
            function (err, textFileData) {
                if (err) {
                    reject(err);
                    return;
                }

                resolve(textFileData);
            }
        );
    });
};

//
// Write a text file to the file system.
//
var write = function (fileName, textFileData) {
	return new Promise((resolve, reject) => {
		fs.writeFile(fileName, textFileData,
			function (err) {
				if (err) {
					reject(err);
					return;
				}

				resolve();
			}
		);
	});
};

module.exports = {
	read: read,
	write: write,
};