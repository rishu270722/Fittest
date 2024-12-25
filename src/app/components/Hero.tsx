'use client'

import React from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import Link from 'next/link';

interface HeroProps {
  scrollProgress: MotionValue<number>;
}

const Hero = ({ scrollProgress }: HeroProps) => {
  const y = useTransform(scrollProgress, [0, 1], ['0%', '50%']);
  const opacity = useTransform(scrollProgress, [0, 0.5], [1, 0]);

  const titleVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  return (
    <motion.section 
      style={{ opacity }}
      className="relative h-screen flex items-center justify-center overflow-hidden"
    >
      <div className="absolute inset-0">
        <motion.div 
          style={{ y }}
          className="w-full h-full"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
          <img 
            src="https://getwallpapers.com/wallpaper/full/7/5/c/53625.jpg" 
            alt="Fitness Training"
            className="w-full h-full object-cover"
          />
        </motion.div>
      </div>

      <div className="relative container mx-auto px-6 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.2
              }
            }
          }}
          className="max-w-4xl mx-auto"
        >
          <motion.h1 
            variants={titleVariants}
            className="text-white text-7xl md:text-8xl font-bold mb-6"
          >
            BUILD YOUR FITNESS FUTURE
          </motion.h1>
          <motion.p 
            variants={titleVariants}
            className="text-gray-300 text-xl md:text-2xl mb-8"
          >
            Train with elite coaches using blockchain technology. 
            Transform your fitness journey with MANTLE powered FIT tokens.
          </motion.p>
          <motion.div 
            variants={titleVariants}
            className="flex space-x-4 justify-center"
          >
            <Link href="/explore">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white text-black px-8 py-3 rounded-full font-medium"
            >
              Start Training
            </motion.button>
            </Link>
            <Link href="/explore">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-transparent border-2 border-white text-white px-8 py-3 rounded-full font-medium"
            >
              Explore More
            </motion.button>
            </Link>


            
          </motion.div>
        </motion.div>
      </div>

      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div 
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 1.5 }}
          className="flex flex-col items-center"
        >
          <span className="text-white text-sm tracking-widest mb-2">SCROLL DOWN</span>
          <div className="w-6 h-6 border-2 border-white rounded-full flex items-center justify-center">
            <div className="w-1 h-1 bg-white rounded-full" />
          </div>
        </motion.div>
      </motion.div>
    </motion.section>
  );
};

export default Hero;