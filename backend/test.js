// test/app.test.js
const assert = require('assert');
const request = require('supertest');

describe('GET /', function() {
  it('responds with Hello World and increments the visit count', function(done) {
    let firstVisitCount;

    // First request to capture the initial visit count
    request('http://localhost:4000')  // Point to the running Docker container
      .get('/')
      .expect(200)  // Expect HTTP status 200 OK
      .expect((res) => {
        // Check that the response body matches the expected pattern
        assert.match(res.text, /hello, my name is Falcon. You've visited \d+ times!/);
        firstVisitCount = res.text.match(/You've visited (\d+) times/)[1];  // Extract the visit count
      })
      .end((err) => {
        if (err) return done(err);

        // Second request to ensure the count increments
        request('http://localhost:4000')
          .get('/')
          .expect(200)
          .expect((res) => {
            // Match the response for the second visit and capture the count
            assert.match(res.text, /hello, my name is Falcon. You've visited (\d+) times!/);
            const secondVisitCount = res.text.match(/You've visited (\d+) times/)[1];

            // Assert that the second count is greater than the first visit count
            assert.strictEqual(parseInt(secondVisitCount), parseInt(firstVisitCount) + 1);
          })
      .end(done);  // Ensure to call done() after the test finishes
      });
  });
});
