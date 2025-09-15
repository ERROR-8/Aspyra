const Application = require(`../modules/application`);      //Application control API

exports.createApplication = async(req,res) => {
    try{
        const application = await Application.create(req.body);
        res.json(application);
    }
    catch(err){
        res.json(err);
    }
};

exports.getApplication = async(req,res) =>{
    try{
        const application = await Application.find();
        res.json(application);
    }
    catch(err){
        res.json(err);
    }
};

exports.updateApplication = async(req,res) => {
    try{
        const application = await Application.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(application);
    }
    catch(err){
        res.json(err);
    }
};

exports.deleteApplication = async(req,res) => {
    try{
        await Application.findByIdAndDelete(req.params.id);
        res.json({message:"Application deleted successfully"});
    }
    catch(err){
        res.json(err);
    }
};