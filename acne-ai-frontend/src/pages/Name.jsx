import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios"; // Import axios
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/Input"

const Name = () => {
    const [name, setName] = useState("");

  return (
    <div className="flex items-center justify-center min-h-screen w-full font-sfproMed px-4">
        <div className="relative flex flex-col items-center bg-gray-100 border rounded-xl px-10 lg:px-24 pt-20 pb-10 w-full max-w-[300px] sm:max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
            <form onSubmit={""} className="w-full">
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
                    />
                </div>
        
            {/* Register Button */}
            <div className="mt-6 mb-8 w-full max-w-[500px] sm:max-w-[600px]">
                <Button type="submit" className="w-full py-3">Continue</Button>
            </div>
          </form>
        </div>
    </div>
  )
}

export default Name