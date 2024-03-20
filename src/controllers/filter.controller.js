import filterService from '../services/filter.service.js'

class FilterController {
	async filterTasksByCompletionDate(req, res, next) {
		try {
			const { userId, startDate, endDate } = req.body
			const filteredTasks = await filterService.filterTasksByCompletionDate(
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
			const filteredTasks = await filterService.filterTasksByAssignee(userId)
			res.json(filteredTasks)
		} catch (error) {
			next(error.message)
		}
	}

	async getAllTasksSortedByLastUpdated(req, res, next) {
		try {
			const creator_id = req.params.creator_id
			const tasks = await filterService.getAllTasksSortedByLastUpdated(
				creator_id
			)
			res.json(tasks)
		} catch (error) {
			next(error.message)
		}
	}
}

export default new FilterController()
