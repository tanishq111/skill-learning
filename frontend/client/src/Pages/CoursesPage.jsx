import { useEffect, useState } from "react";

import CourseCard from "../Components/CourseCard.jsx";
import {
  EmptyState,
  ErrorState,
  LoadingState,
} from "../Components/StatusView.jsx";
import { getCourses } from "../Data/courseService.js";

const PAGE_SIZE = 2;

const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [sort, setSort] = useState("title-asc");
  const [page, setPage] = useState(1);

  const loadCourses = async () => { // this will call the backend to fetch courses
    setStatus("loading");
    setErrorMessage("");

    try {
      const data = await getCourses();
      setCourses(data);
      setStatus("success");
    } catch (error) {
      setErrorMessage(error.message);
      setStatus("error");
    }
  };

  useEffect(() => {
    loadCourses();
  }, []); // this will run only once when the component mounts

  const normalizedSearch = search.trim().toLowerCase();
  const categories = [...new Set(courses.map((course) => course.category))];

  const filteredCourses = courses
    .filter((course) => {
      const matchesSearch = course.title
        .toLowerCase()
        .includes(normalizedSearch);
      const matchesCategory =
        category === "all" || course.category === category;

      return matchesSearch && matchesCategory;
    })
    .sort((firstCourse, secondCourse) => {
      if (sort === "rating-desc") {
        return secondCourse.rating - firstCourse.rating;
      }

      if (sort === "price-asc") {
        return firstCourse.priceInr - secondCourse.priceInr;
      }

      return firstCourse.title.localeCompare(secondCourse.title);
    });

  const totalPages = Math.max(1, Math.ceil(filteredCourses.length / PAGE_SIZE));
  const firstCourseIndex = (page - 1) * PAGE_SIZE;
  const visibleCourses = filteredCourses.slice(
    firstCourseIndex,
    firstCourseIndex + PAGE_SIZE,
  );

  const updateSearch = (event) => {
    setSearch(event.target.value);
    setPage(1);
  };

  const updateCategory = (event) => {
    setCategory(event.target.value);
    setPage(1);
  };

  const updateSort = (event) => {
    setSort(event.target.value);
    setPage(1);
  };

  return (
    <section className="catalogue-page" aria-labelledby="catalogue-title">
      <header className="page-heading">
        <div>
          <p className="eyebrow">Course catalogue</p>
          <h1 id="catalogue-title">Build a skill you can use</h1>
        </div>
        <p>Choose a focused course and learn through practical lessons.</p>
      </header>

      <form className="catalogue-controls" onSubmit={(event) => event.preventDefault()}>
        <div className="field field--wide">
          <label htmlFor="course-search">Search courses</label>
          <input
            id="course-search"
            type="search"
            value={search}
            onChange={updateSearch}
            placeholder="Try React or design"
          />
        </div>

        <div className="field">
          <label htmlFor="course-category">Category</label>
          <select id="course-category" value={category} onChange={updateCategory}>
            <option value="all">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>

        <div className="field">
          <label htmlFor="course-sort">Sort by</label>
          <select id="course-sort" value={sort} onChange={updateSort}>
            <option value="title-asc">Title A-Z</option>
            <option value="rating-desc">Highest rating</option>
            <option value="price-asc">Lowest price</option>
          </select>
        </div>
      </form>

      {status === "loading" ? <LoadingState message="Loading courses" /> : null}

      {status === "error" ? (
        <ErrorState message={errorMessage} onRetry={loadCourses} />
      ) : null}

      {status === "success" && filteredCourses.length === 0 ? (
        <EmptyState title="No matching courses">
          Try a different search or category.
        </EmptyState>
      ) : null}

      {status === "success" && visibleCourses.length > 0 ? (
        <>
          <p className="results-summary" aria-live="polite">
            Showing {visibleCourses.length} of {filteredCourses.length} matching
            courses
          </p>

          <div className="course-grid">
            {visibleCourses.map((course) => ( // array to traverse the coursesMap
              <CourseCard key={course.id} course={course} />
            ))}
          </div>

          <nav className="pagination" aria-label="Course pages">
            <button
              type="button"
              onClick={() => setPage((current) => current - 1)}
              disabled={page === 1}
            >
              Previous
            </button>
            <span>
              Page {page} of {totalPages}
            </span>
            <button
              type="button"
              onClick={() => setPage((current) => current + 1)}
              disabled={page === totalPages}
            >
              Next
            </button>
          </nav>
        </>
      ) : null}
    </section>
  );
};

export default CoursesPage;
