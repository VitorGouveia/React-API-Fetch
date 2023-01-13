import { createServer } from "miragejs";

type Todo = {
  id: string;
  name: string;
};

export let server = createServer({
  routes() {
    let todos: Todo[] = [
      {
        id: "0",
        name: "laundry",
      },
    ];

    this.get("/todos", async () => {
      // await new Promise((resolve) => setTimeout(resolve, 10000));

      return todos;
    });

    this.post("/todos", (schema, request) => {
      let attrs = JSON.parse(request.requestBody);

      attrs.id = crypto.randomUUID();

      todos.push(attrs);

      return attrs;
    });

    this.put("/todos/:id", (schema, request) => {
      let todoID = request.params.id;
      let attrs = JSON.parse(request.requestBody);

      let todoIndex = todos.findIndex((todo) => todo.id === todoID);

      todos[todoIndex] = {
        ...todos[todoIndex],
        ...attrs,
      };

      return attrs;
    });
  },
});
