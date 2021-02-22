const  Work=require('./work')
const fs = require('fs')
const cloudinary = require('cloudinary').v2;
const config =require('../config/config')
cloudinary.config({
    cloud_name: config.cloudinary.name,
    api_key: config.cloudinary.api_key,
    api_secret: config.cloudinary.api_secret
});
module.exports = {
    addWork:function (req,res){
        const id = new mongoose.Types.ObjectId();
        const url = req.protocol + "://" + req.get("host");
        let contents=[];
        for(let work of req.files){
            contents.push(work.path);
        }
        let newWork = new Work({
            _id:id,
            title: req.body.title,
            description:req.body.description,
            categories : req.body.categories,
            content:contents
        })
        newWork.save(newWork).then(createdWork=> {
            res.status(201).json({
                message: "Work added successfully",
                createdWork: createdWork
            });
        });
    },
    getAllWorks:function(req,res) {
        Work.find().then(results=>{

            if(results) res.status(200).json(results);
        }).catch(err=>{
            if(err) res.status(500).send('error : '+err);
        })
    },
    getWorkById : function (req,res) {
        Work.findOne({_id : req.params.idWork},(err,result)=>{

            if(err) res.status(500).send('error : '+err);
            else if(!result) res.status(404).send(`no work with id ${req.params.idWork}`);
            else res.json({
                    message : 'Work fetched successfuly',
                    work : result
                });
        })
    },
    deleteWork: function (req,res) {
        Work.findOne({ _id: req.params.idWork })
            .then(work => {
                work.content.forEach(c=>{
                    const filename = c.split('/image/upload/')[1].split('/')[1].split('.')[0];
                    cloudinary.uploader.destroy(filename, (error,result)=>{

                        if (error){
                            res.status(400).send( error )
                        }
                    });
                })
                Work.deleteOne({ _id: req.params.idWork })
                    .then(() => res.status(200).send({ message: 'Work deleted succesfully !'}))
                    .catch(error => res.status(400).send( error ));
            })
            .catch(error => res.status(500).send(error ));
    }
}

