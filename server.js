// const methodOverride = require("method-override");
const ejs = require("ejs");
const express = require("express");
const app = express();
const path = require("path");
const PORT = process.env.PORT  || 3001;

const connection = require("./config/connection");
const { Diary } = require("./models");
const { redirect } = require("express/lib/response");
const res = require("express/lib/response");

// set ejs engine
app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(methodOverride("_method"));

app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.render("Home");
});

// route for about page

app.get("/about", (req, res) => {
  res.render("About");
});

// route to git diary page
app.get("/diary", async (req, res) => {
  try {
    const getData = await Diary.find({});

    const diaries = getData.map((diary) => diary);

    res.render("Diary", { diaries });
  } catch (error) {
    res.status(500).json(error);
  }
});

// get diary by ID
app.get("/diary/:id", async (req, res) => {
  try {
    const diary = await Diary.findOne({ _id: req.params.id });
    res.render("Single-diary", { diary });
  } catch (error) {
    res.status(500).json(error);
  }
});

// route for adding diaries
app.get("/add", (req, res) => {
  res.render("Add");
});

// route to get data to edit
app.get("/diary/edit/:id", async (req, res) => {
  try {
    const getEdit = await Diary.findOne({ _id: req.params.id });

    res.render("Edit", { getEdit });
  } catch (error) {
    console.log("🚀 ~ file: server.js:64 ~ app.get ~ error:", error);
  }
});

app.post("/diary/edit/:id", async (req, res) => {
  try {
    let update = { title: req.body.title, description: req.body.description, date: req.body.date };
    JSON.stringify(update);
    console.log(update);
    const updateData = await Diary.findOneAndUpdate({ _id: req.params.id }, update, { new: true });
    updateData.save();
    if (updateData) {
      res.redirect("/diary");
    }
    res.status(200);
  } catch (error) {
    console.log("🚀 ~ file: server.js:98 ~ app.post ~ error:", error);
  }
});

// route for adding to dairy

app.post("/add-to-diary", async (req, res) => {
  // save the data on the database
  // const Data = new Diary({ title: req.body.title, description: req.body.description, date: req.body.date });
  // console.log(req.body);
  // Data.save()
  //   .then(() => {
  //     res.redirect("/diary");
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });

  try {
    const { title, description, date } = req.body;
    const Data = await new Diary({ title, description, date });
    Data.save().then(() => {
      res.redirect("/diary");
    });
    res.status(200);
  } catch (err) {
    console.log("🚀 ~ file: server.js:59 ~ app.post ~ err:", err);

    res.status(500).json(err);
  }
});

// route for delete post

app.post("/diary/delete/:id", async (req, res) => {
  try {
    const deleteD = await Diary.findOneAndDelete({ _id: req.params.id });
    if (deleteD) {
      console.log("🚀 ~ file: server.js:121 ~ app.post ~ deleteD:", deleteD)
      return res.redirect("/diary");
    }
  } catch (error) {
    console.log("🚀 ~ file: server.js:122 ~ app.post ~ error:", error);
  }
});

connection.once("open", () => {
  app.listen(PORT, () => {
    console.log(`Server is running on port: www.http://:localhost:${PORT}`);
  });
});
