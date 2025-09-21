const Job = require(`../modules/job`);      //Job control API

exports.createJob = async(req,res) => {
    try {
        const job = await Job.create(req.body);
        res.json(job);
    } catch(err) {
        res.json(err);
    }
};

exports.getJob = async(req,res) => {
    try {
        const job = await Job.find();
        res.json(job);
    } catch(err) {
        res.json(err);
    }
};

exports.updateJob= async(req,res) => {
    try {
        const job = await Job.findByIdAndUpdate(req.params.id,req.body,{new:true});
        res.json(job);
    } catch(err) {
        res.json(err);
    }
};

exports.deletejob = async(req,res) => {
    try {
        await Job.findByIdAndDelete(req.params.id);
        res.json({message: "Job Deleted Succesfully"});
    } catch(err) {
        res.json(err);
    }
};