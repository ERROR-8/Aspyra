const mongoose = require(`mongoose`);   //User Schema

const userSchema = new mongoose.Schema({
    FullName: { type: String, required: true },
    Email: { type: String, required: true, unique: true },
    PhoneNo: { type: Number },
    Address: { type: String },
    Pincode: { type: Number },
    Password: { type: String, required: true }
});

module.exports = mongoose.model("User",userSchema);