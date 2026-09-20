
// const courses = [
//   {
//     id: "react-foundations",
//     title: "React Foundations",
//     level: "Beginner",
//     lessonCount: 12,
//     featured: true,
//   },
//   {
//     id: "node-api-design",
//     title: "Practical Node API Design",
//     level: "Intermediate",
//     lessonCount: 18,
//     featured: true,
//   },
// ];



// const ContentSection = ({ title, children }) => {
//   return (
//     <section aria-labelledby="course-section-title">
//       <h2 id="course-section-title">{title}</h2>
//       {children} 
//     </section>
//   );
// }


// const SiteHeader = () => {
//   return (
//     <header>
//       <p className="eyebrow">SkillSpring</p>
//       <h1>Learn practical skills</h1>
//     </header>
//   );
// }

// const CoursePreview = (props) => {// 100s
//   const {title, level, lessons} = props; // props destructuring
//   return (
//     <article>
//       <p>{level}</p>
//       <h2>{title}</h2>
//       <p>{lessons} lessons</p>
//     </article>
//   );
// }

// const App = () => {
//   return (
//     <main>
//       <SiteHeader />
//       <section aria-label="Featured course">
//         <ContentSection title="Featured Courses">
//           {courses.filter(course => course.featured).map(course => (
//             <CoursePreview 
//               key={course.id}
//               title={course.title}
//               level={course.level}
//               lessons={course.lessonCount}
//             />
//           ))}
//         </ContentSection>
//       </section>
//     </main>
//   );
// }

// export default App;


















// import { useState } from "react";

// const App = () => {
//   const totalLessons = 12;
//   const [sum, setSum] = useState(0);
//   const [completedLessons, setCompletedLessons] = useState(0);

//   const completeOneLesson = () => {
//     setCompletedLessons((current) => Math.min(current + 1, totalLessons));
      //  setSum(sum+1) 
      //   setSum(sum+1)
      //    setSum(sum+1)

//     setSum(sum => sum + 1);
//     setSum(sum => sum + 1);
//     setSum(sum => sum + 1);
//   }

//   return (
//     <main>
//       <h1>React Foundations</h1>
//       <p>
//         {completedLessons} of {totalLessons} lessons complete (Sum: {sum})
//       </p>
//       <button
//         type="button"
//         onClick={completeOneLesson}
//         disabled={completedLessons === totalLessons}
//       >
//         Complete one lesson
//       </button>
//     </main>
//   );
// }

// export default App;












// import { useState } from "react";

// const courses = [
//   { id: "react", title: "React Foundations" },
//   { id: "node", title: "Practical Node API Design" },
//   { id: "ux", title: "UX Research Essentials" },
// ];

// const App = () => {

//   console.log("App rendered");
//   const [search, setSearch] = useState("");
//   console.log("search:", search);
//   const normalizedSearch = search.trim().toLowerCase();
//   const visibleCourses = courses.filter((course) =>
//     course.title.toLowerCase().includes(normalizedSearch),
//   );


//   console.log("visibleCourses:", visibleCourses);

//   const handleSearchChange = (event) => {
//     setSearch(event.target.value);
//   }

//   return (
//     <main>
//       <h1>Find a course</h1>

//       <label htmlFor="course-search">Search courses</label>
//       <input
//         id="course-search"
//         type="search"
//         value={search}
//         onChange={handleSearchChange}
//       />

//       <p>{visibleCourses.length} courses found</p>
//       <ul>
//         {visibleCourses.map((course) => (
//           <li key={course.id}>{course.title}</li>
//         ))}
//       </ul>
//     </main>
//   );
// }

// export default App;




// import { useState } from "react";


// export const App = () => {
//   const initialProfile = {
//   name: "Aarav Sharma",
//   preferences: {
//     emailUpdates: true,
//     compactLessons: false,
//   },
//   skills: ["HTML", "CSS"],
// };
//   const [profile, setProfile] = useState(initialProfile);
//   const [score, setScore] = useState(0);


//   const updateName = (newName) => { // spread operator to update nested state
//     setProfile((current) => ({
//       ...current,
//       name: newName,
//     }));
//   };

//   const addThreeIncorrectly = () => {
//     setScore(score + 1);
//     setScore(score + 1);
//     setScore(score + 1);
//   }

//   const addThreeCorrectly = () => {
//     setScore((current) => current + 1);
//     setScore((current) => current + 1);
//     setScore((current) => current + 1);
//   }

//   return (
//     <main>
//       <h1>Score: {score}</h1>
//       <button type="button" onClick={addThreeIncorrectly}>
//         Try +3 with snapshots
//       </button>
//       <button type="button" onClick={addThreeCorrectly}>
//         Add 3 with updater functions
//       </button>
//     </main>
//   );
// };





































// import { useState, useEffect } from "react";

// const courses = [
//   { id: "react", title: "React Foundations" },
//   { id: "node", title: "Practical Node API Design" },
//   { id: "ux", title: "UX Research Essentials" },
// ];

// const CourseRow = ({ course, isBookmarked, onToggleBookmark }) => {
//   // some state
//   return (
//     <li>
//       <span>{course.title}</span>
//       <button type="button" onClick={() => onToggleBookmark(course.id)}>
//         {isBookmarked ? "Remove bookmark" : "Bookmark"}
//       </button>
//     </li>
//   );
// }

// const App = () => {
//   const [bookmarkedIds, setBookmarkedIds] = useState([]);

//   useEffect(() => {
//   document.title = `${bookmarkedIds.length} bookmarked courses`;

//   return () => {
//     // this will run when the component is unmounted or before the effect runs again
//     document.title = "SkillSpring";
//   };
// }, [bookmarkedIds.length]);



// useEffect(() => {
//   console.log("bookmarkedIds changed:", bookmarkedIds);
// }, [bookmarkedIds]);

// in case of empty dependency array this will run in every render (only once after the initial render)
// useEffect(() => {
//   console.log("bookmarkedIds changed:", bookmarkedIds);
// }, []);

// in case of no dependency array is provided, this will run only once at initial render.
// useEffect(()=>{
//   console.log("bookmarkedIds changed:", bookmarkedIds);
// });

//   const toggleBookmark = (courseId) => {

//     console.log("toggling bookmark for courseId:", courseId);
//     setBookmarkedIds((current) =>
//       current.includes(courseId)
//         ? current.filter((id) => id !== courseId)
//         : [...current, courseId],
//     );
//   }

//   return (
//     <main>
//       <h1>Course bookmarks</h1>
//       <p>{bookmarkedIds.length} bookmarked</p>
//       <ul>
//         {courses.map((course) => (
//           // 10 more components could be added here if needed
//           <CourseRow
//             key={course.id}
//             course={course}
//             isBookmarked={bookmarkedIds.includes(course.id)}
//             onToggleBookmark={toggleBookmark}
//           />
//         ))}
//       </ul>
//     </main>
//   );
// }

// export default App;






// USE CALLBACK HOOK TO MEMOIZE FUNCTIONS

// import React, { useState,useCallback } from "react";

// const App = () => {
//   return <ParentComponent />;
// };

// // this will only re render when the props are changing, otherwise it will not re-render even if the parent component re-renders
// const ChildComponent = React.memo(({ handleLog }) => { // i dont want this component to re-render unnecessarily if its parent changes
//   const [renderCount, setRenderCount] = useState(0);
//   const handleRender = () => setRenderCount((prev) => prev + 1);
//   console.log("ChildComponent rendered");
//   return (
//     <div>
//       <button onClick={handleRender}>Child (Rendered {renderCount} times)</button>
//       <button onClick={handleLog}>Log Count</button>
//     </div>
//   );
// });

// const ParentComponent = () => {
//   console.log("ParentComponent rendered");
//   const [count, setCount] = useState(0);
//   const handleClick = () => {
//     console.log("Increment button clicked");
//      setCount((prevCount) => prevCount + 1);
//    };

//    const handleLog = useCallback(() => {
//      console.log("Current count:", count);
//    }, [count]);

//    return (
//      <div>
//        <p>Count: {count}</p>
//        <button onClick={handleClick}>Parent Increment</button>
//        <ChildComponent handleLog={handleLog} />
//      </div>
//    );
//   };


//   export default App;