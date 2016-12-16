const koa = require('koa');
const mount = require('koa-mount');
const serve = require('koa-static');
const proxy = require('koa-proxy');

const app = koa();

app.use(mount('/autotrimps', serve('.')));
app.use(function* (next) {
  const url = this.request.url;
  yield next;
  if (url === '/') {
    const oldBuffer = this.response.body;
    const newBuffer = Buffer.from('<script src="https://cdnjs.cloudflare.com/ajax/libs/require.js/2.3.2/require.min.js" data-main="/autotrimps/config.js"></script>');
    this.response.body = Buffer.concat([oldBuffer, newBuffer]);
  }
});
app.use(proxy({
  host: 'https://trimps.github.io'
}));
app.listen(3000);