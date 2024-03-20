import { sequelize } from '../sequelize/sequelize.js'

export const connectToDb = async () => {
	try {
		await sequelize.authenticate()
		console.log('connection established')
		await sequelize.sync()
	} catch (error) {
		throw error
	}
}
