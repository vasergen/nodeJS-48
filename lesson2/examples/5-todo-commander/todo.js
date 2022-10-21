const { program } = require("commander");

const db = require("./db");

async function invokeAction({ action, title, id, limit }) {
  switch (action) {
    case "list":
      console.log("limit", limit);
      const todos = await db.getTodos();
      if (limit) {
        console.table(todos.slice(-limit));
      } else {
        console.table(todos);
      }

      break;

    case "add":
      await db.addTodo(title);
      break;

    case "remove":
      await db.removeTodo(id);
      break;

    default:
      throw new Error(`Unknown action: ${action}`);
  }
}

program
  .command("list")
  .alias("ls")
  .option("-l, --limit <limit>")
  .action(async (options) => {
    invokeAction({ action: "list", limit: options.limit });
  });

program.command("add <titleArgs...>").action(async (options) => {
  invokeAction({ action: "add", title: options.join(" ") });
});

program.command("remove <id>").action(async (options) => {
  const id = options;
  invokeAction({ action: "remove", id });
});

program.parse();
