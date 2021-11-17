import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

function Detail() {
  const [todo, setTodo] = useState({});
  const [title, setTitle] = useState(todo.title);
  const [body, setBody] = useState(todo.body);

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    function todoDetail() {
      fetch(`http://localhost:4000/todo/${params.id}`, {
        method: "GET",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((data) => setTodo(data))
        .catch((err) => console.log(err.message));
    }
    todoDetail();
  }, []);
  function updateTodo(e) {
    e.preventDefault();
    fetch(`http://localhost:4000/todo/${todo._id}`, {
      method: "PUT",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        body: body,
      }),
    })
      .then((res) => res.json())
      .then((updatedTodo) => {
        setTodo(updatedTodo);
        navigate("/");
      })
      .catch((err) => console.log(err.message));
  }

  return (
    <div>
      <h2>detail page</h2>
      <div>
        <form>
          <label>Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={todo.title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <label>Body</label>
          <input
            type="text"
            name="body"
            defaultValue={todo.body}
            onChange={(e) => setBody(e.target.value)}
          />
          <button onClick={updateTodo}>Update</button>
        </form>
      </div>
    </div>
  );
}

export default Detail;
