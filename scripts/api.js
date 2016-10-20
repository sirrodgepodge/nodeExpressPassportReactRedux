// Load environment variables from .env file. Surpress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({ silent: true });

// default NODE_ENV to 'development'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// default APIPORT to 3001
process.env.APIPORT = process.env.APIPORT || 3001;

// enable ES6 in subsequent files
require('babel-core/register');

// handles live node reloads
if (process.env.NODE_ENV === 'development') {
  if (!require('piping')({
    hook: true,
    ignore: /(\/\.|~$|\.json$)/i
  })) {
    return;
  }
}

// actually start app
require('../api')
