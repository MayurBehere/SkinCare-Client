import React, { useState } from "react";
import { CirclePlus } from "lucide-react";
import LoggedInNavbar from "@/custom/LoggedInNavbar";
import { useNavigate } from "react-router-dom";

function Main() {
  const navigate = useNavigate()

  const session = []

  const handleNewSession = () => {
    navigate("/uploads");
  }

  return (
    <div className="mx-8 sm:mx-8 md:mx-16 lg:mx-[16vw] font-sfpro">
      <LoggedInNavbar />
      <section className="mt-[8vh]">
        <button onClick={handleNewSession} className="border bg-gray-100 p-8 rounded-md text-center">
            <CirclePlus className=""/>
            <h1 className="mt-4 text-lg">New session</h1>
        </button>
      </section>

      <div className="h-[2px] bg-gray-200 mt-8"></div>

      <section>
        {session.length > 0 ? <div></div> : <div>
          <h1 className="text-7xl font-bold text-center text-gray-200 mt-[16vh]">Create a session to begin</h1>
        </div> }
      </section>
      
      

    </div>
  );
}

export default Main;