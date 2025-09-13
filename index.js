const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true}));
app.use(express.static(path.join(__dirname, "public")));

app.get('/', (req, res) => {
    fs.readdir(`./files`, (err, files) => {
        res.render("index", {fileList: files});
    })
});

app.post('/create', (req, res) => {
    fs.writeFile(`./files/${req.body.title.split(' ').join('')}.txt`, req.body.message, (err) => {
        if(err) console.log(err);
        res.redirect('/');
    })
    
})

app.listen(3000, () => {
    console.log("Server is running on port 3000");
});