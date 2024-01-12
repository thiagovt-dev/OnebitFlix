import express from "express"
import { database } from "./database/index.js"
import { adminJs, adminJsRouter } from "./admin/index.js"
import path from "path"
import { router } from "./routes.js"

const app = express()

app.use(adminJs.options.rootPath, adminJsRouter)

app.use(express.static(path.join("public")));

app.use(express.json())

app.use(router)

const PORT = process.env.PORT || 3000

app.listen(PORT, async ()=> {
    await database.authenticate().then(()=>console.log('DB connection successful'))

    console.log(`Server started successfully at ${PORT}`)
})