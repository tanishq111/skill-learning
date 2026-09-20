import { ArrowLeft, ArrowRight } from "lucide-react";
import { Link, Navigate, Route, Routes, useParams } from "react-router-dom";

import "./App.css";
import AppLayout from "./Components/AppLayout";


 const practiceCourses = [
  { id: "react-foundations", title: "React Foundations" },
  { id: "node-api-design", title: "Practical Node API Design" },
];

const CoursesPage = () => {
  return (
    <section className="catalogue-page">
      <header className="page-heading">
        <p className="eyebrow">Course catalogue</p>
        <h1>Build a skill you can use</h1>
        <p>Choose a focused course and learn through practical lessons.</p>
      </header>

      <ul className="course-list">
        {practiceCourses.map((course, index) => (
          <li className="course-list__item" key={course.id}>
            <Link className="course-link" to={`/courses/${course.id}`}>
              <span className="course-link__number">0{index + 1}</span>
              <span className="course-link__title">{course.title}</span>
              <ArrowRight aria-hidden="true" size={22} />
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
}

const CoursePage = () => {
  const { courseId } = useParams();
  const course = practiceCourses.find((item) => item.id === courseId);

  return (
    <section className="detail-page">
      <Link className="back-link" to="/courses">
        <ArrowLeft aria-hidden="true" size={18} />
        Back to courses
      </Link>
      <p className="eyebrow">Course details</p>
      <h1>{course ? course.title : "Course not found"}</h1>
      <p>
        {course
          ? "This course page is ready for lessons, instructor details, and enrollment information."
          : "The requested course does not match our catalogue."}
      </p>
    </section>
  );
}

const SignInPage = () => {
  return (
    <section className="detail-page">
      <p className="eyebrow">Welcome back</p>
      <h1>Sign in</h1>
      <p>The complete sign-in form will be added in the authentication lesson.</p>
    </section>
  );
}

const App = () => {
  return (
    <AppLayout>
      <Routes>
        <Route path="/" element={<Navigate replace to="/courses" />} />
        <Route path="/courses" element={<CoursesPage />} />
        <Route path="/courses/:courseId" element={<CoursePage />} />
        <Route path="/login" element={<SignInPage />} />
        <Route path="/register" element={<SignInPage />} />
        <Route path="*" element={<Navigate replace to="/courses" />} />
      </Routes>
    </AppLayout>
  );
}

export default App;
 