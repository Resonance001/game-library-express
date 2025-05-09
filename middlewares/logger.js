/**
 * Logging Middleware
 * - logs details on HTTP request and response
 */

const logger = (req, res, next) => {
    const startTime = Date.now();

    res.on('finish', () => {
        const { method, hostname, path, rawHeaders } = req;
        const { statusCode, statusMessage } = res;

        const timestamp = new Date(startTime).toISOString();
        const responseTime = `${Date.now() - startTime} ms`;

        console.log({
            timestamp,
            responseTime,
            method,
            hostname,
            path,
            rawHeaders,
            statusCode,
            statusMessage,
        });
    });

    next();
};

export default logger;
