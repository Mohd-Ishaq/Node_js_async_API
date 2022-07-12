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