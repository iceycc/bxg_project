'use strict';

const mock = require('egg-mock');

describe('test/a.test.js', () => {
  let app;
  before(() => {
    app = mock.app({
      baseDir: 'apps/a-test',
    });
    return app.ready();
  });

  after(() => app.close());
  afterEach(mock.restore);

  it('should GET /', () => {
    return app.httpRequest()
      .get('/')
      .expect('hi, a')
      .expect(200);
  });
});
