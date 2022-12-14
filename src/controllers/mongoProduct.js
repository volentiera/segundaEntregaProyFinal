const mongoose = require('mongoose')
const productsSchema = require('../config/productSchema')
class ProductsDAOContainer {
    productsDAO = mongoose.model('productos', productsSchema)
    async getAll(){
        try {
            this.connect()
            const allProducts = await this.productsDAO.find()
            return allProducts
        } catch (error) {
            console.log(error)
        }
    }
    async getByID(idRecieved){
        try {
            this.connect()
            const product = await this.productsDAO.findOne({_id: idRecieved})
            if (product !== null){
                return product
            } else {
                const error = {
                    error: -3,
                    descripcion: "error en busqueda de id de producto",
                }
                return error
            }
        } catch (error) {
            console.log(error)
        }
    }
    async deleteById(idRecieved){
        try {
        this.connect()
        const productToDelete = await this.productsDAO.findOne({_id: idRecieved})
        if (productToDelete !== null){
            await this.productsDAO.findByIdAndDelete(idRecieved)
            return productToDelete
        }else {
            const error = {
                error: -3,
                descripcion: "error en busqueda de id de producto",
            }
            return error
        }
        }catch (error) {
            console.log(error)
        }
    }
    async addNewProduct(product){
        try {
            this.connect()
            await this.productsDAO.create(product)
            const allProducts = await this.productsDAO.find()
            const addedProduct = allProducts[allProducts.length - 1]
            return addedProduct
        } catch (error) {
            console.log(error)
        }
    }
    async modifyProductById(idRecieved, product){
        try {
            this.connect()
            const productToUpdate = await this.productsDAO.findById(idRecieved)
            if (productToUpdate !== null){
                await this.productsDAO.findByIdAndUpdate(idRecieved, product)
                return productToUpdate
            }else {
                const error = {
                    error: -3,
                    descripcion: "error en busqueda de id de producto",
                }
                return error
            }
        } catch (error) {
            console.log(error)
        }
    }
}
module.exports = (ProductsDAOContainer)
