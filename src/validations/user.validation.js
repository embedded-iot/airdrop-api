const Joi = require('joi');
const { password, objectId } = require('./custom.validation');
const { ROLE_VALUES } = require('../config/roles');

const createUser = {
  body: Joi.object().keys({
    name: Joi.string(),
    email: Joi.string().required().email(),
    phone: Joi.string(),
    state: Joi.string(),
    password: Joi.string().required().custom(password),
    role: Joi.string().required().valid(ROLE_VALUES.USER, ROLE_VALUES.ADMIN),
  }),
};

const getUsers = {
  query: Joi.object().keys({
    name: Joi.string(),
    role: Joi.string(),
    sortBy: Joi.string(),
    pageSize: Joi.number().integer(),
    pageNum: Joi.number().integer(),
  }),
};

const getUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

const updateUser = {
  params: Joi.object().keys({
    userId: Joi.required().custom(objectId),
  }),
  body: Joi.object()
    .keys({
      name: Joi.string(),
      email: Joi.string().email(),
      phone: Joi.string(),
      state: Joi.string(),
      password: Joi.string().custom(password),
      role: Joi.string().valid(ROLE_VALUES.USER, ROLE_VALUES.USER),
    })
    .min(1),
};

const deleteUser = {
  params: Joi.object().keys({
    userId: Joi.string().custom(objectId),
  }),
};

module.exports = {
  createUser,
  getUsers,
  getUser,
  updateUser,
  deleteUser,
};
