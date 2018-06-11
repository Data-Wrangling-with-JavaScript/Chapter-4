"use strict";

const fs = require('fs');
const buffer = fs.readFileSync("./data/earthquakes.bin");

const numRecords = buffer.readInt32LE(0);

let bufferOffset = 4;
const records = [];

for (let recordIndex = 0; recordIndex < numRecords; ++recordIndex) {
    
    const time = buffer.readDoubleLE(bufferOffset);

    const record = {
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
