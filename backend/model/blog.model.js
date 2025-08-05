import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    htmlBody: {
        type: String,
        required: true,
    },
},{timestamps: true})

export const Blog = mongoose.model("Blog", blogSchema);

