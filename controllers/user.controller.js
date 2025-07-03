import { JWT_KEY } from "../constants.js";
import { users } from "../index.js";
import { User } from "../models/users.model.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import bcrypt from "bcryptjs";
import jwt from 'jsonwebtoken';

export const userLoginController = (req,res)=> {
    const {userName, password} = req.body;
    res.json({message: `successfully loggedin ${userName} with password ${password}`});
}

export const userSignupController = asyncHandler(async(req,res) => {
    const {name, age, email} = req.body;
    const newPerson = new User({name,age,email});
    await newPerson.save()
    res
    .status(200)
    .json(200,newPerson,"user signup successfully");
})

export const editUser = (req,res)=> {
    const id = req.params.id;
    console.log(id)
    res.json({
        message: 'user has been edited succesfully'
    })
}

export const updateUser = async(req,res)=>{
    const {id,age} = req.body;
    const findUser = await User.findByIdAndUpdate(id,{age});
    console.log(findUser);
    res.send({message:"user updated successfully"});
}

export const deleteUser = async(req,res)=>{
    const {id} = req.params;
    await User.findByIdAndDelete(id);
    res.send({message:"user deleted"});
}

//session login controller
export const regUserController = (req,res)=> {
    const {userName, password} = req.body;
    users.push({
        userName,
        password
    })
    res.send('User is registered');
}
export const loginController = (req,res)=>{
    console.log(users);
    const {userName, password} = req.body;
    const user = users.find((user)=>user.userName === userName);
    if(!user || user.password !== password) {
        return res.send("Invalid credentials");
    }
    req.session.user = user;
    return res.send("user logged in succesfully!!");
}
export const dashboardController = (req,res)=>{
    if(!req.session.user) {
        return res.send('Unauthorized access')
    }
    res.send(`Welcome ${req.session.user.userName}`);
}

//jwt token user login controller
export const registerJwtUserController = async(req,res)=>{
    const {userName, password} = req.body;
    const hashedPassword = await bcrypt.hash(password,10);
    users.push({
        userName,
        password: hashedPassword
    })
    console.log(users);
    return res.send('user is registered!!');
}

export const loginJwtUserController = async(req,res)=>{
    const {userName, password} = req.body;
    const user = users.find((user)=>user.userName === userName);
    if(!user || !(await bcrypt.compare(password,user.password))) {
        return res.send('Invalid credentials');
    }
    const token = jwt.sign({userName},JWT_KEY);
    console.log('token',token);
    res.send({
        message: "User has been logged in successfully!!",
        token: token
    });
}

export const dashboardJwtUserController = (req,res)=> {
    const token = req.header('Authorization');
    console.log('token',token);
    const trimmedToken = token.split(" ")[1];
    const decodedToken = jwt.verify(trimmedToken,JWT_KEY);
    console.log('decoded token',decodedToken);
    if(decodedToken.userName) {
        return res.send(`Welcome ${decodedToken.userName}`);
    }
    return res.send("Access denied");
}