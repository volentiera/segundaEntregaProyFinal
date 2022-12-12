
const {Router} = require('express');
const router = Router();
//const ProductsContainerFile = require('../dao/mongoProducts')
const ProductsContainerFile = require('../dao/firebaseProducts')
const productsContainerAccess = new ProductsContainerFile()


const admin = true

router.get('/api/productos/:id?', async (req,res) => {
    try {
        const newId = req.params.id
        if (newId !== undefined){
            const idRecieved = newId
            const products = await productsContainerAccess.getByID(idRecieved)
            res.json(products)
        }else {
            const allProducts = await productsContainerAccess.getAll()
            res.json(allProducts)
        }
    } catch (error) {
        console.log(error)
    }
})
router.post('/api/productos', async (req,res)=>{
    if (admin){
        try {
            const product = {... req.body, timestamp: `Creado: ${new Date().toLocaleString()}`}
            await productsContainerAccess.addNewProduct(product)
            const allProducts = await productsContainerAccess.getAll()
            res.json(allProducts)
        } catch (error) {
            console.log(error)
        }
    } else {
        const response = {error: -1, descripcion: "ruta /api/productos metodo POST no autorizada"}
        res.json(response)
    }
})
router.delete('/api/productos/:id', async (req,res)=>{
    if (admin){
    try {
        const idRecieved = req.params.id
        const elementDeleted = await productsContainerAccess.deleteById(idRecieved)
        res.json(elementDeleted)
    } catch (error) {
        console.log(error)
    }
    }else {
        const response = {error: -1, descripcion: "ruta /api/productos/:id metodo DELETE no autorizada"}
        res.json(response)
    }
})
router.put('/api/productos/:id', async (req,res)=>{
    if (admin){
    try {
        const idRecieved = req.params.id
        const product = {... req.body, timestamp: `Modificado: ${new Date().toLocaleString()}`}
        const productUpdated = await productsContainerAccess.modifyProductById(idRecieved, product )
        res.json(productUpdated)
    } catch (error) {
        console.log(error)
    }
    }else {
        const response = {error: -1, descripcion: "ruta /api/productos/:id metodo PUT no autorizada"}
        res.json(response)
    }
})
module.exports = router;