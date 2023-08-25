import express from 'express'
import configViewEngine from './config/viewEngine';
import initWebRoute from './route/web'
import getHomepage from './controller/homeController'
import initAPIRoute from './route/api'
require('dotenv').config();

const app = express();
const port = process.env.port || 3000;

var morgan = require('morgan');
app.use((req, res, next) => {
    console.log('>> Run into my middleware:', req.method, req.header);
    //next();
})
app.use(morgan('combined'));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

//Set up view engine
configViewEngine(app);
//Init web route
initWebRoute(app);
initAPIRoute(app);


//handle 404 not found


// app.get('/', (req, res) =>{
//     res.render('index.ejs');
// })

// app.get('/about', (req, res) => {
//     res.send(`I'm Khang KTN`);
// })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})