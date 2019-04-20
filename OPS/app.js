const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');

// Express Validator, Flash, Sessions requires
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');

// Config files
const passport = require('passport');
const config = require('./config/database');

const mongoose = require('mongoose');
mongoose.connect(config.database, {useNewUrlParser: true});
let db = mongoose.connection;

// Check for DB connection
db.once('open', () => {
  console.log('Connected to MongoDB');
});
db.on('error', (err) => {
  console.log(err);
});



// Set View Engine
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// Body Parser Middleware
// parse application/x-www-from-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());
// Set Public Folder
app.use(express.static(path.join(__dirname, 'public')));

// Express Session Middleware
app.use(session({
  secret: 'keyboard car',
  resave: true,
  saveUninitialized: true
}));

// Express Messages Middleware
app.use(require('connect-flash')());
app.use((req, res, next) => {
  res.locals.messages = require('express-messages')(req, res);
  next();
})

// Express Validator Middleware
app.use(expressValidator({
  errorFormatter: (param, msg, value) => {
    const namespace = param.split('.')
    , root = namespace.shift()
    , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param: formParam,
      msg: msg,
      value: value
    };
  }
}));


// Bring in User model
let User = require('./models/user');

let List = require('./models/list');

let Match = require('./models/match');
//let UserList = require('./models/userList');
// Passport Config
require('./config/passport')(passport);
// Passport Middleware
app.use(passport.initialize());
app.use(passport.session());

// Get All Users
app.get('*', (req, res, next) => {
  res.locals.user = req.user || null;
  next();
});


// Get @home Page
app.get('/', ensureAuthenticated, (req, res) => {
  res.render('index', {
    title: 'Index App'
  });
});

function ensureAuthenticated(req, res, next){
  if(req.isAuthenticated()){
    return next();
  } else {
    req.flash('danger', 'Пожалуйста, Войдите через Логин или Зарегистрируйтесь');
    res.redirect('/users/login');
  }
}

// Bring Routers
let users = require('./routes/users');
app.use('/users', users);

let lists = require('./routes/lists');
app.use('/lists', lists);

let matches = require('./routes/matches');
app.use('/matches', matches);
// Port Number
const PORT = 7777;
// App Listen
app.listen(PORT, ()=>{
  console.log(`Server started on port ${PORT}`);
});
