import React, { useEffect } from 'react';
import image from '../../assets/images/image.png';


const BigComponent = () => {
  useEffect(() => {
  }, []);
  return (
    <>
      <img src={image} alt="image_alt" />
    </>
  );
};

export default BigComponent;
