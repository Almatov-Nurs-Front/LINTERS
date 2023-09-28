import React from 'react';
import BigComponent from '@Almatov-Nurs/BigComponent';
import Button from '@Almatov-Nurs/Button';
import { Link } from 'react-router-dom';


const MainPage = () => {
  return (
    <>
      <BigComponent/>
      <Link to='/second/'><Button>SecondPage</Button></Link>
      <Link to='/timer/'><Button>timer</Button></Link>
      <ul>
        {
          Array.from({ length: 4 }, (_, i) => i + 1).map(id => (
            <li key={id}><Link to={`/about/${id}/`}>user: {id}</Link></li>
          ))
        }
      </ul>
    </>
  );
};

export default MainPage;
