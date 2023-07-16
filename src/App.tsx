import * as React from 'react';
import './style.css';

type Todo = {
  id: number;
  name: string;
  isDone: boolean;
};

const App = () => {
  const [doneCount, setDoneCount] = React.useState(0);
  const [todos, setTodos] = React.useState<Todo[]>([
    {
      id: 1,
      name: 'Eat',
      isDone: false,
    },
    {
      id: 2,
      name: 'Watch TV',
      isDone: false,
    },
  ]);

  const handleChangeCheckBox = (id: number) => {
    setTodos((prevTodos) => {
      const updatedTodos = prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isDone: !todo.isDone };
        }
        return todo;
      });

      const newDoneCount = updatedTodos.filter((todo) => todo.isDone).length;
      setDoneCount(newDoneCount);

      return updatedTodos;
    });
  };

  const handleAddTodo = () => {
    setTodos((prevTodos) => {
      const newTodo = { id: prevTodos.length + 1, name: '', isDone: false };
      return [...prevTodos, newTodo];
    });
  };

  const handleChangeInput = (
    e: React.FocusEvent<HTMLInputElement>,
    id: number
  ) => {
    const updatedName = e.target.value;
    setTodos((prevTodos) => {
      return prevTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, name: updatedName };
        }
        return todo;
      });
    });
  };

  return (
    <div
      className={`container ${
        todos.length > 0 && doneCount === todos.length ? 'all-done' : ''
      }`}
    >
      <div className="card">
        <div className="header">Todo List</div>
        <div className="content">
          {todos.map((todo) => (
            <div key={todo.id} className="todo">
              <input
                type="checkbox"
                value={todo.isDone.toString()}
                onChange={() => handleChangeCheckBox(todo.id)}
                checked={todo.isDone}
                disabled={!todo.name}
              />
              {!todo.name ? (
                <input
                  onBlur={(e) => handleChangeInput(e, todo.id)}
                  autoFocus
                />
              ) : (
                <label>{todo.name}</label>
              )}
            </div>
          ))}
        </div>
        <div className="footer">
          <div className="status">
            {doneCount} out of {todos.length} todos done
          </div>
          <button onClick={handleAddTodo}>Add Todo</button>
        </div>
      </div>
    </div>
  );
};

export default App;
