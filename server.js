const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

const port = process.env.PORT || 3000;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');
app.use(express.static(__dirname + '/public'));

app.use((req, res, next) => {
    var now = new Date().toString();
    var log = `${now}: ${req.method} ${req.url}`;

    fs.appendFile('server.log', log + '\n', (err) => {
        if (err) {
            console.log(err);
        }
    });

    next();
});

hbs.registerHelper('getCurrentYear', ()=>{
    return new Date().getFullYear();
});

hbs.registerHelper('creamIt', (text)=>{
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    // res.send('<h1> Hello Exporess </h1>');
    res.render('index.hbs', {
        pageTitle: 'Home Page',
        welcome: 'Welcome to node web server.'
    });

    // res.send({
    //     name: "Vadim",
    //     likes: [
    //         '1',
    //         '2'
    //     ]
    // });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About Page',
    });
});

app.get('/projects', (req, res) => {
    res.render('projects.hbs', {
        pageTitle: 'Projects Page',
    });
});

app.get('/bad', (req, res) => {
    res.send({
        error: "Error send"
    });
});

app.listen(port, ()=>{
    console.log(`Server start on port ${port}`);
});