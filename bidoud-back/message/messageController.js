const Message=require('./message')

module.exports = {
    addMessage: function (req,res){
        const id = new mongoose.Types.ObjectId()

        let newMessage = new Message({
            _id:id,
            ...req.body
        })
        newMessage.save(newMessage).then(createdMessage=> {
            res.status(201).json({
                message: "Message send successfully",
                createdMessage: createdMessage
            });
        });
    },
    getAllMessages:function(req,res) {
        Message.find().sort({date:-1}).then(results=>{

            if(results) res.status(200).json(results);
        }).catch(err=>{
            if(err) res.status(500).send('error : '+err);
        })
    },
    getMessageById : function (req,res) {
        Message.findOne({_id : req.params.idMessage},(err,result)=>{
            if(err) res.status(500).send('error : '+err);
            else if(!result) res.status(404).send(`no message with id ${req.params.idMessage}`);
            else res.json({
                    message : 'Message fetched successfully',
                    result : result
                });
        })
    },
    deleteMessage: function (req,res) {
        Message.deleteOne({ _id: req.params.idMessage })
            .then(() => res.status(200).send({ message: 'Comment deleted succesfully !'}))
            .catch(error => res.status(400).send( {error : error} ));


    },
    updateState:function (req,res) {
        Message.updateOne({ _id: req.params.idMessage},{$set :{stateVu: true }}).then(result => {
            if(result.nModified>0){
                res.status(200).json({ message: "Update successful!" });
            }

            else {
                res.status(401).json({message : "Not authorized!"})
            }

        });
    },
}
