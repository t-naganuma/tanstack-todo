import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTodos = async () => {
  const res = await axios.get("http://localhost:3001/todos");
  return res.data;
};

const Todo = () => {
  const {
    data: todos,
    isLoading,
    isError,
    error,
  } = useQuery(["todos"], fetchTodos);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <h1>Todo一覧</h1>
      <ul>
        {todos?.map((todo) => (
          <li key={todo.id}>{todo.name}</li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
