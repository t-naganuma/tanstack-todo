import axios from "axios";

export const useTodos = () => {
  const fetchTodos = async () => {
    const res = await axios.get("http://localhost:3001/todos");
    return res.data;
  };

  const addTodo = async ({ name, isCompleted }) => {
    const res = await fetch("http://localhost:3001/todos/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
      }),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return res.json();
  };

  const removeTodo = async (id) => {
    const res = await fetch(`http://localhost:3001/todos/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return res.json();
  };

  const updateTodo = async (todo) => {
    const res = await fetch(`http://localhost:3001/todos/${todo.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(todo),
    });
    if (!res.ok) {
      throw new Error(`${res.status} ${res.statusText}`);
    }
    return res.json();
  };

  return { fetchTodos, addTodo, removeTodo, updateTodo };
};
