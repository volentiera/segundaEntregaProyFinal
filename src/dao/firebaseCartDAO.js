const CartDAOContainer = require('../controllers/firebaseCart')
const admin = require('firebase-admin')


const serviceAccount = require('../config/serviceAccountKey.json')

class CartContainerFile extends CartDAOContainer{
    
    async connect(){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://backend-santiago-volentiera.firebaseio.com'
        })
    }
}
module.exports = CartContainerFile