// backend.js
import express from "express";
import cors from "cors";
import userService from "./user-services.js";

const app = express();
const port = 8000;

//List of status
// 200 - OK: The request was successful.
// 201 - Created: A new resource was successfully created.
// 204 - No Content: The request was successful, but there is no content to return.
// 400 - Bad Request: The server could not understand the request due to invalid syntax.
// 401 - Unauthorized: The request requires user authentication.
// 403 - Forbidden: The server understood the request, but it refuses to authorize it.
// 404 - Not Found: The server can't find the requested resource.
// 500 - Internal Server Error: The server encountered a situation it doesn't know how to handle.
// 502 - Bad Gateway: The server was acting as a gateway or proxy and received an invalid response.
// 503 - Service Unavailable: The server is not ready to handle the request.




app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});


// get http://localhost:8000/users?id=
app.get("/users/:id", (req, res) => {
  const id = req.params.id;
  userService.findUserById(id)
    .then((user) => {
      if (user) {
        res.send(user);
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => res.status(500).send(error));
});

// get http://localhost:8000/users?job=idk
app.get("/users", (req, res) => {
  const { name, job } = req.query;

  if (name && job) { // find by name and job
    userService.findUserByNameAndJob(name, job)
      .then((users) => res.send({ users_list: users }))
      .catch((error) => res.status(500).send(error));
  } else if (name) { // find by JUST name
    userService.findUserByName(name)
      .then((users) => res.send({ users_list: users }))
      .catch((error) => res.status(500).send(error));
  } else if (job) { // find by just job
    userService.findUserByJob(job)
      .then((users) => res.send({ users_list: users }))
      .catch((error) => res.status(500).send(error));
  } else { // All users
    userService.getUsers()
      .then((users) => res.send({ users_list: users }))
      .catch((error) => res.status(500).send(error));
  }
});


// post
app.post("/users", (req, res) => {
  const userToAdd = req.body;
  userService.addUser(userToAdd)
    .then((newUser) => res.status(201).send(newUser))
    .catch((error) => res.status(500).send(error));
});


// delete
app.delete("/users/:id", (req, res) => {
  const id = req.params.id;
  userService.deleteUserById(id)
    .then((result) => {
      if (result) {
        res.status(204).send();
      } else {
        res.status(404).send("Resource not found.");
      }
    })
    .catch((error) => res.status(500).send(error));
});


app.listen(port, () => {
  console.log(
    `Example app listening at http://localhost:${port}`
  );
});