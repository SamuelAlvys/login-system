const { Router } = require('express')
const router = Router();
const UserController = require('../controller/userController')

const controller = new UserController();

//Listar um usuário
router.get('/users/:id', controller.show)

//Lista todos os usuários
router.get('/users', controller.index)

//Cria um usuário
router.post('/users', controller.store)

//Atualiza um usuário 
router.put('/users/:id', controller.update)

//Deleta um usuário
router.delete('/users/:id', controller.destroy)

module.exports = router;