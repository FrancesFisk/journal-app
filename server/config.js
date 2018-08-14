'use strict';
exports.DATABASE_URL =
    process.env.DATABASE_URL ||
    global.DATABASE_URL ||
    'mongodb://FrancesFisk:password1@ds117422.mlab.com:17422/self-care-app';
// exports.PORT = process.env.PORT || 3001;
exports.JWT_SECRET = process.env.JWT_SECRET || 'secret';
exports.JWT_EXPIRY = process.env.JWT_EXPIRY || '7d';
exports.CLIENT_ORIGIN = process.env.CLIENT_ORIGIN || 'http://localhost:3000'