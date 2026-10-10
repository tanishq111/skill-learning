import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import FormField from "../Components/FormFields";
import { createCourse, updateCourse, getCourseById } from "../api/course";

const EMPTY = {
  title: "",
  slug: "",
  category: "",
  level: "Beginner",
  priceInr: 0,
  description: "",
  status: "draft",
};

const CourseFormPage = () => {
  const { id: courseId } = useParams();
  const navigate = useNavigate();
  const isEdit = Boolean(courseId);

  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isEdit) return;

    getCourseById(courseId).then((res) => {
      if (!res.ok) {
        setErrors({ form: res.error });
        return;
      }
      setValues({
        title: res.data.title ?? "",
        slug: res.data.slug ?? "",
        category: res.data.category ?? "",
        level: res.data.level ?? "Beginner",
        priceInr: res.data.priceInr ?? 0,
        description: res.data.description ?? "",
        status: res.data.status ?? "draft",
      });
    });
  }, [courseId, isEdit]);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSubmitting(true);
    setErrors({});

    const payload = { ...values, priceInr: Number(values.priceInr) };
    const res = isEdit
      ? await updateCourse(courseId, payload)
      : await createCourse(payload);

    setSubmitting(false);

    if (res.ok) {
      navigate("/my-courses");
      return;
    }
    if (res.status === 403) {
      setErrors({ form: "You do not have permission to edit this course." });
      return;
    }
    setErrors({ form: res.error });
  };

  return (
    <section className="form-page" aria-labelledby="course-form-title">
      <div className="form-page__intro">
        <p className="eyebrow">{isEdit ? "Edit" : "Create"}</p>
        <h1 id="course-form-title">{isEdit ? "Edit course" : "New course"}</h1>
        <p>Drafts stay private until you publish them.</p>
      </div>

      <form className="auth-form" onSubmit={handleSubmit} noValidate>
        {errors.form ? <p className="form-error" role="alert">{errors.form}</p> : null}

        <FormField id="title" label="Title" name="title"
          value={values.title} onChange={handleChange} required />

        <FormField id="slug" label="URL slug" name="slug"
          hint="Lowercase, hyphens instead of spaces — e.g. react-foundations"
          error={errors.slug}
          value={values.slug} onChange={handleChange} required />

        <FormField id="category" label="Category" name="category"
          value={values.category} onChange={handleChange} required />

        <FormField id="priceInr" label="Price (₹)" name="priceInr" type="number" min="0"
          hint="Enter 0 to make this course free"
          error={errors.priceInr}
          value={values.priceInr} onChange={handleChange} required />

        <div className="field">
          <label htmlFor="status">Status</label>
          <select id="status" name="status" value={values.status} onChange={handleChange}>
            <option value="draft">Draft — only you can see it</option>
            <option value="published">Published — visible to everyone</option>
          </select>
        </div>

        <button className="button" type="submit" disabled={submitting}>
          {submitting ? "Saving..." : "Save course"}
        </button>
      </form>
    </section>
  );
};

export default CourseFormPage;
