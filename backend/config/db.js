import mongoose from "mongoose";

export const connectDB=async()=>{
    await mongoose.connect("mongodb+srv://koundinyamiddela15:Mkoundinya21@cluster0.ttdvbpo.mongodb.net/food-deliery").then(()=>console.log("DB Connected"));
}