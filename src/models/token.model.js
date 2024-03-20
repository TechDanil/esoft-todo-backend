import { DataTypes } from 'sequelize'
import { sequelize } from '../utils/sequelize/sequelize.js'

export const TokenModel = sequelize.define(
	'tokens',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		userId: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		refreshToken: {
			type: DataTypes.STRING,
			allowNull: false,
		},
	},
	{
		modelName: 'token',
		timestamps: true,
		createdAt: 'createdAt',
		updatedAt: 'updatedAt',
	}
)
