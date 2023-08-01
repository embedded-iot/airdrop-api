const Joi = require('joi');

const getDashboardOverview = {
  query: Joi.object().keys({
    gatewayId: Joi.string().required(),
    keyword: Joi.string(),
    sortBy: Joi.string(),
    pageSize: Joi.number().integer(),
    pageNum: Joi.number().integer(),
  }),
};

module.exports = {
  getDashboardOverview,
};
