export const courses = [
  {
    id: "react-foundations",
    title: "React Foundations",
    category: "Web Development",
    level: "Beginner",
    instructor: "Maya Singh",
    lessonCount: 12,
    priceInr: 0,
  },
  {
    id: "node-api-design",
    title: "Practical Node API Design",
    category: "Backend Development",
    level: "Intermediate",
    instructor: "Arjun Mehta",
    lessonCount: 18,
    priceInr: 1499,
  },
  {
    id: "digital-marketing-essentials",
    title: "Digital Marketing Essentials",
    category: "Marketing",
    level: "Beginner",
    instructor: "Nisha Rao",
    lessonCount: 15,
    priceInr: 999,
  },
  {
    id: "advanced-css",
    title: "Advanced CSS Techniques",
    category: "Web Development",
    level: "Advanced",
    instructor: "Ravi Kumar",
    lessonCount: 20,
    priceInr: 1299,
    description: "Master advanced CSS techniques including Flexbox, Grid, and animations.",
  }
];



// moongoose schema for courses (if using a database like MongoDB with Mongoose)
import mongoose from "mongoose";
import { timeStamp } from "node:console";

const courseSchema = new mongoose.Schema({
  id: { type: String, required: true},
  title: { type: String, required: true },
  category: { type: String, required: true },
  level: { type: String, required: true },
  instructor: { type: String, required: true },
  lessonCount: { type: Number, required: true },
  priceInr: { type: Number, required: true },
}, {timestamps   : true});
// tomorrwo you want to add description field to the schema -> you can directly do it without adding in schema also

export const Course = mongoose.model("Course", courseSchema); // this is my course collection