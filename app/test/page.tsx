'use client'

import { useState } from "react"
import { motion, AnimatePresence } from 'framer-motion'


function SkillItem({ number, title, items }: { number: string, title: string, items: string[] }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-black/20">
      <div onClick={() => setIsOpen(!isOpen)} className="cursor-pointer flex py-4 text-3xl">
        <span className="pr-6 text-gray-500 text-lg font-mono">{number}</span> 
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
            <ul className="pl-16 pb-11 list-disc marker:text-blue-500 space-y-3">
              {items.map((item, i) => <li key={i}>{item}</li>)}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Test() {
  
  const [detailVisible, setDetailVisible] = useState(false)
  
  function handleDetail() {
    setDetailVisible(!detailVisible);
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center py-16 px-24">
      <p className="flex p-12 justify-center w-full h-full">Skills & Expertise</p>
      
    </div>
  )
}