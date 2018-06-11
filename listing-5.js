"use strict";

const fs = require('fs');
const moment = require('moment');
const BSON = require('bson');

const records = JSON.parse(fs.readFileSync("./data/earthquakes.json", "utf8"));

for (let recordIndex = 0; recordIndex < records.length; ++recordIndex) {
    const record = records[recordIndex];
    record.Time = moment(record.Time).toDate();
}

const bson = new BSON();
const serializedData = bson.serialize(records);

fs.writeFileSync("./output/earthquakes.bson", serializedData);
