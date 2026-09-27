import mongoose from "mongoose";
import { courses, Course } from "./courses.js";


const pushCoursesToDB = async () => {
     try {
        await Course.insertMany(courses);
        console.log("Courses pushed to the database successfully");
     } catch (error) {
        console.error("Error pushing courses to the database:", error);
     }
};

export { pushCoursesToDB };