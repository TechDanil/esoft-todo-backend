import express from 'express'
import filterController from '../controllers/filter.controller.js'
import { authMiddleware } from '../middlewares/auth.middleware.js'

const filterRouter = express.Router()

filterRouter.post(
	'/filter/byCompletionDate',
	authMiddleware,
	filterController.filterTasksByCompletionDate
)

filterRouter.post(
	'/filter/byAssignee',
	authMiddleware,
	filterController.filterTasksByAssignee
)

filterRouter.get(
	'/filter/sortedByLastUpdated/:creator_id',
	authMiddleware,
	filterController.getAllTasksSortedByLastUpdated
)

export default filterRouter
