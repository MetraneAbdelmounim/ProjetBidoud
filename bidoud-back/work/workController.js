const  Work=require('./work')
const fs = require('fs')
module.exports = {
    addWork: function (req,res){
        const id = new mongoose.Types.ObjectId();
        const url = req.protocol + "://" + req.get("host");
        let contents=[];
        for(let work of req.files){
            contents.push(url + "/uploads/works/" +work.filename);
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
                    const filename = c.split('/uploads/works/')[1];
                    fs.unlinkSync(`uploads/works/${filename}`, () => {
                        console.log("file deleted")
                    });
                })
                Work.deleteOne({ _id: req.params.idWork })
                    .then(() => res.status(200).send({ message: 'Work deleted succesfully !'}))
                    .catch(error => res.status(400).send( error ));
            })
            .catch(error => res.status(500).send(error ));
    },
    updateWork:function (req,res) {

        Work.updateOne({ _id: req.params.idWork},req.body).then(result => {
            if(result.nModified>=0){
                res.status(200).json({ message: "Work Updated successfully !" });
            }

            else {
                res.status(401).json({message : "Not authorized !"})
            }

        });

    },
    getWorkTags:function (req,res) {

        Work.find({categories : {$regex: new RegExp('.*' + req.params.categorie + '.*')}}).then(results=>{

            if(results) res.status(200).json(results);
        }).catch(err=>{
            if(err) res.status(500).send('error : '+err);
        })
    }
}

