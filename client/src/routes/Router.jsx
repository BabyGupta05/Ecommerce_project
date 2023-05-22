import React from 'react'
import {Routes,Route} from 'react-router-dom';
import HomePage from '../pages/HomePage';
import Register from '../components/navbar/Register';
import Login from '../components/navbar/Login';
const Router = () => {
  return (
    <Routes>
        <Route path='/' element={<HomePage/>}></Route>
       
    </Routes>
  )
}

export default Router