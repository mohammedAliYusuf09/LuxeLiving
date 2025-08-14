import type { ErrorResponse } from "react-router-dom";

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

export interface PropertyForm {
        title: string;
        summary: string;
        description: string;
        propertyType: string;
        price: string;
        location: string;
        size: string;
        lotSize: string;
        bedrooms: string;
        bathrooms: string;
        parkingSpaces: string;
        yearBuilt: string;
        status: string;
        lat: string;
        lng: string;
        images: string[];
    }

export interface BlogInterface {
  title: string,
  htmlBody: string
}    

export interface postInter {
  _id: string,
  createdAt : string,
  title: string
}
export interface Blog {
  _id: string;
  title: string;
  htmlBody: string;
  createdAt: string; // ISO date string
  updatedAt: string; // ISO date string
  __v: number;
}


export interface AxiosError {
  response?: {
    data: ErrorResponse;
    status: number;
    statusText: string;
  };
  // other error properties
  message: string;
  code?: string;
  isAxiosError: boolean;
  toJSON: () => object;
}


export interface User {
  id: string;
  name: string;
  email: string;
  // Add more fields as required
}

export interface Message {
  email: string;
  name: string;
  message: string;
  __v: number;
  _id: string;
  firstRespond: string
  // Add more fields as required
}

export interface Client {
  email: string;
  name: string;
  createdAt: string,
  updatedAt: string,
  __v: number;
  _id: string;
  // Add more fields as required
}

export interface Email {
  subject: string;
  message: string;
}