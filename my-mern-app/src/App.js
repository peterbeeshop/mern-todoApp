import "./App.css";
import Todos from "./comp/Todos";
function App() {
  return (
    <div className="App">
      <h1>mern todo</h1>
      <form action="http://localhost:4000/todo" method="post">
        <label >Title</label>
        <input type="text" name="title" id="title" />
        <label >Body</label>
        <input type="text" name="body" id="body" />
        <button type="submit">Submit</button>
      </form>
      <h2> Todos</h2>
      <div>
        <Todos/>
      </div>
    </div>
  );
}

export default App;
