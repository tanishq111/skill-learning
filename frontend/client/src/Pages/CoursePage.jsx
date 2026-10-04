import { ArrowLeft, BookOpen, Clock3, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

import { ErrorState, LoadingState } from "../Components/StatusView.jsx";
import { getCourseById } from "../api/course.js";
// only allowed when you are authenticated
const CoursePage = () => {
  const { courseId } = useParams();
  const [course, setCourse] = useState(null);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  const loadCourse = async () => {
    setStatus("loading");
    setErrorMessage("");

    const res = await getCourseById(courseId);
    if (res.ok) {
      setCourse(res.data);
      setStatus("success");
    } else {
      setErrorMessage(res.error);
      setStatus("error");
    }
  };

  useEffect(() => {
    loadCourse();
  }, [courseId]);

  if (status === "loading") {
    return <LoadingState message="Loading course" />;
  }

  if (status === "error") {
    return <ErrorState message={errorMessage} onRetry={loadCourse} />;
  }

  return (
    <article className="course-detail">
      <Link className="back-link" to="/courses">
        <ArrowLeft aria-hidden="true" size={18} />
        Back to courses
      </Link>

      <div className="course-detail__hero">
        <div>
          <p className="eyebrow">{course.category}</p>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          {course.instructor?.name ? (
            <p className="course-detail__instructor">
              Taught by <strong>{course.instructor.name}</strong>
            </p>
          ) : null}
        </div>
        {course.imageUrl ? <img src={course.imageUrl} alt={course.imageAlt} /> : null}
      </div>

      <ul className="course-detail__facts" aria-label="Course facts">
        <li><BookOpen aria-hidden="true" /> {course.level}</li>
        <li><Clock3 aria-hidden="true" /> {course.status}</li>
        <li><Star aria-hidden="true" /> {course.rating} rating</li>
      </ul>

      {course.skills?.length ? (
        <section aria-labelledby="skills-title">
          <h2 id="skills-title">Skills you will practice</h2>
          <ul className="tag-list">
            {course.skills.map((skill) => <li key={skill}>{skill}</li>)}
          </ul>
        </section>
      ) : null}

      {course.outline?.length ? (
        <section aria-labelledby="outline-title">
          <h2 id="outline-title">Course outline</h2>
          <ol className="outline-list">
            {course.outline.map((lesson) => <li key={lesson}>{lesson}</li>)}
          </ol>
        </section>
      ) : null}
    </article>
  );
};

export default CoursePage;
