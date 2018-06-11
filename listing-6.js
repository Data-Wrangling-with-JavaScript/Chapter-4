"use strict";

const fs = require('fs');
const BSON = require('bson');

const loadedData = fs.readFileSync("./data/earthquakes.bson");

const bson = new BSON();
const deserializedData = bson.deserialize(loadedData);

console.log(deserializedData);
