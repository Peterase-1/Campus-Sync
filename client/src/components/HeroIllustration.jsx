import React from 'react';
import { motion } from 'framer-motion';

const HeroIllustration = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <svg
        viewBox="0 0 800 600"
        className="w-full h-full max-w-[800px] text-black dark:text-white"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        {/* --- Education: Animated Book --- */}
        <motion.g
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8 }}
          transform="translate(150, 200)"
        >
          {/* Book Cover */}
          <rect x="0" y="0" width="160" height="220" rx="5" stroke="currentColor" strokeWidth="4" fill="none" />
          <line x1="20" y1="0" x2="20" y2="220" stroke="currentColor" strokeWidth="2" />

          {/* Turning Page */}
          <motion.path
            d="M 20 10 C 80 10, 140 20, 140 210 C 80 200, 20 210, 20 210"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            animate={{
              d: [
                "M 20 10 C 80 10, 140 20, 140 210 C 80 200, 20 210, 20 210", // Flat
                "M 20 10 C 50 10, 80 10, 80 200 C 50 200, 20 210, 20 210",   // Turning
                "M 20 10 C 30 10, 25 20, 25 210 C 25 200, 20 210, 20 210"    // Turned
              ]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut"
            }}
          />

          {/* Text Lines on Page */}
          <motion.g
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 3, repeat: Infinity, repeatType: "reverse" }}
          >
            <line x1="40" y1="40" x2="120" y2="40" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="40" y1="60" x2="120" y2="60" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
            <line x1="40" y1="80" x2="100" y2="80" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4" />
          </motion.g>
        </motion.g>

        {/* --- Finance: Scrolling Board --- */}
        <motion.g
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          transform="translate(450, 150)"
        >
          {/* Board Frame */}
          <rect x="0" y="0" width="200" height="140" rx="10" stroke="currentColor" strokeWidth="4" fill="none" />

          {/* Screen Area Mask */}
          <defs>
            <clipPath id="screen-mask">
              <rect x="10" y="10" width="180" height="120" rx="5" />
            </clipPath>
          </defs>

          {/* Scrolling Content */}
          <g clipPath="url(#screen-mask)">
            <motion.g
              animate={{ x: [-200, 200] }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: "linear"
              }}
            >
              {/* Chart Line */}
              <polyline
                points="0,100 40,80 80,110 120,60 160,90 200,40"
                stroke="currentColor"
                strokeWidth="3"
                fill="none"
              />
              {/* Floating Numbers */}
              <text x="20" y="40" fill="currentColor" fontSize="14" fontFamily="monospace">+$500</text>
              <text x="120" y="30" fill="currentColor" fontSize="14" fontFamily="monospace">-20%</text>
            </motion.g>
          </g>
        </motion.g>

        {/* --- Tasks: Graduation Hat & Checkmark --- */}
        <motion.g
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          transform="translate(350, 350)"
        >
          {/* Hat Base */}
          <path d="M 0 40 L 80 0 L 160 40 L 80 80 Z" stroke="currentColor" strokeWidth="4" fill="none" />
          <path d="M 160 40 L 160 70 C 160 90, 80 110, 0 70 L 0 40" stroke="currentColor" strokeWidth="4" fill="none" />

          {/* Tassel Animation */}
          <motion.g
            animate={{ rotate: [0, 15, 0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ originX: "80px", originY: "40px" }} // Pivot point
          >
            <line x1="160" y1="40" x2="160" y2="100" stroke="currentColor" strokeWidth="3" />
            <circle cx="160" cy="100" r="5" fill="currentColor" />
          </motion.g>

          {/* Checkmark Badge */}
          <motion.g transform="translate(120, -20)">
            <circle cx="20" cy="20" r="20" fill="currentColor" />
            <path d="M 10 20 L 18 28 L 30 12" stroke={"white"} strokeWidth="4" fill="none" className="dark:stroke-black" />
          </motion.g>
        </motion.g>

        {/* Connecting Lines/Nodes */}
        <motion.g opacity="0.2">
          <line x1="230" y1="310" x2="350" y2="380" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
          <line x1="550" y1="290" x2="430" y2="380" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5" />
        </motion.g>

      </svg>
    </div>
  );
};

export default HeroIllustration;
