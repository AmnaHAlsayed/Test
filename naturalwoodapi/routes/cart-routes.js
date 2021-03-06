const Cart = require("../models/Product");
const { verifyToken, verifyTokenandAuth, verifyTokenandAdmin } = require("./verifyToken");


 const router = require("express").Router();

router.post("/" , verifyToken, async(req,res)=>{
    const newCart = new Cart(req.body);
    try{
const savedCart = await newCart.save();
res.status(200).json(savedCart);
    }
    catch(err){
        res.status(500).json(err);
    }
})


router.put("/:id" , verifyTokenandAuth ,async (req,res)=>{
   

try{
    const updateCart = await Cart.findByIdAndUpdate(req.params.id , {
        $set : req.body
    } , {new :true});
    res.status(200).json(updateCart);
}catch (err){
    res.status(500).json(err);
}
});
// //Delete User
router.delete("/:id" , verifyTokenandAuth , async(req,res)=>{
    try{
await Cart.findByIdAndDelete(req.params.id);
res.status(200).json("User Is Delted")
    }catch(err){
       res.status(500).json(err); 
    }
});
// //Get UserCart
router.get("/find/userId" , verifyTokenandAuth , async(req,res)=>{
    try{
const cart= await Cart.findById({userId : req.params.userId});

res.status(200).json(cart);
    }catch(err){
       res.status(500).json(err); 
    }
});
// //Find All User
router.get("/" , verifyTokenandAdmin , async(req,res)=>{
    try{
        const carts = await Cart.find();
        res.status(200).json(carts);
    }
    catch(err){
        res.status(500).json(err);
    }
})
    
  



module.exports = router ;