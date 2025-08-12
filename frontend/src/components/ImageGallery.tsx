import { useEffect, useState } from 'react';

const ImageGallery = ({images} : {images : string[]}) => {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  useEffect(() => {
    setSelectedImage(images[0])
  },[images])

  return (
    <div className="bg-[#171717] p-4 rounded-lg">
      <div className="w-full h-[400px] mb-4">
        <img 
          style={{width: "100%"}}
          src={selectedImage ? selectedImage : undefined}
          alt="Main"
          className="w-full h-full object-cover rounded-lg"
        />
      </div>

      <div className="grid grid-cols-5 gap-3">
        {images.map((img, index) => (
          <div
            key={index}
            className={`cursor-pointer overflow-hidden rounded-md border-2 ${
              selectedImage === img ? 'border-white' : 'border-transparent'
            }`}
            onClick={() => setSelectedImage(img)}
          >
            <img
              src={img}
              alt={`Thumb ${index}`}
              className="h-24 w-full object-cover hover:scale-105 transition-transform duration-200"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;