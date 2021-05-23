const PermissionError = require('../errors/PermissionError');
const BadRequestError = require('../errors/BadRequestError');
const ResourceUnavailableError = require('../errors/ResourceUnavailableError');
const Cards = require('../models/card');
const Users = require('../models/user');

module.exports.getCards = (req, res, next) => {
  Cards.find({})
    .populate('owner')
    .populate('likes')
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  Users.findById(req.user._id)
    .then((user) => {
      Cards.create({ name, link, owner: user })
        .then((card) => {
          res.send(card);
        })
        .catch((err) => {
          if (err._message === 'card validation failed') {
            next(new BadRequestError('Данные карточки не валидны'));
          } else {
            next(err);
          }
        });
    })
    .catch((err) => {
      if (err._message === 'card validation failed') {
        next(new BadRequestError('Данные карточки не валидны'));
      } else {
        next(err);
      }
    });
};

module.exports.deleteCard = (req, res, next) => {
  Cards.findById(req.params.cardId)
    .orFail(() => {
      next(new ResourceUnavailableError('Карточка не найдена'));
    })
    .then((card) => {
      if (card.owner.equals(req.user._id)) {
        Cards.findByIdAndRemove(req.params.cardId)
          .then((deletedCard) => res.send({ data: deletedCard }));
      } else {
        next(new PermissionError('Нельзя удалить чужую карточку'));
      }
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Не корректный id карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.likeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { runValidators: true, new: true },
  )
    .orFail(() => {
      next(new ResourceUnavailableError('Карточка не найдена'));
    })
    .populate('likes')
    .populate('owner')
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Не корректный id карточки'));
      } else {
        next(err);
      }
    });
};

module.exports.dislikeCard = (req, res, next) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { runValidators: true, new: true },
  )
    .orFail(() => {
      next(new ResourceUnavailableError('Карточка не найдена'));
    })
    .populate('likes')
    .populate('owner')
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        next(new BadRequestError('Не корректный id карточки'));
      } else {
        next(err);
      }
    });
};
