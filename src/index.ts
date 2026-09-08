import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import userRoutes from "./routes/user.routes.js"
dotenv.config()


const app =express()

app.use(cors())
app.use(express.json())
app.use("/api", userRoutes)
const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})