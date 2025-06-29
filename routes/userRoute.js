const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')




router.get('/', userController.getAllUsers)
router.get('/add', userController.getAddUserPage)
router.post('/add' , userController.createUser)
router.get('/edit/:id',userController.getEditUserPage)
router.post('/edit/:id',userController.editUser)
router.post('/delete/:id',userController.deleteUser)

// router.post("/delete/:id" ,async (req,res) => {
//     try{
//         await prisma.user.delete({
//         where: {user_id: parseInt(req.params.id)}
//     })
//     res.redirect('/')
//     }
//     catch(err){
//         console.log('Something went wrong')
//     }
//     finally{
//         await prisma.$disconnect();
//     }
// })

module.exports = router;
