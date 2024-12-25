'use client'

import React from 'react';
import { motion } from 'framer-motion';
import { 
  Dumbbell, Wallet, Video, Users, 
  Trophy, Target, Activity, Zap 
} from 'lucide-react';

const Description = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const cardVariants = {
    hidden: {
      opacity: 0,
      y: 50,
      scale: 0.9
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    }
  };

  const features = [
    {
      title: "Tokenized Training",
      description: "Book sessions using MANTLE powered FIT tokens. Secure and transparent blockchain payments.",
      icon: Wallet,
      color: "purple"
    },
    {
      title: "Live Sessions",
      description: "Real-time virtual training with expert feedback. Train anywhere, anytime.",
      icon: Video,
      color: "blue"
    },
    {
      title: "Expert Trainers",
      description: "Connect with certified professionals. Personalized workout plans.",
      icon: Users,
      color: "green"
    },
    {
      title: "Smart Contracts",
      description: "Automated booking and payments. Fair compensation for trainers.",
      icon: Activity,
      color: "pink"
    }
  ];

  const backgroundIcons = [Dumbbell, Trophy, Target, Zap];

  return (
    <section className="relative py-32 bg-black overflow-hidden">
      {/* Animated background icons */}
      {backgroundIcons.map((Icon, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 0.1, scale: 1 }}
          transition={{ delay: index * 0.2, duration: 1 }}
          className="absolute text-purple-500/10"
          style={{
            // top: `${Math.random() * 100}%`,
            // left: `${Math.random() * 100}%`,
            transform: `rotate(${Math.random() * 360}deg)`
          }}
        >
          <Icon size={100} />
        </motion.div>
      ))}

      <div className="container mx-auto px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2 
            className="text-5xl md:text-6xl font-bold mb-6 
                       bg-gradient-to-r from-purple-400 via-pink-500 to-purple-400 
                       bg-clip-text text-transparent"
          >
            Revolutionary Fitness Platform
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-400 max-w-3xl mx-auto"
          >
            Experience the future of fitness training with blockchain technology.
            Connect with elite trainers and transform your workout routine.
          </motion.p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ 
                y: -10,
                transition: { type: "spring", stiffness: 400 }
              }}
              className="bg-gray-800/50 backdrop-blur-sm p-8 rounded-2xl
                         border border-gray-700/50 hover:border-purple-500/50
                         transform transition-all duration-300 ease-out
                         hover:shadow-[0_0_30px_rgba(168,85,247,0.2)]"
            >
              <motion.div
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
                className="mb-6 text-purple-500"
              >
                <feature.icon size={40} />
              </motion.div>
              <h3 className="text-xl font-bold text-white mb-4">{feature.title}</h3>
              <p className="text-gray-400">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default Description;