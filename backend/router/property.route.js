import express from 'express';
import { verifyAgent } from '../middleware/auth.middleware';
import { upload } from '../middleware/multer.middleware';
import { addProperty } from '../controller/property.controller';

const propertyRouter = express.Router();


//// add property

propertyRouter.post('/add-property', verifyAgent, upload.files([{name: 'images', maxCount: 6}]), addProperty);

//// get all properties with filters

//// get property by id

//// update property by id

//// delete property by id

//// change property status by id


export default propertyRouter;