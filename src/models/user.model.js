import { DataTypes } from 'sequelize'
import { sequelize } from '../utils/sequelize/sequelize.js'
import { TokenModel } from './token.model.js'

export const UserModel = sequelize.define(
	'users',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		last_name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		surname: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		login: {
			type: DataTypes.STRING,
			allowNull: false,
			unique: true,
		},
		password: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		supervisor_id: {
			type: DataTypes.INTEGER,
			allowNull: true,
		},
	},
	{
		sequelize,
		modelName: 'User',
		timestamps: true,
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	}
)

UserModel.hasMany(TokenModel, { foreignKey: 'userId' })
TokenModel.belongsTo(UserModel, { foreignKey: 'userId' })

export default UserModel
