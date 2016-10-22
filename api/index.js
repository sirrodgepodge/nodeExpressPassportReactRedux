import express, { Router } from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import PrettyError from 'pretty-error';
import logger from 'morgan-body'; // modified classic logging library
import startDbPromise from '../db';


// instantiate express
const api = express();

// instantiate auth handler
const auth = Router();

// instantiate route handler
const router = Router();

// instantiate pretty error
const pretty = new PrettyError();

// parses body + query on request
api.use(bodyParser.urlencoded({extended: false}));
api.use(bodyParser.json());

// parses cookies on request
api.use(cookieParser());

// connect logger
logger(api);

startDbPromise.then(() => {
  // handle auth
  api.use('/auth', require('./auth').default(auth));

  // connect routes
  api.use('/api', require('./routes').default(router)); // we pass app instance into this function that adds routes

  // catch-all
  api.use('/*', (req, res, next) =>
    next(new Error(`404: Route not found, ${req.protocol}://${req.hostname}${req.originalUrl}`))
  );

  // log errors if in prod, send error response if in dev
  if(process.env.NODE_ENV === 'development') {
    api.use((err, req, res) => res.send(pretty.render(err)));
  } else {
    api.use((err, req, res) => console.log(err));
  }

  // start API
  api.listen(process.env.APIPORT, () =>
    console.log(`API listening on port ${process.env.APIPORT}`))
}).catch(err => console.log(`API ERROR: ${err}`));
