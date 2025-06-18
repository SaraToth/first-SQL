const getIndex = (req, res) => {
    res.send("Index page");
};

const getNew = (req, res) => {
    res.send("New page");
};

const postNew = (req, res) => {
    res.send("post submited");
};

module.exports = { getIndex, getNew, postNew };