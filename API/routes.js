app = module.parent.exports.app;

var loginController = require('./controllers/login');
var formsController = require('./controllers/forms');
var submissionsController = require('./controllers/submissions');

app.post('site/login', loginController.login);

app.get('api/forms', formsController.findAll);
app.post('api/forms', formsController.add);

app.get('api/submissions', submissionsController.findAll);
app.post('api/submissions', submissionsController.add);