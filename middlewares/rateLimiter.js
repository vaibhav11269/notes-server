const { rateLimit } = require('express-rate-limit');

const limiter = rateLimit({
    windowMs: 60 * 1000, // 15 minutes
    limit: 10, // Limit each IP to 10 requests per `window` (here, per minute).
    standardHeaders: 'draft-7',
    legacyHeaders: false,
})

module.exports = limiter;