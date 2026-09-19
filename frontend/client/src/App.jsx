import api from "./api/simple.js";
import { useState } from "react";

const App = (props) => {

  console.log("App Rendered");
   const [sum, setSum] = useState(10);
   const updateSum = () => {
     setSum(sum + 1);
   };

   const [courses, setCourses] = useState([]);
  const handleClick = () => {
    console.log(`Button clicked by TTTTTTTTTTTTTTTTT ${props.name}`);
    api.get("/courses").then(response => {
      console.log("Response from server:", response.data);
      setCourses(response.data);
    }).catch(error => {
      console.error("Error fetching data:", error);
    });
  };

  return (
    <div>
      <h1>Hello {props.name}! {sum}</h1>
      <button onClick={handleClick}>Click Me</button>
      <ul>
        {courses.map(course => (
          <li style={{  fontWeight: "bold" , color: "blue"}} key={course.id}>{course.name}</li>
        ))}
      </ul>
      <button onClick={updateSum}>Update Sum</button>
      <p>Sum: {sum}</p>
    </div>
  );
}

export default App;