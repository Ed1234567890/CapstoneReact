import { useState, useCallback, useEffect } from "react";
import "./FormStyle.css"


const QuizChoice = (props)=>{
    const [category, setCategory] = useState([]);

    //Fetches all category
    const fetchCategoryHandler = useCallback(async () => {
        try {
          const response = await fetch("http://localhost:8080/AllCategory");
          if (!response.ok) {
            throw new Error("Something crashed:" + response.statusText);
          }
          const data = await response.json();
          setCategory(data);
        } catch (error) {
          alert(error.message);
        }
      }, []);
      
      //fetches on load
      useEffect(() => {
        fetchCategoryHandler();
      }, [fetchCategoryHandler]);

    return(
      <form onSubmit={props.startQuizHandler}>
      <h1>Choose your Categories</h1>
      <ul>
        {category.map((cat,index)=>
            <span key={index}>
              <input type="checkbox" key={cat} id={cat} onChange={props.selectedCategoryHandler} />
              {cat}</span>
            )}
       </ul>
       <h3>You have chose:</h3>
       <ul>
          {props.selectedCategory && props.selectedCategory.map((cat)=>
            <li key={cat}><span>{cat}</span></li>
          )}
       </ul>

      <button type="submit">Take Quiz!</button>
      </form>

    )
}

export default QuizChoice;