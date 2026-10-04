import api from "./simple";

const getCourses = () => api.get("/courses");
const getMyCourses = () => api.get("/courses/mine");
const getCourseById = (id) => api.get(`/courses/${id}`);
const createCourse = (course) => api.post("/courses", course);
const updateCourse = (id, course) => api.patch(`/courses/${id}`, course);
const deleteCourse = (id) => api.delete(`/courses/${id}`);

export { getCourses, getMyCourses, createCourse, updateCourse, deleteCourse, getCourseById };
