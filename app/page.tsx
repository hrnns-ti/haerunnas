'use client'

import { googleSans } from '@/fonts/fonts'
import Image from 'next/image';
import { useEffect, useLayoutEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'

import { Code, Database, BookOpenCheck, Bot } from 'lucide-react';
import LocomotiveScroll from 'locomotive-scroll';

export default function Home() {

  const words = ["elegant.", "immersive.", "intelligent.", "scalable."];
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length)
    }, 3000)
  }, [])

  useEffect(() => {
    (async () => {
      const LocomotiveScroll = (await import('locomotive-scroll')).default;
      const locomotiveScroll = new LocomotiveScroll();
    })();
  }, []);

  return (
    <main className={`w-full `}> 
      {/* section 1 */}
      <section className="min-h-screen relative">
        <Image
          src={'/Line.svg'}
          fill={true}
          alt='Geometry 1'

          className='text-black object-cover -z-10 opacity-10 absolute'
        />
        <div className={`h-screen flex flex-col gap-4 justify-center items-center pb-16`}>
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
      
      {/* section 3 */}
      <section className='min-h-screen flex flex-col relative py-16 px-24 w-full'>
        <div className='h-1/5'>
          <h2 className='text-left text-4xl font-bold'>Project</h2>
          <hr className='mb-20' />
        </div>
        <div className='w-full h-4/5'>
          <div className="w-full h-full grid grid-cols-4 grid-rows-5 gap-0.5">
              <a
                href='https://github.com/hrnns-ti/chatSQL'
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="PABI"
                className="
                  group relative flex justify-center items-center row-span-3 col-start-1 row-start-1 
                  border-gray-200 border bg-white h-full rounded-sm shadow-2xl/0 hover:shadow-2xl hover:z-10 transition-all duration-500"
              >
                <Image
                  src={'/ooorganize.svg'}
                  alt='BG'
                  fill
                  className='object-contain opacity-10'
                />
                <Bot size={48} className='text-blue-500'/>
              </a>
              <div 
                className="
                  flex justify-center items-center col-span-2 row-span-3 col-start-2 row-start-1 
                  border-gray-200 border bg-white rounded-sm shadow-2xl/0 hover:shadow-2xl hover:z-10 transition-all duration-500"
              >
                <h1 className='h-80 flex justify-center items-center text-4xl font-semibold'>02</h1>
              </div>
              <a
                href='https://github.com/hrnns-ti/climact-api' 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="ClimAct"
                className="
                group relative flex justify-center items-center row-span-2 col-start-4 row-start-1 
                border-gray-200 border bg-white rounded-sm shadow-2xl/0 hover:shadow-2xl hover:z-10 transition-all duration-500"
              >
                <Image
                  src={'/ooorganize.svg'}
                  alt='BG'
                  fill
                  className='object-contain opacity-10'
                />
                <Database size={48} className='text-blue-500'/>
              </a>
              <div 
                className="
                  flex justify-center items-center col-span-2 row-span-2 col-start-1 row-start-4 border 
                  border-gray-200 bg-white rounded-sm shadow-2xl/0 hover:shadow-2xl hover:z-10 transition-all duration-500"
              >
                <h1 className='h-70 flex justify-center items-center text-4xl font-semibold'>04</h1>
              </div>
              <div 
                className="
                  flex justify-center items-center row-span-2 col-start-3 row-start-4 
                  border border-gray-200 bg-white rounded-sm shadow-2xl/0 hover:shadow-2xl hover:z-10 transition-all duration-500"
              >
                <h1 className='h-70 flex justify-center items-center text-4xl font-semibold'>05</h1>
              </div>
              <div 
                className="
                  flex justify-center items-center row-span-3 col-start-4 row-start-3 
                  border border-gray-200 bg-white rounded-sm shadow-2xl/0 hover:shadow-2xl hover:z-10 transition-all duration-500"
              >
                <h1 className='h-70 flex justify-center items-center text-4xl font-semibold'>06</h1>
              </div>
          </div>
        </div>
      </section>

      {/* section 4 */}
      <section className='min-h-screen flex flex-col relative py-16 px-24 items-center'>
        <h2 className='text-center text-4xl font-bold mb-20'>Experience</h2>
        {/* <hr className='' /> */}  
        <div className='relative w-full max-w-6xl flex flex-col items-center'>
          
          {/* Garis Vertikal Utama */}
          <div className='absolute top-0 bottom-0 w-px bg-black/50 left-1/2 -translate-x-1/2'></div>
          
          {/* Item Experience 1 */}
          <div className='relative w-full flex flex-row justify-center items-center my-8'>
            
            {/* Titik (Dot) di tengah garis */}
            {/* z-10 agar berada di atas garis, outline putih agar ada pemisah yang elegan */}
            <div className='absolute w-2 h-2 bg-blue-600 rounded-full left-1/2 -translate-x-1/2 z-10 outline-4 outline-white'></div>
            
            {/* Konten Kiri (Misal: Role & Tahun) */}
            <div className='w-1/2 pr-32 text-right'>
              <h3 className='text-xl font-semibold tracking-wide'>Computer Science Student</h3>
              <p className='text-sm text-gray-500 mt-1'>UIN Syarif Hidayatullah Jakarta</p>
              <p className='text-sm text-gray-500 mt-1'>2024 - Present</p>
            </div>
            
            {/* Konten Kanan (Misal: Deskripsi) */}
            <div className='w-1/2 pl-32 text-left'>
              <p className='text-base text-gray-700 leading-relaxed'>
                {/* Dedicated to continuous learning and complex problem-solving through software engineering. Actively exploring modern web development and AI/LLM integrations to build intelligent and scalable digital products. */}
              </p>
            </div>
          </div>
          
          {/* Item Experience 2 */}
          <div className='relative w-full flex flex-row justify-center items-center my-8'>
            
            <div className='absolute w-2 h-2 bg-blue-600 rounded-full left-1/2 -translate-x-1/2 z-10 outline-4 outline-white'></div>
            
            {/* Konten Kiri (Misal: Role & Tahun) */}
            <div className='w-1/2 pr-32 text-right'>
              <p className='text-base text-gray-700 leading-relaxed'>
                {/* Facilitating academic growth and technical skill enhancement within the informatics student community. */}
              </p>
            </div>
            
            {/* Konten Kanan (Misal: Deskripsi) */}
            <div className='w-1/2 pl-32 text-left'>
              <h3 className='text-xl font-semibold tracking-wide'>Staff of Academic Development</h3>
              <p className='text-sm text-gray-500 mt-1'>Himpunan Mahasiswa Teknik Informatika</p>
              <p className='text-sm text-gray-500 mt-1'>2025 - Present</p>
            </div>
          </div>
          
          {/* Item Experience 3 */}
          <div className='relative w-full flex flex-row justify-center items-center my-8'>
            
            <div className='absolute w-2 h-2 bg-blue-600 rounded-full left-1/2 -translate-x-1/2 z-10 outline-4 outline-white'></div>
            
            {/* Konten Kiri (Misal: Role & Tahun) */}
            <div className='w-1/2 pr-32 text-right'>
              <h3 className='text-xl font-semibold tracking-wide'>Head of Cybersecurity</h3>
              <p className='text-sm text-gray-500 mt-1'>Google Developer Group on Campus UINJKT</p>
              <p className='text-sm text-gray-500 mt-1'>2025 - Present</p>
            </div>
            
            {/* Konten Kanan (Misal: Deskripsi) */}
            <div className='w-1/2 pl-32 text-left'>
              <p className='text-base text-gray-700 leading-relaxed'>
                {/* Leading the division by organizing hands-on workshops tech talks, and challenge. Focused on raising awareness about foundational digital security practices. */}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* section end */}
      <section className='min-h-screen flex justify-center'>
        <div className='flex flex-col bg-black/92 m-8 p-16 rounded-3xl h-[80vh] w-full relative gap-18'>
          <div className='text-white flex flex-col justify-center  h-full'>
            <div className='flex justify-between items-center w-full h-full'>
              <div className='flex flex-col h-full w-full gap-14 justify-center'>
                <div className='flex flex-row max-w-4xl gap-18 pl-12'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24">
                    <g fill="none" stroke="#fff" strokeLinecap="round" strokeMiterlimit="10" strokeWidth=".5">
                      <path d="M12 12.8a3.35 3.35 0 1 0 0-6.7a3.35 3.35 0 0 0 0 6.7Z" />
                      <path d="M12 2.75c-6.7 0-7.817 5.583-6.7 9.815c.983 3.708 3.93 6.242 5.874 8.32a1.117 1.117 0 0 0 1.652 0c1.943-2.078 4.891-4.612 5.874-8.32c1.117-4.232 0-9.815-6.7-9.815Z" />
                    </g>
                  </svg>
                  <div className='flex flex-col gap-2'>
                    <h2 className='text-xl font-semibold mt-2'>Address</h2>
                    <p className='max-w-md text-sm text-gray-400'>South Tangerang, Pisangan, Ciputat Timur, South Tangerang City, Banten</p>
                  </div>
                </div>
                
                <div className='flex flex-row max-w-4xl gap-18 pl-12'>
                  <a 
                    href="https://linkedin.com/in/haerunnas"
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="transition-opacity hover:opacity-80"  
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24">
                      <path fill="" d="M17.303 2.25H6.697A4.447 4.447 0 0 0 2.25 6.697v10.606a4.447 4.447 0 0 0 4.447 4.447h10.606a4.447 4.447 0 0 0 4.447-4.447V6.697a4.447 4.447 0 0 0-4.447-4.447m-8.46 15.742a.4.4 0 0 1-.4.423h-1.78a.41.41 0 0 1-.4-.412V10.6a.4.4 0 0 1 .4-.411h1.78a.4.4 0 0 1 .4.411zM7.52 8.632a1.467 1.467 0 1 1 .022-2.935A1.467 1.467 0 0 1 7.52 8.63m10.817 9.35a.39.39 0 0 1-.378.388H16.08a.39.39 0 0 1-.378-.389v-3.424c0-.511.156-2.223-1.356-2.223c-1.179 0-1.412 1.2-1.457 1.734v3.991a.39.39 0 0 1-.378.39h-1.823a.39.39 0 0 1-.389-.39v-7.493a.39.39 0 0 1 .39-.378h1.822a.39.39 0 0 1 .39.378v.645a2.59 2.59 0 0 1 2.434-1.112c3.035 0 3.024 2.835 3.024 4.447z" strokeWidth="0.5" stroke="#fff" />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com/in/haerunnas"
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Github Profile"
                    className="transition-all hover:opacity-80 hover:text-blue-400 duration-500"                  
                  >
                    <div className='flex flex-col gap-2 hover:text-blue-400 duration-500'>
                      <h2 className='text-xl font-semibold mt-2'>Linkedin</h2>
                      <p className='max-w-md text-sm text-gray-400'>haerunnas</p>
                    </div>
                  </a>
                </div>

                <div className='flex flex-row max-w-4xl gap-18 pl-12'>
                  <a 
                    href="https://github.com/hrnns-ti"
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Github Profile"
                    className="transition-opacity hover:opacity-80"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24">
                      <path fill="" d="M11.963 2.382C.554 2.621-1.82 17.93 8.852 21.602c.498.093.684-.219.684-.478v-1.68c-2.79.601-3.38-1.317-3.38-1.317a2.6 2.6 0 0 0-1.121-1.442c-.902-.612.072-.602.072-.602a2.07 2.07 0 0 1 1.536 1.038a2.167 2.167 0 0 0 2.924.819c.052-.5.275-.965.633-1.317c-2.23-.25-4.564-1.1-4.564-4.875a3.76 3.76 0 0 1 1.038-2.645a3.46 3.46 0 0 1 .103-2.634s.84-.26 2.76 1.037a9.6 9.6 0 0 1 5.02 0c1.908-1.276 2.748-1.038 2.748-1.038c.365.828.398 1.763.093 2.614a3.75 3.75 0 0 1 1.037 2.645c0 3.786-2.344 4.626-4.574 4.865c1.038.55.602 4.086.664 4.522c0 .259.176.57.695.477c10.642-3.64 8.152-18.97-3.257-19.209" strokeWidth=".5" stroke="#fff" />
                    </svg>
                  </a>
                  <a
                    href="https://github.com/hrnns-ti"
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Github Profile"
                    className="transition-all hover:opacity-80 hover:text-blue-400 duration-500"                  
                  >
                    <div className='flex flex-col gap-2'>
                      <h2 className='text-xl font-semibold mt-2'>Github</h2>
                      <p className='max-w-md text-sm text-gray-400'>hrnns-ti</p>
                    </div>
                  </a>
                </div>

                <div className='flex flex-row max-w-4xl gap-18 pl-12'>
                  <a 
                    href="https://instagram.com/cnstllx"
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="transition-opacity hover:opacity-80"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="42" height="42" viewBox="0 0 24 24">
                      <g fill="none" stroke="#fff" strokeWidth="0.5">
                        <rect width="18.5" height="17" x="2.682" y="3.5" rx="4" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="m2.729 7.59l7.205 4.13a3.96 3.96 0 0 0 3.975 0l7.225-4.13" />
                      </g>
                    </svg>
                  </a>
                  <div className='flex flex-col gap-2'>
                    <h2 className='text-xl font-semibold mt-2'>Mail</h2>
                    <p className='max-w-md text-sm text-gray-400'>nassjourney@gmail.com</p>
                  </div>
                </div>
              </div>
              <h2 className='text-right font-semibold text-8xl p-12'>Get in<br/>touch.</h2>
            </div>
          </div>
          <Image
            src={'/wallhaven-5.png'}
            fill
            alt='BG'
            className='absolute object-cover -z-10 rounded-3xl'
          />
        </div>
        </section>
    </main>
  );
}
