//import express
const express = require("express")
const app = express()

const cors = require("cors");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};
app.use(cors(corsOptions));

const {initializeDatabase} = require('./db/db.connection')

app.use(express.json())

initializeDatabase();

app.get("/", (req,res)=>{
    res.send("ShoeSanctuary Backend.")
})

// import router
const productRouter = require('./Routers/productsRoutes')
const categoryRouter = require('./Routers/categoryRoutes')
const wishlistRouter = require('./Routers/wishlistRoutes')
const cartRouter = require('./Routers/cartRoutes')
const addressRouter = require('./Routers/addressRoutes')
const userRouter = require('./Routers/userRoutes')
const orderRouter = require('./Routers/orderItemRoutes')


//  routes
app.use('/api/products' , productRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/wishlist',wishlistRouter)
app.use('/api/cart',cartRouter)
app.use('/api/address',addressRouter)
app.use('/api/user',userRouter)
app.use('/api/orders', orderRouter)



//port
const PORT = 3000 || process.env.PORT
app.listen(PORT,()=>{
    console.log('Server is running on port:', PORT)
})

module.exports = app;