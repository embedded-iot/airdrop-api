const express = require('express');

const userManagementRoute = require('./user.route');
const projectManagementRoute = require('./project.route');
const gatewayManagementRoute = require('./gateway.route');
const deviceManagementRoute = require('./device.route');
const deviceLogManagementRoute = require('./deviceLog.route');
const faultManagementRoute = require('./fault.route');
const activityLogManagementRoute = require('./activityLog.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/users',
    route: userManagementRoute,
  },
  {
    path: '/gateways',
    route: gatewayManagementRoute,
  },
  {
    path: '/projects',
    route: projectManagementRoute,
  },
  {
    path: '/devices',
    route: deviceManagementRoute,
  },
  {
    path: '/deviceLogs',
    route: deviceLogManagementRoute,
  },
  {
    path: '/faults',
    route: faultManagementRoute,
  },
  {
    path: '/activityLogs',
    route: activityLogManagementRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
