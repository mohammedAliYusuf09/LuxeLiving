import express from 'express';
import { verifyAgent } from '../middleware/auth.middleware.js';
import 
{ 
addProperty, 
getAllProperties, 
getPropertyById, 
updatePropertyById, 
deletePropertyById ,
changeStatusById
} from '../controller/property.controller.js';

const propertyRouter = express.Router();


//// add property

propertyRouter.post('/add-property', verifyAgent, addProperty);

//// get all properties with filters

propertyRouter.get('/all-properties', verifyAgent, getAllProperties);

//// get property by id
propertyRouter.get('/get-property-details/:id', verifyAgent, getPropertyById);

//// update property by id
propertyRouter.put('/update-property/:id', verifyAgent, updatePropertyById);

//// delete property by id
propertyRouter.delete('/delete-property/:id', verifyAgent, deletePropertyById);

//// change property status by id
propertyRouter.put('/change-status/:id', verifyAgent, changeStatusById);


export default propertyRouter;