import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import AdminPanel from './components/AdminPanel';
import Login from './components/Login';

const App = () => {
  const user = useSelector((state) => state.auth?.user?.user); // Get user from Redux
  console.log(user);
  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={!user ? <Login /> : <Navigate to="/admin" />}
        />
        
        <Route
          path="/admin"
          element={user ? <AdminPanel /> : <Navigate to="/login" />}
        />
        
        <Route
          path="*"
          element={<Navigate to={user ? "/admin" : "/login"} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
