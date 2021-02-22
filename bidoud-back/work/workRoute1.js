let workController1 = require('./workController1');
let express = require('express');
let router = express.Router();
const multer = require('multer');
const config =require('../config/config')
const auth =require('../middlewares/auth')
const cloudinary = require('cloudinary').v2;
const {CloudinaryStorage} = require('multer-storage-cloudinary');

cloudinary.config({
    cloud_name: config.cloudinary.name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret
});

const storage = new CloudinaryStorage({
    cloudinary,
    allowedFormats: ['jpg', 'png','jpeg','gif'],
    transformation: [{  crop: 'limit' }],
    params:async (req, file) => {

        return {

            public_id: file.fieldname + '-' + Date.now()

        }},

});
const upload = multer({storage:storage });


router.get('/works',workController1.getAllWorks);
router.get('/works/:idWork',workController1.getWorkById);
router.post('/works',auth,upload.array('works'), workController1.addWork);
router.delete('/works/:idWork',auth,workController1.deleteWork);
module.exports = router;
