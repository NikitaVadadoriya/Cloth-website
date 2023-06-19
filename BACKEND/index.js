const express =require('express')
const app =express()
const cors = require('cors');

var corOptions={
    origin:"*"
}
app.use(cors());

app.use(cors(corOptions));
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use('/Images',express.static('./Images'))

//USER ROUTES
const userRouter = require('./Routes/userRoute')
app.use('/api/user',userRouter);

//CATEGORY ROUTES
const categoryRoute = require('./Routes/categoryRoute')
app.use('/api/category',categoryRoute);

//SUBCATEGORY ROUTES

const subcategoryRoute = require('./Routes/subcategoryRoute')
app.use('/api/subcategory',subcategoryRoute);

//MEDIA ROUTES

const mediaRouter = require('./Routes/mediaRoute')
app.use('/api/media',mediaRouter);


//Stoke ROUTES

const stokeRouter = require('./Routes/stokeRoute')
app.use('/api/stoke',stokeRouter);


//Product ROUTES

const productRouter = require('./Routes/productRoute')
app.use('/api/product',productRouter);


//Cart ROUTES

const cartRouter = require('./Routes/cartRoute')
app.use('/api/cart',cartRouter);

//Variant ROUTES

const variantRouter = require('./Routes/variantRoute')
app.use('/api/variant',variantRouter);

//ADDRESS ROUTE

const addressRouter = require('./Routes/addressRouter')
app.use('/api/add',addressRouter);

//ORDER ROUTE

const orderRoute = require('./Routes/orderRouter')
app.use('/api/order',orderRoute);

app.listen(process.env.PORT,()=>{
    console.log(`App is running port 4000`);
})