// import all necessary packages and folders
const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

// connect to port
const app = express();
const PORT = process.env.PORT || 3001;

// Set up Handlebars.js engine with custom helpers
const hbs = exphbs.create({ helpers });

// create session for when user logs in
const sess = {
  secret: 'Super secret secret',
  cookie: {
    maxAge: 300000, // expires after a certain amount of time (5 minutes)
  },
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize,
  })
};

app.use(session(sess));


// Inform Express.js on which template engine to use (handlebars)
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(__dirname + '/public'));

// use controllers folder for backend api routes
app.use(routes);

// start connecting to server
sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log('Now listening to server http://localhost:3001'));
});
