const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
    
    constructor() {
        // Initialization
        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';
        this.authPath = '/api/auth';

        // Database connection
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Routes
        this.routes();
    }

    async dbConnection() {
        await dbConnection();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Reading and parsing of the body
        this.app.use(express.json());

        // Public directory
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.authPath, require('../routes/auth'));
        this.app.use(this.usersPath, require('../routes/user'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log(`Starting server on port ${this.port}`)
        })
    }
}

module.exports = Server;