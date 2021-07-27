const {Sequelize} = require('sequelize');

if (process.env.DATABASE_URL) {
    sequelize = new Sequelize(process.env.DATABASE_URL, {
        dialect: 'postgres',
        protocol: 'postgres',
        dialectOptions: {
            ssl: {
                require: true,
                rejectUnauthorized: false
            }
        },
        define: {
            underscored: true
        },
        logging: false
    });
    console.log('Connected with DATABASE_URL');
} else {
    sequelize = new Sequelize(process.env.PG_URL, {
        define: {
            underscored: true
        },
        logging: false
    });
    console.log('Connected with PG_URL');
}

module.exports = sequelize;