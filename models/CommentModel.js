const mongoose = require("mongoose");
const mongoosePaginate = require('mongoose-paginate-v2');
const mongooseArregatePaginate = require('mongoose-aggregate-paginate-v2')

const abstractModel = require("./AbstractModel");

const commentSchema = new mongoose.Schema({
    ...abstractModel,
    order: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'exportOrder',
        required: true,
        unique: true
    },
    star: {
        type: Number,
        enum: [0.5,1,1.5,2,2.5,3,3.5,4,4.5,5],
        default: 3
    },
    content: {
        type: String,
        default: ''
    },
});
commentSchema.plugin(mongoosePaginate)
commentSchema.plugin(mongooseArregatePaginate)

const comment = mongoose.model("comment", commentSchema);

module.exports = comment;