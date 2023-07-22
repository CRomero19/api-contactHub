import { Router } from 'express'
import { updateUserController, softDeleteUserController, registerNewUserController, getAllUsersController } from '../controllers/users.controllers'
import { updateUserRequestSchema, userSchemaRequest } from '../schemas/users.schemas'
import { ensureRequestDataIsValid } from '../middlewares/ensureRequestDataIsValid'
import { ensureEmailIsNotInUse } from '../middlewares/users/ensureEmailIsNotInUse'
import { ensureTokenIsValid } from '../middlewares/ensureTokenIsValid'
import { ensureUserIsAdm } from '../middlewares/ensureUserIsAdm'
import { ensureUserIsAllowed } from '../middlewares/users/ensureUserIsAllowed'
import { ensureUserIsRegisteredForUsersRoute } from '../middlewares/users/ensureUserIsRegisteredForRouteUsers'

export const usersRoutes: Router = Router()

usersRoutes.post('', ensureRequestDataIsValid(userSchemaRequest),ensureEmailIsNotInUse,registerNewUserController)
usersRoutes.get('', ensureTokenIsValid, getAllUsersController) /* ensureUserIsAdm, */
usersRoutes.patch('/:id', ensureTokenIsValid, ensureUserIsRegisteredForUsersRoute,ensureUserIsAllowed, ensureRequestDataIsValid(updateUserRequestSchema),updateUserController)
usersRoutes.delete('/:id', ensureTokenIsValid, ensureUserIsRegisteredForUsersRoute,ensureUserIsAdm, softDeleteUserController) 