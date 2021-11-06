"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.remove = exports.update = exports.add = exports.all = void 0;
const todo_1 = require("../models/todo");
const all = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let todoslist = yield todo_1.Todo.findAll();
    res.json({ todoslist });
});
exports.all = all;
const add = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (req.body.title) {
        let newTodo = yield todo_1.Todo.create({
            title: req.body.title,
            done: req.body.done ? true : false
        });
        res.status(201).json({ item: newTodo });
    }
    else {
        res.json({ error: 'Por favor preencha o campo de titulo' });
    }
});
exports.add = add;
const update = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let todo = yield todo_1.Todo.findByPk(id);
    if (todo) {
        if (req.body.title) {
            todo.title = req.body.title;
        }
        if (req.body.done) {
            switch (req.body.done.toLowerCase()) {
                case 'true':
                case '1':
                    todo.done = true;
                    break;
                case 'false':
                case '0':
                    todo.done = false;
                    break;
            }
        }
        yield todo.save();
        res.json({ todo });
    }
    else {
        res.json({ error: 'Item não encontrado' });
    }
});
exports.update = update;
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    let todo = yield todo_1.Todo.findByPk(id);
    if (todo) {
        todo.destroy();
    }
    else {
        res.json({});
    }
});
exports.remove = remove;
