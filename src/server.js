import express from 'express'
import configViewEngine from './config/viewEngine';
import initWebRoute from './route/web'
require('dotenv').config();

const app = express();
const port = process.env.port || 3000;

//Set up view engine
configViewEngine(app);
initWebRoute(app);

// app.get('/', (req, res) =>{
//     res.render('index.ejs');
// })

// app.get('/about', (req, res) => {
//     res.send(`I'm Khang KTN`);
// })

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})