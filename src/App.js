import './App.css';
import React from 'react';
import Login from "./pages/login/Login";
// import SignUp from "./pages/signup/SignUp";
import {BrowserRouter, Routes,Route, Navigate} from "react-router-dom";
import SignUp from './pages/signup/Signup';
import Profile from './pages/profile/Profile';

function App() {
  return(
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/login/" element={<Login/>}/>
          <Route path="/signup/" element={<SignUp/>}/>
          <Route path="/user/" element={<Profile/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;
