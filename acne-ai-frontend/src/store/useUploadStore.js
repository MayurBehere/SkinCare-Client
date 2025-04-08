import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const BASE_URL = import.meta.env.MODE === "development" ? "http://localhost:5001/api" : "/";

export const useAuthStore = create((set, get) => ({
    isUploading: false,
    generating: false,
    recommending: false,

    upload: async(imagePromises) => {
        try {
            const base64Images = await Promise.all(imagePromises);
            set({ selectedImages: base64Images }); // update state
            await updateProfile({ profilePics: base64Images }); // backend update
        } 
        catch (error) {
            console.error("Error reading files:", error);
        }
    }

}))