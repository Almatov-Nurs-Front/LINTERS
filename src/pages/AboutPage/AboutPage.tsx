import React from 'react';
import { useParams } from 'react-router-dom';


const AboutPage = () => {
  const { id } = useParams();

  return (
    <div>
      AboutPage: {id}
    </div>
  );
};

export default AboutPage;
