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

    

}


export {
    addProperty
}

