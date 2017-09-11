'use strict';

var fs = require('fs');
var moment = require('moment');

var records = JSON.parse(fs.readFileSync('./data/earthquakes.json', 'utf8'));

var bufferSize = 4 + 8 * 5 * records.length;
var buffer = new Buffer(bufferSize);

buffer.writeInt32LE(records.length);

var bufferOffset = 4;

for (var recordIndex = 0; recordIndex < records.length; ++recordIndex) {

    var record = records[recordIndex];
    var time = moment(record.Time).toDate().getTime();
    buffer.writeDoubleLE(time, bufferOffset);
    bufferOffset += 8;

    buffer.writeDoubleLE(record.Latitude, bufferOffset);
    bufferOffset += 8;

    buffer.writeDoubleLE(record.Longitude, bufferOffset);
    bufferOffset += 8;

    buffer.writeDoubleLE(record.Depth_Km, bufferOffset);
    bufferOffset += 8;

    buffer.writeDoubleLE(record.Magnitude, bufferOffset);
    bufferOffset += 8;
}

fs.writeFileSync('./output/earthquakes.bin', buffer);
