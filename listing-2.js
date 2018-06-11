"use strict";

const request = require('request-promise');
const cheerio = require('cheerio');

function scrapeWebPage (url) {
    return request.get(url)
        .then(response => {
            const $ = cheerio.load(response);
            const headers = $("thead tr")
                .map((i, el) => {
                    return $(el)
                        .find("th")
                        .map((i, el) => {
                            return $(el).text();
                        })
                        .toArray();
                })
                .toArray();

            const rows = $("tbody tr")
                .map((i, el) => {
                    return [$(el)
                        .find("td")
                        .map((i, el) => {
                            return $(el).text();
                        })
                        .toArray()];
                })
                .toArray();

            return rows.map(row => {
                    const record = {};
                    headers.forEach((fieldName, columnIndex) => {
                        if (fieldName.trim().length > 0) {
                            record[fieldName] = row[columnIndex];
                        }
                    });
                    return record;
                });
        });
};

const url = "https://earthquake.usgs.gov/earthquakes/browse/largest-world.php";
scrapeWebPage(url)
    .then(data => {
	   console.log(data);
    })
    .catch(err => {
        console.error(err);
    });
