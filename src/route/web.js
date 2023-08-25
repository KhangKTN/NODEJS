import express from 'express';
import homeController from '../controller/homeController'
import multer from 'multer';
import path from 'path';
let appRoot = require('app-root-path');
let router = express.Router();

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        //console.log('>> Check app root:', appRoot);
        cb(null, appRoot + "/src/public/image/");
    },

    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
})

const imageFilter = function(req, file, cb){
    if(!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)){
        req.fileValidationError = 'Only image file are allowed!';
        return cb(new Error('Only image file are allowed!'), false);
    }
    cb(null, true);
}

let upload = multer({storage: storage, fileFilter: imageFilter});

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage);
    router.get('/detail/users/:id', homeController.getDetailPage);
    router.post('/create-new-user', homeController.createNewUser);
    router.post('/delete-user', homeController.deleteUser);
    router.get('/edit-user/:id', homeController.getEditPage);
    router.post('/update-user', homeController.postUpdateUser);
    router.get('/upload', homeController.getUploadFilePage);
    router.post('/upload-profile-pic', upload.single('profile_pic'), homeController.handleUploadFile);
    router.post('/upload-multiple-image', upload.array('multiple_images', 3), homeController.handleUploadMultipleFiles);
    
    app.get('/about', (req, res) => {
        res.send(`I'm Khang KTN`);
    })
    return app.use('/', router);
}

export default initWebRoute;