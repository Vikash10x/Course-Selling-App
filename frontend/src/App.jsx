import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Signup from './components/Signup';
import Signin from './components/Signin';
import Home from './components/Home';
import Course from './components/Course';
import Navbar from './components/Navbar';
import Purchase from './components/Purchase';
import AddCourse from './components/AddCourse';
// import { List } from 'lucide-react';
import List from './components/List';
import js from '@eslint/js';


function App() {
  return (
    <div className='bg-gray-700 h-screen'>
      <Navbar />

      <Routes>
        <Route path="/" element={<Course />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />} />
        <Route path="/course" element={<Course />} />
        <Route path="/purchase" element={<Purchase />} />
        <Route path="/list/:id" element={<List />} />
      </Routes>
    </div>
  );
}

export default App;