const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const gatewayValidation = require('../../validations/gateway.validation');
const gatewayController = require('../../controllers/gateway.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(gatewayValidation.createGateway), gatewayController.createGateway)
  .get(auth(), validate(gatewayValidation.getGateways), gatewayController.getGateways);

router
  .route('/:gatewayId')
  .get(auth(), validate(gatewayValidation.getGateway), gatewayController.getGateway)
  .patch(auth(), validate(gatewayValidation.updateGateway), gatewayController.updateGateway)
  .delete(auth(), validate(gatewayValidation.deleteGateway), gatewayController.deleteGateway);

module.exports = router;

/**
 * @swagger1
 * tags:
 *   name: Gateways
 *   description: Gateway management and retrieval
 */

/**
 * @swagger1
 *  /gateways:
 *    post:
 *      summary: Create a gateway
 *      description: _
 *      tags: [Gateways]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - projectId
 *                - gatewayId
 *                - name
 *              properties:
 *                projectId:
 *                  type: string
 *                gatewayId:
 *                  type: string
 *                  description: must be unique
 *                name:
 *                  type: string
 *                  description: must be unique
 *              example:
 *                projectId: Project id
 *                gatewayId: Gateway id
 *                name: Gateway name
 *                description: Gateway description
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Gateway'
 *        "400":
 *          $ref: '#/components/responses/DuplicateName'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all gateways
 *      description: _
 *      tags: [Gateways]
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
 *  /gateways/{id}:
 *    get:
 *      summary: Get a gateway
 *      description: Get gateway by ID
 *      tags: [Gateways]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Gateway id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Gateway'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a gateway
 *      description: Update gateway by ID
 *      tags: [Gateways]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Gateway id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - projectId
 *                - gatewayId
 *                - name
 *              properties:
 *                projectId:
 *                  type: string
 *                gatewayId:
 *                  type: string
 *                  description: must be unique
 *                name:
 *                  type: string
 *                  description: must be unique
 *              example:
 *                projectId: Project id
 *                gatewayId: Gateway id
 *                name: Gateway name
 *                description: Gateway description
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Gateway'
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
 *      summary: Delete a gateway
 *      description: Delete gateway by ID
 *      tags: [Gateways]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Gateway id
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
