'use client'

import { googleSans } from '@/fonts/fonts'
import Image from 'next/image';
import { useEffect, useRef, useLayoutEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion'

import { Code, Database, BookOpenCheck, Bot, Map } from 'lucide-react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import LocomotiveScroll from 'locomotive-scroll';


function SkillItem({ number, title, items }: { number: string, title: string, items: string[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-black/20">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer flex items-center py-4 text-xl sm:text-2xl">
        <span className="pr-4 sm:pr-6 text-gray-500 text-xs sm:text-sm font-mono">{number}</span> 
        {title}
      </div>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 1 }}
            transition={{ duration: 0.75, ease: [0.04, 0.62, 0.23, 0.98] }} 
            className="overflow-hidden"
          >
            <ul className="pl-10 sm:pl-16 pb-6 sm:pb-11 list-['\-'] space-y-3">
              {items.map((item, i) => <li key={i} className='pl-4'>{item}</li>)}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


export default function Home() {
  
  const mountRef = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    const currentMount = mountRef.current
    if (!currentMount) return

    const width = currentMount.clientWidth
    const height = currentMount.clientHeight

    const scene = new THREE.Scene
    const camera = new THREE.PerspectiveCamera(50, width / height, .1, 1000)
    camera.position.z = 10
    camera.position.y = 0

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(width, height);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    currentMount.appendChild(renderer.domElement);

    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    let isDragging = false;
    let selectedObject: THREE.Object3D | null = null;
    let previousMousePosition = { x: 0, y: 0 };

    const onPointerDown = (event: PointerEvent) => {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([leftPyramid, rightPyramid], true);

      if (intersects.length > 0) {
        isDragging = true;
        selectedObject = intersects[0].object.parent;
        previousMousePosition = { x: event.clientX, y: event.clientY };
      }
    };

    const onPointerMove = (event: PointerEvent) => {
      if (isDragging && selectedObject) {
        const deltaMove = {
          x: event.clientX - previousMousePosition.x,
          y: event.clientY - previousMousePosition.y
        };

        selectedObject.position.y -= deltaMove.y * 0.01;
        selectedObject.position.x += deltaMove.x * 0.01;
      }
      previousMousePosition = { x: event.clientX, y: event.clientY };
    };

    const onPointerUp = () => {
      isDragging = false;
      selectedObject = null;
    };

    const canvas = renderer.domElement;
    canvas.addEventListener('pointerdown', onPointerDown);
    window.addEventListener('pointermove', onPointerMove); 
    window.addEventListener('pointerup', onPointerUp);

    const leftPyramid = new THREE.Group();
    const rightPyramid = new THREE.Group();
    scene.add(leftPyramid);
    scene.add(rightPyramid);

    const loader = new GLTFLoader()

    loader.load('/pyramid-frame.glb', (gltf) => {
      gltf.scene.traverse((child) => {
        if ((child as THREE.Mesh).isMesh) {
          const mesh = child as THREE.Mesh;
          const geometry = mesh.geometry;

          const wireframeGeo = new THREE.WireframeGeometry(geometry);
          
          const lineMaterial = new THREE.LineBasicMaterial({
            color: 0x555555,
            transparent: true,
            opacity: .3
          });
            
          const pointMaterial = new THREE.PointsMaterial({
            color: 0xcccccc,
            size: .1,
            opacity: .1 
          });
          
          const leftLines = new THREE.LineSegments(wireframeGeo, lineMaterial);
          const leftPoints = new THREE.Points(geometry, pointMaterial);
          leftPyramid.add(leftLines);
          leftPyramid.add(leftPoints);

          const rightLines = new THREE.LineSegments(wireframeGeo, lineMaterial);
          const rightPoints = new THREE.Points(geometry, pointMaterial);
          rightPyramid.add(rightLines);
          rightPyramid.add(rightPoints);
        }
      })

      const aspect = width / height;
      const baseDist = aspect > 1.2 ? 7.5 : (aspect > 0.8 ? 5.0 : 2.5);

      leftPyramid.position.x = -baseDist;
      leftPyramid.position.y = 0;
      leftPyramid.userData.basePosition = { x: -baseDist, y: 0 };
      leftPyramid.rotateX(30)
      
      rightPyramid.position.x = baseDist;
      rightPyramid.position.y = 2;
      rightPyramid.userData.basePosition = { x: baseDist, y: 2 };
      rightPyramid.rotateZ(4)

      leftPyramid.rotation.x = -0.2
      rightPyramid.rotation.x = 0.3;
      leftPyramid.rotation.y = 0.3;
      rightPyramid.rotation.y = -0.2;
    })

    const handleResize = () => {
      if (!currentMount) return
      const newWidth = currentMount.clientWidth;
      const newHeight = currentMount.clientHeight;
      camera.aspect = newWidth / newHeight;
      camera.updateProjectionMatrix(); 
      renderer.setSize(newWidth, newHeight);

      const newAspect = newWidth / newHeight;
      const newBaseDist = newAspect > 1.2 ? 7.5 : (newAspect > 0.8 ? 5.0 : 2.5);
      
      if (leftPyramid.userData.basePosition) {
        leftPyramid.userData.basePosition.x = -newBaseDist;
      }
      if (rightPyramid.userData.basePosition) {
        rightPyramid.userData.basePosition.x = newBaseDist;
      }
    }
    window.addEventListener('resize', handleResize);

    const animate = () => {
      requestAnimationFrame(animate);
      
      leftPyramid.rotation.y += 0.002; 
      leftPyramid.rotation.x += 0.0002;
      leftPyramid.rotation.x -= 0.002;

      rightPyramid.rotation.y -= 0.002;
      rightPyramid.rotation.x += 0.0002;
      rightPyramid.rotation.z += 0.002;

      if (leftPyramid.userData.basePosition && selectedObject !== leftPyramid) {
        leftPyramid.position.x = THREE.MathUtils.lerp(leftPyramid.position.x, leftPyramid.userData.basePosition.x, 0.05);
        leftPyramid.position.y = THREE.MathUtils.lerp(leftPyramid.position.y, leftPyramid.userData.basePosition.y, 0.05);
      }

      if (rightPyramid.userData.basePosition && selectedObject !== rightPyramid) {
        rightPyramid.position.x = THREE.MathUtils.lerp(rightPyramid.position.x, rightPyramid.userData.basePosition.x, 0.05);
        rightPyramid.position.y = THREE.MathUtils.lerp(rightPyramid.position.y, rightPyramid.userData.basePosition.y, 0.05);
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      window.removeEventListener('resize', handleResize);
      
      canvas.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerup', onPointerUp);

      if (currentMount) {
        currentMount.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return (
    
    <main className="w-full overflow-hidden"> 
      {/* section 1 */}
      <section className="min-h-screen relative overflow-hidden">
        <Image
          src={'/Line.svg'}
          fill={true}
          alt='Geometry 1'

          className='text-black object-cover -z-10 opacity-10 absolute'
        />
        <div className="h-screen flex flex-col gap-4 justify-center items-center pb-16 px-4">
          <h1 className={`text-5xl sm:text-7xl tracking-widest select-none ${googleSans.className}`}>Haerunnas.</h1>
          <h2 className="text-lg sm:text-2xl text-gray-600 select-none font-light flex flex-col sm:flex-row items-center justify-center gap-x-2 gap-y-1 text-center">
            <span>Crafting digital experiences that are</span>
            <span className="relative font-bold text-black w-30 h-8 sm:h-auto text-center sm:text-left transition-opacity duration-500">
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
                  className="absolute left-0 right-0 mx-auto sm:right-auto sm:mx-0"
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
        <div className="min-h-[50vh] p-6 sm:p-12 lg:p-18 bg-black/92 flex flex-col lg:flex-row justify-evenly gap-8 lg:gap-16 items-center relative">
            <h2 className="text-3xl sm:text-4xl p-4 sm:p-8 lg:p-24 text-white w-full lg:w-2/5 font-medium text-center lg:text-left">About me</h2>
            <p className="text-lg sm:text-xl p-4 sm:p-8 lg:p-16 text-white w-full lg:max-w-3/5 leading-relaxed tracking-wide text-center lg:text-left"
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
      <section className="h-auto flex flex-col relative pt-24 pb-16 px-6 sm:px-12 lg:pt-64 lg:pb-32 lg:px-24">
        <h2 className='text-right text-3xl sm:text-4xl font-bold'>Skills & Expertise</h2>
        <hr className='' />
        <div className="py-12 lg:py-24 flex flex-row">
          <div className=" w-full h-full flex flex-col relative justify-center gap-8">
            <SkillItem number="01." title="FrontEnd Development" items={["React & NextJS", "Tailwind", "Framer Motion"]} />
            <SkillItem number="02." title="BackEnd Architecture" items={["Express", "Postgres"]} />
            <SkillItem number="03." title="Programming Languages" items={["Javascript", "Typescript", "Python", "Java"]} />
            <SkillItem number="04." title="Interpersonal Skills" items={["Team Collaboration", "Analytical Problem Solving", "Adaptability & Rapid Learning", "Cross-Functional Communication"]} />
          </div>
        </div>
      </section>
      
      {/* section 3 */}
      <section className='min-h-screen flex flex-col relative py-16 px-6 sm:px-12 lg:px-24 w-full mb-24 lg:mb-48'>
        <div className='mb-8 lg:mb-20'>
          <h2 className='text-left text-3xl sm:text-4xl font-bold'>Project</h2>
          <hr className='mt-4' />
        </div>
        <div className='w-full'>
          {/* Mobile version */}
          <div className="lg:hidden grid grid-cols-1 sm:grid-cols-2 gap-4">
              <a
                href='https://github.com/hrnns-ti/chatSQL'
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="PABI"
                className="
                  group relative flex justify-center items-center h-48 
                  border-gray-200 border bg-white rounded-sm shadow-md hover:shadow-2xl transition-all duration-500"
              >
                <Image
                  src={'/ooorganize.svg'}
                  alt='BG'
                  fill
                  className='object-contain opacity-10'
                />
                <Bot size={48} className='text-blue-500 z-10'/>
                <span className="absolute bottom-4 left-4 text-xs font-mono text-gray-400 z-10">01. chatSQL</span>
              </a>
              <a
                href='https://noir-518.pages.dev/' 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Noir"
                className="
                  group flex justify-center items-center h-48 relative overflow-hidden
                  border-gray-200 border bg-white rounded-sm shadow-md hover:shadow-2xl transition-all duration-500"
              >
                <Image
                  src={'/noir.jpeg'}
                  alt='BG'
                  fill
                  className='object-cover opacity-80 z-10 group-hover:opacity-100 duration-500 transition-all'
                />
                <span className="absolute bottom-4 left-4 text-xs font-mono text-white z-20 bg-black/40 px-2 py-0.5 rounded">02. Noir</span>
              </a>
              <a
                href='https://github.com/hrnns-ti/climact-api' 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="ClimAct"
                className="
                  group relative flex justify-center items-center h-48
                  border-gray-200 border bg-white rounded-sm shadow-md hover:shadow-2xl transition-all duration-500"
              >
                <Image
                  src={'/ooorganize.svg'}
                  alt='BG'
                  fill
                  className='object-contain opacity-10'
                />
                <Database size={48} className='text-blue-500 z-10'/>
                <span className="absolute bottom-4 left-4 text-xs font-mono text-gray-400 z-10">03. ClimAct</span>
              </a>
              <div 
                className="
                  flex justify-center items-center h-48 border 
                  border-gray-200 bg-white rounded-sm shadow-md hover:shadow-2xl transition-all duration-500"
              >
                <h1 className='text-4xl font-semibold'>04</h1>
              </div>
              <div 
                className="
                  flex justify-center items-center h-48 border
                  border-gray-200 bg-white rounded-sm shadow-md hover:shadow-2xl transition-all duration-500"
              >
                <h1 className='text-4xl font-semibold'>05</h1>
              </div>
              <div 
                className="
                  flex justify-center items-center h-48 border
                  border-gray-200 bg-white rounded-sm shadow-md hover:shadow-2xl transition-all duration-500"
              >
                <h1 className='text-4xl font-semibold'>06</h1>
              </div>
          </div>

          {/* Desktop version */}
          <div className="hidden lg:grid w-full h-[60vh] grid-cols-4 grid-rows-5 gap-0.5">
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
              <a
                href='https://noir-518.pages.dev/' 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Noir"
                className="
                  flex justify-center items-center col-span-2 row-span-3 col-start-2 row-start-1 relative
                  border-gray-200 border bg-white rounded-sm shadow-2xl/0 hover:shadow-2xl hover:z-10 transition-all duration-500"
              >
                <Image
                  src={'/noir.jpeg'}
                  alt='BG'
                  fill
                  property=''
                  className='object-cover opacity-40 absolute z-10 visible hover:opacity-100 duration-500 transition-all'
                />
                {/* <h1 className='h-70 flex justify-center items-center text-4xl font-semibold z-15'>NOIR</h1> */}
              </a>
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
      <section className='w-full min-h-screen h-auto md:h-screen flex flex-col relative py-12 md:py-26 items-center overflow-hidden'>
        
        <div
          ref={mountRef} 
          className='absolute w-full h-full z-0 overflow-hidden top-0 left-0'
        />
        
        <h2 className='text-center text-3xl sm:text-4xl font-bold mb-10 md:mb-20 z-20 relative pointer-events-none'>Experience</h2>
        
        <div className='relative w-full flex flex-col items-stretch md:items-center z-20 pointer-events-none select-none px-6 md:px-0'>
          
          <div className='absolute top-0 bottom-0 w-px bg-black/50 left-6 md:left-1/2 -translate-x-1/2'></div>
          
          {/* Item Experience 1 */}
          <div className='relative w-full flex flex-col md:flex-row justify-center items-center my-6 md:my-8'>
            <div className='absolute w-2 h-2 bg-blue-600 rounded-full left-6 md:left-1/2 -translate-x-1/2 z-10 outline-4 outline-white'></div>
            
            {/* 5. KONTEN KIRI: Kembalikan pointer-events-auto agar teks bisa diseleksi/diklik */}
            <div className='w-full md:w-1/2 pl-12 pr-4 md:pl-0 md:pr-32 text-left md:text-right pointer-events-auto'>
              <h3 className='text-xl font-semibold tracking-wide'>Computer Science Student</h3>
              <p className='text-sm text-gray-500 mt-1'>UIN Syarif Hidayatullah Jakarta</p>
              <p className='text-sm text-gray-500 mt-1'>2024 - Present</p>
            </div>
            
            {/* KONTEN KANAN */}
            <div className='hidden md:block w-1/2 pl-32 text-left pointer-events-auto'>
              <p className='text-base text-gray-700 leading-relaxed'>
                {/* Deskripsi */}
              </p>
            </div>
          </div>
          
          {/* Item Experience 2 */}
          <div className='relative w-full flex flex-col md:flex-row justify-center items-center my-6 md:my-8'>
            <div className='absolute w-2 h-2 bg-blue-600 rounded-full left-6 md:left-1/2 -translate-x-1/2 z-10 outline-4 outline-white'></div>
            
            <div className='hidden md:block w-1/2 pr-32 text-right pointer-events-auto'>
              <p className='text-base text-gray-700 leading-relaxed'>
                {/* Deskripsi */}
              </p>
            </div>
            
            <div className='w-full md:w-1/2 pl-12 pr-4 md:pl-32 text-left pointer-events-auto'>
              <h3 className='text-xl font-semibold tracking-wide'>Staff of Academic Development</h3>
              <p className='text-sm text-gray-500 mt-1'>Himpunan Mahasiswa Teknik Informatika</p>
              <p className='text-sm text-gray-500 mt-1'>2025 - Present</p>
            </div>
          </div>
          
          {/* Item Experience 3 */}
          <div className='relative w-full flex flex-col md:flex-row justify-center items-center my-6 md:my-8'>
            <div className='absolute w-2 h-2 bg-blue-600 rounded-full left-6 md:left-1/2 -translate-x-1/2 z-10 outline-4 outline-white'></div>
            
            <div className='w-full md:w-1/2 pl-12 pr-4 md:pl-0 md:pr-32 text-left md:text-right pointer-events-auto'>
              <h3 className='text-xl font-semibold tracking-wide'>Head of Cybersecurity</h3>
              <p className='text-sm text-gray-500 mt-1'>Google Developer Group on Campus UINJKT</p>
              <p className='text-sm text-gray-500 mt-1'>2025 - Present</p>
            </div>
            
            <div className='hidden md:block w-1/2 pl-32 text-left pointer-events-auto'>
              <p className='text-base text-gray-700 leading-relaxed'>
                {/* Deskripsi */}
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* section end */}
      <section className='min-h-screen flex justify-center items-center py-8 md:py-0'>
        <div className='flex flex-col justify-center bg-black/92 m-4 md:m-8 p-6 md:p-16 rounded-3xl min-h-[80vh] h-auto w-full relative gap-8 md:gap-18 overflow-hidden'>
          <div className='text-white flex flex-col justify-center h-full py-8 md:py-0'>
            <div className='flex flex-col-reverse md:flex-row justify-between items-stretch md:items-center w-full h-full gap-8 md:gap-4'>
              <div className='flex flex-col h-full w-full gap-6 md:gap-14 justify-center'>
                <div className='flex flex-row max-w-4xl gap-4 md:gap-18 pl-4 md:pl-12'>
                  <svg xmlns="http://www.w3.org/2000/svg" width="2.3em" height="2.3em" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M18.364 17.364L12 23.728l-6.364-6.364a9 9 0 1 1 12.728 0M12 13a2 2 0 1 0 0-4a2 2 0 0 0 0 4"></path>
                  </svg>
                  <div className='flex flex-col gap-2'>
                    <h2 className='text-xl font-semibold mt-2'>Address</h2>
                    <p className='max-w-md text-sm text-gray-400'>South Tangerang, Pisangan, Ciputat Timur, South Tangerang City, Banten</p>
                  </div>
                </div>
                
                <div className='flex flex-row max-w-4xl gap-4 md:gap-18 pl-2 md:pl-12'>
                  <a 
                    href="https://linkedin.com/in/haerunnas"
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="transition-opacity hover:opacity-80"  
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.3em" height="2.3em" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M18.336 18.339h-2.665v-4.177c0-.996-.02-2.278-1.39-2.278c-1.389 0-1.601 1.084-1.601 2.205v4.25h-2.666V9.75h2.56v1.17h.035c.358-.674 1.228-1.387 2.528-1.387c2.7 0 3.2 1.778 3.2 4.092v4.714M7.004 8.575a1.546 1.546 0 0 1-1.548-1.549a1.548 1.548 0 1 1 1.547 1.549m1.336 9.764H5.667V9.75H8.34zM19.67 3H4.33C3.594 3 3 3.58 3 4.297v15.406C3 20.42 3.594 21 4.328 21h15.339C20.4 21 21 20.42 21 19.703V4.297C21 3.581 20.4 3 19.666 3z"></path>
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

                <div className='flex flex-row max-w-4xl gap-4 md:gap-18 pl-2 md:pl-12'>
                  <a 
                    href="https://github.com/hrnns-ti"
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="Github Profile"
                    className="transition-opacity hover:opacity-80"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.3em" height="2.3em" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12.001 2c-5.525 0-10 4.475-10 10a9.99 9.99 0 0 0 6.837 9.488c.5.087.688-.213.688-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.337 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.687c-.1-.25-.45-1.275.1-2.65c0 0 .837-.263 2.75 1.024a9.3 9.3 0 0 1 2.5-.337c.85 0 1.7.112 2.5.337c1.913-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.02 10.02 0 0 0 22 12c0-5.525-4.475-10-10-10"></path>
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

                <div className='flex flex-row max-w-4xl gap-4 md:gap-18 pl-2 md:pl-12'>
                  <a 
                    href="https://instagram.com/cnstllx"
                    target="_blank" 
                    rel="noopener noreferrer"
                    aria-label="LinkedIn Profile"
                    className="transition-opacity hover:opacity-80"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="2.3em" height="2.3em" viewBox="0 0 24 24">
                      <path fill="currentColor" d="m20.713 8.128l-.246.566a.506.506 0 0 1-.934 0l-.246-.566a4.36 4.36 0 0 0-2.22-2.25l-.759-.339a.53.53 0 0 1 0-.963l.717-.319a4.37 4.37 0 0 0 2.251-2.326l.253-.611a.506.506 0 0 1 .942 0l.253.61a4.37 4.37 0 0 0 2.25 2.327l.718.32a.53.53 0 0 1 0 .962l-.76.338a4.36 4.36 0 0 0-2.219 2.251M20 11c.701 0 1.374-.12 2-.341V20a1 1 0 0 1-1 1H2V4a1 1 0 0 1 1-1h11.341A6 6 0 0 0 14 5a5.97 5.97 0 0 0 1.36 3.803L12 11.683L5.65 6.24l-1.3 1.518L12 14.317l4.886-4.188A5.96 5.96 0 0 0 20 11"></path>
                    </svg>
                  </a>
                  <div className='flex flex-col gap-2'>
                    <h2 className='text-xl font-semibold mt-2'>Mail</h2>
                    <p className='max-w-md text-sm text-gray-400'>nassjourney@gmail.com</p>
                  </div>
                </div>
              </div>
              <h2 className='text-left md:text-right font-semibold text-5xl md:text-8xl p-4 md:p-12 leading-tight'>Get in<br/>touch.</h2>
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
