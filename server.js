require('dotenv').config();
const express=require("express")
const app=express()
const mongoose=require("mongoose")
const connectDB=require("./config/dbConn")
const User=require("./model/User")
const bcrypt=require("bcrypt")

connectDB();

app.use(express.json())

app.get("/",async (req,res)=>{
    users=await User.find()
    if (!users) {
        return res.status(204).json({"message":"users not found"})
    }
    res.json(users)
})

app.get("/getone/:id",async (req,res)=>{
    if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
    const user = await User.findOne({ _id: req.params.id }).exec();
    if (!user) {
        return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
    }
    res.json(user);
})


app.post("/create",async(req,res)=>{    
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
});


app.put("/update",async(req,res)=>{
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
});

app.delete("/delete",async (req,res)=>{
    if(!req?.body?.id){
        return res.status(400).json({"message":"id parameter is required"})
    }
    const user = await User.findOne({_id:req.body.id}).exec()
    if(!user){
        return res.status(204).json({"message":`no user matches ID ${req.body.id}`})
    }
    const result=await user.deleteOne({_id:req.body.id})
    res.json(result)
});

const hostname = process.env.HOSTNAME;
const port = 3000;

mongoose.connection.once("open", () => {
    console.log('Connected to MongoDB');
    app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
      });
});




