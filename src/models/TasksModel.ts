import { model, Schema } from "mongoose";

const tasksSchema = new Schema({
  task: String,
  notes: String,
  done: Boolean,
});

const TasksModel = model("task", tasksSchema);

export default TasksModel;
