import { Router } from "express";

import * as todoController from '../controllers/todoController';

const router = Router();

router.get('/todos', todoController.todos)


export default router;