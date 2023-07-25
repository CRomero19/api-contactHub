import { Router } from 'express'
import { loginController } from '../controllers/login.controller'
import { ensureRequestDataIsValid } from '../middlewares/ensureRequestDataIsValid'
import { ensureUserIsRegisteredForLogin } from '../middlewares/login/ensureUserIsRegisteredForLogin'
import { loginSchema } from '../schemas/login.schemas'
import { ensureUserIsActive } from '../middlewares/login/ensureUserIsActive'

export const loginRoute: Router = Router()

loginRoute.post('', ensureRequestDataIsValid(loginSchema),ensureUserIsRegisteredForLogin, ensureUserIsActive, loginController)
