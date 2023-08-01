const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const deviceValidation = require('../../validations/device.validation');
const deviceController = require('../../controllers/device.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(deviceValidation.createDevice), deviceController.createDevice)
  .get(auth(), validate(deviceValidation.getDevices), deviceController.getDevices);

router
  .route('/:deviceId')
  .get(auth(), validate(deviceValidation.getDevice), deviceController.getDevice)
  .patch(auth(), validate(deviceValidation.updateDevice), deviceController.updateDevice)
  .delete(auth(), validate(deviceValidation.deleteDevice), deviceController.deleteDevice);

module.exports = router;

/**
 * @swagger1
 * tags:
 *   name: Devices
 *   description: Device management and retrieval
 */

/**
 * @swagger1
 *  /devices:
 *    post:
 *      summary: Create a device
 *      description: _
 *      tags: [Devices]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - gatewayId
 *                - type
 *                - deviceId
 *              properties:
 *                type:
 *                  type: string
 *                deviceId:
 *                  type: number
 *                  description: must be unique
 *                name:
 *                   type: string
 *                ipAddress:
 *                   type: string
 *                port:
 *                   type: number
 *                startDataAddress:
 *                   type: number
 *                endDataAddress:
 *                   type: number
 *                state:
 *                   type: string
 *                gateway:
 *                   type: string
 *              example:
 *                type: INVERTER
 *                deviceId: 1
 *                name: Device name
 *                ipAddress: 192.168.0.100
 *                port: 502
 *                startDataAddress: 8000
 *                endDataAddress: 9000
 *                state: Online
 *                gatewayId: Gateway id
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Device'
 *        "400":
 *          $ref: '#/components/responses/DuplicateName'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all devices
 *      description: _
 *      tags: [Devices]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: gatewayId
 *          schema:
 *            type: string
 *          description: Gateway id
 *        - in: query
 *          name: keyword
 *          schema:
 *            type: string
 *          description: Search by name ...
 *        - in: query
 *          name: sortBy
 *          schema:
 *            type: string
 *          description: sort by query in the form of field:desc/asc (ex. name:asc)
 *        - in: query
 *          name: pageSize
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of devices
 *        - in: query
 *          name: pageNum
 *          schema:
 *            type: integer
 *            minimum: 1
 *            default: 1
 *          description: Page number
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  content:
 *                    type: array
 *                    items:
 *                      $ref: '#/components/schemas/Device'
 *                  currentPage:
 *                    type: integer
 *                    example: 1
 *                  pageSize:
 *                    type: integer
 *                    example: 10
 *                  totalPage:
 *                    type: integer
 *                    example: 1
 *                  totalElement:
 *                    type: integer
 *                    example: 1
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 */

/**
 * @swagger1
 *  /devices/{id}:
 *    get:
 *      summary: Get a device
 *      description: Get device by ID
 *      tags: [Devices]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Device id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Device'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a device
 *      description: Update device by ID
 *      tags: [Devices]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Device id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - gatewayId
 *                - type
 *                - deviceId
 *              properties:
 *                type:
 *                  type: string
 *                deviceId:
 *                  type: number
 *                  description: must be unique
 *                name:
 *                   type: string
 *                ipAddress:
 *                   type: string
 *                port:
 *                   type: number
 *                startDataAddress:
 *                   type: number
 *                endDataAddress:
 *                   type: number
 *                state:
 *                   type: string
 *                gateway:
 *                   type: string
 *              example:
 *                type: INVERTER
 *                deviceId: 1
 *                name: Device name
 *                ipAddress: 192.168.0.100
 *                port: 502
 *                startDataAddress: 8000
 *                endDataAddress: 9000
 *                state: Online
 *                gatewayId: Gateway id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Device'
 *        "400":
 *          $ref: '#/components/responses/DuplicateName'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    delete:
 *      summary: Delete a device
 *      description: Delete device by ID
 *      tags: [Devices]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Device id
 *      responses:
 *        "200":
 *          description: No content
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */
