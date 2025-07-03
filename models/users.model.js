import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    age: {
        type: Number,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: Object,
        deafult: {
            city: "jgm",
            pincode: 721507
        }
    }
},{timestamps: true, minimize: false})

export const User = mongoose.model('User',userSchema);