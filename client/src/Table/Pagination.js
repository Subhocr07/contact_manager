import React, { useState, useEffect } from "react";
import vector_10 from "../asserts/Vector(1).png"
import vector_11 from "../asserts/Vector(2).png"
import"./pagination.css"

const Pagination = ({ showPerPage, onPaginationChange, total }) => {
  const [counter, setCounter] = useState(1);
  const numberOfButtons= Math.ceil(total / showPerPage)
  

  useEffect(() => {
    const value = showPerPage * counter;
    onPaginationChange(value - showPerPage, value);
  }, [counter]);

  const onButtonClick = (type) => {
    if (type === "prev") {
      if (counter === 1) {
        setCounter(1);
      } else {
        setCounter(counter - 1);
      }
    } else if (type === "next") {
      if (numberOfButtons === counter) {
        setCounter(counter);
      } else {
        setCounter(counter + 1);
      }
    }
  };
  return (
    <div className="pagination-container">
      <nav aria-label="Page navigation example">

            <div
              className="page-link"
              
              onClick={() => onButtonClick("prev")}
            >
              <img src={vector_10} alt="rightarrow"></img>
            </div>

          {new Array(numberOfButtons).fill("").map((el, index) => (
            <div className={`page-item ${index + 1 === counter ? "active" : null}`}>
              <div
                className="page-link"
                
                onClick={() => setCounter(index + 1)}
              >
                {index + 1}
              </div>
            </div>
          ))}
          <div className="page-item"  onClick={() => onButtonClick("next")}>
            <img src={vector_11} alt="arrow"></img>
            </div>
      </nav>
    </div>
  );
};

export default Pagination;
