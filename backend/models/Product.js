const mongoose = require("mongoose")

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true, "Please enter Title"],
        
    },
    desc:{
        type:String,
        required:[true, "Please ente description"],
        
    },
    price:{
        type:Number,
        required:[true, "Please enter price"],
 
    },
    qty:{
        type:Number,
    },
    img:
    {
        public_id:String,
        url:String
    },
},{timestamps: true})


module.exports = mongoose.model("Product", productSchema)