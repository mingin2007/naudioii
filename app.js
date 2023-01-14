"use strict";

const express = require ("express");
const fs = require("fs");

const app = express();
const port = 3000;

app.use(express.static('public'));
app.set("view engine", "ejs");

let files = fs.readdirSync('./public/JSON/', {encoding: "utf-8"});
console.log(files);

app.get('/', (req, res)=>{
    res.send(files);
    res.end();
    console.log("res send");
});

app.get("/test", (req, res) => {
    res.render("select", {files: files}); // index refers to index.ejs
   });


app.listen(port, () => {
    console.log(`Now listening on port ${port}`); 
});

