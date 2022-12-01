const http = require('http');
const { env } = require('process');
const app = require('./backend/app');
const debug = require('debug')('node-angular');







app.set('port', 5000);
const server = http.createServer(app);

// server.on("error", onError);
// server.on("listening", onListening);
server.listen(5000);
