import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyCourses, deleteCourse } from "../api/course";
import { LoadingState, EmptyState, ErrorState } from "../Components/StatusView";

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState("loading");
  const [error, setError] = useState("");

  const load = async () => {
    setStatus("loading");
    const res = await getMyCourses();
    if (res.ok) {
      setCourses(res.data);
      setStatus("ready");
    } else {
      setError(res.error);
      setStatus("error");
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this course? This cannot be undone.")) {
      return;
    }
    const res = await deleteCourse(id);
    if (res.ok) {
      setCourses((current) => current.filter((course) => course._id !== id));
    } else {
      setError(res.error);
    }
  };

  if (status === "loading") return <LoadingState message="Loading your courses..." />;
  if (status === "error") return <ErrorState message={error} onRetry={load} />;

  return (
    <section className="catalogue-page" aria-labelledby="dashboard-title">
      <div className="page-header">
        <div>
          <p className="eyebrow">Instructor</p>
          <h1 id="dashboard-title">Your courses</h1>
        </div>
        <Link className="button" to="/teach/new">New course</Link>
      </div>

      {courses.length === 0 ? (
        <EmptyState title="No courses yet">
          Create your first course to get started.
        </EmptyState>
      ) : (
        <ul className="course-admin-list">
          {courses.map((course) => (
            <li key={course._id} className="course-admin-row">
              <div>
                <h2>{course.title}</h2>
                <p className="course-admin-row__meta">
                  <span className={`badge badge--${course.status}`}>{course.status}</span>
                  <span>{course.priceInr === 0 ? "Free" : `₹${course.priceInr}`}</span>
                </p>
              </div>
              <div className="course-admin-row__actions">
                <Link className="button button--small button--ghost" to={`/teach/${course._id}/edit`}>
                  Edit
                </Link>
                <button
                  className="button button--small button--danger"
                  type="button"
                  onClick={() => handleDelete(course._id)}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
};

export default InstructorDashboard;
