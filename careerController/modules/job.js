const mongoose = require(`mongoose`);

const JobSchema = new mongoose.Schema({
    JobsName: { type: String, required: true},
    JobsType: { type: String, required: true},
    JobDesc: { type: String, required: true},
    Requirements: { type: String, required: true},
    Location: { type: String, required: true},
    Salary: { type: Number, required: true},
});

module.exports = mongoose.model("Job",JobSchema);
