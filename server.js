require('dotenv').config();
const express=require("express")
const app=express()
const mongoose=require("mongoose")
const connectDB=require("./config/dbConn")
connectDB();

app.use(express.json())
// app.use(express.urlencoded({ extended: false }));
app.use("/auth",require("./routes/auth"))
app.use("/users",require("./routes/api/user"))



const hostname = process.env.HOSTNAME;
const port = process.env.PORT;

mongoose.connection.once("open", () => {
    console.log('Connected to MongoDB');
    app.listen(port, hostname, () => {
        console.log(`Server running at http://${hostname}:${port}/`);
      });
});




