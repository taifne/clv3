import React from "react";
import "./LoadingAnimation.css"; 

type LoadingAnimationProps = {
  size?: number;
  color?: string;
};

const LoadingAnimation: React.FC<LoadingAnimationProps> = ({ size = 50, color = "#3498db" }) => {
  const spinnerStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderColor: `${color} transparent transparent transparent`,
  };

  return (
    <div className="loading-animation-container">
      <div className="loading-animation" style={spinnerStyle}></div>
    </div>
  );
}

export default LoadingAnimation;
