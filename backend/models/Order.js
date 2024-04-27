const mongoose = require("mongoose")

const orderSchema = new mongoose.Schema({
    totalPrice:{
        type:Number
    },
    address:{
        type:String,
        required:[true, "Please enter your address"],
    },
    paymentMode:{
        type:String,
        default:"COD"
    },
    createdAt:{
        type:Date,
        default:Date.now
    },
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product"
        }
    ],
    owner:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }
},
{timestamps: true})


module.exports = mongoose.model("Order", orderSchema)