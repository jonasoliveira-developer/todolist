import {Request, Response} from 'express';
import {Todo} from '../models/todo';

export const  todos = async (req: Request, res: Response) => {
    let todoslist = await Todo.findAll();

    res.json({todoslist})

}