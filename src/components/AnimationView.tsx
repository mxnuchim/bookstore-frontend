import { animations } from '@/animations';
import React from 'react';
import Lottie from 'lottie-react';

interface AnimationViewProps {
  message: string;
  animationType?: 'loading' | 'empty';
}

const { LoadingAnimation, EmptyAnimation } = animations;

const AnimationView = ({ message, animationType }: AnimationViewProps) => {
  return (
    <div className="flex flex-col items-center justify-center mx-auto my-auto">
      <Lottie
        animationData={
          animationType === 'loading'
            ? LoadingAnimation
            : animationType === 'empty'
            ? EmptyAnimation
            : null
        }
        className="w-full h-full md:w-1/2 md:h-1/2"
      />
      <span className="text-xl my-10">{message}</span>
    </div>
  );
};

export default AnimationView;
