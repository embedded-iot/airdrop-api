const express = require('express');
const auth = require('../../middlewares/auth');
const validate = require('../../middlewares/validate');
const projectValidation = require('../../validations/project.validation');
const projectController = require('../../controllers/project.controller');

const router = express.Router();

router
  .route('/')
  .post(auth(), validate(projectValidation.createProject), projectController.createProject)
  .get(auth(), validate(projectValidation.getProjects), projectController.getProjects);
router
  .route('/:projectId')
  .get(auth(), validate(projectValidation.getProject), projectController.getProject)
  .patch(auth(), validate(projectValidation.updateProject), projectController.updateProject)
  .delete(auth(), validate(projectValidation.deleteProject), projectController.deleteProject);

module.exports = router;

/**
 * @swagger1
 * tags:
 *   name: Projects
 *   description: Project management and retrieval
 */

/**
 * @swagger1
 *  /projects:
 *    post:
 *      summary: Create a project
 *      description: _
 *      tags: [Projects]
 *      security:
 *        - bearerAuth: []
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *              properties:
 *                name:
 *                  type: string
 *                  description: must be unique
 *                description:
 *                  type: string
 *              example:
 *                name: Project name
 *                description: Project description
 *      responses:
 *        "201":
 *          description: Created
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Project'
 *        "400":
 *          $ref: '#/components/responses/DuplicateName'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *
 *    get:
 *      summary: Get all projects
 *      description: _
 *      tags: [Projects]
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
 *          description: Maximum number of projects
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
 *                      $ref: '#/components/schemas/Project'
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
 *  /projects/{id}:
 *    get:
 *      summary: Get a project
 *      description: Get project by ID
 *      tags: [Projects]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Project id
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Project'
 *        "401":
 *          $ref: '#/components/responses/Unauthorized'
 *        "403":
 *          $ref: '#/components/responses/Forbidden'
 *        "404":
 *          $ref: '#/components/responses/NotFound'
 *
 *    patch:
 *      summary: Update a project
 *      description: Update project by ID
 *      tags: [Projects]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Project id
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              type: object
 *              required:
 *                - name
 *              properties:
 *                name:
 *                  type: string
 *                  description: must be unique
 *              example:
 *                name: Project name
 *                description: Project description
 *      responses:
 *        "200":
 *          description: OK
 *          content:
 *            application/json:
 *              schema:
 *                 $ref: '#/components/schemas/Project'
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
 *      summary: Delete a project
 *      description: Delete project by ID
 *      tags: [Projects]
 *      security:
 *        - bearerAuth: []
 *      parameters:
 *        - in: path
 *          name: id
 *          required: true
 *          schema:
 *            type: string
 *          description: Project id
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
