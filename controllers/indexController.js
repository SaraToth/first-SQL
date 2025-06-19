const db = require("../db/queries");

const getIndex = async (req, res) => {
    const searchQuery = req.query.search;

        // CHECK that the searchTerm is defined
        // TRY searching for any username that INCLUDES the searchTerm in our db
        // NO RESULT -> Alert user that user is not in the db
        // RESULT -> Display a list of matching users


    try{
        const usernames = await db.getAllUsernames();

        if (searchQuery) {
            try {
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

            } catch (error) {
                console.error("Error searching for usernames:", error);
                res.status(500).send("Internal Server Error");
            }
        }

        res.render("index", 
            { 
                usernames: usernames, 
                searchResults: [], 
                noMatches: true,
                searchQuery: searchQuery || "", 
            });
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