const  Work=require('./work')
const fs = require('fs')
const sharp = require('sharp')
module.exports = {
    addWork: async function (req,res){

        const id = new mongoose.Types.ObjectId();
        const url = req.protocol + "://" + req.get("host");
        let contents=[];


        for(let work of req.files){
            const { filename: image } = work;
            await sharp(work.path)
                .jpeg({quality: 50})
                .toFile(`uploads/works/${work.filename}`);
            try{
                fs.unlinkSync(`upload/${work.filename}`)
            }catch (e) {
                console.log("error")
            }
            contents.push(url + "/uploads/works/" +work.filename);
        }
        let newWork = new Work({
            _id:id,
            title: req.body.title,
            description:req.body.description,
            categories : req.body.categories,
            content:contents,

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
                let forEach = work.content.forEach(c=>{
                    const filename = c.split('/uploads/works/')[1];
                    try{
                        fs.unlinkSync(`uploads/works/${filename}`)
                    }catch (e) {
                        console.log("error")
                    }


                });
                Work.deleteOne({ _id: req.params.idWork })
                    .then(() => res.status(200).send({ message: 'Work deleted succesfully !'}))
                    .catch(error => res.status(400).send( error ));
            })
            .catch(error => res.status(500).send(error ));
    },
    updateWork:function (req,res) {

        Work.findOne({ _id: req.params.idWork })
            .then(async (work) =>{
                let upWork;
               if(req.files.length>0 ){

                   work.content.forEach(c=>{
                       const filename = c.split('/uploads/works/')[1];
                       try{
                           fs.unlinkSync(`uploads/works/${filename}`)
                       }catch (e) {
                           console.log("error")
                       }
                    })
                   const url = req.protocol + "://" + req.get("host");
                   let contents=[];
                   for(let work of req.files){
                       const { filename: image } = work;
                       await sharp(work.path)
                           .jpeg({quality: 50})
                           .toFile(`uploads/works/${work.filename}`);
                       try{
                           fs.unlinkSync(`upload/${work.filename}`)
                       }catch (e) {
                           console.log("error")
                       }
                       contents.push(url + "/uploads/works/" +work.filename);
                   }
                    upWork = {
                       title: req.body.title,
                       description:req.body.description,
                       categories : req.body.categories,
                       content:contents,

                   }
               }
               else{

                   upWork = {
                       title: req.body.title,
                       description:req.body.description,
                       categories : req.body.categories,
                   }

               }
                Work.updateOne({ _id: req.params.idWork},upWork).then(result => {
                    if(result.nModified>=0){
                        res.status(200).json({ message: "Work Updated successfully !" });
                    }

                    else {
                        res.status(401).json({message : "Not authorized !"})
                    }

                });
            })
            .catch(error =>{

                res.status(400).send( error )
            } );


    },
    getWorkTags:function (req,res) {

        Work.find({categories : {$regex: new RegExp('.*' + req.params.categorie + '.*')}}).then(results=>{

            if(results) res.status(200).json(results);
        }).catch(err=>{
            if(err) res.status(500).send('error : '+err);
        })
    }
}

