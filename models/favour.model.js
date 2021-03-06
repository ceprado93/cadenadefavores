const mongoose = require("mongoose");
const { stringify } = require("querystring");
const Schema = mongoose.Schema;

const favourSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
    },
    description: {
        type: String,
        required: true,

    },
    location: {
        type: {
            type: String
        },
        coordinates: [Number]
    },
    status: {
        type: String,
        default: 'active',
        enum: ['active', 'required', 'done'],
    },
    give:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    receive:
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }

}, {
    timestamps: true
});

const Favour = mongoose.model("Favour", favourSchema);
module.exports = Favour;