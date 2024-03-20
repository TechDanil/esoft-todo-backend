import { Op } from 'sequelize'
import TaskModel from '../models/task.model.js'

class FilterService {
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

export default new FilterService()
