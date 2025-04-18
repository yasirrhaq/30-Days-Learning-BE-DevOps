import { Request, Response } from "express";
import { tasks } from "../models/task.model";
import { Task } from "../types/task.types";
import { ApiError } from "../utils/ApiError";

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

    if(!task){
        throw new ApiError(404, "Task not found");
    }

    res.json({ success:true, data: task });
};

export const updateTask = (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const task = tasks.find(t => t.id === id);
    if (!task) {
        // res.status(404).json({ message: "Task not found" });
        throw new ApiError(404, "Task not found");
        // return;
    }

    task.title = req.body.title ?? task.title;
    task.completed = req.body.completed ?? task.completed;

    res.json({success: true, data: task});
};

export const deleteTask = (req: Request, res: Response) => {
    const id = parseInt(req.params.id as string);
    const index = tasks.findIndex(t => t.id === id);
    if (index === -1) {
        // res.status(404).json({ message: "Task not found!" });
        // return;
        throw new ApiError(404, "Task not found");
    }

    tasks.splice(index, 1);
    res.status(200).json({success: true, message: "Succesfully delete!"});
};