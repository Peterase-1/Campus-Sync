import React from 'react';
import Lottie from 'lottie-react';
import animationData from '../assets/hero_animation.json';

const HeroLottie = () => {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-full max-w-[600px]">
        <Lottie
          animationData={animationData}
          loop={true}
          className="w-full h-full"
        />
      </div>
    </div>
  );
};

export default HeroLottie;
