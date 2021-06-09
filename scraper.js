const validator = require('validator');
const ogs = require('open-graph-scraper');


const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode,
  headers: {
    'Content-Type': 'text/plain'
  },
  body: message,
});

module.exports.urlScraper = (event, context, callback) => {

  const data = JSON.parse(event.body);

  //validating input
  if (!validator.isURL(data.url)) {
    callback(null, createErrorResponse(400, 'Incorrect URL'));
    return;
  }
  const options = {
    url: data.url
  };

  //open-graph-scraper call
  ogs(options, (error, results, response) => {
    if (!error) {
      callback(null, {
        statusCode: 200,
        body: JSON.stringify(results),
      })

    } else {
      callback(null, createErrorResponse(500, 'Internal Server Error'));
    }
  });

};