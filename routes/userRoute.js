const { PrismaClient } = require('@prisma/client');
const express = require('express');
const router = express.Router();
const prisma = new PrismaClient();


router.get("/", async (req, res) => {
    try {
        const users = await prisma.user.findMany();
        return res.render("index", { users }); 
    }
    catch (err) {
        console.log(err); 
    }
    finally {
        await prisma.$disconnect();
    }
})
// Add User
router.get("/add",(req,res) => {
    res.render('add')
})

router.post("/add", async (req,res ) => {
    try{
        const {name,email} = req.body;
        await prisma.user.create({
            data: {name,email}
        })
        res.redirect('/')
    }
    catch(err){
        console.log('Something went wrong')
    }

    finally{
        await prisma.$disconnect();
    }
})


// Edit User

router.get("/edit/:id" ,async (req,res) => {
    try{
        const user = await prisma.user.findUnique({
        where : {user_id : parseInt(req.params.id)}
    });
    res.render("edit",{user})
    }
    catch(err){
        console.log('Something went wrong')
    }
    finally{
        await prisma.$disconnect();
    }
})

router.post("/edit/:id",async (req,res) => {
    try{
        const {name,email} = req.body;
    await prisma.user.update({
        where : {user_id : parseInt(req.params.id)},
        data : {name,email}
    })
    res.redirect('/')
    }

    catch(err){
        console.log('Something went wrong')
    }
    finally{
        await prisma.$disconnect();
    }
})


router.post("/delete/:id" ,async (req,res) => {
    try{
        await prisma.user.delete({
        where: {user_id: parseInt(req.params.id)}
    })
    res.redirect('/')
    }
    catch(err){
        console.log('Something went wrong')
    }
    finally{
        await prisma.$disconnect();
    }
})

module.exports = router;
