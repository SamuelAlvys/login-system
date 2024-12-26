const userTable = require('../models/userTable')
const UserTable = require('../models/userTable')

class UserController {
    //GET para listar um usuário
    async index(req,res)
    {
        const atendimento = await UserTable.showUsers()

        return res.json(atendimento)
    }

    //Lista um usuário pelo ID 
    async show(req,res)
    {
        const id = req.params.id
        const atendimento = await UserTable.showAnUser(id)
        return res.json(atendimento)
    }

    //Criar um usuário
    async store(req,res) 
    {
        const body = req.body;

        if (!body.name) {
            return res.status(400).json({
                message: 'O nome é um campo obrigatório.',
            })
        }
        
        const atendimento = await UserTable.storeUser(body)
        return res.json(atendimento)
    }

    //atualiza um usuário
    async update(req,res) 
    {
        const id = req.params.id
        const body = req.body;
        const atendimento = await UserTable.updateUser(id,body)
        return res.json(atendimento)
    }

    //Deleta um usuário
    async destroy(req,res) 
    {
        const id = req.params.id
        const atendimento = await userTable.destroyUser(id)
        return res.json(atendimento);
    }
}

module.exports = UserController;