import { useApi, model, client } from "./core/use-api";

import "./tests/api";

type Todo = {
  id: string;
  name: string;
};

const { data: initialTodos } = await client.get<Todo[]>("/todos");

let todosFetcher = model(
  [] as Todo[],
  (client, state, setState, refresh, { shouldRefresh, stateBehavior }) => ({
    list: (): Todo[] => state,
    create: async ({ name }: { name: string }) => {
      if (stateBehavior !== "skip" && stateBehavior === "eager") {
        setState((_todos) => [
          ..._todos,
          { id: String(state.length + 1), name },
        ]);
      }

      // do calls
      const { data: todo } = await client.post<Todo>("/todos", {
        name,
      });

      if (stateBehavior !== "skip" && stateBehavior === "await") {
        setState((_todos) => [..._todos, todo]);
      }

      if (shouldRefresh && stateBehavior !== "eager") {
        refresh();
      }
      // setState((todos) => [...todos, todo]);

      // return todo;
    },
    edit: async (id: string) => {
      const todo = await client.put<Todo[], {}, Partial<Todo>>(`/todos/${id}`, {
        name: "hell",
      });

      if (shouldRefresh) {
        refresh();
      }

      return todo;
    },
  }),
  "/todos"
);

export let App = () => {
  let { refresh, create, list, edit } = todosFetcher(initialTodos, {
    shouldRefresh: true,
    stateBehavior: "eager",
  });
  let todos = list();

  let createTodo = async () => {
    await create({
      name: `my todo ${todos.length}`,
    });
  };

  return (
    <div>
      <h1>hello world</h1>

      <button onClick={createTodo}>create todo</button>
      <button
        onClick={async () => {
          // await create(`my todo ${todos.length}`, {
          //   stateBehavior: "eager",
          //   shouldRefresh: true,
          // });

          await refresh();
        }}
      >
        refreshing
      </button>

      {todos.map(({ id, name }) => (
        <div key={id} onClick={async () => await edit(id)}>
          {name}
        </div>
      ))}
    </div>
  );
};
