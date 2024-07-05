const bodyParser = require('body-parser');
const { error } = require('console');
const e = require('express');
const express = require('express');
const cors = require('cors');
const mysql = require('mysql2');

const app = express();
const port = process.env.port|| 7000;

const dbConnect = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'gasmark'
});
dbConnect.connect((err) => {
    if (err) {
        throw err;
    }
    else {
        console.log("connected sucessfully to database");
    }
});
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// new connection api

app.post('/users/newconnection', (req, res) => {
    const { firstname, lastname, mobilenumber, email, idproof, address, pincode, gender, dob, agency, nationality, cylindertype } = req.body;
    const sql = 'INSERT INTO connection_details  ( firstname, lastname, mobilenumber, email, idproof, address, pincode, gender, dob, agency, nationality, cylindertype) VALUES(?,?,?,?,?,?,?,?,?,?,?,?)';
    dbConnect.query(sql,[firstname, lastname, mobilenumber, email, idproof, address, pincode, gender, dob, agency, nationality, cylindertype],(err , result)=>{
    if(err){
        res.status(500).json({error: err.message});
        return;
    }
    res.status(201).json({message:' sumitted sucessfully',email:result.email});
});

});

// booking api 


app.post('/users/newconnection/booking', (req, res) => {
    const { modeofdelivery, day, time, consumerid } = req.body;
    const sql = 'INSERT INTO booking  ( modeofdelivery, day, time, consumerid ) VALUES(?,?,?,?)';
    dbConnect.query(sql,[modeofdelivery, day, time, consumerid ],(err , result)=>{
    if(err){
        res.status(500).json({error: err.message});
        return;
    }
    res.status(201).json({message:' Booking sucessfully',email:result.email});
});

});




// fetch data from database api

app.get('/users/newconnection/details/fetch',(req,res)=>{
const {firstname}=req.query;
let sql= 'SELECT * FROM connection_details ';
dbConnect.query(sql,(err,result)=>{
if(err){
    res.status(500).json({error: err.message});
    return;
}
res.json(result);

});
});


app.listen(port, () => {
    console.log('server is runing ');
});