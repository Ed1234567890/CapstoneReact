import { useState, useCallback, useEffect } from "react";

//Component for current distinct categories in a drop down bar
const CategoryDropDown = (props) => {
  const [categoryDropDown, setCategoryDropDown] = useState([]);

  //Calling endpoint for all categories
  const fetchCategoryHandler = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8080/AllCategory");
      if (!response.ok) {
        throw new Error("Something crashed:" + response.statusText);
      }
      const data = await response.json();
      setCategoryDropDown(data);
    } catch (error) {
      alert(error);
    }
  }, []);

  //calling endpoint on load
  useEffect(() => {
    fetchCategoryHandler();
  }, [fetchCategoryHandler]);

  //returns a drop down bar with categories
  return (
    <select
      name="category"
      id="category"
      onChange={props.questionTextChangeHandler}
    >
      <option value=""></option>
      {categoryDropDown.map((cat) => (
        <option key={cat} value={cat}>
          {cat}
        </option>
      ))}
    </select>
  );
};

export default CategoryDropDown;
