const {Router} = require('express');
const router = Router();
const mongo = 'mongo'
const firebase = 'firebase'

const CartContainerFile = require(`../dao/${mongo}CartDAO`)
const cartContainerAccess = new CartContainerFile()

router.get('/api/carritos', async (req,res) =>{
    try {
        const allCart = await cartContainerAccess.getAll()
        res.json(allCart)
    } catch (error) {
        console.log(error)
    }
})

router.post('/api/carritos', async (req,res) => {
    try {
        const cart = await cartContainerAccess.createCart()
        res.json(cart)
    } catch (error) {
        console.log(error)
    }
})
router.delete('/api/carritos/:id', async (req,res)=>{
    try {
        const idRecieved = req.params.id
        const deletedCart = await cartContainerAccess.deleteById(idRecieved)
        res.json(deletedCart) 
    } catch (error) {
        console.log(error);
    }
})
router.delete('/api/carritos/:id_cart/productos/:id_prod', async (req,res)=>{
    try {
        const idCartRecieved = req.params.id_cart
        const idProdRecieved = req.params.id_prod
        const deletedProduct = await cartContainerAccess.deleteProductFromCart(idCartRecieved, idProdRecieved)
        res.json(deletedProduct)
    } catch (error) {
        console.log(error);
    }
})
router.get('/api/carritos/:id/productos', async (req,res) =>{
    try {
        const idRecieved = req.params.id
        const cart = await cartContainerAccess.getByID(idRecieved)
        res.json(cart)
    } catch (error) {
        console.log(error)
    }
})
router.put('/api/carritos/:id_cart/productos/:id_prod', async (req,res)=>{
    try {
        const idCartRecieved = req.params.id_cart
        const idProdRecieved = req.params.id_prod
        const addProductsToCart = await cartContainerAccess.addProductToCart(idCartRecieved, idProdRecieved)
        res.json(addProductsToCart)
    } catch (error) {
        console.log(error);
    }
})


module.exports = router