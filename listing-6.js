'use strict';

var fs = require('fs');
var BSON = require('bson');

var loadedData = fs.readFileSync('./data/earthquakes.bson');

var bson = new BSON();
var deserializedData = bson.deserialize(loadedData);

console.log(deserializedData);
