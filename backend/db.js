const mongoose = require('mongoose');
const mongoURI = "mongodb://0.0.0.0:27017/finmanagement"

const connectToMongo = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(mongoURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB Connected...');
    } catch (err) {
        console.error(err.message);
        // make the process fail
        process.exit(1);
    }
}
module.exports = connectToMongo;