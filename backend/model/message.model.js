import mongoose, { Schema } from 'mongoose';

const messageSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    message: {
        type: String,
        required: true
    },
    firstRespond: {
        type: String,
        required: true
    }
})

export const Message = mongoose.model("Message", messageSchema);