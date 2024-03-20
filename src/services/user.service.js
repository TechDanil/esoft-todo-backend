import { Op } from 'sequelize'
import UserModel from '../models/user.model.js'

class UserService {
	async getResponsibleUsers() {
		const responsibleUsers = await UserModel.findAll({
			where: {
				supervisor_id: { [Op.ne]: null },
			},
		})

		return responsibleUsers
	}
}

export default new UserService()
