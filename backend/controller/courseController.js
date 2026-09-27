import { Course } from "../models/courses.js";
const getCourses =  async (req, res) => {
    const courseList = await Course.find();
    console.log(courseList);
    res.status(200).json(courseList);
};

export { getCourses };