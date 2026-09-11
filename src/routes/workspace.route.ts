import Router from "express"
import Auth from "../middleware/jwt.js";
import { workspace } from "../controller/workspace.controller.js";

const router = Router()

router.post("/workspace", Auth , workspace)

export default router;