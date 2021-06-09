var chai = require('chai');
var assert = chai.assert;
var scrapper = require('../scraper');



// first (and only) set of tests
describe('scraper', function () {


    // this function will be called before every single test
    beforeEach(function () {});

    // this function will be called after ever  y single test
    afterEach(function () {});

    it('invalid url test', function (done) {

        const event = {
            body: "{\r\n    \"url\":\"sadas://example.com\"\r\n}"
        };
        const context = 'context';

        scrapper.urlScraper(event, context, function (err, response) {
            assert.equal(response.statusCode, 400);
            done();
        });
    });


    it('success test', function (done) {

        const event = {
            body: "{\r\n    \"url\":\"https://example.com\"\r\n}"
        };
        const context = 'context';


        scrapper.urlScraper(event, context, function (err, response) {

            assert.equal(response.statusCode, 200);
            let details = JSON.parse(response.body)
            assert.equal(details.charset, "utf8");
            assert.equal(details.ogTitle, "Example Domain");
            assert.equal(details.requestUrl, "https://example.com");
            assert.equal(details.success, true);
            done();
        });
    });
});