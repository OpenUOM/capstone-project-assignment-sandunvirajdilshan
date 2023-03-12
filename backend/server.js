const express = require("express");

const {
  readTeachers,
  readStudents,
  addStudent,
  addTeacher,
  deleteTeacher,
  deleteStudent,
  readStudentInfo,
  readTeacherInfo,
  updateStudent,
  updateTeacher,
  dbinitialize
} = require ("./database.js");

const app = express();
const bodyParser = require  ("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/dbinitialize", async function (req, res) {
  console.log("DB is getting initialized");
  let data = await dbinitialize();

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
});

app.get("/listTeachers", async function (req, res) {
  console.log("Request received to list teachers");
  let data = await readTeachers();
  
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
});

app.post("/getTeacherInfo", async function (req, res) {
  let reqBody = req.body;
  console.log("Request received to get Teacher Info");
  let data = await readTeacherInfo(reqBody.id);

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
});

app.post("/addTeacher", async function (req, res) {
  let reqBody = req.body;
  console.log(
  "Request received to add teacher. Req body: " + JSON.stringify(reqBody)
  );
  let data = await addTeacher(reqBody.id, reqBody.name, reqBody.age);
  
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
});

app.post("/deleteTeacher", async function (req, res) {
  let reqBody = req.body;
  console.log(
  "Request received to delete teacher. Req body: " + JSON.stringify(reqBody)
  );
  let data = await deleteTeacher(reqBody.id);
  
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
});

app.post("/editTeacher", async function (req, res) {
  let reqBody = req.body;
  let data = await updateTeacher(reqBody.name, reqBody.age, reqBody.id);

  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify(data));
});

module.exports = app;