function requestLogger(req, res, next) {
    const timestamp = new Date().toISOString();
    const { method, url, query, params, body } = req;
    
    console.log(`[${timestamp}] ${method} ${url}`);
    if (Object.keys(query).length) console.log('Query:', query);
    if (Object.keys(params).length) console.log('Params:', params);
    
    const start = Date.now();
    res.on('finish', () => {
        const duration = Date.now() - start;
        console.log(`[${timestamp}] ${method} ${url} - ${res.statusCode} (${duration}ms)`);
    });

    next();
}

module.exports = { requestLogger };
