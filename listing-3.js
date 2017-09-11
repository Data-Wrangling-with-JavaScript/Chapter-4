'use strict';

var fs = require('fs');
var buffer = fs.readFileSync('./data/earthquakes.bin');

var numRecords = buffer.readInt32LE(0);

var bufferOffset = 4;
var records = [];

for (var recordIndex = 0; recordIndex < numRecords; ++recordIndex) {
    
    var time = buffer.readDoubleLE(bufferOffset);

    var record = {
        Time: new Date(time),
        Latitude: buffer.readDoubleLE(bufferOffset + 8),
        Longitude: buffer.readDoubleLE(bufferOffset + 16),
        Depth_Km: buffer.readDoubleLE(bufferOffset + 24),
        Magnitude: buffer.readDoubleLE(bufferOffset + 32),
    };

    bufferOffset += 8 * 5;

    records.push(record);
}

console.log(records);
