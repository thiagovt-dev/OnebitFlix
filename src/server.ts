import express from "express"
import { sequelize } from "./database"

const app = express()

const PORT = process.env.PORT || 3000

app.listen(PORT, async ()=> {
    await sequelize.authenticate().then(()=>console.log('DB connection successful'))

    console.log(`Server started successfully at ${PORT}`)
})