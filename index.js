let express = require("express");
let app = express();
let path = require("path");

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs")
// middle ware
// "middleware" - code that runs before the final route call back.
// They are in the middle of the beginning of the route and the 
// callback function.
// Middleware is software that provides common services and capabilities to applications outside of what’s offered by the operating system. Data management, application services, messaging, authentication, and API management are all commonly handled by middleware.
app.use(express.urlencoded({extended:true}));

// method override for request other tan get & post
let methodOverride = require("method-override");
app.use(methodOverride("_method"));

// // instead of this
// const url = "mongodb://localhost:27017";

// // Just Replace
// const url = "mongodb://0.0.0.0:27017";

let product=require("./models/product");
let mongoose = require("mongoose");
mongoose.connect("mongodb://0.0.0.0:27017/farm", {useNewUrlParser:true, useUnifiedTopology: true } )
.then(()=>{
    console.log("Mongo connected ")
})
.catch((err)=>{
    console.log("Error in Mongo ",err);
})

app.listen(3000,()=>{
    console.log("App is listening")
})
app.get("/dogs",(req,res)=>{
    console.log("Dogs");
    res.send("DOGS")
})

app.get("/products",async(req,res) =>{
    // res.send("Heeee");
    // let Allproduct = await product.find({})
    // res.render("products/index", {Allproduct});
    console.log("Showing All Products");
    // category filtering
    let {category}=req.query;
    if(category){
        let Allproduct = await product.find({category});
        res.render("products/index", {Allproduct, category});
    }
    else{
        let Allproduct = await product.find({});
        res.render("products/index", {Allproduct, category:"All"});
    }

})

app.get("/products/:id", async (req,res)=>{
    let {id}=req.params;
    let foundedProduct = await product.findById(id);
    res.render("products/show", {foundedProduct});
    // res.send("hey");
    console.log("Found product");
})

// creating a new product is done in 2 steps
// 1. app.get - creating form
// 2. app.post - creating product, we use method override

app.get("/products/new/add",(req,res)=>{
    res.render("products/new",{categories});
    // res.send("HIII")
    console.log("New Product");
})

// in amy post, delete, update we genrally do redirect bcoz we dont want to make new duplicate products by hitting refresh
app.post("/products", async (req,res)=>{
    let newProduct = new product(req.body);
    // bcoz it takes more time to save
    await newProduct.save();
    console.log(newProduct);
    res.redirect(`/products/${newProduct._id}`)
    // dont put space here
    
})

// updating
app.get("/products/:id/edit",async (req,res)=>{
    // we didnt store id in {} so error occured here
    let id = req.params;
    let editproduct = await product.findById(req.params.id);
    res.render("products/edit",{editproduct,categories});
})

app.put("/products/:id", async(req,res)=>{
    let {id} = req.params;
    // for validations of new input entered by the user & new:true for seeing update without refresing 
    let updatedproduct = await product.findByIdAndUpdate(id,req.body, {runValidators:true, new:true});
    res.redirect(`/products/${updatedproduct._id}`)
    // console.log(req.body)
    // res.send("PUT!!!");
})

let categories =["fruit","vegetable","dairy"]; // for selected preferences in editing product

// deleting
app.delete("/products/:id",async (req,res)=>{
    let {id} = req.params;
    let deletedProduct = await product.findByIdAndDelete(id);
    // res.send("deleted")
    res.redirect("/products");
})