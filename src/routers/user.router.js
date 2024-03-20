import express from 'express'
import userController from '../controllers/user.controller.js'

const userRouter = express.Router()

userRouter.get('/user/getResponsibleUsers', userController.getResponsibleUsers)

export default userRouter
