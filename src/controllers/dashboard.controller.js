const catchAsync = require('../utils/catchAsync');
const { deviceService, gatewayService, deviceLogService, faultService } = require('../services');
const pick = require('../utils/pick');

const getDashboardOverview = catchAsync(async (req, res) => {
  const { gatewayId } = pick(req.query, ['gatewayId']);
  const filter = {
    gatewayId,
  };
  const options = pick(req.query, ['sortBy', 'pageSize', 'pageNum']);
  const result = await gatewayService.queryGateways(filter, options);
  const content = [];
  // eslint-disable-next-line no-plusplus
  for (let index = 0; index < result.content.length; index++) {
    const gateway = result.content[index];
    // eslint-disable-next-line no-await-in-loop
    const deviceResult = await deviceService.queryDevices({ gateway: gateway._id }, options, '');
    const transformedDevices = [];
    // eslint-disable-next-line no-plusplus
    for (let deviceIndex = 0; deviceIndex < deviceResult.content.length; deviceIndex++) {
      const device = deviceResult.content[deviceIndex];
      // eslint-disable-next-line no-await-in-loop
      const deviceLogResult = await deviceLogService.queryDeviceLogs({ device: device._id }, options, '');
      transformedDevices.push({
        ...device.toJSON(),
        dataList: deviceLogResult.content && deviceLogResult.content.length ? deviceLogResult.content[0].toJSON().list : [],
      });
    }
    // eslint-disable-next-line no-await-in-loop
    const faultResult = await faultService.queryFaults({ gateway: gateway._id }, options);
    content.push({
      ...gateway.toJSON(),
      devices: transformedDevices,
      faults: faultResult.content,
    });
  }
  res.send(content);
});

module.exports = {
  getDashboardOverview,
};
