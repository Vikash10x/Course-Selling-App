import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import Course from './components/Course';
import Navbar from './components/Navbar';
import Purchase from './components/Purchase';
import AddCourse from './components/AddCourse';
import List from './components/List';
import Footer from './components/Footer';
import LandingPage from './components/LandingPage';
// import bg from '../public/Images/bg.svg';


function App() {
  return (
    <div
      style={{
        backgroundImage: "url(/Images/bg.svg)",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "black",
        overflow: "hidden",
      }}
    >

      <Navbar />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        {/* <Route path="/" element={<Course />} /> */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/course" element={<Course />} />
        {/* <Route path="/AddCourse" element={<AddCourse />} /> */}
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/course/:id" element={<List />} />
      </Routes>

      {/* <Footer /> */}
    </div>
  );
}

export default App;