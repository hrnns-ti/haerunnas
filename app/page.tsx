'use client'

import { googleSans } from '@/fonts/fonts'
import Image from 'next/image';
import { useEffect, useLayoutEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'

import { Code, Database, BookOpenCheck } from 'lucide-react';

export default function Home() {

  const words = ["elegant.", "immersive.", "intelligent.", "scalable."];
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 3000)
  }, [])

  useLayoutEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  return (
    <main className="w-full"> 
      {/* section 1 */}
      <section className="min-h-screen">
        <Image
          src={'/Line.svg'}
          fill={true}
          alt='Geometry 1'

          className='text-black object-cover -z-10 opacity-10 absolute'
        />
        <div className={`h-screen flex flex-col gap-4 justify-center items-center pb-16`}>
          {/* <h2 className='text-2xl flex'>Welcome to my portfolio.</h2> */}
          <h1 className={`text-7xl tracking-widest select-none ${googleSans.className}`}>Haerunnas.</h1>
          <h2 className="text-2xl text-gray-600 select-none font-light flex items-center gap-2">
            Crafting digital experiences that are
            <span className="relative font-bold text-black w-30 text-left transition-opacity duration-500">
              <AnimatePresence mode="popLayout">
                <motion.span
                  key={index}
                  initial={{ y: 40, opacity: 0 }}
                  animate={{ y: -16, opacity: 1 }}
                  exit={{ y: -40, opacity: 0 }}
                  transition={{ 
                    duration: 0.6, 
                    ease: [0.22, 1, 0.36, 1]
                  }}
                  className="absolute left-0"
                >
                  {words[index]}
                </motion.span>
              </AnimatePresence>
            </span>
          </h2>
        </div>
      </section>

      {/* section 2 */}
      <section className="">
        <div className="min-h-[50vh] p-18 bg-black/92 flex justify-evenly gap-16 items-center relative">
            <h2 className="text-4xl p-24 text-white w-2/5 font-medium">About me</h2>
            <p className="text-xl p-16 text-white max-w-3/5 leading-relaxed tracking-wide"
            >
              Driven by the intersection of logic and art, I am a Computer Science student at UIN Jakarta who dedicated to building modern digital products. I specialize in crafting interactive web interfaces. From experimenting with 3D web environments to integrating LLM capabilities, my goal is to develop applications that are elegant, immersive, intelligent, and scalable.
            </p>
          <Image
            alt='Background'
            src={'/wallhaven-1.png'}
            fill={true}
            className='absolute object-cover -z-10 -scale-x-100'
          />
        </div>
      </section>

      {/* section 2 */}
      <section className="min-h-screen flex flex-col relative py-16 px-24 justify-center">
        <h2 className='text-right text-4xl font-bold'>Skills & Expertise</h2>
        <hr className='' />
        <div className="py-16 flex flex-row justify-evenly">
          <div className='w-1/3 flex flex-col'>
            <Code strokeWidth={2} className='text-gray-600'></Code>
            <p className="text-xl font-semibold pt-8 pb-2">FrontEnd Engineering</p>
            <ul className='list-disc marker:text-blue-700 pl-4 space-y-2'>
              <li>React & NextJS</li>
              <li>Tailwind CSS</li>
              <li>Bootstrap</li>
              <li>Framer Motion</li>
            </ul>
          </div>
          <div className='w-1/3 flex flex-col'>
            <Database strokeWidth={2} className='text-gray-600'></Database>
            <p className="text-xl font-semibold pt-8 pb-2">BackEnd Architecture</p>
            <ul className='list-disc marker:text-blue-700 pl-4 space-y-2'>
              <li>ExpressJS</li>
              <li>PostgreSQL</li>
              {/* <li>test</li> */}
            </ul>
          </div>
          <div className='w-1/3 flex flex-col'>
            <BookOpenCheck strokeWidth={2} className='text-gray-600'></BookOpenCheck>
            <p className="text-xl font-semibold pt-8 pb-2">Programming Language</p>
            <ul className='list-disc marker:text-blue-700 pl-4 space-y-2'>
              <li>JavaScript</li>
              <li>TypeScript</li>
              <li>Java</li>
              <li>Python</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
