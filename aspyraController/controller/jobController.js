const Job = require(`../modules/job`);      //Job control API

exports.createJob = async(req,res) => {
    try {
        console.log('Create job payload:', req.body);
        const job = await Job.create(req.body);
        return res.status(201).json(job);
    } catch(err) {
        console.error('Create job error:', err);
        const message = err && err.message ? err.message : 'Failed to create job';
        return res.status(400).json({ error: message });
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