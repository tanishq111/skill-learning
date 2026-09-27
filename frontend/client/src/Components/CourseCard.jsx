import { ArrowRight, BookOpen, Clock3, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { authContext } from "../context/authContext.jsx";

const formatPrice = (priceInr, user) => {
  if (priceInr === 0 || user) {
    return "Free";
  }

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(priceInr);
};

const CourseCard = ({ course }) => {
  const { user } = useContext(authContext);
  console.log(user);
  return (
    <article className="course-card">
      <img
        className="course-card__image"
        src={course.imageUrl}
        alt={course.imageAlt}
      />
      <div className="course-card__body">
        <div className="course-card__meta">
          <span>{course.category}</span>
          <span>{course.level}</span>
        </div>

        <h2>{course.title}</h2>
        <p>{course.description}</p>

        <ul className="course-card__facts" aria-label="Course facts">
          <li>
            <BookOpen aria-hidden="true" size={17} />
            {course.lessonCount} lessons
          </li>
          <li>
            <Clock3 aria-hidden="true" size={17} />
            {Math.round(course.durationMinutes / 60)} hours
          </li>
          <li>
            <Star aria-hidden="true" size={17} />
            {course.rating}
          </li>
        </ul>

        <div className="course-card__footer">
          <strong>{formatPrice(course.priceInr, user)}</strong>
          <Link className="text-link" to={`/courses/${course.id}`}>
            View course
            <ArrowRight aria-hidden="true" size={18} />
          </Link>
        </div>
      </div>
    </article>
  );
};

export default CourseCard;
