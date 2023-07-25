import { Router } from 'express'
import { updateUserController, deleteUserController, registerNewUserController, getAllUsersController, getUserByIdController, getAllUserContactsController } from '../controllers/users.controllers'
import { updateUserRequestSchema, userSchemaRequest } from '../schemas/users.schemas'
import { ensureRequestDataIsValid } from '../middlewares/ensureRequestDataIsValid'
import { ensureEmailIsNotInUse } from '../middlewares/users/ensureEmailIsNotInUse'
import { ensureTokenIsValid } from '../middlewares/ensureTokenIsValid'
import { ensureUserIsAdm } from '../middlewares/ensureUserIsAdm'
import { ensureUserIsAllowed } from '../middlewares/users/ensureUserIsAllowed'
import { ensureUserIsRegistered } from '../middlewares/users/ensureUserIsRegisteredForRouteUsers'

export const usersRoutes: Router = Router()

usersRoutes.post('', ensureRequestDataIsValid(userSchemaRequest),ensureEmailIsNotInUse,registerNewUserController)
usersRoutes.get('', ensureTokenIsValid, ensureUserIsAdm,getAllUsersController) 
usersRoutes.get('/:id', ensureTokenIsValid, ensureUserIsRegistered,ensureUserIsAllowed, getUserByIdController)
usersRoutes.patch('/:id', ensureTokenIsValid, ensureUserIsRegistered,ensureUserIsAllowed, ensureRequestDataIsValid(updateUserRequestSchema),updateUserController)
usersRoutes.delete('/:id', ensureTokenIsValid, ensureUserIsRegistered,ensureUserIsAllowed, deleteUserController) 
usersRoutes.get('/:id/contacts',ensureTokenIsValid, ensureUserIsRegistered,ensureUserIsAllowed,getAllUserContactsController) 