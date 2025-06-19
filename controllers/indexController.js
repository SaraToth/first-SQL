const db = require("../db/queries");

const getIndex = async (req, res) => {
    try{
        const usernames = await db.getAllUsernames();
        if (!usernames) {
            res.status(404).send("No usernames can be found");
            return;
        }

        res.send("Usernames: " + usernames.map(user => user.username).join(", "));
    } catch (error) {
        console.error("Error retrieving usernames:", error);
        res.status(500).send("Internal Server Error");
    }

};

const getNew = (req, res) => {
    res.render("newUser");
};

const postNew = (req, res) => {
    const { username } = req.body;
    db.insertUsername(username);
    res.redirect("/");
    console.log("username to be saved: ", req.body.username)
};

module.exports = { getIndex, getNew, postNew };