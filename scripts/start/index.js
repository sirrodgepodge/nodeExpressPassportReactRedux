// Load environment variables from .env file. Surpress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.
// https://github.com/motdotla/dotenv
require('dotenv').config({ silent: true }); // eslint-disable-line

// default NODE_ENV to 'development'
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// default HOST to 'localhost'
process.env.HOST = process.env.HOST || 'localhost';

// default PORT to 3000
process.env.PORT = process.env.PORT || 3000;

// default APIPORT to 3001
process.env.APIPORT = process.env.APIPORT || 3001;

// enable ES6 in subsequent files
require('babel-core/register');

// require the corresponding environment's init file
require(`./${process.env.NODE_ENV}`)
