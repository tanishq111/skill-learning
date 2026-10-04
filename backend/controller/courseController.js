import { Course } from "../models/courses.js";
const getCourses =  async (req, res) => {
    const courseList = await Course.find();
    console.log(courseList);
    res.status(200).json(courseList);
};

// will be behind authentication middleware to get the instructor from the token
const createCourse = async (req, res) => {
    try {
        const { title, slug, category, level, priceInr, description } = req.body;
        const course = await Course.create({
            title,
            slug,
            category,
            level,
            priceInr,
            description,
            instructor: req.user.id, // from token not from request body
        });
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// this will be restricted to the instructor who created the course
const updateCourse = async (req, res) => {
     try{
        const { id } = req.params;
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        if (course.instructor.equals(req.user.id) === false) { // this is only allowing the instructor who created the course to update it
            return res.status(403).json({ error: "You are not authorized to update this course" });
        }
        Object.assign(course, req.body);
        await course.save();
        res.status(200).json(course);
     } catch (error) {
         res.status(400).json({ error: error.message });
     }

};


const getMyCourses = async (req, res) => { 
    try {
        const courses = await Course.find({ instructor: req.user.id });
        res.status(200).json(courses);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};
export { getCourses, createCourse, updateCourse, getMyCourses };