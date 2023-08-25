import pool from "../config/connectDB";

let getAllUsers = async(req, res) => {
    const [rows, fields] = await pool.execute('Select * From users');
    return res.status(200).json({
        data: rows
    })
}

let createNewUser = async(req, res) => {
    let {firstName, lastName, email, address} = req.body;
    if(!firstName || !lastName || !email || !address){
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('Insert Into users(firstName, lastName, email, address) values(?,?,?,?)', [firstName, lastName, email, address]);
    return res.status(200).json({
        message: '0k'
    })
}

let updateUser = async(req, res) => {
    let {firstName, lastName, email, address, id} = req.body;
    if(!firstName || !lastName || !email || !address || !id){
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('Update users Set firstName = ?, lastName = ?, email = ?, address = ? Where id = ?', 
    [firstName, lastName, email, address, id]);
    return res.status(200).json({
        message: '0k'
    })
}

let deleteUser = async(req, res) => {
    let userId = req.params.id;
    if(!userId){
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('Delete from users where id = ?', [userId]);
    return res.status(200).json({
        message: '0k'
    })
}

module.exports = {
    getAllUsers, createNewUser, updateUser, deleteUser
}