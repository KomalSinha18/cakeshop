const mongoose = require("mongoose")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true, "Please enter your name"],
        lowercase: true,
    },
    email:{
        type:String,
        required:[true, "Please enter your email"],
        unique:[true, "Email already exists"],
        lowercase: true
    },
    password:{
        type:String,
        required:[true, "Please enter your password"],
        minLength:[6, "Password must be of atleast 6 characters"]
    },
    orders:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Order"
        }
    ],
    cart:[
    {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Product"
    }
    ],
},{timestamps: true})

userSchema.pre("save", async function(next){
    if (this.isModified('password')) {
        this.password = await bcrypt.hash(this.password,10)
    }
    next()
})

userSchema.methods.matchPassword = async function(password){
    console.log(password,this.password,this.email,this.name);
    return await bcrypt.compare(password,this.password)
}

userSchema.methods.generateToken = function() {
    return jwt.sign({_id:this._id},process.env.JWT_SECRET)
}

module.exports = mongoose.model("User", userSchema)