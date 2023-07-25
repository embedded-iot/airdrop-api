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
    path: '/admin/users',
    route: userManagementRoute,
  },
  {
    path: '/admin/gateways',
    route: gatewayManagementRoute,
  },
  {
    path: '/admin/projects',
    route: projectManagementRoute,
  },
  {
    path: '/admin/devices',
    route: deviceManagementRoute,
  },
  {
    path: '/admin/deviceLogs',
    route: deviceLogManagementRoute,
  },
  {
    path: '/admin/faults',
    route: faultManagementRoute,
  },
  {
    path: '/admin/activityLogs',
    route: activityLogManagementRoute,
  },
];

defaultRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

module.exports = router;
