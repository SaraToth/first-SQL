const express = require("express");
const app = express();
const path = require("node:path");
const indexRouter = require("./routes/indexRouter");

app.use(express.urlencoded({ extended:true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use("/", indexRouter);

app.use((req, res, next) => {
    res.status(404).send("404: Page does not exist");
});

app.use((err, req, res, next) => {
    console.error(err);
    res.status(500).send(err);
});

const PORT = 3000;
app.listen(PORT, () => {
    console.log("App is running");
});