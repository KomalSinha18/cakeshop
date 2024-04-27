const Product = require("../models/Product")
const User = require("../models/User")
const cloudinary = require("cloudinary");

exports.addProduct = async(req,res) => {
    try {
        const {title,desc,price,image} = req.body
        const myCloud = await cloudinary.v2.uploader.upload(image, {
            folder: "cakes",
            timeout:120000
          },);
        let product = await Product.create({
            title,
            desc,
            price,
            img:{
                public_id: myCloud.public_id,
                url: myCloud.secure_url,

            }
        })
       
        

        res.status(201).json({
            success:true,
            product,
            message:"Product added successfully"
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.allProducts = async(req,res) => {
 try {
    
    const product = await Product.find({})

    res.status(201).json({
        success:true,
        product,
       
    })


 } catch (error) {
    res.status(500).json({
        success:false,
        message:error.message })   
}
}
exports.myProduct = async(req,res) => {
    try {
        
    const product = await Product.findById(req.params.id)
        console.log(req.params.id);
        res.status(200).json({
            success:true,
            product
        })

    } catch (error) {
        
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}
exports.deleteMyProduct = async(req,res) => {
    try {
        
        const product = await Product.findById(req.params.id)

        if (!product) {
            return res.status(404).json({
                success:false,
                message:"Product not found"
            })
        }

        await product.deleteOne()

        // const user = await User.findById(req.product._id)

        // const index = product. 

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.addToCart = async(req,res) => {
    try {
        const product = await Product.findById(req.params.id)

        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found",
              });
        }

        const user = await User.findById(req.user._id)

        user.cart.unshift(product?._id)

        await user.save()

        const updatedUser = await User.findById(req.user._id).populate("orders cart")
        
        res.status(201).json({
            success: true,
            message: "Added to Cart",
            user:updatedUser
          });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.removeFromCart = async(req,res) => {
    try {
        const product = await Product.findById(req.params.id)
        
        if(!product){
            return res.status(404).json({
                success: false,
                message: "Product not found",
              });
        }

        const user = await User.findById(req.user._id)

        if(user?.cart?.includes(product?._id)){
            user.cart.shift(product?._id)
        }

        await user.save()

        const updatedUser = await User.findById(req.user._id).populate("orders cart")
        
        res.status(201).json({
            success: true,
            message: "Removed from Cart",
            user:updatedUser
          });
        
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}