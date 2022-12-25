const express = require('express');
const dotenv = require('dotenv');

const path = require('path')

const passport = require('passport')

const session = require('express-session')

const morgan = require('morgan')

const exphbs = require('express-handlebars')
const methodOverride = require('method-override')
const connectDB = require('./config/db')

const mongoose = require('mongoose')
const MongoStore = require('connect-mongo')(session)

dotenv.config({ path: './config/config.env' })

connectDB()

const app = express()

//Body Parser
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Method override
app.use(
    methodOverride(function(req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            // look in urlencoded POST bodies and delete it
            let method = req.body._method
            delete req.body._method
            return method
        }
    })
)

//Logging
if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'))
}

//Passport Config
require('./config/passport')(passport)

//Static
app.use(express.static(path.join(__dirname, 'public')))

//Handlebars Helpers
const { formatDate, stripTags, truncate, editIcon, select } = require('./helpers/hbs')

//Handlebars
app.engine('.hbs', exphbs({
    helpers: {
        formatDate,
        stripTags,
        truncate,
        editIcon,
        select,
    },
    defaultLayout: 'main',
    extname: '.hbs'
}));
app.set('view engine', '.hbs')

//Sessions
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection })
}))

//Passport Middleware
app.use(passport.initialize())
app.use(passport.session())

//Set Global Variable
app.use(function(req, res, next) {
    res.locals.user = req.user || null
    next()
})

//Routes
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))
app.use('/stories', require('./routes/stories'))

const PORT = process.env.PORT || 5000

app.listen(
    PORT,
    console.log(`Server running on ${process.env.NODE_ENV} mode on port ${PORT}`)
)