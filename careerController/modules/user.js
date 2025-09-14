const mongoose = require(`mongoose`);

const userSchema = new mongoose.Schema({
    FullName: { type: String, required: true},
    Email: { type: String, required: true},
    PhoneNo: { type: Number, required: true},
    Address: { type: String, required: true},
    Pincode: { type: Number, required: true},
});

module.exports = mongoose.model("User",userSchema);