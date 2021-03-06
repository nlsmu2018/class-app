var dotenv = require('dotenv');
dotenv.config();
var express = require('express');
var app = express();
var PORT = process.env.PORT || 3000;
var exphbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var passport = require('passport');
var flash = require('connect-flash');
var expressMessages = require('express-messages');
var { SESSION_SECRET } = process.env;

var routes = require('./controllers');
var register = require('./controllers/register');
var login = require('./controllers/login');
var logout = require('./controllers/logout');
var classes = require('./controllers/api/classes');
var students = require('./controllers/api/students');
var catalogue = require('./controllers/catalogue');

//Express native body parser middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.engine(
  'handlebars',
  exphbs({
    defaultLayout: 'main',
    helpers: {
      math: function(lvalue, operator, rvalue) {
        lvalue = parseFloat(lvalue);
        rvalue = parseFloat(rvalue);
        return {
          '+': lvalue + rvalue
        }[operator];
      }
    }
  })
);
app.set('view engine', 'handlebars');

app.use(express.static('public'));

app.use(cookieParser());

app.use(
  session({
    secret: SESSION_SECRET,
    saveUninitialized: true,
    resave: true
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use(flash());
app.use(function(req, res, next) {
  res.locals.messages = expressMessages(req, res);
  next();
});

app.use(function(req, res, next) {
  res.locals.isAuthenticated = req.isAuthenticated();
  next();
});

app.use(routes);
app.use('/register', register);
app.use('/login', login);
app.use('/logout', logout);
app.use('/api/classes', classes);
app.use('/api/students', students);
app.use('/catalogue', catalogue);

app.listen(PORT, function() {
  console.log('class-app is listening on port', PORT);
});
