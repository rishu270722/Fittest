'use client'

import React from 'react';
import { motion } from 'framer-motion';

const Header = () => (
  <motion.header 
    initial={{ y: -20, opacity: 0 }}
    animate={{ y: 0, opacity: 1 }}
    className="fixed w-full top-0 z-50 bg-black/50 backdrop-blur-sm"
  >
    <div className="container mx-auto px-6 py-2">
      <nav className="flex items-center justify-between h-16">
        <div className="flex items-center space-x-12">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="text-white text-3xl font-extrabold tracking-wide"
          >
            Fittest
          </motion.div>
        </div>
        <div className="flex items-center space-x-4">
          {/* <motion.button
            whileHover={{ scale: 1.05 }}
            className="bg-white text-black px-6 py-2 rounded-full font-semibold shadow-md hover:shadow-lg transition duration-200 ease-in-out"
          >
            Connect Wallet
          </motion.button> */}
        </div>
      </nav>
    </div>
  </motion.header>
);

export default Header;
