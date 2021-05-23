const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const BadRequestError = require('../errors/BadRequestError');
const ResourceUnavailableError = require('../errors/PermissionError');
const NotUniqueEmailError = require('../errors/NotUniqueEmailError');
const Users = require('../models/user');
const ResourceUnavalableError = require('../errors/ResourceUnavailableError');
const AuthorizationError = require('../errors/AuthorizationError');

module.exports.getUsers = (req, res, next) => {
  Users.find({})
    .then((users) => {
      res.send({ data: users });
    })
    .catch(next);
};

module.exports.getUserById = (req, res, next) => {
  Users.findById(req.params.userId)
    .orFail(() => {
      next(new ResourceUnavailableError('Запрашиваемый пользователь не найден'));
    })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Не корректный id пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  Users.findByIdAndUpdate(req.user._id, { name, about }, { runValidators: true, new: true })
    .orFail(() => {
      next(new ResourceUnavailableError('Пользователь не найден'));
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Не корректный id пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.updateAvatar = (req, res, next) => {
  const { avatar } = req.body;
  if (!avatar) {
    next(new BadRequestError('Не корректная ссылка для обновления аватара'));
  } else {
    Users.findByIdAndUpdate(req.user._id, { avatar }, { runValidators: true, new: true })
      .orFail(() => {
        next(new ResourceUnavailableError('Пользователь не найден'));
      })
      .then((newAvatar) => res.send(newAvatar))
      .catch((err) => {
        if (err.kind === 'ObjectId') {
          next(new BadRequestError('Не корректный id пользователя'));
        } else {
          next(err);
        }
      });
  }
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!password || !email) {
    next(new AuthorizationError('Неправильные почта или пароль'));
  }

  Users.findOne({ email })
    .select('+password')
    .then((user) => {
      req.body = user;
      if (user) {
        return bcrypt.compare(password, user.password).then((matched) => {
          if (!matched) {
            next(new AuthorizationError('Неправильные почта или пароль'));
          } else {
            const token = jwt.sign(
              { _id: user._id },
              '6d8a2cff9c4eb3838c51e357e31e84aa468be1e3467ec315b14fba0f9eed6095',
              {
                expiresIn: '7d',
              },
            );
            res
              .cookie('mestoToken', token, { maxAge: 604800000, httpOnly: true, SameSite: 'none', secure: true })
              .send({ _id: req.body._id });
          }
        });
      }
      return next(new AuthorizationError('Неправильные почта или пароль'));
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Не корректный id пользователя'));
      } else {
        next(err);
      }
    });
};

module.exports.logout = (req, res) => {
  res.clearCookie('mestoToken', { httpOnly: true, sameSite: true }).status(200).send({ message: 'Куки токен удалён' });
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  Users.findOne({ email })
    .then((user) => {
      if (user) {
        next(new NotUniqueEmailError('Такой email уже зарегистрирован'));
      } else {
        bcrypt
          .hash(password, 10)
          .then((hash) => Users.create({ name, about, avatar, email, password: hash }))
          .then((newUser) => {
            res.send({
              data: { name: newUser.name,
                about: newUser.about,
                avatar: newUser.avatar,
                email: newUser.email },
            });
          });
      }
    })
    .catch((err) => {
      if (err._message === 'user validation failed') {
        next(new BadRequestError('Данные пользователя не валидны'));
      } else {
        next(err);
      }
    });
};

module.exports.getMyInfo = (req, res, next) => {
  Users.findById(req.user._id)
    .orFail(() => {
      next(new ResourceUnavalableError('Запрашиваемый пользователь не найден'));
    })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Не корректный id пользователя'));
      } else {
        next(err);
      }
    });
};
