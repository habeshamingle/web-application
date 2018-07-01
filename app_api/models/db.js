const mongoose = require('mongoose');
require('./users');
var dbURI = 'mongodb://localhost/habeshamingle';

if (process.env.NODE_ENV === 'production'){
    dbURI = process.env.MONGOLAB_URI;
}
mongoose.connect(dbURI);

mongoose.connection.on('connected', function () {
   console.log('Mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
   console.log('Mongoose connection error ' + err);
});
mongoose.connection.on('disconnected', function () {
   console.log('Mongoose disconnected');
});

/**
 * Reusable function to close Mongoose connection
 * @param msg
 * @param callback
 */
var gracefulShutDown = function (msg, callback) {
    mongoose.connection.close(function () {
        console.log('Mongoose disconnectedthrough ' + msg);
    });
};

/**
 * Listen for Node processes for termination or restart signals, and call
 * gracefulShutDown function when appropriate, passing a continuation callback
 */
// for Nodemon restarts
process.once('SIGUSR2', function () {
    gracefulShutDown('nodemon restart', function () {
        process.kill(process.pid, 'SIGUSR2');
    });
});
// for App termination
process.on('SIGINT', function () {
   gracefulShutDown('app termination', function () {
       process.exit(0);
   });
});
//For Heroku app termination
process.on('SIGTERM', function () {
    gracefulShutDown('Heroku app shutdown', function () {
        process.exit(0);
    });
});