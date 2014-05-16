var restify = require('restify');

var app = module.exports = restify.createServer({ name: 'api' });

app.listen(8080, function() {
    console.log('%s listening at %s', app.name, app.url);
});

app.use(restify.fullResponse())
      .use(restify.bodyParser())
      .use(restify.CORS());

module.exports.app = app;
routes = require('./routes');