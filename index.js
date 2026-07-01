const Koa = require('koa');

const app = new Koa();

const port = process.env.PORT || 8080;
const host = process.env.HOST || '0.0.0.0';

app.listen(port, host);

try {
    console.log(`Server started on port ${port}`);
} catch (err) {
    console.error(err);
}