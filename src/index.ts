import "dotenv/config";
import cors from "cors";
import express, { Request, Response } from "express";
import connectToDB from "./connectToDB";
import TasksModel from "./models/TasksModel";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/to-dos", async (req: Request, res: Response) => {
  try {
    const tasks = await TasksModel.find();
    res.json({ success: true, tasks });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

app.post("/to-dos", async (req: Request, res: Response) => {
  try {
    const newTask = new TasksModel();
    newTask.task = req.body.task;
    newTask.notes = req.body.notes;
    newTask.done = req.body.done;
    await newTask.save();
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

app.put("/to-dos/:id", async (req: Request, res: Response) => {
  try {
    const task = await TasksModel.findById(req.params.id);
    if (!task) {
      throw new Error("No Task Found by that ID");
    }
    task.task = req.body.task;
    task.notes = req.body.notes;
    await task.save();
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

app.delete("/to-dos/:id", async (req: Request, res: Response) => {
  try {
    await TasksModel.deleteOne({ _id: req.params.id });
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

app.put("/to-dos/:id/done", async (req: Request, res: Response) => {
  try {
    const task = await TasksModel.findById(req.params.id);
    if (!task) {
      throw new Error("No Task Found by that ID");
    }
    task.done = req.body.done;
    await task.save();
    res.json({ success: true });
  } catch (err) {
    console.log(err);
    res.json({ success: false });
  }
});

app.listen(4000, () => {
  connectToDB();
  console.log("server listening on post 4000!");
});
