import { Router } from 'express'
import { updateUserController, deleteUserController, registerNewUserController, getAllUsersController, getUserByIdController, getAllUserContactsController } from '../controllers/users.controllers'
import { updateUserRequestSchema, userSchemaRequest } from '../schemas/users.schemas'
import { ensureRequestDataIsValid } from '../middlewares/ensureRequestDataIsValid'
import { ensureEmailIsNotInUse } from '../middlewares/users/ensureEmailIsNotInUse'
import { ensureTokenIsValid } from '../middlewares/ensureTokenIsValid'
import { ensureUserIsAdm } from '../middlewares/ensureUserIsAdm'
import { ensureUserIsAllowed } from '../middlewares/users/ensureUserIsAllowed'



export const usersRoutes: Router = Router()

usersRoutes.post('', ensureRequestDataIsValid(userSchemaRequest),ensureEmailIsNotInUse,registerNewUserController)
usersRoutes.get('', ensureTokenIsValid, getAllUsersController) /* ensureUserIsAdm, */
usersRoutes.get('/:id', ensureTokenIsValid, ensureUserIsAllowed, getUserByIdController)
usersRoutes.patch('/:id', ensureTokenIsValid, ensureUserIsAllowed, ensureRequestDataIsValid(updateUserRequestSchema),updateUserController)
usersRoutes.delete('/:id', ensureTokenIsValid, ensureUserIsAllowed, deleteUserController) 
usersRoutes.get('/:id/contacts',getAllUserContactsController) 