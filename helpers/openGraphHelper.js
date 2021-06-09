const ogs = require('open-graph-scraper');

module.exports.scrape = (options) => {
    return new Promise((resolve, reject) => {
        ogs(options, (err, results, response) => {
            if (err)
                reject(err);
            else
                resolve(results);
        });
    });
}