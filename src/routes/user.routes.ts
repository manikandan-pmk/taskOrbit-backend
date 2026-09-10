import Router from "express";
import { createUser , getUser, deleteUser , loginUser, updateUser } from "../controller/user.controller.js"
import Auth from "../middleware/jwt.js";

const router = Router()

router.post("/register",createUser)
router.post("/login",loginUser)
router.get("/user" , Auth , getUser)
router.delete("/user",Auth , deleteUser)
router.put("/user",Auth ,updateUser)

export default router;