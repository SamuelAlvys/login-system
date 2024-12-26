const md5 = require('md5')

class UserTable {
    createTables(db) {
        this.db = db;
        return this.createTablesUsers();
        
    }

    createTablesUsers() {
        const sql = `
        CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(100) NOT NULL,
        user_name VARCHAR(20) NOT NULL,
        password_hash VARCHAR(100) UNIQUE
        ) 
        `;

        new Promise((resolve, reject) => {
            this.db.query(sql, (e, result) => {
                if(e) {
                    console.log('Deu erro na criação da tabela')
                    return reject(e);
                }
                console.log('Tabela criada com sucesso')
                return resolve(result);
            });
        });
    };



    async showUsers() {
        const sql = `SELECT * FROM users`;

        try {
            const [result] = await this.db.promise().query(sql); 
            console.log("Usuários visualizados com sucesso");
            return result;
        } catch (e) {
            console.log("Erro na visualização dos usuários");
            throw e; 
        }
    }

    async showAnUser(id) {
        const sql = `SELECT * FROM users WHERE id = ? `

        try {
            const [result] = await this.db.promise().query(sql,[id])
            return result[0];
        } catch (e) {
            console.log("Erro na visualização dos usuários");
            throw e; 
        }
    }

    async storeUser(body) {
        body.password_hash = md5(body.password_hash)
        const sql = `
        INSERT INTO users (name, user_name, password_hash) VALUES (?, ?, ?)
        `;

        try {
            const [result] = await this.db.promise().query(sql, [body.name, body.user_name, body.password_hash])
            return result;
        } catch (e) {
            console.log("Erro na criação do usuário");
            throw e; 
        }
    }

    async updateUser(id,body) {
        const sql = `
        UPDATE users
        SET name = ?,
        user_name = ?,
        password_hash = ? 
        WHERE id = ?
        `;

        try {
            const [result] = await this.db.promise().query(sql, [body.name, body.user_name, body.password_hash, id])
            return result;
        } catch (e) {
            console.log("Erro na atualização do usuário");
            throw e; 
        }

    }

    async destroyUser(id) {
        const sql = `DELETE FROM users WHERE id = ?`

        try {
            const [result] = await this.db.promise().query(sql, [id])
            return result
        } catch (e) {
            console.log("Erro na atualização do usuário");
            throw e; 
        }
    }
}


module.exports = new UserTable();