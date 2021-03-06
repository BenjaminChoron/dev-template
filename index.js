require('dotenv').config();
const express = require('express');
const session = require('express-session');

let dayjs = require('dayjs');
// à modifier pour utiliser une autre langue que le français
// pour la doc de DayJS => https://day.js.org/en/
    require('dayjs/locale/fr');
    dayjs.locale('fr');
// fin de modif
let advancedFormat = require('dayjs/plugin/advancedFormat');
dayjs.extend(advancedFormat);

const port = process.env.PORT;

const app = express();

const router = require('./app/router');

app.use(express.urlencoded({extended: true}));

app.set('view engine', 'ejs');
app.set('views', __dirname + '/app/views');

app.use(express.static(__dirname + '/public'));

app.use(session({
    resave: true,
    saveUninitialized: false,
    secret: 'Guess it'
}));

app.use((req, res, next) => {
    if(req.session.user) {
        res.locals.user = req.session.user;
    }
    next();
});

// accès global à DayJS
app.use((req, res, next) => {
    res.locals.dayjs = dayjs;
    next();
});

app.use(router);

app.use(function(req, res, next) {
    res.render('front/404', { url: req.url });
});

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})