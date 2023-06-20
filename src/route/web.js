import express from 'express';
import homeController from '../controller/homeController'
let router = express.Router();

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);
    app.get('/about', (req, res) => {
        res.send(`I'm Khang KTN`);
    })
    return app.use('/', router);
}

export default initWebRoute;