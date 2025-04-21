import { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";
import LoggedInNavbar from "@/custom/LoggedInNavbar";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";

function Main() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [showNameForm, setShowNameForm] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initUser = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (storedUser && Date.now() - storedUser.timestamp < 10 * 60 * 1000) {
        setUser(storedUser);
        await fetchUser(storedUser.uid);
        fetchSessions(storedUser.uid);
      } else {
        onAuthStateChanged(auth, async (currentUser) => {
          if (currentUser) {
            const userData = {
              uid: currentUser.uid,
              name: currentUser.displayName || "",
              timestamp: Date.now(),
            };
            localStorage.setItem("user", JSON.stringify(userData));
            setUser(userData);

            await fetchUser(currentUser.uid);
            fetchSessions(currentUser.uid);
          } else {
            navigate("/login");
          }
        });
      }
    };

    initUser();
  }, [auth, navigate]);

  const fetchUser = async (uid) => {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://127.0.0.1:5000/auth/check-user-info",
        { uid }
      );

      const fetchedName = response.data.name;

      setUser((prev) => ({
        ...prev,
        name: fetchedName || prev.name,
      }));

      if (!fetchedName || fetchedName.trim() === "" || fetchedName.trim().toLowerCase() === "unknown") {
        setName("");
        setShowNameForm(true);
      } else {
        setShowNameForm(false);
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSessions = async (uid) => {
    try {
      if (!uid) return;

      setSessions([]); // clear while loading
      const response = await axios.get(
        "http://127.0.0.1:5000/session/get-sessions",
        { params: { uid } }
      );

      setSessions(response.data.sessions || []);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      alert("Failed to load sessions.");
    }
  };

  const handleNewSession = async () => {
    try {
      const currentUser = auth.currentUser;
      const sessionName = prompt("Enter a unique name for this session:");
      if (!sessionName) {
        alert("Session name cannot be empty.");
        return;
      }

      const response = await axios.post(
        "http://127.0.0.1:5000/session/start-session",
        {
          uid: currentUser.uid,
          session_name: sessionName,
        }
      );

      const sessionId = response.data.session_id;
      fetchSessions(currentUser.uid);

      navigate(`/session/${sessionId}`, { state: { uid: currentUser.uid } });
    } catch (error) {
      console.error("Error creating session", error);
    }
  };

  const deleteSession = async (sessionId) => {
    try {
      await axios.delete(`http://127.0.0.1:5000/session/delete-session/${sessionId}`);
      setSessions(sessions.filter((session) => session.session_id !== sessionId));
    } catch (error) {
      console.error("Error deleting session", error);
    }
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    
    if (!name || name.trim() === "") {
      alert("Please enter your name to continue.");
      return;
    }

    try {
      const currentUser = auth.currentUser;

      await axios.post("http://127.0.0.1:5000/auth/update-name", {
        uid: currentUser.uid,
        name: name,
      });

      // Update local user state
      setUser((prev) => ({ 
        ...prev, 
        name 
      }));
      
      // Update localStorage
      const storedUser = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem("user", JSON.stringify({
        ...storedUser,
        name
      }));
      
      setShowNameForm(false);
      fetchUser(currentUser.uid);
    } catch (error) {
      console.error("Error updating name", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  // Show the Name component when name is needed
  if (showNameForm) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full font-sfproMed px-4">
        <div className="relative flex flex-col items-center bg-gray-100 border rounded-xl px-10 lg:px-24 pt-20 pb-10 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
          <form onSubmit={handleNameSubmit} className="w-full">
            {/* Title */}
            <div className="flex items-center justify-center">
              <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                Welcome {name ? name : ""}
              </h1>
            </div>

            <div className="mt-8 text-center">
              <h2>Please enter your name to continue</h2>
            </div>
          
            {/* Input Fields */}
            <div className="flex flex-col items-center justify-center w-full max-w-[500px] sm:max-w-[600px] mt-4 gap-5">
              <Input
                type="text"
                placeholder="Name"
                className="w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
      
            {/* Register Button */}
            <div className="mt-6 mb-8 w-full max-w-[500px] sm:max-w-[600px]">
              <Button type="submit" className="w-full py-3">Continue</Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  // Show the main content when user has a name
  return (
    <div className="mx-8 sm:mx-8 md:mx-16 lg:mx-[16vw] font-sfpro">
      <LoggedInNavbar />

      <section className="mt-[8vh]">
        <button
          onClick={handleNewSession}
          className="border bg-gray-100 p-8 rounded-md text-center"
        >
          <CirclePlus />
          <h1 className="mt-4 text-lg">New session</h1>
        </button>
      </section>

      <div className="h-[2px] bg-gray-200 mt-8"></div>

      <section>
        {sessions.length > 0 ? (
          <div className="mt-6">
            {sessions.map((session) => (
              <div
                key={session.session_id}
                className="flex justify-between items-center p-4 border rounded my-3 hover:bg-gray-50 cursor-pointer"
                onClick={() =>
                  navigate(`/session/${session.session_id}`, {
                    state: { uid: user?.uid, viewOnly: true },
                  })
                }
              >
                <span>{session.session_name || "Unnamed Session"}</span>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded"
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSession(session.session_id);
                  }}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div>
            <h1 className="text-7xl font-bold text-center text-gray-200 mt-[16vh]">
              Create a session to begin
            </h1>
          </div>
        )}
      </section>
    </div>
  );
}

export default Main;