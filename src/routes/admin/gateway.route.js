const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const gatewayValidation = require('../../validations/gateway.validation');
const gatewayController = require('../../controllers/gateway.controller');

const router = express.Router();

router
  .route('/')
  .get(auth('manageGateways'), validate(gatewayValidation.getGatewaysManagement), gatewayController.getGatewaysManagement);

router
  .route('/:gatewayId/settings')
  .patch(
    auth('manageGateways'),
    validate(gatewayValidation.updateGatewaySettingsManagement),
    gatewayController.updateGatewaySettingsManagement
  );

module.exports = router;

/**
 * @swagger1
 * tags:
 *   name: GatewaysManagement
 *   description: (ADMIN) Gateway management and retrieval
 */

/**
 * @swagger1
 *  /admin/gateways:
 *    get:
 *      summary: Get all gateways
 *      description: Only admin can get all gateways of other users
 *      tags: [GatewaysManagement]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: query
 *          name: keyword
 *          schema:
 *            type: string
 *          description: Search by name, description...
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
 *          description: Maximum number of gateways
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
 *                      $ref: '#/components/schemas/Gateway'
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
 *  /admin/gateways/{gatewayId}/settings:
 *    patch:
 *      summary: Update a gateway settings
 *      description: Only admins can update gateway settings.
 *      tags: [GatewaysManagement]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: gatewayId
 *          required: true
 *          schema:
 *            type: string
 *          description: Gateway Id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - refreshDataAfterTime
 *              properties:
 *                refreshDataAfterTime:
 *                  type: number
 *              example:
 *                refreshDataAfterTime: 12000
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/admin/gatewaysetting'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 */
