'use strict'

module.exports = {
    api: {
        port: process.env.PORT || 3001  
    },
    frontend: {
        api: ''
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'localhost',
        database: process.env.MYSQL_HOST || 'kueski',
        user: process.env.MYSQL_HOST || 'root',
        password: process.env.MYSQL_HOST || 'Roter12'
    }
}