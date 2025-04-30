import { useState, useEffect } from "react";
import { useParams, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import LoggedInNavbar from "@/custom/LoggedInNavbar";
import { TextShimmerWave } from "@/components/ui/text-shimmer-wave";
import { Button } from "@/components/ui/button";
import { toast } from "react-hot-toast";

const SessionPage = () => {
  const navigate = useNavigate();
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
  const [dermatologists, setDermatologists] = useState([]);
  const [locationError, setLocationError] = useState(null);
  const [loadingDermatologists, setLoadingDermatologists] = useState(false);

  const IMGBB_API_KEY = "cd27a84e52dc99425cc000fe71e8156b";

  useEffect(() => {
    const fetchSessionDetails = async () => {
      try {
        if (!sessionId) {
          setSessionInfo({
            session_name: "Dummy Session - Skin Check",
            created_at: new Date().toLocaleDateString(),
          });
          setClassificationResult({
            acne_type: "Mild Acne",
            confidence: 0.87,
            recommendations: "Use a mild cleanser and moisturize daily.",
          });
          setLoading(false);
          return;
        }

        const response = await axios.get(
          `http://127.0.0.1:5000/session/${sessionId}`
        );
        const { image_url, session_name, created_at, classification_results } =
          response.data;

        setImageUrls(image_url ? [image_url] : []);
        setSessionInfo({ session_name, created_at });
        setClassificationResult(classification_results || null);
      } catch (err) {
        console.error("Failed to fetch session details:", err);
        setSessionInfo({
          session_name: "Dummy Session - Skin Check",
          created_at: new Date().toLocaleDateString(),
        });
        setClassificationResult({
          acne_type: "Mild Acne",
          confidence: 0.87,
          recommendations: "Use a mild cleanser and moisturize daily.",
        });
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
      toast.error("File must be JPEG");
      return;
    }
    setImage(file);
    setClassificationResult(null);
  };

  const uploadImage = async () => {
    if (!uid) {
      toast.error("User ID not found. Please log in again.");
      return;
    }
    if (!image) {
      toast.error("Please select a JPG image first.");
      return;
    }
    setUploading(true);
    try {
      const formData = new FormData();
      formData.append("image", image);
      formData.append("key", IMGBB_API_KEY);
      const imgbbResp = await axios.post(
        "https://api.imgbb.com/1/upload",
        formData
      );
      const data = imgbbResp.data.data;
      if (!data.display_url) throw new Error("ImgBB upload failed");

      await axios.post(
        `http://127.0.0.1:5000/session/${sessionId}/upload-image`,
        {
          uid,
          image_urls: [{ url: data.display_url, delete_url: data.delete_url }],
        },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      const sessionRes = await axios.get(
        `http://127.0.0.1:5000/session/${sessionId}`
      );
      const updated = sessionRes.data;
      setImageUrls(updated.image_url ? [updated.image_url] : []);
      setSessionInfo({
        session_name: updated.session_name,
        created_at: updated.created_at,
      });
      setClassificationResult(
        updated.classification_results || "No result returned"
      );
      toast.success("Image successfully uploaded and classified.");
      setImage(null);
    } catch (err) {
      console.error("Upload failed:", err);
      toast.error("Failed to upload image. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  const fetchDermatologists = async () => {
    setLoadingDermatologists(true);
    setLocationError(null);
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0,
        });
      });
      const { latitude, longitude } = position.coords;

      const resp = await axios.get(
        `http://127.0.0.1:5000/session/${sessionId}/nearest-dermatologists`,
        {
          params: { uid, lat: latitude, lng: longitude },
        }
      );
      setDermatologists(resp.data.dermatologists || []);
    } catch (err) {
      console.error("Failed to fetch dermatologists:", err);
      if (err.name === "GeolocationPositionError") {
        switch (err.code) {
          case 1:
            setLocationError(
              "Location access denied. Please enable location services in your browser."
            );
            break;
          case 2:
            setLocationError("Unable to determine your location.");
            break;
          case 3:
            setLocationError("Location request timed out.");
            break;
          default:
            setLocationError("Error accessing your location.");
        }
      } else {
        setLocationError(
          "Could not fetch nearest dermatologists. Please try again."
        );
      }
    } finally {
      setLoadingDermatologists(false);
    }
  };

  return (
    <div className="mx-8 sm:mx-8 md:mx-16 lg:mx-[16vw] font-sfpro">
      <LoggedInNavbar />

      
      <button
        onClick={() => navigate(-1)}
        className="
    mt-4
    inline-flex
    items-center
    px-4
    py-2
    bg-black
    text-white
    border
    border-gray-800
    rounded-md
    shadow-sm
    hover:bg-gray-800
    focus:outline-none
    focus:ring-2
    focus:ring-gray-500
    transition
    duration-150
    ease-in-out
  "
      >
        <span className="mr-2 text-lg">&larr;</span>
        <span className="font-medium">Back</span>
      </button>
      <div className="mt-10 md:mt-20">
        <h1 className="font-bold text-xl md:text-4xl">Upload</h1>
        {uploading && (
          <TextShimmerWave className="font-mono text-sm" duration={1}>
            Generating your report...
          </TextShimmerWave>
        )}
      </div>
      <div className="flex items-center justify-center w-full mt-4 md:mt-10">
        <div className="mt-8 bg-gray-50 h-full w-full flex flex-col items-center justify-center py-16 rounded-md border">
          {loading ? (
            <div className="w-full flex justify-center">
              <div className="w-8 h-8 border-4 border-blue-500 border-dotted rounded-full animate-spin"></div>
            </div>
          ) : sessionInfo && classificationResult ? (
            <div className="w-full px-6">
              {/* session info & results */}
              <div className="text-center mb-6">
                <p className="text-xl font-sfpro font-semibold">
                  {sessionInfo.session_name}
                </p>
                <p className="text-sm text-gray-500">
                  Created on:&nbsp;
                  <span className="font-medium text-gray-500">
                    {sessionInfo.created_at}
                  </span>
                </p>
              </div>

              {imageUrls.length > 0 && (
                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2">
                    Uploaded Images
                  </h3>
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

              <div className="mt-4 py-4 px-6 bg-white border rounded w-full">
                <p className="font-semibold text-lg">Classification Result:</p>
                <ul className="list-disc list-inside">
                  <li className="my-4">
                    <strong>Acne Type:</strong>{" "}
                    {classificationResult.acne_type === "Acne"
                      ? "Folliculitis"
                      : classificationResult.acne_type ||
                        classificationResult.classification}
                  </li>
                  <li className="my-4">
                    <strong>Confidence:</strong>{" "}
                    {((classificationResult.confidence || 0) * 100).toFixed(2)}%
                  </li>
                  <li className="my-4">
                    <strong>Recommendations:</strong>{" "}
                    {classificationResult.recommendations || "None"}
                  </li>
                </ul>
              </div>

              <p className="text-lg mt-8">
                These are some dermatologists you can consider if the problem
                persists.
              </p>
              <Button
                className="mt-4"
                onClick={fetchDermatologists}
                disabled={loadingDermatologists}
              >
                {loadingDermatologists
                  ? "Loading..."
                  : "Find Nearby Dermatologists"}
              </Button>

              {locationError && (
                <div className="mt-4 p-3 bg-red-100 text-red-700 rounded">
                  {locationError}
                </div>
              )}

              {dermatologists.length > 0 && (
                <div className="mt-8">
                  <h4 className="font-semibold mb-4 text-xl">
                    Nearest Dermatologists:
                  </h4>
                  <div className="flex overflow-x-auto space-x-4 pb-4">
                    {dermatologists.map((doc, idx) => {
                      const googleMapsLink = `https://www.google.com/maps/place/?q=place_id:${doc.place_id}`;
                      return (
                        <a
                          key={idx}
                          href={googleMapsLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="min-w-[220px] max-w-[250px] bg-white rounded-lg shadow-md hover:shadow-lg transition-transform transform hover:scale-105 flex-shrink-0"
                        >
                          <div className="p-4">
                            <h5 className="font-semibold text-lg truncate">
                              {doc.name}
                            </h5>
                            <p className="text-sm text-gray-600">
                              {doc.distance_km} km away
                            </p>
                            <div className="flex items-center text-yellow-500 text-sm mt-1">
                              ★ {doc.rating}
                              <span className="text-gray-500 ml-1">
                                ({doc.user_ratings_total})
                              </span>
                            </div>
                          </div>
                        </a>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          ) : (
            <label className="flex flex-col items-center cursor-pointer">
              <h1 className="mb-4 text-lg font-medium">Upload</h1>
              <p className="text-sm text-gray-500 mb-4">
                Only JPG images are allowed
              </p>
              <input
                type="file"
                accept="image/jpeg"
                className="hidden"
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
                    disabled={uploading}
                    className="bg-blue-500 text-white px-5 py-2 rounded hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition"
                  >
                    {uploading
                      ? "Generating your report..."
                      : "Upload & Classify"}
                  </button>
                </div>
              ) : (
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 hover:border-blue-500 transition">
                  <p className="text-center text-gray-600">
                    Click to select JPG image
                  </p>
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
