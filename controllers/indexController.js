const db = require("../db/queries");
const asyncHandler = require("express-async-handler");

const getIndex = asyncHandler(async (req, res) => {
    const searchQuery = req.query.search;
    const usernames = await db.getAllUsernames();

    if (searchQuery) {
        const searchResults = await db.searchUsernames(searchQuery);
        if (searchResults.length > 0) {
            res.render("index", 
                { 
                    usernames: usernames, 
                    searchResults: searchResults, 
                    noMatches: false,
                    searchQuery: searchQuery || "",
                });
            return;
        } else {
            res.render("index", 
                { 
                    usernames: usernames, 
                    searchResults: [], 
                    noMatches: true,
                    searchQuery: searchQuery || "",
                });
            return;
        }
    }

    res.render("index", 
        { 
            usernames: usernames, 
            searchResults: [], 
            noMatches: true,
            searchQuery: searchQuery || "", 
        });
});

const getNew = (req, res) => {
    res.render("newUser");
};

const postNew = asyncHandler(async (req, res) => {
    const { username } = req.body;
    await db.insertUsername(username);
    res.redirect("/");
});

module.exports = { getIndex, getNew, postNew };