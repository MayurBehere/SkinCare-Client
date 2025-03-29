import React, { useState } from "react";
import Navbar from "@/custom/Navbar";
import { Upload } from "lucide-react";
import LoggedInNavbar from "@/custom/LoggedInNavbar";

function Main() {
  return (
    <div className="mx-8 sm:mx-8 md:mx-16 lg:mx-[16vw] font-sfpro">
      <LoggedInNavbar />
      <div className="mt-10 md:mt-20">
        <h1 className="font-bold text-xl md:text-4xl">
          Upload
        </h1>
      </div>
      <div class="flex items-center justify-center w-full mt-4 md:mt-10">
          <label for="dropzone-file" class="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div class="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload  className="mb-4 text-gray-500"/>
                  <p class="mb-2 text-sm text-gray-500 dark:text-gray-400"><span class="font-semibold">Click to upload</span> or drag and drop</p>
                  <p class="text-xs text-gray-500 dark:text-gray-400">SVG, PNG (MAX. 800x400px)</p>
              </div>
              <input id="dropzone-file" type="file" class="hidden" />
          </label>
      </div>

      <div className="mt-10 md:mt-20">
        <h1 className="text-xl font-bold">
          How to get the best results?
        </h1>
      </div>

    </div>
  );
}

export default Main;