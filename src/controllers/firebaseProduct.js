const admin = require('firebase-admin')


class ProductsDAOContainer {

    async deleteById(idRecieved){
        await this.connect()
        const db = admin.firestore()
        const products = db.collection('productos')
        const productToDelete = await products.doc(idRecieved).get()
        if (productToDelete.data()!== undefined){
            await products.doc(idRecieved).delete()
            admin.app().delete()
            return productToDelete
        }else{
            const error = {
                error: -3,
                descripcion: "error en busqueda de id de producto",
            }
            admin.app().delete()
            return error
        }
    }
    async addNewProduct(productsRecieved){
        await this.connect()
        const db = admin.firestore()
        const products = db.collection('productos')
        await products.doc().set(productsRecieved)
        const snapshot = await products.get()
        const allProducts = snapshot.docs.map(doc => doc.id)
        admin.app().delete()
        return allProducts
    }
    async getAll(){
        await this.connect()
        const db = admin.firestore()
        const products = db.collection('productos')
        const snapshot = await products.get()
        const allProducts = snapshot.docs.map(doc => doc.data())
        return (admin.app().delete() , allProducts )
    }
    async getByID(idRecieved){
        await this.connect()
        const db = admin.firestore()
        const products = db.collection('productos')
        const snapshot = await products.doc(idRecieved).get()
        if (snapshot.data() !== undefined) {
            admin.app().delete()
            return snapshot.data()
        }else{
            const error = {
                error: -3,
                descripcion: "error en busqueda de id de producto",
            }
            admin.app().delete()
            return error
        }
        
    }
    async modifyProductById(idRecieved, product){
        await this.connect()
        const db = admin.firestore()
        const products = db.collection('productos')
        const productRecieved = await products.doc(idRecieved).get()
        if (productRecieved.data()!== undefined){
            products.doc(idRecieved).update(product)
            admin.app().delete()
            return productRecieved.data()
        }else {
            const error = {
                error: -3,
                descripcion: "error en busqueda de id de producto",
            }
            admin.app().delete()
            return error
        }
    }
}

module.exports = ProductsDAOContainer

