const router = require('express').Router();
const multer = require('multer');
const upload = multer({dest: 'uploads'});
const productController = require('./controller');

router.get('/products', productController.index)
router.get('/products/:id', productController.view)
router.post('/products', upload.single('image'), productController.store)

module.exports = router;