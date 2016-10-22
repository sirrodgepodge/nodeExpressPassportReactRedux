import Express from 'express';
import helmet from 'helmet';
import compression from 'compression';
import proxyHandling from './util/proxyHandling';
import paths from '../../config/paths';


// create express instance
const app = Express();

// handle proxying to "api" and "auth"
proxyHandling(app);

// middlewares
app.use(helmet()); // provides basic security checks
app.use(compression()); // compresses responses

// informs app where base path for static assets is
app.use(Express.static(paths.appBuild));

app.get('/*', (req, res) => res.sendFile(paths.appBuildHtml))

app.listen(process.env.PORT, () => console.log(`App listening on port: ${process.env.PORT}`))
