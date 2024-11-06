import "./App.css";
import { useState } from "react";
function App() {
  const [todos, setTodo] = useState([
    {
      title: "Go to Gym",
      description: "hit regularly gym",
      done: false,
    },
  ]);
  function addTodo() {
    let newArray = [];
    for (let i = 0; i < todos.length; i++) {
      newArray.push(todos[i]);
    }
    newArray.push({
      title: document.getElementById("title").value,
      description: document.getElementById("description").value,
      done: true,
    });
    setTodo(newArray);
  }
  return (
    <div className="App">
      <input type="text" id="title" placeholder="title"></input>
      <input type="text" id="description" placeholder="description"></input>
      <br />
      <button onClick={addTodo}>Add Todo</button>
      {todos.map((todo) => (
        <Display
          title={todo.title}
          description={todo.description}
          done={todo.done}
        />
      ))}
    </div>
  );
}

function Display(props) {
  return (
    <div>
      <h1>{props.title}</h1>
      <h3>{props.description}</h3>
      <h4>{props.done ? "completed" : "not completed"}</h4>
    </div>
  );
}

export default App;
