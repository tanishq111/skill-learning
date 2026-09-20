import { courses } from "./mockData.js";

export const getCourses = ({ shouldFail = false } = {}) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldFail) {
        reject(new Error("The course catalogue could not be loaded."));
        return;
      }

      resolve([...courses]);
    }, 600);
  });
};
