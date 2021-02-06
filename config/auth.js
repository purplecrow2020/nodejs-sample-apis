const jwt = require('jsonwebtoken');
const { jwtSecret } = require('./config');

function generateToken(payload) {
    return jwt.sign(payload, jwtSecret, { algorithm: 'HS256', expiresIn: '7d' });
}

function validateKey(token) {
    return jwt.verify(token, jwtSecret, { algorithms: ['HS256'] });
}

module.exports = {
    generateToken,
    validateKey,
};
