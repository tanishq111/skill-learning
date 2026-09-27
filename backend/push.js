import "dotenv/config";
import mongoose from "mongoose";
import { fileURLToPath } from "node:url";
import { courses, Course } from "./models/courses.js";

const pushCoursesToDB = async () => {
     try {
        // upsert by id so re-running this never trips the unique index
        const result = await Course.bulkWrite(
          courses.map((course) => ({
            updateOne: {
              filter: { id: course.id },
              update: { $set: course },
              upsert: true,
            },
          }))
        );
        console.log(
          `Courses pushed: ${result.upsertedCount} inserted, ${result.modifiedCount} updated`
        );
     } catch (error) {
        console.error("Error pushing courses to the database:", error);
     }
};

// only seeds when run directly (`npm run seed`), never on `import`
if (process.argv[1] === fileURLToPath(import.meta.url)) {
  await mongoose.connect(process.env.MONGO_URI, { dbName: "skillspring" });
  await pushCoursesToDB();
  await mongoose.disconnect();
}

export { pushCoursesToDB };