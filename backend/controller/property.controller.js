//// create property

const addProperty = async (req, res) => {
    // chack if uset is authenticated

    const { eamil } = req.agent;

    if(!eamil) {
        return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const {title, summary, description, propertyType, price, location, size, lotSize, bedrooms, bathrooms, parkingSpaces, yearBuilt, status, coordinates} = req.body;

    if (!title || !summary || !description || !propertyType || !price || !location || !size || !bedrooms || !bathrooms || !parkingSpaces || !yearBuilt || !status || !coordinates) {
        return res.status(400).json({ success: false, message: "All fields are required" });
    }

    // get images from request
    const images = req.files.images;

    if (!images || images.length === 0) {
        return res.status(400).json({ success: false, message: "At least one image is required" });
    }

    // get images paths
    const imagePaths = Array.isArray(images)
      ? images.map((file) => file.path)
      : [images.path];

    // upload images to cloudinary  
    const uploadedImages = await Promise.all(
        imagePaths.map((path) => uploadOnCloudinary(path))
    );

    
}


export {
    addProperty
}

