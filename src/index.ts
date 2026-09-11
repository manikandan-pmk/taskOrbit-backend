import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import userRoutes from "./routes/user.routes.js"
import workSpaceRoutes from "./routes/workspace.route.js"
dotenv.config()


const app =express()


app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}
))
app.use(express.json())
app.use(cookieParser())
app.use("/api", userRoutes)
app.use("/api",workSpaceRoutes)
const PORT = process.env.PORT

app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`)
})