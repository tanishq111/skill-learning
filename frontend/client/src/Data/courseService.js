import { courses } from "./mockData.js";

const wait = (milliseconds) =>
  new Promise((resolve) => window.setTimeout(resolve, milliseconds));

export const getCourses = async ({ shouldFail = false } = {}) => {
  await wait(600); // purposely adding 600ms delay to simulate network latency

  if (shouldFail) {
    throw new Error("The course catalogue could not be loaded.");
  }

  return courses.map((course) => ({ ...course }));
};

export const getCourseById = async (courseId) => {
  await wait(350); // purposely adding 350ms delay to simulate network latency

  const course = courses.find((item) => item.id === courseId);

  if (!course) {
    const error = new Error("Course not found.");
    error.status = 404;
    throw error;
  }

  return { ...course };
};
