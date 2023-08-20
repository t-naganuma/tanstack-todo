import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useTodos } from "../hooks/useTodos";

const Todo = () => {
  const [name, setName] = useState("");
  const { fetchTodos, addTodo, removeTodo, updateTodo } = useTodos();
  const queryClient = useQueryClient();
  const addMutation = useMutation(addTodo, {
    // onSuccess: () => {
    //   queryClient.invalidateQueries("todos");
    // },
    onMutate: () => {
      console.log("onMutate");
    },
    onSuccess: (data, variables, context) => {
      console.log("data", data);
      console.log("variables", variables);
      console.log("context", context);
      console.log("onSuccess");
    },
    onError: () => {
      console.log("onError");
    },
    onSettled: () => {
      console.log("onSettled");
    },
  });

  const deleteMutation = useMutation(removeTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const updateMutation = useMutation(updateTodo, {
    onSuccess: () => {
      queryClient.invalidateQueries("todos");
    },
  });

  const handleChange = (e) => {
    setName(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addMutation.mutate(name);
  };

  const handleCheckChange = (todo) => {
    updateMutation.mutate(todo);
  };

  const handleRemoveTodo = (id) => {
    deleteMutation.mutate(id);
  };

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
      <div>
        <form onSubmit={handleSubmit}>
          Add Todo :
          <input
            placeholder="Add New Todo"
            value={name}
            onChange={handleChange}
          />
          <button>追加</button>
        </form>
      </div>
      <ul>
        {todos?.map((todo) => (
          <li
            key={todo.id}
            style={
              todo.isCompleted === true
                ? { textDecorationLine: "line-through" }
                : {}
            }
          >
            <input
              type="checkbox"
              checked={todo.isCompleted}
              onChange={() =>
                handleCheckChange({ ...todo, isCompleted: !todo.isCompleted })
              }
            />
            {todo.name}
            <button onClick={() => handleRemoveTodo(todo.id)}>×</button>
          </li>
        ))}
      </ul>
    </>
  );
};

export default Todo;
