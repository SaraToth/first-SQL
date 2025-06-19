const db = require("../db/queries");

const getIndex = async (req, res) => {
    try{
        const usernames = await db.getAllUsernames();
        res.render("index", { usernames: usernames });
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