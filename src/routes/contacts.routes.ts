import { Router } from 'express'
import { ensureRequestDataIsValid } from '../middlewares/ensureRequestDataIsValid'
import { createNewContactController, deleteContactController, updateContactController } from '../controllers/contacts.controllers'
import { contactsSchema, updateContactSchema } from '../schemas/contacts.schemas'
import { ensureTokenIsValid } from '../middlewares/ensureTokenIsValid'
import { ensureNameIsNotInUse } from '../middlewares/contacts/ensureNameIsNotInUse'
import { ensureUserIsAllowed } from '../middlewares/users/ensureUserIsAllowed'

export const contactRoute: Router = Router()

contactRoute.post('',ensureRequestDataIsValid(contactsSchema),ensureTokenIsValid, ensureNameIsNotInUse,createNewContactController)
contactRoute.patch('/:contactId/users/:id', ensureRequestDataIsValid(updateContactSchema),ensureTokenIsValid, ensureUserIsAllowed,updateContactController)
contactRoute.delete('/:contactId/users/:id',ensureTokenIsValid, ensureUserIsAllowed,deleteContactController)
