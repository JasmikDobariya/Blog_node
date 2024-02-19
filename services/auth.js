const JWt = require('jsonwebtoken');

const secret = "ja$min"

function createToken(user) {
    const payload = {
        _id: user._id,
        email: user.email,
        profileImageURL: user.profileImageURL,
        role: user.role,
    }
    const token = JWt.sign(payload , secret)
    return token;
}

function validateToken(token) {
    const payload = JWt.verify(token,secret)
    return payload;
}

module.exports = {
    createToken,
    validateToken
}