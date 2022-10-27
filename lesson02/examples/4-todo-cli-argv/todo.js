const db = require("./db");

/**
 * todo add <title>
 * todo list
 * todo remove <id>
 */

async function invokeAction({ action, title, id }) {
  switch (action) {
    case "list":
      const todos = await db.getTodos();
      console.table(todos);

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

// invokeAction({action: "list"});
// invokeAction({ action: "add", title: "new title" });
// invokeAction({ action: "remove", id: "RnPIvLVBP-DbZl_nPMgek" });

const [, , action] = process.argv;
switch (action) {
  case "list":
    invokeAction({ action });
    break;
  case "add":
    console.log("process.argv:", process.argv);
    const [, , , ...titleArgs] = process.argv;
    const title = titleArgs.join(" ");
    invokeAction({ action, title });
    break;

  default:
    break;
}
