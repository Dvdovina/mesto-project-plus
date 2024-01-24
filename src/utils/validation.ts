import { celebrate, Joi } from 'celebrate';

const urlRegex = /^https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{2,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=]*)$/i;

export const isValidUrl = (string: string) =>
  urlRegex.test(string);

export const validateCreateUser = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(urlRegex),
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
});

export const validateGetUserById = celebrate({
  params: Joi.object({
    userId: Joi.string().length(24).hex().required()
  })
});

export const validateUpdateUser = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required()
  })
});

export const validateUpdateUserAvatar = celebrate({
  body: Joi.object({
    avatar: Joi.string().pattern(urlRegex).required()
  })
});

export const validateLogin = celebrate({
  body: Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
  })
});

export const validateCreateCard = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    link: Joi.string().pattern(urlRegex).required()
  })
});

export const validateDeleteCard = celebrate({
  params: Joi.object({
    cardId: Joi.string().length(24).hex().required()
  })
});

export const validateLikeCard = celebrate({
  params: Joi.object({
    cardId: Joi.string().length(24).hex().required()
  })
});
