import Router from "express"
import Auth from "../middleware/jwt.js";
import { workspace , getWorkSpace } from "../controller/workspace.controller.js";
import {invitedMembers, workspaceInvite} from "../controller/workspacemembers.controller.js"

const router = Router()

router.post("/workspace", Auth , workspace)
router.get("/workspaces",Auth , getWorkSpace)
router.post("/workspace/invite",Auth, workspaceInvite)
router.get("/workspace/invites/:workspaceId" , Auth , invitedMembers)

export default router;