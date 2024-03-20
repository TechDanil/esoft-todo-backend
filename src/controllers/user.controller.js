import userService from '../services/user.service.js'

class UserController {
	async getResponsibleUsers(req, res, next) {
		try {
			const responsibleUsers = await userService.getResponsibleUsers()
			return res.json(responsibleUsers)
		} catch (error) {
			next(error.message)
		}
	}
}

export default new UserController()
