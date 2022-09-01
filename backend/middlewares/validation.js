const { celebrate, Joi } = require('celebrate');
const validator = require('validator');
const { ObjectId } = require('mongoose').Types;

module.exports.avatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value, { require_protocol: true })) {
          return value;
        }
        return helpers.message('Поле "Сссылка на картинку" должно быть валидным url-адресом');
      })
      .messages({
        'string.required': 'Поле "Ссылка на картинку" должно быть заполнено',
      }),
  }),
});

module.exports.loginValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message('Поле "email" должно быть валидным email-адресом');
      })
      .messages({
        'string.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().min(8).messages({
      'string.required': 'Поле "Password" должно быть заполнено',
      'string.min': 'Поле пароль должно быть не меньше 8 символов',
    }),
  }),
});

module.exports.signupValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).messages({
      'string.required': 'Поле "name" должно быть заполнено',
    }),
    about: Joi.string().min(2).max(30).messages({
      'string.required': 'Поле "about" должно быть заполнено',
    }),
    avatar: Joi.string()
      .custom((value, helpers) => {
        if (validator.isURL(value, { require_protocol: true })) {
          return value;
        }
        return helpers.message('Поле "Сссылка на картинку" должно быть валидным url-адресом');
      })
      .messages({
        'string.required': 'Поле "Ссылка на картинку" должно быть заполнено',
      }),
    email: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isEmail(value)) {
          return value;
        }
        return helpers.message('Поле "email" должно быть валидным email-адресом');
      })
      .messages({
        'string.required': 'Поле "email" должно быть заполнено',
      }),
    password: Joi.string().required().min(8).messages({
      'string.required': 'Поле "Password" должно быть заполнено',
      'string.min': 'Поле пароль должно быть не меньше 8 символов',
    }),
  }),
});

module.exports.userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.required': 'Поле "name" должно быть заполнено',
      }),
    about: Joi.string().required().min(2).max(30)
      .messages({
        'string.required': 'Поле "about" должно быть заполнено',
      }),
  }),
});

module.exports.userIdValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string()
      .alphanum()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Невалидный id');
      }),
  }),
});

module.exports.cardIdValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string()
      .alphanum()
      .custom((value, helpers) => {
        if (ObjectId.isValid(value)) {
          return value;
        }
        return helpers.message('Невалидный id');
      }),
  }),
});

module.exports.cardBodyValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages({
        'string.min': 'Поле "Название карточки" должно быть длиннее 2 символов',
        'string.required': 'Поле "Название карточки" обязательно',
        'string.max': 'Поле "Название карточки" должно быть не длиннее 30 символов',
      }),
    link: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (validator.isURL(value, { require_protocol: true })) {
          return value;
        }
        return helpers.message('Поле "Сссылка" должно быть валидным url-адресом');
      })
      .messages({
        'string.required': 'Поле "Ссылка" должно быть заполнено',
      }),
  }),
});
