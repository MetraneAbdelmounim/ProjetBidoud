mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const messageSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    firstname :{type: String,required:true},
    lastname : {type: String,required:true},
    email : {type: String,required:true},
    phone : {type:String,required:false},
    date : {type : Date, required:true,default:Date.now},
    message : {type:String,required:true},
    stateVu :{type:Boolean ,default: false,require:true}

});
messageSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Message', messageSchema)
