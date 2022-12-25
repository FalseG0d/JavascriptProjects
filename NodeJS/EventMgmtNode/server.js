require('./models/db');

const express=require('express');
const path=require('path');
const exphbs=require('express-handlebars');
const bodyparser=require('body-parser');

const loginController=require('./controllers/loginController');
const eventController=require('./controllers/eventController');

var app=express();
app.use(bodyparser.urlencoded({
    extended:true
}));
app.use(bodyparser.json());

app.set('views',path.join(__dirname,'/views/'));
app.engine('hbs',exphbs({extname:'hbs',defaultLayout:'mainLayout',layoutsDir:__dirname+'/views/layouts/'}));
app.set('view engine','hbs')

app.listen(3001,()=>{
    console.log("Listening to port 3001");
});
app.use('/',loginController);
app.use('/events',eventController);