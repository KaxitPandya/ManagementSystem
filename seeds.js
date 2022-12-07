//  THIS IS A TEMPORARY DATABASE

let product = require("./models/product");

let mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/farm", { useNewUrlParser: true })
    .then(() => {
        console.log("Mongo connected ")
    })
    .catch((err) => {
        console.log("Error in Mongo ", err);
    })


// by doing this we enter values in database farm
// let p = new product({
//     name: "Berry",
//     price: 5,
//     category: "fruits",
// })

// p.save()
//     .then((p) => {
//         console.log("Saved");
//     })
//     .catch((err) => {
//         console.log("Not Saved", err);
//     })


// we need tyo insert many such products so we pass an array
const seedProducts = [
    {
        name: 'Fairy Eggplant',
        price: 1.00,
        category: 'vegetable'
    },
    {
        name: 'Organic Goddess Melon',
        price: 4.99,
        category: 'fruit'
    },
    {
        name: 'Organic Mini Seedless Watermelon',
        price: 3.99,
        category: 'fruit'
    },
    {
        name: 'Organic Celery',
        price: 1.50,
        category: 'vegetable'
    },
    {
        name: 'Chocolate Whole Milk',
        price: 2.69,
        category: 'dairy'
    },
]

product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(e => {
        console.log(e)
    })