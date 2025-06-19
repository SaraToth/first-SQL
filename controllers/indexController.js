const db = require("../db/queries");

const getIndex = async (req, res) => {
    try{
        const usernames = await db.getAllUsernames();
        if (!usernames) {
            res.status(404).send("No usernames can be found"); // switch to custom 404
            return;
        }
        const usernameList = usernames.map(user => user.username).join(", ");
        res.render("index", { users: usernameList });
    } catch (error) {
        console.error("Error retrieving usernames:", error);
        res.status(500).send("Internal Server Error");
    }

};

const getNew = (req, res) => {
    res.render("newUser");
};

const postNew = async (req, res) => {
    try {
        const { username } = req.body;
        await db.insertUsername(username);
        res.redirect("/");
    } catch (error) {
        console.error("Error posting new username:", error);
        res.status(500).send("Internal Server Error");
    }
};

module.exports = { getIndex, getNew, postNew };