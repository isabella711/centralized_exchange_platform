import React from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './AuthContext';
import Register from './Register';
import Login from './Login';
import Header from './Header';
import AddValue from './AddValue';

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <div>
          <Header />
          <nav>
            <Link to="/register">Register</Link>
            <Link to="/login">Login</Link>
			<Link to="/addvalue">Add Value</Link>
          </nav>
          <Routes>
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />
			<Route path="/addvalue" element={<AddValue />} /> 
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
