const path = require('path');
const fs = require('fs');
const Products = require('./model');
const { Op } = require("sequelize")


const view = async (req, res) => {
    try {
        const result = await Products.findAll({
            where : {
                id : req.params.id
            }
        });
          res.send(result);
    }catch(e){
        res.send(e)
    }
}

const index = async (req, res) => {
    const {search} = req.query
    let exe = {}
    if (search){
        exe = { where :{
            name : {[Op.like] : `%${search}%`}
    }}}
    try {
        const result = await Products.findAll(
        exe);
          res.send(result);
    }catch(e){
        res.send(e)
    }
}

const store =  async (req, res) => {
    const {users_id, name, price, stock, status} = req.body;
    const image = req.file;
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target)
    }
    try {
        await Products.sync();
        const result = await Products.create({users_id, name, price, stock, status, image_url :  `http:/localhost:3000/public/${image.originalname}`});
        res.send(result)
    }catch(e){
        res.send(e)
    }
}

const update = async (req, res) => {
    const {users_id, name, price, stock, status, image_url} = req.body;
    const image = req.file;
    let body = {}
    if(image){
        const target = path.join(__dirname, '../../uploads', image.originalname);
        fs.renameSync(image.path, target)
        body = {users_id, name, price, stock, status}
    }else {
        body =  {users_id, name, price, stock, status, image_url}
    }
    try {
        const result = await Products.update( body,{
            where : {
                id : req.params.id
            }
        });
        res.send(result)
    }catch(e){
        res.send(e)
    }
}

const destroy = async (req, res) => {
    try {
        await Products.destroy({
            where: {
              id: req.params.id
            }
          });
          res.send(result)
    }catch(e){
        res.send(e)
    }}


module.exports = {
    view,
    index,
    store,
    update,
    destroy
}