const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const dbPath = path.join(__dirname, "./db.json");

async function getDb() {
  const dbRaw = await fs.readFile(dbPath);
  const db = JSON.parse(dbRaw);
  return db;
}

async function getTodos() {
  const db = await getDb();
  return db.todos;
}

async function addTodo(title) {
  const id = nanoid();
  const todo = { id, title };
  const db = await getDb();
  db.todos.push(todo);
  await fs.writeFile(dbPath, JSON.stringify(db));

  return todo;
}

async function removeTodo(id) {
  const db = await getDb();
  const todo = db.todos.find((item) => item.id === id);
  if (!todo) {
    return null;
  }
  const todos = db.todos.filter((item) => item.id !== id);
  db.todos = todos;
  await fs.writeFile(dbPath, JSON.stringify(db));
  return todo;
}

module.exports = {
  getTodos,
  addTodo,
  removeTodo,
};
