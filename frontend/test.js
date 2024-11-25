// test/app.test.js
const assert = require('assert');
const request = require('supertest');

describe('GET /', function() {
  it('respond with Hello World', function(done) {
    request('http://localhost:3000')  // Point to the running Docker container
      .get('/')
      .expect('hello, my name is Ariane', done);
  });
});

