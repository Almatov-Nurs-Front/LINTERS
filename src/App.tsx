import React, { Suspense, useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Timer from '@Timer';
import MainPage from './pages/MainPage/MainPage';
import SecondPage from './pages/SecondPage/SecondPage';
import AboutPage from './pages/AboutPage/AboutPage';
import axios from 'axios';


const App = () => {
  useEffect(() => {
    (async () => {
      const response = await axios.get('http://localhost:3000/api/v1/messages');
      console.log(response);
    })();
  }, []);
  return (
    <>
      <Suspense fallback={<div>Render Site</div>}>
        <Routes>
          <Route index element={<MainPage/>}/>
          <Route path={'/second/'} element={<SecondPage/>}/>
          <Route path={'/timer/'} element={<Timer minutes={1} seconds={15}/>}/>
          <Route path={'/about/:id/'} element={<AboutPage/>}/>
        </Routes>
      </Suspense>
    </>
  );
};

export default App;
