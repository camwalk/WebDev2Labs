var express = require('express');
mustache = require('mustache-express'),
    path = require('path');
DAO = require('./model/nedb');
dbFile = "database.nedb.db";

var app = express();

app.set('port', process.env.PORT || 3000);
app.engine('mustache', mustache());
app.set('view engine', 'mustache');
app.set('views', path.resolve(__dirname, 'mustache'));

const nedb = require('nedb');

//new db
let dao = new DAO(dbFile);
dao.init();

app.get("/guestbook", function(request, response) {
    response.render("page", {
        'title': 'Guest Book',
    });
});

app.get("/", function(request, response) {
    dao.all()
        .then((list) => {
            console.log(list);
        })
        .catch((err) => {
            console.log('Error: ')
            console.log(JSON.stringify(err))
        });
});


app.use(function(req, res) {
    res.status(404);
    res.type('text/plain');
    res.send('404 Not Found');
})

app.listen(app.get('port'), function() {
    console.log('server running, ctrl^c to quit');
});