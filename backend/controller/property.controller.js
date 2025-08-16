//// create property
import { Property } from "../model/property.model.js";
import {uploadOnCloudinary} from "../config/cloudinary.js"
import { log } from "console";

const addProperty = async (req, res) => {
  // chack if uset is authenticated

  const { email } = req.agent;

  if (!email) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const {
    title,
    summary,
    description,
    propertyType,
    price,
    location,
    size,
    lotSize,
    bedrooms,
    bathrooms,
    parkingSpaces,
    yearBuilt,
    status,
    lat,
    lng,
    images,
  } = req.body;
  

  if (!title) return res.status(300).json({ success: false, message: "Title is required" });
  if (!summary) return res.status(300).json({ success: false, message: "Summary is required" }) ;
  if (!description) return res.status(300).json({ success: false, message: "Description is required" }) ;
  if (!propertyType) return res.status(300).json({ success: false, message: "Property type is required"}) ;
  if (!['House', 'Apartment', 'Condo', 'Townhouse', 'Villa'].includes(propertyType)) {
    return res.status(300).json({ success: false, message: "Invalid property type" });
  }
  if (!price || isNaN(price)) return res.status(300).json({ success: false, message: "Valid price is required" }) ;
  if (!location) return res.status(300).json({ success: false, message: "Location is required" }) ;
  if (!size) return res.status(300).json({ success: false, message: "Size is required" }) ;
  if (!bedrooms || isNaN(bedrooms)) return res.status(300).json({ success: false, message: "Valid number of bedrooms is required" }) ;
  if (!bathrooms || isNaN(bathrooms)) return res.status(300).json( { success: false, message: "Valid number of bathrooms is required" });
  if (!parkingSpaces) return res.status(300).json({ success: false, message: "Parking spaces are required" }) ;
  if (!yearBuilt || isNaN(yearBuilt)) return res.status(300).json({ success: false, message: "Valid year built is required" }) ;
  if (!status) return res.status(300).json({ success: false, message: "Status is required" }) ;
  if (!['Available', 'Sold', 'Pending'].includes(status)) {
    return res.status(300).json({ success: false, message: "Invalid status" }) ;
  }
  if (!lat) return res.status(300).json({ success: false, message: "Latitude is required" }) ;
  if (!lng) return res.status(300).json( { success: false, message: "Longitude is required" });
  if (!Array.isArray(images) || images.length === 0) {
    return res.status(300).json( { success: false, message: "At least one image is required" });
  }


  /// create a new property
  const newProperty = {
    title,
    summary,
    description,
    propertyType,
    price,
    location,
    size,
    lotSize,
    bedrooms,
    bathrooms,
    parkingSpaces,
    yearBuilt,
    status,
    lat,
    lng,
    images,
  };

  try {
    // save the property in the database
    const property = await Property.create(newProperty);

    return res
      .status(201)
      .json({
        success: true,
        message: "Property added successfully",
        property,
      });
  } catch (error) {
    console.error("Error adding property:", error);
    return res
      .status(400)
      .json({ success: false, message: "Internal server error" });
  }
};
// get all properties with filters
const getAllProperties = async (req, res) => {
  try {
    // chack if uset is authenticated

    const { email } = req.agent;

    if (!email) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    
    const {
      propertyType,
      status,
      location,
      bedrooms,
      bathrooms,
      minPrice,
      maxPrice,
    } = req.query;

    let filter = {};

    if (propertyType) filter.propertyType = propertyType;
    if (status) filter.status = status;
    if (location) filter.location = { $regex: location, $options: "i" }; // case-insensitive partial match
    if (bedrooms) filter.bedrooms = Number(bedrooms);
    if (bathrooms) filter.bathrooms = Number(bathrooms);
    
    if (minPrice || maxPrice) {
      filter.price = {};
      if (minPrice) filter.price.$gte = Number(minPrice);
      if (maxPrice) filter.price.$lte = Number(maxPrice);
    }

    const properties = await Property.find(filter).select(
    "-summary -description -propertyType -location -lotSize -parkingSpaces -yearBuilt -lat -lng"
    );

    return res.status(200).json({
      success: true,
      count: properties.length,
      data: properties,
    });
  } catch (error) {
    console.error("Error fetching properties:", error);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};
// get property by id
const getPropertyById = async (req, res) => {

  // chack if uset is authenticated

  const { email } = req.agent;

  if (!email) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Property ID is required" });
  }

  /// find the property by id
  try {
    const property = await Property.findById(id);

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    return res.status(200).json({ success: true, property });
  } catch (error) {
    console.error("Error fetching property:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

// update property by id
const updatePropertyById = async (req, res) => {
  // chack if uset is authenticated

  const { email } = req.agent;

  if (!email) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  // get id from params
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Property ID is required" });
  }

  // get the property from database
  try {
    const property = await Property.findById(id);

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    // update the property
    const updatedData = req.body;

    const updatedProperty = await Property.findByIdAndUpdate(id, updatedData, {
      new: true,
    });
    if (!updatedProperty) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }
    return res
      .status(200)
      .json({
        success: true,
        message: "Property updated successfully",
        property: updatedProperty,
      });
  } catch (error) {
    console.error("Error updating property:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const deletePropertyById = async (req, res) => {
  // chack if uset is authenticated
  const { email } = req.agent;

  if (!email) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  // get id from params
  const { id } = req.params;

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Property ID is required" });
  }

  try {
    const property = await Property.findByIdAndDelete(id);

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Property deleted successfully" });
  } catch (error) {
    console.error("Error deleting property:", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
};

const changeStatusById = async (req, res) => {
    // chack if uset is authenticated
  const { email } = req.agent;

  if (!email) {
    return res.status(401).json({ success: false, message: "Unauthorized" });
  }

  // get id from params
  const { id } = req.params;

  const { changeTo } = req.body;
  if (!changeTo) {
    return res.status(400).json({ success: false, message: "Change Status Is required" });
  }

  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Property ID is required" });
  }

  try {
    const property = await Property.findByIdAndUpdate(id, { status: changeTo}, { new: true});

    if (!property) {
      return res
        .status(404)
        .json({ success: false, message: "Property not found" });
    }

    return res
      .status(200)
      .json({ success: true, message: "Property status changed successfully" });
  } catch (error) {
    console.error("Error changing property status", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }
}

const uploadImage = async (req, res) => {
    const { email } = req.agent;
    const  image  = req.file;

    if (!email) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }
    if (!image) {
        return res.status(401).json({ success: false, message: "Image file is required" });
    }
    const imagePath = image.path;
    try {
    // upload on cloudnary
    const {url} = await uploadOnCloudinary(imagePath);
    // return respons
        return res
        .status(200)
        .json({ success: true, message: "Image uploaded on cloudinary successfully", url});
    
    } catch (error) {
    console.error("Error uploading image", error);
    return res
      .status(500)
      .json({ success: false, message: "Internal server error" });
  }

    



}

export {
  addProperty,
  getAllProperties,
  getPropertyById,
  updatePropertyById,
  deletePropertyById,
  changeStatusById,
  uploadImage
};
