import Express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import httpProxy from 'http-proxy';
import paths from '../../config/paths';
const app = Express();

// send API requests to API port
const apiUrl = `${process.env.HTTPS ? 'https' : 'http'}://${process.env.HOST}:${process.env.APIPORT}`;
const apiPath = '/api';
const apiUrlWithPath = `${apiUrl}${apiPath}`;

const proxy = httpProxy.createProxyServer({
  target: apiUrl,
});

// middlewares
app.use(helmet()); // provides basic security checks
app.use(compression()); // compresses responses

// Proxy API requests to API server
app.use(apiPath, (req, res) => {
  proxy.web(req, res, {
    target: apiUrlWithPath
  });
});

// informs app where base path for static assets is
app.use(Express.static(paths.appBuild));

app.get('/*', (req, res) => res.sendFile(paths.appBuildHtml))

app.listen(process.env.PORT, () => console.log(`App listening on port: ${process.env.PORT}`))

// added the error handling to avoid https://github.com/nodejitsu/node-http-proxy/issues/527
proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    // this error will happen every time api is hot loaded so suppress first few in dev
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});
