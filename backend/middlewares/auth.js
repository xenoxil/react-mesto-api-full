const jwt = require('jsonwebtoken');
const AuthorizationError = require('../errors/AuthorizationError');

module.exports = (req, res, next) => {
  const token = req.cookies.mestoToken;
  if (!token) {
    next(new AuthorizationError('Необходима авторизация'));
  } else {
    let payload;

    try {
      payload = jwt.verify(token, '6d8a2cff9c4eb3838c51e357e31e84aa468be1e3467ec315b14fba0f9eed6095');
    } catch (err) {
      next(new AuthorizationError('Необходима авторизация'));
    }

    req.user = payload; // записываем пейлоуд в объект запроса
  }
  return next(); // пропускаем запрос дальше
};
