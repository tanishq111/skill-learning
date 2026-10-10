import api from "./simple";

const getCourses = (params = {}) => api.get("/courses", { params });
const getMyCourses = (params = {}) => api.get("/courses/mine", { params });
const getCourseById = (id) => api.get(`/courses/${id}`);
const createCourse = (course) => api.post("/courses", course);
const updateCourse = (id, course) => api.patch(`/courses/${id}`, course);
const deleteCourse = (id) => api.delete(`/courses/${id}`);
const enrollInCourse = (id) => api.post(`/courses/${id}/enroll`);
const getMyEnrollment = (id) => api.get(`/courses/${id}/enrollment`);
const getCourseStudents = (id) => api.get(`/courses/${id}/students`);

export {
  getCourses,
  getMyCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  getCourseById,
  enrollInCourse,
  getMyEnrollment,
  getCourseStudents,
};
