// Vehicle Rental System

const express = require("express");
const mysql = require("mysql2");

const app = express();

app.use(express.json());
app.use(express.static("public"));

// Database Connection

const db = mysql.createConnection({

    host: "localhost",
    user: "root",
    password: "harthik123",      // Change if your MySQL password is different
    database: "vehicle_rental"

});

db.connect((err)=>{

    if(err)
        throw err;

    console.log("Connected to MySQL");

});


// ==============================
// GET ALL VEHICLES
// ==============================

app.get("/vehicles",(req,res)=>{

    db.query(

        "SELECT * FROM vehicles",

        (err,result)=>{

            if(err)
                throw err;

            res.json(result);

        }

    );

});


// ==============================
// GET ONE VEHICLE
// ==============================

app.get("/vehicles/:vehicleid",(req,res)=>{

    db.query(

        "SELECT * FROM vehicles WHERE vehicleid=?",

        [req.params.vehicleid],

        (err,result)=>{

            if(err)
                throw err;

            res.json(result);

        }

    );

});


// ==============================
// INSERT VEHICLE
// ==============================

app.post("/vehicles",(req,res)=>{

    const {

        vehicleid,
        vehiclename,
        brand,
        model,
        rentperday,
        fueltype,
        availability

    } = req.body;

    db.query(

        `INSERT INTO vehicles
        (vehicleid,vehiclename,brand,model,rentperday,fueltype,availability)
        VALUES(?,?,?,?,?,?,?)`,

        [

            vehicleid,
            vehiclename,
            brand,
            model,
            rentperday,
            fueltype,
            availability

        ],

        (err)=>{

            if(err){

                res.status(500).send(err.message);
                return;

            }

            res.send("Vehicle Added Successfully");

        }

    );

});


// ==============================
// UPDATE VEHICLE
// ==============================

app.put("/vehicles/:vehicleid",(req,res)=>{

    const {

        vehiclename,
        brand,
        model,
        rentperday,
        fueltype,
        availability

    } = req.body;

    db.query(

        `UPDATE vehicles
        SET
        vehiclename=?,
        brand=?,
        model=?,
        rentperday=?,
        fueltype=?,
        availability=?
        WHERE vehicleid=?`,

        [

            vehiclename,
            brand,
            model,
            rentperday,
            fueltype,
            availability,
            req.params.vehicleid

        ],

        (err,result)=>{

            if(err){

                res.status(500).send(err.message);
                return;

            }

            if(result.affectedRows==0)

                res.status(404).send("Vehicle Not Found");

            else

                res.send("Vehicle Updated Successfully");

        }

    );

});


// ==============================
// DELETE VEHICLE
// ==============================

app.delete("/vehicles/:vehicleid",(req,res)=>{

    db.query(

        "DELETE FROM vehicles WHERE vehicleid=?",

        [req.params.vehicleid],

        (err,result)=>{

            if(err){

                res.status(500).send(err.message);
                return;

            }

            if(result.affectedRows==0)

                res.status(404).send("Vehicle Not Found");

            else

                res.send("Vehicle Deleted Successfully");

        }

    );

});


// ==============================
// START SERVER
// ==============================

app.listen(3000,()=>{

    console.log("Server Running at http://localhost:3000");

});