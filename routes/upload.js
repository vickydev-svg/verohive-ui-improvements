const route = require('express').Router()
const uploadController = require('../controllers/upload');

route.post('', uploadController.uploadImage)


exports = module.exports = route