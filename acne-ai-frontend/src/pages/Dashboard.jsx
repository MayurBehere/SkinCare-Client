import { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";
import LoggedInNavbar from "@/custom/LoggedInNavbar";
import { useNavigate } from "react-router-dom";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import toast from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();
  const auth = getAuth();

  const [user, setUser] = useState(null);
  const [name, setName] = useState("");
  const [showNameForm, setShowNameForm] = useState(false);
  const [sessions, setSessions] = useState([]);
  const [loading, setLoading] = useState(true);

  // dialog state
  const [openSessionDialog, setOpenSessionDialog] = useState(false);
  const [newSessionName, setNewSessionName] = useState("");

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
      setUser((prev) => ({ ...prev, name: fetchedName || prev.name }));
      if (
        !fetchedName ||
        fetchedName.trim() === "" ||
        fetchedName.trim().toLowerCase() === "unknown"
      ) {
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
      setSessions([]);
      const response = await axios.get(
        "http://127.0.0.1:5000/session/get-sessions",
        { params: { uid } }
      );
      setSessions(response.data.sessions || []);
    } catch (error) {
      console.error("Error fetching sessions:", error);
      toast.error("Failed to load sessions.");
    }
  };

  const handleNewSession = () => {
    setNewSessionName("");
    setOpenSessionDialog(true);
  };

  const confirmNewSession = async () => {
    if (!newSessionName.trim()) {
      toast.error("Session name cannot be empty.");
      return;
    }
    try {
      const currentUser = auth.currentUser;
      const response = await axios.post(
        "http://127.0.0.1:5000/session/start-session",
        { uid: currentUser.uid, session_name: newSessionName }
      );
      const sessionId = response.data.session_id;
      fetchSessions(currentUser.uid);
      setOpenSessionDialog(false);
      navigate(`/session/${sessionId}`, { state: { uid: currentUser.uid } });
    } catch (error) {
      console.error("Error creating session", error);
      toast.error("Failed to create session.");
    }
  };

  const deleteSession = async (sessionId) => {
    try {
      await axios.delete(
        `http://127.0.0.1:5000/session/delete-session/${sessionId}`
      );
      setSessions((s) =>
        s.filter((session) => session.session_id !== sessionId)
      );
      toast.success("Session deleted successfully");
    } catch (error) {
      console.error("Error deleting session", error);
      toast.error("Failed to delete session.");
    }
  };

  const handleNameSubmit = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("Please enter your name to continue.");
      return;
    }
    try {
      const currentUser = auth.currentUser;
      await axios.post("http://127.0.0.1:5000/auth/update-name", {
        uid: currentUser.uid,
        name,
      });
      setUser((prev) => ({ ...prev, name }));
      const storedUser = JSON.parse(localStorage.getItem("user"));
      localStorage.setItem(
        "user",
        JSON.stringify({ ...storedUser, name })
      );
      setShowNameForm(false);
      fetchUser(currentUser.uid);
    } catch (error) {
      console.error("Error updating name", error);
      toast.error("Failed to update name.");
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (showNameForm) {
    return (
      <div className="flex items-center justify-center min-h-screen w-full font-sfproMed px-4">
        <div className="relative flex flex-col items-center bg-gray-100 border rounded-xl px-10 lg:px-24 pt-20 pb-10 w-full max-w-[600px]">
          <form onSubmit={handleNameSubmit} className="w-full">
            <h1 className="text-2xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-center">
              Welcome {name}
            </h1>
            <p className="mt-4 text-center">Please enter your name to continue</p>
            <div className="mt-6">
              <Input
                type="text"
                placeholder="Name"
                className="w-full"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="mt-6">
              <Button type="submit" className="w-full">
                Continue
              </Button>
            </div>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-8 md:mx-16 lg:mx-[16vw] font-sfpro">
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

      <div className="h-[2px] bg-gray-200 mt-8" />

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
          <h1 className="text-7xl font-bold text-center text-gray-200 mt-[16vh]">
            Create a session to begin
          </h1>
        )}
      </section>

      {openSessionDialog && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg w-[90%] max-w-md">
            <h2 className="text-xl mb-4">Enter Session Name</h2>
            <Input
              value={newSessionName}
              onChange={(e) => setNewSessionName(e.target.value)}
              placeholder="Session name"
              className="w-full mb-4"
            />
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setOpenSessionDialog(false)}>
                Cancel
              </Button>
              <Button onClick={confirmNewSession}>Create</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;