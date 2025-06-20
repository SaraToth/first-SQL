const db = require("../db/queries");
const asyncHandler = require("express-async-handler");
const { body, query, validationResult } = require("express-validator");

const alphaErr = "must only contain letters.";
const lengthErr = "must be between 1 and 10 characters.";

const validateUsername = [
    body("username").trim()
        .isAlpha().withMessage(`Username ${alphaErr}`)
        .isLength({ min: 1, max: 10 }).withMessage(`Username ${lengthErr}`),
];

const validateSearchTerm = [
    query("search").exists().notEmpty().trim()
    .isAlpha().withMessage(`Search term ${alphaErr}`)
    .isLength({ min: 1, max: 10 }).withMessage(`Search term ${lengthErr}`), 
];

// search term
const getIndex = [
    validateSearchTerm,

    asyncHandler(async (req, res) => {
        const searchQuery = req.query.search;
        const usernames = await db.getAllUsernames();

        if (searchQuery) {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).render("index", {
                    usernames: usernames,
                    searchResults: [],
                    noMatches: true,
                    searchQuery: searchQuery,
                    errors: errors.array(),
                });
            }

            const searchResults = await db.searchUsernames(searchQuery);
            if (searchResults.length > 0) {
                return res.render("index", 
                    { 
                        usernames: usernames, 
                        searchResults: searchResults, 
                        noMatches: false,
                        searchQuery: searchQuery || "",
                    });
            }
        return res.render("index", 
                { 
                    usernames: usernames, 
                    searchResults: [], 
                    noMatches: true,
                    searchQuery: searchQuery || "",
                });
        }

        res.render("index", 
            { 
                usernames: usernames, 
                searchResults: [], 
                noMatches: true,
                searchQuery: searchQuery || "", 
            });
    }),


];

const getNew = (req, res) => {
    res.render("newUser");
};

// username form
const postNew = [
    validateUsername,

    asyncHandler(async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).render("newUser", { errors: errors.array()});
        }

        const { username } = req.body;
        await db.insertUsername(username);
        res.redirect("/");
    })
];

const getDelete = asyncHandler(async (req, res) => {
    await db.deleteAllUsernames();
    res.redirect("/");
});

module.exports = { getIndex, getNew, postNew, getDelete };