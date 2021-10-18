/* eslint-disable no-console */
const http = require('http');
const debug = require('debug');
const methodOverride = require('method-override');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
require('module-alias/register');

const debugHelper = debug('firebase:server');
const env = require('@env');
const routes = require('@routes');

const app = express();

/**
 * Normalize a port into a number, string, or false.
 */

function normalizePort(val) {
    const parsePort = parseInt(val, 10);

    if (Number.isNaN(parsePort)) {
    // named pipe
        return val;
    }

    if (parsePort >= 0) {
    // port number
        return parsePort;
    }

    return false;
}

/**
 * Get port from environment and store in Express.
 */

const port = normalizePort(env.PORT);
app.set('port', port);

/**
 * Create HTTP server.
 */

const server = http.createServer(app);

/**
 * Event listener for HTTP server "error" event.
 */

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? `Pipe ${port}`
        : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(`${bind} requires elevated privileges`);
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(`${bind} is already in use`);
            process.exit(1);
            break;
        default:
            throw error;
    }
}

/**
 * Configure application's plugins
 */

app.set('view engine', 'ejs');
app.set('views', 'src/resources/views');

app.use(cors({
    origin: env.CORS_ALLOW,
    optionsSuccessStatus: 200
}));
app.use(express.static('src/resources/public'));

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * Config Routers
 *  */

app.use('/', routes);

app.use(methodOverride('X-HTTP-Method-Override'));
app.use(
    methodOverride(req => {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            const method = req.body._method;
            delete req.body._method;

            return method;
        }

        return undefined;
    }),
);
/**
 * Event listener for HTTP server "listening" event.
 */

function onListening() {
    const addr = server.address();
    const bind = typeof addr === 'string'
        ? `pipe ${addr}`
        : `port ${addr.port}`;
    debugHelper(`Listening on ${bind}`);
}

/**
 * Listen on provided port, on all network interfaces.
 */

server.listen(port, () => {
    console.log(`Server is listening on ${port}`);
});
server.on('error', onError);
server.on('listening', onListening);
