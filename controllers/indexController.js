const getIndex = (req, res) => {
    console.log("usernames will be logged here - wip")
    res.send("Index page");
};

const getNew = (req, res) => {
    res.send("New page");
};

const postNew = (req, res) => {
    console.log("username to be saved: ", req.body.username)
};

module.exports = { getIndex, getNew, postNew };