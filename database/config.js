const mongoose = require('mongoose');

const dbConnection = async() => {
    try {
        await mongoose.connect(process.env.MONGODBCCONN, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });

        console.log('Database online');

    } catch (error) {
        console.log(error);
        throw new Error('Error on database connection');
    }
}

module.exports = {
    dbConnection
}