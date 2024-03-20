import express from 'express'
import { body, param } from 'express-validator'
import taskController from '../controllers/task.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const taskRouter = express.Router()

taskRouter.get(
	'/task/getAllTasks/:creator_id',
	param('creator_id').isInt().toInt(),
	authMiddleware,
	taskController.getAllTasks
)

taskRouter.post(
	'/task/createTask/:userId',
	param('userId').isInt().withMessage('User ID must be an integer'),
	body('title').notEmpty().withMessage('Title is required'),
	body('description').optional(),
	body('due_date')
		.isISO8601()
		.withMessage('Due date must be in ISO 8601 format'),
	body('priority')
		.isIn(['high', 'medium', 'low'])
		.withMessage('Priority must be one of: high, medium, low'),
	body('status')
		.isIn(['todo', 'in_progress', 'done', 'cancelled'])
		.withMessage('Status must be one of: todo, in_progress, done, cancelled'),
	body('creator_id').isInt().withMessage('Creator ID must be an integer'),
	body('assignee_id').isInt().withMessage('Assignee ID must be an integer'),
	authMiddleware,
	taskController.createTask
)

taskRouter.patch(
	'/task/editTask/:creator_id/:id',
	param('creator_id').isInt().toInt(),
	param('id').isInt().toInt(),
	body('title').isString(),
	body('description').isString(),
	body('due_date')
		.isISO8601()
		.withMessage('Due date must be in ISO 8601 format'),
	body('priority').isIn(['high', 'medium', 'low']),
	body('status').isIn(['todo', 'in_progress', 'done', 'cancelled']),
	authMiddleware,
	taskController.editTask
)

taskRouter.delete(
	'/task/removeTask/:creator_id/:id',
	param('creator_id').isInt().toInt(),
	param('id').isInt().toInt(),
	authMiddleware,
	taskController.removeTask
)

taskRouter.post(
	'/task/filterByCompletionDate',
	authMiddleware,
	taskController.filterTasksByCompletionDate
)

taskRouter.post(
	'/task/filterByAssignee',
	authMiddleware,
	taskController.filterTasksByAssignee
)

taskRouter.get(
	'/task/filterSortedByLastUpdated/:creator_id',
	authMiddleware,
	taskController.getAllTasksSortedByLastUpdated
)

export default taskRouter
