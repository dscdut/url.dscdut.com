const { createLogger, transports, format } = require('winston');

const {
    combine, timestamp,
    printf, colorize,
    splat, simple
} = format;

const enumerateErrorFormat = format(err => {
    if (err instanceof Error) {
        return {
            message: err.message,
            stack: err.stack,
            ...err
        };
    }

    return err;
});

module.exports.logger = createLogger({
    level: 'info',
    // log's format is defined through combine
    format: format.combine(
        enumerateErrorFormat(),
        format.json()
    ),
    transports: [
    // show log on console
        new transports.Console({
            level: 'info',
            format: combine(
                simple(), splat(),
                timestamp({
                    format: 'DD-MM-YYYY HH:mm:ss',
                }),
                colorize(),
                printf(log => {
                    if (log.stack) return `[${log.timestamp}] [${log.level}] ${log.stack}`;
                    return `[${log.timestamp}] [${log.level}] ${log.message}`;
                })
            )
        })
    ],
});
