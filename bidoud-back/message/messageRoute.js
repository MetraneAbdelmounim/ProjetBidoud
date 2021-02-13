let messageController = require('./messageController');
let express = require('express');
let router = express.Router();
const auth=require('../middlewares/auth')

router.get('/messages',auth,messageController.getAllMessages);
router.get('/messages/:idMessage',messageController.getMessageById);
router.post('/messages',messageController.addMessage);
router.delete('/messages/:idMessage',auth,messageController.deleteMessage);
router.put('/messages/:idMessage/state',auth,messageController.updateState);
module.exports = router;
