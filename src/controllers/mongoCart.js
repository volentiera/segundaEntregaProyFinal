const mongoose = require('mongoose')
const productsSchema = require('../config/productSchema')

const cartSchema = new mongoose.Schema({
    productos: {
        type: Array,
        required: true
    }
})

class CartDAOContainer {
    productsDAO = mongoose.model('productos', productsSchema)
    cartDAO = mongoose.model('carritos', cartSchema)
    async getAll(){
        try {
            this.connect()
            const allCarts = await this.cartDAO.find()
            return allCarts
        } catch (error) {
            console.log(error)
        }
    }
    async getByID(idRecieved){
        try {
            this.connect()
            const cart = await this.cartDAO.findById(idRecieved)
            if (cart !== null){
                return cart.productos
            } else {
                const error = {
                    error: -3,
                    descripcion: "error en busqueda de id de carrito",
                }
                return error
            }
        } catch (error) {
            console.log(error)
        }
    }
    async createCart(){
        try {
            this.connect()
            const cart = await this.cartDAO.apply()
            await this.cartDAO.create(cart)
            const allCarts = await this.cartDAO.find()
            const lastCart = allCarts[allCarts.length - 1]
            return lastCart
        } catch (error) {
            console.log(error)
        }
    }
    async deleteById(idRecieved){
        try {
            this.connect()
            const cartToDelete = await this.cartDAO.findById(idRecieved)
            if (cartToDelete !== null){
                await this.cartDAO.findByIdAndDelete(idRecieved)
                return cartToDelete
            }else {
                const error = {
                    error: -3,
                    descripcion: "error en busqueda de id de carrito",
                }
                return error
            }
        } catch (error) {
            console.log(error)
        }
    }
    async addProductToCart(idCart,idProd){
        try {
            this.connect()
            const selectedCart = await this.cartDAO.findById(idCart)
            if (selectedCart !== null){
                const selectedProduct = await this.productsDAO.findById(idProd)
                if (selectedProduct !== null){
                    await selectedCart.productos.push(selectedProduct)
                    await this.cartDAO.findByIdAndUpdate(idCart , selectedCart)
                    return selectedCart.productos
                }else{
                    const error = {
                        error: -3,
                        descripcion: "error en busqueda de id de producto",
                    }
                    return error
                }
            }else{
                const error = {
                    error: -3,
                    descripcion: "error en busqueda de id de carrito",
                }
                return error
            }
        } catch (error) {
            console.log(error)
        }
    }
    async deleteProductFromCart(idCart, idProd){
        try {
            this.connect()
            const selectedCart = await this.cartDAO.findById(idCart)
            if (selectedCart !== null){
                const selectedProduct = selectedCart.productos.filter(e => e._id != idProd )
                await this.cartDAO.findByIdAndUpdate(idCart, {productos: selectedProduct})
                const cart = await this.cartDAO.findById(idCart)
                return cart.productos
            }else{
                const error = {
                    error: -3,
                    descripcion: "error en busqueda de id de carrito",
                }
                return error
            }
        } catch (error) {
            console.log(error)
        }
    }
}

module.exports = CartDAOContainer