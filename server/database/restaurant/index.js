import mongoose from 'mongoose';

const RestaurantSchema=new mongoose.Schema({
    name:{type:String,required:true},
    city:{type:String,required:true},
    address:{type:String,required:true},
    mapLocation:{type:String,required:true},
    cuisine:[String],
    restaurantTimings:String,
    contactNumber:Number,
    website:String,
    popularDishes:[String],
    averageCost:Number,
    amenties:[String],
    menuImage:{
        type:mongoose.Type.ObjectID,
        ref:"Images",
    },
    menu:{
        type:mongoose.Type.ObjectID,
        ref:"Menus",
    },
    photos:[{type:mongoose.Type.ObjectID,
        ref:"Reviews",}],
        reviews:[{type:mongoose.Type.ObjectID,
            ref:"Images",}]


},{
    timestamps:true, 
 })

export const RestaurantModel=mongoose.model("Restaurants",RestaurantSchema);