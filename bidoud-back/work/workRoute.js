let workController = require('./workController');
let express = require('express');
let router = express.Router();
const multer = require('multer');
const path = require('path');
const auth =require('../middlewares/auth')
const storage = multer.diskStorage({
    destination : function (req,file,cb) {
        if(file.mimetype==='image/jpeg' ||file.mimetype==='image/jpg' || file.mimetype ==='image/png' || file.mimetype==='image/gif' ){
            cb(null,path.join('uploads/works'));
        }


    },
    filename : function (req,file,cb) {
        cb(null,path.join('BidoudAMINE'+Date.now().toString()+file.originalname.toString().replace(/\s/g, '')));
    }
})



const fileFilter = (req,file,cb)=>{
    //reject a file
    var ext = path.extname(file.originalname);
    if(file.mimetype==='image/jpeg' || file.mimetype ==='image/png' || ext ==='.pdf' ){
        cb(null,true);
    }
    else {
        cb(null,false);
    }
};
const upload =multer({storage:storage, limits: {
        fileSize : 1200*1024*5
    },
    fileFilter : fileFilter
});

router.get('/works',workController.getAllWorks);
router.get('/works/:idWork',workController.getWorkById);
router.post('/works',auth,upload.array('works'),workController.addWork);
router.delete('/works/:idWork',auth,workController.deleteWork);
module.exports = router;
