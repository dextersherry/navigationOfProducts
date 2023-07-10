const { default: mongoose } = require('mongoose');
// const mongoose = require('mongoose');
const Product = require('./models/product')

mongoose.connect('mongodb://127.0.0.1:27017/villageFarm')
    .then(() => {
        console.log('MONGO CONNECTION OPEN!')
    })
    .catch(err => {
        console.log("MONGO CONNECTION LOST!")
        console.log(err)

    })

// const p = new Product({
//     name: 'Grapes',
//     price: 40,
//     category: 'fruit'
// })
// p.save().then(p => {
//         console.log(p)
//     })
//     .catch(err => {
//       console.log(err)
//     })

const seedProducts = [{
        name: 'bananna',
        price: 20,
        category: 'fruit'
    },
    {
        name: 'apple',
        price: 30,
        category: 'fruit'
    },
    {
        name: 'tomato',
        price: 15,
        category: 'vegetable'
    },
    {
        name: 'milk',
        price: 12,
        category: 'dairy'
    },
    {
        name: 'eggs',
        price: 25,
        category: 'dairy'
    },
]
Product.insertMany(seedProducts)
    .then(res => {
        console.log(res)
    })
    .catch(err => {
        console.log(err)
    })