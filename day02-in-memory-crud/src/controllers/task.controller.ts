import { Request, Response } from "express";
import { tasks } from "../models/task.model";
import { Task } from "../types/task.types";

let idCounter = 1;

export const createTask = (req: Request, res: Response) => {
    const { title } = req.body;
    const newTask: Task = { id: idCounter++, title, completed: false };
    tasks.push(newTask);
    res.status(201).json(newTask);
};

export const getTasks = (_req: Request, res: Response) => {
    res.json(tasks);
};

export const getTask = (req: Request<{ id: string }>, res: Response
) => {
    const id = parseInt(req.params.id);
    const task = tasks.find(t => t.id === id);
    res.json({ task });
};

export const updateTask = (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        res.status(404).json({ message: "Task not found" });
        return;
    }

    task.title = req.body.title ?? task.title;
    task.completed = req.body.completed ?? task.completed;

    res.json(task);
};

export const deleteTask = (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
        res.status(404).json({ message: "Task not found!" });
        return;
    }

    tasks.splice(index, 1);
    res.status(204).send();
};