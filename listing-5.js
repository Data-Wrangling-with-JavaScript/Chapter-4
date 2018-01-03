"use strict";

var fs = require('fs');
var moment = require('moment');
var BSON = require('bson');

var records = JSON.parse(fs.readFileSync("./data/earthquakes.json", "utf8"));

for (var recordIndex = 0; recordIndex < records.length; ++recordIndex) {
    var record = records[recordIndex];
    record.Time = moment(record.Time).toDate();
}

var bson = new BSON();
var serializedData = bson.serialize(records);

fs.writeFileSync("./output/earthquakes.bson", serializedData);
