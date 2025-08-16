import axios from "axios";
import React, { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import { ClipLoader } from "react-spinners";
import type { PropertyForm } from "../lib/types";
import { propertyStore } from "../store/propertyStore";
import { useNavigate } from "react-router-dom";
import { notifySuccess } from "@/lib/tostCollection";

// const override: CSSProperties = {
//   display: "block",
//   margin: "0 auto",
//   borderColor: "red",
// };

function EditProperty() {

    const { property } = propertyStore();

    const [form, setForm] = useState<PropertyForm>({
      title: property?.title || "",
      summary: property?.summary || "",
      description: property?.description || "",
      propertyType: property?.propertyType || "",
      price: property?.price !== undefined ? String(property.price) : "",
      location: property?.location || "",
      size: property?.size || "",
      lotSize: property?.lotSize || "",
      bedrooms: property?.bedrooms !== undefined ? String(property.bedrooms) : "",
      bathrooms: property?.bathrooms !== undefined ? String(property.bathrooms) : "",
      parkingSpaces: property?.parkingSpaces || "",
      yearBuilt: property?.yearBuilt !== undefined ? String(property.yearBuilt) : "",
      status: property?.status || "",
      lat: property?.lat || "",
      lng: property?.lng || "",
      images: property?.images || [],
    });

    const [image, setImage] = useState<FileList | null>(null);
    const [formLoading, setformLoading] = useState<boolean>(false);
    const [isLoading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const navigate = useNavigate();
  
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setformLoading(true);
        setError(null);

        try {
          const response = await axios.put(
            `http://localhost:3000/api/v1/property/update-property/${property?._id}`,
            form, 
            {
            headers: {
            "Content-Type": "application/json"
            },
            withCredentials: true,
        }
          );
          console.log(response.data);
          setformLoading(false);
          setForm({
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
          notifySuccess('Property updated successfully');
          navigate('/propertys')
        } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Upload failed:",
        error.response?.data?.message || error.message
      );
       setError(error.response?.data?.message || error.message);
      setformLoading(false);
    } else if (error instanceof Error) {
      console.error("Upload failed:", error.message);
      setError(error.message);
      setformLoading(false);
    } else {
      console.error("Upload failed:", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
      setformLoading(false);
    }
  }
    };

    const handelImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setImage(e.target.files);
    }

   const uploadImageOnCloudnary = async (image: File) => {
    try {
        setError(null);
        setLoading(true)
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
    setForm(prev => ({
            ...prev,
            images: [...prev.images,  response.data.url,]
        }));
    setLoading(false)    
    setImage(null);    
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error(
        "Upload failed:",
        error.response?.data?.message || error.message
      );
       setError(error.response?.data?.message || error.message);
      setLoading(false);
    } else if (error instanceof Error) {
      console.error("Upload failed:", error.message);
      setError(error.message);
      setLoading(false);
    } else {
      console.error("Upload failed:", error);
      setError(error instanceof Error ? error.message : "An unknown error occurred");
      setLoading(false);
    }
  }
};

  return (
    <form className="p-6 rounded-lg text-white space-y-6" onSubmit={handleSubmit}>
        <h3 className="text-xl font-semibold">Edit Property</h3>
        {error && <p>{error}</p>}
      {/* Title, Summary, Description */}
      <div className="space-y-4">
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title*"
          className="input-style w-full"
        />
        <input
          type="text"
          name="summary"
          value={form.summary}
          onChange={handleChange}
          placeholder="Summary*"
          className="input-style w-full"
        />
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description*"
          rows={4}
          className="input-style resize-none w-full"
        />
      </div>

      {/* Grid Fields */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Property Type */}
        <select
          name="propertyType"
          value={form.propertyType}
          onChange={handleChange}
          className="input-style p-3"
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
          className="input-style p-3"
          required
        />

        {/* Location */}
        <input
          type="text"
          name="location"
          value={form.location}
          onChange={handleChange}
          placeholder="Location*"
          className="input-style p-3"
          required
        />

        {/* Size */}
        <input
          type="text"
          name="size"
          value={form.size}
          onChange={handleChange}
          placeholder="Size (sqft)*"
          className="input-style p-3"
          required
        />

        {/* Lot Size */}
        <input
          type="text"
          name="lotSize"
          value={form.lotSize}
          onChange={handleChange}
          placeholder="Lot Size (optional)"
          className="input-style p-3"
        />

        {/* Bedrooms */}
        <input
          type="number"
          name="bedrooms"
          value={form.bedrooms}
          onChange={handleChange}
          placeholder="Bedrooms*"
          className="input-style p-3"
          required
        />

        {/* Bathrooms */}
        <input
          type="number"
          name="bathrooms"
          value={form.bathrooms}
          onChange={handleChange}
          placeholder="Bathrooms*"
          className="input-style p-3"
          required
        />

        {/* Parking Spaces */}
        <input
          type="text"
          name="parkingSpaces"
          value={form.parkingSpaces}
          onChange={handleChange}
          placeholder="Parking Spaces*"
          className="input-style p-3"
          required
        />

        {/* Year Built */}
        <input
          type="number"
          name="yearBuilt"
          value={form.yearBuilt}
          onChange={handleChange}
          placeholder="Year Built*"
          className="input-style p-3"
          required
        />

        {/* Status */}
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="input-style p-3"
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
          className="input-style p-3"
          required
        />
        <input
          type="text"
          name="lng"
          value={form.lng}
          onChange={handleChange}
          placeholder="lng ( lng)*"
          className="input-style p-3"
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
                className="w-20 h-20 bg-[#171717] border border-dashed border-gray-600 rounded flex items-center justify-center text-2xl cursor-pointer"
                >{isLoading 
                  ? 
                <ClipLoader
                  color={'#ffffff'}
                  loading={isLoading}
                  /> 
                  : 
                  <FaCloudUploadAlt />}</button>) 
                  : 
                  (
                    <input 
                    onChange={handelImageChange}
                    type="file" placeholder="+" className="w-20 h-20 bg-[#171717] border border-dashed border-gray-600 rounded flex items-center justify-center text-2xl" />
                )
            }
          {/* Placeholder previews */}
          {
            form.images?.map((item, ind) => (
              <img
                key={ind}
                src={item}
                className="w-20 h-20 bg-[#171717] rounded border border-gray-700 cursor-pointer"
                onClick={() => {
                  setForm(prev => ({
                    ...prev,
                    images: prev.images.filter((_, i) => i !== ind)
                  }));
                }}
              />
            ))
          }
        </div>
        {
          error && <p className="text-red-300">{error}</p>
        }
      </div>

      {/* Submit Button */}
      <div className="pt-4">
        <button 
        onSubmit={handleSubmit}
        type="submit" className="bg-blue-600 hover:bg-blue-700 px-6 py-3 rounded font-semibold cursor-pointer">
          {formLoading 
          ? 
          <ClipLoader
            color={'#ffffff'}
            loading={formLoading}
            /> 
          :"Update Property"}
        </button>
      </div>
    </form>
  );
}

export default EditProperty