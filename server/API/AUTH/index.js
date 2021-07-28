//Library

import express from 'express'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

//Models
import {UserModel} from "../../database/user"



const Router=express.Router();

/* 
Route   /signup
Des     Register new User
Params  none
Access  Public
Method  Post

*/
Router.post("/signup", async (req,res)=>{
    try{
        

        //check whether email exist
        await UserModel.findByEmailAndPhone(req.body.credentials);

        //hash the password
        const newUser=await UserModel.create(req.body.credentials);




        //generate JWT auth tokentoken=
        
const token= newUser.generateJwtToken();



        //return
        return res.status(200).json({token,status:"Success"});

    }catch(error){
        return res.status(500).json({error:error.message});
    }
})

/* 
Route   /signin
Des     Signin with email and password
Params  none
Access  Public
Method  Post

*/



export default Router;

