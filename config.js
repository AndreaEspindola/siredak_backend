'use strict'

module.exports = {
    api: {
        port: process.env.PORT || 3001  
    },
    frontend: {
        api: ''
    },
    mysql: {
        host: process.env.MYSQL_HOST || 'us-cdbr-east-06.cleardb.net',
        database: process.env.DATABASE || 'heroku_3ac8e0c96c58c97',
        user: process.env.USER || 'b2d658fe830444',
        password: process.env.PASSWORD || '4bdf0382'
    }
}