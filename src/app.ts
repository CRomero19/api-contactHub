import "reflect-metadata"
import "express-async-errors"
import express, { Application } from "express"
import cors from "cors"
import { usersRoutes } from "./routes/users.routes"
import { loginRoute } from "./routes/login.routes"
import { handleErrors } from './errors';
import { contactRoute } from "./routes/contacts.routes"

const app: Application = express()

app.use(cors())

app.use(express.json())

app.use('/users', usersRoutes)
app.use('/login', loginRoute)
app.use('/contacts', contactRoute)

app.use(handleErrors)

export default app