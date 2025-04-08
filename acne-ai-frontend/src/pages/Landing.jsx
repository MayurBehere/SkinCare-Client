import { useNavigate, Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { Tilt } from '@/components/ui/tilt';
import Navbar from "../custom/Navbar"
import Footer from "@/components/ui/Footer";
import { InfiniteMovingCards } from "@/components/ui/infinite-moving-cards";
import { testimonials } from "@/utils/testimonials";

const Landing = () => {
  const navigate = useNavigate();

  return (
    <div className="mx-8 sm:mx-8 md:mx-16 lg:mx-[16vw] font-sfpro">
      <Navbar />
      <section className="mt-24 gap-8">
        <div className="absolute top-2/5 left-2/4 w-[40vw] h-[30vw] md:w-[24vw] md:h-[20vw] lg:w-[20vw] lg:h-[12vw] bg-[#1964FF] rounded-full blur-3xl opacity-75 md:opacity-50"></div>
        <div className="absolute top-3/5 left-1/4 w-[40vw] h-[30vw] md:w-[28vw] md:h-[20vw] lg:w-[20vw] lg:h-[16vw] bg-[#FFB997] rounded-full blur-3xl opacity-75 md:opacity-50"></div>
        <div className="mt-[32vh] flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-7xl font-bold text-black">
            Acne-AI
          </h1>
          <p className="mt-2 font-sfpro font-bold text-xl md:text-4xl text-black mx-auto">
          Your AI acne treatment assistant.
          </p>
        </div>
      </section>

      <section className="mt-[36vh]">
        <div>
          <h1 className="mb-8 font-bold text-2xl md:text-4xl text-black">What is AcneAi?</h1>
          <p className="text-lg">
          AcneAI is more than just a tool—it’s your personal skincare revolution. Powered by state-of-the-art 
          artificial intelligence, our platform detects acne with unmatched precision, analyzing your skin to 
          uncover its unique story. From there, we craft tailored treatment plans, blending cutting-edge tech 
          with dermatological know-how to target your specific needs. Whether it’s stubborn breakouts or subtle 
          blemishes, AcneAI delivers evidence-based solutions you can trust, right at your fingertips. Say goodbye 
          to one-size-fits-all fixes and hello to a smarter, more confident you. Transform your skin, transform 
          your journey—start with AcneAI today.
          </p>
        </div>
        
      </section>

      <section className="mt-[12vh]">
        <div className="relative md:top-6 lg:top-10 w-full">
          <h1 className="text-[8vw] md:text-[7vw] font-bold text-gray-300 md:text-gray-200 text-center">Why use our platform?</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Tilt rotationFactor={8} isRevese>
              <div
                style={{
                  borderRadius: '12px',
                }}
                className='mx-auto flex max-w-[270px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900'
              >
                <img
                  src='https://cdn.cosmos.so/f639bdf5-e4ab-4240-b25e-7d08c6cb7f90?format=jpeg'
                  alt='1'
                  className='h-48 w-full object-cover'
                />
                <div className='p-2'>
                  <h1 className='leading-snug text-zinc-950 dark:text-zinc-50'>
                    1.
                  </h1>
                  <p className='text-zinc-700 dark:text-zinc-400'>Easy and accurate identification using modern AI technologies.</p>
                </div>
              </div>
          </Tilt>
          <Tilt rotationFactor={8} isRevese>
              <div
                style={{
                  borderRadius: '12px',
                }}
                className='mx-auto flex max-w-[270px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900'
              >
                <img
                  src='https://cdn.cosmos.so/f0ca7356-faf1-4e0e-990d-75746b010903?format=jpeg'
                  alt='2'
                  className='h-48 w-full object-cover'
                />
                <div className='p-2'>
                  <h1 className='leading-snug text-zinc-950 dark:text-zinc-50'>
                    2.
                  </h1>
                  <p className='text-zinc-700 dark:text-zinc-400'>Robust treatment plans catered towards your personal needs.</p>
                </div>
              </div>
          </Tilt>
          <Tilt rotationFactor={8} isRevese>
              <div
                style={{
                  borderRadius: '12px',
                }}
                className='mx-auto flex max-w-[270px] flex-col overflow-hidden border border-zinc-950/10 bg-white dark:border-zinc-50/10 dark:bg-zinc-900'
              >
                <img
                  src='https://cdn.cosmos.so/80eafb90-950e-4f0e-8404-ee1096509a83?format=jpeg'
                  alt='3'
                  className='h-48 w-full object-cover'
                />
                <div className='p-2'>
                  <h1 className='leading-snug text-zinc-950 dark:text-zinc-50'>
                    3.
                  </h1>
                  <p className='text-zinc-700 dark:text-zinc-400'>Progress monitoring and tracking for lasting results.</p>
                </div>
              </div>
          </Tilt>
        </div>
      </section>
      
      <section className="mt-[24vh] mb-[8vh]">
        <div>
          <h1 className="mb-8 font-bold text-2xl md:text-4xl text-black">
            Our testimonials
          </h1>
          <div className="h-[20rem] rounded-md flex flex-col antialiased bg-white dark:bg-black dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
            <InfiniteMovingCards
              items={testimonials}
              direction="right"
              speed="slow"
            />
          </div>
        </div>
      </section>

      <div className="h-[2px] bg-gray-200 rounded-full mt-16"></div>

      <div className="pt-12">
        <Footer />
      </div>
      
    </div>
  );
};

export default Landing;