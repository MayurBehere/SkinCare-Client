import  { useState, useEffect } from 'react';
import { useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import LoggedInNavbar from '@/custom/LoggedInNavbar';
import { TextShimmerWave } from '@/components/ui/text-shimmer-wave';

const SessionPage = () => {
  const location = useLocation();
  const storedUser = JSON.parse(localStorage.getItem("user"));
  const uid = location.state?.uid || storedUser?.uid;

  const { sessionId } = useParams();
  const [image, setImage] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [imageUrls, setImageUrls] = useState([]);
  const [sessionInfo, setSessionInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [classificationResult, setClassificationResult] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);

  const IMGBB_API_KEY = "cd27a84e52dc99425cc000fe71e8156b";

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        if (!sessionId) {
          console.error("Invalid sessionId");
          return;
        }

        const response = await axios.get(
          `http://127.0.0.1:5000/session/${sessionId}`
        );
        console.log("Session details response:", response.data);

        const { image_url, session_name, created_at, classification_results } =
          response.data;

        // Handle single image URL
        const extractedImages = image_url ? [image_url] : [];

        setImageUrls(extractedImages || []);
        setSessionInfo({ session_name, created_at });
        setClassificationResult(classification_results || null);
      } catch (error) {
        console.error("Failed to fetch session details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchSessionDetails();
  }, [sessionId]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    if (file.type !== "image/jpeg") {
      alert("Only JPG images are allowed.");
      return;
    }

    setImage(file);
    setClassificationResult(null); // reset classification on new image
  };

  const uploadImage = async () => {
    if (!uid) {
      alert("User ID not found. Please log in again.");
      return;
    }

    if (!image) {
      alert("Please select a JPG image first.");
      return;
    }

    setUploading(true);

    try {
      // Step 1: Upload to ImgBB
      const formData = new FormData();
      formData.append("image", image);
      formData.append("key", IMGBB_API_KEY);

      const response = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData
      );
      console.log("ImgBB upload response:", response.data);

      const data = response.data?.data;

      if (!data?.display_url || !data?.delete_url) {
        throw new Error("Incomplete upload data from ImgBB.");
      }

      const imageObject = {
        url: data.display_url,
        delete_url: data.delete_url,
      };

      // Step 2: Send image URL to backend for classification
      const backendResponse = await axios.post(
        `http://127.0.0.1:5000/session/${sessionId}/upload-image`,
        {
          uid,
          image_urls: [imageObject],
        },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("Backend classification response:", backendResponse.data);

      // Step 3: Re-fetch updated session data to get classification result
      const sessionRes = await axios.get(
        `http://127.0.0.1:5000/session/${sessionId}`
      );
      console.log("Updated session details response:", sessionRes.data);

      const updated = sessionRes.data;
      const extractedImages = updated.image_url ? [updated.image_url] : [];

      setClassificationResult(
        updated.classification_results || "No result returned"
      );
      setImageUrls(extractedImages || []);
      setSessionInfo({
        session_name: updated.session_name,
        created_at: updated.created_at,
      });

      alert("Image successfully uploaded and classified.");
      setImage(null);
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mx-8 sm:mx-8 md:mx-16 lg:mx-[16vw] font-sfpro">
      <LoggedInNavbar />
      <div className="mt-10 md:mt-20">
        <h1 className="font-bold text-xl md:text-4xl">
          Upload
        </h1>
      </div>
      <div className="flex items-center justify-center w-full mt-4 md:mt-10">
        {uploading && (
          <TextShimmerWave className='font-mono text-sm' duration={1}>
            Generating your report...
          </TextShimmerWave>
        )}
        <div className='mt-8 bg-gray-50 h-full w-full flex flex-col items-center justify-center py-16 rounded-md border'>
          {loading ? (
            <div className="w-full flex justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
            </div>
          ) : sessionInfo && classificationResult ? (
            <div className="w-full px-6">
              <div className="text-center mb-6">
                <p className="text-xl font-medium">{sessionInfo.session_name}</p>
                <p className="text-sm text-gray-500">
                  Created on:{" "}
                  <span className="font-medium text-gray-700">
                    {new Date(sessionInfo.created_at).toLocaleDateString(undefined, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </span>{" "}
                  at{" "}
                  <span className="font-medium text-gray-700">
                    {new Date(sessionInfo.created_at).toLocaleTimeString(undefined, {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </span>
                </p>
              </div>
              
              <div className="mt-4 p-4 bg-green-100 text-green-800 rounded text-left w-full">
                <p className="font-semibold">Classification Result:</p>
                <ul className="list-disc list-inside">
                  <li>
                    <strong>Acne Type:</strong> {classificationResult.acne_type}
                  </li>
                  <li>
                    <strong>Confidence:</strong>{" "}
                    {(classificationResult.confidence * 100).toFixed(2)}%
                  </li>
                  <li>
                    <strong>Recommendations:</strong>{" "}
                    {classificationResult.recommendations || "None"}
                  </li>
                </ul>
              </div>
              
              {imageUrls.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2">Uploaded Images</h3>
                  <div className="flex justify-center gap-4">
                    {imageUrls.map((url, index) => (
                      <div key={index} className="relative">
                        <img
                          src={url}
                          alt={`Uploaded ${index}`}
                          className="w-24 h-24 object-cover rounded-md border shadow cursor-pointer"
                          onClick={() => setPreviewImage(url)}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <label className='flex flex-col items-center cursor-pointer'>
              <h1 className="mb-4 text-lg font-medium">Upload</h1>
              <p className="text-sm text-gray-500 mb-4">Only JPG images are allowed</p>
              <input 
                type="file" 
                accept="image/jpeg" 
                className='hidden' 
                onChange={handleImageChange} 
                disabled={imageUrls.length > 0}
              />
              {image ? (
                <div className="flex flex-col items-center">
                  <div className="relative mb-4">
                    <img
                      src={URL.createObjectURL(image)}
                      alt="preview"
                      className="w-32 h-32 object-cover rounded-md shadow-md"
                    />
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setImage(null);
                      }}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-full px-2 py-1 text-xs"
                    >
                      ✕
                    </button>
                  </div>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      uploadImage();
                    }}
                    className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 transition"
                  >
                    Upload & Classify
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-500 transition">
                  <p className="text-center text-gray-600">Click to select JPG image</p>
                </div>
              )}
            </label>
          )}
        </div>
      </div>

      {previewImage && (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50">
          <div className="relative">
            <img
              src={previewImage}
              alt="Preview"
              className="max-w-full max-h-screen rounded-lg"
            />
            <button
              className="absolute top-2 right-2 text-white bg-red-500 px-2 py-1 rounded"
              onClick={() => setPreviewImage(null)}
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default SessionPage;