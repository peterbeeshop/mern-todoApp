import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
function Todos() {
  const [data, setData] = useState([]);

  //fetching all todo from db
  useEffect(() => {
    function fetchData() {
      fetch("http://localhost:4000/todo", {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((todos) => setData(todos))
        .catch((err) => console.log(err.message));
    }
    fetchData();
  }, []);

  const deleteTodo = (e) => {
    const id = e.target.id;
    fetch(`http://localhost:4000/todo/${id}`, {
      method: "DELETE",
    })
      .then(() => {
        window.location.href = "/";
      })
      .catch((err) => console.log(err.message));
  };
  return (
    <div>
      {data.map((todo) => {
        return (
          <div key={todo._id}>
            <h1>{todo.title}</h1>
            <button id={todo._id} onClick={deleteTodo}>
              X
            </button>
            <Link to={`detail/${todo._id}`}>update</Link>
          </div>
        );
      })}
    </div>
  );
}

export default Todos;
