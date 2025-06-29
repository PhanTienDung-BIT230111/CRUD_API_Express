const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


exports.getAllUsers = async (req,res) => {
    try{
        const users = await prisma.user.findMany();
        res.render('index',{users}, (err,html) => {
            if(err){
                return res.status(500).send("Wrong page")
            }
            return res.send(html)
        })
    }
    catch(err){
        res.status(500).send("Server error")
    }
    finally{
        await prisma.$disconnect()
    }
}

exports.getAddUserPage = async (req, res) => {
  res.render('add', (err, html) => {
    if (err) {
      console.error("Render error:", err.message);
      return res.status(500).send("Internal server error");
    }
    res.send(html);
  });
};

exports.createUser = async (req,res) => {
    try{
        const {name,email} = await req.body;
        // Kiểm tra user đã tồn tại hay chưa. nếu có thì báo lỗi
        const user = await prisma.user.findUnique({
            where: {email : email}
        })
        if(user){
            return res.status(404).send('Exist email')
        }
        await prisma.user.create({
            data: {name,email}
        })
        // kiểm tra có thêm user thành công không
        const userInDb = await prisma.user.findUnique({
            where:{name:name,email:email}
        })
        if(userInDb){
            console.log("Add user successfull")
        }else{
            return res.status(500).send("Server error")
        }
        res.redirect('/')
    }
    catch(err){
        res.status(500).send("Server error")
    }
    finally{
        await prisma.$disconnect()
    }

}

exports.getEditUserPage = async (req,res) => {
    try{
        const user = await prisma.user.findUnique({
            where: {user_id : parseInt(req.params.id)}
        })
        res.render("edit",{user},(err,html) => {
            if(err){
                return res.status(500).send("Wrong page")
            }
            return res.send(html)
        })
    }
    catch(err){
        res.status(500).send("Server error")
    }
    finally{
        await prisma.$disconnect()
    }
}

exports.editUser = async (req,res) => {
    try{
        const {name,email} = req.body;
        // Kiểm tra email khi update có trùng với email trong db không
        const user = await prisma.user.findUnique({
            where: {email : email}
        })
        if(user){
            return res.status(404).send("Exist email")
        }
        
        await prisma.user.update({
            where: {user_id : parseInt(req.params.id)},
            data : {name,email}
        })
        // Kiểm tra có update trong db có thành công không
        const userInDb = await prisma.user.findUnique({
            where:{name:name,email:email}
        })
        if(userInDb){
            console.log("Update user successfull")
        }else{
            return res.status(500).send("Server error")
        }

        return res.redirect('/')
    }
    catch(err){
        res.status(500).send("Server error")
    }
    finally{
        await prisma.$disconnect()
    }
}

exports.deleteUser = async (req,res) => {
    try{
        await prisma.user.delete({
            where: {user_id : parseInt(req.params.id)}
        })
        // Kiểm tra xem đã xóa trong db chưa
        const userDeleted = await prisma.user.findUnique({
            where:{user_id: parseInt(req.params.id) }
        })
        if(!userDeleted){
            console.log("Delete user successfull")
        }else{
            res.status(500).send("Server errror")
        }
        return res.redirect('/')
    }
    catch(err){
        res.status(500).send("Server error")
    }
    finally{
        await prisma.$disconnect()
    }
}