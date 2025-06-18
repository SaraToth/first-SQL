const getIndex = (req, res) => {
    console.log("usernames will be logged here - wip")
    res.render("index");
};

const getNew = (req, res) => {
    res.render("newUser");
};

const postNew = (req, res) => {
    console.log("username to be saved: ", req.body.username)
};

module.exports = { getIndex, getNew, postNew };