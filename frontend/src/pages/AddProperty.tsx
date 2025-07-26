import axios from "axios";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";

function AddProperty() {

    const [form, setForm] = useState({
        title: "",
        summary: "",
        description: "",
        propertyType: "",
        price: "",
        location: "",
        size: "",
        lotSize: "",
        bedrooms: "",
        bathrooms: "",
        parkingSpaces: "",
        yearBuilt: "",
        status: "",
        lat: "",
        lng: "",
        images: [],
    });

    const [image, setImage] = useState<FileList | null>(null);

    // const [url, setUrl] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log(form);
    };

    const handelImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setImage(e.target.files);
    }

    console.log(image);

   const uploadImageOnCloudnary = async (image: File) => {
    try {
        const formData = new FormData();
        formData.append("image", image); // key must match backend field name

        const response = await axios.post(
        "http://localhost:3000/api/v1/property/upload-image",
        formData,
        {
            headers: {
            "Content-Type": "multipart/form-data",
            },
            withCredentials: true,
        }
        );

    console.log("Uploaded Successfully", response.data);
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Upload failed:",
        error.response?.data?.message || error.message
      );
    } else if (error instanceof Error) {
      console.error("Upload failed:", error.message);
    } else {
      console.error("Upload failed:", error);
    }
  }
};
    

    // selec image
    // store image in a state 
    // send a server request to upload on cloudnary and get result 
    // store result in a state 
    // show others boxes

  return (
    <form className="p-6 rounded-lg text-white space-y-6" onSubmit={handleSubmit}>
        <h3 className="text-xl font-semibold">Add Property</h3>
      {/* Title, Summary, Description */}
      <div className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title*"
          className="w-full bg-gray-800 p-3 rounded border border-gray-700"
        />
        <input
          type="text"
          name="summary"
          value={form.summary}
          onChange={handleChange}
          placeholder="Summary*"
          className="w-full bg-gray-800 p-3 rounded border border-gray-700"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description*"
          rows={4}
          className="w-full bg-gray-800 p-3 rounded border border-gray-700 resize-none"
        />
      </div>

      {/* Grid Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Property Type */}
        <select
          name="propertyType"
          value={form.propertyType}
          onChange={handleChange}
          className="bg-gray-800 p-3 rounded border border-gray-700"
          required
        >
          <option value="">Property Type*</option>
          <option value="House">House</option>
          <option value="Apartment">Apartment</option>
          <option value="Condo">Condo</option>
          <option value="Townhouse">Townhouse</option>
          <option value="Villa">Villa</option>
        </select>

        {/* Price */}
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handleChange}
          placeholder="Price*"
          className="bg-gray-800 p-3 rounded border border-gray-700"
          required
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location*"
          className="bg-gray-800 p-3 rounded border border-gray-700"
          required
        />

        {/* Size */}
        <input
          type="text"
          name="size"
          value={form.size}
          onChange={handleChange}
          placeholder="Size (sqft)*"
          className="bg-gray-800 p-3 rounded border border-gray-700"
          required
        />

        {/* Lot Size */}
        <input
          type="text"
          name="lotSize"
          value={form.lotSize}
          onChange={handleChange}
          placeholder="Lot Size (optional)"
          className="bg-gray-800 p-3 rounded border border-gray-700"
        />

        {/* Bedrooms */}
        <input
          type="number"
          name="bedrooms"
          value={form.bedrooms}
          onChange={handleChange}
          placeholder="Bedrooms*"
          className="bg-gray-800 p-3 rounded border border-gray-700"
          required
        />

        {/* Bathrooms */}
        <input
          type="number"
          name="bathrooms"
          value={form.bathrooms}
          onChange={handleChange}
          placeholder="Bathrooms*"
          className="bg-gray-800 p-3 rounded border border-gray-700"
          required
        />

        {/* Parking Spaces */}
        <input
          type="text"
          name="parkingSpaces"
          value={form.parkingSpaces}
          onChange={handleChange}
          placeholder="Parking Spaces*"
          className="bg-gray-800 p-3 rounded border border-gray-700"
          required
        />

        {/* Year Built */}
        <input
          type="number"
          name="yearBuilt"
          value={form.yearBuilt}
          onChange={handleChange}
          placeholder="Year Built*"
          className="bg-gray-800 p-3 rounded border border-gray-700"
          required
        />

        {/* Status */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="bg-gray-800 p-3 rounded border border-gray-700"
          required
        >
          <option value="">Status*</option>
          <option value="Available">Available</option>
          <option value="Sold">Sold</option>
          <option value="Pending">Pending</option>
        </select>

        {/* Coordinates */}
        <input
          type="text"
          name="lat"
          value={form.lat}
          onChange={handleChange}
          placeholder="lat (lat)*"
          className="bg-gray-800 p-3 rounded border border-gray-700"
          required
        />
        <input
          type="text"
          name="lng"
          value={form.lng}
          onChange={handleChange}
          placeholder="lng ( lng)*"
          className="bg-gray-800 p-3 rounded border border-gray-700"
          required
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm mb-2">Add Images*</label>
        <div className="flex gap-4">
            {
                image ? (<button
                type="button"
                onClick={() => image && uploadImageOnCloudnary(image[0])}
                className="w-20 h-20 bg-gray-800 border border-dashed border-gray-600 rounded flex items-center justify-center text-2xl cursor-pointer"
                ><FaCloudUploadAlt /></button>) : (
                    <input 
          onChange={handelImageChange}
          type="file" placeholder="+" className="w-20 h-20 bg-gray-800 border border-dashed border-gray-600 rounded flex items-center justify-center text-2xl" />
                )
            }
          {/* Placeholder previews */}
          <div className="w-20 h-20 bg-gray-800 rounded border border-gray-700" />
          <div className="w-20 h-20 bg-gray-800 rounded border border-gray-700" />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button 
        onSubmit={handleSubmit}
        type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold">
          Submit Property
        </button>
      </div>
    </form>
  );
}

export default AddProperty