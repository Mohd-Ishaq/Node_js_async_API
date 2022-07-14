const express=require("express")
const app=express()
// const http=require("http")
// const path = require("path")
// const fs=require("fs")
// const data={}
// data.employees=require("./model/data.json")
const data={
    employees:require("./model/data.json"),
    setEmployee: function (data){this.employees=data}
}
app.use(express.json())

app.get("/",(req,res)=>{
    res.json(data.employees)
})
app.get("/getone/:id",(req,res)=>{
    const employee=data.employees.find(emp=>emp.id===parseInt(req.params.id))
    if (!employee){
        return res.status(400).json({"message":`employee ${req.params.id} does not exist`})
    }
    res.json(employee)
})
app.post("/create",(req,res)=>{
    const newEmployee={
        id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
        firstname:req.body.firstname,
        lastname:req.body.lastname
    }
    if(!newEmployee.firstname||!newEmployee.lastname){
        return res.status(400).json({"messgae":"firstname and lastname are required"})
    }
    data.setEmployee([...data.employees,newEmployee]);
    res.status(201).json(data.employees)
})
app.put("/update",(req,res)=>{
    const employee=data.employees.find(emp=>emp.id === parseInt(req.body.id))
    if (!employee) {
        return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
    }
    if (req.body.firstname) employee.firstname = req.body.firstname;
    if (req.body.lastname) employee.lastname = req.body.lastname;
    const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    const unsortedArray = [...filteredArray, employee];
    data.setEmployee(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
    res.json(data.employees);
})
app.delete("/delete",(req,res)=>{
    const employee=data.employees.find(emp=>emp.id===parseInt(req.body.id))
    if (!employee){
        return res.status(400).json({"message":`employee ${req.body.id} does not exist`})
    }
    const filteredArray=data.employees.filter(emp => emp.id !== parseInt(req.body.id));
    data.setEmployee([...filteredArray]);
    res.json(data.employees)
    
})

const hostname = '127.0.0.1';
const port = 3000;

app.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });


    // const newEmployee={
    //     id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1 : 1,
    //     firstname: req.body.firstname,
    //     lastname: req.body.lastname
    // }
    // if (!newEmployee.firstname || !newEmployee.lastname) {
    //     return res.status(400).json({ 'message': 'First and last names are required.' });
    // }

    // data.setEmployee([...data.employees, newEmployee]);
    // res.status(201).json(data.employees);

    // if (!req?.body?.firstname || !req?.body?.lastname) {
    //     return res.status(400).json({ 'message': 'First and last names are required' });
    // }

    // try {
    //     const result =  data.employees.create({
    //         firstname: req.body.firstname,
    //         lastname: req.body.lastname
    //     });

    //     res.status(201).json(result);
    // } catch (err) {
    //     console.error(err);
    // }
// })
    // try{

    // }catch (err){
    //     console.log(err)
    // }
//     res.json({
//         "firstname":req.body.firstname,
//         "lastname":req.body.lastname 
//     });
// })

    // const newEmployee={
    //     id:data.employees[data.employees.length-1].id+1||1,
    //     firstname:req.body.firstname,
    //     lastname:req.body.lastname
    // }
    // if (!newEmployee.firstname||!newEmployee.lastname){
    //     return res.status(400).json({"message":"first and last name are required"});
    // }
    // data.setEmployee([...data.employees,newEmployee])
    // res.status(201).json(data.employees);
   


// app.put("/update",(req,res)=>{
//     const employee=data.employees.find(emp=>emp.id === parseInt(req.body.id))
//     if (!employee) {
//         return res.status(400).json({ "message": `Employee ID ${req.body.id} not found` });
//     }
//     if (req.body.firstname) employee.firstname = req.body.firstname;
//     if (req.body.lastname) employee.lastname = req.body.lastname;
//     const filteredArray = data.employees.filter(emp => emp.id !== parseInt(req.body.id));
//     const unsortedArray = [...filteredArray, employee];
//     data.setEmployee(unsortedArray.sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0));
//     res.json(data.employees);
// })


// app.get("/getall",(req,res)=>{
//     fs.readFile("./model/data.json",()=>{
//         if (err) throw err;
//         console.log(data)
//     })

// })
// const server = http.createServer((req, res) => {
//   res.statusCode = 200;
//   res.setHeader('Content-Type', 'text/plain');
//   res.end('Hello, World!\n');
// });


// app.get("/",async (req,res)=>{
//     users=await User.find()
//     if (!users) {
//         return res.status(204).json({"message":"users not found"})
//     }
//     res.json(users)
// })

// app.get("/getone/:id",async (req,res)=>{
//     if (!req?.params?.id) return res.status(400).json({ "message": 'User ID required' });
//     const user = await User.findOne({ _id: req.params.id }).exec();
//     if (!user) {
//         return res.status(204).json({ 'message': `User ID ${req.params.id} not found` });
//     }
//     res.json(user);
// })


// app.post("/create",async(req,res)=>{    
//     if (!req?.body?.username || !req?.body?.password) {
//     return res.status(400).json({ 'message': 'First and last names are required' });
// }

//     try {
//         const hashedPwd=await bcrypt.hash(req.body.password, 10);
//         const result = await User.create({
//             username: req.body.username,
//             password: hashedPwd
//         });

//         res.status(201).json(result);
//     } catch (err) {
//         console.error(err);
//     }
// });


// app.put("/update",async(req,res)=>{
//     if (!req?.body?.id) {
//         return res.status(400).json({ 'message': 'ID parameter is required.' });
//     }

//     const user = await User.findOne({ _id: req.body.id }).exec();
//     if (!user) {
//         return res.status(204).json({ "message": `No user matches ID ${req.body.id}.` });
//     }
//     const hashedPwd=await bcrypt.hash(req.body.password, 10);
//     if (req.body?.username) user.username = req.body.username;
//     if (req.body?.password) user.password = hashedPwd;
//     const result = await user.save();
//     res.json(result);
// });

// app.delete("/delete",async (req,res)=>{
//     if(!req?.body?.id){
//         return res.status(400).json({"message":"id parameter is required"})
//     }
//     const user = await User.findOne({_id:req.body.id}).exec()
//     if(!user){
//         return res.status(204).json({"message":`no user matches ID ${req.body.id}`})
//     }
//     const result=await user.deleteOne({_id:req.body.id})
//     res.json(result)
// });