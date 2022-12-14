const { firestore } = require('firebase-admin')
const admin = require('firebase-admin')

class CartDAOContainer{
    async getAll(){
        await this.connect()
        const db = admin.firestore()
        const cart = db.collection('carritos')
        const snapshot = await cart.get()
        const allCarts = snapshot.docs.map(doc => doc.data())
        const allCartsIds = snapshot.docs.map(doc => doc.id)
        const result = {
            allCarts: allCarts,
            allCartsIds: allCartsIds
        }
        return (admin.app().delete() , result )
    }
    async createCart(){
        await this.connect()
        const db = admin.firestore()
        const cart = db.collection('carritos')
        await cart.doc().set({})
        const snapshot = await cart.get()
        const allCartsId = snapshot.docs.map(doc => doc.id)
        const result = {
            allCartsId: allCartsId
        }
        admin.app().delete()
        return result
    }
    async addProductToCart(idCart, idProd){
        await this.connect()
        const db = admin.firestore()
        const cart = db.collection('carritos')
        const product = db.collection('productos')
        const selectedProduct = await product.doc(idProd).get()
        const selectedCart = await cart.doc(idCart).get()
        if (selectedCart.data() !== undefined){
            const selectedProductData = selectedProduct.data()
            const selectedProductId = selectedProduct.id
            if (selectedProduct.data() !== undefined){
                const newObject  = {
                    id: selectedProductId,
                    product: selectedProductData
                }
                await cart.doc(idCart).update({productos: firestore.FieldValue.arrayUnion(newObject)})
                
                const result = newObject
                return (admin.app().delete(),result)
            }else{
                const error = {
                    error: -3,
                    descripcion: "error en busqueda de id de producto",
                }
                admin.app().delete()
                return error
            }
        }else{
            const error = {
                error: -3,
                descripcion: "error en busqueda de id de carrito",
            }
            admin.app().delete()
            return error
        }
        
    }
    async getByID(idRecieved){
        await this.connect()
        const db = admin.firestore()
        const cart = db.collection('carritos')
        const snapshot = await cart.doc(idRecieved).get()
        if (snapshot.data() !== undefined) {
            const result = {
                id: snapshot.id,
                data: snapshot.data()
            }
            admin.app().delete()
            return result
        }else{
            const error = {
                error: -3,
                descripcion: "error en busqueda de id de carrito",
            }
            admin.app().delete()
            return error
        }
        
    }
    async deleteById(idRecieved){
        await this.connect()
        const db = admin.firestore()
        const cart = db.collection('carritos')
        const cartToDelete = await cart.doc(idRecieved).get()
        if (cartToDelete.data() !== undefined){
            await cart.doc(idRecieved).delete()
            admin.app().delete()
            const result = {
                id: cartToDelete.id,
                data: cartToDelete.data()
            }
            return result
        }else{
            const error = {
                error: -3,
                descripcion: "error en busqueda de id de carrito",
            }
            admin.app().delete()
            return error
        }
    }
    async deleteProductFromCart(idCart,idProd){
        await this.connect()
        const db = admin.firestore()
        const cart = db.collection('carritos')
        const products = db.collection('productos')
        const selectedProduct = await products.doc(idProd).get()
        const selectedCart = await cart.doc(idCart).get({})
        const productsFromSelectedCart = selectedCart.data().productos
        const filteredProducts = productsFromSelectedCart.filter(e => e.id !== idProd)
        
        if ((selectedCart.data() !== undefined) && (filteredProducts !== undefined)){
            if (selectedProduct.data() !== undefined){
                await cart.doc(idCart).set({})
                filteredProducts.map(async (e)=>{
                    await cart.doc(idCart).update({productos: firestore.FieldValue.arrayUnion(e)})
                })
                const result = {
                    id: selectedCart.id,
                    data: selectedCart.data()
                }
                return (admin.app().delete(),result)
            }else{
                const error = {
                    error: -3,
                    descripcion: "error en busqueda de id de producto",
                }
                admin.app().delete()
                return error
            }
        }else{
            const error = {
                error: -3,
                descripcion: "error en busqueda de id de carrito",
            }
            admin.app().delete()
            return error
        }
    }
}

module.exports = CartDAOContainer