const { Router } = require('express');
const router = Router();
const {
	getUsers,
	addUser,
	getUser,
	updateUser,
	deleteUser,
} = require('../controllers/index.controller');

router.get('/users', getUsers);

router.get('/users/:id_usuario', getUser);

router.post('/users', addUser);

router.put('/users/:id_usuario', updateUser);

router.delete('/users/:id_usuario', deleteUser);

module.exports = router;
