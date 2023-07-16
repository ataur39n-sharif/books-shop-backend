import express, {Application} from 'express'
import cors from 'cors'
import rootRouter from "./Routes";
import config from "@/Config";
import globalErrorHandler from "@/Middlewares/Errors/globalErrorHandler";
import notFoundHandler from "@/Middlewares/Errors/notFoundHandler";
import connectDB from "@/Config/db";
import swaggerUI from "swagger-ui-express"
import YAML from "yamljs"

const app: Application = express()
const docs = YAML.load('./booksApi.yml')

app.use(express.json())
app.use(cors())
app.use('/api/v1', rootRouter)
app.use('/api/v1/docs', swaggerUI.serve,swaggerUI.setup(docs))
app.use(globalErrorHandler)
app.use(notFoundHandler)

const {port} = config

connectDB()
    .then(() => {
        app.listen(port, () => {
            console.log(`Server is listening on ${port}. Url: http://localhost:${port}`)
            console.log(`Server documentation: http://localhost:${port}/api/v1/docs`)
        })
    })
