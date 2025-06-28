const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const path = require('path'); 
const userRoute = require('./routes/userRoute');


const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.set("view engine","ejs")
app.set("views",path.join(__dirname,"views"))

app.use("/",userRoute)



const port = 8085;

app.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
});
