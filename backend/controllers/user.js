const User = require("../models/User")


exports.register = async(req,res) => {
    try {
        const {name,email,password} = req.body
        
        let user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                success:false,
                message:"User already exists"
            })
        }
        user = await User.create({
            name,email,password})

            const token  = await user.generateToken()
            const options = {
                expires: new Date(Date.now() + 90*24*60*60*1000),
                httpOnly:true
            }
        
        res.status(201).cookie("token", token, options).json({
            
            success:true,
            user,
            token,
            message:"Registerd Successfully"
        })


    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.login = async (req,res) => {
    try {
        const {email, password} = req.body
        console.log(email,password);

        const user= await User.findOne({email}).populate("cart")

        if (!user) {
            return res.status(400).json({
                success:false,
                message:"User does not exists"
            })
        }
        const isMatch = await user.matchPassword(password)

        if (!isMatch) {
            return res.status(400).json({
                success:false,
                message:"Incorrect password"
            })
        }
        const token = await user.generateToken()
        const options = {
            expires: new Date(Date.now() + 90*24*60*60*1000),
            httpOnly:true
        }
        res.status(201).cookie("token",token,options).json({
            success:true,
            user,
            token,
            message:"Login Successfully"
        })
    } catch (error) {
       res.status(500).json({
        success:false,
        message:error.message
       }) 
    }
}

exports.logout = async(req,res) => {
    try {
        res
      .status(200)
      .cookie("token", null, { expires: new Date(Date.now()), httpOnly: true })
      .json({
        success: true,
        message: "Logged out",
      });
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
           }) 
    }
}

exports.myProfile = async(req,res) => {
    try {
        const user = await User.findById(req.user._id).populate("orders cart")
        console.log(user);
        res.status(201).json({
            success:true,
            user
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
           }) 
    }
}

exports.allUsers = async(req,res) => {
    try {
        
        const users = await User.find({})

        res.status(200).json({
            success:true,
            users
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
           }) 
    }
}

exports.userProfile = async(req,res) => {
    try {
        
        const user = await User.findById(req.params.id).populate("cart")

        if(!user){
            return res.status(404).json({
                success:false,
                message:"User not found"
            })
        }

        res.status(200).json({
            success:true,
            user
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
           }) 
    }
}

exports.myCarts = async(req,res) => {
    try {
        const user = await User.findById(req.params._id)
        const cart = user?.cart || []
        res.status(200).json({
            success:true,
             cart
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:error.message
           }) 
    }
}

exports.myOrders = async(req,res) => {
    try {
        const user = await User.findById(req.user._id).populate("")

            const orders = user?.order || []

        res.status(200).json({
            success:true,
            orders
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
           }) 
    }
}

// exports.addToCart = async(req,res) => {
//     try {
//         const {productId} = req.body
//         const {_id} = req.user

//         let cart = await  Cart ({
//             userId:_id,
//             productId,

//         }).save
//         res.status(200).json({
//             success:true,
//             cart
//         })

//     } catch (error) {
        
//     }
// }