const UserTable = require('./models/userTable')
const routerRoutes = require('./routers/userRoutes')
const db = require('./config/db')
const cors = require('cors')
const express = require('express')
const app = express()
const PORT = 3001

app.use(express.json())
app.use(express.urlencoded({extended: true}))

UserTable.createTables(db)

app.use(routerRoutes)
app.use(cors());

app.listen(PORT, (e) => {
    if(e) {
        console.log('Não está rodando da porta 3001')
        return;
    }
    console.log('Está rodando na porta 3001')
})