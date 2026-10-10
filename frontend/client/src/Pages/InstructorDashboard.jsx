import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getMyCourses, deleteCourse } from "../api/course";
import { LoadingState, EmptyState, ErrorState } from "../Components/StatusView";

const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loadStatus, setLoadStatus] = useState("loading");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [meta, setMeta] = useState({ page: 1, total: 0, totalPages: 0 });
  const [retryCount, setRetryCount] = useState(0);
  const [error, setError] = useState("");

  useEffect(() => {
    let cancelled = false;
    setLoadStatus("loading");
    setError("");

    getMyCourses({ status: statusFilter || undefined, page }).then((res) => {
      if (cancelled) return;
      if (res.ok) {
        setCourses(res.data.data);
        setMeta(res.data.meta);
        setLoadStatus("ready");
      } else {
        setError(res.error);
        setLoadStatus("error");
      }
    });

    return () => {
      cancelled = true;
    };
  }, [page, retryCount, statusFilter]);

  const handleStatusChange = (event) => {
    setStatusFilter(event.target.value);
    setPage(1);
  };

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

  if (loadStatus === "loading") return <LoadingState message="Loading your courses..." />;
  if (loadStatus === "error") {
    return <ErrorState message={error} onRetry={() => setRetryCount((count) => count + 1)} />;
  }

  return (
    <section className="catalogue-page" aria-labelledby="dashboard-title">
      <div className="page-header">
        <div>
          <p className="eyebrow">Instructor</p>
          <h1 id="dashboard-title">Your courses</h1>
        </div>
        <Link className="button" to="/create-course">New course</Link>
      </div>

      <div className="field">
        <label htmlFor="course-status-filter">Status</label>
        <select id="course-status-filter" value={statusFilter} onChange={handleStatusChange}>
          <option value="">All courses</option>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
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
                <Link className="button button--small button--ghost" to={`/edit/${course._id}`}>
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

      {meta.totalPages > 1 ? (
        <nav className="pagination" aria-label="Your course pages">
          <button type="button" onClick={() => setPage((current) => current - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>Page {meta.page} of {meta.totalPages}</span>
          <button
            type="button"
            onClick={() => setPage((current) => current + 1)}
            disabled={page === meta.totalPages}
          >
            Next
          </button>
        </nav>
      ) : null}
    </section>
  );
};

export default InstructorDashboard;
