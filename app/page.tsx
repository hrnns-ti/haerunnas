'use client'

import { googleSans } from '@/fonts/fonts'
import Image from 'next/image';
import { useEffect, useLayoutEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'

import { Code, Database, BookOpenCheck,  } from 'lucide-react';
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
      <section className='min-h-screen flex flex-col relative py-16 px-24'>
        <h2 className='text-left text-4xl font-bold'>Project</h2>
        <hr className='' />
        <div className=''>
          <div>
            
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
          <div className='text-white flex flex-col justify-center items-center h-full'>
            <h2 className='font-semibold text-4xl'>Contact</h2>
            <div className='flex justify-between items-center w-full h-full'>
              <div className='flex flex-row h-full w-full justify-center items-center gap-8'>
                <a href="https://linkedin.com/in/haerunnas">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                    <path fill="#fff" d="M17.303 2.25H6.697A4.447 4.447 0 0 0 2.25 6.697v10.606a4.447 4.447 0 0 0 4.447 4.447h10.606a4.447 4.447 0 0 0 4.447-4.447V6.697a4.447 4.447 0 0 0-4.447-4.447m-8.46 15.742a.4.4 0 0 1-.4.423h-1.78a.41.41 0 0 1-.4-.412V10.6a.4.4 0 0 1 .4-.411h1.78a.4.4 0 0 1 .4.411zM7.52 8.632a1.467 1.467 0 1 1 .022-2.935A1.467 1.467 0 0 1 7.52 8.63m10.817 9.35a.39.39 0 0 1-.378.388H16.08a.39.39 0 0 1-.378-.389v-3.424c0-.511.156-2.223-1.356-2.223c-1.179 0-1.412 1.2-1.457 1.734v3.991a.39.39 0 0 1-.378.39h-1.823a.39.39 0 0 1-.389-.39v-7.493a.39.39 0 0 1 .39-.378h1.822a.39.39 0 0 1 .39.378v.645a2.59 2.59 0 0 1 2.434-1.112c3.035 0 3.024 2.835 3.024 4.447z" />
                  </svg>
                </a>

                <a href="https://github.com/hrnns-ti">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                    <path fill="#fff" d="M11.963 2.382C.554 2.621-1.82 17.93 8.852 21.602c.498.093.684-.219.684-.478v-1.68c-2.79.601-3.38-1.317-3.38-1.317a2.6 2.6 0 0 0-1.121-1.442c-.902-.612.072-.602.072-.602a2.07 2.07 0 0 1 1.536 1.038a2.167 2.167 0 0 0 2.924.819c.052-.5.275-.965.633-1.317c-2.23-.25-4.564-1.1-4.564-4.875a3.76 3.76 0 0 1 1.038-2.645a3.46 3.46 0 0 1 .103-2.634s.84-.26 2.76 1.037a9.6 9.6 0 0 1 5.02 0c1.908-1.276 2.748-1.038 2.748-1.038c.365.828.398 1.763.093 2.614a3.75 3.75 0 0 1 1.037 2.645c0 3.786-2.344 4.626-4.574 4.865c1.038.55.602 4.086.664 4.522c0 .259.176.57.695.477c10.642-3.64 8.152-18.97-3.257-19.209" />
                  </svg>
                </a>

                <a href="https://instagram.com/cnstllx">
                  <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24">
                    <path fill="#fff" d="M13.823 12.234c-.016.35-.13.688-.331.975a1.7 1.7 0 0 1-.829.643a1.77 1.77 0 0 1-1.053.088a1.8 1.8 0 0 1-.926-.516a1.9 1.9 0 0 1-.468-.976a1.76 1.76 0 0 1 .127-1.043c.144-.327.38-.606.682-.8c.307-.19.662-.291 1.024-.292c.477.026.926.232 1.258.575a1.85 1.85 0 0 1 .516 1.346" />
                    <path fill="#fff" d="M17.265 8.002a2.26 2.26 0 0 0-1.248-1.248a2.6 2.6 0 0 0-.887-.175H8.968A2.31 2.31 0 0 0 6.667 8.88v6.279a2.3 2.3 0 0 0 .682 1.628a2.32 2.32 0 0 0 1.619.673h6.162a2.32 2.32 0 0 0 2.123-1.419a2.3 2.3 0 0 0 .178-.882v-6.27a2.6 2.6 0 0 0-.166-.887m-2.437 5.441a2.9 2.9 0 0 1-.644.975c-.28.283-.611.51-.975.673a3.13 3.13 0 0 1-2.486-.028a3.08 3.08 0 0 1-1.765-3.365a3.2 3.2 0 0 1 .829-1.59a3.11 3.11 0 0 1 3.354-.692c.567.23 1.05.628 1.384 1.141a3.03 3.03 0 0 1 .527 1.677c.014.415-.063.827-.224 1.209M15.9 8.626a.555.555 0 1 1-1.102 0a.557.557 0 1 1 1.102 0" />
                    <path fill="#fff" d="M16.875 2.25h-9.75A4.875 4.875 0 0 0 2.25 7.125v9.75a4.875 4.875 0 0 0 4.875 4.875h9.75a4.875 4.875 0 0 0 4.875-4.875v-9.75a4.875 4.875 0 0 0-4.875-4.875m2.067 12.812c.01.51-.087 1.019-.283 1.491a3.9 3.9 0 0 1-2.096 2.096c-.473.196-.98.292-1.492.283H9.075a3.8 3.8 0 0 1-1.492-.282a4 4 0 0 1-1.258-.839a3.9 3.9 0 0 1-.838-1.258a3.7 3.7 0 0 1-.312-1.492V9.018a3.8 3.8 0 0 1 .283-1.492A3.9 3.9 0 0 1 7.535 5.41a3.9 3.9 0 0 1 1.54-.263h6.045a3.8 3.8 0 0 1 2.73 1.121c.357.362.641.79.838 1.258c.195.473.292.98.283 1.492z" />
                  </svg>
                </a>
              </div>
              {/* <div className='flex flex-row h-full w-1/2 '>
                  <form className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
                    
                    <div className="mb-4">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Username</label>
                      <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="username" type="text" placeholder="Enter username" />
                    </div>

                    <div className="mb-6">
                      <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
                      <input className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" id="password" type="password" placeholder="********" />
                    </div>

                    <button className="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-lg transition duration-200" type="submit">
                      Sign In
                    </button>
                  </form>
              </div> */}
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
