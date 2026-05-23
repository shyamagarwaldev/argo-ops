import express from "express";
import { prisma } from "./db";
import os from "os";
const app = express();
app.use(express.json());
app.get("/", (req, res) => {
  res.json({
    message: "hello world",
  });
});

app.get("/random", (req, res) => {
  res.json({
    rn: Math.random(),
  });
});

app.get("/users", async (req, res) => {
  const users = await prisma.user.findMany();
  res.json({ users: { ...users }, hostIP: os.hostname() });
});

app.post("/user", async (req, res) => {
  const { username, password } = req.body;
  const user = await prisma.user.create({
    data: {
      username,
      password,
    },
  });
  res.json({
    ...user,
  });
});

app.listen(3000);
