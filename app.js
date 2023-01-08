"use strict";

const express = require ("express");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.static('public'));
app.set("view engine", "ejs");

app.get("/test", (req, res) => {
    res.render("index"); // index refers to index.ejs
   });


app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});

