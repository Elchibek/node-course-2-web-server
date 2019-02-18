const express = require('express');
const hbs = require('hbs');
const fs = require('fs');
const log = console.log;

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set('view engine', 'hbs');

app.use((reg, res, next) => {
    var now = new Date().toString();
    var conLog = `${now}: ${reg.method}: ${reg.url}`;

    log(conLog);

    fs.appendFile('server.log', conLog + '\n', (err) => {
        if (err) {
            log('Unable to append to server.log');
        }
    });
    next();
});

// app.use((reg, res, next) => {
//     res.render('maintenance.hbs')
// });

app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear', () => {
    return new Date().getFullYear();
});

hbs.registerHelper('screamIt', (text) => {
    return text.toUpperCase();
});

app.get('/', (req, res) => {
    res.render('home.hbs', {
        pageTitle: 'Home Page',
        welcomeMessage: 'Welcome to my website',
    });
});

app.get('/about', (req, res) => {
    res.render('about.hbs', {
        pageTitle: 'About page',
    });
});

app.listen(3000, () => {
    log('Server is up on port 3000');
});

