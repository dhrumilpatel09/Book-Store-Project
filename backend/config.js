import "dotenv/config";

export const PORT = process.env.PORT || 5000; // ✅ Updated to match backend
export const mongoDBURL = process.env.MONGODB_URI; // ✅ Fixed variable name
