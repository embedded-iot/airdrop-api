const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const { faultValidation } = require('../../validations');
const { faultController } = require('../../controllers');

const router = express.Router();

router
  .route('/')
  .get(auth('manageActivityLogs'), validate(faultValidation.getFaultsManagement), faultController.getFaultsManagement);

module.exports = router;

/**
 * @swagger1
 * tags:
 *   name: FaultsManagement
 *   description: (ADMIN) Fault management and retrieval
 */

/**
 * @swagger1
 *  /admin/faults:
 *    get:
 *      summary: Get all faults
 *      description: Only admin can get all gateways of other users
 *      tags: [FaultsManagement]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: gatewayId
 *          schema:
 *            type: string
 *          description: Gateway id
 *        - in: query
 *          name: deviceId
 *          schema:
 *            type: number
 *          description: Device id
 *        - in: query
 *          name: pageSize
 *          schema:
 *            type: integer
 *            minimum: 1
 *          default: 10
 *          description: Maximum number of faults
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
 *                      $ref: '#/components/schemas/Fault'
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
