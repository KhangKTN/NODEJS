import pool from "../config/connectDB";
import multer from 'multer';

let getHomepage = async(req, res) => {
    /* let data = [];
    connection.query(
        'SELECT * FROM `users`',
        function(err, results, fields){
            console.log(results);
            results.map((row) => {
                data.push({
                    id: row.Id,
                    email: row.email,
                    address: row.address,
                    firstName: row.firstName,
                    lastName: row.lastName
                })
            })
            //console.log('>> data inside', data);
        }
        ) */
    const [rows, fields] = await pool.execute('Select * From `users`');
    return res.render('index.ejs', {dataUser: rows, test: 'abc string test'});
}

let getDetailPage = async(req, res) => {
    let userId = req.params.id;
    let [user] = await pool.execute('select * from users where id = ?', [userId]);
    //console.log('check req params:', user);
    return res.send(JSON.stringify(user));
}

let createNewUser = async(req, res) => {
    console.log('check req: ', req.body);
    let {firstName, lastName, email, address} = req.body;
    await pool.execute('Insert Into users(firstName, lastName, email, address) values(?,?,?,?)', [firstName, lastName, email, address]);
    return res.redirect('/');
}

let deleteUser = async(req, res) => {
    await pool.execute('Delete from users where id = ?', [req.body.userId]);
    return res.redirect(`/`);
}

let getEditPage = async(req, res) => {
    let [user, asas] = await pool.execute('Select * From users where id = ?', [req.params.id]);
    return res.render('update.ejs', {dataUser: user[0]});
}

let postUpdateUser = async(req, res) => {
    console.log('check request:', req.body);
    let {firstName, lastName, email, address, id} = req.body;
    await pool.execute('Update users Set firstName = ?, lastName = ?, email = ?, address = ? Where id = ?', 
    [firstName, lastName, email, address, id]);
    return res.redirect(`/`);
}

let getUploadFilePage = (req, res) => {
    return res.render('uploadFile.ejs');
}

// const upload = multer().single('profile_pic');
//const uploadMultiple = multer().array('multiple_images');

let handleUploadFile = async(req, res) => {
    //upload(req, res, function(err){
        if(req.fileValidationError){
            return res.send(req.fileValidationError);
        }
        else if(!req.file){
            return res.send('Please select an image to upload');
        }
        /* else if(err instanceof multer.MulterError){
            return res.send(err);
        }
        else if(err){
            return res.send(err);
        } */
        res.send(`You have upload this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr/><a href="/upload">Upload another image</a>`);
    //})
}

let handleUploadMultipleFiles = (req, res) => {
    //uploadMultiple(req, res, function(err){
        if(req.fileValidationError){
            return res.send(req.fileValidationError);
        }
        else if(!req.files){
            return res.send('Please select an image to upload');
        }
        
        let result = 'You have uploaded these image: <hr/>';
        const files = req.files;
        let len = files.length;
        for(let index = 0; index < len; ++index){
            result += `<img src="/image/${req.files[index].filename}" width="300" style="margin-right: 20px;">`;
        }
        result += '<hr/><a href="/upload">Upload more images</a>';
        res.send(result);
    //})
}

module.exports = {
    getHomepage, getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser, getUploadFilePage,
    handleUploadFile, handleUploadMultipleFiles
}