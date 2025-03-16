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
    res.send("Hello Express")
})

// import router
const productRouter = require('./Routers/productsRoutes')
const categoryRouter = require('./Routers/categoryRoutes')
const orderItemRouter = require('./Routers/orderItemRoutes')
const addressRouter = require('./Routers/addressRoutes')
const wishlistRouter = require('./Routers/wishlistRoutes')
const userRouter = require('./Routers/userRoutes')
const cartRouter = require('./Routers/cartRoutes')
const loginRegisterRouter = require('./Routers/authRoutes')
const orderHistoryRouter = require("./Routers/orderHistoryRoutes")

//  routes
app.use('/api/products' , productRouter)
app.use('/api/categories', categoryRouter)
app.use('/api/orderItems', orderItemRouter)
app.use('/api/addresses',addressRouter)
app.use('/api/wishlists',wishlistRouter)
app.use('/api/users',userRouter)
app.use('/api/carts',cartRouter)
app.use('/api', loginRegisterRouter)
app.use("/api/cartHistory", orderHistoryRouter)

//port
const PORT = 3000
app.listen(PORT,()=>{
    console.log('Server is running on port:', PORT)
})

module.exports = app;