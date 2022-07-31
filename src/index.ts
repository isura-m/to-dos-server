import "dotenv/config";
import express, { Request, Response } from "express";
import connectToDB from "./connectToDB";

const app = express();

app.listen(4000, () => {
  connectToDB();
  console.log("server listening on post 4000!");
});
