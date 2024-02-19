const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cookieparser = require("cookie-parser");
const userRouter = require("./routes/user");
const blogRouter = require("./routes/blog");
const Blog = require("./models/blog")

const {checkForauthCookie} = require("./middleware/auth");

const app = express();
const PORT = 8000;

mongoose
  .connect("mongodb://0.0.0.0:27017/blog")
  .then((e) => console.log("MongoDB Connected"));

app.set("view engine", "ejs");
app.set("views", path.resolve("./views"));

app.use(cookieparser());
app.use(checkForauthCookie("token"));
app.use(express.static(path.resolve("./public")));

app.get("/", async(req, res) => {
  const allblog = await Blog.find({})
  res.render("home", {
    user: req.user,
    blogs:allblog
  });
});
app.use(express.urlencoded({ extended: false }));
app.use("/user", userRouter);
app.use("/blog", blogRouter);


app.listen(PORT, () => console.log(`server started at ${PORT}`));
