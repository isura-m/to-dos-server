import "dotenv/config";
import express, { Request, Response } from "express";
import connectToDB from "./connectToDB";
import TasksModel from "./models/TasksModel";

const app = express();
app.use(express.json());

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
    await newTask.save();
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
