const express = require('express');
const router = express.Router();
const userController = require('../controller/userController')




router.get('/', userController.getAllUsers)
router.get('/add', userController.getAddUserPage)
router.post('/add' , userController.createUser)
router.get('/edit/:id',userController.getEditUserPage)
router.post('/edit/:id',userController.editUser)
router.post('/delete/:id',userController.deleteUser)


module.exports = router;
