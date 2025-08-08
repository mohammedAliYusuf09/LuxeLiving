import mongoose, { Schema } from 'mongoose';

const clientSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    }
})

export const Client = mongoose.model("Client", clientSchema);