import { v2 } from 'cloudinary';

v2.config({
	cloud_name: import.meta.env.CLOUDINARY_CLOUD_NAME,
	api_key: import.meta.env.CLOUDINARY_API_KEY,
	api_secret: import.meta.env.CLOUDINARY_API_SECRET,
});

export const cloudinary = v2;
