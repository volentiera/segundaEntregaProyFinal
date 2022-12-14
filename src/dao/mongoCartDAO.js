const mongoose = require('mongoose')
const CartDAOContainer = require('../controllers/mongoCart')

class CartContainerFile extends CartDAOContainer{
    async connect(){
        await mongoose.connect('mongodb://localhost:27017/ecommerce', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        })
    }
    async disconnect(){
        await mongoose.disconnect()
    }
}
module.exports = CartContainerFile