const validator = require('validator');
const crypto = require('crypto');
const dynamoDBHelper = require('./helpers/dynamoDbHelper');
const openGraphHelper = require('./helpers/openGraphHelper');

const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode,
  headers: {
    'Content-Type': 'text/plain'
  },
  body: message,
});

module.exports.urlScraper = async (event, context, callback) => {

  const data = JSON.parse(event.body);

  //validating input
  if (!validator.isURL(data.url)) {
    callback(null, createErrorResponse(400, 'Incorrect URL'));
    return;
  }
  const options = {
    url: data.url
  };

  const hash = crypto.createHash('md5').update(data.url).digest('hex');
  let cache = await dynamoDBHelper.get(hash);
  const currentTimeInSeconds = parseInt((new Date()).getTime() / 1000);
  if (!cache.Item || cache.Item.ttl < currentTimeInSeconds) {

    let result = await openGraphHelper.scrape(options);
    result.id = hash;
    result.ttl = (currentTimeInSeconds + parseInt(process.env.CACHING_TIME_IN_SECONDS));
    await dynamoDBHelper.put(result);
    delete result.id;
    delete result.ttl;
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(result),
    })

  } else {
    delete cache.id;
    delete cache.ttl;
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(cache),
    })

  }

};