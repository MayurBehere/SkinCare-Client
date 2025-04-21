import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/Input";
import { ChevronLeft, Eye, EyeOff } from "lucide-react";
import { auth } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = () => {
  const navigate = useNavigate();

  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState("");

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const validatePasswordStrength = (pass) => {
    const strongRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (strongRegex.test(pass)) {
      setPasswordStrength("Strong");
    } else {
      setPasswordStrength("Weak (min 8 chars, 1 number, 1 capital, 1 symbol)");
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); // Reset error state
    
    if (password !== confirmPass) {
      return setError("Passwords do not match");
    }

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      alert("Registration successful! Please log in.");
      navigate("/login"); // Redirect to login instead of main
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen w-full font-sfproMed px-4">
      <div className="relative flex flex-col items-center bg-gray-100 border rounded-xl px-10 lg:px-24 pt-20 pb-20 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
        <form className="w-full" onSubmit={handleRegister}>
          <div className="absolute top-4 left-4">
            <Button variant="outline" onClick={() => navigate("/login")} size="icon">
              <ChevronLeft />
            </Button>
          </div>

          <div className="flex items-center justify-center">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight">
              Register
            </h1>
          </div>

          <div className="flex flex-col items-center justify-center w-full max-w-[500px] sm:max-w-[600px] mt-10 gap-5">

            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full"
              required
            />

            <div className="relative w-full">
              <Input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  validatePasswordStrength(e.target.value);
                }}
                placeholder="Password"
                className="w-full pr-10"
                required
              />
              <div
                className="absolute top-2.5 right-3 cursor-pointer"
                onClick={togglePasswordVisibility}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </div>
              {password && (
                <p
                  className={`text-sm mt-1 ml-1 ${
                    passwordStrength === "Strong"
                      ? "text-green-600"
                      : "text-red-500"
                  }`}
                >
                  {passwordStrength}
                </p>
              )}
            </div>

            <Input
              type="password"
              value={confirmPass}
              onChange={(e) => setConfirmPass(e.target.value)}
              placeholder="Confirm Password"
              className="w-full"
              required
            />
          </div>

          <div className="mt-6 w-full max-w-[500px] sm:max-w-[600px]">
            <Button type="submit" className="w-full py-3">
              Register
            </Button>
          </div>

          
          {error && (
            <p className="text-red-500 bg-red-50 py-2 border border-red-200 rounded-md text-center font-medium text-sm mt-4">
              {error}
            </p>
          )}

          <div className="grid grid-cols-1 sm:flex w-full items-center mt-8 gap-4">
            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              className="py-3 w-full"
              type="button"
            >
              Sign in
            </Button>
            
            <Button
              variant="outline"
              onClick={() => navigate("/forgot-password")}
              className="py-3 w-full"
              type="button"
            >
              Forgot Password
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;