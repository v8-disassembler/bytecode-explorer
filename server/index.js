const Koa = require('koa');
const app = new Koa();

const router = require('./router');
const bodyParser = require('koa-bodyparser');

const port = process.env.PORT || 3001;

app
	.use(bodyParser())
	.use(router.routes());

app.listen(port, () => {
	console.log(`Serving http://localhost:${port}`);
});
