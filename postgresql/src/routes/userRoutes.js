const { Router } = require('express');
const router = Router();
const {
	getUsers,
	addUser,
	getUser,
	updateUser,
	deleteUser,
	loginUser,
} = require('../controllers/userController');

router.get('/users', getUsers);

router.get('/users/:id_usuario', getUser);

router.post('/registeruser', addUser);

router.post('/loginuser', loginUser);

router.put('/users/:id_usuario', updateUser);

router.delete('/users/:id_usuario', deleteUser);

module.exports = router;
