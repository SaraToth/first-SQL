const express = require("express");
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");
const CustomNotFoundError = require("./errors/customNotFoundError");
require("dotenv").config();

app.use(express.urlencoded({ extended:true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

app.use((req, res, next) => {
    throw new CustomNotFoundError("Page not found");
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(err.statusCode || 500).send(err.message);
});

app.listen(process.env.PORT || 3000, () => {
    console.log("App is running");
});