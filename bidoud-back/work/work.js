
mongoose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');

const workSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
       title :{type: String,required:true},
    categories : {type: String,required:true},
    description : {type: String,required:true},
    content : {type:[String],required:true},


});
workSchema.plugin(uniqueValidator);
module.exports = mongoose.model('Work', workSchema)
