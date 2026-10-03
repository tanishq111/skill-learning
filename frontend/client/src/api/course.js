import api from "./simple";

const getCourses = () => api.get("/courses");

export { getCourses };