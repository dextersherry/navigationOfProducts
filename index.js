const express = require('express');
const app = express();
const port = 3000;
const path = require('path')
const methodOverride = require('method-override')


const { default: mongoose } = require('mongoose');
// const mongoose = require('mongoose');

const Product = require('./models/product');

mongoose.connect('mongodb://127.0.0.1:27017/villageFarm')
    .then(() => {
        console.log('MONGO CONNECTION OPEN!')
    })
    .catch(err => {
        console.log(err)
        console.log("MONGO CONNECTION LOST!")

    })

// app.set('/views', express.static(path.join(__dirname, 'views')));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.urlencoded({ extended: true }))
app.use(methodOverride('_method'))

app.get('/products', async(req, res) => {
    const { category } = req.query;
    if (category) {
        const products = await Product.find({ category: category })
        res.render('products/index', { products, category })
    } else {
        const products = await Product.find({})
        res.render('products/index', { products, category: 'All' })

    }
    const products = await Product.find({})
        // console.log(products)
    res.render('products/index', { products })
        // res.s    end('All PRODUCTS WILL BE HERE! check!')
})

app.get('/products/new', (req, res) => {
    res.render('products/new')
})

app.post('/products', async(req, res) => {
    // console.log(req.body)
    const newProduct = new Product(req.body)
    await newProduct.save();
    console.log(newProduct)
    res.redirect(`/products/${newProduct._id}`)
})



app.get('/products/:id', async(req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
        // res.send('Details Page')
    res.render('products/show', { product })
})

app.get('/products/:id/edit', async(req, res) => {
    const { id } = req.params;
    const product = await Product.findById(id)
    res.render('products/edit', { product })
})

app.put('/products/:id', async(req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndUpdate(id, req.body, { runValidators: true, new: true });
    res.redirect()
})

app.delete('/products/:id', async(req, res) => {
    const { id } = req.params;
    const product = await Product.findByIdAndDelete(id);
    res.redirect('/products')
})


app.listen(port, () => {
    console.log("APP IS LISTENING ON PORT 3000!")
})