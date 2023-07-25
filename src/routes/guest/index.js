const express = require('express');
const projectRoute = require('./project.route');
const gatewayRoute = require('./gateway.route');
const deviceRoute = require('./device.route');
const deviceLogRoute = require('./deviceLog.route');
const faultRoute = require('./fault.route');
const activityLogRoute = require('./activityLog.route');
const deviceAppRoute = require('./deviceApp.route');
const dashboardRoute = require('./dashboard.route');

const router = express.Router();

const defaultRoutes = [
  {
    path: '/projects',
    route: projectRoute,
  },
  {
    path: '/gateways',
    route: gatewayRoute,
  },
  {
    path: '/devices',
    route: deviceRoute,
  },
  {
    path: '/deviceLogs',
    route: deviceLogRoute,
  },
  {
    path: '/faults',
    route: faultRoute,
  },
  {
    path: '/activityLogs',
    route: activityLogRoute,
  },
  {
    path: '/deviceApp',
    route: deviceAppRoute,
  },
  {
    path: '/dashboard',
    route: dashboardRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
