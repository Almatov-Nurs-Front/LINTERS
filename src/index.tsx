import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';


const App = lazy(() => import('./App'));


const root = ReactDOM.createRoot(document.getElementById('root') as HTMLDivElement);
root.render(<BrowserRouter><App/></BrowserRouter>);
