import { validationResult } from 'express-validator'
import { REFRESH_TOKEN_MAX_AGE } from '../configs/index.config.js'
import ApiException from '../exceptions/api.exceptions.js'
import authService from '../services/auth.service.js'

class AuthController {
	async register(req, res, next) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				console.log(errors.array())
				return next(ApiException.BadRequest('validation error', errors.array()))
			}

			const { name, last_name, surname, login, password, supervisor_id } =
				req.body

			const userData = await authService.register(
				name,
				last_name,
				surname,
				login,
				password,
				supervisor_id
			)

			console.log('userData', userData)

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: REFRESH_TOKEN_MAX_AGE,
				httpOnly: true,
			})

			return res.json(userData)
		} catch (error) {
			next(error)
		}
	}

	async login(req, res, next) {
		try {
			const errors = validationResult(req)

			if (!errors.isEmpty()) {
				console.log(errors.array())
				return next(ApiException.BadRequest('validation error', errors.array()))
			}

			const { login, password } = req.body

			const userData = await authService.login(login, password)

			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: REFRESH_TOKEN_MAX_AGE,
				httpOnly: true,
			})

			return res.json(userData)
		} catch (error) {
			next(error)
		}
	}

	async logout(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			console.log('refreshToken', refreshToken)
			const token = await authService.logout(refreshToken)
			res.clearCookie('refreshToken')
			return res.json(token)
		} catch (error) {
			next(error)
		}
	}

	async refresh(req, res, next) {
		try {
			const { refreshToken } = req.cookies
			const userData = await authService.refresh(refreshToken)
			res.cookie('refreshToken', userData.refreshToken, {
				maxAge: REFRESH_TOKEN_MAX_AGE,
				httpOnly: true,
			})
			return res.json(userData)
		} catch (error) {
			next(error)
		}
	}
}

export default new AuthController()
