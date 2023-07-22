import { useState, useEffect } from "react";
import axios from "axios";
import "./Pagination.css";

const todosPerPage = 10;

function Pagination2() {
  const [todos, setTodos] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    axios
      .get("https://jsonplaceholder.typicode.com/todos")
      .then((response) => {
        setTodos(response.data);
      })
      .catch((err) => {
        console.log("error", err);
      });
  }, []);

  const totalNoOfPages = Math.ceil(todos.length / todosPerPage); // 200/10 =    20-totalNoOfPages
  const pages = [...Array(totalNoOfPages + 1).keys()].slice(1);
  const firstIndexOfPage = currentPage * todosPerPage; //10
  const lastIndexOfPage = firstIndexOfPage - todosPerPage; //0

  const visibleTodos = todos.slice(lastIndexOfPage, firstIndexOfPage);

  function handlePrev() {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  }

  function handleNext() {
    if (currentPage !== 20) setCurrentPage(currentPage + 1);
  }

  return (
    <div>
      <h2>Pagination Mini-Project</h2>
      <h3>
        {visibleTodos.map((todo) => {
          return (
            <p key={todo.id}>
              {todo.id} | {todo.title}
            </p>
          );
        })}
      </h3>
      <div style={{ display: "flex" }}>
        <button onClick={handlePrev}>Prev</button> <br />
        <h2>
          {pages.map((page, index) => {
            return (
              <span
                key={index}
                onClick={() => setCurrentPage(page)}
                style={{ cursor: "pointer" }}
                className={`${currentPage === page ? "active" : ""}`}
              >
                {page} |{" "}
              </span>
            );
          })}
        </h2>{" "}
        <br />
        <button onClick={handleNext}>Next</button>
      </div>
    </div>
  );
}

export default Pagination2;
