import chalk from 'chalk';
import mongoose from 'mongoose';

// configure mongoose to use native promises
mongoose.Promise = global.Promise;

const db = mongoose.connect('mongodb://localhost:27017/messageStorer').connection;

// add models to mongoose
import './models'; // eslint-disable-line

console.log(chalk.yellow('Opening connection to mongodb')); // eslint-disable-line

export default new Promise((resolve, reject) => {
  db.on('connected', () => console.log(chalk.blue('MongoDB connected!'))); // eslint-disable-line
  db.on('open', () => !console.log(chalk.green('Mongoose Models Loaded!')) && resolve()); // eslint-disable-line
  db.on('error', err => !console.log(chalk.red(err)) && reject(err)); // eslint-disable-line
});
