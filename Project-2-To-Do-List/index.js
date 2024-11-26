const express = require("express");
const port = 3000;

const app = express();

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: true }));

let tasks = [
    {
        id: 1,
        title: "Task 1",
        description: "Description 1",
        workTime: "10:00",
        workDate: "2024-12-02",
        workHours: 2,
        priority: "High",
        status: "Pending",
    },
    {
        id: 2,
        title: "Task 2",
        description: "Description 2",
        workTime: "15:00",
        workDate: "2024-12-06",
        workHours: 3,
        priority: "Medium",
        status: "Completed",
    },
];

app.get("/", (req, res) => {
    res.render("index", { tasks });
});

app.post("/addTask", (req, res) => {
    req.body.id = tasks.length + 1;
    tasks.push(req.body);
    res.redirect("/");
});

app.get("/deleteTask", (req, res) => {
    tasks = tasks.filter((task) => task.id != req.query.id);
    res.redirect("/");
});

app.get("/editTask/:id", (req, res) => {
    const singleTask = tasks.find((task) => task.id == req.params.id);
    res.render("edit", { singleTask });
});

app.post("/updateTask", (req, res) => {
    tasks.forEach((task) => {
        if (task.id == req.body.id) {
            task.title = req.body.title;
            task.description = req.body.description;
            task.workTime = req.body.workTime;
            task.workDate = req.body.workDate;
            task.workHours = req.body.workHours;
            task.priority = req.body.priority;
            task.status = req.body.status;
        }
    });
    res.redirect("/");
});

app.listen(port, (err) => {
    if (err) {
        console.error(err);
    } else {
        console.log(`Server started on port ${port}`);
    }
});
