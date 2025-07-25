import mongoose from 'mongoose';

const propertySchema = new mongoose.Schema({
    title : {
        type: String,
        required: true,
    },
    summary : {
        type: String,
        required: true,
    },
    description : {
        type: String,
        required: true,
    },
    propertyType : {
        type: String,
        required: true,
        enum: ['House', 'Apartment', 'Condo', 'Townhouse', 'Villa']
    },
    price : {
        type: Number,
        required: true,
    },
    location : {
        type: String,
        required: true,
    },
    size : {
        type: String,
        required: true,
    },
    lotSize : {
        type: String
    },
    bedrooms : {
        type: Number,
        required: true,
    },
    bathrooms : {
        type: Number,
        required: true,
    },
    parkingSpaces : {
        type: String,
        required: true,
    },
    yearBuilt : {
        type: Number,
        required: true,
    },
    status: {
        type: String,
        required: true,
        enum: ['Available', 'Sold', 'Pending']
    },
    coordinates :  {
        type: [Number],
        required: true
    },
    images : {
        type: [String],
        required: true
    }
}, {timestamps: true});

export default Property = mongoose.model('Property', propertySchema);