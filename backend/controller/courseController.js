import { Course } from "../models/courses.js";

const SORTABLE = new Set(["createdAt", "title", "priceInr", "rating"]);

const getCourses = async (req, res, next) => {
    try {
        const filter = { status: "published" };
        if (req.query.instructor) filter.instructor = req.query.instructor;
        if (req.query.level) filter.level = req.query.level;
        if (req.query.category) filter.category = req.query.category;

        const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 20));
        const courses = await Course.find(filter)
            .populate("instructor", "name")
            .sort({ createdAt: -1 })
            .limit(limit)
            .lean();

        res.status(200).json({ data: courses, meta: { count: courses.length } });
    } catch (error) {
        next(error);
    }
};

// will be behind authentication middleware to get the instructor from the token
const createCourse = async (req, res) => {
    try {
        const { title, slug, category, level, priceInr, description, status } = req.body;
        const course = await Course.create({
            title,
            slug,
            category,
            level,
            priceInr,
            description,
            status,
            instructor: req.user.id, // from token not from request body
        });
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

// this will be restricted to the instructor who created the course
const updateCourse = async (req, res, next) => {
     try {
        const immutableFields = ["instructor", "_id", "createdAt", "rating"];
        const updates = { ...req.body };
        immutableFields.forEach((field) => delete updates[field]);

        Object.assign(req.course, updates);
        await req.course.save();
        res.status(200).json(req.course);
     } catch (error) {
         next(error);
     }

};


const getCourseById = async (req, res) => {
    try {
        const { id } = req.params;
        const course = await Course.findById(id).populate("instructor", "name");
        if (!course) {
            return res.status(404).json({ error: "Course not found" });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const getMyCourses = async (req, res, next) => {
    try {
        const page = Math.max(1, Number(req.query.page) || 1);
        const limit = Math.min(50, Math.max(1, Number(req.query.limit) || 12));
        const sort = SORTABLE.has(req.query.sort) ? req.query.sort : "createdAt";
        const order = req.query.order === "asc" ? 1 : -1;

        const filter = { instructor: req.user.id };
        if (["draft", "published"].includes(req.query.status)) {
            filter.status = req.query.status;
        }

        const [courses, total] = await Promise.all([
            Course.find(filter)
                .sort({ [sort]: order })
                .skip((page - 1) * limit)
                .limit(limit)
                .lean(),
            Course.countDocuments(filter),
        ]);

        res.status(200).json({
            data: courses,
            meta: { page, limit, total, totalPages: Math.ceil(total / limit) },
        });
    } catch (error) {
        next(error);
    }
};

// restricted to the instructor who created the course
const deleteCourse = async (req, res, next) => {
    try {
        await req.course.deleteOne();
        res.status(204).end();
    } catch (error) {
        next(error);
    }
};

export { getCourses, createCourse, updateCourse, getMyCourses, deleteCourse, getCourseById };