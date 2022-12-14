const ProductsDAOContainer = require('../controllers/firebaseProduct')
const admin = require('firebase-admin')


const serviceAccount = require('../config/serviceAccountKey.json')

class ProductsContainerFile extends ProductsDAOContainer{
    
    async connect(){
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount),
            databaseURL: 'https://backend-santiago-volentiera.firebaseio.com'
        })
    }
}
module.exports = ProductsContainerFile