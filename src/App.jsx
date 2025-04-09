import React from 'react'
import { BrowserRouter as Router,Routes,Route, useNavigate, Link } from 'react-router-dom';
import Homes from './Home';
import Dashboard from './Dashboard';
import { Home } from 'lucide-react';
import Login from './Login';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Homes/>}/>
        <Route path='/dashboard' element={<Dashboard/>}/>
        <Route path='/login' element={<Login/>}/>
      </Routes>
    </Router>
  )
}

export default App