const mongoose = require('mongoose');
const { DBURI } = process.env;

const connectDB = async () => {
    try {
        await mongoose.connect(DBURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
        });
        console.log('connected to mongodb');
    } catch (err) {
        console.log(err);
        process.exit(1);
    }
};

module.exports = connectDB;
