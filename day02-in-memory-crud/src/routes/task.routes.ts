import {Router} from "express";
import {
    getTasks,
    getTask,
    createTask,
    updateTask,
    deleteTask,
} from "../controllers/task.controller";

import { create } from "domain";

const router = Router();

router.get("/", getTasks);
router.get("/:id", getTask);
router.post("/", createTask);
router.put("/:id",updateTask);
router.delete("/:id", deleteTask);

export default router;