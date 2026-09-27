// import { createServer } from "node:http";  
//  import { courses } from "./courses.js";

// const server = createServer((request, response) => {
//   console.log(`${request.method} ${request.url}`);
//   if(request.url === "/") {
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     response.end("Hello how are you my friend\n");
//     return;
//   }
//   else if (request.method === "POST" && request.url === "/") {
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     response.end("This is a POST request to the root route\n");
//     return;
//   }
//   else if(request.url === "/about") {
//     response.writeHead(200, { "Content-Type": "application/json" });
//     response.end(JSON.stringify({ message: "This is the about page" }));
//     return;
//   }
//   else if(request.url === "/contact") {
//     response.writeHead(200, { "Content-Type": "text/plain" });
//     response.end("This is the contact page\n");
//     return;
//   }
//   else if(request.url === "/courses" && request.method === "GET") {
//     response.writeHead(200, { "Content-Type": "application/json" });
//     response.end(JSON.stringify(courses));
//     return;
//   }
//   else {
//     response.writeHead(404, { "Content-Type": "text/plain" });
//     response.end("Page not found\n");
//     return;
//   }
// });

// server.listen(3000, () => {
//   console.log("Server is running on http://localhost:3000");
// });










////// express server setup

import express from "express";
import { pushCoursesToDB } from "./push.js";
import bodyParser from "body-parser";
import { courses } from "./courses.js";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
dotenv.config();   // load variables from .env file to process.env
import authRouter from "./routes/authRoute.js";

const app = express(); // instatiation of express application
const port = process.env.PORT || 3000;

connectDB(); // connect to MongoDB before starting the server
pushCoursesToDB();


const logger = (req, res, next) => {
  console.log("Request received:TTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTTT");
  console.log(`${req.method} ${req.url}`);
  next();
};


const errorHandler = (err, req, res, next) => {
  console.log("Error occurred:");
  console.error(err);
  res.status(500).send("Internal Server Error");
};


app.use(bodyParser.json());
app.use(cors()); // enable CORS for all routes
app.use(logger); // apply logger middleware to all routes



app.use("/auth", authRouter); // made possible because of middleware
app.use(errorHandler); // apply error handler middleware to all routess



app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});