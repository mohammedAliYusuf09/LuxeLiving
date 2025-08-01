export interface property {
  _id: string,
  images: [string];
  title: string;
  bedrooms: number;
  bathrooms: number;
  size: string;
  price: string;
  status: string;
}

export interface PropertyFull {
  _id: string;
  images: string[];
  title: string;
  bedrooms: number;
  bathrooms: number;
  size: string;
  price: number;
  status: string;
  summary: string;
  description: string;
  location: string;
  lat: string;
  lng: string;
  lotSize: string;
  parkingSpaces: string;
  propertyType: string;
  yearBuilt: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface filterProps {
  propertyType : string | '',
  location: string | '',
  status: string | '',
  bedrooms: string | '',
  bathrooms: string | '',
  minPrice: string | '',
  maxPrice: string | '',
}