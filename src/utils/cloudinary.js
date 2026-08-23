import {v2 as cloudinary} from "cloudinary"
import fs from "fs"
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME, 
    api_key: process.env.CLOUDINARY_API_KEY, 
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadOnCloudinary = async (localfilePath) => {
    try{
        if(!localfilePath) return null;
        //uploading file to cloudinary
        const response = await cloudinary.uploader.upload(localfilePath, {
            resource_type: "auto"
        });
        console.log("File is uploaded on cloudinary",response.url);
        return response;
    } catch (error) {
        fs.unlinkSync(localfilePath);//remove the locally saved temp files as the upload operations failed
        console.error("Error uploading to Cloudinary:", error);
        throw error;
    }
}

export {uploadOnCloudinary}