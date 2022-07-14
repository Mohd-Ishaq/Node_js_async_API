const User = require("../model/User")
const bcrypt =require("bcrypt")

const getAllUsers = async (req,res)=>{
    users=await User.find()
    if (!users) {
        return res.status(204).json({"message":"users not found"})
    }
    res.json(users)
}

const getOneUser = async (req,res)=>{
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
}

const createNewUser=async(req,res)=>{
    if (!req?.body?.username || !req?.body?.password) {
        return res.status(400).json({ 'message': 'First and last names are required' });
    }
    
        try {
            const hashedPwd=await bcrypt.hash(req.body.password, 10);
            const result = await User.create({
                username: req.body.username,
                password: hashedPwd
            });
    
            res.status(201).json(result);
        } catch (err) {
            console.error(err);
        }
}

const updateUser=async(req,res)=>{
    if (!req?.body?.id) {
        return res.status(400).json({ 'message': 'ID parameter is required.' });
    }

    const user = await User.findOne({ _id: req.body.id }).exec();
    if (!user) {
        return res.status(204).json({ "message": `No user matches ID ${req.body.id}.` });
    }
    const hashedPwd=await bcrypt.hash(req.body.password, 10);
    if (req.body?.username) user.username = req.body.username;
    if (req.body?.password) user.password = hashedPwd;
    const result = await user.save();
    res.json(result);
}


const deleteUser=async (req,res)=>{
    if(!req?.body?.id){
        return res.status(400).json({"message":"id parameter is required"})
    }
    const user = await User.findOne({_id:req.body.id}).exec()
    if(!user){
        return res.status(204).json({"message":`no user matches ID ${req.body.id}`})
    }
    const result=await user.deleteOne({_id:req.body.id})
    res.json(result)
}


module.exports={
    getAllUsers,
    getOneUser,
    createNewUser,
    updateUser,
    deleteUser
}