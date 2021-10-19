const Router = require('koa-router');
const user = require('./controller/user');

const router = new Router();

router.post('/submission', user.runSubmission);

module.exports = router;