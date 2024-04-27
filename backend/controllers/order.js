const Order = require("../models/Order")
const User = require("../models/User")
const Product = require("../models/Product")

exports.orderPlaced = async(req,res) => {
    try {

        const user = await User.findById(req.user._id)
        const newOrder = {
           totalPrice:req.body.totalPrice,
            address:req.body.address,
            products:user?.cart,
            createdBy:req.user._id 
        }

        const order = await Order.create(newOrder)

   
        user.cart = []
        user.orders.unshift(order._id)
        
        await user.save()

        const updatedUser = await User.findById(req.user._id).populate("orders cart")

        res.status(201).json({
            success:true,
            message:"order placed",
            user:updatedUser
        })

    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.allorders = async(req,res) => {
    try {
       
       const order = await Order.find({}).populate("products createdBy")
   
       res.status(201).json({
           success:true,
           order,
          
       })
   
   
    } catch (error) {
       res.status(500).json({
           success:false,
           message:error.message })   
   }
   }

   exports.myOrder = async(req,res) => {
    try {

    const orders = await Order.find({createdBy:req.user._id}).populate("products") || []
    
      res.status(200).json({
        success: true,
        orders,
      })

    } catch (error) {
        // console.log(error);
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

exports.deleteOrder = async(req,res) =>{
    try {
        const order = await Order.findById(req.params.id)

        if (!order) {
            return res.status(404).json({
                success:false,
                message:"Order not found"
            })
        }


        // if (order.owner.toString() !== req.user._id.toString()) {
        //     return res.status(401).json({
        //         success:false,
        //         message:"Unauthorized"
        //     })
        // }

        await order.deleteOne()

        const user = await User.findById(req.user._id)

        const index = user.orders.indexOf(req.params.id)

        user.orders.splice(index,1)
        await user.save()

        res.status(200).json({
            success:true,
            message:"order deleted"
        })
    } catch (error) {
        res.status(500).json({
            success:false,
            message:error.message
        })
    }
} 