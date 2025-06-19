const { Router } = require("express");
const indexRouter = Router();
const { getIndex, getNew, postNew, getDelete } = require("../controllers/indexController");

indexRouter.get("/new", getNew);
indexRouter.post("/new", postNew);
indexRouter.get("/delete", getDelete)
indexRouter.get("/", getIndex);

module.exports = indexRouter;