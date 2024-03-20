import { DataTypes } from 'sequelize'
import { sequelize } from '../utils/sequelize/sequelize.js'
import { UserModel } from './user.model.js'

export const TaskModel = sequelize.define(
	'tasks',
	{
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		title: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: true,
		},
		due_date: {
			type: DataTypes.DATE,
			allowNull: false,
		},
		priority: {
			type: DataTypes.ENUM('high', 'medium', 'low'),
			allowNull: false,
		},
		status: {
			type: DataTypes.ENUM('todo', 'in_progress', 'done', 'cancelled'),
			allowNull: false,
			defaultValue: 'todo',
		},
		creator_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		assignee_id: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
	},
	{
		sequelize,
		modelName: 'Task',
	}
)

TaskModel.belongsTo(UserModel, { foreignKey: 'creator_id', as: 'creator' })
TaskModel.belongsTo(UserModel, { foreignKey: 'assignee_id', as: 'assignee' })

export default TaskModel
