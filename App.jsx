import React, { useState } from "react";
import data from "./Data.json";
import "./App.css";

const App = () => {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const recordPerPage = 5;
  const lastIndex = currentPage * recordPerPage;
  const firstIndex = lastIndex - recordPerPage;
  const records = data.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(data.length / recordPerPage);
  const numbers = [...Array(nPage + 1).keys()].slice(1);

  const previousHandle = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextHandle = () => {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const changeHandle = (m) => {
    setCurrentPage(m);
  };
  const filteredData = data.filter((item) =>
    search.toLowerCase() === ""
      ? true
      : item.name.toLowerCase().includes(search) ||
        item.email.toLowerCase().includes(search)
  );
  const paginatedData = filteredData.slice(firstIndex, lastIndex);

  return (
    <div className="app">
      <div className="heading">
        <h1>Below is the Data</h1>
      </div>
      <div className="search">
        <input
          placeholder="Search Your Data Here"
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>
      <div className="table">
        <table className="table">
          <thead>
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Email</th>
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((item, i) => (
              <tr key={i}>
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>{item.email}</td>
              </tr>
            ))}
          </tbody>
        </table>{" "}
      </div>
      <div className="navigate">
        <ul className="pagination">
          <li className="page-item">
            <a className="page-link click" onClick={previousHandle}>
              Previous
            </a>
          </li>
          {numbers.map((item, i) => (
            <li
              className={`page-item ${currentPage === item ? "active" : ""}`}
              key={i}
            >
              <a className="page-link click" onClick={() => changeHandle(item)}>
                {item}
              </a>
            </li>
          ))}
          <li className="page-item">
            <a className="page-link click" onClick={nextHandle}>
              Next
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default App;
