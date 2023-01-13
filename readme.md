# React API Fetch
A gateway between APIs and your React Application.
## Usage
First, import the `model` function from the use-api hook file.

Then, instatiate a new model by passing 3 parameters

- schema
- methods
- endpoint

```tsx
let myFetcher = model(
  [{ id: "0", name: "vitor gouveia" }],
  () => ({}),
  "/endpoint"
)
```

After that, create some methods.

```tsx
let myFetcher = model(
  [{ id: "0", name: "vitor gouveia" }],
  (client, state, setState, refresh, config) => ({
    list: (): Todo[] => state,
    create: async (props) => {
      await client.post("/data", props)

      refresh();
    },
    fetchNewList: async () => {
      refresh();
    }
  }),
  "/endpoint"
)
```

Then, feel the power of the typescript type system by using this inside your react application:

```tsx
function App() {
  let { list, create, fetchNewList } = todosFetcher(initialTodos)
  
  let todos = list();

  return (
    <div>
      {todos.map(({ id, name }) => (
        <div key={id}>{name}</div>
      ))}
      
      <button
        onClick={async () => await create({
          name: "john doe"
        })}
      >Create new user</button>

      <button
        onClick={fetchNewList}
      >Fetch new list</button>
    </div>
  )
}
```