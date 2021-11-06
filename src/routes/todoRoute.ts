import { Router } from "express";

import * as todoController from '../controllers/todoController';

const router = Router();

router.get('/todos', todoController.all)
router.post('/todos', todoController.add)
router.put('/todos/:id', todoController.update)
router.delete('/todos/:id', todoController.remove)




export default router;