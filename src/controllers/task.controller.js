import { validationResult } from 'express-validator'
import ApiException from '../exceptions/api.exceptions.js'
import UserModel from '../models/user.model.js'
import taskService from '../services/task.service.js'

class TaskController {
	async createTask(req, res, next) {
		try {
			const { userId } = req.params
			const { title, description, due_date, priority, status, assignee_id } =
				req.body

			const currentUser = await UserModel.findOne({ where: { id: userId } })
			console.log('currentUser', currentUser)
			if (!currentUser) {
				throw new Error('User not found')
			}

			const task = await taskService.createTask(
				userId,
				title,
				description,
				due_date,
				priority,
				status,
				assignee_id
			)

			return res.json(task)
		} catch (error) {
			next(error.message)
		}
	}

	async editTask(req, res, next) {
		try {
			const { creator_id, id } = req.params
			const { title, description, due_date, priority, status } = req.body

			const updatedTask = await taskService.editTask(
				creator_id,
				id,
				title,
				description,
				due_date,
				priority,
				status
			)

			console.log('updatedTask', updatedTask)

			return res.json(updatedTask)
		} catch (error) {
			next(error.message)
		}
	}

	async removeTask(req, res, next) {
		try {
			const result = validationResult(req)
			if (!result.isEmpty()) {
				return next(ApiException.BadRequest('validation error', result.array()))
			}

			const { creator_id, id } = req.params

			await taskService.removeTask(creator_id, id)

			return res.json({ message: 'Task removed successfully' })
		} catch (error) {
			next(error.message)
		}
	}

	async getAllTasks(req, res, next) {
		try {
			const result = validationResult(req)
			if (!result.isEmpty()) {
				return next(ApiException.BadRequest('validation error', result.array()))
			}

			const creator_id = req.params.creator_id

			const tasks = await taskService.getAllTasks(creator_id)

			console.log('tasks', tasks)

			return res.json(tasks)
		} catch (error) {
			next(error)
		}
	}

	async filterTasksByCompletionDate(req, res, next) {
		try {
			const { userId, startDate, endDate } = req.body
			const filteredTasks = await taskService.filterTasksByCompletionDate(
				userId,
				startDate,
				endDate
			)
			res.json(filteredTasks)
		} catch (error) {
			next(error.message)
		}
	}

	async filterTasksByAssignee(req, res, next) {
		try {
			const { userId } = req.body
			const filteredTasks = await taskService.filterTasksByAssignee(userId)
			res.json(filteredTasks)
		} catch (error) {
			next(error.message)
		}
	}

	async getAllTasksSortedByLastUpdated(req, res, next) {
		try {
			const creator_id = req.params.creator_id
			const tasks = await taskService.getAllTasksSortedByLastUpdated(creator_id)
			res.json(tasks)
		} catch (error) {
			next(error.message)
		}
	}
}

export default new TaskController()
