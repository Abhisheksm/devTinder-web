import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login';
import Profile from './components/Profile';

function App() {

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <>
    <BrowserRouter basename='/'>
    <Routes>
      <Route path='/' element={<Body/>}>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
    
  )
}

export default App
