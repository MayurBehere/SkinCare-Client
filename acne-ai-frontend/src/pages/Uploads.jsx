import LoggedInNavbar from '@/custom/LoggedInNavbar'
import React from 'react'
import { TextShimmerWave } from '@/components/ui/text-shimmer-wave';

const Uploads = () => {


    return (
        <div className="mx-8 sm:mx-8 md:mx-16 lg:mx-[16vw] font-sfpro">
            <LoggedInNavbar />
            <div className="mt-10 md:mt-20">
                <h1 className="font-bold text-xl md:text-4xl">
                Upload
                </h1>
            </div>
            <div className="flex items-center justify-center w-full mt-4 md:mt-10">
                {/* <TextShimmerWave className='font-mono text-sm' duration={1}>
                    Generating your report...
                </TextShimmerWave> */}
                <div className='mt-8 bg-gray-50 h-full w-full flex items-center justify-center py-16 rounded-md border'>
                    <label className=''>
                        <h1>Upload</h1>
                        <input type="file" multiple className='hidden' />
                    </label>
                    
                </div>

            </div>
        </div>
  )
}

export default Uploads