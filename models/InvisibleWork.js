const mongoose = require("mongoose")

const workSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    category:{
        type: String,
        required: true
    },
    context:{
        type:String,
        required: true
    },
    beneficiary:{
        type: String
    },
    outcome:{
        type:String
    },
    effort:{
        type: String
    } 
}, { timestamps:true })
    module.exports = mongoose.model("Work",workSchema)
