import express from 'express'
import { body } from 'express-validator'
import authController from '../controllers/auth.controller.js'

const authRouter = express.Router()

authRouter.get('/auth/refresh', authController.refresh)

authRouter.post(
	'/auth/register',
	body('name').notEmpty().withMessage('Name is required'),
	body('last_name').notEmpty().withMessage('Last name is required'),
	body('surname').notEmpty().withMessage('Surname is required'),
	body('login').notEmpty().withMessage('Login is required'),
	body('password')
		.isLength({ min: 6 })
		.withMessage('Password must be at least 6 characters long'),
	authController.register
)

authRouter.post(
	'/auth/login',
	body('login').notEmpty().withMessage('Login is required'),
	body('password').notEmpty().withMessage('Password is required'),
	authController.login
)

authRouter.post('/auth/logout', authController.logout)

export default authRouter
