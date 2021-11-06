import { doesNotMatch } from 'assert';
import {Request, Response} from 'express';
import {Todo} from '../models/todo';

export const  all = async (req: Request, res: Response) => {
    let todoslist = await Todo.findAll();

    res.json({todoslist})

}

export const  add = async (req: Request, res: Response) => {
    if(req.body.title) {
        let newTodo = await Todo.create({
            title: req.body.title,
            done: req.body.done ? true : false
        })

        res.status(201).json({item:newTodo})
    }else{
        res.json({error: 'Por favor preencha o campo de titulo'})
    }

}

export const  update = async (req: Request, res: Response) => {
    const {id} = req.params

    let todo = await Todo.findByPk(id)
    if(todo) {
        
        if(req.body.title) {
            todo.title = req.body.title
        }
         if (req.body.done) {
            switch(req.body.done.toLowerCase()) {
                case 'true':
                case'1':
                    todo.done = true
                    break
                
                case 'false':
                case '0':
                    todo.done = false
                    break
            }
        }

        await todo.save()
        res.json({todo})

    }else{
        res.json({error: 'Item não encontrado'})
    }

}

export const  remove = async (req: Request, res: Response) => {
    const {id} = req.params

    let todo = await Todo.findByPk(id)
    if(todo) {
        todo.destroy()
        
    }else{
        res.json({})
    }

}