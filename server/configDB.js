

module.exports = {
    mysql: {
        host: process.env.DB_HOST || "localhost",
        database: process.env.SCHEMA || "data",
        username: process.env.MYSQL_USERNAME || "p1748927",
        password: process.env.MYSQL_PASSWORD || "Evelyn37!",
        logging: console.log,
        
    },
    seed: true
}