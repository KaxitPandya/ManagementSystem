const { url } = require("inspector");
let mongoose = require("mongoose");

// creating schema
let productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    price:{
        type:Number,
        required:true,
        min:0,
    },
    category:{
        type:String,
        enum:["fruit","vegetable","dairy"],
        lowercase:true,
    },
    // image:{
    //     type:url,
    //     required:true,
    // }
})

// using the schema to create model 
let product = mongoose.model("product",productSchema);

module.exports = product;