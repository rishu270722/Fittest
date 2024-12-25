'use client'

import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Header from './components/Header';
import Hero from './components/Hero';
import Description from './components/Description';
import Footer from './components/Footer';

import dynamic from 'next/dynamic';

// const Hero = dynamic(() => import("./components/Hero"),{
//   ssr : false,
// })
// const Description = dynamic(() => import("./components/Description"),{
//   ssr : false,
// })

const LandingPage = () => {
  const { scrollYProgress } = useScroll();
  
  return (
    <div className="min-h-screen bg-black">
      <Header />
      <Hero scrollProgress={scrollYProgress} />
      <Description />
      <Footer />
    </div>
  );
};

export default LandingPage;