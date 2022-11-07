const { Schema, model } = require("mongoose");

const contact = new Schema({
    name: String,
    text: String,
    phone: String,
    callme:String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    status: {
        type: Number,
        default: 0,
    },
    email: String,
});

module.exports = model("Contact", contact);
