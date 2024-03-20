import { Op } from 'sequelize'
import { TaskModel } from '../models/task.model.js'

class TaskService {
	async createTask(
		userId,
		title,
		description,
		due_date,
		priority,
		status,
		assignee_id
	) {
		const task = await TaskModel.create({
			title,
			description,
			due_date,
			priority,
			status,
			creator_id: userId,
			assignee_id,
		})

		return task
	}

	async editTask(
		creator_id,
		taskId,
		title,
		description,
		due_date,
		priority,
		status
	) {
		const task = await TaskModel.findOne({
			where: {
				id: taskId,
				creator_id,
			},
		})

		if (!task) {
			throw new Error('Task not found')
		}

		task.title = title
		task.description = description
		task.due_date = due_date
		task.priority = priority
		task.status = status

		await task.save()
		return task
	}

	async removeTask(creator_id, taskId) {
		const task = await TaskModel.findOne({
			where: {
				id: taskId,
				creator_id,
			},
		})

		if (!task) {
			throw new Error('Task not found')
		}

		await task.destroy()
	}

	async getAllTasks(creator_id) {
		console.log('userId', creator_id)
		const tasks = await TaskModel.findAll({
			where: {
				creator_id,
			},
		})

		console.log('tasks', tasks)

		return tasks
	}

	async viewTask(userId, taskId) {
		const task = await TaskModel.findOne({
			where: {
				id: taskId,
				userId,
			},
		})

		if (!task) {
			throw new Error('Task not found')
		}

		return task
	}

	async filterTasksByCompletionDate(userId, startDate, endDate) {
		try {
			const tasks = await TaskModel.findAll({
				where: {
					creator_id: userId,
					due_date: {
						[Op.between]: [startDate, endDate],
					},
				},
			})
			return tasks
		} catch (error) {
			throw error
		}
	}

	async filterTasksByAssignee(userId) {
		try {
			const tasks = await TaskModel.findAll({
				where: {
					assignee_id: userId,
				},
			})
			return tasks
		} catch (error) {
			throw error
		}
	}

	async getAllTasksSortedByLastUpdated(creator_id) {
		try {
			const tasks = await TaskModel.findAll({
				where: { creator_id },
				order: [['updatedAt', 'DESC']],
			})

			console.log('tasks', tasks)
			return tasks
		} catch (error) {
			throw error
		}
	}
}

export default new TaskService()
