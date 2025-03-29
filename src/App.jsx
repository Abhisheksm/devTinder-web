import { useEffect, useState } from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Body from './components/Body';
import Login from './components/Login';
import Profile from './components/Profile';
import Feed from './components/Feed';
import Connections from './components/Connections';
import Requests from './components/Requests';

function App() {

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", "dark");
  }, []);

  return (
    <>
    <BrowserRouter basename='/'>
    <Routes>
      <Route path='/' element={<Body/>}>
      <Route path='/' element={<Feed/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/profile' element={<Profile/>}/>
      <Route path='/connections' element={<Connections/>}/>
      <Route path='/requests' element={<Requests/>}/>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
    
  )
}

export default App
