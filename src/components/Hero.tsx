import React from 'react';

const HeroSection = () => {
  const heroImageUrl = 'https://cdna.lystit.com/cms/DESKTOP_1_0c9ccdced9.jpg';

  return (
    <div className="w-full">
      <img
        src={heroImageUrl}
        alt="Hero"
        className="w-full h-auto"
      />
    </div>
  );
};

export default HeroSection;