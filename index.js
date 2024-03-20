import cookieParser from 'cookie-parser'
import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { errorMiddleware } from './src/middlewares/error.middleware.js'
import authRouter from './src/routers/auth.router.js'
import taskRouter from './src/routers/task.router.js'
import userRouter from './src/routers/user.router.js'
import { connectToDb } from './src/utils/connectToDb/connectToDb.js'

const PORT = process.env.PORT || 5000

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(
	cors({
		origin: 'http://localhost:5173',
		credentials: true,
	})
)

app.use('/api', authRouter)
app.use('/api', taskRouter)
app.use('/api', userRouter)
// app.use('/api', filterRouter)

app.use(errorMiddleware)

const startServer = async () => {
	try {
		await connectToDb()

		app.listen(PORT, () => {
			console.log('server is running', PORT)
		})
	} catch (error) {
		throw error
	}
}

startServer()
