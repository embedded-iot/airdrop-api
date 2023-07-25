const express = require('express');
const docsRoute = require('./docs.route');

const router = express.Router();

const devRoutes = [
  {
    path: '/docs',
    route: docsRoute,
  },
];

/* istanbul ignore next */
devRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
