const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const Product = require('./model');
const fs = require('fs');
const path = require('path');



router.post('/products', upload.single('image'), (req, res) => {
    const {name, price, stock, status} = req.body;
    const image = req.file;
    if (image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        Product.create({name, price, stock, status, image_url :  `http:/localhost:3000/public/${image.originalname}`})
    .then(result => res.send(result))
    .catch(error => res.send(error))
}
})


router.get('/products', (req, res) => {
    Product.find()
    .then(result => res.send(result))
    .catch(error => res.send(error))
})

router.get('/products/:id', (req, res) => {
    const {id} = req.params
    Product.findById(id)
    .then(result => res.send(result))
    .catch(error => res.send(error))
})

router.put('/products/:id', upload.single('image'), (req, res) => {
    const {id} = req.params
    const {name, price, stock, status} = req.body;
    const image = req.file;
    if (image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target);
        Product.findOneAndUpdate({_id : id},
            {name, price, stock, status, image_url :  `http:/localhost:3000/public/${image.originalname}`},
            { new : true })
            .then(result => res.send(result))
            .catch(error => res.send(error))
    }else {
        Product.findOneAndUpdate({_id : id},
            {name, price, stock, status},
            { new : true })
            .then(result => res.send(result))
            .catch(error => res.send(error))
    }
}
)

router.delete("/products/:id", (req, res) => {
    const {id} = req.params
    Product.findByIdAndRemove(id)
    .then(result => res.send(result))
            .catch(error => res.send(error))
})





module.exports = router;