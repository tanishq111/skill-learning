import express from "express";
const router = express.Router();

router.post("/login", (req, res) => { // /auth/login
  // Handle login logic here
  console.log("Express Routerrrrrrrrrrrrrrr");
  res.send("Login route");
});

router.post("/register", (req, res) => { // /auth/register
  // Handle registration logic here
  console.log("Express Routerrrrrrrrrrrrrrr");
  res.send("Register route");
});

router.get("/profile", (req, res) => { // /auth/profile
  console.log("Express Routerrrrrrrrrrrrrrr");
  // Handle profile retrieval logic here
  res.send("Profile route");
});


router.get("/profile/:key", (req, res) => { // /auth/profile
    throw new Error("Test error handling");
  console.log("Express Routerrrrrrrrrrrrrrr");
  const key = req.params.key;
  const param = req.query;
  console.log(`Key: ${key}`);
  console.log(`Query Params: ${JSON.stringify(param)}`); 
  // call to db to get the user with a particular ID
  // Handle profile retrieval logic here
  res.send(`Profile route for ID: ${key} with query params: ${JSON.stringify(param)}`);
});

router.post("/logout", (req, res) => { // /auth/logout
    try{
        console.log("Express Routerrrrrrrrrrrrrrr");
        // Handle logout logic here
        res.send("Logout route");
    } catch (error) {
        console.error(error);
        res.status(500).send("Internal Server Error");
    }

});

export default router; // i am exporting a router instance