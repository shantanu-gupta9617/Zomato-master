//Library

import express from 'express'
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import passport from "passport"

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
Router.post("/signin", async (req,res)=>{
    try{
        

        //check whether email exist
      const user = await UserModel.findByEmailAndPassword(req.body.credentials);

        //hash the password
       
        //generate JWT auth tokentoken=      
        const token= user.generateJwtToken();
        //return
        return res.status(200).json({token,status:"Success"});

        }catch(error){
            return res.status(500).json({error:error.message});
        }
    })

/* 
Route   /google
Des     Google signin
Params  none
Access  Public
Method  GET

*/

Router.get("/google",passport.authenticale("google",{scope: {"https://www.googleapis.com/auth/userinfo.profile",
"https://www.googleapis.com/auth/userinfo.email",
}}))


/* 
Route   /google/callback
Des     Google signin callback
Params  none
Access  Public
Method  GET

*/

Router.get("/google/callback",passport.authenticate("google",{failureRedirect:"/"}), 
(req,res)=>{
    return res.json({token:req.session.passport.user.token});
})
export default Router;

